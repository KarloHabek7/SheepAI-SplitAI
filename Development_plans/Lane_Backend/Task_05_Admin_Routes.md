# Task 05: Admin Routes — Dashboard Stats + Report Management

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_02, Task_03, Task_04, Task_06
> **Depends On:** Task_01 (BFF Scaffold), Task_03 (Report Routes — needs reports in store)

## Objective

Implement the admin dashboard endpoints. `GET /api/admin/dashboard` computes aggregate statistics from all reports in the in-memory store. `PATCH /api/admin/reports/:id` allows status updates and assignment of reports.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `AdminDashboardData`, `DashboardHotspot`, `CivicReport`, `ReportStatus` (lines 340–359)
- `docs/architecture/ARCHITECTURE.md` — Section 5.5 (Admin Endpoints)

**Key types you'll use:**
```typescript
export interface AdminDashboardData {
  totalReports: number;
  openReports: number;
  resolvedToday: number;
  averageResolutionHours: number;
  reportsByCategory: Record<IssueCategory, number>;
  reportsBySeverity: Record<string, number>;
  reportsByDepartment: Record<Department, number>;
  recentReports: CivicReport[];
  hotspots: DashboardHotspot[];
}
```

## Interface Contract

**This task PRODUCES:**
- `app/src/server/routes/admin.ts` — Express Router with:
  - `GET /api/admin/dashboard` — returns `APIResponse<AdminDashboardData>`
  - `PATCH /api/admin/reports/:id` — updates status/assignment, returns `APIResponse<CivicReport>`

**This task CONSUMES:**
- Reports from in-memory store (populated by Task_03)

## Implementation Steps

1. Create `app/src/server/routes/admin.ts`
2. `GET /dashboard`: compute all aggregate stats from reports store
3. `PATCH /reports/:id`: find report, update status/assignedTo/updatedAt, return updated report
4. Mount in `app/src/server/index.ts` at `/api/admin`

## Acceptance Criteria

- [ ] `GET /api/admin/dashboard` returns complete `AdminDashboardData`
- [ ] `PATCH /api/admin/reports/:id` updates report and returns it
- [ ] 404 for non-existent report
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement auth — pass-through for demo
- Do NOT create admin UI components (Frontend lane)

## Handoff

- Push to: `lane/backend/admin-routes`
- Notify: Frontend (Admin Dashboard can fetch live stats)
- Next task enabled: Frontend Admin Dashboard

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_05_Admin_Routes.md`
