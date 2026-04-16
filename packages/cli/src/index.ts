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
const VERSION = '1.0.0';

// In production, this would point to your deployed domain
const API_BASE = process.env.VAULT_API_URL || 'https://modern-ui-vault.vercel.app/api';
const REGISTRY_BASE = process.env.VAULT_REGISTRY_URL || 'https://modern-ui-vault.vercel.app/registry';

// ─── Config Utilities ───────────────────────────────────────────

const getConfig = (): Record<string, any> => {
    if (!fs.existsSync(CONFIG_FILE)) return {};
    try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    } catch {
        return {};
    }
};

const saveConfig = (data: Record<string, any>) => {
    if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
};

const setConfigKey = (key: string, value: string) => {
    const config = getConfig();
    config[key] = value;
    saveConfig(config);
};

const removeConfigKey = (key: string) => {
    const config = getConfig();
    delete config[key];
    saveConfig(config);
};

// ─── Package Manager Detection ──────────────────────────────────

const getPackageManager = (): { name: string; installCmd: string } => {
    const cwd = process.cwd();
    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return { name: 'pnpm', installCmd: 'pnpm add' };
    if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return { name: 'yarn', installCmd: 'yarn add' };
    if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return { name: 'bun', installCmd: 'bun add' };
    return { name: 'npm', installCmd: 'npm install' };
};

// ─── Smart Path Resolution ──────────────────────────────────────

interface ProjectPaths {
    componentsDir: string;
    libDir: string;
    utilsFile: string;
}

function resolveProjectPaths(): ProjectPaths {
    const cwd = process.cwd();
    let componentsDir = path.join(cwd, 'components', 'ui');
    let libDir = path.join(cwd, 'lib');
    let resolvedAliasPath = '';

    // Check tsconfig.json for paths alias
    if (fs.existsSync(path.join(cwd, 'tsconfig.json'))) {
        try {
            // Very basic strip-comments and parse for compilerOptions.paths
            const tsconfigRaw = fs.readFileSync(path.join(cwd, 'tsconfig.json'), 'utf-8');
            const tsconfigCleaned = tsconfigRaw.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
            const tsConfig = JSON.parse(tsconfigCleaned);
            
            const paths = tsConfig?.compilerOptions?.paths;
            if (paths) {
                // Find alias for @/* or ~/*
                const aliasKey = Object.keys(paths).find(k => k.endsWith('/*'));
                if (aliasKey && paths[aliasKey] && paths[aliasKey][0]) {
                    const aliasTarget = paths[aliasKey][0].replace('/*', ''); // e.g. "./src" or "./"
                    resolvedAliasPath = path.join(cwd, aliasTarget);
                }
            }
        } catch { /* ignore parse errors */ }
    }

    // Default to src/ if it exists and no alias found
    if (!resolvedAliasPath && fs.existsSync(path.join(cwd, 'src'))) {
        resolvedAliasPath = path.join(cwd, 'src');
    } else if (!resolvedAliasPath) {
        resolvedAliasPath = cwd;
    }

    componentsDir = path.join(resolvedAliasPath, 'components', 'ui');
    libDir = path.join(resolvedAliasPath, 'lib');

    // Check for components.json (shadcn-style config overrides everything)
    if (fs.existsSync(path.join(cwd, 'components.json'))) {
        try {
            const compConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'components.json'), 'utf-8'));
            if (compConfig.aliases?.components) {
                // Instead of hardcoding 'src/', resolve relative to cwd + whatever prefix shadcn uses
                const compAlias = compConfig.aliases.components.replace(/^[@~]\//, ''); 
                componentsDir = path.join(resolvedAliasPath, compAlias, 'ui');
            }
            if (compConfig.aliases?.utils) {
                const utilsAlias = compConfig.aliases.utils.replace(/^[@~]\//, '');
                libDir = path.dirname(path.join(resolvedAliasPath, utilsAlias));
            }
        } catch { /* ignore parse errors */ }
    }

    return {
        componentsDir,
        libDir,
        utilsFile: path.join(libDir, 'utils.ts'),
    };
}

// ─── Dependency Installation Helper ─────────────────────────────

function installDeps(deps: string[]) {
    if (deps.length === 0) return;
    const pm = getPackageManager();
    const cwd = process.cwd();

    // Filter out already-installed deps
    let depsToInstall = deps;
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const existingDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        depsToInstall = deps.filter((d) => !existingDeps[d]);
    }

    if (depsToInstall.length === 0) {
        console.log(chalk.green('  ✔ All dependencies already installed.'));
        return;
    }

    const cmd = `${pm.installCmd} ${depsToInstall.join(' ')}`;
    console.log(chalk.gray(`  > ${cmd}`));
    execSync(cmd, { stdio: 'inherit', cwd });
}

// ─── Ensure Utils File Exists ───────────────────────────────────

function ensureUtils(paths: ProjectPaths) {
    if (!fs.existsSync(paths.libDir)) fs.mkdirSync(paths.libDir, { recursive: true });
    if (!fs.existsSync(paths.utilsFile)) {
        console.log(chalk.yellow(`  Installing cn() utility → ${paths.utilsFile}`));
        const cnContent = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
        fs.writeFileSync(paths.utilsFile, cnContent);
        installDeps(['clsx', 'tailwind-merge']);
    }
}

// ═══════════════════════════════════════════════════════════════
//  CLI PROGRAM
// ═══════════════════════════════════════════════════════════════

program
    .name('modern-ui-vault')
    .description(chalk.cyan.bold('Modern UI Vault') + ' — Enterprise-grade animated React components')
    .version(VERSION);

// ─── INIT ───────────────────────────────────────────────────────

program
    .command('init')
    .description('Initialize Modern UI Vault in your project')
    .action(async () => {
        console.log(chalk.cyan.bold('\n⚡ Modern UI Vault — Project Initialization\n'));

        // 1. Check if package.json exists
        const cwd = process.cwd();
        const pkgPath = path.join(cwd, 'package.json');
        if (!fs.existsSync(pkgPath)) {
            console.log(chalk.red('✖ No package.json found. Please run this inside a Node.js project.\n'));
            return;
        }

        // 2. Detect project type
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        const isNext = !!allDeps['next'];
        const isVite = !!allDeps['vite'];
        const isReact = !!allDeps['react'];

        console.log(chalk.gray(`  Detected: ${isNext ? 'Next.js' : isVite ? 'Vite' : isReact ? 'React' : 'Node.js'} project`));
        console.log(chalk.gray(`  Package Manager: ${getPackageManager().name}\n`));

        // 3. Install core dependencies
        console.log(chalk.yellow('📦 Installing core dependencies...\n'));
        installDeps(['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge']);

        // 4. Create directories and utils
        const paths = resolveProjectPaths();
        if (!fs.existsSync(paths.componentsDir)) {
            fs.mkdirSync(paths.componentsDir, { recursive: true });
            console.log(chalk.green(`  ✔ Created ${paths.componentsDir}`));
        }
        ensureUtils(paths);

        // 5. Create components.json config if it doesn't exist
        const configPath = path.join(cwd, 'components.json');
        if (!fs.existsSync(configPath)) {
            const hasSrc = fs.existsSync(path.join(cwd, 'src'));
            const config = {
                "$schema": "https://modern-ui-vault.vercel.app/schema.json",
                "style": "default",
                "tailwind": { "config": "tailwind.config.*", "css": hasSrc ? "src/app/globals.css" : "app/globals.css" },
                "aliases": {
                    "components": hasSrc ? "@/components" : "components",
                    "utils": hasSrc ? "@/lib/utils" : "lib/utils",
                },
                "registry": REGISTRY_BASE,
            };
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log(chalk.green('  ✔ Created components.json'));
        }

        console.log(chalk.green.bold('\n✔ Initialization complete!\n'));
        console.log(chalk.white('  Next steps:'));
        console.log(chalk.gray('  1. Browse components at ') + chalk.cyan('https://modern-ui-vault.vercel.app'));
        console.log(chalk.gray('  2. Add a component:     ') + chalk.white('npx modern-ui-vault add animated-button'));
        console.log(chalk.gray('  3. Pro access:          ') + chalk.white('npx modern-ui-vault login'));
        console.log('');
    });

// ─── LOGIN ──────────────────────────────────────────────────────

program
    .command('login')
    .description('Authenticate with a Pro License Key')
    .action(async () => {
        console.log(chalk.cyan.bold('\n🔐 Modern UI Vault — Authentication\n'));
        console.log(chalk.gray('Enter your Pro License Key to unlock premium components.'));
        console.log(chalk.gray('Purchase keys at https://modern-ui-vault.vercel.app/pricing\n'));

        const response = await prompts({
            type: 'password',
            name: 'licenseKey',
            message: 'License Key:',
        });

        if (!response.licenseKey) {
            console.log(chalk.red('  Login aborted.\n'));
            return;
        }

        console.log(chalk.yellow('\n  Verifying license...'));
        try {
            const res = await fetch(`${API_BASE}/verify`, {
                headers: { Authorization: `Bearer ${response.licenseKey}` },
            });

            if (res.ok) {
                const data = (await res.json()) as any;
                setConfigKey('licenseKey', response.licenseKey);
                setConfigKey('authenticatedAt', new Date().toISOString());
                console.log(chalk.green(`\n  ✔ Success! Welcome, ${data.user || 'Pro User'}. CLI authenticated.\n`));
            } else {
                const errData = (await res.json().catch(() => null)) as any;
                console.log(chalk.red(`\n  ✖ Authentication failed: ${errData?.error || res.statusText}`));
                console.log(chalk.gray('  Ensure your license key is valid and not expired.\n'));
                // DO NOT save invalid tokens locally — security fix
            }
        } catch {
            console.log(chalk.red('\n  ✖ Could not connect to the verification server.'));
            console.log(chalk.gray('  Please check your internet connection and try again.\n'));
            // DO NOT save tokens when verification cannot be confirmed — security fix
        }
    });

// ─── LOGOUT ─────────────────────────────────────────────────────

program
    .command('logout')
    .description('Remove stored license credentials')
    .action(() => {
        const config = getConfig();
        if (!config.licenseKey) {
            console.log(chalk.gray('\n  No active session found.\n'));
            return;
        }
        removeConfigKey('licenseKey');
        removeConfigKey('authenticatedAt');
        console.log(chalk.green('\n  ✔ Successfully logged out. License key removed.\n'));
    });

// ─── ADD ────────────────────────────────────────────────────────

program
    .command('add <component>')
    .description('Install a component into your project')
    .option('-d, --dialect <dialect>', 'Code dialect: tsx or jsx', 'tsx')
    .action(async (component: string, options: { dialect: string }) => {
        console.log(chalk.cyan(`\n⏬ Downloading [${component}]...\n`));

        const config = getConfig();
        const token = config.licenseKey || '';

        try {
            const res = await fetch(`${API_BASE}/components/${component}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401 || res.status === 403) {
                console.log(chalk.red.bold('  ✖ [Pro Component Locked]'));
                console.log(chalk.gray('  This is a premium component requiring an active Pro license.'));
                console.log(chalk.cyan('  Run: ') + chalk.white('npx modern-ui-vault login') + chalk.cyan(' to authenticate.\n'));
                return;
            }

            if (res.status === 429) {
                console.log(chalk.red.bold('  ✖ [Rate Limit Exceeded]'));
                console.log(chalk.gray('  Too many requests. Please wait a minute and try again.\n'));
                return;
            }

            if (res.status === 404) {
                console.log(chalk.red(`  ✖ Component "${component}" not found in the registry.`));
                console.log(chalk.gray('  Run: ') + chalk.white('npx modern-ui-vault list') + chalk.gray(' to see all available components.\n'));
                return;
            }

            if (!res.ok) {
                const errData = (await res.json().catch(() => null)) as any;
                console.log(chalk.red(`  ✖ Failed to fetch: ${errData?.error || res.statusText}\n`));
                return;
            }

            const data = (await res.json()) as any;
            let { name, content, dependencies, isBase64 } = data;

            if (isBase64) {
                content = Buffer.from(content, 'base64').toString('utf-8');
            }

            // Install dependencies
            if (dependencies && dependencies.length > 0) {
                console.log(chalk.yellow('  📦 Resolving dependencies...'));
                installDeps(dependencies);
            }

            // Resolve paths & ensure directories
            const paths = resolveProjectPaths();
            if (!fs.existsSync(paths.componentsDir)) fs.mkdirSync(paths.componentsDir, { recursive: true });
            ensureUtils(paths);

            // Write component file
            const ext = options.dialect === 'jsx' ? '.jsx' : '.tsx';
            const filePath = path.join(paths.componentsDir, `${name}${ext}`);
            fs.writeFileSync(filePath, content);

            console.log(chalk.green.bold(`\n  ✔ Installed ${name}${ext}!`));
            console.log(chalk.gray(`  Component: ${filePath}`));
            console.log(chalk.gray(`  Utils:     ${paths.utilsFile}\n`));

        } catch (error: any) {
            console.log(chalk.red(`\n  ✖ An error occurred: ${error.message}\n`));
        }
    });

// ─── LIST ───────────────────────────────────────────────────────

program
    .command('list')
    .description('List all available components')
    .option('-c, --category <category>', 'Filter by category')
    .action(async (options: { category?: string }) => {
        console.log(chalk.cyan.bold('\n📦 Modern UI Vault — Component Registry\n'));

        try {
            const res = await fetch(`${REGISTRY_BASE}/index.json`);
            if (!res.ok) {
                console.log(chalk.red('  ✖ Could not fetch registry. Is the server running?\n'));
                return;
            }

            const data = (await res.json()) as any;
            const components = data.components || [];

            if (components.length === 0) {
                console.log(chalk.gray('  No components found in the registry.\n'));
                return;
            }

            // Group by category
            const grouped: Record<string, any[]> = {};
            for (const comp of components) {
                const cat = comp.category;
                if (options.category && cat.toLowerCase() !== options.category.toLowerCase()) continue;
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(comp);
            }

            let totalShown = 0;
            const categories = Object.keys(grouped).sort();
            for (const cat of categories) {
                console.log(chalk.yellow.bold(`  ${cat.toUpperCase()}`));
                for (const comp of grouped[cat]) {
                    const proTag = comp.isPro ? chalk.red(' [PRO]') : '';
                    console.log(chalk.white(`    ${comp.title}`) + chalk.gray(` (${comp.name})`) + proTag);
                    totalShown++;
                }
                console.log('');
            }

            console.log(chalk.gray(`  Total: ${totalShown} components in ${categories.length} categories`));
            console.log(chalk.gray('  Install any: ') + chalk.white('npx modern-ui-vault add <component-name>\n'));

        } catch {
            console.log(chalk.red('  ✖ Could not connect to the registry server.\n'));
        }
    });

// ─── SEARCH ─────────────────────────────────────────────────────

program
    .command('search <query>')
    .description('Search for components by name or category')
    .action(async (query: string) => {
        console.log(chalk.cyan(`\n🔍 Searching for "${query}"...\n`));

        try {
            const res = await fetch(`${REGISTRY_BASE}/index.json`);
            if (!res.ok) {
                console.log(chalk.red('  ✖ Could not fetch registry.\n'));
                return;
            }

            const data = (await res.json()) as any;
            const components = data.components || [];
            const q = query.toLowerCase();
            const results = components.filter((c: any) =>
                c.name.toLowerCase().includes(q) ||
                c.title.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q)
            );

            if (results.length === 0) {
                console.log(chalk.gray(`  No components matching "${query}".`));
                console.log(chalk.gray('  Run: ') + chalk.white('npx modern-ui-vault list') + chalk.gray(' to see all.\n'));
                return;
            }

            for (const comp of results) {
                const proTag = comp.isPro ? chalk.red(' [PRO]') : '';
                console.log(
                    chalk.white(`  ${comp.title}`) +
                    chalk.gray(` (${comp.name})`) +
                    chalk.yellow(` [${comp.category}]`) +
                    proTag
                );
            }

            console.log(chalk.gray(`\n  Found ${results.length} result(s).\n`));

        } catch {
            console.log(chalk.red('  ✖ Could not connect to the registry server.\n'));
        }
    });

// ─── DOCTOR ─────────────────────────────────────────────────────

program
    .command('doctor')
    .description('Check your project setup for issues')
    .action(() => {
        console.log(chalk.cyan.bold('\n🩺 Modern UI Vault — Project Health Check\n'));

        const cwd = process.cwd();
        const checks: { label: string; ok: boolean; detail: string }[] = [];

        // 1. package.json
        const hasPkg = fs.existsSync(path.join(cwd, 'package.json'));
        checks.push({ label: 'package.json', ok: hasPkg, detail: hasPkg ? 'Found' : 'Missing — not a Node.js project' });

        if (hasPkg) {
            const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };

            // 2. Core dependencies
            const coreDeps = ['react', 'framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'];
            for (const dep of coreDeps) {
                const installed = !!deps[dep];
                checks.push({
                    label: dep,
                    ok: installed,
                    detail: installed ? `v${deps[dep]}` : 'Not installed — run: npx modern-ui-vault init',
                });
            }

            // 3. Tailwind
            const hasTw = !!deps['tailwindcss'] || !!deps['@tailwindcss/postcss'];
            checks.push({ label: 'Tailwind CSS', ok: hasTw, detail: hasTw ? 'Found' : 'Not detected' });
        }

        // 4. components.json
        const hasConfig = fs.existsSync(path.join(cwd, 'components.json'));
        checks.push({ label: 'components.json', ok: hasConfig, detail: hasConfig ? 'Found' : 'Run: npx modern-ui-vault init' });

        // 5. Utils file
        const paths = resolveProjectPaths();
        const hasUtils = fs.existsSync(paths.utilsFile);
        checks.push({ label: 'cn() utility', ok: hasUtils, detail: hasUtils ? paths.utilsFile : 'Missing' });

        // 6. Auth
        const config = getConfig();
        const hasAuth = !!config.licenseKey;
        checks.push({
            label: 'Pro License',
            ok: hasAuth,
            detail: hasAuth ? `Authenticated (${config.authenticatedAt || 'unknown date'})` : 'Not authenticated — Free tier only',
        });

        // Print results
        for (const check of checks) {
            const icon = check.ok ? chalk.green('✔') : chalk.red('✖');
            console.log(`  ${icon} ${chalk.white(check.label)}: ${chalk.gray(check.detail)}`);
        }

        const failCount = checks.filter((c) => !c.ok).length;
        if (failCount === 0) {
            console.log(chalk.green.bold('\n  All checks passed! Project is ready.\n'));
        } else {
            console.log(chalk.yellow(`\n  ${failCount} issue(s) found. Fix them for the best experience.\n`));
        }
    });

// ─── Parse and Run ──────────────────────────────────────────────

program.parse();
