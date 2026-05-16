# Task INT-05: Wire Map GeoJSON to Backend

> **Priority:** P1
> **Lane:** Flex (Lane 5) — cross-lane integration
> **Time estimate:** S (5 min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective

Replace hardcoded `MOCK_ISSUES` in `useIssueGeoJson.ts` with real data from `/api/reports`. The MapPage will then show actual reports from the backend.

## Required Reading

- `app/src/hooks/useIssueGeoJson.ts` — currently returns static `MOCK_ISSUES` array
- `app/src/services/reportService.ts` — `getReports()` calls `GET /api/reports`
- `app/src/types/index.ts` — `IssueGeoJSONFeature`, `IssueGeoJSONCollection`, `CivicReport`, `REPORT_TO_MAP_STATUS`
- `app/src/pages/MapPage.tsx` — consumes `useIssueGeoJson()` (NO changes needed to this file)

## Target Files

- **[MODIFY]** `app/src/hooks/useIssueGeoJson.ts`

## Implementation Steps

1. Import `useState`, `useEffect`, `useCallback` from React
2. Import `getReports` from `@/services/reportService`
3. Import `REPORT_TO_MAP_STATUS` from `@/types`
4. Remove the `MOCK_ISSUES` constant entirely
5. In the hook:
   - Add `useState` for `geoJson` (initialized as empty FeatureCollection)
   - Add `useState` for `isLoading`
   - Add a `fetchData` function that:
     a. Calls `getReports()` (no filters, gets all reports)
     b. Maps each `CivicReport` to `IssueGeoJSONFeature`:
        ```ts
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [report.location?.lng || 16.44, report.location?.lat || 43.51] },
          properties: {
            id: report.id,
            title: report.classification.category,
            description: report.classification.description,
            category: report.classification.category,
            status: REPORT_TO_MAP_STATUS[report.status] || 'open',
            severity: report.classification.severity,
            imageUrl: report.imageUrl,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
            department: report.classification.department,
            zone: report.classification.zone,
          }
        }
        ```
     c. Sets `geoJson` with the transformed FeatureCollection
   - Call `fetchData()` in `useEffect` on mount
   - Expose `refresh` as `fetchData` wrapped in `useCallback`
6. Return `{ geoJson, isLoading, refresh }` — same interface, no changes to MapPage needed

## Key Code Pattern

```tsx
export const useIssueGeoJson = () => {
  const [geoJson, setGeoJson] = useState<IssueGeoJSONCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getReports();
      if (response.success && response.data) {
        const features: IssueGeoJSONFeature[] = response.data
          .filter(r => r.location) // skip reports without location
          .map(report => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [report.location!.lng, report.location!.lat] },
            properties: { /* ... mapping above ... */ }
          }));
        setGeoJson({ type: 'FeatureCollection', features });
      }
    } catch (err) {
      console.error('[useIssueGeoJson] Fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { geoJson, isLoading, refresh };
};
```

## Acceptance Criteria

- [ ] Map page shows markers from `/api/reports` data (instead of 5 hardcoded pins)
- [ ] Reports without `location` are skipped (no crash)
- [ ] `isLoading` state is functional
- [ ] `refresh()` re-fetches data
- [ ] `npm run build` passes with zero errors
- [ ] `MOCK_ISSUES` constant is completely removed

## Out of Scope (CRITICAL)

- Do NOT modify `MapPage.tsx` or any map components
- Do NOT modify `reportService.ts` or any backend files
- Do NOT change the return type interface
