# ANSWERS.md — Pomodoro Timer

## 1. How to Run the Project

```bash
# Clone the repository
git clone https://github.com/TejasRawool186/pomodoro-timer.git
cd pomodoro-timer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app opens at [http://localhost:5173](http://localhost:5173).

For a production build:
```bash
npm run build
npm run preview
```

---

## 2. Tech Stack & Design Choices

### Tech Stack
- **React 19** — Component-based UI with hooks for state management
- **Vite 8** — Lightning-fast HMR and build tooling
- **Tailwind CSS 4** — CSS-first utility framework with `@theme` design tokens
- **LocalStorage** — Zero-dependency data persistence for session history
- **Web Audio API** — Native browser audio for session completion chime

### Design Choices
- **Custom Hook Pattern (`usePomodoro`)** — All timer logic (countdown, mode switching, persistence) is encapsulated in a single custom hook, keeping components purely presentational
- **CSS Custom Properties** — Design tokens defined via `@theme` in Tailwind v4 enable consistent theming across the entire app (focus red, break green, paused amber)
- **SVG Progress Ring** — Circular timer visualization using `strokeDashoffset` with CSS transitions for smooth, performant animation
- **Glassmorphism Cards** — `backdrop-filter: blur()` with subtle gradient overlays for a modern, premium look
- **No External UI Library** — All components, icons, and animations are hand-crafted for minimal bundle size (~65 KB gzipped JS)

---

## 3. Responsive Design & Accessibility

### Responsive Design
- **Mobile-first approach** — Base styles target 360px width, scaling up via `sm:` breakpoints
- **Flexible layout** — Single-column `max-w-lg` centered container adapts naturally to all screen sizes
- **Responsive typography** — Timer digits scale from `text-6xl` (mobile) to `text-7xl` (desktop)
- **Touch-friendly controls** — Buttons have generous padding (`px-8 py-3`) and `active:scale-95` feedback

### Accessibility
- **Keyboard navigation** — `Space` to Start/Pause/Resume, `R` to Reset. Full Tab navigation through all interactive elements
- **ARIA attributes** — `role="progressbar"` on the progress ring, `aria-live="polite"` on mode status, `aria-label` on all buttons and inputs, `aria-expanded` on the collapsible settings
- **Focus-visible rings** — Enhanced focus indicators with glow effect (`box-shadow`) for both buttons and inputs
- **Skip-to-content link** — Screen reader accessible skip link that becomes visible on focus
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables all animations and transitions
- **Semantic HTML** — `<time>` element for countdown, `<header>`, `<main>`, `<section>`, `<footer>` landmarks
- **Color contrast** — All text meets WCAG AA contrast requirements against the dark background

---

## 4. AI Usage

This project was built with the assistance of an AI coding assistant (Gemini/Antigravity). The AI helped with:

- **Code scaffolding** — Generating the initial component structure and Tailwind CSS design system
- **Component architecture** — Designing the separation between presentational components and the `usePomodoro` hook
- **Accessibility audit** — Adding ARIA attributes, focus states, keyboard shortcuts, and reduced-motion support
- **Documentation** — Writing README.md and ANSWERS.md

All code was reviewed, understood, and iterated upon. The AI served as a pair-programming partner to accelerate development while I maintained full understanding of every design decision.

---

## 5. Honest Gap

- **No automated tests** — The project currently lacks unit tests for the `usePomodoro` hook and component tests. Given more time, I would add tests using Vitest and React Testing Library to verify countdown accuracy, mode switching, and localStorage behavior.
- **No long-break support** — The classic Pomodoro technique includes a longer break (15–30 min) after every 4 focus sessions. This feature is not yet implemented.
- **Browser tab accuracy** — When the browser tab is backgrounded, `setInterval` may throttle to ~1 second accuracy. A production timer should use `Date.now()` delta comparison for precise countdown even in background tabs.
- **No PWA support** — The app is not installable as a Progressive Web App yet. Adding a service worker and manifest would enable offline usage and home screen installation on mobile devices.
