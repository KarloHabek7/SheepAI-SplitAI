# Task INT-04: Wire Pazar Pages to Backend

> **Priority:** P1
> **Lane:** Flex (Lane 5) — cross-lane integration
> **Time estimate:** S (10 min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective

Replace mock data in `PazarFeedPage.tsx` and `PazarSubmitPage.tsx` with real API calls via `usePazarStore` and `pazarService`.

## Required Reading

- `app/src/pages/PazarFeedPage.tsx` — uses `MOCK_PAZAR_LISTINGS`
- `app/src/pages/PazarSubmitPage.tsx` — uses `console.log` + `setTimeout` for submission
- `app/src/stores/usePazarStore.ts` — store with `fetchListings()`
- `app/src/services/pazarService.ts` — `analyzeVendorPhoto()`, `submitListing()`, `getFeed()`
- `app/src/utils/mockPazarData.ts` — the mock data being replaced

## Target Files

- **[MODIFY]** `app/src/pages/PazarFeedPage.tsx`
- **[MODIFY]** `app/src/pages/PazarSubmitPage.tsx`

## Implementation Steps — PazarFeedPage

1. Import `usePazarStore` from `@/stores/usePazarStore`
2. Destructure: `{ listings, isLoading, fetchListings }`
3. Add `useEffect(() => { fetchListings(); }, [])` on mount
4. Pass `listings` to `<PazarGrid>` instead of `MOCK_PAZAR_LISTINGS`
5. Add a loading state while `isLoading` is true (simple spinner or opacity:0.5)
6. Keep the hero section and marquee images (they are decorative, use static imports)
7. Remove import of `MOCK_PAZAR_LISTINGS` from `@/utils/mockPazarData`

## Implementation Steps — PazarSubmitPage

1. Import `submitListing` from `@/services/pazarService`
2. In `handleUploadComplete`:
   - Call `submitListing({ classification, vendor: 'Market Vendor', imageUrl: '' })`
   - On success: use `response.data.listingId` and `response.data.expiresAt`
   - Set `isSubmitted = true` and `listingId` from real response
3. Remove the fake `setTimeout` and `Math.random()` ID generation
4. Keep the success state UI — just use real data

## Acceptance Criteria

- [ ] Pazar feed loads listings from `/api/pazar/feed`
- [ ] If backend has seed data, listings appear in the grid
- [ ] Vendor submit calls `/api/pazar/submit` and shows real listing ID
- [ ] `npm run build` passes with zero errors
- [ ] No imports from `mockPazarData` remain

## Out of Scope (CRITICAL)

- Do NOT modify `usePazarStore.ts`, `pazarService.ts`, or any backend files
- Do NOT change Pazar components (`PazarGrid`, `PazarCard`, `VendorUpload`)
- Do NOT change CSS
- Do NOT touch any other page files
