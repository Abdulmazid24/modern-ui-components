/**
 * Modern UI Vault — Shared Configuration (Single Source of Truth)
 * 
 * This file centralizes all constants, tier definitions, and component
 * classifications used across the CLI, API routes, and Storefront.
 * 
 * @version 1.0.0
 * @license Commercial
 */

// ─── Site Configuration ─────────────────────────────────────────
export const SITE_CONFIG = {
  name: "Modern UI Vault",
  tagline: "The next generation of UI components.",
  description:
    "Enterprise-grade, multi-dialect React component library featuring unprecedented animations and physics-based interactions.",
  version: "1.0.0",
  /** Update this when you purchase a domain */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://modern-ui-vault.vercel.app",
  author: "Abdul Mazid",
  year: 2026,
  socials: {
    github: "https://github.com/Abdulmazid24/modern-ui-components",
    twitter: "",
    discord: "",
  },
} as const;

// ─── Pricing Tiers ──────────────────────────────────────────────
export const PRICING_TIERS = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    currency: "USD",
    description: "Core components for personal projects",
    features: [
      "70+ Free Components",
      "TSX & JSX Dialects",
      "CLI Installation",
      "Community Support",
      "MIT License (Free Components)",
    ],
    lemonSqueezyProductId: null,
    lemonSqueezyVariantId: null,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 79,
    currency: "USD",
    description: "Full vault access for individual developers",
    features: [
      "All 300+ Components",
      "All Dialects (TSX, JSX, future Vue/Svelte)",
      "1 Year of Updates",
      "3 Machine Activations",
      "Priority Email Support",
      "Commercial License",
      "Premium Templates (Coming Soon)",
    ],
    /** Replace with your actual LemonSqueezy product/variant IDs */
    lemonSqueezyProductId: process.env.LEMONSQUEEZY_PRO_PRODUCT_ID || "",
    lemonSqueezyVariantId: process.env.LEMONSQUEEZY_PRO_VARIANT_ID || "",
  },
  team: {
    id: "team",
    name: "Team",
    price: 199,
    currency: "USD",
    description: "For teams of up to 10 developers",
    features: [
      "Everything in Pro",
      "10 Machine Activations",
      "Team License Agreement",
      "Slack/Discord Priority Channel",
      "Early Access to New Components",
    ],
    lemonSqueezyProductId: process.env.LEMONSQUEEZY_TEAM_PRODUCT_ID || "",
    lemonSqueezyVariantId: process.env.LEMONSQUEEZY_TEAM_VARIANT_ID || "",
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    currency: "USD",
    description: "Unlimited seats with white-label rights",
    features: [
      "Everything in Team",
      "Unlimited Machine Activations",
      "White-Label Rights",
      "Custom Component Requests (2/month)",
      "Dedicated Support Channel",
      "SLA Guarantee",
    ],
    lemonSqueezyProductId: process.env.LEMONSQUEEZY_ENTERPRISE_PRODUCT_ID || "",
    lemonSqueezyVariantId: process.env.LEMONSQUEEZY_ENTERPRISE_VARIANT_ID || "",
  },
} as const;

// ─── Pro-Tier Component Registry ────────────────────────────────
// These components require a valid Pro/Team/Enterprise license to download.
// Add new pro component slugs here — this list is used by:
//   - API route: /api/components/[name]
//   - Storefront: /vault/[name] (lock icon, code blur)
//   - CLI: access gate messaging
export const PRO_COMPONENTS: string[] = [
  // Cards
  "holographicprismcard",
  "kineticorigamicard",
  // Modals
  "glassshattermodal",
  "quantumriftmodal",
  // Navigation
  "atmospherichalonav",
  "magneticliquiddock",
  "holographicmenubar",
  "dimensionalnavigationmenu",
  // Loaders
  "accretiondiskloader",
  "bioluminescentmycelium",
  "neoncubeloader",
  "gradientringloader",
  "chromaringloader",
  // Toggles & Switches
  "zerogravitytoggle",
  "microportalswitch",
  "neumorphicswitch",
  "holographicswitch",
  "animated3dtoggle",
  "asymmetrictoggle",
  "softtoggleswitch",
  "spacetoggleswitch",
  // Data Visualization
  "geometrictreemap",
  "synapsenodegraph",
  "hologlobe",
  // Specialized
  "holodropzone",
  "mechanicalclock",
  "neumorphicanalogclock",
  "aicommsterminal",
  "physicalcreditcard",
  "vaultpasswordmeter",
  "rpgskilltree",
  "blueprintmapper",
  "wordcloudsphere",
  "thumbstickpad",
  "magnetickanban",
  "hackerterminal",
  "hapticdial",
  "softneumorphiccalculator",
  "glowingradionav",
  "glassradiogroup",
  // ─── New God-Tier Components (April 2026) ──────────────────
  // High Priority — Complex Enterprise
  "quantumlabel",
  "realitytearalertdialog",
  "synapticmentions",
  "gravitytransferlist",
  "neuralinputgroup",
  // Medium Priority — Advanced Interactions
  "holographicguidedtour",
  "orbitingfloatbutton",
  "vortexpopconfirm",
  // Nice to Have — Premium Visual Effects
  "nebulaeiconcloud",
  "celestiallamp",
  "cinematicmacbookscroll",
  "cosmicheroparallax",
  "cosmiccoolmode",
  // Phase 2: Professional Components
  "quantumhero",
  "kinetictestimonial",
  "neuralnotificationcenter",
  "holographicfaq",
  "cosmicctabanner",
  "bentofeaturegrid",
  "holographiclogocloud",
  "kineticteamgrid",
  "neuralcontactform",
  "plasmanewsletter",
  "holographiccookieconsent",
  "quantumbacktotop",
  "kineticblockquote",
  "neoncodehighlight",
  "neuraluserprofile",
  "neonstatcard",
  "quantumdatacard",
  "neonhighlight",
  "quantumeditabletext",
  "plasmataginput",
  "holographiclinkpreview",
  "dimensionalsettingspanel",
  "threadedcomment",
  "holographicwizard",
  // Phase 3: Competitive Components
  "cosmiccomparisontable",
  "dimensionalchangelog",
  "quantumroadmap",
  "holographicmasonry",
  "plasmasplitter",
  "nebulamarqueetestimonials",
  "prismaticpricingtoggle",
  "enterpriseappshell",
  "cinematicpageheader",
  "orbitordertracker",
];


/**
 * Check if a component slug is in the Pro tier.
 */
export function isProComponent(slug: string): boolean {
  return PRO_COMPONENTS.includes(slug.toLowerCase());
}

// ─── Component Categories (Canonical Names) ─────────────────────
// Used to normalize duplicate categories (e.g., "buttons" → "button")
export const CATEGORY_ALIASES: Record<string, string> = {
  buttons: "button",
  cards: "card",
  inputs: "input",
  loaders: "loader",
};

/**
 * Normalize a category name using canonical aliases.
 */
export function normalizeCategory(category: string): string {
  return CATEGORY_ALIASES[category.toLowerCase()] || category.toLowerCase();
}

// ─── Dependencies Map ───────────────────────────────────────────
// Known import-to-package mappings for dependency detection
export const IMPORT_PACKAGE_MAP: Record<string, string> = {
  "framer-motion": "framer-motion",
  "lucide-react": "lucide-react",
  "clsx": "clsx",
  "tailwind-merge": "tailwind-merge",
  "@supabase/supabase-js": "@supabase/supabase-js",
};

// ─── Rate Limiting Defaults ─────────────────────────────────────
export const RATE_LIMIT = {
  /** Max requests per window for verify endpoint */
  verifyMax: 10,
  /** Max requests per window for component download */
  downloadMax: 20,
  /** Window duration in milliseconds (1 minute) */
  windowMs: 60_000,
} as const;
