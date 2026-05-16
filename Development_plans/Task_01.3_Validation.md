# Task 01.3: Build & Validation

## Objective
Finalize the backend setup by ensuring the server builds correctly and all mock endpoints are responsive.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P1
- **Estimate:** S (15 min)

## Recommended Model
Gemini 3.0 Flash (Planning Mode: OFF)

## Required Reading
- `app/package.json`

## Target Files
- `app/package.json` (add scripts if missing)
- `app/src/server/index.ts`

## Implementation Steps
1. Add a `server:dev` and `server:build` script to `app/package.json` if they don't exist (e.g., using `tsx` or `ts-node`).
2. Run the server and perform manual `curl` or `fetch` tests against each endpoint.
3. Verify that `npm run build` (or equivalent) passes without TypeScript errors in the server directory.

## Acceptance Criteria
- [ ] `npm run server:dev` starts the server without errors.
- [ ] All three endpoints respond with 200 OK and valid data.
- [ ] No lint or type errors in `app/src/server/`.

## Out of Scope
- Production deployment (this is for local dev setup).
