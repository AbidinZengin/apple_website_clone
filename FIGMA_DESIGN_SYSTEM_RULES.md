# Figma MCP — Design System Rules

Codebase-derived rules for translating Figma designs into this repo (Apple Website Clone: React 19 + Vite + CSS Modules). Read alongside `CLAUDE.md`, which owns the orchestration workflow — this file is the ground truth for *where things live and how they're structured* so generated code matches existing patterns instead of introducing new ones.

## 1. Token Definitions

**Location:** `src/styles/global.css` (`:root`), with page-level overrides in `src/config/pageThemes.js` and component-level theme overrides via `[data-theme]` attribute selectors (e.g. `src/components/Navbar/Navbar.module.css`).

**Format:** Plain CSS custom properties — no Style Dictionary, no JSON token pipeline, no build-time transform. Tokens are hand-authored and consumed directly via `var(--token-name)`.

```css
:root {
  --nav-bg: rgba(22, 22, 23, 0.92);
  --accent: #2997ff;
  --ease-apple: cubic-bezier(0.32, 0.72, 0, 1);
  --color-graphite: #1c1c1e;
  --text-primary: #f5f5f7;
  --text-secondary: #86868b;
  --font-base: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
}
```

**Theme switching pattern:** Not a global light/dark toggle — it's a *per-route* theme (`dark` / `light` / `black`) declared in `src/config/pageThemes.js` and applied as `data-theme` on the Navbar wrapper, which redeclares the nav-* variables for that scope. Any Figma variable mode (Light/Dark) should map to this attribute-scoped override pattern, not a `class="dark"` on `<html>`.

**Gap:** Typography scale, spacing scale, and border-radius are **not tokenized** — component CSS hardcodes `font-size: 80px`, `padding: 8px 40px`, `border-radius: 980px` per file. When pulling Figma variables for type/spacing, either (a) hardcode the resolved px value inline to match current convention, or (b) flag to the user that promoting these to root tokens is a separate refactor — don't silently introduce a parallel token system.

**Tailwind is installed but not used as a token/utility system.** `tailwindcss` v4 is wired into Vite (`@tailwindcss/vite`) and imported in `global.css` (`@import "tailwindcss";`), but no component uses Tailwind utility classes — 100% of styling is CSS Modules. Do not generate `className="flex gap-4 ..."` output; translate Figma layout properties into `.module.css` rules instead.

## 2. Component Library

**Location:** `src/components/` (shared/reusable) and `src/pages/` (route-specific composition).

```
src/components/
  common/        # generic, cross-page primitives (SectionTitle)
  Navbar/        # all nav chrome + its NavContext, NavLogo, sub-tree — one self-contained folder
  sections/      # marketing sections reused across pages (currently: MacBookFeatureHighlight)
  ui/            # lower-level interaction primitives (ContainerScroll)
src/pages/
  <PageName>/<FeatureName>/FeatureName.jsx + .module.css [+ .data.js] [+ .service.js]
```

Most former `sections/` components (HeroProduct, MacBookCard, MacBookProCard, iPadAirCard, IPadAirShowcase, PromoVideo) have since moved to live under the page that actually uses them (`src/pages/Home/`, `src/pages/IPadAir/`) — `sections/` now only holds components genuinely reused across multiple pages.

**Component architecture:** One folder per component. Each folder contains:
- `ComponentName.jsx` — logic + markup
- `ComponentName.module.css` — scoped styles, imported as `styles` and applied via `className={styles.x}`
- Optionally `componentName.data.js` — static content/config (arrays of copy, image refs) kept out of the JSX
- Optionally `componentName.service.js` — data-shaping helpers

No barrel `index.js` convention is consistent — some folders export via `index.jsx` (`Navbar/index.jsx`), most just import the file directly. No `.types.ts` files exist despite being described as required in `.agents/Skills/FrondendSkills.md` — **the project is plain `.jsx`, not `.tsx`**, so ignore that skill file's TypeScript mandate when generating code; match the actual repo (JS + PropTypes-free, no types).

**No Storybook, no component documentation site.** Nothing to register generated components into beyond the folder structure itself.

Navbar and everything it depends on (`NavContext`, `NavLogo`, submenus) live together under `src/components/Navbar/` — the old duplicate flat copy and the `layout/` wrapper folder have been removed; there is no other Navbar location to worry about.

## 3. Frameworks & Libraries

- **UI:** React 19 (`react`, `react-dom` ^19.2.7), function components + hooks only.
- **Routing:** `react-router-dom` v7 (`src/App.jsx`).
- **Animation:** `framer-motion` (npm package name; library now branded "Motion" — search docs under both names). Full technical conventions are in `.agents/Skills/MotionGuideline.md` — notably a **shared spring constant** `{ stiffness: 170, damping: 24, mass: 0.9 }` and a standard scroll pattern: `useScroll` → `useTransform` (4-point trapezoid input/output for enter/hold/exit) → `useSpring`. Any Figma smart-animate / motion data pulled via `get_motion_context` should be translated into this pattern, not raw CSS transitions or a different easing library.
- **Styling:** CSS Modules (`*.module.css`), plain CSS — no Sass, no CSS-in-JS, no styled-components.
- **Build:** Vite 8 + `@vitejs/plugin-react`. Dev: `npm run dev`. Lint: `oxlint` (not ESLint).

## 4. Asset Management

Two distinct paths depending on how the asset is used — pick correctly:

- **`src/assets/`** — images imported as ES modules (`import macbook from '../../assets/macbook-pro.png'`), processed/hashed by Vite at build time. Use for images referenced directly inside component JSX (`<img src={macbook} />`).
- **`public/`** — served as-is at the site root, referenced by string path (`/airpods.mp4`, `/icons.svg#github-icon`). Used for video (`public/videos/`, `public/*.mp4` + a poster PNG), the icon sprite, and `favicon.svg`. Also contains a `public/frames/` directory (likely scroll-scrubbing video frame sequences — check `ScrollAnimation`/`container-scroll-animation` components before assuming its purpose).

**No image optimization pipeline** — raw `.jpg`/`.png` committed directly (some are large, e.g. `circuit-dense.png` at ~900KB). No CDN config, no `next/image`-equivalent. When Figma MCP exports/downloads assets, drop them straight into `src/assets/` (component-scoped image) or `public/` (video/global asset) matching this split — do not introduce a new assets pipeline unprompted.

A root-level `image_scraper.py` exists for sourcing reference imagery — it's a standalone script, not part of the build; irrelevant to component asset resolution at runtime.

## 5. Icon System

Three coexisting patterns — **be deliberate about which one a new icon should use**:

1. **Inline SVG functional components**, hand-authored per file, colocated with the component that uses them (e.g. `SearchIcon`, `BagIcon`, `AccountIcon` defined directly inside `src/components/Navbar/NavActions/NavActions.jsx`). Uses `stroke="currentColor"` so icon color inherits from CSS — this is the dominant, preferred pattern for UI-chrome icons (nav, buttons). No shared `Icon` component or icon registry exists; each icon is a local one-off function.
2. **SVG sprite** at `public/icons.svg` — a set of `<symbol>` defs (social/brand icons: GitHub, X, Discord, Bluesky, etc.), referenced via `<use href="/icons.svg#x-icon" />`. Used for less central, list-style icons (e.g. footer/social links) rather than primary nav.
3. **Font Awesome via CDN** — loaded globally in `index.html` (`cdnjs.cloudflare.com/.../font-awesome/6.5.1`), used in exactly one place today: `NavLogo.jsx` renders the Apple logo as `<i className="fa-brands fa-apple">`. Don't propagate this pattern to new icons — it's a one-off for the brand mark, not the project's icon strategy.

**Recommendation when generating from Figma:** default to pattern 1 (inline SVG component, `stroke="currentColor"`, sized via the parent's font-size or explicit width/height in the `.module.css`) for any new interactive/UI icon coming out of a Figma icon component instance.

## 6. Styling Approach

- **Methodology:** CSS Modules, one file per component, class names in `camelCase` (`.searchWrapper`, `.iconBtn`). No BEM, no utility-first classes in JSX.
- **Global styles:** `src/styles/global.css` — CSS reset (`box-sizing`, margin/padding zero), root tokens, base typography (SF Pro stack via `-apple-system` fallback chain), and a `prefers-reduced-motion` global override that zeroes animation/transition duration. Any generated component must keep working under this reduced-motion rule (Framer Motion respects it by default; raw CSS animations need to confirm they're covered by the global selector, which they are since it targets `*`).
- **Responsive:** Plain `@media (max-width: Npx)` breakpoints declared per-component at the bottom of each `.module.css` file (e.g. `@media (max-width: 480px)` in `ProductCard.module.css`, `@media (max-width: 767px)` in `Navbar.module.css`). No shared breakpoint variables/mixins — breakpoint values are repeated as literals. Match existing breakpoint values found in sibling components rather than inventing new ones.
- **Effects:** Heavy use of `backdrop-filter: blur() saturate()` for glassmorphism (nav bar, mega menu overlay), always paired with a `-webkit-backdrop-filter` fallback line.
- **Localization note:** CSS comments in this codebase are written in Turkish explaining Apple-specific rationale (see `global.css`, `Navbar.module.css`). Match this convention if adding rationale comments to generated component CSS.

## 7. Project Structure

```
src/
  App.jsx                 # router setup, page theme wiring
  main.jsx                # React root mount
  assets/                 # Vite-bundled images (see §4)
  components/
    common/ Navbar/ sections/ ui/   # see §2 — NavContext.jsx (nav open/close + theme state, consumed via useNav()) lives inside Navbar/
  config/
    pageThemes.js          # route → theme name, theme → background color
  hooks/                   # useScrollDirection, useOutsideClick
  pages/
    <PageName>/<FeatureName>/  # route-level feature folders, same isolation rule as components
  styles/
    global.css               # tokens + reset (see §1, §6)
  utils/
public/                    # static passthrough assets (see §4)
.agents/                   # role + skill markdown consumed by CLAUDE.md orchestration protocol
  roles/                   # ui-analyst, component-dev, motion-expert, apple-auditor, qa-tester, asset-researcher
  Skills/                  # FrondendSkills.md, MotionGuideline.md, ScrollVideoSkills.md, validation-schema.md, etc.
```

**Feature organization pattern:** Pages are decomposed into route-scoped feature folders under `src/pages/<PageName>/`, each following the same component-isolation rule as `src/components/` (own `.jsx` + `.module.css`, optional `.data.js` for content and `.service.js` for data shaping — see `src/pages/IPhone/ExploreLineup/` for a full example of the pattern). Deeply nested features exist too, e.g. `src/pages/IPhone/IPhone17Pro/CameraPlateauReveal/` — nesting mirrors the page's visual/route hierarchy, not a flat feature list.

---

### Practical checklist when importing a Figma frame into this repo

1. Identify target location: new `common/` or `sections/` component (reused) vs `pages/<Page>/<Feature>/` (route-specific) — see §2/§7.
2. Pull Figma variables → check against `global.css` tokens first; reuse an existing `var(--token)` if one already matches, only hardcode a new px/hex value if genuinely new (§1).
3. Build markup as a single `.jsx` + co-located `.module.css`, camelCase class names, no Tailwind utilities (§3/§6).
4. Icons: default to inline SVG component with `currentColor` stroke unless it's a brand/social icon (→ sprite) (§5).
5. Images: `src/assets/` + ES import if it's a component-local raster asset; `public/` + string path only for video/posters/sprites (§4).
6. Motion: translate Figma smart-animate/prototyping into the shared Framer Motion spring config and scroll pattern from `MotionGuideline.md`, not ad hoc easing (§3).
7. Add a `@media (max-width: ...)` block at the bottom of the module CSS matching breakpoint values already used in sibling files (§6).
