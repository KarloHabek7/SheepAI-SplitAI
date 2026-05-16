# Task 02.2: Route-to-Service Wiring

## Objective
Update the existing Express routes to consume the newly created AI services, removing the inline mock data from the controllers.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P0
- **Estimate:** S (20 min)

## Recommended Model
Gemini 3.1 Pro High (Planning Mode: OFF)

## Required Reading
- `app/src/server/routes/chat.ts`
- `app/src/server/routes/reports.ts`
- `app/src/services/ai/chatService.ts`
- `app/src/services/ai/visionService.ts`

## Target Files
- `app/src/server/routes/chat.ts`
- `app/src/server/routes/reports.ts`

## Implementation Steps
1. Import `ChatService` and `VisionService` into their respective route files.
2. In `POST /api/chat`, call `chatService.generateResponse()` and return the result.
3. In `POST /api/report`, pass the uploaded file buffer to `visionService.classifyIssue()` and return the result.
4. Ensure all responses follow the `APIResponse<T>` wrapper format if not already implemented.

## Acceptance Criteria
- [ ] Routes correctly call service methods.
- [ ] API responses are still valid and match TypeScript interfaces.
- [ ] No hardcoded JSON data remains in the route files.

## Integration Points
- Consumes services from Task 02.1.

## Out of Scope
- Error handling logic (Task 02.3).
