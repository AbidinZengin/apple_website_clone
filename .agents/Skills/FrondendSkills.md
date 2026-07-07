# Core Frontend & React Standards (Apple Quality)

## 1. Architecture & Type Safety (Strict TypeScript)
- **Component Isolation:** Every component MUST live in its own folder containing `[Name].tsx`, `[Name].module.css`, and `[Name].types.ts`. Use an `index.ts` (barrel file) for clean exports. 
- **Type Supremacy:** `.jsx` is forbidden. Use `.tsx`. Never use `any`. Define strict `interface`s for every prop and state.
- **Data Bridging:** Incoming API payloads must immediately be mapped to strict frontend types that mirror the backend DTOs.

## 2. Advanced Performance (The Smoothness)
- **Render Optimization:** Heavy components, especially those containing Framer Motion elements or `<canvas>`, MUST be wrapped in `React.memo()` to prevent unnecessary re-renders. 
- **Hook Discipline:** Use `useMemo` for complex calculations and `useCallback` for functions passed as props to avoid breaking child component memoization.
- **DOM References:** For scroll-driven animations, canvas manipulation, and observers, strictly use `useRef`. Never manipulate the DOM directly via `document.querySelector`.

## 3. Styling & Structural Integrity
- **CSS Variables:** Define all Apple-specific design tokens (Space Gray, Titanium, SF Pro Display font stacks) as root CSS variables. No hardcoded hex values in component CSS files.
- **Semantic HTML & Clean DOM:** Use `<section>`, `<article>`, `<nav>`, and `<main>`. Do not generate endless `<div>` soup. Keep the DOM tree as shallow as possible.
- **Backdrop Filters:** Use CSS `backdrop-filter: blur()` heavily for navigation bars and overlays, mimicking the Apple glassmorphism effect, but ensure a fallback for performance.

## 4. State & Lifecycle Management
- **Memory Leak Prevention (CRITICAL):** Any `window.addEventListener` (like scroll, resize, or mousemove) inside a `useEffect` MUST have a strict cleanup function (`return () => window.removeEventListener...`).
- **State Proximity:** Keep state as close to where it is used as possible. Avoid global Context API unless the data (like User Auth or Theme) is truly needed application-wide.