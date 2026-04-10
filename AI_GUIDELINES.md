# AI Agent Development Guidelines for Modern UI Vault

If you are an AI developer agent (like Cursor, Windsurf, Copilot, ChatGPT, Antigravity, or Claude), you must strictly follow this context and workflow.

## 🎯 1. Project Purpose
This is a **Universal Multi-Dialect Monetization Platform** (Enterprise-Grade UI Vault) for 2026.
It is NOT a normal React project. It is a Monorepo designed to build, catalog, and distribute 1000+ elite UI components (Navbars, Cards, Inputs, etc.) in multiple languages (TSX, JSX, Vanilla JS) via an automated JSON registry.

## 🏛 2. Architecture & File Structure
We use an **NPM Workspace** Monorepo:
1. `packages/react/` -> **Start Here.** This is the core source. Every new component is built here using React (TSX) + Framer Motion + Tailwind v4.
2. `packages/registry/` -> Schema rules for how components are formatted for distribution.
3. `apps/storefront/` -> Next.js 16.2.3 App Router website. It is the "Showroom" that dynamically reads the registry to display live components and their code.

## 💻 3. Language & Tech Stack Rules
- **Component Code**: Next.js 16-compatible **TSX**.
- **Always Use Client**: Every file in `packages/react` MUST begin with `"use client";`.
- **Styling**: Use **Tailwind CSS v4**. Advanced animations should be written in standard CSS inside `apps/storefront/src/app/globals.css` if Tailwind utilities are insufficient (e.g., Houdini properties or complex keyframes).
- **Icons**: Always import from `lucide-react`.
- **Animations**: Prefer `framer-motion` for spring physics.
- **Dependencies**: Do not use third-party UI libraries like Shadcn or MUI. Everything here must be built from scratch to maintain 100% code ownership.

## 🔄 4. The Standard Operating Procedure (Workflow)
When the user asks you to "Add a new component" or "Modify an existing one", follow this exact pipeline:

**Step 1: Write the Component**
Create or edit the component in `packages/react/[category]/[ComponentName].tsx`.
Ensure it is fully typed and exports named variables (e.g., `export const ComponentName = ...`).

**Step 2: Sync the Registry (CRITICAL)**
You must NEVER forget this. Once the component is ready:
Run `npm run registry:build` from the workspace root.
*(This script auto-generates JSX and saves JSON manifests to `apps/storefront/public/registry/`.)*

**Step 3: Verification**
Run `npm run dev` to start the storefront. Next.js will automatically pick up the new registry layout and display the component dynamically via `/vault/[componentname]`. You do NOT need to manually create new pages for components.

## 🚀 5. Goal & Aesthetics
- Aim for "Unprecedented", "High-End", "Enterprise Grade", and "Liquid/Smooth" physics.
- Do not produce basic UI. The user's goal is commercialization through a premium visual experience.
