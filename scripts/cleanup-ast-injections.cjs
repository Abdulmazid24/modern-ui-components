const fs = require('fs');
const path = require('path');

const filesToFix = [
  "packages/react/navbar/MagicNavbar.tsx",
  "packages/react/aurora-input/AuroraInput.tsx",
  "packages/react/carousel/TeamCarousel.tsx",
  "packages/react/kanban/MagneticKanban.tsx",
  "packages/react/multi-select/MagneticTags.tsx",
  "packages/react/navbar/CosmicHorizonNav.tsx",
  "packages/react/navbar/CrystallinePrismNav.tsx",
  "packages/react/navbar/NebulaPortalNav.tsx",
  "packages/react/navbar/NeuralSynapseNav.tsx",
  "packages/react/navbar/RippleTideNav.tsx",
  "packages/react/navbar/SpectrumNavbar.tsx",
  "packages/react/node-graph/SynapseNodeGraph.tsx",
  "packages/react/number-stepper/OdometerInput.tsx",
  "packages/react/share-menu/ShareMenu.tsx",
  "packages/react/timeline/TemporalTimeline.tsx",
  "packages/react/tree-view/FractalTreeView.tsx",
  "packages/react/accordion/CrystallineAccordion.tsx"
];

for (const file of filesToFix) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    // Some might have been renamed to layout/ etc., let's do a fallback
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // The AST script strictly injected this exact string:
  const injection = 'ref={ref} {...props} className={cn(className)} ';
  
  // Find all occurrences
  const parts = content.split(injection);
  
  if (parts.length > 2) {
    // Reconstruct keeping only the first one
    let newContent = parts[0] + injection + parts[1];
    for (let i = 2; i < parts.length; i++) {
      newContent += parts[i];
    }
    content = newContent;
  }

  // Also clean up any occurrences of `ref={ref}` where it doesn't belong.
  // Wait, the above logic removes the full injection block. Let's see if there are stray `ref={ref}` remaining.
  // The injection might have been `ref={ref} {...props} className={cn("", className)}` in some files!
  // Let's use Regex to be safer.
  const regex = /ref=\{ref\} \{\.\.\.props\} className=\{cn\([^)]+\)\}\s*/g;
  const matches = [...content.matchAll(regex)];

  if (matches.length > 1) {
    let finalContent = "";
    let lastIndex = 0;
    
    matches.forEach((match, index) => {
      finalContent += content.substring(lastIndex, match.index);
      if (index === 0) {
        // Keep the first one
        finalContent += match[0];
      }
      lastIndex = match.index + match[0].length;
    });
    finalContent += content.substring(lastIndex);
    content = finalContent;
  }

  // Fix 2: Duplicate className prop. Example: className={cn(className)} className="foo"
  const classRegex = /className=\{cn\([^)]+\)\}\s*className=/g;
  content = content.replace(classRegex, 'className=');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Cleaned up injections in ${file}`);
}
