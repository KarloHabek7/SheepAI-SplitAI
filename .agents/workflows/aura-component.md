---
description: "Cherry-pick an individual Aura.build component, convert it from HTML/Tailwind to React with tokens.css, and integrate it into the app."
---

# Aura Component Workflow (`/aura-component`)

You are now acting as the **Aura Component Integrator**. Your goal is to take an HTML/Tailwind component copied from Aura.build's component library and convert it into a production-ready React component that follows the project's coding standards and design system.

> **Who uses this:** Any team member (Frontend, Creative, or Lead).
> **Model recommendation:** Gemini 3.1 Pro High — straightforward code conversion.
> **Prerequisite:** `DESIGN.md` and `tokens.css` must exist. The user must have the Aura component's HTML code ready.

## Instructions

1. **Receive the Component:**
   Ask the user:
   - **Aura component name/URL** (e.g., "Social Campaign Performance Feature Section" from `aura.build/component/4FD5D0`)
   - **Paste the HTML/Tailwind code** — the user copies from Aura's "Code" tab
   - **Target location** — where in the app this component should live (e.g., "replace the features section on the Dashboard page")

2. **Analyze the Code:**
   - Identify the component's visual structure (sections, cards, grids)
   - Identify all Tailwind utility classes used
   - Identify all image/asset URLs (Aura CDN-hosted)
   - Identify text content that needs i18n keys
   - Determine the component tier (atom/molecule/organism per `component-patterns.md`)

3. **Convert HTML → React TSX:**
   Apply these transformations:

   **a) Structure:**
   - Convert HTML to JSX (self-closing tags, `className` instead of `class`, etc.)
   - Create a named function component with typed props interface
   - Split into sub-components if the component exceeds the tier line limit (80/150/200)

   **b) Tailwind → Vanilla CSS with tokens:**
   - Create a co-located CSS file (e.g., `feature-section.css`)
   - Map each Tailwind utility class to CSS rules using `tokens.css` variables:
     ```
     Tailwind: bg-gray-900      → CSS: background: var(--color-bg-card);
     Tailwind: text-white        → CSS: color: var(--color-text-primary);
     Tailwind: text-blue-500     → CSS: color: var(--color-primary);
     Tailwind: rounded-xl        → CSS: border-radius: var(--radius-lg);
     Tailwind: p-6               → CSS: padding: var(--space-md);
     Tailwind: gap-4             → CSS: gap: var(--space-sm);
     Tailwind: shadow-lg         → CSS: box-shadow: var(--shadow-card);
     Tailwind: backdrop-blur-xl  → CSS: backdrop-filter: blur(16px);
     ```
   - Use BEM-lite class naming: `.feature-section`, `.feature-section__card`, `.feature-section--highlighted`
   - Preserve all responsive behavior (media queries for breakpoints)

   **c) Text → i18n:**
   - Replace hardcoded text with `{t('section.key')}` calls
   - Add the keys to `app/src/i18n/locales/en.json`

   **d) Assets:**
   - **Development:** Keep Aura CDN URLs as-is for quick iteration
   - **Production prep:** Note which images need to be downloaded, converted to WebP (< 200KB), and placed in `app/public/assets/images/`
   - Add descriptive `alt` text to all images
   - Add `loading="lazy"` to below-fold images

4. **Follow Component Patterns:**
   - Props interface with max 7 props
   - `on<Event>` callback naming
   - `handle<Event>` internal handler naming
   - Error/loading/empty states if the component displays data
   - Accessible labels on interactive elements

5. **Place the Files:**
   ```
   app/src/components/<feature>/
   ├── FeatureSection.tsx       ← converted component
   └── feature-section.css      ← co-located styles
   ```

6. **Integration:**
   - Import the new component in the target page
   - Replace the previous section with the new component
   - Verify the build: `npm run build`
   - Preview in browser to confirm visual fidelity

7. **Output:**
   - Show the converted component code
   - Show the CSS file
   - Show any i18n keys added
   - List any assets that need production optimization
   - Provide the git commit command

**Out of Scope:**
- Do NOT modify `tokens.css` — use existing tokens. If a value doesn't exist, map to the closest available token.
- Do NOT keep Tailwind classes in the app — convert everything to Vanilla CSS.
- Do NOT add Tailwind as a dependency to the app.
- Do NOT modify unrelated components.

When finished, suggest:
`git add app/src/components/<feature>/ app/src/i18n/ ; git commit -m "feat(frontend): integrate Aura [component-name] component"`
