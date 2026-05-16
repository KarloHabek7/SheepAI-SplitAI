# Task FE-R06: Admin Dashboard Polish

> **Lane:** Frontend
> **Priority:** P1-Important
> **Estimated Effort:** M (20 min)
> **Type:** 🤝 Interactive (Aura components)
> **Planning Mode:** OFF
> **Depends On:** FE-R01

## Objective

Polish the admin dashboard with premium metric cards, better table styling, and visual charts. The admin view proves B2G value — the city can actually USE this system.

## Required Reading

- `app/src/pages/AdminDashboardPage.tsx` — Dashboard page
- `app/src/pages/AdminReportsPage.tsx` — Reports list page
- `app/src/components/admin/` — DashboardMetric, SeverityChart, CategoryBreakdown, ReportTable, SeverityBadge
- `app/src/utils/mockAdminData.ts` — Mock data

## Target Files

### Modify:
- `app/src/pages/AdminDashboardPage.tsx` + `AdminDashboardPage.css`
- `app/src/pages/AdminReportsPage.tsx` + `AdminReportsPage.css`
- `app/src/components/admin/DashboardMetric.tsx` + `DashboardMetric.css`
- `app/src/components/admin/SeverityChart.tsx` + `SeverityChart.css`
- `app/src/components/admin/CategoryBreakdown.tsx` + `CategoryBreakdown.css`
- `app/src/components/admin/ReportTable.tsx` + `ReportTable.css`
- `app/src/components/admin/SeverityBadge.tsx` + `SeverityBadge.css`

## Interactive Workflow

⏸️ **PAUSE — User browses aura.build for:**
1. **Dashboard metrics card** — stat number, label, trend indicator, icon
2. **Data table** — with status badges, sortable headers, row actions
3. **Chart/analytics card** — bar chart or donut for severity/category breakdown
4. **Admin navigation** — sidebar or tab bar for admin section

Paste HTML → Agent converts.

## Key UX Requirements

- **Metric cards** should have subtle gradient or glow, trend arrow (up=green, down=red)
- **Report table** should have status badges with color coding, hover row highlight
- **Charts** can be CSS-only (bar chart with div heights) — no chart library needed
- **Admin nav** should have clear separation from the public app nav

## Acceptance Criteria

- [ ] Metric cards show: value, label, icon, optional trend
- [ ] Report table has status badges and row actions (status change dropdown)
- [ ] Charts visualize severity and category distribution
- [ ] Admin page accessible from Header desktop nav
- [ ] Responsive layout
- [ ] `npm run build` passes

## Out of Scope

- Do NOT add chart libraries (keep CSS-only charts)
- Do NOT implement real data fetching
- Do NOT add authentication/authorization
