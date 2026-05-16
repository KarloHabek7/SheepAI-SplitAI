---
description: "Phase 1.5: Clone an Aura.build landing page template, customize it as the project's branding website, deploy to Vercel, and establish the visual north star."
---

# Brand Site Workflow (`/brand-site`)

You are now acting as the **Brand Architect**. This is **Phase 1.5** — building the visual identity foundation by cloning a premium Aura.build landing page template, customizing it to represent the app, and deploying it as a standalone branding website.

> **Who uses this:** Creative Lead (Lane 4), or Team Lead via `/implement-any`.
> **Model recommendation:** Gemini 3.1 Pro High — multimodal awareness helps with visual content customization.
> **Prerequisite:** Run `/ideate` first. Read `Decisions/selected_idea.md`. The idea must be finalized.
> **Can run in parallel with:** `/architect` (different person, different deliverable).

## Instructions

1. **Read Context:**
   - Read `Decisions/selected_idea.md` (the chosen idea, target user, MVP features, demo script).
   - Read `Research/tools/aura_build.md` (Aura capabilities and workflow).
   - Read `Decisions/asset_pipeline.md` (tool routing, quality gates).

2. **Guide Template Selection (Counseling Step):**
   Provide the user with actionable guidance for browsing Aura.build:
   - Direct them to **https://aura.build/templates** to browse premium landing page templates.
   - Recommend templates that match the app's domain and aesthetic:
     - **SaaS/Tech** templates for software products
     - **AI/Data** templates for AI-focused products
     - **Agency/Portfolio** templates for service-oriented products
   - Advise the user to look for templates with:
     - ✅ Dark mode or rich gradient backgrounds (premium feel)
     - ✅ Hero section with space for a headline + CTA
     - ✅ Feature showcase sections (bento grids, cards, or split layouts)
     - ✅ Smooth scroll animations and micro-interactions
     - ❌ Avoid templates that are too niche (e.g., restaurant, wedding) unless the app matches

3. **Clone & Set Up Locally:**
   Once the user selects and downloads a template:
   - Instruct them to rename the downloaded folder to `brand_site` and place it at the project root:
     ```
     <project_root>/
     ├── app/                  ← the main application
     ├── brand_site/           ← the branding website (Aura template)
     ├── Development_plans/
     └── ...
     ```
   - Verify the folder structure:
     ```powershell
     Get-ChildItem brand_site -Recurse -Depth 1
     ```
   - If the template uses npm dependencies, install them:
     ```powershell
     Set-Location brand_site; npm install
     ```
   - Run the local dev server to preview:
     ```powershell
     npm run dev
     ```

4. **Customize Content:**
   Guide the user through content replacement. The goal is to keep the template's polish while making it represent the app:

   **a) Hero Section:**
   - Replace the headline with the app's one-line pitch (from `selected_idea.md`)
   - Replace the subheadline with the app's value proposition
   - Update CTA buttons: "Launch App" (will link to Vercel URL later) and "Learn More" (scrolls down)

   **b) Feature Sections:**
   - Map each template feature card to an MVP feature from `selected_idea.md`
   - Update titles, descriptions, and icons
   - Keep the template's layout and animations — only change text and images

   **c) Navigation:**
   - Update nav links to match the new sections
   - Update the logo/brand name to the app's name

   **d) Footer:**
   - Update copyright, team credits, and social links

5. **Replace Assets:**
   Guide the user on asset sourcing:
   - **Option A (Quick):** Use Aura.build's built-in asset library for placeholder-quality images
   - **Option B (Premium):** Generate custom images using NanoBanana Pro / Imagen 4 with prompts aligned to the design aesthetic
   - **Option C (Screenshots):** If the app already has working pages, capture screenshots and polish them with device mockup framing
   - Provide optimized prompts for any image generation, incorporating colors/styles from the template

6. **Replace/Swap Sections (Optional):**
   If specific sections of the template don't fit the app's story:
   - Direct the user to **https://aura.build/components** to browse individual components
   - The user can copy HTML/Tailwind code from the component's "Code" tab
   - Paste the new section's code into the template, replacing the original section
   - Adjust colors and fonts to match the template's existing palette

7. **Deploy to Vercel:**
   Guide the deployment:
   ```powershell
   # From project root, deploy the brand_site folder
   npx -y vercel brand_site --prod
   ```
   - Capture the live URL (e.g., `https://my-app-brand.vercel.app`)
   - If the user has a custom domain, configure it in Vercel dashboard

8. **Record the Decision:**
   Create `Decisions/brand_site.md` with the following structure:
   ```markdown
   # Decision: Branding Website

   > **Status:** DEPLOYED
   > **Date:** [Date]
   > **Live URL:** [Vercel URL]
   > **Template Source:** [Aura template name/link]
   > **Deployed By:** [Name]

   ## Purpose
   Standalone branding website that advertises the app. Serves as the visual
   north star for DESIGN.md extraction and Google Stitch UI generation.

   ## Assets Used
   - [List of images, their sources (Aura CDN, NanoBanana, etc.)]

   ## Sections
   - Hero: [description]
   - Features: [description]
   - [Other sections]

   ## Integration Points
   - **"Launch App" CTA** → links to: [Vercel app URL — fill in after app deployment]
   - **DESIGN.md** → extracted via `/design-extract` workflow
   - **Google Stitch** → uses this URL as style reference via `/stitch-generate` workflow
   ```

9. **Transition to Next Phase:**
   Tell the user:
   > "Branding website deployed. Run `/design-extract` to generate `DESIGN.md` and `tokens.css` from the branding site's visual system. Then run `/stitch-generate` to use both as input for the app's React UI."

**Out of Scope (What NOT to do):**
- Do NOT modify the main `app/` codebase — the branding site is separate.
- Do NOT convert the branding site to React — it stays as Aura's HTML/Tailwind/JS output.
- Do NOT import branding site code into `app/src/`.
- Do NOT spend more than 1 hour on this. Use the 90/10 rule — keep the template's polish, only change content.

When finished, suggest:
`git add brand_site/ Decisions/brand_site.md ; git commit -m "feat(creative): deploy branding website from Aura template"`
