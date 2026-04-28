import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import path from 'path';
import fs from 'fs';

// Force dynamic route since we rely on headers
export const dynamic = 'force-dynamic';

import { downloadRateLimit } from '@/lib/ratelimit';

// Pro-tier check is now embedded in registry data (set by build-registry.ts from shared config)
// No more hardcoded list here — single source of truth in packages/registry/shared-config.ts

async function verifyProAccessCached(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  if (process.env.NODE_ENV === "development" && token === process.env.DEV_BYPASS_TOKEN) return true;

  try {
    // 1. Try hitting Supabase Cache first
    const { data, error } = await supabase
      .from('vault_licenses')
      .select('is_active, last_verified_at')
      .eq('license_key', token.trim())
      .single();

    if (!error && data && data.is_active) {
        const lastVerified = new Date(data.last_verified_at).getTime();
        const now = Date.now();
        const hoursSinceVerify = (now - lastVerified) / (1000 * 60 * 60);
        if (hoursSinceVerify <= 24) {
            return true; // Valid Cache Hit
        }
    }

    // 2. Cache Miss or Expired TTL - Fallback to LemonSqueezy directly
    const lemonRes = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ license_key: token.trim() })
    });

    if (!lemonRes.ok) return false;
    const lData = await lemonRes.json();
    
    if (lData.valid) {
        // Sync cache in background
        supabase.from('vault_licenses').upsert({
            license_key: token.trim(),
            user_email: lData.meta?.customer_email || 'unknown',
            is_active: true,
            last_verified_at: new Date().toISOString()
        }, { onConflict: 'license_key' }).then();
        return true;
    }
    
    return false;
  } catch (err) {
      console.error('Fallback verification failed:', err);
      return false;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> | { name: string } }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const isAllowed = await downloadRateLimit(ip);
    
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }

    const resolvedParams = await params;
    const name = resolvedParams.name;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    const registryPath = path.join(process.cwd(), 'public/registry/index.json');
    if (!fs.existsSync(registryPath)) {
      return NextResponse.json({ error: 'Registry not built.' }, { status: 500 });
    }

    const registryText = fs.readFileSync(registryPath, 'utf8');
    const registryInfo = JSON.parse(registryText);
    const components = registryInfo.components || registryInfo;

    const componentMeta = Array.isArray(components)
      ? components.find((c: { name: string; isPro?: boolean; category?: string; dialects?: { tsx?: { files?: { content: string }[], dependencies?: string[] } } }) => c.name.toLowerCase() === name.toLowerCase())
      : null;

    if (!componentMeta) {
      return NextResponse.json({ error: `Component "${name}" not found.` }, { status: 404 });
    }

    // --- PRO ACCESS GATE ---
    const isPro = componentMeta.isPro || false;

    if (isPro) {
       const hasAccess = await verifyProAccessCached(token);
       if (!hasAccess) {
          return NextResponse.json(
             { error: 'Pro License Required or verification expired. Run `npx modern-ui-vault login`.' },
             { status: 401 }
          );
       }
    }

    const content = componentMeta.dialects?.tsx?.files?.[0]?.content;
    if (!content) {
      return NextResponse.json({ error: 'Source file missing.' }, { status: 500 });
    }

    // Send payload to CLI (Base64 encoded to obfuscate raw code in transit)
    const encodedContent = Buffer.from(content).toString('base64');

    return NextResponse.json({
       name: componentMeta.name,
       category: componentMeta.category,
       content: encodedContent, // Transmitting securely
       dependencies: componentMeta.dialects?.tsx?.dependencies || ['framer-motion', 'lucide-react'],
       isBase64: true
    });

  } catch (error) {
    console.error('[API Component Fetch Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
