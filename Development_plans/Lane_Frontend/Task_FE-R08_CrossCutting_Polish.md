# Task FE-R08: Cross-Cutting Polish

> **Lane:** Frontend | **Priority:** P1 | **Effort:** S (15 min) | **Type:** 🤖 Agent solo
> **Depends On:** FE-R02 through FE-R07

## Objective
Final polish: micro-animations, responsive fixes, Admin nav link, dark mode tokens.

## Target Files
- `app/src/styles/tokens.css` — animation tokens, dark mode overrides
- `app/src/index.css` — global keyframes
- `app/src/components/layout/Header.tsx` — add Admin link

## Steps
1. Add keyframes (fadeIn, slideUp, scaleIn) to `index.css`
2. Add `[data-theme="dark"]` overrides in `tokens.css`
3. Apply entrance animations to cards and bubbles
4. Add hover effects to nav items, cards, buttons
5. Add Admin link to Header desktop nav
6. Responsive audit at 375/768/1024/1440px
7. `npm run build`

## Acceptance Criteria
- [ ] Cards animate on mount
- [ ] Hover effects on interactive elements
- [ ] Admin link in desktop nav
- [ ] No layout breaks at standard breakpoints
- [ ] `npm run build` passes
