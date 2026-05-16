# Task 5.1: Dashboard Stats Endpoint

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (15-20min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task_01 (BFF Scaffold), Task_03 (Report Routes — seed data in store)

## Objective

Create `app/src/server/routes/admin.ts` and implement `GET /dashboard` that computes aggregate statistics from all reports in the in-memory store, returning `APIResponse<AdminDashboardData>`.

## Required Reading

- `app/src/types/index.ts` — lines 340–359 (`AdminDashboardData`, `DashboardHotspot`)
- `app/src/types/index.ts` — lines 22–28 (`ReportStatus`), 46–57 (`IssueCategory`), 34–43 (`Department`)
- `app/src/server/store.ts` — `store.getAllReports()`
- `app/src/server/routes/report.ts` — for coding pattern reference (Router setup, APIResponse wrapping, try/catch)

## Target Files

- **CREATE:** `app/src/server/routes/admin.ts`

## Implementation Steps

1. Create `app/src/server/routes/admin.ts` with Express Router.
2. Import types: `AdminDashboardData`, `DashboardHotspot`, `CivicReport`, `APIResponse`, `IssueCategory`, `Department`, `ReportStatus`.
3. Import `store` from `../store.js`.
4. Implement `GET /dashboard`:
   - Get all reports from store.
   - Compute `totalReports` = reports.length.
   - Compute `openReports` = count where status is `analyzing`, `classified`, `submitted`, or `in_progress`.
   - Compute `resolvedToday` = count where status is `resolved` AND `updatedAt` is today (same calendar date).
   - Compute `averageResolutionHours` = for resolved reports, average of `(updatedAt - createdAt)` in hours. Default to 0 if none.
   - Compute `reportsByCategory` = Record with counts per `IssueCategory`. Initialize all categories to 0 first.
   - Compute `reportsBySeverity` = Record with string keys `"1"` through `"10"`, counts per severity.
   - Compute `reportsByDepartment` = Record with counts per `Department`. Initialize all departments to 0 first.
   - Compute `recentReports` = last 10 reports sorted by `createdAt` descending.
   - Compute `hotspots` = group reports by rounded location (0.005 precision), pick top 5 clusters by count. For each: location = average of group, reportCount, dominantCategory (mode), averageSeverity.
   - Wrap in `APIResponse<AdminDashboardData>` and respond.
5. Export the router as default.

## Acceptance Criteria

- [ ] `GET /dashboard` returns complete `AdminDashboardData` with all fields populated
- [ ] All IssueCategory keys present in `reportsByCategory` (even if 0)
- [ ] All Department keys present in `reportsByDepartment` (even if 0)
- [ ] `recentReports` is sorted descending by `createdAt`, max 10
- [ ] Hotspots computed from reports with locations
- [ ] Response wrapped in `APIResponse<T>`
- [ ] Standard try/catch error handling with `{ success: false, error: {...} }`

## Integration Points

- **Consumes:** `store.getAllReports()` (populated by Task_03 seed data)
- **Produces:** `GET /api/admin/dashboard` endpoint (mounted in Task 5.3)

## Out of Scope (CRITICAL)

- Do NOT implement authentication/authorization
- Do NOT create the PATCH endpoint (that's Task 5.2)
- Do NOT mount the router in `index.ts` (that's Task 5.3)
- Do NOT modify `store.ts`
- Do NOT create admin UI components

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_5.1_Dashboard_Stats.md`
