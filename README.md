# Modern UI Components Vault 🚀

A highly scalable, enterprise-grade **UI Component Library** built with **React (Vite, TypeScript)** and **Tailwind CSS v4**. This repository serves as a curated vault for stunning, production-ready UI templates — ready to drag-and-drop into any Next.js, MERN stack, or modern web project.

---

## 📌 Project Overview

As a modern web developer, you frequently need pixel-perfect, interactive UI pieces — animated navbars, login forms, loading spinners, social share menus, and more. This repository centralizes all those "WOW" components. Discover a trending design? Implement it here, preview it live, and seamlessly copy-paste it into your client or enterprise projects.

### Core Technologies

| Technology | Version |
|---|---|
| **React** | 19.x |
| **Vite** | 8.x |
| **TypeScript** | 5.9 |
| **Tailwind CSS** | v4.2 (`@tailwindcss/vite`) |
| **Icons** | `lucide-react` + custom SVGs |

---

## 🎯 Component Catalog

### 1. 🔐 3D Neumorphic Auth System
Beautifully crafted Login & Signup forms with soft 3D neumorphic shadows, smooth interactions, and custom CSS variables.

| Component | File | Description |
|---|---|---|
| `NeumorphicButton` | `components/NeumorphicButton.tsx` | Pressable 3D button with inset-shadow active state |
| `NeumorphicCard` | `components/NeumorphicCard.tsx` | Floating card container with depth shadows |
| `NeumorphicInput` | `components/NeumorphicInput.tsx` | Inset input field with optional icon slot |
| Login Page | `pages/Login.tsx` | Complete login form with email, password, show/hide toggle |
| Signup Page | `pages/Signup.tsx` | Full signup form with name, email, password confirmation |

---

### 2. ✨ Magic Navigation Menu
A smooth, animated bottom navigation bar with a **magic curved indicator** that follows the active icon — featuring a bouncy cubic-bezier animation and CSS box-shadow curve technique.

| Component | File | Description |
|---|---|---|
| `MagicNavbar` | `components/MagicNavbar.tsx` | Reusable nav with controlled/uncontrolled mode, full ARIA keyboard navigation |
| Demo Page | `pages/MagicNavbarDemo.tsx` | Phone-mockup showcase with dynamic tab content |

**Key Features:**
- 🎯 Controlled & Uncontrolled toggle mode
- ♿ Full accessibility — `role="tablist"`, `aria-selected`, Arrow/Home/End keys
- 🎨 CSS custom properties — instant theme switching via `--magic-nav-*` variables
- 🏃 Bouncy `cubic-bezier(0.68, -0.55, 0.27, 1.55)` animation

---

### 3. 🔄 CSS Loader Animations
Five enterprise-grade loading spinners — fully configurable size, color, speed, and accessibility labels.

| Component | File | Description |
|---|---|---|
| `DotsLoader` | `components/loaders/DotsLoader.tsx` | 3 bouncing dots with staggered delay |
| `BarsLoader` | `components/loaders/BarsLoader.tsx` | Vertical bars with wave stretch animation |
| `DoubleSpinner` | `components/loaders/DoubleSpinner.tsx` | Two-color spinning ring (pink + green) |
| `PulseLoader` | `components/loaders/PulseLoader.tsx` | Pulsing circle with scale + opacity |
| `Spinner` | `components/loaders/Spinner.tsx` | Classic single-arc spinner on dark track |
| Demo Page | `pages/LoadersDemo.tsx` | Showcase grid with all loader variants |

**Usage Example:**
```tsx
import { DotsLoader, Spinner } from './components/loaders';

<DotsLoader size={16} color="#38bdf8" speed={0.6} />
<Spinner size={72} color="rgb(56,189,248)" trackColor="rgb(30,41,59)" />
```

---

### 4. 🔗 Magic Social Share Menu
A circular expanding share menu — click the center toggle to fan out social media icons with a **stunning staggered animation**.

| Component | File | Description |
|---|---|---|
| `ShareMenu` | `components/share-menu/ShareMenu.tsx` | Configurable circular menu with trigonometric positioning |
| Demo Page | `pages/ShareMenuDemo.tsx` | 8 social icons (X, WhatsApp, Reddit, Facebook, LinkedIn, YouTube, Instagram, GitHub) |

**Key Features:**
- 📐 Dynamic circular layout using `Math.cos/sin` — works with any number of items
- 🎨 Custom `radius`, `itemSize`, `toggleSize`, `startAngle` props
- 🔗 Supports both `href` (links) and `onClick` (handlers)
- 🎭 Staggered fan-out animation with `cubic-bezier` spring effect
- 🖼️ Zero icon dependency — portable inline SVGs for all brand icons

**Usage Example:**
```tsx
import { ShareMenu } from './components/share-menu';

const items = [
  { id: 'twitter', icon: <XIcon />, label: 'Twitter', color: '#000', href: 'https://...' },
  { id: 'github', icon: <GithubIcon />, label: 'GitHub', color: '#333', onClick: () => {} },
];

<ShareMenu items={items} radius={110} itemSize={50} />
```

---

## 🛠️ Folder Structure & Scalability

Organized by **category** — each new template type gets its own folder for unlimited growth:

```text
src/
├── components/                    # Reusable components (by category)
│   ├── NeumorphicButton.tsx       # 3D Neumorphic button
│   ├── NeumorphicCard.tsx         # 3D Neumorphic card wrapper
│   ├── NeumorphicInput.tsx        # 3D Neumorphic input with icon
│   ├── MagicNavbar.tsx            # Magic curved navigation bar
│   ├── loaders/                   # 🔄 Loading spinners category
│   │   ├── DotsLoader.tsx
│   │   ├── BarsLoader.tsx
│   │   ├── DoubleSpinner.tsx
│   │   ├── PulseLoader.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts              # Barrel export
│   └── share-menu/                # 🔗 Share menu category
│       ├── ShareMenu.tsx
│       └── index.ts              # Barrel export
├── pages/                         # Full demo pages
│   ├── Login.tsx                  # Neumorphic Login
│   ├── Signup.tsx                 # Neumorphic Signup
│   ├── MagicNavbarDemo.tsx        # Magic Nav showcase
│   ├── LoadersDemo.tsx            # Loaders grid showcase
│   └── ShareMenuDemo.tsx          # Share Menu showcase
├── App.tsx                        # Template switcher playground
├── main.tsx                       # Entry point
├── index.css                      # Tailwind v4 + custom utilities & keyframes
└── App.css                        # Legacy Vite styles
```

---

## 🎨 How to Add New Templates

1. **Create a category folder** (if new): `src/components/your-category/`
2. **Build components** with TypeScript interfaces, configurable props, and ARIA accessibility
3. **Add an `index.ts`** barrel export for clean imports
4. **Create a demo page**: `src/pages/YourCategoryDemo.tsx`
5. **Register in `App.tsx`**: Add to the `PageType` union and template switcher
6. **Add CSS**: Custom keyframes or utilities go in `src/index.css`

Every component follows these principles:
- ✅ TypeScript strict mode with exported interfaces
- ✅ Controlled & uncontrolled patterns
- ✅ ARIA roles, labels, and keyboard navigation
- ✅ CSS custom properties for easy theming
- ✅ Zero external dependencies (portable SVGs over icon libraries)

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Abdulmazid24/modern-ui-components.git

# 2. Go to the project directory
cd modern-ui-components

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser. Use the **floating template switcher** at the top to navigate between all component demos.

---

## ✨ Enterprise Features

- **Production-Ready Components** — Built with accessibility, interactive states, semantic HTML, and responsive layouts
- **3D Neumorphic Design System** — Smooth insets and drop-shadows via CSS custom properties
- **Zero Configuration** — Standard React files; drag-and-drop into any Next.js or MERN project
- **Developer Experience First** — Clean abstractions, strict TypeScript, barrel exports
- **Live Preview Playground** — Floating template switcher to browse all components in real-time
- **Scalable Architecture** — Category-based folder structure supporting hundreds of components

---

## 🙋‍♂️ About the Author

This vault is curated and maintained by **Abdul Mazid**, a passionate MERN + Next.js Developer dedicated to crafting world-class digital experiences.

- **Name:** Abdul Mazid
- **Email:** abdulmazid.dev@gmail.com
- **LinkedIn:** [Abdul Mazid on LinkedIn](https://www.linkedin.com/in/abdul-maziddev/)
- **GitHub:** [Abdulmazid24](https://github.com/Abdulmazid24)
- **Portfolio:** [Visit My Portfolio](https://abdulmazid-portfolio.vercel.app/)

Feel free to reach out for collaborations, new opportunities, or just to chat about modern UI implementations! Or simply fork the project to start your own template collection. ⭐
