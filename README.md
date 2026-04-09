# Modern UI Components Vault 🚀

> **The world's first open-source collection of 18+ cutting-edge, interactive UI components** — featuring 3D physics, cursor-tracking effects, CSS Houdini animations, and zero-dependency architecture. Built for developers who refuse to settle for ordinary.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## ✨ What Makes This Different?

This is **not** another generic component library. Every component here pushes the boundaries of what's possible in the browser:

- 🧲 **Physics-Based Interactions** — Magnetic buttons that attract to your cursor with real-time force calculations
- 🔦 **CSS Mask Spotlight** — Full-screen torch effect that reveals glowing content as you move your mouse
- 🌀 **CSS Houdini `@property`** — Rotating conic-gradient borders that would be impossible with standard CSS
- 🖥️ **macOS Dock Magnification** — Proximity-based icon scaling with fisheye wave effect
- 🃏 **Gesture Physics** — Tinder-style drag cards with rotation, velocity, and LIKE/NOPE badges
- 🔐 **Matrix Decode** — Text scramble effect that decrypts characters one-by-one like a Hollywood terminal

---

## 🎯 Component Catalog (18 Categories)

### 1. 🔐 3D Neumorphic Auth System
Beautifully crafted Login & Signup forms with soft 3D neumorphic shadows and smooth interactions.

| Component | File | Description |
|---|---|---|
| `NeumorphicButton` | `components/NeumorphicButton.tsx` | Pressable 3D button with inset-shadow active state |
| `NeumorphicCard` | `components/NeumorphicCard.tsx` | Floating card container with depth shadows |
| `NeumorphicInput` | `components/NeumorphicInput.tsx` | Inset input field with optional icon slot |
| Login Page | `pages/Login.tsx` | Complete login form with email, password, show/hide toggle |
| Signup Page | `pages/Signup.tsx` | Full signup form with name, email, password confirmation |

---

### 2. ✨ Magic Navigation Menu
Smooth, animated bottom navigation bar with a **magic curved indicator** that follows the active icon.

| Component | File |
|---|---|
| `MagicNavbar` | `components/MagicNavbar.tsx` |
| Demo Page | `pages/MagicNavbarDemo.tsx` |

**Key Features:** Controlled & uncontrolled mode · Full ARIA keyboard navigation · CSS custom properties theming · Bouncy cubic-bezier animation

---

### 3. 🔄 CSS Loader Animations
Five enterprise-grade loading spinners — configurable size, color, speed, and accessibility labels.

| Loaders | `DotsLoader` · `BarsLoader` · `DoubleSpinner` · `PulseLoader` · `Spinner` |
|---|---|
| Folder | `components/loaders/` |
| Demo | `pages/LoadersDemo.tsx` |

---

### 4. 🔗 Magic Social Share Menu
Circular expanding share menu — click the center toggle to fan out 8 social media icons with staggered spring animation.

| Component | File |
|---|---|
| `ShareMenu` | `components/share-menu/ShareMenu.tsx` |
| Demo | `pages/ShareMenuDemo.tsx` |

**Key Features:** Dynamic circular `Math.cos/sin` positioning · Custom radius/angles · Zero icon dependency (inline SVGs)

---

### 5. 👥 3D Team Carousel
Auto-rotating perspective carousel showcasing team member cards with profile images, roles, and social links.

| Component | File |
|---|---|
| `TeamCarousel` | `components/carousel/TeamCarousel.tsx` |
| Demo | `pages/TeamCarouselDemo.tsx` |

**Key Features:** `perspective` + `rotateY` transforms · Continuous auto-rotation · Gradient shift animation

---

### 6. 🎠 3D Spinning Carousel
Continuous 3D perspective-rotating carousel with customizable cards and gradient border animations.

| Component | File |
|---|---|
| `AnimatedCarousel` | `components/animated-carousel/AnimatedCarousel.tsx` |
| Demo | `pages/AnimatedCarouselDemo.tsx` |

---

### 7. 📤 Animated Upload Button
Interactive button that transforms into a progress bar on click, showing real-time percentage with state transitions.

| Component | File |
|---|---|
| `UploadButton` | `components/buttons/UploadButton.tsx` |
| Demo | `pages/ButtonsDemo.tsx` |

**Key Features:** `idle → uploading → complete` state machine · CSS custom property `--upload-progress` · Percentage badge animation

---

### 8. 🧲 Magnetic Buttons
Buttons that physically attract toward your cursor with parallax inner-content movement.

| Component | File |
|---|---|
| `MagneticButton` | `components/magnetic/MagneticButton.tsx` |
| Demo | `pages/MagneticDemo.tsx` |

**Key Features:** Real-time cursor distance calculation · Configurable `attractRadius` & `strength` · Spring return animation · 5 visual variants (Primary, Gradient, Outline, Neon, Icon)

```tsx
import { MagneticButton } from './components/magnetic';

<MagneticButton attractRadius={200} strength={0.3}>
  <div className="magnetic-cta magnetic-cta-gradient">Get Started →</div>
</MagneticButton>
```

---

### 9. 💎 Liquid Glass Pricing Cards
Frosted glass cards with **3D parallax tilt**, mouse-tracking spotlight, and animated gradient borders.

| Component | File |
|---|---|
| `GlassPricingCard` | `components/pricing/GlassPricingCard.tsx` |
| Demo | `pages/GlassPricingDemo.tsx` |

**Key Features:** `rotateX/Y` parallax on mouse move · Radial gradient spotlight following cursor · `mix-blend-mode: color-dodge` · Frosted `backdrop-filter: blur(20px)` · "Most Popular" elevated card

---

### 10. 🔦 Spotlight Torch Hero
Full-screen dark hero section where your cursor acts as a **flashlight**, revealing glowing text beneath.

| Component | File |
|---|---|
| `SpotlightHero` | `components/effects/SpotlightHero.tsx` |
| Demo | `pages/SpotlightDemo.tsx` |

**Key Features:** Dual-layer architecture (dark bg + illuminated fg) · CSS `mask-image: radial-gradient()` tracks `--mouse-x/y` · Touch support for mobile · Grid texture overlay

---

### 11. 📊 Animated Stats Counter
Numbers that **count up from zero** with easeOutExpo interpolation — only when scrolled into view.

| Component | File |
|---|---|
| `AnimatedCounter` | `components/stats/AnimatedCounter.tsx` |
| Demo | `pages/StatsDemo.tsx` |

**Key Features:** `IntersectionObserver` trigger · `requestAnimationFrame` loop · `easeOutExpo` easing · `Intl.NumberFormat` comma formatting · Configurable prefix/suffix

---

### 12. 🖥️ macOS Dock
Pixel-perfect recreation of macOS dock with **proximity-based magnification** — icons scale up as your cursor approaches.

| Component | File |
|---|---|
| `MacDock` | `components/dock/MacDock.tsx` |
| Demo | `pages/DockDemo.tsx` |

**Key Features:** Distance-based scale calculation (150px radius) · Fisheye wave across neighbors · Frosted glass panel · Tooltip on hover · `transform-origin: bottom center`

---

### 13. 🔐 Text Scramble Decode
Matrix-style text reveal that **scrambles through random characters** before resolving letter-by-letter from left to right.

| Component | File |
|---|---|
| `ScrambleText` | `components/effects/ScrambleText.tsx` |
| Demo | `pages/ScrambleDemo.tsx` |

**Key Features:** Configurable character set · Staggered sequential reveal · IntersectionObserver auto-trigger · Hover-to-replay · Custom speed & delay · Binary mode (`characters="01"`)

---

### 14. 🃏 Tinder Swipe Cards
Draggable card stack with **physics-based rotation**, velocity tracking, and dynamic LIKE/NOPE stamp badges.

| Component | File |
|---|---|
| `SwipeableCard` | `components/cards/SwipeableCard.tsx` |
| Demo | `pages/SwipeDemo.tsx` |

**Key Features:** `PointerEvent` tracking · Dynamic rotation `(deltaX * 0.05)` · Configurable swipe threshold · Spring-back animation · Keyboard support (Arrow keys) · Activity log

---

### 15. 🔔 Toast Notification System
Lightweight, stackable toast notifications with **slide-in animation**, auto-dismiss timer, and progress bar.

| Component | File |
|---|---|
| `Toast` | `components/toast/Toast.tsx` |
| Demo | `pages/ToastDemo.tsx` |

**Key Features:** 4 variants (Success, Error, Warning, Info) · Auto-dismiss with countdown · Slide-out on close · Stacking from top-right · Zero external dependencies

---

### 16. 🌈 Gradient Border Cards
Cards with **rotating conic-gradient borders** powered by CSS Houdini `@property` — impossible with standard CSS.

| Component | File |
|---|---|
| `GradientBorderCard` | `components/cards/GradientBorderCard.tsx` |
| Demo | `pages/CardsDemo.tsx` |

**Key Features:** `@property --gradient-angle` animates a `conic-gradient` border · Outer glow blur pseudo-element · Configurable 3-color gradients · Dark glass inner card

---

### 17. 🔘 Morphing Toggle Switch
Toggle switch where the thumb **morphs from circle to rounded rectangle** with bouncy spring physics.

| Component | File |
|---|---|
| `MorphToggle` | `components/inputs/MorphToggle.tsx` |
| Demo | `pages/CardsDemo.tsx` |

**Key Features:** `cubic-bezier(0.68, -0.55, 0.27, 1.55)` spring bounce · 3 sizes (sm, md, lg) · Purple glow on active · Shape morphing via `border-radius` transition · `role="switch"` ARIA

---

### 18. 🗂️ Animated Tabs
Tab component with **smooth sliding indicator** that animates between tabs — available in 3 stunning variants.

| Component | File |
|---|---|
| `AnimatedTabs` | `components/inputs/AnimatedTabs.tsx` |
| Demo | `pages/TabsDemo.tsx` |

**Variants:**
- **Pill** — Frosted glass pill slides behind active tab
- **Underline** — Glowing purple underline with `box-shadow` neon effect
- **Glow** — Gradient background indicator with purple-to-pink glow

---

## 🛠️ Project Architecture

```text
src/
├── components/
│   ├── animated-carousel/     # 3D Spinning Carousel
│   ├── buttons/               # Animated Upload Button
│   ├── cards/                 # Swipeable + Gradient Border Cards
│   ├── carousel/              # Team Carousel
│   ├── dock/                  # macOS Dock
│   ├── effects/               # Spotlight Hero + Text Scramble
│   ├── inputs/                # Morph Toggle + Animated Tabs
│   ├── loaders/               # 5 CSS Loader Animations
│   ├── magnetic/              # Magnetic Cursor Buttons
│   ├── pricing/               # Liquid Glass Pricing Cards
│   ├── share-menu/            # Circular Social Share Menu
│   ├── stats/                 # Animated Stats Counter
│   ├── toast/                 # Toast Notification System
│   ├── MagicNavbar.tsx        # Magic Navigation Bar
│   ├── NeumorphicButton.tsx   # 3D Neumorphic Button
│   ├── NeumorphicCard.tsx     # 3D Neumorphic Card
│   └── NeumorphicInput.tsx    # 3D Neumorphic Input
├── pages/                     # 18 Demo Pages
├── App.tsx                    # Floating template switcher
├── index.css                  # 1600+ lines of custom CSS
└── main.tsx                   # Entry point
```

---

## 🎨 How to Add New Components

1. **Create a category folder**: `src/components/your-category/`
2. **Build components** with TypeScript interfaces and configurable props
3. **Add an `index.ts`** barrel export for clean imports
4. **Create a demo page**: `src/pages/YourCategoryDemo.tsx`
5. **Add CSS**: Custom `@keyframes` and utilities in `src/index.css`
6. **Register in `App.tsx`**: Add to the `PageType` union and template switcher

### Design Principles

- ✅ TypeScript strict mode with exported interfaces
- ✅ Controlled & uncontrolled patterns
- ✅ ARIA roles, labels, and keyboard navigation
- ✅ CSS custom properties for easy theming
- ✅ Zero external dependencies (portable inline SVGs)
- ✅ `requestAnimationFrame` for 60fps animations
- ✅ `IntersectionObserver` for scroll-triggered effects
- ✅ CSS Houdini `@property` for impossible animations

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Abdulmazid24/modern-ui-components.git

# Navigate to the project
cd modern-ui-components

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser. Use the **floating template switcher** at the top to navigate between all 18 component demos.

---

## 📦 Copy-Paste Usage

Every component is self-contained. To use in your project:

```bash
# 1. Copy the component folder
cp -r src/components/magnetic/ your-project/src/components/

# 2. Copy relevant CSS section from index.css
# (each section is clearly labeled with header comments)

# 3. Import and use
```

```tsx
import { MagneticButton } from './components/magnetic';
import { GlassPricingCard } from './components/pricing';
import { AnimatedTabs } from './components/inputs';

// Ready to use!
```

---

## 🙋‍♂️ Author

This vault is curated and maintained by **Abdul Mazid** — a passionate MERN + Next.js Developer dedicated to crafting world-class digital experiences.

| | |
|---|---|
| **Email** | abdulmazid.dev@gmail.com |
| **LinkedIn** | [Abdul Mazid](https://www.linkedin.com/in/abdul-maziddev/) |
| **GitHub** | [Abdulmazid24](https://github.com/Abdulmazid24) |
| **Portfolio** | [abdulmazid-portfolio.vercel.app](https://abdulmazid-portfolio.vercel.app/) |

---

> ⭐ **Star this repo** if you find it useful! Fork it to start your own component vault.

