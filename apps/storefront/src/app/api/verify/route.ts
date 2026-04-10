import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // --- PRODUCTION VERIFICATION (Phase 8) ---
    // Query Supabase for a matching active license key
    const { data, error } = await supabase
      .from('vault_licenses')
      .select('user_id, tier, is_active')
      .eq('license_key', token)
      .single();

    if (error || !data) {
        // Fallback: Allow the hardcoded dev key for local testing
        if (token === "vault_pro_key") {
            return NextResponse.json({ success: true, user: "Dev Mode Pro" }, { status: 200 });
        }
        return NextResponse.json({ error: 'Invalid or Expired License' }, { status: 401 });
    }

    if (!data.is_active) {
        return NextResponse.json({ error: 'License subscription has expired. Please renew.' }, { status: 403 });
    }

    return NextResponse.json({ 
        success: true, 
        user: data.user_id,
        tier: data.tier 
    }, { status: 200 });

  } catch (error: any) {
    console.error('[API Verify Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
