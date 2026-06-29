# Frontend Technical Standards

## 1. React Architecture
- **Component Structure:** Decoupled/Modular. `Component.jsx` + `Component.module.css`.
- **State:** Prefer `useState` for local, `Context API` for global.
- **Imports:** Absolute paths preferred if configured, otherwise clean relative paths.

## 2. Performance
- **Lazy Loading:** `React.lazy` for heavy components.
- **Images/Video:** WebP format, `loading="lazy"`, `playsInline` for background videos.

## 3. Responsiveness
- **Breakpoints:** Mobile (<768px), Tablet (768px-1024px), Desktop (>1024px).
- **Strategy:** Mobile-first approach. Use `aspect-ratio` for media elements.