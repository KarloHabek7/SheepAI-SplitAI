# Task 8.3: Wire Pazar Seed Call + Verify Build

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** S (<5min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task 8.1 (CRUD helpers), Task 8.2 (seed data)

## Objective

Import and call `seedPazarListings()` on server startup alongside the existing `seedReports()` call, then verify the full build passes.

## Required Reading

- `app/src/server/index.ts` — current import and call of `seedReports()` (lines 12, 26)
- `app/src/server/store.ts` — confirm `seedPazarListings` is exported

## Target Files

- `app/src/server/index.ts` — modify only

## Implementation Steps

1. **Update import** on line 12 of `index.ts`:
   ```typescript
   // Before:
   import { seedReports } from './store.js';
   // After:
   import { seedReports, seedPazarListings } from './store.js';
   ```

2. **Add seed call** after line 26:
   ```typescript
   seedReports();
   seedPazarListings();  // Add this line
   ```

3. **Run `npm run build`** and confirm zero errors.

4. **Optionally run `npm run dev`** briefly to confirm the console shows both seed logs:
   ```
   📦 DataStore initialized
   🌱 Seeding demo reports for Split...
   ✅ Seeded 15 reports.
   🌱 Seeding Pazar listings...
   ✅ Seeded 8 Pazar listings.
   ```

## Acceptance Criteria

- [ ] `seedPazarListings` is imported and called in `index.ts`
- [ ] `npm run build` passes with zero errors
- [ ] Server startup logs show both seed functions executing

## Out of Scope (CRITICAL)

- Do NOT modify `store.ts` (that's Task 8.1 + 8.2)
- Do NOT modify any route files
- Do NOT add new routes

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_8.3_Wire_Seed_Verify.md`
