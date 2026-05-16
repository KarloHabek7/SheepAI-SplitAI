# Task 5.2: Report PATCH Endpoint

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (10-15min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task 5.1 (admin.ts file must exist)

## Objective

Add `PATCH /reports/:id` to the admin router in `app/src/server/routes/admin.ts`. This endpoint allows updating a report's status and/or assignment. Also add a `getReportById` helper to `store.ts` if it doesn't already exist.

## Required Reading

- `app/src/types/index.ts` — lines 168–179 (`CivicReport`), 22–28 (`ReportStatus`)
- `app/src/server/routes/admin.ts` — the file created by Task 5.1 (read it first to understand the existing scaffold)
- `app/src/server/store.ts` — check if `getReportById` already exists

## Target Files

- **MODIFY:** `app/src/server/routes/admin.ts` — add PATCH endpoint
- **MODIFY:** `app/src/server/store.ts` — add `getReportById(id: string)` helper (if missing)

## Implementation Steps

1. **Store helper** (if not present in `store.ts`):
   - Add `getReportById(id: string): CivicReport | undefined` to the `DataStore` class.
   - Implementation: `return this.reports.find(r => r.id === id);`

2. **PATCH /reports/:id** in `admin.ts`:
   - Accept body with optional fields: `status?: ReportStatus`, `assignedTo?: string`.
   - Find the report using `store.getReportById(id)` or fallback to `store.getAllReports().find(...)`.
   - If not found, return 404: `{ success: false, error: { code: 'NOT_FOUND', message: 'Report not found' } }`.
   - If found, update the fields:
     - If `status` provided, set `report.status = status`.
     - If `assignedTo` provided, set `report.assignedTo = assignedTo`.
     - Always set `report.updatedAt = new Date().toISOString()`.
   - Return `APIResponse<CivicReport>` with the updated report.
   - Wrap in try/catch with standard error handling.

## Acceptance Criteria

- [ ] `PATCH /reports/:id` updates status and/or assignedTo
- [ ] 404 response for non-existent report ID
- [ ] `updatedAt` is refreshed on every PATCH
- [ ] Response wrapped in `APIResponse<CivicReport>`
- [ ] `getReportById` helper added to store (if missing)
- [ ] Existing GET /dashboard endpoint NOT modified

## Integration Points

- **Consumes:** `store.reports[]` (populated by Task_03)
- **Produces:** `PATCH /api/admin/reports/:id` endpoint (mounted in Task 5.3)

## Out of Scope (CRITICAL)

- Do NOT implement authentication/authorization
- Do NOT modify the GET /dashboard endpoint (Task 5.1)
- Do NOT mount the router in `index.ts` (that's Task 5.3)
- Do NOT create admin UI components

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_5.2_Report_Patch.md`
