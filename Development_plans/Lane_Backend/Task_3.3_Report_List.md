# Task 3.3: Reports Listing & Spatial (Bbox) Filtering (`GET /`)

> **Lane:** Backend
> **Priority:** P1
> **Estimated Effort:** M (30-45min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective
Implement the reports listing endpoint with advanced filtering, including status, severity, category, and spatial bounding box (bbox) support.

## Required Reading
- `app/src/types/index.ts` (CivicReport, MapBoundingBox)
- `app/src/server/routes/report.ts` (Existing)

## Target Files
- `app/src/server/routes/report.ts` (Modify)

## Implementation Steps
1. Add `GET /` (will be mounted at `/api/reports`) to `app/src/server/routes/report.ts`.
2. Implement robust filtering logic:
   - Handle query params: `status`, `severity`, `department`, `category`, `severity_min`.
   - Implement `bbox` filtering:
     - Parse `bbox=west,south,east,north`.
     - Filter reports where `location.lng` is between west/east and `location.lat` is between south/north.
   - Combine all active filters.
3. Return `APIResponse<CivicReport[]>`.

## Acceptance Criteria
- `GET /api/reports` returns all stored reports.
- Filtering by `status` or `category` works as expected.
- `bbox` filtering correctly restricts results to the specified map area.
- Empty results return an empty array with success status.

## Out of Scope
- Do NOT implement pagination (unless requested by Frontend).
- Do NOT modify the store logic itself, just query it.
