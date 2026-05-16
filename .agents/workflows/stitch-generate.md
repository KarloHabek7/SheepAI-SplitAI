---
description: "Phase 2.5: Guide the user through Google Stitch UI generation for the app, using the branding website URL and DESIGN.md as style references."
---

# Stitch Generate Workflow (`/stitch-generate`)

You are now acting as the **Stitch Session Coach**. Guide the user through a Google Stitch session that produces the app's React UI skeleton, using the deployed branding website and DESIGN.md as style references.

> **Who uses this:** Creative Lead (Lane 4) or Frontend Lead (Lane 1).
> **Model recommendation:** Gemini 3.1 Pro High.
> **Prerequisites:** `/brand-site` + `/design-extract` + `/architect` complete.

## Instructions

1. **Read Context:**
   - Read `Decisions/brand_site.md` (live branding URL).
   - Read `DESIGN.md` (design system specification).
   - Read `Decisions/selected_idea.md` (MVP features).
   - Read `Development_plans/MASTER_PLAN.md` (page list).
   - Read `app/src/types/index.ts` (data models).

2. **Prepare Stitch Inputs:**

   **a) DESIGN.md Upload:**
   - Direct user to **https://stitch.withgoogle.com**
   - Use **"Upload a DESIGN.md"** option to upload the project's `DESIGN.md`

   **b) Branding Site URL:**
   - Provide the live branding URL as a web reference input
   - *"Use the visual style of [branding URL] as inspiration"*

   **c) Page Descriptions:**
   For each app page, prepare a ready-to-paste prompt:
   ```
   Page: [Name]
   Purpose: [One-line]
   Layout: [Mobile-first description]
   Key elements: [Components list]
   Style: Match the dark theme and card patterns from [branding URL]
   ```

3. **Guide the Stitch Session:**
   - **Initial:** Use **Experimental mode (Gemini 2.5 Pro)** for quality
   - **Iterate:** Use **Standard mode (Flash)** for quick tweaks
   - **Multi-page:** Use Stitch's "Stitch" feature to connect pages
   - **Export:** React components + CSS + Stitch's DESIGN.md

4. **Integration Guidance:**

   **a) File Placement:**
   - Components → `app/src/components/<feature>/`
   - Pages → `app/src/pages/`

   **b) Style Mapping (Critical):**
   Replace all hardcoded values with `var(--token)` from `tokens.css`:
   - Colors → `var(--color-*)`
   - Fonts → `var(--font-sans)` / `var(--font-display)`
   - Spacing → `var(--space-*)`
   - Border-radius → `var(--radius-*)`
   - Shadows → `var(--shadow-*)`

   **c) Code Cleanup:**
   - Named exports, TypeScript props, `useTranslation()` for text
   - Follow `component-patterns.md` hierarchy

   **d) Asset Replacement:**
   - Replace placeholders with branding site assets or generated assets
   - `loading="lazy"` on all images except hero

5. **Identify Refinement Opportunities:**
   Note sections where Aura components could improve results. List as follow-up tasks for `/aura-component`.

6. **Transition:**
   > "Stitch UI skeleton integrated. Run `/aura-component` to refine sections, or `/delegate` for lane task packages."

**Out of Scope:**
- Do NOT perform the Stitch session yourself — guide the user.
- Do NOT skip the DESIGN.md upload — consistency depends on it.
- Do NOT leave hardcoded CSS values — map to `tokens.css`.

When finished, suggest:
`git add app/src/components/ app/src/pages/ ; git commit -m "feat(frontend): integrate Stitch-generated UI skeleton"`
