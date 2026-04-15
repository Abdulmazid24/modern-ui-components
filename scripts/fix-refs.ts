import * as fs from 'fs';
import * as path from 'path';

const filesToFix = [
  "packages/react/tilt-card/PerspectiveTilt.tsx",
  "packages/react/textarea/ExpandingTextarea.tsx",
  "packages/react/stats/AnimatedCounter.tsx",
  "packages/react/spotlight/MaskSpotlight.tsx",
  "packages/react/search/SpotlightSearch.tsx",
  "packages/react/scroll-animation/ParallaxReveal.tsx",
  "packages/react/popover/GlassPopover.tsx",
  "packages/react/navbar/MagneticLiquidDock.tsx",
  "packages/react/footer/NebulaRippleFooter.tsx",
  "packages/react/footer/ArchitecturalBentoFooter.tsx",
  "packages/react/dropdown-menu/PrismDropdown.tsx",
  "packages/react/effects/ScrambleText.tsx",
  "packages/react/dock-navigation/GravityDock.tsx",
  "packages/react/dock/MacDock.tsx",
  "packages/react/bento-grid/KineticBentoGrid.tsx"
];

for (const file of filesToFix) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. We must rename `const ref = useRef` to `const localRef = useRef`
  content = content.replace(/const ref = useRef/g, `const localRef = useRef`);
  
  // 2. We replace usages of `ref.current` with `localRef.current`
  content = content.replace(/ref\.current/g, `localRef.current`);

  // 3. We inject `handleRef` right after `const localRef = useRef...;`
  const handleRefFunction = `\n        const handleRef = (node: any) => {\n          localRef.current = node;\n          if (typeof ref === "function") {\n            ref(node);\n          } else if (ref) {\n            (ref as any).current = node;\n          }\n        };\n`;
  content = content.replace(/(const localRef = useRef.*?;)/, `$1${handleRefFunction}`);

  // 4. We replace ALL `ref={ref}` with `ref={handleRef}`
  content = content.replace(/ref=\{ref\}/g, `ref={handleRef}`);

  // 5. If there are duplicate `ref={handleRef}` in the same JSX open tag, remove the second one.
  // E.g. `<div ref={handleRef} {...props} className={cn(className)}  ref={handleRef}` -> `<div ref={handleRef} {...props} className={cn(className)}`
  content = content.replace(/(ref=\{handleRef\}[^>]*?)\s+ref=\{handleRef\}/g, `$1`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed ${file}`);
}
