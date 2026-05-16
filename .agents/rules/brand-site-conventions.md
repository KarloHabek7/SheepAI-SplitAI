---
trigger: model_decision
title: "Brand Site Conventions"
description: "Use when working in the brand_site/ directory (the Aura-based branding website)."
---

# Brand Site Conventions

> Rules for working within the `brand_site/` directory, which contains the Aura.build-based branding website. This is a separate deployment from the main app.

1. **Tailwind CSS is allowed in `brand_site/`.** The branding site uses Aura's native HTML/Tailwind/JS output. Do NOT convert it to Vanilla CSS — that conversion only applies when importing components into the main `app/`.

2. **The branding site is NOT a React app.** It is static HTML with Tailwind CSS and vanilla JavaScript, as exported from Aura.build. Do not add React, TypeScript, or other app-level dependencies.

3. **Folder structure:**
   ```
   <project_root>/
   ├── app/              ← main React application (Vanilla CSS + tokens.css)
   ├── brand_site/       ← branding website (Aura HTML/Tailwind/JS)
   │   ├── index.html
   │   ├── src/
   │   ├── tailwind.config.js
   │   ├── package.json
   │   └── ...
   ├── Development_plans/
   └── ...
   ```

4. **No cross-imports.** The main app (`app/`) must NEVER import from `brand_site/` and vice versa. Design values flow indirectly: `brand_site/ → /design-extract → DESIGN.md → tokens.css → app/`.

5. **Separate Vercel deployment.** The branding site is deployed as its own Vercel project, independent from the app. Use:
   ```powershell
   npx -y vercel brand_site --prod
   ```
   The app deploys separately from the `app/` directory.

6. **Content updates are safe.** Text, images, and section order in the branding site can be changed freely. The visual system (colors, fonts, spacing) should remain stable after `/design-extract` has run — changing the branding site's visual system requires re-running `/design-extract`.

7. **Asset conventions:**
   - Aura CDN URLs are acceptable in the branding site (it's a marketing page, not the app)
   - Local assets go in `brand_site/assets/` or `brand_site/public/`
   - Images should still be optimized (WebP, < 200KB) for fast load times

8. **Ownership:** Creative Lead (Lane 4) owns `brand_site/`. Team Lead can modify via `/implement-any`.

### DO / DON'T

```
✅ DO: Edit text content directly in brand_site/index.html or brand_site/src/App.jsx
❌ DON'T: Import React or add TypeScript to the branding site

✅ DO: Deploy brand_site/ as a separate Vercel project
❌ DON'T: Bundle brand_site/ into the main app's build

✅ DO: Use Tailwind classes in brand_site/ (it's Aura's native format)
❌ DON'T: Use Tailwind classes in app/src/ (app uses Vanilla CSS + tokens.css)
```
