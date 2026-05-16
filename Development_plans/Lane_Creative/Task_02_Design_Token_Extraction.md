# Task 02: Design Token Extraction — DESIGN.md + tokens.css

> **Lane:** Creative
> **Priority:** P0-Critical
> **Estimated Effort:** S (<30min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Can Parallelize With:** None (sequential after Task 01)
> **Depends On:** Creative Task 01 (Brand Website deployed)

## Objective

Extract the complete design system from the deployed brand website into two canonical files: `DESIGN.md` (human-readable design spec) and `app/src/styles/tokens.css` (CSS custom properties). These files become the **single source of truth** for all visual decisions across the entire application.

## Context Snapshot

**Read these files before starting:**
- `brand_site/` — the deployed brand website (your source of truth for colors, fonts, spacing)
- `.agents/workflows/design-extract.md` — the `/design-extract` workflow with step-by-step instructions
- `Decisions/selected_idea.md` — brand direction and color palette references
- `app/src/styles/tokens.css` — check if a placeholder file exists (overwrite it)

**Key brand tokens to extract (expected from Task 01):**
```
Primary:      #003366 (Deep Adriatic Blue)
Accent:       #E3001B (Hajduk Red)
Background:   #FFFFFF / #F8FAFC
Text:         #1A1A2E
Surface:      rgba(255,255,255,0.7) with backdrop-filter (glassmorphism)
Font:         Inter or similar modern sans-serif
```

## Interface Contract

**This task PRODUCES:**
- `DESIGN.md` at project root — Complete design specification document
- `app/src/styles/tokens.css` — CSS custom properties for all design tokens
- These two files are consumed by **every lane** that touches UI

**This task CONSUMES:**
- `brand_site/` — deployed landing page as visual reference
- Live Vercel URL from Task 01

## Implementation Steps

1. **Run the `/design-extract` workflow** — this guides you through the extraction process
2. **Open the deployed brand site** and audit every visual element:
   - Colors (primary, secondary, accent, background, text, borders, shadows)
   - Typography (font family, weights, sizes for h1–h6, body, caption, button)
   - Spacing scale (4px base → 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
   - Border radii (small, medium, large, full)
   - Shadows (subtle, medium, elevated, glassmorphism)
   - Transitions (duration, easing)
   - Breakpoints (mobile, tablet, desktop, wide)
3. **Create `DESIGN.md`** at the project root with sections:
   - Brand Identity (name, tagline, personality)
   - Color System (with hex values, usage guidelines, dark mode variants)
   - Typography (font stacks, size scale, weight usage)
   - Spacing & Layout (spacing scale, grid, container widths)
   - Component Patterns (button styles, card styles, input styles, badge styles)
   - Glassmorphism Recipe (blur, transparency, border values)
   - Motion & Animation (transitions, micro-animations)
   - Iconography (Lucide React icon set conventions)
   - Responsive Breakpoints
   - Dark Mode Color Mapping (if the brand site has dark mode)
4. **Create/update `app/src/styles/tokens.css`** with CSS custom properties:
   ```css
   :root {
     /* Colors */
     --color-primary: #003366;
     --color-primary-hover: #004488;
     --color-accent: #E3001B;
     /* ... all tokens ... */
     
     /* Typography */
     --font-family: 'Inter', -apple-system, sans-serif;
     --font-size-xs: 0.75rem;
     /* ... */
     
     /* Spacing */
     --space-1: 0.25rem;
     /* ... */
     
     /* Glassmorphism */
     --glass-bg: rgba(255, 255, 255, 0.7);
     --glass-blur: 12px;
     --glass-border: 1px solid rgba(255, 255, 255, 0.3);
   }
   ```
5. **Verify** `tokens.css` imports cleanly (no syntax errors)

## Acceptance Criteria

- [ ] `DESIGN.md` exists at project root with all sections from Step 3
- [ ] `app/src/styles/tokens.css` contains all CSS custom properties
- [ ] Color tokens match the brand site exactly
- [ ] Typography tokens include font family, size scale, and weight scale
- [ ] Spacing scale is defined (4px base, at least 12 values)
- [ ] Glassmorphism tokens defined (background, blur, border)
- [ ] Shadow tokens defined (at least 3 levels)
- [ ] Border radius tokens defined
- [ ] Transition/animation tokens defined
- [ ] Dark mode variables defined (either via `[data-theme="dark"]` or `@media (prefers-color-scheme)`)
- [ ] `npm run build` passes (tokens.css has no syntax errors)

## Out of Scope (CRITICAL)

- Do NOT modify any React components — only create DESIGN.md and tokens.css
- Do NOT modify `brand_site/` — it's already deployed
- Do NOT create UI components — just the token definitions
- Do NOT add Google Fonts imports — Frontend lane will handle that in their App Shell task

## Handoff

- Push to: `lane/creative/design-tokens`
- Notify: **Frontend lane** — `tokens.css` is ready, they can import it in components
- Notify: **All lanes** — `DESIGN.md` is the visual reference for everything
- Next task enabled: **Frontend Task 01 (App Shell)** now has real tokens; **Creative Task 03 (App Icons)** and **Task 04 (Illustrations)** can start

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Creative/Task_02_Design_Token_Extraction.md`
