import fs from 'fs/promises';
import path from 'path';
import { chromium } from 'playwright';

// ════════════════════════════════════════════════════════════════
//  Modern UI Vault — Enterprise Preview Generator v3.0
//  Captures 2560×1440 Retina screenshots with LQIP placeholders
// ════════════════════════════════════════════════════════════════

const REGISTRY_DIR  = path.join(process.cwd(), 'apps/storefront/public/registry');
const OUTPUT_DIR    = path.join(process.cwd(), 'apps/storefront/public/previews');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const BASE_URL      = 'http://localhost:3000/preview';

// ─── Capture Settings ───
const VIEWPORT_WIDTH      = 1280;
const VIEWPORT_HEIGHT     = 720;
const DEVICE_SCALE        = 2;       // → 2560×1440 actual pixels
const WEBP_QUALITY        = 85;      // Premium quality, still efficient
const LQIP_WIDTH          = 32;      // Tiny blur placeholder
const ANIMATION_SETTLE_MS = 2000;    // Wait for Framer Motion entrance animations
const MAX_RETRIES         = 3;       // Retry failed captures
const NAV_TIMEOUT_MS      = 45000;   // 45s for heavy Next.js compilations

// ─── Mode: "all" regenerates everything, "missing" only captures new ones ───
const MODE = process.argv[2] || 'all'; // usage: node generate-previews.js [all|missing]

// ════════════════════════════════════════════════════════════════
async function generatePreviews() {
  const startTime = Date.now();

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  🏛️  Modern UI Vault — Preview Generator v3.0           ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`  📐 Resolution : ${VIEWPORT_WIDTH}×${VIEWPORT_HEIGHT} @${DEVICE_SCALE}x → ${VIEWPORT_WIDTH * DEVICE_SCALE}×${VIEWPORT_HEIGHT * DEVICE_SCALE}px`);
  console.log(`  🎯 Mode       : ${MODE === 'missing' ? 'INCREMENTAL (new components only)' : 'FULL (regenerate all)'}`);

  // ── Sharp detection ──
  let sharp;
  try {
    sharp = (await import('sharp')).default;
    console.log(`  🖼️  Format     : WebP (quality ${WEBP_QUALITY}) + LQIP blur placeholders`);
  } catch {
    console.log('  ⚠️  Sharp not found — falling back to PNG');
  }

  // ── Prepare output directory ──
  if (MODE === 'all') {
    // Full mode: clean and recreate
    try { await fs.rm(OUTPUT_DIR, { recursive: true, force: true }); } catch {}
  }
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // ── Discover existing previews (for incremental mode) ──
  let existingPreviews = new Set();
  if (MODE === 'missing') {
    try {
      const existing = await fs.readdir(OUTPUT_DIR);
      existingPreviews = new Set(existing.filter(f => f.endsWith('.webp')).map(f => f.replace('.webp', '')));
      console.log(`  📂 Existing   : ${existingPreviews.size} previews found`);
    } catch {}
  }

  // ── Read registry ──
  const files = await fs.readdir(REGISTRY_DIR);
  const componentFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json');

  // Filter based on mode
  const toCapture = MODE === 'missing'
    ? componentFiles.filter(f => !existingPreviews.has(f.replace('.json', '')))
    : componentFiles;

  console.log(`  📦 Components : ${componentFiles.length} total, ${toCapture.length} to capture`);
  console.log('');

  if (toCapture.length === 0) {
    console.log('  ✅ All previews are up to date! Nothing to do.');
    return;
  }

  // ── Launch browser ──
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
    deviceScaleFactor: DEVICE_SCALE,
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  // Suppress noisy console messages from components
  page.on('console', () => {});
  page.on('pageerror', () => {});

  // ── Load existing manifest for incremental merge ──
  let manifest = {};
  if (MODE === 'missing') {
    try {
      const raw = await fs.readFile(MANIFEST_PATH, 'utf-8');
      manifest = JSON.parse(raw);
    } catch {}
  }

  let successCount = 0;
  const failedComponents = [];

  for (let i = 0; i < toCapture.length; i++) {
    const file = toCapture[i];
    const name = file.replace('.json', '');
    const progress = `[${i + 1}/${toCapture.length}]`;

    let captured = false;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const label = attempt > 1 ? ` (retry ${attempt})` : '';
        process.stdout.write(`${progress} 📸 ${name}${label}... `);

        // Navigate to the preview canvas
        await page.goto(`${BASE_URL}/${name}`, {
          waitUntil: 'load',
          timeout: NAV_TIMEOUT_MS,
        });

        // Wait for Framer Motion entrance animations to settle
        await page.waitForTimeout(ANIMATION_SETTLE_MS);

        // Capture screenshot
        const pngBuffer = await page.screenshot({ type: 'png', fullPage: false });

        if (sharp) {
          const outputPath = path.join(OUTPUT_DIR, `${name}.webp`);
          const sharpInstance = sharp(pngBuffer);
          const metadata = await sharpInstance.metadata();

          // Write optimized WebP
          await sharp(pngBuffer)
            .webp({ quality: WEBP_QUALITY, effort: 4 })
            .toFile(outputPath);

          // Generate LQIP (Low Quality Image Placeholder)
          const lqipBuffer = await sharp(pngBuffer)
            .resize(LQIP_WIDTH, Math.round(LQIP_WIDTH * (VIEWPORT_HEIGHT / VIEWPORT_WIDTH)))
            .blur(2)
            .webp({ quality: 20 })
            .toBuffer();

          const lqipBase64 = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;
          const stat = await fs.stat(outputPath);

          manifest[name] = {
            src: `/previews/${name}.webp`,
            width: metadata.width,
            height: metadata.height,
            fileSize: stat.size,
            fileSizeKB: Math.round(stat.size / 1024),
            lqip: lqipBase64,
          };
        } else {
          // Fallback: PNG
          const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
          await page.screenshot({ path: outputPath, type: 'png', fullPage: false });
          const stat = await fs.stat(outputPath);

          manifest[name] = {
            src: `/previews/${name}.png`,
            width: VIEWPORT_WIDTH * DEVICE_SCALE,
            height: VIEWPORT_HEIGHT * DEVICE_SCALE,
            fileSize: stat.size,
            fileSizeKB: Math.round(stat.size / 1024),
          };
        }

        successCount++;
        captured = true;
        console.log(`✅ (${manifest[name].fileSizeKB}KB)`);
        break;

      } catch (err) {
        if (attempt === MAX_RETRIES) {
          console.log(`❌ FAILED: ${err.message.split('\n')[0]}`);
          failedComponents.push(name);
        } else {
          console.log(`⚠️ retry...`);
        }
      }
    }
  }

  // ── Write manifest ──
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  // ── Cleanup ──
  await browser.close();

  // ── Summary ──
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const ext = sharp ? 'webp' : 'png';
  const totalSize = Object.values(manifest).reduce((sum, m) => sum + (m.fileSize || 0), 0);
  const avgSize = successCount > 0 ? Math.round(totalSize / successCount / 1024) : 0;

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  🎉 PREVIEW GENERATION COMPLETE                        ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ Success  : ${String(successCount).padEnd(4)} / ${toCapture.length} components${' '.repeat(20)}║`);
  if (failedComponents.length > 0) {
    console.log(`║  ❌ Failed   : ${String(failedComponents.length).padEnd(4)} components${' '.repeat(24)}║`);
    failedComponents.forEach(f => console.log(`║     → ${f.padEnd(47)}║`));
  }
  console.log(`║  📐 Output   : ${VIEWPORT_WIDTH * DEVICE_SCALE}×${VIEWPORT_HEIGHT * DEVICE_SCALE}px (${DEVICE_SCALE}x Retina)${' '.repeat(16)}║`);
  console.log(`║  🖼️  Format   : ${ext.toUpperCase()} (quality ${sharp ? WEBP_QUALITY : 'lossless'})${' '.repeat(24)}║`);
  console.log(`║  💾 Total    : ${(totalSize / 1024 / 1024).toFixed(1)}MB (avg ${avgSize}KB/image)${' '.repeat(19)}║`);
  console.log(`║  ⏱️  Elapsed  : ${elapsed}s${' '.repeat(39)}║`);
  console.log(`║  📋 Manifest : public/previews/manifest.json${' '.repeat(9)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (failedComponents.length > 0) {
    console.log('\n💡 TIP: Re-run with "missing" mode to retry only failed components:');
    console.log('   node scripts/generate-previews.js missing\n');
  }
}

generatePreviews().catch(console.error);
