# Changelog

All notable changes to Modern UI Vault will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-13

### 🎉 Initial Release

#### Added
- **186 Animated React Components** across 140 categories
- **CLI Tool** (`npx modern-ui-vault`) with commands: `init`, `add`, `list`, `search`, `login`, `logout`, `doctor`
- **Multi-Dialect Support** — TSX and JSX auto-generated
- **Next.js 16 Storefront** — Component browser with live preview
- **LemonSqueezy Integration** — Pro licensing and payment flow
- **Supabase Backend** — License management, download analytics
- **Registry System** — Automated JSON manifest generation
- **Package Manager Detection** — Auto-detects npm, yarn, pnpm, bun
- **SEO Optimized** — Sitemap, robots.txt, OpenGraph, JSON-LD structured data
- **Rate Limiting** — API protection on verify and download endpoints

#### Component Categories Include
- Navigation: 15 navbar variants (Magnetic, Orbital, Nebula, Spectrum, etc.)
- Buttons: 5 premium button effects (Liquid Chrome, Singularity, Morph Login, etc.)
- Cards: Holographic Prism, Kinetic Origami, Holo Card
- Modals: Glass Shatter, Quantum Rift, Crystal Dialog
- Loaders: Accretion Disk, Bioluminescent Mycelium, Pulse, Spinner
- Forms: Aurora Input, OTP Input, Auth Forms, Rich Text Editor
- Data: Data Tables, Charts, Gantt, Heatmap, Tree Map
- And 120+ more...

#### Architecture
- NPM Workspace Monorepo
- `packages/react/` — Component source (TSX)
- `packages/cli/` — CLI tool
- `packages/registry/` — Schema definitions
- `apps/storefront/` — Next.js 16.2.3 showcase website
