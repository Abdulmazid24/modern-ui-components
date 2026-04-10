# Modern UI Vault Agent Rules

This project follows a Multi-Framework Monorepo structure (2026 Standards).

## Architecture
- `apps/storefront`: The Next.js 16.2.3 website.
- `packages/react`: The core TSX component source.
- `packages/registry`: Metadata for the multi-language distribution.

## Guidelines for AI Agents
1. **Component Modification**: When editing a component in `packages/react`, you MUST run `npm run registry:build` in the root to sync the JSON registry.
2. **Client Components**: All UI components must start with `"use client";` to ensure compatibility with the App Router.
3. **Styling**: We use Tailwind CSS v4. Standard variables are defined in `apps/storefront/src/app/globals.css`.
4. **Versioning**: This is an enterprise-grade library. Prioritize Accessibility (WCAG 2.2) and Type Safety.
5. **Languages**: Currently supports React (TSX/JSX) and JS. Future-proof for Vue and Svelte.
