# Task 03: CP3 Final Integration + QA Polish

> **Lane:** Lead
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Opus 4.6 Thinking
> **Planning Mode:** ON
> **Can Parallelize With:** None — final synchronization point
> **Depends On:** Lead T02 (CP2 passed), Frontend T06–T09 (Admin, Emergency, PWA, Polish), Creative T05 (Pitch Deck)

## Objective

Run the final Integration Checkpoint (CP3) at ~18:30. Merge all remaining work, verify **every feature** works end-to-end, ensure the PWA is installable, attempt the Capacitor Android build, and confirm the app is demo-ready. This is the last chance to catch and fix issues before the pitch.

## Context Snapshot

**Read these files before starting:**
- `Development_plans/PROJECT_STATE.md` — verify all tasks across all lanes
- `docs/architecture/ARCHITECTURE.md` — full architecture for reference
- `DESIGN.md` — verify visual consistency across all pages

**Key verification areas:**
- All 8+ routes working
- All API endpoints responding
- PWA manifest + service worker
- Responsive design (mobile + desktop)
- Capacitor build (bonus)

## Interface Contract

**This task PRODUCES:**
- Fully integrated, demo-ready application
- Updated `PROJECT_STATE.md` with final status
- Bug fix list (critical bugs fixed inline, non-critical deferred)
- Deployment verification (Vercel or local)
- APK file (if Capacitor build succeeds)

**This task CONSUMES:**
- ALL deliverables from ALL lanes

## Implementation Steps

1. **Pre-check: Full status review**
   - Read `PROJECT_STATE.md` — identify any incomplete tasks
   - For each incomplete task, decide: fix now (critical) or defer (nice-to-have)
   - Ensure all lane branches are ready for final merge

2. **Final merge to `main`**
   - Merge all remaining lane branches
   - Resolve all merge conflicts
   - `npm install` → `npm run build` → verify zero errors

3. **Full feature walkthrough (the demo path)**
   - **Home (Map):** 3D map loads → markers visible → click one → detail panel
   - **Chat:** Ask regulation question → cited answer → ask about parking → tool call
   - **Report:** Upload photo → AI classifies → submit → ticket confirmed
   - **Map again:** New report marker appears on map
   - **Pazar:** Feed shows listings → vendor submits new one
   - **Emergency:** QR scanner page loads → multilingual instructions display
   - **Admin:** Dashboard metrics → report table → update status → filter
   - **Navigation:** All bottom nav tabs work, all header links work

4. **Responsive check**
   - Resize to 375px width (iPhone SE)
   - Verify: Bottom nav visible, no horizontal scroll, touch targets large enough
   - Verify: Map gestures work (pinch zoom, drag)
   - Verify: Chat input keyboard doesn't cover messages

5. **PWA verification**
   - Check `manifest.json` exists and is correct
   - Check service worker registers
   - In Chrome DevTools → Application → check "Installable"
   - Try "Add to Home Screen" → verify app icon and splash screen

6. **Capacitor build (bonus — attempt only if time permits)**
   - `cd app && npx cap sync`
   - `npx cap open android` → Android Studio
   - Build APK: Build → Build Bundle/APK → Build APK
   - Test on emulator or physical device
   - If this fails, don't spend > 15min debugging — PWA is the fallback

7. **Visual polish sweep**
   - Check all pages use correct design tokens (no hardcoded colors)
   - Verify glassmorphism/animation effects are smooth
   - Check loading states and error states look professional
   - Verify brand consistency (logo, color scheme, typography)

8. **Performance final check**
   - Lighthouse audit (aim for 90+ Performance, 90+ Accessibility)
   - All text responses < 1s, Vision < 2s
   - No memory leaks in map page (watch DevTools Performance tab)

9. **Deploy to Vercel (if not already)**
   - Verify app is deployed and accessible via public URL
   - Test the deployed version (not just localhost)
   - Share URL with team for final review

10. **Update final state**
    - `PROJECT_STATE.md` → all tasks marked with final status
    - Overall Progress → final percentage
    - List any known issues for the pitch Q&A

## Acceptance Criteria

- [ ] All 8+ routes working without errors
- [ ] Chat + RAG + Function Calling verified
- [ ] Photo Report + Vision AI verified
- [ ] Pazar Feed verified
- [ ] 3D Map with markers, clusters, filters verified
- [ ] Emergency page functional
- [ ] Admin dashboard functional
- [ ] Responsive on mobile widths
- [ ] PWA installable (or at minimum, manifest correct)
- [ ] Brand website live on Vercel
- [ ] `npm run build` passes with zero errors
- [ ] `PROJECT_STATE.md` fully updated
- [ ] No critical console errors anywhere

## Out of Scope (CRITICAL)

- Do NOT add new features at this stage
- Do NOT refactor working code
- Do NOT spend > 15min on Capacitor if it's failing — PWA is the backup
- Do NOT attempt voice input or WebSocket features

## Handoff

- Push to: `lane/lead/cp3-final`
- Notify: Entire team — app is frozen after CP3
- Next task enabled: Lead T04 (Demo Rehearsal)

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Lead/Task_03_CP3_Final_QA.md`
