# Task 02: CP2 Integration — Vision + Pazar + Map End-to-End

> **Lane:** Lead
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF
> **Can Parallelize With:** None — this is a synchronization point
> **Depends On:** Lead T01 (CP1 passed), Frontend T03 (ReportPage), Frontend T04 (PazarPages), Frontend T05 (MapPage), Backend T03–T06 (Report/Pazar/Admin/Utility Routes), AI T04–T07 (Schemas, Vision, Hooks)

## Objective

Run the second Integration Checkpoint (CP2) at ~17:00. Verify three critical flows:
1. **Photo Report:** Upload photo → Vision AI classifies → user confirms → ticket created → report appears on admin dashboard AND on 3D map
2. **Pazar Feed:** Vendor uploads photo → AI extracts items/prices → listing appears in Pazar feed
3. **3D Map:** Map loads with 3D buildings, issue markers render from existing reports, filters work, clicking a marker shows details

This checkpoint proves the full AI-powered municipal system is functional.

## Context Snapshot

**Read these files before starting:**
- `Development_plans/PROJECT_STATE.md` — verify all Wave 3–4 tasks are ✅ Done
- `docs/architecture/ARCHITECTURE.md` §4.2, §4.3 — Photo Report + Pazar data flows
- `docs/architecture/ARCHITECTURE.md` §15 — 3D Map architecture
- `app/src/types/index.ts` — `CivicReport*`, `PazarListing*`, `IssueGeoJSON*` types

**Key types you'll use:**
```typescript
interface ReportAnalyzeRequest { image: string; location?: GeoLocation; }
interface ReportAnalyzeResponse { classification: CivicReportClassification; }
interface PazarAnalyzeRequest { image: string; }
interface PazarAnalyzeResponse { classification: PazarListingClassification; }
interface IssueGeoJSONCollection { type: 'FeatureCollection'; features: IssueGeoJSONFeature[]; }
```

## Interface Contract

**This task PRODUCES:**
- Verified E2E Vision reporting flow
- Verified E2E Pazar feed flow
- Verified 3D Map with live issue markers
- Updated `PROJECT_STATE.md` with CP2 results
- Bug list for any issues found

**This task CONSUMES:**
- All Frontend pages (T01–T05)
- All Backend routes (T01–T06, T07–T08)
- All AI services (T01–T07)
- Map components and hooks

## Implementation Steps

1. **Pre-check: Verify prerequisites**
   - Check `PROJECT_STATE.md` — all Wave 3–4 tasks must be ✅ Done
   - Verify CP1 (Lead T01) is ✅ Done — chat still works
   - If any prerequisite missing, identify and escalate

2. **Merge all lane branches to `main`**
   - Same process as CP1 but with more branches
   - Resolve merge conflicts carefully (especially `App.tsx` routes)
   - Run `npm install` after merges
   - Run `npm run build` to verify no type errors

3. **Test: Photo Report E2E**
   - Navigate to `/report`
   - Upload a test image (any urban photo will do)
   - Verify: AI classification appears (category, severity, department, zone)
   - Confirm submission → verify ticket ID returned
   - Navigate to `/admin` → verify report appears in the table
   - Navigate to `/` (map) → verify report marker appears on the map

4. **Test: Pazar Feed E2E**
   - Navigate to `/pazar/submit`
   - Upload a photo of food/produce (or any test image)
   - Verify: AI extracts items with names, prices, categories
   - Confirm submission → listing created
   - Navigate to `/pazar` → verify listing appears in the feed
   - Check freshness indicator and price display

5. **Test: 3D Map E2E**
   - Navigate to `/` (MapPage — home screen)
   - Verify: 3D buildings render with isometric perspective
   - Verify: Issue markers appear (from reports created above + mock data)
   - Verify: Clustering works when zoomed out
   - Click a marker → verify detail panel appears (desktop: side panel, mobile: bottom sheet)
   - Test filters → verify markers update accordingly
   - Test "Locate me" button → verify geolocation prompt
   - Test report FAB → verify report mode activates

6. **Cross-feature integration test**
   - In `/chat`, type: "I want to report a pothole"
   - Verify: AI suggests using the photo report feature or guides through conversation
   - In `/chat`, type: "What's at the Pazar today?"
   - Verify: AI can query/describe Pazar listings

7. **Performance + error check**
   - Vision classification time < 2s
   - Map loads without console errors
   - All pages reachable from navigation
   - Responsive check: resize to mobile width, verify bottom nav works

8. **Document results**
   - Update `PROJECT_STATE.md` with CP2 results
   - Note any bugs for immediate fixing or deferral

## Acceptance Criteria

- [ ] Photo → classify → submit → admin sees report → map shows marker (full cycle)
- [ ] Pazar photo → AI extract → submit → feed shows listing (full cycle)
- [ ] 3D map loads with buildings, markers, clustering, and filters
- [ ] Marker click shows issue details
- [ ] All navigation routes work
- [ ] No critical console errors
- [ ] `PROJECT_STATE.md` updated with CP2 results
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT add new features
- Do NOT attempt PWA/Capacitor setup at this checkpoint
- Do NOT fix cosmetic issues unless they break the demo flow
- Do NOT modify lane-owned code without `/implement-any`

## Handoff

- Push to: `lane/lead/cp2-integration`
- Notify: All lanes — CP2 results determine final sprint priorities
- Next task enabled: Wave 5–6 tasks (polish, PWA, pitch)

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Lead/Task_02_CP2_Integration.md`
