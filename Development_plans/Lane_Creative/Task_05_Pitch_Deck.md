# Task 05: Pitch Deck — 5-Slide Presentation for Judges

> **Lane:** Creative
> **Priority:** P1-High
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T04–T07, Backend T05
> **Depends On:** Creative Task 01 (Brand Website — need screenshots), Creative Task 04 (Illustrations — need visuals)

## Objective

Create a compelling 5-slide pitch deck that tells the SplitAI story in 90 seconds. The deck should be visually stunning, data-backed, and follow the hackathon winning strategies identified in R09 (start with pain, show live AI, prove city impact). Output as an HTML presentation (can be opened in any browser) stored in `docs/pitch/`.

## Context Snapshot

**Read these files before starting:**
- `Decisions/selected_idea.md` — full product pitch, demo script, research evidence
- `DESIGN.md` — brand colors and typography for the deck
- `Research/Tasks/R09_Judging_Strategy.md` — judging criteria and winning patterns
- `Development_plans/MASTER_PLAN.md` — §6 Success Criteria

**Judging weights (R09):** Technical Execution & AI Depth (35%), Feasibility & City Impact (35%), Innovation & UX (30%)

**Demo script (from selected_idea.md):**
1. Scene 1: 3D Map Overview (15s)
2. Scene 2: Pazar Morning (15s)
3. Scene 3: Tourist Question + Siren (15s)
4. Scene 4: Photo Report → Map Pin (25s)
5. Scene 5: Admin Dashboard + Closing (20s)

## Interface Contract

**This task PRODUCES:**
- `docs/pitch/index.html` — Self-contained HTML pitch deck (no external deps)
- `docs/pitch/assets/` — Any images embedded in the deck
- `docs/pitch/PITCH_SCRIPT.md` — Speaker notes / script for the presenter

**This task CONSUMES:**
- Brand colors + fonts from `DESIGN.md`
- Product screenshots (from brand site or generated mockups)
- Illustration assets from Task 04
- Research data from `Research/Tasks/`

## Implementation Steps

1. **Create deck structure** — 5 slides in HTML/CSS (one self-contained file):
   - **Slide 1: The Pain** — "Split has 200K citizens, 2M tourists, and ZERO unified digital services." Show fragmented apps (Gradsko Oko, Promet Split, Split Parking) and citizen frustration quotes from R04.
   - **Slide 2: The Solution** — "SplitAI: One AI agent for Split." One-liner, product screenshot, 5 capability icons. Show that it subsumes all fragmented services.
   - **Slide 3: The AI** — Technical depth. Show RAG architecture, Vision classification example, function calling diagram. Emphasize: Context Caching (250-page GUP), sub-second response, 5 languages, structured JSON outputs.
   - **Slide 4: The Impact** — City alignment. €2M AI Center initiative, 3 personas served, demo metrics (response time, classification accuracy). "This is the AI Assistant Split is already budgeting for."
   - **Slide 5: The Demo** — "Let us show you." CTA to the live app. Team name, thank you.

2. **Style the deck** using brand tokens:
   - Full-screen slides with gradient backgrounds (#003366 → #004488)
   - White text on dark backgrounds
   - Glassmorphic card overlays for key stats
   - Smooth slide transitions (CSS transforms)
   - Brand font (from DESIGN.md)

3. **Add speaker notes** to `PITCH_SCRIPT.md`:
   - Per-slide talking points
   - Timing targets (total = 90 seconds)
   - Key phrases to emphasize
   - Fallback plan if demo fails

4. **Include visual elements:**
   - Product mockup screenshots (generate with image tool if app isn't ready yet)
   - Architecture diagram (simplified Mermaid → PNG)
   - Persona cards with the generated avatars
   - Research data visualizations (stat callouts, not charts)

## Acceptance Criteria

- [ ] `docs/pitch/index.html` opens in a browser and shows 5 slides
- [ ] Slides use keyboard navigation (arrow keys) or scroll
- [ ] Brand colors and typography match `DESIGN.md`
- [ ] Slide 1 includes a compelling pain-point hook
- [ ] Slide 3 shows real technical architecture (not vague "AI-powered" claims)
- [ ] Slide 4 references the €2M AI Center budget alignment
- [ ] `docs/pitch/PITCH_SCRIPT.md` exists with per-slide speaker notes
- [ ] Total script timing = ~90 seconds
- [ ] Deck looks premium — gradients, glassmorphism, clean typography

## Out of Scope (CRITICAL)

- Do NOT use PowerPoint/Google Slides — HTML only (version-controlled, no binary blobs)
- Do NOT modify the web application
- Do NOT create the demo video — that's Task 06
- Do NOT include actual app screenshots if the app isn't built yet — use mockups

## Handoff

- Push to: `lane/creative/pitch-deck`
- Notify: **Lead (Karlo)** — pitch deck ready for rehearsal
- Next task enabled: **Creative Task 06 (Demo Script + Video)**

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Creative/Task_05_Pitch_Deck.md`
