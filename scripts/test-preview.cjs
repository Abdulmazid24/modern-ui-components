const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }, // 16:9
    deviceScaleFactor: 2, // Retina 2560x1440
  });

  const page = await context.newPage();

  // Test component
  const compName = "holographiccard";
  console.log(`Navigating to http://localhost:3000/preview/${compName}...`);
  
  await page.goto(`http://localhost:3000/preview/${compName}`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Wait for entrance animations to finish
  await page.waitForTimeout(3000);

  const screenshotBuffer = await page.screenshot({ type: "png" });
  
  const outputPath = path.join(process.cwd(), "test-preview.webp");
  
  await sharp(screenshotBuffer)
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log(`Screenshot saved to ${outputPath}`);
  
  await browser.close();
}

main().catch(console.error);
