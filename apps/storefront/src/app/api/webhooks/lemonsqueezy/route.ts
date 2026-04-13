import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * LemonSqueezy Webhook Handler
 * 
 * Handles:
 *  - order_created     → Create license key in DB
 *  - order_refunded    → Revoke license
 *  - subscription_cancelled → Mark license expired
 *  - license_key_created → Sync license details
 * 
 * Setup in LemonSqueezy Dashboard:
 *  1. Go to Settings → Webhooks
 *  2. Add URL: https://your-domain.com/api/webhooks/lemonsqueezy
 *  3. Select events: order_created, order_refunded, subscription_cancelled, license_key_created
 *  4. Copy the Signing Secret into LEMONSQUEEZY_WEBHOOK_SECRET env var
 */

// ─── Signature Verification ─────────────────────────────────────

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// ─── Tier Detection ─────────────────────────────────────────────

function detectTier(variantId: string): 'pro' | 'team' | 'enterprise' {
  const teamVariant = process.env.LEMONSQUEEZY_TEAM_VARIANT_ID;
  const enterpriseVariant = process.env.LEMONSQUEEZY_ENTERPRISE_VARIANT_ID;
  
  if (variantId === enterpriseVariant) return 'enterprise';
  if (variantId === teamVariant) return 'team';
  return 'pro';
}

function getActivationLimit(tier: string): number {
  switch (tier) {
    case 'enterprise': return 999; // unlimited
    case 'team': return 10;
    case 'pro': return 3;
    default: return 3;
  }
}

// ─── POST Handler ───────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Webhook] LEMONSQUEEZY_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // 1. Get raw body and verify signature
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature') || '';

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Parse the event
    const event = JSON.parse(rawBody);
    const eventName: string = event.meta?.event_name || 'unknown';
    const customData = event.meta?.custom_data || {};
    
    // Extract common fields from LemonSqueezy payload
    const attributes = event.data?.attributes || {};
    const orderId = attributes.order_id?.toString() || attributes.id?.toString() || '';
    const customerEmail = attributes.user_email || attributes.customer_email || customData.email || '';
    const customerName = attributes.user_name || attributes.customer_name || customData.name || '';
    const variantId = attributes.variant_id?.toString() || attributes.first_order_item?.variant_id?.toString() || '';
    const productId = attributes.product_id?.toString() || attributes.first_order_item?.product_id?.toString() || '';

    // 3. Log the event for auditing
    await supabase.from('vault_webhook_events').insert({
      event_name: eventName,
      payload: event,
      ls_order_id: orderId,
      ls_customer_email: customerEmail,
      processed: false,
    });

    // 4. Process based on event type
    switch (eventName) {
      case 'order_created': {
        // A new purchase! But we don't have the license key yet.
        // LemonSqueezy will fire license_key_created next.
        console.log(`[Webhook] Order created: ${orderId} for ${customerEmail}`);
        
        // Mark webhook as processed
        await supabase
          .from('vault_webhook_events')
          .update({ processed: true })
          .eq('ls_order_id', orderId)
          .eq('event_name', 'order_created');
        break;
      }

      case 'license_key_created': {
        // This is the main event — a license key was minted
        const licenseKey = attributes.key || '';
        const tier = detectTier(variantId);
        const activationLimit = getActivationLimit(tier);
        
        // Calculate expiration (1 year for pro/team, null for enterprise = lifetime)
        const expiresAt = tier === 'enterprise' 
          ? null 
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

        if (licenseKey) {
          await supabase.from('vault_licenses').upsert({
            license_key: licenseKey,
            user_email: customerEmail,
            user_name: customerName,
            tier,
            status: 'active',
            ls_order_id: orderId,
            ls_product_id: productId,
            ls_variant_id: variantId,
            ls_customer_id: attributes.customer_id?.toString() || '',
            activation_limit: activationLimit,
            activation_count: 0,
            expires_at: expiresAt,
            last_verified_at: new Date().toISOString(),
          }, { onConflict: 'license_key' });

          console.log(`[Webhook] License created: ${tier} for ${customerEmail}`);
        }

        await supabase
          .from('vault_webhook_events')
          .update({ processed: true })
          .eq('ls_order_id', orderId)
          .eq('event_name', 'license_key_created');
        break;
      }

      case 'order_refunded': {
        // Revoke the license
        if (orderId) {
          await supabase
            .from('vault_licenses')
            .update({ status: 'refunded' })
            .eq('ls_order_id', orderId);
          console.log(`[Webhook] License revoked (refund): order ${orderId}`);
        }

        await supabase
          .from('vault_webhook_events')
          .update({ processed: true })
          .eq('ls_order_id', orderId)
          .eq('event_name', 'order_refunded');
        break;
      }

      case 'subscription_cancelled': {
        // Mark license as expired
        if (orderId) {
          await supabase
            .from('vault_licenses')
            .update({ status: 'expired', expires_at: new Date().toISOString() })
            .eq('ls_order_id', orderId);
          console.log(`[Webhook] Subscription cancelled: order ${orderId}`);
        }

        await supabase
          .from('vault_webhook_events')
          .update({ processed: true })
          .eq('ls_order_id', orderId)
          .eq('event_name', 'subscription_cancelled');
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error('[Webhook Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
