# Task 06: Demo Script + Backup Video Recording

> **Lane:** Creative
> **Priority:** P2-Medium
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Can Parallelize With:** None — this is the last Creative task
> **Depends On:** All other lanes (app must be functional for demo recording)

## Objective

Write the definitive demo script (with exact clicks, narration, and timing) and coordinate recording a backup demo video in case the live demo fails. The script follows the 5-scene structure from `selected_idea.md` but adds precise click-by-click choreography.

## Context Snapshot

**Read these files before starting:**
- `Decisions/selected_idea.md` — §Demo Script (90 seconds), 5 scenes
- `docs/pitch/PITCH_SCRIPT.md` — pitch deck speaker notes (from Task 05)
- `Development_plans/MASTER_PLAN.md` — §4 Integration Checkpoints (CP3 = demo-ready)

**Demo script structure (from selected_idea.md):**
1. Scene 1: 3D Map Overview (15s)
2. Scene 2: Pazar Morning (15s)
3. Scene 3: Tourist Question + Siren (15s)
4. Scene 4: Photo Report → Map Pin (25s)
5. Scene 5: Admin Dashboard + Closing (20s)

## Interface Contract

**This task PRODUCES:**
- `docs/demo/DEMO_SCRIPT.md` — Full click-by-click demo choreography
- `docs/demo/DEMO_CHECKLIST.md` — Pre-demo setup checklist
- `docs/demo/backup-video.md` — Instructions for recording backup video

**This task CONSUMES:**
- Working web application (all features functional after CP3)
- Pitch script from Task 05
- Demo scene outline from selected_idea.md

## Implementation Steps

1. **Write `DEMO_SCRIPT.md`** with this structure per scene:
   ```
   ## Scene X: [Title] — [Duration]
   
   **Setup:** [What should be on screen before this scene starts]
   **Narration:** "[Exact words to say]"
   **Clicks:**
   1. [Click/tap action] → [Expected result]
   2. [Type "..." in input] → [Expected AI response]
   **Transition:** [How to move to next scene]
   **Fallback:** [What to do if this scene fails]
   ```

2. **Write `DEMO_CHECKLIST.md`** — pre-demo preparation:
   - [ ] Clear browser cache
   - [ ] Pre-warm Context Cache (hit `/api/cache/init`)
   - [ ] Seed mock data (reports, Pazar listings)
   - [ ] Set language to Croatian, then switch to demo starting language
   - [ ] Open app in incognito/clean window
   - [ ] Disable notifications, set Do Not Disturb
   - [ ] Test internet connectivity
   - [ ] Have backup video cued up
   - [ ] Have pitch deck open in separate tab

3. **Write `backup-video.md`** — instructions for recording:
   - Screen recording tool recommendation (OBS or built-in)
   - Resolution: 1920×1080
   - Record each scene separately, then stitch
   - Add voiceover narration matching the script
   - Target duration: 90 seconds
   - Export as MP4, < 50MB

4. **Rehearse timing** — verify each scene fits within its target duration

## Acceptance Criteria

- [ ] `docs/demo/DEMO_SCRIPT.md` covers all 5 scenes with exact narration
- [ ] Each scene has click-by-click instructions
- [ ] Each scene has a fallback plan
- [ ] `docs/demo/DEMO_CHECKLIST.md` has pre-demo setup steps
- [ ] `docs/demo/backup-video.md` has recording instructions
- [ ] Total script duration = 90 seconds (±10s)

## Out of Scope (CRITICAL)

- Do NOT record the actual video — that requires a working app
- Do NOT modify the web application
- Do NOT create new features for the demo — script works with existing MVP
- Do NOT modify pitch deck — that's finalized in Task 05

## Handoff

- Push to: `lane/creative/demo-script`
- Notify: **Lead (Karlo)** — demo materials ready for rehearsal at CP3
- Notify: **All lanes** — demo script is the reference for what the final product must support
- This is the final Creative lane task

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Creative/Task_06_Demo_Script.md`
