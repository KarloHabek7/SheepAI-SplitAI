# Task 6.5: Mount Utility Routes

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** XS (<5min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task 6.1, 6.2, 6.3, 6.4

## Objective

Import and mount all four utility routers in the main server entry point. Verify the build passes.

## Required Reading

- `app/src/server/index.ts` — Current route mounts (lines 69–82)
- The four route files created by Tasks 6.1–6.4

## Target Files

- **MODIFY:** `app/src/server/index.ts`

## Implementation Steps

1. Add imports at the top of the file (after existing route imports):
   ```typescript
   import parkingRouter from './routes/parking.js';
   import transitRouter from './routes/transit.js';
   import crowdRouter from './routes/crowd.js';
   import emergencyRouter from './routes/emergency.js';
   ```
2. Mount the routers in the Route Handlers section, replacing the TODO comment on line 82:
   ```typescript
   // Task 06 — Utility Routes
   app.use('/api/parking', parkingRouter);
   app.use('/api/transit', transitRouter);
   app.use('/api/crowd', crowdRouter);
   app.use('/api/emergency', emergencyRouter);
   ```
3. Run `npm run build` and verify zero errors

## Acceptance Criteria

- [ ] All four routers imported and mounted at correct paths
- [ ] `npm run build` passes with zero errors
- [ ] Existing routes (chat, report, admin) remain unchanged
- [ ] TODO comment for Task 06 is removed/replaced

## Out of Scope (CRITICAL)

- Do NOT modify any route files — only `server/index.ts`
- Do NOT change existing route mounts
- Do NOT add middleware to these routes

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_6.5_Mount_Utility_Routes.md`
