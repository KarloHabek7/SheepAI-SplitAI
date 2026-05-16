# Task FE-R01: App Shell & Layout Overhaul

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** M (30 min)
> **Type:** 🤝 Interactive (Aura component picking)
> **Planning Mode:** OFF
> **Depends On:** FE-R00

## Objective

Replace the basic Header and BottomNav with premium components sourced from Aura.build. Add glassmorphism, smooth transitions, and a polished app shell feel.

## Required Reading

- `DESIGN.md` — Component patterns (buttons, cards)
- `app/src/styles/tokens.css` — All available design tokens
- `app/src/components/layout/Header.tsx` — Current implementation
- `app/src/components/layout/BottomNav.tsx` — Current implementation
- `app/src/components/layout/AppShell.tsx` — Current implementation
- `.agents/rules/aura-integration.md` — Tailwind → tokens.css mapping

## Target Files

### Modify:
- `app/src/components/layout/Header.tsx` + `Header.css`
- `app/src/components/layout/BottomNav.tsx` + `BottomNav.css`
- `app/src/components/layout/AppShell.tsx` + `AppShell.css`
- `app/src/components/layout/PageContainer.tsx` + `PageContainer.css`

## Interactive Workflow

### Step 1: Agent Prep
🤖 Agent reviews current layout CSS, identifies gaps vs DESIGN.md, and tells user what to look for.

### Step 2: User Browses Aura
⏸️ **PAUSE — User action required:**

Browse **aura.build** and look for:
1. **A navbar/header** — with logo area, nav links, and action buttons. Prefer glassmorphism or premium style.
2. **A mobile bottom tab bar** — if available. Or a footer nav that could be adapted.
3. **Optional: a page container/shell** — if you see a nice overall layout wrapper.

Paste the HTML code from Aura's "Code" tab for each component.

### Step 3: Agent Converts
🤖 Apply `/aura-component` workflow:
- HTML → JSX
- Tailwind → tokens.css variables
- BEM-lite class naming
- Preserve animations/transitions
- Ensure Header has: logo ("SplitAI"), desktop nav links (Map, Assistant, Pazar, Report, Admin), language icon, dark mode icon
- Ensure BottomNav has: 5 tabs (Map, Assistant, Report center FAB, Pazar, Info), active states, filled icons

### Step 4: Review
👤 User previews in browser → approves or requests tweaks.

## Acceptance Criteria

- [ ] Header uses design tokens, glassmorphism or premium elevation
- [ ] BottomNav has smooth active-state transitions
- [ ] Desktop nav includes Admin link
- [ ] Layout responsive: Header on desktop, BottomNav on mobile (<768px)
- [ ] All icons use `material-symbols-rounded`
- [ ] `npm run build` passes

## Out of Scope

- Do NOT modify page content (only the shell/layout)
- Do NOT implement dark mode logic (button is decorative)
- Do NOT implement language switching logic
