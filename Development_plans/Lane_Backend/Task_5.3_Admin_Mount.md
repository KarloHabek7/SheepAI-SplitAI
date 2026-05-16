# Task 5.3: Mount Admin Router & Verify Build

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (5-10min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task 5.1, Task 5.2

## Objective

Mount the admin router in `app/src/server/index.ts` at `/api/admin` and verify `npm run build` passes.

## Required Reading

- `app/src/server/index.ts` — lines 83–84 (the TODO comment for Task 05)
- `app/src/server/routes/admin.ts` — the completed router

## Target Files

- **MODIFY:** `app/src/server/index.ts`

## Implementation Steps

1. Add import: `import adminRouter from './routes/admin.js';`
2. Replace the TODO comment on line 83 with:
   ```typescript
   // Task 05 — Admin Dashboard
   app.use('/api/admin', adminRouter);
   ```
3. Run `npm run build` and verify zero errors.

## Acceptance Criteria

- [ ] Admin router mounted at `/api/admin`
- [ ] `GET /api/admin/dashboard` is reachable
- [ ] `PATCH /api/admin/reports/:id` is reachable
- [ ] `npm run build` passes with zero errors
- [ ] No other routes affected

## Out of Scope (CRITICAL)

- Do NOT modify admin.ts
- Do NOT implement Task 06 (utility routes)
- Do NOT modify any other route files

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_5.3_Admin_Mount.md`
