# 🚀 Modern UI Vault (Universe 2026)

An enterprise-grade UI ecosystem featuring **370+ pro-grade components** across **234 categories**. Engineered for the next generation of web interfaces using **Next.js**, **Framer Motion**, and **Tailwind CSS v4**.

Unlike traditional component libraries, Modern UI Vault provides **raw source code ownership**. Use our CLI to inject high-performance, physics-based components directly into your codebase.

### ✨ Recent Additions (April 2026)
- **Phase 1: Enterprise Foundations** (Typography, Grids, Advanced Inputs, Pickers)
- **Phase 2: Professional Components** (Hero Sections, Bento Grids, Wizards, Dashboards)
- **Phase 3: Competitive Edge** (Pricing Matrix, Splitters, Roadmaps, Holographic Masonry)

---

## 🏗️ Architecture Overview

The project is structured as a high-performance monorepo using **npm workspaces** and **Turborepo** (optional):

- `apps/storefront`: Next.js 16 (App Router) documentation and registry server.
- `packages/react`: The core component library (370+ unique assets).
- `packages/cli`: The `modern-ui-vault` command-line interface.
- `packages/registry`: Type definitions and schema for the component distribution system.
- `scripts/`: Advanced AST-based tools for registry building and code refactoring.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/) (Physics-based springs)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript 5.9](https://www.typescriptlang.org/) (Strict Mode)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## ⚡ Quick Start (Consumer)

### 1. Initialize Project
```bash
npx modern-ui-vault init
```
*This installs core dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`) and creates `components.json`.*

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

# Start the storefront (Docs & Registry)
npm run dev
```

### Registry Management
Whenever you add or modify a component in `packages/react`, you must rebuild the registry:
```bash
npm run registry:build
```

---

## 🛡️ Engineering Standards

- **Zero-Dependency Core**: Components should rely on internal utils (`cn()`) and core peer-deps only.
- **Refractive Logic**: Use `useMotionValue` and `useSpring` for buttery smooth 60fps interactions.
- **Accessibility**: All interactive elements must follow WAI-ARIA patterns.
- **Theme Support**: First-class support for `dark` and `light` modes via Tailwind variables.

---

## 🤝 Support & Enterprise

- **Pro Updates**: 1 year of continuous legendary additions.
- **Custom Audits**: Performance and UX optimization for enterprise clients.
- **Contact**: engineering@modern-ui-vault.dev

---
*Built with passion by the Advanced Coding Team. © 2026 UI Universe.*
