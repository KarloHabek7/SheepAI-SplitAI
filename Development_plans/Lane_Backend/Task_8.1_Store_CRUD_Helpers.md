# Task 8.1: Add Missing CRUD Helpers to DataStore

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** S (<15min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** None (existing `store.ts` is the base)
> **Can Parallelize With:** Task 8.2 (if separate agents handle different sections)

## Objective

Add four missing CRUD helper methods to the `DataStore` class in `app/src/server/store.ts` to satisfy the Task 08 acceptance criteria.

## Required Reading

- `app/src/server/store.ts` — current DataStore class (lines 8–50)
- `app/src/types/index.ts` — `CivicReport` (L168–179), `PazarListing` (L229–238), `MapBoundingBox` (L590–595), `ReportStatus` (L22–28), `IssueCategory` (L46–57), `SeverityLevel` (L31)

## Target Files

- `app/src/server/store.ts` — modify only

## Implementation Steps

1. **Import additional types** at the top of `store.ts`:
   - Add `ReportStatus`, `IssueCategory`, `SeverityLevel`, `MapBoundingBox` to the existing import from `'../types/index.js'`.

2. **Add `ReportFilters` interface** (local to this file, NOT in `types/index.ts`):
   ```typescript
   interface ReportFilters {
     bbox?: MapBoundingBox;
     status?: ReportStatus;
     category?: IssueCategory;
     severity?: SeverityLevel;
   }
   ```

3. **Add `filterReports(filters: ReportFilters)` method** to DataStore class:
   - Start with `this.reports` as the base array.
   - If `filters.bbox` is set, filter reports where `report.location` exists AND `report.location.lat` is between `bbox.south` and `bbox.north` AND `report.location.lng` is between `bbox.west` and `bbox.east`.
   - If `filters.status` is set, filter by `report.status === filters.status`.
   - If `filters.category` is set, filter by `report.classification.category === filters.category`.
   - If `filters.severity` is set, filter by `report.classification.severity >= filters.severity`.
   - Return the filtered array.

4. **Add `updateReport(id: string, updates: Partial<Pick<CivicReport, 'status' | 'assignedTo'>>)` method**:
   - Find the report by `id` in `this.reports`.
   - If not found, return `undefined`.
   - Apply each key from `updates` using `Object.assign`.
   - Set `report.updatedAt = new Date().toISOString()`.
   - Return the updated report.

5. **Add `getActiveListings()` method**:
   - Return `this.listings.filter(l => l.isActive && new Date(l.expiresAt) > new Date())`.

6. **Add `clearConversation(id: string)` method**:
   - Call `this.conversations.delete(id)`.

## Acceptance Criteria

- [ ] `filterReports({bbox: {north: 43.52, south: 43.50, east: 16.45, west: 16.42}})` returns only reports within that bounding box
- [ ] `filterReports({status: 'submitted'})` returns only submitted reports
- [ ] `updateReport(id, {status: 'resolved'})` updates the report and sets `updatedAt`
- [ ] `getActiveListings()` excludes expired listings
- [ ] `clearConversation(id)` removes the conversation from the map
- [ ] All methods are fully typed (no `any`)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT change existing method signatures
- Do NOT restructure into `store/` directory
- Do NOT modify seed data (that's Task 8.2)
- Do NOT touch `index.ts` or any route files

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_8.1_Store_CRUD_Helpers.md`
