# Task FE-R05: Pazar Pages Overhaul

> **Lane:** Frontend
> **Priority:** P1-Important
> **Estimated Effort:** M (20 min)
> **Type:** 🤝 Interactive (Aura components)
> **Planning Mode:** OFF
> **Depends On:** FE-R01

## Objective

Redesign the Pazar market feed and vendor upload pages. The Pazar feed is a unique differentiator — showing live market prices from Split's central fish/produce market.

## Required Reading

- `app/src/pages/PazarFeedPage.tsx` — Feed page
- `app/src/pages/PazarSubmitPage.tsx` — Vendor upload page
- `app/src/components/pazar/` — ProductCard, PazarGrid, FreshnessIndicator, VendorUpload
- `app/src/types/index.ts` — `PazarListing`, `PazarItem`, `PazarListingClassification`

## Target Files

### Modify:
- `app/src/pages/PazarFeedPage.tsx` + `PazarFeedPage.css`
- `app/src/pages/PazarSubmitPage.tsx` + `PazarSubmitPage.css`
- `app/src/components/pazar/ProductCard.tsx` + `ProductCard.css`
- `app/src/components/pazar/PazarGrid.tsx` + `PazarGrid.css`
- `app/src/components/pazar/FreshnessIndicator.tsx` + `FreshnessIndicator.css`
- `app/src/components/pazar/VendorUpload.tsx` + `VendorUpload.css`

## Interactive Workflow

⏸️ **PAUSE — User browses aura.build for:**
1. **Product/marketplace card** — for individual vendor listings with items, prices
2. **Hero section** — for the Pazar feed page header
3. **Grid layout with filters** — if available
4. **Form / upload component** — for the vendor submit page

Paste HTML → Agent converts.

## Key UX Requirements

- **Product cards** should show: vendor name, freshness badge (morning/midday/afternoon with colors), item list with prices, time-until-expiry
- **Freshness indicator** should use green (morning), yellow (midday), orange (afternoon) with pulse animation for "fresh"
- **Hero section** should have a market/food theme
- **Vendor upload** should have a clean form with photo upload zone

## Acceptance Criteria

- [ ] Product cards are visually appealing with freshness badges
- [ ] Grid is responsive (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Vendor submit page has a clear upload → classify → publish flow
- [ ] All prices formatted with € and unit
- [ ] `npm run build` passes

## Out of Scope

- Do NOT connect to real Pazar API
- Do NOT add filtering logic (just visual filter UI)
- Do NOT modify types
