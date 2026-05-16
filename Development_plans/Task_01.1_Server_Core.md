# Task 01.1: Server Core & Middleware

## Objective
Establish the Express server skeleton and configure essential middleware, including file upload handling.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P0
- **Estimate:** S (20 min)

## Recommended Model
Gemini 3.1 Pro High (Planning Mode: OFF)

## Required Reading
- `docs/architecture/ARCHITECTURE.md` (Section 4: API Catalog)

## Target Files
- `app/src/server/index.ts`
- `app/src/server/middleware.ts` (if needed for custom logic)

## Implementation Steps
1. Create `app/src/server/index.ts`.
2. Initialize Express app.
3. Configure `cors` and `express.json()`.
4. Setup `multer` storage configuration for handling image uploads (store in a local `uploads/` folder for now).
5. Add a simple health check route `GET /health`.
6. Export the app instance or start the listener on port 3001.

## Acceptance Criteria
- [ ] Server starts on port 3001.
- [ ] `GET /health` returns `{ "status": "ok" }`.
- [ ] Multer is configured and ready for integration into routes.

## Integration Points
- Provides the `app` instance for Task 01.2.

## Out of Scope
- Implementing the actual API logic (that's Task 01.2).
- Connecting to real AI services.
