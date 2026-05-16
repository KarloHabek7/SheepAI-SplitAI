# Task 01: Brand Website — Aura Template Customization & Vercel Deploy

> **Lane:** Creative
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Backend T01, AI T01, Frontend T01
> **Depends On:** None

## Objective

Create a stunning, production-quality landing page for SplitAI using the Aura.build template system. This page serves as the **visual north star** for the entire project — it defines the brand identity, color palette, typography, and design language that all other lanes will inherit via `DESIGN.md` and `tokens.css`. Deploy to Vercel so judges can visit a live URL immediately.

## Context Snapshot

**Read these files before starting:**
- `Decisions/selected_idea.md` — product pitch, one-liner, personas, feature list
- `docs/architecture/ARCHITECTURE.md` — §1 System Overview for deliverable descriptions
- `.agents/rules/brand-site-conventions.md` — rules for working in `brand_site/`
- `.agents/workflows/brand-site.md` — the `/brand-site` workflow with step-by-step instructions

**Key brand direction from the selected idea:**
```
Color Palette: Deep Adriatic Blue (#003366) and Hajduk White/Red accents (#FFFFFF, #E3001B)
Aesthetic: Glassmorphic, premium, modern — a step up from legacy municipal portals
One-Line Pitch: "One AI agent for Split: ask anything, report anything, in any language."
Target Users: Marija (resident), Thomas (tourist), Ivan (city warden)
```

## Interface Contract

**This task PRODUCES:**
- `brand_site/` — Complete static landing page (HTML/CSS/JS)
- Live Vercel URL — Deployed and accessible
- Visual reference for `DESIGN.md` extraction (Task 02)
- The **first impression** judges will see

**This task CONSUMES:**
- `Decisions/selected_idea.md` (copy and feature list)
- Aura.build template (selected during workflow)

## Implementation Steps

1. **Run the `/brand-site` workflow** — this guides you through:
   - Selecting an appropriate Aura.build template (hero + features + CTA sections)
   - Cloning/downloading the template into `brand_site/`
   - Customizing content with SplitAI branding
2. **Customize the content:**
   - **Hero Section:** One-liner pitch, CTA button ("Try SplitAI" / "Isprobaj SplitAI"), hero image/illustration of Split skyline or Diocletian's Palace with AI overlay
   - **Features Section:** 5 feature cards:
     1. 🧠 "Split Zmaj" RAG Q&A — Ask anything about city regulations
     2. 📸 "Marjan Vision" Photo Reports — Snap → classify → submit
     3. 🐟 Pazar Market Feed — Fresh prices every morning
     4. 🗺️ 3D Civic Map — See all city issues at a glance
     5. 🌍 Multilingual — HR, EN, DE, IT, FR — auto-detected
   - **Personas Section:** Three persona cards (Marija, Thomas, Ivan)
   - **Demo CTA:** "See it in action" button linking to the web app URL
   - **Footer:** Team name (SheepAI), hackathon badge, City of Split reference
3. **Apply brand colors:**
   - Primary: Deep Adriatic Blue `#003366`
   - Accent: Hajduk Red `#E3001B`
   - Background: White `#FFFFFF` / near-white `#F8FAFC`
   - Text: Dark charcoal `#1A1A2E`
   - Gradient accents: `#003366` → `#004488` → `#0066AA` (blue spectrum)
4. **Add premium touches:**
   - Glassmorphism on feature cards (backdrop-filter, subtle borders)
   - Smooth scroll-triggered animations (fade-in on scroll)
   - Responsive layout (mobile-first)
   - Favicon and meta tags for social sharing (OG image)
5. **Generate a hero image** using the image generation tool:
   - Split skyline silhouette with AI neural network overlay
   - Use the Adriatic Blue palette
   - Modern, clean, tech-forward aesthetic
6. **Deploy to Vercel:**
   - `cd brand_site && npx vercel --prod`
   - Note the live URL in the task notes
7. **Verify:**
   - Mobile responsive
   - Fast load time (< 2s)
   - All links work
   - Meta tags present (title, description, OG image)

## Acceptance Criteria

- [ ] `brand_site/` directory contains a complete static landing page
- [ ] Hero section has the one-liner pitch and CTA
- [ ] Features section shows all 5 MVP features with icons
- [ ] Color palette matches the brand direction (#003366, #E3001B, #FFFFFF)
- [ ] Glassmorphic design elements present (backdrop-filter, transparency)
- [ ] Mobile responsive (tested at 375px width)
- [ ] Deployed to Vercel with a live URL
- [ ] Page loads in < 2s
- [ ] Meta tags and favicon present

## Out of Scope (CRITICAL)

- Do NOT modify any files in `app/src/` — that's Frontend lane
- Do NOT create `DESIGN.md` or `tokens.css` yet — that's Task 02
- Do NOT build the actual web application — this is a static marketing page only
- Do NOT add login/auth — this is a public landing page

## Handoff

- Push to: `lane/creative/brand-site`
- Notify: **Frontend lane** — brand site is live, they can reference the visual style
- Notify: **Lead** — update Vercel URL in project docs
- Next task enabled: **Task 02 (Design Token Extraction)** — extracts DESIGN.md + tokens.css from this site

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Creative/Task_01_Brand_Website.md`
