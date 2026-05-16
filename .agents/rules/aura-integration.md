---
trigger: model_decision
title: "Aura Integration"
description: "Use when converting Aura.build HTML/Tailwind code to React components, or when working with Aura CDN assets."
---

# Aura Integration Rules

> Rules for converting Aura.build code (HTML/Tailwind) into the project's React component architecture with Vanilla CSS and design tokens.

1. **Always convert Tailwind to Vanilla CSS.** The app uses Vanilla CSS with `tokens.css` custom properties. Never keep Tailwind utility classes in `app/src/`. Map each Tailwind class to a CSS rule using `var(--token)` references.

2. **Tailwind → Token Mapping Reference:**

   | Tailwind Class Pattern | CSS Equivalent |
   |---|---|
   | `bg-gray-900`, `bg-slate-800` | `background: var(--color-bg-card);` |
   | `bg-black`, `bg-gray-950` | `background: var(--color-bg-primary);` |
   | `text-white` | `color: var(--color-text-primary);` |
   | `text-gray-400`, `text-slate-400` | `color: var(--color-text-secondary);` |
   | `text-blue-500`, `text-indigo-500` | `color: var(--color-primary);` |
   | `text-purple-500`, `text-violet-500` | `color: var(--color-secondary);` |
   | `rounded-md` | `border-radius: var(--radius-sm);` |
   | `rounded-lg`, `rounded-xl` | `border-radius: var(--radius-md);` |
   | `rounded-2xl`, `rounded-3xl` | `border-radius: var(--radius-lg);` |
   | `rounded-full` | `border-radius: var(--radius-full);` |
   | `p-2`, `p-3` | `padding: var(--space-xs);` |
   | `p-4`, `p-5` | `padding: var(--space-sm);` |
   | `p-6`, `p-8` | `padding: var(--space-md);` |
   | `p-10`, `p-12` | `padding: var(--space-lg);` |
   | `gap-2`, `gap-3` | `gap: var(--space-xs);` |
   | `gap-4`, `gap-6` | `gap: var(--space-sm);` |
   | `shadow-md`, `shadow-lg` | `box-shadow: var(--shadow-card);` |
   | `shadow-xl`, `shadow-2xl` | `box-shadow: var(--shadow-elevated);` |
   | `backdrop-blur-md`, `backdrop-blur-xl` | `backdrop-filter: blur(12px);` |
   | `transition-all duration-300` | `transition: var(--transition-default);` |

   *When the exact mapping is ambiguous, use the closest design token. Never hardcode raw values.*

3. **Aura CDN assets are development-only.** Images hosted on Aura's CDN (e.g., `https://assets.aura.build/...`) may be used as `src` URLs during development for speed. Before production:
   - Download the image
   - Convert to WebP (max 200KB)
   - Place in `app/public/assets/images/`
   - Update the `src` to the local path

4. **Component conversion checklist:**
   - [ ] HTML → JSX (self-closing tags, `className`, `htmlFor`, camelCase attributes)
   - [ ] Tailwind classes → co-located `.css` file with BEM-lite naming
   - [ ] All colors reference `var(--color-*)` tokens
   - [ ] All spacing references `var(--space-*)` tokens
   - [ ] Named export function component (no `export default`)
   - [ ] Typed props interface
   - [ ] Hardcoded text → `useTranslation()` / `t()` calls
   - [ ] Images have descriptive `alt` text
   - [ ] Interactive elements have `aria-label` if icon-only
   - [ ] Component respects tier line limits (80/150/200)

5. **The branding site is read-only reference.** Never import code from `brand_site/` into `app/src/`. The branding site exists solely as a visual reference and deployment target. Design values flow through `DESIGN.md` → `tokens.css` → components.

6. **Preserve Aura's animation patterns.** When converting, keep animation/transition behaviors (hover effects, scroll reveals, etc.) but implement them using CSS animations and `var(--transition-*)` tokens rather than Tailwind utility classes.

### DO / DON'T

```
✅ DO: Convert `<div class="bg-gray-900 rounded-xl p-6">` → `.card { background: var(--color-bg-card); border-radius: var(--radius-md); padding: var(--space-md); }`
❌ DON'T: Keep `className="bg-gray-900 rounded-xl p-6"` in the React component

✅ DO: Use Aura CDN URLs in development, then download & convert for production
❌ DON'T: Commit Aura CDN URLs to production code without a local fallback

✅ DO: Split a 300-line Aura section into 3 sub-components following component-patterns.md
❌ DON'T: Keep the entire Aura section as one monolithic component
```
