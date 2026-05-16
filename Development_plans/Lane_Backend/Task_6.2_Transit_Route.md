# Task 6.2: Transit Route

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** XS (<10min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task_01 (BFF Scaffold) ✅
> **Can Parallelize With:** Task 6.1, 6.3, 6.4

## Objective

Create `GET /api/transit/:line` returning mock bus/transit schedule data for Split's Promet bus lines.

## Required Reading

- `app/src/types/index.ts` — `TransitInfo` (lines 302–308), `TransitBusArrival` (lines 311–316), `APIResponse` (lines 366–371)
- `app/src/server/routes/report.ts` — Pattern reference

## Target Files

- **CREATE:** `app/src/server/routes/transit.ts`

## Implementation Steps

1. Create Express Router with `GET /:line` handler
2. Define a `Record<string, TransitInfo>` map with real Split bus lines:
   - **Line 2**: Sukoišan → Žnjan, frequent, ~8min ETA
   - **Line 6**: Trajektna Luka → Bračka, ~12min ETA
   - **Line 11**: Grad → Stobreč, moderate frequency, ~15min ETA
   - **Line 15**: Trstenik → Duilovo, ~20min ETA
   - Each line has 2–3 `TransitBusArrival` entries in `nextBuses`, with varied `isDelayed` flags
3. Extract `line` from `req.params.line`
4. If line not found, return 404 with `APIResponse` error: `{ code: "LINE_NOT_FOUND" }`
5. Return `APIResponse<TransitInfo>`
6. Try/catch with 500 fallback

## Acceptance Criteria

- [ ] `GET /api/transit/2` returns valid `TransitInfo` with Split bus stops
- [ ] `nextBuses` array has 2–3 entries with `destination`, `arrivalMinutes`, `isDelayed`
- [ ] Invalid line returns 404
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] Export default router

## Out of Scope (CRITICAL)

- Do NOT mount in `server/index.ts` (Task 6.5)
- Do NOT call real Promet Split API
- Do NOT create UI components

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_6.2_Transit_Route.md`
