# Task 6.1: Parking Route

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** XS (<10min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task_01 (BFF Scaffold) ✅
> **Can Parallelize With:** Task 6.2, 6.3, 6.4

## Objective

Create `GET /api/parking/:zone` returning mock parking availability data for Split's four main parking zones plus garages.

## Required Reading

- `app/src/types/index.ts` — `ParkingInfo` (lines 290–299), `CityZone` (lines 60–68), `APIResponse` (lines 366–371)
- `app/src/server/routes/report.ts` — Pattern reference for route structure

## Target Files

- **CREATE:** `app/src/server/routes/parking.ts`

## Implementation Steps

1. Create Express Router with `GET /:zone` handler
2. Define a `Record<CityZone, ParkingInfo>` map with hardcoded Split-specific data:
   - `zona_a`: 2.50€/h, garage "Lora" nearby, ~40% occupancy
   - `zona_b`: 1.50€/h, garage "HNK" nearby, ~60% available
   - `zona_c`: 1.00€/h, no garage, mostly available
   - `zona_d`: 0.50€/h, abundant parking
   - `unesco_core`: No street parking, redirect to Lora garage
   - `marjan_park`: Free parking, seasonal availability
   - Other zones: sensible defaults
3. Extract `zone` from `req.params.zone`
4. Validate zone exists in the map. If not, return 404 with `APIResponse` error:
   ```json
   { "success": false, "error": { "code": "ZONE_NOT_FOUND", "message": "..." } }
   ```
5. Return `APIResponse<ParkingInfo>` with mock data
6. Wrap handler body in try/catch, return 500 on unexpected errors

## Acceptance Criteria

- [ ] `GET /api/parking/zona_a` returns valid `ParkingInfo` with realistic Split data
- [ ] `GET /api/parking/invalid_zone` returns 404 with proper error
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] `CityZone` values match the type contract
- [ ] Export default router

## Out of Scope (CRITICAL)

- Do NOT mount the router in `server/index.ts` (Task 6.5)
- Do NOT create UI components
- Do NOT use the store — this is stateless mock data

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_6.1_Parking_Route.md`
