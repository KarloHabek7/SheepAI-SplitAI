# Task 7.2: Write Mock Tools (Report Submit, Pazar Listing)

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (15-20min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 7.1
> **Depends On:** None (store already has `addReport()` and `addListing()`)

## Objective

Create 2 tool functions that perform write operations on the in-memory store. These tools are called by the AI orchestration layer when Gemini returns a `functionCall` for report submission or pazar listing creation.

## Required Reading

- `app/src/types/index.ts` — Lines 168–179 (`CivicReport`), Lines 229–238 (`PazarListing`)
- `app/src/server/store.ts` — `addReport()` (L18–20), `addListing()` (L31–33)
- `app/src/server/routes/report.ts` — Lines 77–115 (submit endpoint pattern — ticket ID generation, report creation)

## Target Files

- `app/src/server/tools/submitReport.ts` — **CREATE**
- `app/src/server/tools/submitPazarListing.ts` — **CREATE**

## Implementation Steps

### 1. `submitReport.ts` — `submit_gradsko_oko_report`

```typescript
// Signature
export async function submitReport(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { category, severity, location, description, imageUrl }
// 1. Validate required args: category, description (others can default)
// 2. Generate ticketId: `GR-2026-${random 4 digits}`
// 3. Generate uuid for report id
// 4. Build CivicReport object:
//    - classification from args (category, severity, description)
//    - zone: default to 'zona_a' if not provided
//    - department: map from category (reuse mapping from report.ts)
//    - status: 'submitted'
//    - timestamps: now
// 5. Call store.addReport(newReport)
// 6. Return { ticketId, status: 'submitted', eta: '2-3 business days' }
```

**Import:** `import { store } from '../store.js';` and `import { v4 as uuidv4 } from 'uuid';`

### 2. `submitPazarListing.ts` — `submit_pazar_listing`

```typescript
// Signature
export async function submitPazarListing(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { vendor, items, prices, imageUrl }
// 1. Validate required args: vendor, items (array)
// 2. Generate uuid for listing id
// 3. Build PazarListing object:
//    - vendor from args
//    - items: map items/prices arrays into PazarItem[] with sensible defaults
//    - freshness: derive from current hour (< 10 = 'morning', < 14 = 'midday', else 'afternoon')
//    - createdAt: now
//    - expiresAt: now + 4 hours
//    - isActive: true
// 4. Call store.addListing(newListing)
// 5. Return { listingId, expiresAt }
```

**Import:** `import { store } from '../store.js';` and `import { v4 as uuidv4 } from 'uuid';`

## Acceptance Criteria

- [ ] Both files exist in `app/src/server/tools/`
- [ ] `submitReport({category: "pothole", description: "Big hole"})` stores a report and returns `{ ticketId, status, eta }`
- [ ] `submitPazarListing({vendor: "Ante", items: ["tomatoes"]})` stores a listing and returns `{ listingId, expiresAt }`
- [ ] Both tools validate required args and return `{ error: "..." }` if missing
- [ ] Both tools import from `../store.js` and call the correct store methods
- [ ] No Express/Router imports — these are plain async functions
- [ ] Each function has JSDoc with `@param` and `@returns`

## Out of Scope (CRITICAL)

- Do NOT modify `store.ts` (helpers already exist)
- Do NOT create Express routes or HTTP endpoints
- Do NOT create the barrel export or toolRouter (that's Task 7.3)
- Do NOT create Gemini function-call schemas (AI Lane)
