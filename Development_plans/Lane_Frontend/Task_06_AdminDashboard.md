# Task 06: Admin Dashboard Page

> **Lane:** Frontend
> **Priority:** P1-High
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T04, Backend T04
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build the Admin Dashboard showing AI-categorized civic reports with summary metrics, severity distribution chart, department breakdown, and a sortable/filterable report table. This page demonstrates the B2G (Business-to-Government) value — komunalni redari see pre-triaged, deduplicated reports with optimized patrol suggestions. Judges weight city impact at 35%.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `AdminDashboardData`, `DashboardHotspot`, `CivicReport`, `AdminFilters`, `AdminStoreState`, `UseAdminDashboardReturn`, `IssueCategory`, `Department`, `ReportStatus`, `SeverityLevel`
- `docs/architecture/ARCHITECTURE.md` — Section 6.2 (AdminDashboardPage, AdminReportsPage)

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

export interface AdminFilters {
  status?: ReportStatus;
  severity?: SeverityLevel;
  department?: Department;
  category?: IssueCategory;
  dateRange?: { from: string; to: string };
}
```

## Interface Contract
**This task PRODUCES:**
- `pages/AdminDashboardPage.tsx` — Dashboard overview with metrics + charts
- `pages/AdminReportsPage.tsx` — Full report table with filters + status management
- `components/admin/DashboardMetric.tsx` — Single metric card (number + label + trend icon)
- `components/admin/SeverityChart.tsx` — Bar/pie chart showing severity distribution (CSS-based, no chart lib)
- `components/admin/CategoryBreakdown.tsx` — Visual breakdown of reports by category
- `components/admin/ReportTable.tsx` — Sortable, filterable table of reports with status badges
- `components/admin/SeverityBadge.tsx` — Color-coded severity badge (1-3 green, 4-6 yellow, 7-10 red)

**This task CONSUMES:**
- `types/index.ts` — Admin types
- `components/ui/` — Button, Badge, Spinner
- `styles/tokens.css`

## Implementation Steps
1. Create `components/admin/DashboardMetric.tsx` — card with large number, label, optional trend arrow (up/down with color). Glassmorphic card style.
2. Create `components/admin/SeverityBadge.tsx` — small colored badge: low (1-3, green), medium (4-6, yellow), high (7-8, orange), critical (9-10, red).
3. Create `components/admin/SeverityChart.tsx` — horizontal bar chart using pure CSS (flexbox bars). Shows severity distribution with colors.
4. Create `components/admin/CategoryBreakdown.tsx` — list or grid showing each category with count + icon. Could be a donut chart (CSS-only) or styled list.
5. Create `components/admin/ReportTable.tsx` — table with columns: ID, Category, Severity (badge), Zone, Department, Status (dropdown to change), Created, Actions (view). Sortable headers. Filter row at top.
6. Create `pages/AdminDashboardPage.tsx` — top row: 4 metric cards (Total Reports, Open, Resolved Today, Avg Resolution Time). Below: SeverityChart + CategoryBreakdown side by side. Below: RecentReports list (last 5).
7. Create `pages/AdminReportsPage.tsx` — full ReportTable with filters sidebar. Status dropdown on each row allows changing status (mock action).
8. Generate comprehensive mock data: 25-30 mock reports across all categories, severities, departments. Dashboard stats derived from mock data.
9. Style with professional admin aesthetic: clean whites, subtle borders, data-focused layout. Status badges should be the primary color accents.

## Acceptance Criteria
- [ ] Dashboard page shows 4 metric cards with mock stats
- [ ] Severity chart renders correctly with color-coded bars
- [ ] Category breakdown shows report counts per category
- [ ] Reports page shows sortable table with all mock reports
- [ ] SeverityBadge shows correct color per severity level
- [ ] Status dropdown on each report row works (updates locally)
- [ ] Filter by status, category, department works on reports page
- [ ] Responsive: table scrolls horizontally on mobile, cards stack vertically
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real API calls (use mock data)
- Do NOT create Zustand stores (Backend lane)
- Do NOT use any charting library (pure CSS charts)
- Do NOT implement real status update persistence
- Do NOT modify files outside `components/admin/`, `pages/Admin*.tsx`

## Handoff
- Push to: `lane/frontend/admin-dashboard`
- Notify: Backend lane (will wire up admin API at CP2)
- Next task enabled: Integration at CP2

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_06_AdminDashboard.md`
