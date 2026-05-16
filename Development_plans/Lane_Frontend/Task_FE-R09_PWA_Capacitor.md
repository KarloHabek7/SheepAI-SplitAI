# Task FE-R09: PWA + Responsive + Capacitor

> **Lane:** Frontend | **Priority:** P2 | **Effort:** S (15 min) | **Type:** 🤖 Agent solo
> **Depends On:** FE-R08

## Objective
Complete the final unchecked frontend task (T08). Add PWA manifest, service worker, meta tags, and Capacitor init.

## Target Files
### Create:
- `app/public/manifest.json`
- `app/public/sw.js` (basic service worker)
### Modify:
- `app/index.html` — PWA meta tags, manifest link
- `app/src/main.tsx` — SW registration

## Steps
1. Create `manifest.json` with app name, icons, theme color, display: standalone
2. Create basic `sw.js` with cache-first strategy
3. Add meta tags to `index.html` (theme-color, apple-mobile-web-app)
4. Register service worker in `main.tsx`
5. `npm run build`

## Acceptance Criteria
- [ ] PWA installable (manifest valid)
- [ ] Service worker registers
- [ ] Meta tags present for mobile
- [ ] `npm run build` passes
