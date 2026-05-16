# Task 3.4: Split Seed Data & Integration

> **Lane:** Backend
> **Priority:** P1
> **Estimated Effort:** S (15-20min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Finalize the report routes by mounting the router and pre-seeding the store with realistic demo data for the City of Split.

## Required Reading
- `app/src/server/index.ts` (Mounting point)
- `app/src/server/store.ts` (In-memory store location)

## Target Files
- `app/src/server/index.ts` (Modify)
- `app/src/server/store.ts` (Modify)

## Implementation Steps
1. Create a `seedReports()` function in `app/src/server/store.ts` (or a dedicated seed file).
2. Generate 10-15 `CivicReport` objects with realistic Split data:
   - Use neighborhood names: Varoš, Bačvice, Manuš, Firule, Spinut, Gripe, etc.
   - Mix categories: "Graffiti", "Pothole", "Illegal Parking", "Broken Bench".
   - Use real-ish coordinates within Split (approx Lat 43.51, Lng 16.44).
3. Import and call the seeding function in the server entry point.
4. Mount the report router:
   - `app.use('/api/report', reportRouter)` (for analyze/submit)
   - `app.use('/api/reports', reportRouter)` (for list)
5. Verify the full flow with a quick manual test (curl or simple fetch).

## Acceptance Criteria
- Server starts without errors.
- `GET /api/reports` returns the seeded data on first load.
- Endpoints are correctly mapped.

## Out of Scope
- Do NOT rewrite the router logic.
- Do NOT create a separate database migration system.
