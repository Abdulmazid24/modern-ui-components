import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Minimal in-memory rate limiter (For production at scale, use Upstash Redis / Vercel KV)
const rateLimitCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let record = rateLimitCache.get(ip);
  if (!record || (now - record.lastReset > RATE_LIMIT_WINDOW_MS)) {
    rateLimitCache.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

export async function GET(request: Request) {
  try {
    // 1. IP Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ error: 'No license token provided' }, { status: 400 });
    }

    // Dev Fallback
    if (token === "vault_pro_key") {
       return NextResponse.json({ success: true, user: "Dev Admin" }, { status: 200 });
    }

    // 2. Strict LemonSqueezy Call
    const lemonRes = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_key: token })
    });

    if (!lemonRes.ok) {
        return NextResponse.json({ error: 'Failed to contact licensing server.' }, { status: 500 });
    }

    const data = await lemonRes.json();

    // 3. Strict Validation according to ChatGPT feedback
    if (!data.valid) {
        return NextResponse.json({ error: data.error || 'Invalid or Expired License Key' }, { status: 401 });
    }

    const licenseMeta = data.meta;
    const expiresAt = data.license_key?.expires_at;
    const usage = data.instance?.activation_usage || 0;
    const limit = data.license_key?.activation_limit || Infinity;

    const isExpired = expiresAt ? new Date(expiresAt) < new Date() : false;
    const isMaxedOut = usage >= limit;

    if (isExpired) {
        return NextResponse.json({ error: 'This license has expired.' }, { status: 403 });
    }
    
    // In our CLI context, this ensures keys aren't shared infinitely
    if (isMaxedOut && usage > 0) {
        return NextResponse.json({ error: `Activation limit reached (${limit}/${limit}).` }, { status: 403 });
    }

    // 4. Supabase DB Sync (Cache Layer)
    // Upsert the validated connection so the component-delivery API doesn't have to hit LemonSqueezy every download
    await supabase.from('vault_licenses').upsert({
        license_key: token,
        user_email: licenseMeta?.customer_email || 'unknown',
        is_active: true,
        last_verified_at: new Date().toISOString()
    }, { onConflict: 'license_key' });

    return NextResponse.json({ 
        success: true, 
        user: licenseMeta?.customer_name || 'Pro User',
        tier: 'Pro' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('[API Verify Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
