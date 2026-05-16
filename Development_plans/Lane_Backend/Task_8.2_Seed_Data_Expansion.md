# Task 8.2: Expand Seed Data — 15 Reports + 8 Pazar Listings

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** S (<15min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** None (additive to existing seed data)
> **Can Parallelize With:** Task 8.1 (different section of same file)

## Objective

Expand the demo seed data in `app/src/server/store.ts` to include **15 total reports** (currently 5) across all 9 Split neighborhoods, and **8 Pazar listings** with authentic Dalmatian produce.

## Required Reading

- `app/src/server/store.ts` — existing `seedReports()` function (lines 57–155)
- `app/src/types/index.ts` — `CivicReport` (L168–179), `PazarListing` (L229–238), `PazarItem` (L213–219)
- Task_08_InMemory_Store.md — neighborhood coordinates and produce list

## Target Files

- `app/src/server/store.ts` — modify only

## Implementation Steps

### Step 1: Add 10 more reports to `seedReports()`

Add reports for the remaining neighborhoods not yet covered, plus extras for existing ones. Use these coordinates:

| Neighborhood | Lat | Lng | Currently Covered? |
|---|---|---|---|
| Varoš | 43.508 | 16.434 | ✅ (report 1) |
| Bačvice | 43.502 | 16.448 | ✅ (report 2) |
| Manuš | 43.512 | 16.440 | ✅ (report 3) |
| Spinut | 43.515 | 16.426 | ✅ (report 4) |
| Diocletian's Palace | 43.508 | 16.440 | ✅ (report 5) |
| Firule | 43.501 | 16.453 | ❌ Add |
| Gripe | 43.514 | 16.445 | ❌ Add |
| Lovret | 43.511 | 16.432 | ❌ Add |
| Lučac | 43.509 | 16.445 | ❌ Add |

**New reports to add (10 total):**
1. Firule — `pothole`, severity 5, `submitted`, promet
2. Gripe — `waste_overflow`, severity 8, `in_progress`, cistoca
3. Lovret — `illegal_parking`, severity 4, `submitted`, promet
4. Lučac — `damaged_infrastructure`, severity 6, `in_progress`, komunalni_redari
5. Varoš #2 — `vandalism`, severity 7, `submitted`, komunalni_redari
6. Bačvice #2 — `noise_complaint`, severity 3, `resolved`, komunalni_redari
7. Diocletian's Palace #2 — `illegal_construction`, severity 9, `submitted`, urbanizam
8. Spinut #2 — `abandoned_vehicle`, severity 4, `in_progress`, promet
9. Manuš #2 — `public_safety`, severity 8, `submitted`, policija
10. Firule #2 — `graffiti`, severity 3, `resolved`, komunalni_redari

Use ticket IDs `GR-2026-1006` through `GR-2026-1015`. Use varied `createdAt` timestamps (1h ago to 72h ago). Use realistic Unsplash image URLs or empty strings. Use real Split street names for addresses.

### Step 2: Create `seedPazarListings()` function

Add a new exported function `seedPazarListings()` below `seedReports()`:

```typescript
export const seedPazarListings = () => {
  console.log('🌱 Seeding Pazar listings...');
  const now = Date.now();
  const FOUR_HOURS = 4 * 60 * 60 * 1000;
  const currentHour = new Date().getHours();
  const freshness = currentHour < 10 ? 'morning' : currentHour < 14 ? 'midday' : 'afternoon';
  // ... create 8 listings
};
```

**8 listings with Dalmatian produce:**

| # | Vendor | Item Name | Category | Price | Unit |
|---|---|---|---|---|---|
| 1 | Ribarna Matejuška | Brancin | fish | 18 | €/kg |
| 2 | Ribarna Matejuška | Škampi | fish | 25 | €/kg |
| 3 | OPG Kaštela | Blitva | vegetable | 2.5 | €/bunch |
| 4 | Uljara Brač | Maslinovo ulje | olive_oil | 12 | €/L |
| 5 | Mljekara Pag | Sir paški | cheese | 30 | €/kg |
| 6 | OPG Solin | Rajčice | vegetable | 3 | €/kg |
| 7 | OPG Kaštela | Tikvice | vegetable | 2 | €/kg |
| 8 | Voćarna Split | Smokve | fruit | 8 | €/kg |

- Set `isActive: true` for all
- Set `expiresAt` to 4 hours from `now`
- Set `freshness` dynamically based on current hour
- Use `uuidv4()` for IDs
- Set `createdAt` to current ISO string

### Step 3: Export the new function

Ensure `seedPazarListings` is exported (it's a standalone exported function).

## Acceptance Criteria

- [ ] `seedReports()` populates exactly 15 reports
- [ ] All 9 neighborhoods are covered at least once
- [ ] Categories, severities, statuses, and departments are varied
- [ ] `seedPazarListings()` populates exactly 8 listings with correct Dalmatian produce names
- [ ] All listings have `isActive: true` and `expiresAt` set to 4 hours from creation
- [ ] Freshness is dynamically set based on current hour
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT modify the DataStore class methods (that's Task 8.1)
- Do NOT modify `index.ts` (that's Task 8.3)
- Do NOT add new types to `types/index.ts`
- Do NOT remove the existing 5 reports — only ADD to them

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_8.2_Seed_Data_Expansion.md`
