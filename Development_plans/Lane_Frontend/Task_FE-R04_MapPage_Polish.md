# Task FE-R04: Map Page Polish

> **Lane:** Frontend
> **Priority:** P1-Important (visual centerpiece)
> **Estimated Effort:** S (15 min)
> **Type:** 🤝 Interactive (Aura components for overlays)
> **Planning Mode:** OFF
> **Depends On:** FE-R00 (for useNavigate fix), FE-R01

## Objective

Polish the map page overlays — the issue detail panel, filter chips, status legend, and FAB button. The Mapbox 3D map itself works; this is about the UI elements floating on top of it.

## Required Reading

- `app/src/pages/MapPage.tsx` — Current implementation
- `app/src/components/map/` — All map sub-components
- `app/src/components/map/IssueDetailPanel.tsx` + CSS — Slide-out detail panel
- `app/src/components/map/MapFilters.tsx` + CSS — Filter bar

## Target Files

### Modify:
- `app/src/components/map/IssueDetailPanel.tsx` + `IssueDetailPanel.css`
- `app/src/components/map/MapFilters.tsx` + `MapFilters.css`
- `app/src/components/map/StatusLegend.tsx` + `StatusLegend.css`
- `app/src/components/map/LocationButton.tsx` + `LocationButton.css`
- `app/src/components/map/ReportPinOverlay.tsx` + `ReportPinOverlay.css`
- `app/src/pages/MapPage.tsx` + `MapPage.css`

## Interactive Workflow

⏸️ **PAUSE — User browses aura.build for:**
1. **Floating card/panel** — for the issue detail side panel (slide-in from bottom on mobile)
2. **Filter chips/pills bar** — horizontal scrollable filter chips
3. **FAB button** — floating action button with icon + label
4. **Legend/key** — small legend card for status colors

Paste HTML → Agent converts.

## Key UX Requirements

- **Issue detail panel** slides in from bottom (mobile) or right (desktop) with glassmorphism
- **Filter chips** should be horizontally scrollable with active state
- **FAB button** should use `useNavigate('/report')` — already fixed in FE-R00
- **Status legend** should be a small semi-transparent card in a corner
- All overlays should use `backdrop-filter: blur()` for premium feel

## Acceptance Criteria

- [ ] Issue detail panel has smooth slide-in/out animation
- [ ] Filter chips are scrollable and have active states
- [ ] Status legend is unobtrusive but readable
- [ ] FAB uses React Router navigation
- [ ] All overlays have glassmorphism or elevated card styling
- [ ] `npm run build` passes

## Out of Scope

- Do NOT modify the Mapbox map initialization or 3D buildings setup
- Do NOT change the IssueLayer (GeoJSON rendering logic)
- Do NOT modify the useMapboxMap hook
