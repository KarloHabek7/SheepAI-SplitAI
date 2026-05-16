# Decision: Branding Website

> **Status:** DEPLOYED (Local / Pending Vercel)
> **Date:** 2026-05-16
> **Live URL:** [Pending]
> **Template Source:** Aura "Decentralized Planetary Infrastructure" Template
> **Deployed By:** Creative Lead

## Purpose
Standalone branding website that advertises the app. Serves as the visual
north star for DESIGN.md extraction and Google Stitch UI generation.

## Assets Used
- Aura CDN base images
- WebGL background and CSS animations provided by template

## Sections
- Hero: "One AI Agent for Split" (SplitAI value proposition)
- Features: Marjan Vision, Split Zmaj RAG, Multilingual Core
- Integrations: Supabase, Vercel, Slack (Placeholder for City APIs)
- Footer: SplitAI contact info and Beta signup

## Integration Points
- **"Launch App" CTA** → links to: [Vercel app URL — fill in after app deployment]
- **DESIGN.md** → extracted via `/design-extract` workflow
- **Google Stitch** → uses this URL as style reference via `/stitch-generate` workflow
