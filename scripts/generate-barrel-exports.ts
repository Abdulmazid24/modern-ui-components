import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/react');

function generateBarrelExports() {
  let createdCount = 0;
  let updatedCount = 0;
  
  const categories = fs.readdirSync(COMPONENTS_DIR).filter(f =>
    fs.statSync(path.join(COMPONENTS_DIR, f)).isDirectory() && f !== 'node_modules' && f !== '.next'
  );

  const validCategories: string[] = [];

  for (const category of categories) {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    const files = fs.readdirSync(categoryPath);
    
    // We only care about .tsx files or .ts files that are not index.ts
    const exportableFiles = files.filter(f => 
        (f.endsWith('.tsx') || f.endsWith('.ts')) && 
        f !== 'index.ts' && 
        f !== 'index.tsx' &&
        !f.includes('.test.')
    );

    const indexFilePath = path.join(categoryPath, 'index.ts');

    if (exportableFiles.length > 0) {
      const exports = exportableFiles.map(file => {
        const baseName = file.replace('.tsx', '').replace('.ts', '');
        return `export * from './${baseName}';`;
      }).join('\n') + '\n';

      if (fs.existsSync(indexFilePath)) {
          const existing = fs.readFileSync(indexFilePath, 'utf-8');
          if (existing !== exports) {
              fs.writeFileSync(indexFilePath, exports);
              updatedCount++;
          }
      } else {
          fs.writeFileSync(indexFilePath, exports);
          createdCount++;
      }
      validCategories.push(category);
    } else if (fs.existsSync(indexFilePath)) {
      // If it has a manual index.ts but no exportable components detected, we still keep it.
      validCategories.push(category);
    }
  }

  // Generate a master index.ts in packages/react root
  const rootIndexFilePath = path.join(COMPONENTS_DIR, 'index.ts');
  const rootExports = validCategories.map(cat => `export * from './${cat}';`).join('\n') + '\n';
  fs.writeFileSync(rootIndexFilePath, rootExports);

  console.log(`\n✔ Generated ${createdCount} new barrel exports.`);
  console.log(`✔ Updated ${updatedCount} existing barrel exports.`);
  console.log(`✔ Generated master index.ts connecting ${validCategories.length} categories.`);
}

generateBarrelExports();
