# Task 04: Pazar Routes — Analyze + Submit + Feed Endpoints

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_02, Task_03, Task_05, Task_06
> **Depends On:** Task_01 (BFF Scaffold), Task_08 (In-Memory Store — can stub if not ready)

## Objective

Implement the three Pazar market endpoints. `POST /api/pazar/analyze` receives a vendor stall photo (base64) and returns mock produce classification. `POST /api/pazar/submit` creates a listing. `GET /api/pazar/feed` returns active listings. Listings auto-expire after 4 hours.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `PazarItem`, `PazarListing`, `PazarListingClassification`, `PazarAnalyzeRequest/Response`, `PazarSubmitRequest/Response` (lines 211–261)
- `docs/architecture/ARCHITECTURE.md` — Section 4.3 (Pazar Feed Flow), Section 5.3 (Pazar Endpoints)

**Key types you'll use:**
```typescript
export interface PazarAnalyzeRequest {
  image: string; // base64
}

export interface PazarAnalyzeResponse {
  classification: PazarListingClassification;
}

export interface PazarSubmitRequest {
  classification: PazarListingClassification;
  vendor: string;
  imageUrl?: string;
}

export interface PazarSubmitResponse {
  listingId: string;
  expiresAt: string;
}

export interface PazarListing {
  id: string;
  vendor: string;
  items: PazarItem[];
  imageUrl?: string;
  freshness: 'morning' | 'midday' | 'afternoon';
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}
```

## Interface Contract

**This task PRODUCES:**
- `app/src/server/routes/pazar.ts` — Express Router with:
  - `POST /api/pazar/analyze` — mock Pazar classification
  - `POST /api/pazar/submit` — create listing with 4-hour expiry
  - `GET /api/pazar/feed` — return active listings, query `?active=true`

**This task CONSUMES:**
- `app/src/server/index.ts` — mount point
- In-memory store for listings

## Implementation Steps

1. Create `app/src/server/routes/pazar.ts`:
   - `POST /analyze`:
     - Return mock `PazarListingClassification` with realistic Dalmatian produce: brancin (sea bass), škampi, blitva, rajčice, maslinovo ulje, sir, etc.
     - Vary `freshness` based on current hour (before 10 = morning, 10-14 = midday, after 14 = afternoon)
   - `POST /submit`:
     - Create `PazarListing` from request
     - Generate `listingId` (format: `PZ-XXXX`)
     - Set `expiresAt` to 4 hours from now
     - Set `isActive: true`
     - Store in listings array
     - Return `APIResponse<PazarSubmitResponse>`
   - `GET /feed`:
     - Filter listings: mark expired ones as `isActive: false`
     - If `?active=true`, return only active listings
     - Sort by `createdAt` descending (freshest first)
     - Return `APIResponse<PazarListing[]>`
2. Pre-seed with **5-8 realistic Pazar listings** from typical Split market vendors
3. Mount in `app/src/server/index.ts` at `/api/pazar`

## Acceptance Criteria

- [ ] `POST /api/pazar/analyze` returns a mock classification with realistic produce items and prices in EUR
- [ ] `POST /api/pazar/submit` creates a listing with a 4-hour expiry window
- [ ] `GET /api/pazar/feed?active=true` returns only non-expired listings sorted by freshest
- [ ] Expired listings are marked `isActive: false` on each feed request
- [ ] Pre-seeded with 5-8 realistic listings
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement real Gemini Vision analysis — mock only
- Do NOT create Pazar UI components (that's Frontend)
- Do NOT implement real image storage (just mock URLs)

## Handoff

- Push to: `lane/backend/pazar-routes`
- Notify: Frontend (Pazar Feed page can now fetch data)
- Next task enabled: Frontend Pazar pages

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Backend/Task_04_Pazar_Routes.md`
