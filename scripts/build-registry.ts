import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Registry Builder Script — Modern UI Vault 2026
 * 
 * Scans packages/react/ and builds:
 *   - Individual JSON files for each component (CLI download)
 *   - A master index.json for the storefront to display
 * 
 * Features:
 *   - Real dependency detection via import statement parsing
 *   - JSDoc description extraction
 *   - Category normalization (merges duplicates like buttons→button)
 *   - Pro component tagging
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/react');
const OUTPUT_DIR = path.resolve(__dirname, '../apps/storefront/public/registry');

// ─── Pro Components (matches shared-config.ts) ──────────────────
const PRO_COMPONENTS: string[] = [
  'holographicprismcard', 'kineticorigamicard', 'glassshattermodal', 'quantumriftmodal',
  'atmospherichalonav', 'magneticliquiddock', 'accretiondiskloader', 'bioluminescentmycelium',
  'zerogravitytoggle', 'microportalswitch', 'geometrictreemap', 'synapsenodegraph',
  'hologlobe', 'holodropzone', 'mechanicalclock', 'aicommsterminal', 'physicalcreditcard',
  'vaultpasswordmeter', 'rpgskilltree', 'blueprintmapper', 'wordcloudsphere',
  'thumbstickpad', 'magnetickanban', 'hackerterminal', 'hapticdial',
];

// ─── Category Normalization ─────────────────────────────────────
const CATEGORY_ALIASES: Record<string, string> = {
  buttons: 'button',
  cards: 'card',
  inputs: 'input',
  loaders: 'loader',
};

function normalizeCategory(cat: string): string {
  return CATEGORY_ALIASES[cat.toLowerCase()] || cat.toLowerCase();
}

// ─── Dependency Detection ───────────────────────────────────────
// Known packages that appear in import statements
const KNOWN_PACKAGES = [
  'framer-motion',
  'lucide-react',
  'clsx',
  'tailwind-merge',
  'react',
  'react-dom',
  'next',
  'next/link',
  'next/image',
  'next/navigation',
];

function detectDependencies(code: string): string[] {
  const deps = new Set<string>();

  // Match: import ... from 'package' or import ... from "package"
  const importRegex = /(?:import|from)\s+['"]([^'".\/][^'"]*)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    let pkg = match[1];
    // Get the root package name (e.g., 'lucide-react' from 'lucide-react/icons')
    if (pkg.startsWith('@')) {
      // Scoped packages: @scope/name
      pkg = pkg.split('/').slice(0, 2).join('/');
    } else {
      pkg = pkg.split('/')[0];
    }

    // Only include installable packages (not react/react-dom which are peer deps, or relative imports)
    if (pkg === 'react' || pkg === 'react-dom' || pkg === 'next') continue;
    if (KNOWN_PACKAGES.includes(pkg) || pkg === 'framer-motion' || pkg === 'lucide-react') {
      deps.add(pkg);
    }
  }

  // Always include framer-motion and lucide-react as baseline if used
  // Check if framer-motion is actually used
  if (code.includes('framer-motion') || code.includes('motion.') || code.includes('AnimatePresence') || code.includes('useMotionValue') || code.includes('useSpring') || code.includes('useTransform')) {
    deps.add('framer-motion');
  }
  if (code.includes('lucide-react')) {
    deps.add('lucide-react');
  }

  return Array.from(deps).sort();
}

// ─── Description Extraction ─────────────────────────────────────

function extractDescription(code: string, componentName: string): string {
  // Try to find JSDoc comment before the export
  const jsdocRegex = /\/\*\*\s*\n([\s\S]*?)\*\//g;
  let match;
  while ((match = jsdocRegex.exec(code)) !== null) {
    const comment = match[1]
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, '').trim())
      .filter(line => line && !line.startsWith('@'))
      .join(' ')
      .trim();
    if (comment.length > 10) return comment;
  }

  // Fallback: generate description from name
  const humanName = componentName.replace(/([A-Z])/g, ' $1').trim();
  return `A premium, animated ${humanName} component built with React, Framer Motion, and Tailwind CSS.`;
}

// ─── Strip Types (TSX → JSX) ───────────────────────────────────

function stripTypes(code: string): string {
  return code
    // Remove interface/type declarations
    .replace(/^interface\s+\w+[\s\S]*?^\}/gm, '')
    .replace(/^type\s+\w+\s*=[\s\S]*?;$/gm, '')
    // Remove generic type params on functions: <T extends ...>
    .replace(/<[A-Z]\w*(?:\s+extends\s+[^>]+)?>/g, '')
    // Remove type annotations: `: Type`, `: Type[]`, `: Type<...>`
    .replace(/:\s*(?:React\.FC|React\.ReactNode|React\.MouseEvent|React\.ChangeEvent|React\.KeyboardEvent|React\.RefObject|React\.Ref|React\.CSSProperties|React\.HTMLAttributes|React\.ComponentProps)\s*(?:<[^>]*>)?/g, '')
    .replace(/:\s*(?:string|number|boolean|void|any|never|undefined|null)(?:\[\])?/g, '')
    .replace(/:\s*\{[^}]*\}/g, '')
    // Remove `as Type` assertions
    .replace(/\s+as\s+\w+(\[\])?/g, '')
    // Remove export type
    .replace(/^export\s+(?:type|interface)\s+[\s\S]*?(?:;|\})\s*$/gm, '')
    // Clean up empty lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── Main Build ─────────────────────────────────────────────────

async function buildRegistry() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const components: any[] = [];
  const categories = fs.readdirSync(COMPONENTS_DIR).filter(f =>
    fs.statSync(path.join(COMPONENTS_DIR, f)).isDirectory()
  );

  let skipped = 0;

  for (const category of categories) {
    const categoryPath = path.join(COMPONENTS_DIR, category);
    const files = fs.readdirSync(categoryPath);
    const normalizedCategory = normalizeCategory(category);

    for (const fileName of files) {
      if (!fileName.endsWith('.tsx') || fileName === 'index.ts' || fileName === 'index.tsx') continue;

      const componentName = fileName.replace('.tsx', '');
      const slug = componentName.toLowerCase();
      const filePath = path.join(categoryPath, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Detect real dependencies
      const dependencies = detectDependencies(content);

      // Extract description
      const description = extractDescription(content, componentName);

      // Create entry
      const componentEntry = {
        name: slug,
        title: componentName.replace(/([A-Z])/g, ' $1').trim(),
        category: normalizedCategory,
        description,
        isPro: PRO_COMPONENTS.includes(slug),
        dialects: {
          tsx: {
            language: 'tsx',
            files: [{ name: fileName, content }],
            dependencies,
          },
          jsx: {
            language: 'jsx',
            files: [{ name: fileName.replace('.tsx', '.jsx'), content: stripTypes(content) }],
            dependencies: dependencies.filter(d => d !== 'typescript'),
          },
        },
        preview: {},
      };

      components.push(componentEntry);

      // Write individual JSON
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${slug}.json`),
        JSON.stringify(componentEntry, null, 2)
      );
    }
  }

  // Sort components by category, then name
  components.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  // Get unique categories
  const uniqueCategories = [...new Set(components.map(c => c.category))].sort();

  // Write master index
  const indexData = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    stats: {
      totalComponents: components.length,
      totalCategories: uniqueCategories.length,
      freeComponents: components.filter(c => !c.isPro).length,
      proComponents: components.filter(c => c.isPro).length,
    },
    categories: uniqueCategories,
    components,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(indexData, null, 2)
  );

  // Summary
  console.log(`\n✔ Registry built successfully!`);
  console.log(`  Components: ${components.length}`);
  console.log(`  Categories: ${uniqueCategories.length}`);
  console.log(`  Free:       ${indexData.stats.freeComponents}`);
  console.log(`  Pro:        ${indexData.stats.proComponents}`);
  if (skipped > 0) console.log(`  Skipped:    ${skipped}`);
  console.log(`  Output:     ${OUTPUT_DIR}\n`);
}

buildRegistry();
