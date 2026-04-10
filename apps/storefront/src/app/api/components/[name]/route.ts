import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import path from 'path';
import fs from 'fs';

// Force dynamic route since we rely on headers
export const dynamic = 'force-dynamic';

// Pro-tier component list (loaded from registry metadata in production)
const PRO_TIER_COMPONENTS = [
  'holodropzone', 'mechanicalclock', 'aicommsterminal',
  'geometrictreemap', 'physicalcreditcard', 'vaultpasswordmeter',
  'rpgskilltree', 'blueprintmapper', 'wordcloudsphere',
  'thumbstickpad', 'synapsenodegraph', 'hologlobe',
  'magnetickanban', 'hackerterminal', 'hapticdial'
];

async function verifyProAccess(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  // Dev fallback for local testing
  if (token === "vault_pro_key") return true;

  // Real DB check
  const { data, error } = await supabase
    .from('vault_licenses')
    .select('is_active, tier')
    .eq('license_key', token)
    .single();

  if (error || !data) return false;
  return data.is_active && (data.tier === 'pro' || data.tier === 'enterprise');
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> | { name: string } }
) {
  try {
    const resolvedParams = await params;
    const name = resolvedParams.name;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    // Read the compiled registry index
    const registryPath = path.join(process.cwd(), 'public/registry/index.json');
    if (!fs.existsSync(registryPath)) {
      return NextResponse.json({ error: 'Registry not built. Run: npm run registry:build' }, { status: 500 });
    }

    const registryText = fs.readFileSync(registryPath, 'utf8');
    const registryInfo = JSON.parse(registryText);
    const components = registryInfo.components || registryInfo;

    // Find the specific component (case-insensitive)
    const componentMeta = Array.isArray(components)
      ? components.find((c: any) => c.name.toLowerCase() === name.toLowerCase())
      : null;

    if (!componentMeta) {
      return NextResponse.json({ error: `Component "${name}" not found in registry` }, { status: 404 });
    }

    // --- PRO ACCESS GATE ---
    const isPro = PRO_TIER_COMPONENTS.includes(componentMeta.name.toLowerCase());

    if (isPro) {
       const hasAccess = await verifyProAccess(token);
       if (!hasAccess) {
          return NextResponse.json(
             { error: 'Pro License Required', message: 'This component requires an active subscription.' },
             { status: 401 }
          );
       }
    }

    // Read source code from the registry's tsx dialect
    const content = componentMeta.dialects?.tsx?.files?.[0]?.content;
    if (!content) {
      return NextResponse.json({ error: 'Source file content missing from registry' }, { status: 500 });
    }

    // Send payload to CLI
    return NextResponse.json({
       name: componentMeta.name,
       category: componentMeta.category,
       content: content,
       dependencies: componentMeta.dialects?.tsx?.dependencies || ['framer-motion', 'lucide-react']
    });

  } catch (error: any) {
    console.error('[API Component Fetch Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
