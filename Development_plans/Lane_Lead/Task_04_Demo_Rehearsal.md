# Task 04: Demo Rehearsal & Backup Video

> **Lane:** Lead
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** None — final task
> **Depends On:** Lead T03 (CP3 passed), Creative T05 (Pitch Deck), Creative T06 (Demo Script)

## Objective

Rehearse the 90-second live demo, prepare the talking points, and record a backup video. The demo must follow the golden path: **Map → Chat → Photo Report → Map (marker appears) → Pazar → Admin → Emergency**. The backup video ensures we have a fallback if the live demo encounters network issues or API quota problems.

## Context Snapshot

**Read these files before starting:**
- `docs/demo/` — Demo script (if created by Creative lane)
- `docs/pitch/` — Pitch deck slides (if created by Creative lane)
- `Development_plans/PROJECT_STATE.md` — final feature status (what works, what doesn't)
- `Decisions/selected_idea.md` — product vision for talking points

**Key constraint:** The demo is 90 seconds. Every second counts. No fumbling, no waiting for API responses.

## Interface Contract

**This task PRODUCES:**
- Rehearsed demo flow with timing marks
- Pre-seeded demo data (mock reports, listings already in the system)
- Backup video (screen recording of the golden path)
- Talking points document aligned with pitch deck

**This task CONSUMES:**
- The fully integrated app (from CP3)
- Pitch deck slides (Creative lane)
- Demo script (Creative lane)

## Implementation Steps

1. **Pre-seed demo data**
   - Ensure the in-memory store has compelling mock data:
     - 8-10 civic reports across Split (various categories, severities, statuses)
     - 3-5 Pazar listings (fish, fruit, olive oil — realistic Split market items)
     - Pre-loaded conversation showing a previous chat exchange
   - This data should load automatically when the BFF starts
   - If it doesn't, create a seed script or add to the existing mock data

2. **Prepare the golden path**
   - Document the exact demo sequence with timing:
     ```
     0:00-0:15  — Open app on Map page. Pan around 3D Split. "This is SplitAI."
     0:15-0:35  — Navigate to Chat. Ask: "Can I build on my terrace in Varoš?"
                   Wait for cited answer. Show citation card.
     0:35-0:55  — Navigate to Report. Upload prepared pothole photo.
                   AI classifies: "Pothole, Severity 7, Promet department."
                   Submit. Show ticket confirmation.
     0:55-1:05  — Switch back to Map. New marker appears. Click it.
     1:05-1:15  — Navigate to Pazar. Show today's market feed.
     1:15-1:25  — Navigate to Admin. Show dashboard metrics + report table.
     1:25-1:30  — Show PWA install or native app on phone.
     ```
   - Prepare specific test inputs that produce impressive outputs
   - Have a pre-selected photo ready for the report step (clear, dramatic issue)

3. **Pre-warm the system**
   - Before demo: hit the health endpoint to ensure cache is loaded
   - Send one warm-up chat message (not shown in demo) to prime Gemini
   - Verify all routes respond quickly

4. **Rehearse 3 times**
   - Time each run — must be under 90 seconds
   - Note any steps that are slow or awkward
   - If a step takes too long, consider pre-loading the result
   - Practice the transitions between pages (no fumbling with navigation)

5. **Record backup video**
   - Use OBS, Loom, or built-in screen recorder
   - Record the golden path in one smooth take
   - Include voiceover or plan to talk over it during pitch
   - Export as MP4, store in `docs/demo/backup_demo.mp4`
   - Have the video ready on a USB drive or phone as absolute fallback

6. **Prepare failure contingencies**
   - If Gemini API is slow → show backup video
   - If network fails → have screenshots ready in pitch deck
   - If a specific feature crashes → skip to next feature, mention "we also have..."
   - Know which features are most stable and prioritize showing those

7. **Create talking points**
   - Align with pitch deck slides
   - Highlight: RAG citations, Vision AI, 3D Map, multilingual, Split Zmaj personality
   - Prepare 3 key metrics: response time, languages supported, report types handled
   - Prepare answers for likely judge questions:
     - "How does the RAG work?" → Context Caching, not embeddings
     - "Is the data real?" → Mock data, but architecture supports real APIs
     - "Why Split?" → Municipal pain points, tourist-resident dual audience
     - "What's the business model?" → B2G SaaS for municipalities

## Acceptance Criteria

- [ ] Demo data pre-seeded and loads on app start
- [ ] Golden path rehearsed and under 90 seconds
- [ ] Backup video recorded and saved to `docs/demo/`
- [ ] Talking points document created
- [ ] Failure contingency plan documented
- [ ] All team members know the demo flow

## Out of Scope (CRITICAL)

- Do NOT add new features — code is frozen after CP3
- Do NOT modify the app code for demo-specific hacks
- Do NOT spend time fixing non-demo-path bugs
- Do NOT over-rehearse — 3 runs max, then move on

## Handoff

- Push to: `lane/lead/demo-rehearsal`
- Notify: Entire team — demo is ready
- Next task enabled: The pitch! 🎤

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Lead/Task_04_Demo_Rehearsal.md`
