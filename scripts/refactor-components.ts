import { Project, SyntaxKind, Node, ObjectBindingPattern } from "ts-morph";
import * as fs from "fs";

console.log("🚀 Starting Enterprise Refactor on components...");

const project = new Project();
project.addSourceFilesAtPaths("packages/react/**/*.tsx");

const files = project.getSourceFiles();

let refactored = 0;
let skipped = 0;

for (const file of files) {
  if (file.getBaseName().startsWith("index")) continue;

  try {
    let modified = false;

    // 1. Ensure `cn` import
    const hasCn = file.getImportDeclarations().some(d => d.getText().includes('cn'));
    if (!hasCn) {
      file.addImportDeclaration({
        namedImports: ["cn"],
        moduleSpecifier: "@/utils"
      });
      modified = true;
    }

    // 2. Process Interfaces (Add className)
    const interfaces = file.getInterfaces();
    let compInterfaceName = "any";
    for (const intf of interfaces) {
      if (intf.getName().endsWith("Props") || intf.isExported()) {
        compInterfaceName = intf.getName();
        if (!intf.getProperty("className")) {
          intf.addProperty({ name: "className", hasQuestionToken: true, type: "string" });
          modified = true;
        }
      }
    }

    // 3. Process the Arrow Function Components
    const variables = file.getVariableStatements().filter(v => v.isExported());
    
    for (const v of variables) {
      const decl = v.getDeclarations()[0];
      const initializer = decl.getInitializer();

      if (Node.isArrowFunction(initializer)) {
        // If already uses forwardRef, skip
        if (initializer.getText().includes("forwardRef")) continue;

        const params = initializer.getParameters();
        let paramText = "{ className, ...props }";
        
        if (params.length > 0) {
           const firstParam = params[0];
           if (Node.isObjectBindingPattern(firstParam.getNameNode())) {
              const elements = (firstParam.getNameNode() as ObjectBindingPattern).getElements().map(e => e.getText());
              if (!elements.find(e => e.startsWith("className"))) elements.unshift("className");
              if (!elements.find(e => e.startsWith("..."))) elements.push("...props");
              paramText = `{ ${elements.join(", ")} }`;
           }
        }

        const body = initializer.getBodyText();
        if (!body) continue;

        // Very basic JSX injection for the top level returned element
        // Regex to find: return ( <Tag className="xx"
        // Replace with: return ( <Tag ref={ref} {...props} className={cn("xx", className)}
        
        const typeArgs = compInterfaceName ? `<any, ${compInterfaceName}>` : `<any, any>`;
        const newInitializer = `React.forwardRef${typeArgs}((${paramText}, ref) => {\n${body}\n})`;
        
        // Remove old React.FC type from the variable declaration
        decl.removeType();
        decl.setInitializer(newInitializer);
        modified = true;
      }
    }

    // After setting forwardRef, we now parse the file text and do a regex to wrap top-level classnames
    if (modified) {
        file.saveSync();
        let content = fs.readFileSync(file.getFilePath(), "utf-8");
        
        // Replace classic return <div className="xxx"> with cn() wrapper, ref, and props
        // This is a naive regex but it works for 80% of single-node returns
        // We look for 'return' followed by optional spaces & parens, then an opening tag.
        content = content.replace(
            /(return\s*\(?\s*)(<[A-Za-z0-9_\.]+)(\s+className=)(["'])([^"']+)\4/g,
            `$1$2 ref={ref} {...props} className={cn("$5", className)}`
        );
        
        // If it doesn't have a className already:
        if (!content.includes("{cn(")) {
             content = content.replace(
                /(return\s*\(?\s*)(<[A-Za-z0-9_\.]+)(\s+)/g,
                `$1$2 ref={ref} {...props} className={cn(className)} $3`
            );
        }

        fs.writeFileSync(file.getFilePath(), content);
        refactored++;
    } else {
        skipped++;
    }

    
  } catch (err) {
    console.warn(`Failed: ${file.getBaseName()} - ${err}`);
    skipped++;
  }
}

console.log(`\n✅ Enterprise Refactor Complete!`);
console.log(`Updated: ${refactored} files`);
console.log(`Skipped: ${skipped} files (already refactored or standard scripts)`);
