# Task 6.3: Crowd Route

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** XS (<10min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task_01 (BFF Scaffold) ✅
> **Can Parallelize With:** Task 6.1, 6.2, 6.4

## Objective

Create `GET /api/crowd/:area` returning mock crowd-level data (Đir Index) for popular Split locations.

## Required Reading

- `app/src/types/index.ts` — `CrowdInfo` (lines 319–326), `AlternateRoute` (lines 329–334), `APIResponse` (lines 366–371)
- `app/src/server/routes/report.ts` — Pattern reference

## Target Files

- **CREATE:** `app/src/server/routes/crowd.ts`

## Implementation Steps

1. Create Express Router with `GET /:area` handler
2. Define a `Record<string, CrowdInfo>` map with Split tourist areas:
   - **`diocletians_palace`**: `very_high` crowd (85%), suggest "Visit Marjan park instead"
     - alternateRoutes: Marjan Park (low, 15min walk), Bačvice Beach (moderate, 10min walk)
   - **`riva`**: `high` crowd (70%), suggest "Try the west end near ACI marina"
     - alternateRoutes: ACI Marina (low, 8min), Matejuška (low, 5min)
   - **`bacvice`**: `moderate` crowd (45%), suggest "Best time is early morning"
     - alternateRoutes: Trstenik Beach (low, 12min), Žnjan Beach (low, 20min)
   - **`marjan`**: `low` crowd (20%), suggest "Ideal for walking, trails uncrowded"
   - **`znjan`**: `low` crowd (15%), suggest "Spacious beach, good for families"
3. Extract `area` from `req.params.area`
4. If area not found, return 404 with `{ code: "AREA_NOT_FOUND" }`
5. Set `lastUpdated` to current ISO timestamp for realism
6. Return `APIResponse<CrowdInfo>`
7. Try/catch with 500 fallback

## Acceptance Criteria

- [ ] `GET /api/crowd/diocletians_palace` returns `CrowdInfo` with `very_high` level
- [ ] `alternateRoutes` array has realistic Split alternatives with walk times
- [ ] Invalid area returns 404
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] Export default router

## Out of Scope (CRITICAL)

- Do NOT mount in `server/index.ts` (Task 6.5)
- Do NOT implement real crowd sensors or time-based variance
- Do NOT create UI components

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_6.3_Crowd_Route.md`
