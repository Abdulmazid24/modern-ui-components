# 🚀 Modern UI Vault (Universe 2026)

An enterprise-grade UI ecosystem featuring **372+ pro-grade components** across **244 categories**. Engineered for the next generation of web interfaces using **Next.js 16**, **Framer Motion 12**, and **Tailwind CSS v4**.

Unlike traditional component libraries, Modern UI Vault provides **raw source code ownership**. Use our CLI to inject high-performance, physics-based components directly into your codebase.

### ✨ Latest Updates (April 2026)
- **Phase 1: Enterprise Foundations** — Typography, Grids, Advanced Inputs, Pickers
- **Phase 2: Professional Components** — Hero Sections, Bento Grids, Wizards, Dashboards
- **Phase 3: Competitive Edge** — Pricing Matrix, Splitters, Roadmaps, Holographic Masonry
- **Phase 4: Automated Preview Pipeline** — 2560×1440 Retina WebP screenshots for all 372 components with LQIP blur placeholders

---

## 🏗️ Architecture Overview

The project is structured as a high-performance monorepo using **npm workspaces**:

```
modern-ui-components/
├── apps/storefront/          ← Next.js 16 (App Router) storefront & registry server
├── packages/
│   ├── react/                ← 372+ component source code (TSX) across 244 categories
│   ├── cli/                  ← `modern-ui-vault` CLI tool
│   └── registry/             ← Type definitions & schema for distribution
├── scripts/
│   ├── build-registry.ts     ← AST-based registry builder
│   └── generate-previews.js  ← Automated Retina screenshot generator (v3.0)
└── tests/                    ← Component smoke tests
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.2.3](https://nextjs.org/) (React 19, Turbopack)
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/) (Physics-based springs)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (WebP + LQIP generation)
- **Browser Automation**: [Playwright](https://playwright.dev/) (Headless screenshot capture)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## ⚡ Quick Start (Consumer)

### 1. Initialize Project
```bash
npx modern-ui-vault init
```
*Installs core dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`) and creates `components.json`.*

### 2. Add Components
```bash
npx modern-ui-vault add neon-tilt-card
```

---

## 💻 Local Development (Contributor)

### Prerequisites
- Node.js 20+
- PowerShell 7+ (for Windows users)

### Setup
```powershell
# Install dependencies
npm install

# Start the storefront
npm run dev
```

### Registry Management
When you add or modify a component in `packages/react/`, rebuild the registry:
```powershell
npm run registry:build
```

### Preview Generation
Generate high-resolution WebP preview images for all components:
```powershell
# Full regeneration (all 372 components)
node scripts/generate-previews.js

# Incremental mode (only new/missing components)
node scripts/generate-previews.js missing
```
> **Note:** The dev server (`npm run dev`) must be running in a separate terminal before executing the preview generator.

---

## 🖼️ Preview Pipeline

The automated preview system captures **2560×1440 Retina** screenshots:

| Feature | Specification |
|---|---|
| Resolution | 2560×1440px (2x Retina) |
| Format | WebP (quality 85) |
| LQIP | 32px base64 blur placeholders |
| Canvas | Cinematic aurora lighting + engineering grid |
| Automation | Playwright headless + Sharp processing |
| Output | `public/previews/*.webp` + `manifest.json` |

---

## 🛡️ Engineering Standards

- **Zero-Dependency Core**: Components rely on internal utils (`cn()`) and core peer-deps only.
- **Physics Animations**: Use `useMotionValue` and `useSpring` for buttery smooth 60fps interactions.
- **Accessibility**: All interactive elements follow WAI-ARIA patterns.
- **Theme Support**: First-class `dark` and `light` mode support via Tailwind variables.
- **SSR Compatible**: All components use `"use client"` directive for Next.js App Router compatibility.

---

## 🤝 Support & Enterprise

- **Pro Updates**: 1 year of continuous legendary additions.
- **Custom Audits**: Performance and UX optimization for enterprise clients.
- **Contact**: engineering@modern-ui-vault.dev

---
*Built with passion by the Advanced Coding Team. © 2026 UI Universe.*
