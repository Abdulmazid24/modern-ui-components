export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  categories: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "actions",
    name: "Actions & Buttons",
    description: "Interactive triggers with physics-based feedback.",
    icon: "zap",
    color: "from-violet-500 to-purple-600",
    categories: [
      "button", "loading-button", "magnetic", "toggle", "floating-action",
      "share-menu", "copy-button", "magnetic-button", "float-button", "chip",
      "segmented-control", "toggle-group", "theme-toggle", "cool-mode",
    ],
  },
  {
    id: "inputs",
    name: "Forms & Inputs",
    description: "Modern, validation-ready data collection components.",
    icon: "input",
    color: "from-blue-500 to-cyan-500",
    categories: [
      "input", "textarea", "select", "multi-select", "radio-group", "checkbox",
      "switch", "slider", "otp-input", "password-meter", "date-picker",
      "date-range-picker", "combobox", "aurora-input", "auth-form", "form",
      "search", "color-picker", "signature-pad", "captcha", "rating",
      "auto-complete", "cascader", "tag-input", "input-number", "time-picker",
      "input-group", "mentions", "number-stepper", "editable-text",
      "contact-form", "color-palette", "file-uploader", "dial",
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Fluid and intuitive wayfinding systems.",
    icon: "navigation",
    color: "from-emerald-500 to-teal-500",
    categories: [
      "navbar", "sidebar", "dock", "dock-menu", "dock-navigation", "tabs",
      "breadcrumbs", "pagination", "stepper", "command-palette", "scroll-spy",
      "scroll-to-top", "footer", "navigation-menu", "menu", "menubar",
      "back-to-top", "anchor", "affix", "steps", "toolbar", "scroll",
      "scroll-progress", "page-header",
    ],
  },
  {
    id: "feedback",
    name: "Feedback & Status",
    description: "State indicators and real-time status pulses.",
    icon: "alert",
    color: "from-amber-500 to-orange-500",
    categories: [
      "alert", "toast", "notification", "skeleton", "loader", "progress-bar",
      "circular-progress", "gauge", "empty-state", "error-boundary", "spinner",
      "loading-overlay", "message", "result-page", "popconfirm",
      "notification-center", "alert-dialog",
    ],
  },
  {
    id: "data",
    name: "Data Display",
    description: "High-density information layout components.",
    icon: "grid",
    color: "from-pink-500 to-rose-500",
    categories: [
      "card", "tilt-card", "bento-grid", "table", "data-table",
      "heatmap-table", "stats", "analog-clock", "calendar", "timeline",
      "tree-view", "tree-map", "tech-tree", "kbd", "badge", "qr-code",
      "data-card", "data-grid", "stat-card", "statistic", "avatar",
      "avatar-circles", "descriptions", "list", "animated-list",
      "animated-counter", "comparison-table", "countdown", "label",
      "changelog", "roadmap", "file-tree", "activity-feed",
    ],
  },
  {
    id: "visualization",
    name: "Visualization",
    description: "Interactive graphs and complex data structures.",
    icon: "line-chart",
    color: "from-cyan-500 to-blue-600",
    categories: [
      "chart", "gantt-chart", "node-graph", "globe", "tag-sphere",
      "floorplan-viewer", "tree-select", "icon-cloud", "map-pin", "3d-pin",
    ],
  },
  {
    id: "visual-effects",
    name: "Visual Effects",
    description: "Cinematic backgrounds and sensory animations.",
    icon: "sparkles",
    color: "from-fuchsia-500 to-pink-500",
    categories: [
      "particle-bg", "aurora-background", "spotlight", "text-effects",
      "cursor-effects", "scroll-animation", "confetti", "effects", "marquee",
      "ticker-tape", "typewriter", "gradient-border", "dot-pattern",
      "shine-border", "progressive-blur", "direction-aware-hover", "blur-fade",
      "lamp-effect", "morphing-text", "sparkles", "meteors", "wavy-background",
      "highlight",
    ],
  },
  {
    id: "overlays",
    name: "Overlays & Layout",
    description: "Contextual layers and structural containers.",
    icon: "layers",
    color: "from-indigo-500 to-violet-500",
    categories: [
      "modal", "dialog", "drawer", "sheet", "popover", "tooltip",
      "context-menu", "dropdown-menu", "collapsible", "accordion",
      "resizable", "separator", "aspect-ratio", "scroll-area", "hover-card",
      "link-preview", "splitter", "divider", "spoiler", "app-layout",
      "layout", "grid", "masonry",
    ],
  },
  {
    id: "media",
    name: "Media & Lab",
    description: "Advanced audio, video, and experimental controls.",
    icon: "play",
    color: "from-red-500 to-orange-500",
    categories: [
      "audio-player", "audio-eq", "video-controls", "gallery", "image-cropper",
      "magnifier", "virtual-joystick", "before-after", "coverflow",
      "hero-slider", "carousel", "animated-carousel", "video-call",
      "device-mockup", "image",
    ],
  },
  {
    id: "heroes",
    name: "Heroes & Sections",
    description: "High-impact landing page sections and feature showcases.",
    icon: "monitor",
    color: "from-sky-500 to-indigo-500",
    categories: [
      "hero-section", "hero-parallax", "hero-video-dialog", "cta-banner",
      "macbook-scroll", "feature-grid", "logo-cloud", "infinite-moving-cards",
      "marquee-testimonials",
    ],
  },
  {
    id: "commerce",
    name: "Commerce & Payments",
    description: "E-commerce flows, pricing, and transaction components.",
    icon: "shopping-cart",
    color: "from-green-500 to-emerald-500",
    categories: [
      "shopping-cart", "checkout-flow", "pricing", "pricing-cards",
      "pricing-toggle", "product-card", "credit-card", "order-tracker",
      "wallet-connect", "cookie-consent",
    ],
  },
  {
    id: "content",
    name: "Content & Code",
    description: "Rich text, code display, and content formatting.",
    icon: "file-text",
    color: "from-slate-400 to-zinc-500",
    categories: [
      "blockquote", "code-block", "code-comparison", "code-highlight",
      "prose", "typography", "rich-text-editor", "watermark", "terminal",
      "tweet-card",
    ],
  },
  {
    id: "social",
    name: "Social & Community",
    description: "Communication, profiles, and social interaction components.",
    icon: "users",
    color: "from-orange-500 to-amber-500",
    categories: [
      "chat-interface", "comment", "newsletter", "social-icons",
      "testimonial", "team-section", "user-profile", "faq",
      "settings-panel",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise & AI",
    description: "Advanced AI, biometric, spatial, and gamification systems.",
    icon: "cpu",
    color: "from-purple-600 to-blue-600",
    categories: [
      "ai-copilot", "biometric-auth", "spatial-ar", "gamification",
      "canvas-editor", "calculator", "guided-tour", "onboarding", "kanban",
      "sortable-list", "transfer-list", "accessibility",
    ],
  },
];

export const getGroupByCategory = (category: string): CategoryGroup | undefined => {
  return CATEGORY_GROUPS.find((group) =>
    group.categories.includes(category.toLowerCase())
  );
};

export const getGroupColor = (category: string): string => {
  const group = getGroupByCategory(category);
  return group?.color ?? "from-zinc-600 to-zinc-700";
};
