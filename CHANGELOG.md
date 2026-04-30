# Changelog - Modern UI Vault

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-04-30 (The Automated Preview Pipeline)

### Added
- **Preview Generator v3.0**: Enterprise-grade automated screenshot pipeline using Playwright + Sharp.
  - Captures 2560×1440 Retina WebP screenshots for all 372 components.
  - Generates 32px LQIP (Low Quality Image Placeholder) base64 blur thumbnails.
  - Supports incremental `missing` mode for future component additions.
  - Outputs `manifest.json` with dimensions, file sizes, and LQIP data.
- **Cinematic Preview Canvas**: God-tier screenshot backdrop with volumetric aurora lighting, engineering grid, film grain noise, and edge vignette.
- **Homepage Preview Integration**: Trending components now display real WebP preview images with graceful gradient fallbacks.
- **Components Gallery Integration**: Full `/components` page uses WebP previews with `<img>` tags and `onError` fallback patterns.

### Fixed
- **ScrambleText**: Fixed null reference crash — `text` prop was undefined for `effects` category.
- **PlasmaTagInput**: Fixed React "Objects are not valid as a child" error — mock data was passing objects instead of strings.
- **PulseStreamList**: Fixed object-as-child rendering crash — mapped items to valid ReactNode elements.
- **PrismColorPicker**: Fixed Framer Motion crash from multi-keyframe spring arrays — decomposed into separate transitions.
- **QuantumCheckbox**: Fixed non-animatable `transparent` color — replaced with `rgba(0,0,0,0)`.
- **SquidGameLoaders**: Fixed `strokeDashoffset` string values — converted to numbers for Framer Motion.
- **TrayMorphDownloadButton**: Fixed undefined `strokeWidth` animation — added explicit initial value.
- **ElasticSlider**: Fixed React state-update race condition via `queueMicrotask`.
- **HapticDial**: Fixed deprecated `.on("change")` pattern.
- **SpectrumNavbar**: Fixed `navItems` DOM attribute warning — cleaned mock-data prop injection.
- **Components Page Build Error**: Fixed template literal escaping (`Expected unicode escape`) in Turbopack.
- **Homepage Image 404s**: Fixed trending component names to match registry filenames (`bento-grid` → `bentogrid`).

---

## [2.0.0] - 2026-04-16 (The 2026 Universe Expansion)

### Added (The God-Tier Expansion)
- **God-Tier Components**: Added `RefractiveFluidSurface` (Liquid Glass logic), `MechanicalIrisPortal` (3D Shutter), `IntentDrivenInput`, `NeuromorphicSynapseGraph`, and `MultidimensionalFlipCard`.
- **System-Wide Feature**: Integrated `useSpatialAudio` hook with `enableAudio` props for immersive UI.
- **Enterprise Logic**: `ResizableIDEPanels` with recursive nesting (Horizontal/Vertical) support.
- **Marketing Powerhouse**: `InfinitePerspectiveMarquee` and `3DProductShowcase`.
- **Legendary Components**: 14 new components including `OrbitingCircles`, `RetroGrid`, `BackgroundBeams`, `TracingBeam`, and `AnimatedConnectingBeam` (1-to-Many logic).

### Changed (The Apple-Style Overhaul)
- **Navigation**: Migrated from sidebar-heavy navigation to an **Apple-style Card-based Discovery** system.
- **Super Groups**: Organized components into logical Super Groups (Actions, Display, Nav, Feedback, Input, Layout, Visual Effects, Utility).
- **Core URL Structure**: Migrated `/vault` to `/components` for better SEO.

### Fixed
- Fixed registry indexing issues for advanced canvas-based components.
- Generated comprehensive smoke tests for all categories.

---

## [1.0.0] - Baseline Release
- Initial release with 170+ base components.
- CLI foundation (`modern-ui-vault init/add`).
- License verification system.
