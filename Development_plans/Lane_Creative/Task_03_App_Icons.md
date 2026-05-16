# Task 03: App Icon + Favicon + PWA Icons

> **Lane:** Creative
> **Priority:** P1-High
> **Estimated Effort:** S (<30min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Creative T04, Frontend T02–T03
> **Depends On:** Creative Task 02 (Design tokens — need brand colors)

## Objective

Generate a complete icon set for SplitAI: a primary app icon, browser favicon (multi-size), PWA manifest icons (192px, 512px), Apple touch icon (180px), and a high-res icon for the Capacitor Android/iOS build. The icon must be instantly recognizable, reflect the "Split Zmaj" (Dragon of Split) AI identity, and use the established brand colors.

## Context Snapshot

**Read these files before starting:**
- `DESIGN.md` — brand colors and visual identity (created by Task 02)
- `Decisions/selected_idea.md` — product name, AI persona name ("Split Zmaj")

**Key brand elements for the icon:**
```
Primary Color: #003366 (Deep Adriatic Blue)
Accent Color:  #E3001B (Hajduk Red)
AI Persona:    "Split Zmaj" (Dragon of Split)
Product Name:  SplitAI
Aesthetic:     Modern, minimal, tech-forward
```

**Icon concept direction:**
- A stylized dragon silhouette merged with AI/neural network motifs
- OR a minimal "S" lettermark with dragon-scale texture and a circuit element
- Use the Deep Adriatic Blue as the primary fill, with a Hajduk Red accent detail
- Must be legible at 16×16 favicon size — keep it simple

## Interface Contract

**This task PRODUCES:**
- `app/public/favicon.ico` — Multi-size ICO (16×16, 32×32)
- `app/public/favicon-16x16.png` — 16×16 PNG
- `app/public/favicon-32x32.png` — 32×32 PNG
- `app/public/apple-touch-icon.png` — 180×180 PNG
- `app/public/assets/icon-192.png` — PWA manifest icon 192×192
- `app/public/assets/icon-512.png` — PWA manifest icon 512×512
- `app/public/assets/icon-maskable-512.png` — Maskable icon for Android (with safe zone)
- `assets/icon-1024.png` — High-res source icon for Capacitor builds

**This task CONSUMES:**
- `DESIGN.md` — brand colors
- Brand site visual style (from Task 01)

## Implementation Steps

1. **Generate the primary icon** using the image generation tool:
   - Prompt: A stylized dragon head icon merging with AI neural-network lines, modern flat design, Deep Adriatic Blue (#003366) background, clean edges, minimal detail, suitable for app icon. The dragon evokes Split's Zmaj heritage — simplified, geometric, tech-forward.
   - Generate at 1024×1024 for maximum flexibility
2. **Create size variants:**
   - Use the generated image to produce all required sizes
   - For favicon (16px, 32px): Ensure the design is still recognizable — may need to simplify further
   - For maskable icon: Add padding (safe zone = inner 80% circle) with brand color background
3. **Place files in the correct locations** (see Interface Contract above)
4. **Update `app/public/manifest.json`** (if it exists) to reference the new icons:
   ```json
   {
     "icons": [
       { "src": "/assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "/assets/icon-512.png", "sizes": "512x512", "type": "image/png" },
       { "src": "/assets/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
     ]
   }
   ```
5. **Update `app/index.html`** favicon references:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   ```

## Acceptance Criteria

- [ ] All icon files exist in the specified locations
- [ ] Primary icon uses brand colors (#003366, #E3001B)
- [ ] Icon is visually recognizable at 16×16 and 32×32 sizes
- [ ] PWA manifest icons are 192×192 and 512×512
- [ ] Maskable icon has proper safe zone padding
- [ ] `app/index.html` has favicon link tags
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT create the PWA manifest file itself — Frontend lane handles that (Task 1.8)
- Do NOT modify React components
- Do NOT modify `tokens.css` or `DESIGN.md`
- Do NOT create feature illustrations — that's Task 04

## Handoff

- Push to: `lane/creative/app-icons`
- Notify: **Frontend lane** — icons are ready for PWA manifest and index.html
- Next task enabled: **Frontend Task 1.8 (PWA Setup)** can use these icons; **Frontend Task 1.10 (Capacitor Init)** needs the high-res icon

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Creative/Task_03_App_Icons.md`
