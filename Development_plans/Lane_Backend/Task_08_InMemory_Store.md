# Task 08: In-Memory Data Store — Reports, Listings, Conversations

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** S (<30min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_02 (they can stub locally if this isn't ready yet)
> **Depends On:** Task_01 (BFF Scaffold)

## Objective

Create a centralized in-memory data store module that all route handlers and tool implementations share. This replaces a real database for the hackathon demo. It stores civic reports, Pazar listings, and chat conversations, and provides typed CRUD operations. It also pre-seeds realistic demo data for Split.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `CivicReport`, `PazarListing`, `ChatMessage` (lines 167–179, 229–238, 118–127)

## Interface Contract

**This task PRODUCES:**
- `app/src/server/store/index.ts` — barrel export
- `app/src/server/store/dataStore.ts` — singleton store with:
  - `reports: CivicReport[]` + CRUD helpers (add, getById, getAll, filter, update)
  - `listings: PazarListing[]` + CRUD helpers (add, getAll, getActive)
  - `conversations: Map<string, ChatMessage[]>` + helpers (get, append, clear)
  - `seedDemoData()` — pre-populates store with realistic Split data

**This task CONSUMES:**
- `app/src/types/index.ts` — all data types

## Implementation Steps

1. Create `app/src/server/store/dataStore.ts`:
   - Export a singleton object with typed arrays/maps
   - `addReport(report)`, `getReport(id)`, `getAllReports()`, `filterReports(filters)`, `updateReport(id, updates)`
   - `addListing(listing)`, `getAllListings()`, `getActiveListings()`
   - `getConversation(id)`, `appendMessage(convId, msg)`, `clearConversation(id)`
2. Create `seedDemoData()`:
   - **15 mock reports** across Split neighborhoods with real coordinates:
     - Varoš (43.508, 16.434), Bačvice (43.502, 16.448), Manuš (43.512, 16.440)
     - Firule (43.501, 16.453), Spinut (43.515, 16.426), Diocletian's Palace (43.508, 16.440)
     - Gripe (43.514, 16.445), Lovret (43.511, 16.432), Lučac (43.509, 16.445)
   - Vary: categories (pothole, graffiti, waste_overflow, illegal_parking, damaged_infrastructure), severities (3-9), statuses (submitted, in_progress, resolved), departments
   - **8 mock Pazar listings** with Dalmatian produce (brancin, škampi, blitva, maslinovo ulje, sir paški, rajčice, tikvice, smokve)
3. Call `seedDemoData()` on server startup in `index.ts`
4. Barrel export from `app/src/server/store/index.ts`

## Acceptance Criteria

- [ ] `dataStore` is a shared singleton importable from any server module
- [ ] `addReport()` and `getReport()` work correctly
- [ ] `filterReports({bbox: {north, south, east, west}})` correctly filters by coordinates
- [ ] `getActiveListings()` excludes expired listings
- [ ] `seedDemoData()` populates 15 reports and 8 listings with realistic Split data
- [ ] All helper functions are typed (accept/return proper types, not `any`)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement a real database (SQLite, Postgres, etc.)
- Do NOT implement data persistence across restarts — in-memory only
- Do NOT create Zustand stores (those are frontend state, this is server-side data)

## Handoff

- Push to: `lane/backend/data-store`
- Notify: All backend tasks (they import from this store)
- Next task enabled: Tasks 02–07 can now use the shared store instead of local stubs

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_08_InMemory_Store.md`
