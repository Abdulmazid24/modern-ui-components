import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. IP Rate Limiting (Redis-backed)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const isAllowed = await verifyRateLimit(ip);
    
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ error: 'No license token provided' }, { status: 400 });
    }

    // Dev Fallback for testing
    if (process.env.NODE_ENV === "development" && token === process.env.DEV_BYPASS_TOKEN) {
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

  } catch (error) {
    console.error('[API Verify Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
