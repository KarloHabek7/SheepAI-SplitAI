# Task INT-03: Wire Admin Pages to Backend

> **Priority:** P1
> **Lane:** Flex (Lane 5) — cross-lane integration
> **Time estimate:** S (10 min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective

Replace mock data in `AdminDashboardPage.tsx` and `AdminReportsPage.tsx` with real API calls via `useAdminStore`.

## Required Reading

- `app/src/pages/AdminDashboardPage.tsx` — uses `mockReports` + `getDashboardStats()`
- `app/src/pages/AdminReportsPage.tsx` — uses `mockReports`
- `app/src/stores/useAdminStore.ts` — store with `fetchDashboard()`, `fetchReports()`, `updateReportStatus()`
- `app/src/services/adminService.ts` — calls `/api/admin/dashboard`, `/api/admin/reports`, PATCH `/api/admin/reports/:id`
- `app/src/utils/mockAdminData.ts` — the mock data being replaced

## Target Files

- **[MODIFY]** `app/src/pages/AdminDashboardPage.tsx`
- **[MODIFY]** `app/src/pages/AdminReportsPage.tsx`

## Implementation Steps — AdminDashboardPage

1. Import `useAdminStore` from `@/stores/useAdminStore`
2. Destructure: `{ dashboardData, reports, isLoading, fetchDashboard, fetchReports, updateReportStatus }`
3. Add `useEffect(() => { fetchDashboard(); fetchReports(); }, [])` on mount
4. Replace `mockReports` state with `store.reports`
5. Replace `getDashboardStats(reports)` with `store.dashboardData` directly
6. For metrics: use `dashboardData.totalReports`, `dashboardData.openReports`, etc.
7. For charts: use `dashboardData.reportsBySeverity` and `dashboardData.reportsByCategory`
8. For table: use `reports` from store
9. For status change: call `store.updateReportStatus(id, status)`
10. Show loading spinner while `isLoading` is true
11. Remove imports from `@/utils/mockAdminData`

## Implementation Steps — AdminReportsPage

1. Import `useAdminStore` from `@/stores/useAdminStore`
2. Destructure: `{ reports, isLoading, fetchReports, updateReportStatus }`
3. Add `useEffect(() => { fetchReports(); }, [])` on mount
4. Replace local `useState(mockReports)` with `store.reports`
5. Keep the local filter state (`filterStatus`, `filterCategory`, `searchTerm`) — they filter `store.reports`
6. For status change: call `store.updateReportStatus(id, status)`
7. Remove imports from `@/utils/mockAdminData`

## Important Notes

- The admin dashboard endpoint (`GET /api/admin/dashboard`) returns `AdminDashboardData` which has `totalReports`, `openReports`, `resolvedToday`, `averageResolutionHours`, `reportsByCategory`, `reportsBySeverity`, etc.
- If `dashboardData` is `null` (still loading), show a loading state or use fallback zeros
- The `SeverityChart` and `CategoryBreakdown` components expect the same data shape that `AdminDashboardData` provides

## Acceptance Criteria

- [ ] Admin dashboard loads metrics from `/api/admin/dashboard`
- [ ] Report table shows data from `/api/reports`
- [ ] Status change calls PATCH `/api/admin/reports/:id`
- [ ] Loading states shown while fetching
- [ ] `npm run build` passes with zero errors
- [ ] No imports from `mockAdminData` remain in either file

## Out of Scope (CRITICAL)

- Do NOT modify `useAdminStore.ts`, `adminService.ts`, or `reportService.ts`
- Do NOT change admin components (`DashboardMetric`, `SeverityChart`, `CategoryBreakdown`, `ReportTable`, `AdminTabs`)
- Do NOT change CSS
- Do NOT touch any other page files
