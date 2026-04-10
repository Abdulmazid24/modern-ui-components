# Modern UI Vault 🚀

> **The Enterprise-Grade UI Engine for 2026.** A massively scalable, multi-dialect component library featuring **100+ legendary UI primitives** with physics-based animations, an authenticated CLI, and a freemium monetization engine.

[![Next.js 16.2](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19.2](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Tailwind v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Physics-FF0055?logo=framer&logoColor=white)](https://motion.dev)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-729B1B?logo=vitest&logoColor=white)](https://vitest.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)

---

## 🏛 Architecture

```
modern-ui-vault/
├── apps/
│   └── storefront/          # Next.js 16 Documentation & Showroom
│       ├── src/app/
│       │   ├── api/          # Secure Component Distribution API
│       │   │   ├── components/[name]/  # CLI fetches components here
│       │   │   ├── verify/             # License key verification
│       │   │   └── og/                 # Dynamic OpenGraph images
│       │   ├── vault/[name]/ # Component docs (Preview/Code/Install tabs)
│       │   ├── sitemap.ts    # Auto-generated SEO sitemap
│       │   └── robots.ts     # Search engine directives
│       └── src/lib/
│           └── supabase.ts   # Database client
├── packages/
│   ├── cli/                  # @modern-ui/cli (npx modern-ui-vault)
│   ├── react/                # 100+ Source Components (TSX)
│   │   ├── button/           # ← Drop multiple variants here
│   │   ├── cards/
│   │   ├── gauge/
│   │   └── ...100 categories
│   └── registry/             # Schema definitions
├── scripts/
│   └── build-registry.ts     # Auto-indexes ALL components
├── tests/
│   ├── setup.ts
│   └── components.test.tsx   # Vitest smoke tests
└── vitest.config.ts
```

---

## 🚀 Quick Start

```bash
# 1. Install all workspace dependencies
npm install

# 2. Build the component registry
npm run registry:build

# 3. Run the documentation site
npm run dev

# 4. Run tests
npm test
```

---

## 📦 CLI Usage

Install components directly into your project:

```bash
# Install a free component
npx modern-ui-vault add frequencyequalizer

# Authenticate for Pro components
npx modern-ui-vault login

# Install a Pro component (requires license)
npx modern-ui-vault add mechanicalclock
```

The CLI automatically detects your package manager (`npm`, `yarn`, `pnpm`, `bun`) and resolves dependencies accordingly.

---

## 🎯 100 Component Categories

| # | Category | Component | Tier |
|---|----------|-----------|------|
| 1 | `button` | MorphButton | Free |
| 2 | `cards` | HolographicCard | Free |
| 3 | `carousel` | AnimatedCarousel | Free |
| 4 | `audio-player` | SonicMediaPlayer | Free |
| 5 | `dock-navigation` | GravityDock | Free |
| 6 | `chart` | QuantumLineChart | Free |
| 7 | `calendar` | IsometricCalendar | Free |
| 8 | `terminal` | HackerTerminal | Pro 🔒 |
| 9 | `kanban` | MagneticKanban | Pro 🔒 |
| 10 | `globe` | HoloGlobe | Pro 🔒 |
| ... | *90 more* | ... | ... |

> Run `npm run registry:build` to see the full index at `apps/storefront/public/registry/index.json`

---

## 💰 Monetization Architecture

| Revenue Stream | Details |
|---|---|
| **Freemium CLI** | 50+ free components, 50+ locked behind Pro license keys |
| **Premium Templates** | Full-page layouts built with vault components |
| **Figma Design Kits** | Matching design system for UI/UX designers |
| **Carbon Ads** | Developer-targeted ads in documentation sidebar |
| **Affiliate Links** | Vercel, Supabase, Clerk integrations |
| **Enterprise Consulting** | Custom integration packages |

---

## 🛠 Adding New Components

1. Create your file in `packages/react/[category]/[ComponentName].tsx`
2. Ensure `"use client";` directive at top
3. Use `framer-motion` for animations and `lucide-react` for icons
4. Run the registry builder:
   ```bash
   npm run registry:build
   ```

**Scaling within categories:** Drop multiple `.tsx` files in any category folder. The registry automatically indexes every file independently.

---

## 🔐 Environment Variables

Copy `apps/storefront/.env.example` to `.env.local`:

```bash
# Supabase (Free Tier)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_key

# Stripe (for payment processing)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

---

## 🙋‍♂️ Author

**Abdul Mazid** — Architecture & Engineering.

> ⭐ This project is designed for infinite scale. Add 1000+ components across 100+ categories without any architectural changes.
