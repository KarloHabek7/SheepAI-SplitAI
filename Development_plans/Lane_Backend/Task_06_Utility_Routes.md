# Task 06: Utility Routes — Parking, Transit, Crowd, Emergency

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** S (<30min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_02, Task_03, Task_04, Task_05
> **Depends On:** Task_01 (BFF Scaffold)

## Objective

Implement four lightweight utility endpoints that serve mock city service data. These are the "tool result" endpoints that Gemini function calling will consume. Each returns hardcoded but realistic Split-specific data.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `ParkingInfo`, `TransitInfo`, `CrowdInfo`, `EmergencyInfo`, `EmergencyContact` (lines 289–334, 267–283)
- `docs/architecture/ARCHITECTURE.md` — Section 5.4 (Utility Endpoints)

## Interface Contract

**This task PRODUCES:**
- `app/src/server/routes/emergency.ts` — `GET /api/emergency/:type?lang=` → `APIResponse<EmergencyInfo>`
- `app/src/server/routes/parking.ts` — `GET /api/parking/:zone` → `APIResponse<ParkingInfo>`
- `app/src/server/routes/transit.ts` — `GET /api/transit/:line` → `APIResponse<TransitInfo>`
- `app/src/server/routes/crowd.ts` — `GET /api/crowd/:area` → `APIResponse<CrowdInfo>`

## Implementation Steps

1. Create each route file with hardcoded Split-specific mock data:
   - **Parking**: zones A-D with realistic prices (zona_a: 2.50€/h, zona_b: 1.50€/h, etc.), garage names (Lora, HNK)
   - **Transit**: bus lines 2, 6, 11, 15 with real stops (Sukoišan, Žnjan, Trstenik)
   - **Crowd**: areas like "diocletians_palace", "riva", "bacvice" with crowd levels
   - **Emergency**: bura_wind, flood, earthquake with multilingual instructions (hr, en, de) and real Split emergency numbers (112, 193, 194, 195)
2. Mount all in `app/src/server/index.ts`

## Acceptance Criteria

- [ ] All four endpoints return realistic Split-specific mock data
- [ ] Emergency endpoint respects `?lang=` query param (hr, en, de)
- [ ] Parking zones match `CityZone` type values
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement real API calls to municipal systems
- Do NOT create UI for these endpoints (Frontend lane)

## Handoff

- Push to: `lane/backend/utility-routes`
- Notify: AI Lane (function calling tools will invoke these endpoints)
- Next task enabled: Task_07 (Mock Tool Implementations use these routes)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_06_Utility_Routes.md`
