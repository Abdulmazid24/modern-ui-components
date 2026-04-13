#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const program = new Command();
const CONFIG_DIR = path.join(os.homedir(), '.modern-ui-vault');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

// In production, this would point to standard domain like https://ui-vault.com
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Utility to read config
const getConfig = () => {
    if (!fs.existsSync(CONFIG_FILE)) return {};
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
};

const saveConfig = (key: string, value: string) => {
    if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true });
    const config = getConfig();
    config[key] = value;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
};

// --- Package Manager Detection (Phase 8) ---
const getPackageManager = (): { name: string, installCmd: string } => {
    const cwd = process.cwd();
    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return { name: 'pnpm', installCmd: 'pnpm add' };
    if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return { name: 'yarn', installCmd: 'yarn add' };
    if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return { name: 'bun', installCmd: 'bun add' };
    return { name: 'npm', installCmd: 'npm install' };
};

program
  .name('modern-ui-vault')
  .description('The official CLI for Modern UI Vault Components')
  .version('1.0.0');

program
  .command('login')
  .description('Authenticate your CLI using a Pro License Key')
  .action(async () => {
      console.log(chalk.cyan.bold('\nWelcome to Modern UI Vault\n'));
      console.log(chalk.gray('Enter your Pro License Key to unlock extreme components.'));
      console.log(chalk.gray('Purchase keys at https://modern-ui-vault.dev/pricing\n'));

      const response = await prompts({
        type: 'password',
        name: 'licenseKey',
        message: 'License Key:'
      });

      if (!response.licenseKey) {
          console.log(chalk.red('Login aborted.'));
          return;
      }

      // Verify the key by hitting the API
      console.log(chalk.yellow('\nVerifying license...'));
      try {
          const res = await fetch(`${API_BASE}/verify`, {
              headers: { 'Authorization': `Bearer ${response.licenseKey}` }
          });

          if (res.ok) {
              const data = await res.json() as any;
              saveConfig('licenseKey', response.licenseKey);
              console.log(chalk.green(`\n✔ Success! Welcome, ${data.user || 'Pro User'}. Your CLI is authenticated.`));
          } else {
              console.log(chalk.red('\n✖ Invalid License Key. Subscription may be expired.'));
          }
      } catch (err) {
          console.log(chalk.red('\n✖ Could not connect to the verification server.'));
          // Proceed to save for offline dev anyway if we want, but best practice is reject.
          saveConfig('licenseKey', response.licenseKey); 
          console.log(chalk.gray('Saved token locally (Warning: Unverified)'));
      }
  });

program
  .command('add <component>')
  .description('Install a component into your project')
  .action(async (component: string) => {
      console.log(chalk.cyan(`\nInitiating download for [${component}]...`));

      const config = getConfig();
      const token = config.licenseKey || '';

      try {
          const res = await fetch(`${API_BASE}/components/${component}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          });

          if (res.status === 401 || res.status === 403) {
              console.log(chalk.red.bold('\n✖ [Pro Component Locked]'));
              console.log(chalk.gray('This is a premium component requiring an active subscription.'));
              console.log(chalk.cyan('Run: ') + chalk.white('npx modern-ui-vault login') + chalk.cyan(' to authenticate.\n'));
              return;
          }

          if (res.status === 429) {
              console.log(chalk.red.bold('\n✖ [Rate Limit Exceeded]'));
              console.log(chalk.gray('You are adding too many components too fast. Please wait a minute.\n'));
              return;
          }

          if (!res.ok) {
              console.log(chalk.red(`\n✖ Failed to fetch component: ${res.statusText} (${res.status})`));
              // Log the specific backend error if available
              const errData = await res.json().catch(() => null);
              if (errData?.error) console.log(chalk.gray(`Message: ${errData.error}\n`));
              return;
          }

          const data = await res.json() as any;
          let { name, content, dependencies, isBase64 } = data;

          if (isBase64) {
              content = Buffer.from(content, 'base64').toString('utf-8');
          }

          if (dependencies && dependencies.length > 0) {
             const pm = getPackageManager();
             console.log(chalk.yellow(`\nResolving dependencies via ${chalk.bold(pm.name)}...`));
             
             // Check package.json to see if we already have it to avoid redundant installs
             let depsToInstall = dependencies;
             if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
                 const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
                 const existingDeps = { ...pkg.dependencies, ...pkg.devDependencies };
                 depsToInstall = dependencies.filter((d: string) => !existingDeps[d]);
             }

             if (depsToInstall.length > 0) {
                 const cmd = `${pm.installCmd} ${depsToInstall.join(' ')}`;
                 console.log(chalk.gray(`> ${cmd}`));
                 execSync(cmd, { stdio: 'inherit' });
             } else {
                 console.log(chalk.green(`✔ All dependencies already installed.`));
             }
          }

          // Smart Path Resolution
          const cwd = process.cwd();
          let targetDir = path.join(cwd, 'components', 'ui');
          let utilsDir = path.join(cwd, 'lib');
          
          if (fs.existsSync(path.join(cwd, 'src'))) {
              targetDir = path.join(cwd, 'src', 'components', 'ui');
              utilsDir = path.join(cwd, 'src', 'lib');
          }

          if (fs.existsSync(path.join(cwd, 'components.json'))) {
              try {
                 const compConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'components.json'), 'utf-8'));
                 if (compConfig.aliases && compConfig.aliases.components) {
                    targetDir = path.join(cwd, compConfig.aliases.components.replace('@/', 'src/'), 'ui');
                 }
                 if (compConfig.aliases && compConfig.aliases.utils) {
                    utilsDir = path.join(cwd, compConfig.aliases.utils.replace('@/', 'src/').replace('/utils', ''));
                 }
              } catch(e) {}
          }

          if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
          if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });
          
          // Auto-inject cn utility if missing
          const utilsFile = path.join(utilsDir, 'utils.ts');
          if (!fs.existsSync(utilsFile)) {
             console.log(chalk.yellow(`\nInstalling cn() utility to ${utilsFile}...`));
             const cnContent = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
             fs.writeFileSync(utilsFile, cnContent);
             // Ensure dependencies for cn are installed
             const pm = getPackageManager();
             let utilsDeps = ['clsx', 'tailwind-merge'];
             if (fs.existsSync(path.join(cwd, 'package.json'))) {
                  const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
                  const existingDeps = { ...pkg.dependencies, ...pkg.devDependencies };
                  utilsDeps = utilsDeps.filter(d => !existingDeps[d]);
             }
             if(utilsDeps.length > 0) {
                 execSync(`${pm.installCmd} ${utilsDeps.join(' ')}`, { stdio: 'inherit' });
             }
          }

          const filePath = path.join(targetDir, `${name}.tsx`);
          fs.writeFileSync(filePath, content);

          console.log(chalk.green.bold(`\n✔ Successfully installed ${name}.tsx!`));
          console.log(chalk.gray(`Component Path: ${filePath}`));
          console.log(chalk.gray(`Utils Path: ${utilsFile}\n`));
          
      } catch (error: any) {
          console.log(chalk.red(`\n✖ An error occurred: ${error.message}`));
      }
  });

program.parse();
