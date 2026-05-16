# Task 05: 3D Isometric Map Page (Mapbox)

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T02, Frontend T03, Backend T02
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build the full-screen 3D isometric map of Split using Mapbox GL JS. This is the **app's home screen** (`/` route) and visual centerpiece. Initialize the map with a grayscale civic-dashboard style, 3D building extrusions, fixed isometric camera (pitch 60°, bearing -35°), and issue markers from GeoJSON data. Include clustering, status-colored markers, click/hover handlers, filters, and all map UI overlays (detail panel, legend, location button, report FAB).

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — ALL types in sections 13–15: `MapCameraConfig`, `SPLIT_MAP_DEFAULTS`, `SPLIT_MAP_BOUNDS`, `IssueGeoJSONFeature`, `IssueGeoJSONCollection`, `IssueFeatureProperties`, `MapMarkerStatus`, `MAP_MARKER_COLORS`, `MapFilters`, `MapBoundingBox`, `MapStoreState`, `UseMapboxMapReturn`, `UseIssueGeoJsonReturn`, `UseMapFiltersReturn`, `UseUserLocationReturn`
- `docs/architecture/ARCHITECTURE.md` — Section 15 (3D Isometric Map Architecture): 15.3 (Config), 15.4 (Layers), 15.5 (Data Flow), 15.6 (Components), 15.7 (Hooks), 15.8 (Style), 15.9 (Mobile vs Desktop), 15.10 (Performance)

**Key types you'll use:**
```typescript
export const SPLIT_MAP_DEFAULTS: MapCameraConfig = {
  center: [16.4402, 43.5081],
  zoom: 13,
  pitch: 60,
  bearing: -35,
};

export const MAP_MARKER_COLORS: Record<MapMarkerStatus, string> = {
  open: '#ff2d2d',
  in_progress: '#ffb000',
  resolved: '#16c784',
};

export interface IssueFeatureProperties {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: MapMarkerStatus;
  severity: SeverityLevel;
  imageUrl?: string;
  createdAt: string;
  // ...
}
```

**Environment variable needed:**
- `VITE_MAPBOX_TOKEN` — Mapbox public access token (domain-restricted)

## Interface Contract
**This task PRODUCES:**
- `pages/MapPage.tsx` — Full-screen map page composing all map components
- `components/map/MapView.tsx` — Mapbox GL map container, initializes map, adds 3D buildings + issue layers
- `components/map/IssueLayer.tsx` — GeoJSON source + circle/cluster layers with status colors
- `components/map/IssueDetailPanel.tsx` — Side panel (desktop) / bottom sheet (mobile) for clicked issue
- `components/map/MapFilters.tsx` — Filter bar: status, category, severity overlaid on map
- `components/map/StatusLegend.tsx` — Small legend (red/yellow/green meanings)
- `components/map/LocationButton.tsx` — GPS "locate me" button
- `components/map/ReportPinOverlay.tsx` — Draggable pin for report location adjustment
- `hooks/useMapboxMap.ts` — Map initialization + lifecycle hook
- `hooks/useIssueGeoJson.ts` — CivicReport[] → GeoJSON transformation
- `hooks/useMapBounds.ts` — Viewport bounds tracking (debounced)
- `hooks/useMapFilters.ts` — Filter state management
- `hooks/useUserLocation.ts` — Browser/Capacitor geolocation

**This task CONSUMES:**
- `types/index.ts` — Map + GeoJSON types (sections 13-15)
- `styles/tokens.css`
- `mapbox-gl` npm package (needs to be installed)

## Implementation Steps
1. **Install Mapbox GL JS:** Add `mapbox-gl` and `@types/mapbox-gl` to `app/package.json`
2. **Create `hooks/useMapboxMap.ts`:** Initialize Mapbox map with `SPLIT_MAP_DEFAULTS`, grayscale style, disable rotation (isometric lock), return ref + instance + loaded state
3. **Create `hooks/useUserLocation.ts`:** Browser geolocation with error handling, returns location + loading + error state
4. **Create `hooks/useMapBounds.ts`:** Listen to map `moveend` events, debounce 300ms, update bounds
5. **Create `hooks/useMapFilters.ts`:** Local state for `MapFilters`, compute `activeFilterCount`
6. **Create `hooks/useIssueGeoJson.ts`:** Transform mock `CivicReport[]` → `IssueGeoJSONCollection`. Memoize with `useMemo`.
7. **Create `components/map/MapView.tsx`:** Full-screen container, calls `useMapboxMap`, adds 3D building layer (`fill-extrusion` on `building` source with grayscale color, opacity 0.55), passes map instance to children
8. **Create `components/map/IssueLayer.tsx`:** Add GeoJSON source with clustering (`clusterMaxZoom: 14`, `clusterRadius: 50`). Add layers: `issues-clusters` (gray circles), `issues-cluster-count` (white text), `issues-unclustered` (colored circles by status). Handle click on unclustered → select issue, click on cluster → zoom in.
9. **Create `components/map/IssueDetailPanel.tsx`:** Desktop: right side panel (300px). Mobile: bottom sheet (slides up). Shows: title, category icon, severity bar, description, image thumbnail, status badge, department, created date, "Resolve" action button.
10. **Create `components/map/MapFilters.tsx`:** Horizontal filter bar overlaid on map top. Dropdowns/chips for status, category, severity. Show active filter count badge.
11. **Create `components/map/StatusLegend.tsx`:** Small fixed legend (bottom-right on desktop) showing colored dots with labels.
12. **Create `components/map/LocationButton.tsx`:** GPS button (bottom-left), calls `useUserLocation`, flies map to user location.
13. **Create `components/map/ReportPinOverlay.tsx`:** When report mode active, show draggable pin at map center. User adjusts position before confirming report location.
14. **Create `pages/MapPage.tsx`:** Compose all above. Full-screen (no PageContainer padding). FAB button (bottom-right) to start new report.
15. **Generate mock GeoJSON data:** 15-20 mock issues scattered across Split with various categories, severities, and statuses.
16. **Apply grayscale map style:** Programmatically desaturate the Mapbox style layers (roads, water, land) to monochrome. Issue markers should be the ONLY vibrant colors.

## Acceptance Criteria
- [ ] Map loads full-screen at `/` route with 3D isometric view of Split
- [ ] 3D building extrusions visible with subtle gray styling
- [ ] Mock issue markers appear with correct status colors (red/yellow/green)
- [ ] Clustering works — zooming out groups nearby markers into numbered clusters
- [ ] Clicking a marker opens IssueDetailPanel
- [ ] IssueDetailPanel shows as side panel on desktop, bottom sheet on mobile
- [ ] Filters work — changing status/category filters the visible markers
- [ ] StatusLegend visible
- [ ] LocationButton triggers geolocation and flies to user position
- [ ] Map rotation is disabled (isometric lock)
- [ ] Report FAB button is visible
- [ ] Map is fully responsive
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real API calls for fetching reports (use mock GeoJSON)
- Do NOT create the `useMapStore` Zustand store (Backend lane)
- Do NOT implement real-time report pin appearing after submission (integration checkpoint)
- Do NOT modify files outside `components/map/`, `hooks/`, `pages/MapPage.tsx`

## Handoff
- Push to: `lane/frontend/map-page`
- Notify: Backend lane (needs bbox filter on GET /api/reports), All lanes (home screen is ready)
- Next task enabled: Integration at CP2

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_05_MapPage.md`
