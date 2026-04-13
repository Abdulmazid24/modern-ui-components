# Contributing to Modern UI Vault

Thank you for your interest in contributing! This guide will help you get started.

## 🏗️ Project Structure

```
modern-ui-components/
├── apps/storefront/       ← Next.js 16 showcase website
├── packages/
│   ├── react/             ← Component source code (TSX)
│   ├── cli/               ← CLI tool (modern-ui-vault)
│   └── registry/          ← Schema & shared config
├── scripts/               ← Build utilities
└── tests/                 ← Component tests
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdulmazid24/modern-ui-components.git
   cd modern-ui-components
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📦 Adding a New Component

### Step 1: Create the component file
Create a new `.tsx` file in the appropriate category folder:

```
packages/react/[category]/[ComponentName].tsx
```

### Step 2: Follow these rules
- **Must start with** `"use client";`
- **Named export** (not default): `export const ComponentName = ...`
- **TypeScript interfaces** for all props
- **Framer Motion** for animations
- **Lucide React** for icons
- **No third-party UI libraries** (no MUI, Shadcn, Radix)
- **Self-contained** — no external state management

### Step 3: Build the registry
```bash
npm run registry:build
```

### Step 4: Verify
```bash
npm run dev
```
Visit `http://localhost:3000/vault/[componentname]` to see your component.

## 🎨 Design Standards

- **60fps animations** — Use Framer Motion spring physics
- **Glassmorphism** — Backdrop blur, transparency, borders
- **Dark-first** — Components should look premium on dark backgrounds
- **Responsive** — Must work on mobile, tablet, and desktop
- **Accessible** — Include ARIA attributes and keyboard navigation

## 🧪 Writing Tests

Add smoke tests in `tests/components.test.tsx`:

```tsx
it('renders YourComponent without crashing', async () => {
  const { YourComponent } = await import('../packages/react/category/YourComponent');
  const { container } = render(React.createElement(YourComponent));
  expect(container).toBeTruthy();
});
```

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new Quantum Button component
fix: resolve navbar z-index issue
docs: update CLI usage guide
style: format code with prettier
refactor: simplify registry builder
test: add smoke tests for card components
chore: update dependencies
```

## 🔄 Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-component`
3. Commit with conventional commit messages
4. Push and open a Pull Request
5. Ensure CI checks pass
6. Wait for code review

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License for free components.
