# Task 01.2: Implementation of Mock Endpoints

## Objective
Implement the chat, report creation, and report listing endpoints with hardcoded mock responses based on the shared type contracts.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P0
- **Estimate:** M (40 min)

## Recommended Model
Gemini 3.1 Pro High (Planning Mode: OFF)

## Required Reading
- `app/src/types/index.ts`
- `docs/architecture/ARCHITECTURE.md`

## Target Files
- `app/src/server/routes/chat.ts`
- `app/src/server/routes/reports.ts`
- `app/src/server/index.ts` (to mount routes)

## Implementation Steps
1. Create `app/src/server/routes/chat.ts` with `POST /api/chat`. Return a mocked `ChatResponse` with Split-specific context (e.g., mentions of Diocletian's Palace or Marjan).
2. Create `app/src/server/routes/reports.ts`:
   - `POST /api/report`: Accept `multer` upload, return a mocked `Report` object with generated ID and status 'Pending'.
   - `GET /api/reports`: Return a static list of 3-5 mocked `Report` objects representing common city issues in Split.
3. Mount routes in the main server file created in Task 01.1.

## Acceptance Criteria
- [ ] `POST /api/chat` returns valid JSON matching `ChatResponse`.
- [ ] `POST /api/report` accepts form-data with an image and returns a `Report` object.
- [ ] `GET /api/reports` returns a list of reports matching the `Report` interface.

## Integration Points
- Consumes the Express app from Task 01.1.
- Provides endpoints for Frontend/AI lanes.

## Out of Scope
- Real image processing or AI logic.
- Persistence to a real database.
