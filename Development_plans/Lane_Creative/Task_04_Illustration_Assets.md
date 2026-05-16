# Task 04: Illustration Assets — Hero, Feature Icons, Persona Images

> **Lane:** Creative
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Creative T03, Frontend T02–T05
> **Depends On:** Creative Task 02 (Design tokens — need brand colors)

## Objective

Generate all illustration assets the app needs: hero images, feature icons, persona avatars, empty-state graphics, and the Split Zmaj AI avatar. All must match brand identity from `DESIGN.md`.

## Context Snapshot

**Read these files before starting:**
- `DESIGN.md` — brand colors, visual style
- `Decisions/selected_idea.md` — personas (Marija, Thomas, Ivan), features

**Brand aesthetic:** Modern, clean, minimalist. Adriatic Blue (#003366), Hajduk Red (#E3001B), White. Mediterranean civic-tech feel. AI mascot = "Split Zmaj" (dragon).

## Interface Contract

**This task PRODUCES:**

| Asset | Location | Purpose |
|---|---|---|
| `chat-hero.webp` | `app/public/assets/` | Chat welcome illustration |
| `map-hero.webp` | `app/public/assets/` | Map loading overlay |
| `report-success.webp` | `app/public/assets/` | Report submission success |
| `pazar-empty.webp` | `app/public/assets/` | Pazar feed empty state |
| `emergency-hero.webp` | `app/public/assets/` | Emergency page header |
| `persona-marija.webp` | `app/public/assets/` | Resident persona avatar |
| `persona-thomas.webp` | `app/public/assets/` | Tourist persona avatar |
| `persona-ivan.webp` | `app/public/assets/` | City warden persona avatar |
| `feature-rag.svg` | `app/src/assets/images/` | RAG feature icon |
| `feature-vision.svg` | `app/src/assets/images/` | Vision reporting icon |
| `feature-pazar.svg` | `app/src/assets/images/` | Pazar feed icon |
| `feature-map.svg` | `app/src/assets/images/` | 3D Map icon |
| `feature-multilingual.svg` | `app/src/assets/images/` | Multilingual icon |
| `zmaj-avatar.webp` | `app/public/assets/` | AI assistant chat avatar |

## Implementation Steps

1. **Generate hero illustrations** using image generation tool — Split skyline + AI elements, brand colors, flat modern style
2. **Generate 3 persona avatars** — illustrated (not photographic), Mediterranean setting, matching descriptions in selected_idea.md
3. **Generate Split Zmaj avatar** — friendly dragon head, Adriatic Blue, neural-network patterns, circular crop
4. **Create 5 feature SVG icons** — minimal, clean, < 5KB each
5. **Optimize all assets** — WebP for raster (< 100KB heroes, < 30KB avatars), clean SVGs

## Acceptance Criteria

- [ ] All 14 assets created in correct directories
- [ ] Raster images in WebP format, properly sized
- [ ] All assets use brand colors consistently
- [ ] Illustrations feel cohesive — same style, palette, mood
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT modify React components — Frontend handles imports
- Do NOT create CSS/styling
- Do NOT duplicate Lucide React icons
- Do NOT modify `DESIGN.md` or `tokens.css`

## Handoff

- Push to: `lane/creative/illustration-assets`
- Notify: **Frontend lane** — assets ready for components
- Next task enabled: **Creative Task 05 (Pitch Deck)**, Frontend asset imports

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Creative/Task_04_Illustration_Assets.md`
