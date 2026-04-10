import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REACT_DIR = path.resolve(__dirname, '../packages/react');

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

async function addClientDirective() {
  walkDir(REACT_DIR, (filePath) => {
    if (filePath.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        console.log(`Adding "use client" to ${filePath}`);
        fs.writeFileSync(filePath, `"use client";\n\n${content}`);
      }
    }
  });
  console.log('All components updated with "use client" directive.');
}

addClientDirective();
