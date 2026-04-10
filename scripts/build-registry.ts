import fs from 'fs';
import path from 'path';

/**
 * Registry Builder Script - Modern UI Vault 2026
 * Automatically scans packages/react and builds public/registry/index.json
 */

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/react');
const OUTPUT_DIR = path.resolve(__dirname, '../apps/storefront/public/registry');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function stripTypes(code: string): string {
  // Simple heuristic for TSX -> JSX conversion (removes interfaces, types, and generic annotations)
  // In a real enterprise app, we would use Babel or TypeScript Compiler API
  return code
    .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '')
    .replace(/type\s+\w+\s*=[\s\S]*?;/g, '')
    .replace(/:\s*[A-Z][\w<>[\]]*/g, '') // Basic type annotations
    .replace(/<[A-Z]\w*>/g, '') // Generic types
    .replace(/\s+as\s+\w+/g, '') // Type assertions
    .trim();
}

async function buildRegistry() {
  const components: any[] = [];
  const categories = fs.readdirSync(COMPONENTS_DIR).filter(f => fs.statSync(path.join(COMPONENTS_DIR, f)).isDirectory());

  for (const category of categories) {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    const files = fs.readdirSync(categoryPath);

    for (const fileName of files) {
      if (!fileName.endsWith('.tsx') || fileName === 'index.ts') continue;

      const componentName = fileName.replace('.tsx', '');
      const filePath = path.join(categoryPath, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Create Entry
      const componentEntry = {
        name: componentName.toLowerCase(),
        title: componentName.replace(/([A-Z])/g, ' $1').trim(),
        category,
        dialects: {
          tsx: {
            language: 'tsx',
            files: [{ name: fileName, content }],
            dependencies: ['lucide-react', 'framer-motion'],
          },
          jsx: {
            language: 'jsx',
            files: [{ name: fileName.replace('.tsx', '.jsx'), content: stripTypes(content) }],
            dependencies: ['lucide-react', 'framer-motion'],
          }
        },
        preview: {}
      };

      components.push(componentEntry);
      
      // Write individual JSON for the CLI to fetch
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${componentEntry.name}.json`),
        JSON.stringify(componentEntry, null, 2)
      );
    }
  }

  // Write index
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify({ version: '1.0.0', components }, null, 2)
  );

  console.log(`Registry built with ${components.length} components.`);
}

buildRegistry();
