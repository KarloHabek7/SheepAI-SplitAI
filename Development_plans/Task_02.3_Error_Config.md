# Task 02.3: Error Handling & Config

## Objective
Implement global error handling for AI service failures and ensure the environment configuration is ready for the real API keys.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P1
- **Estimate:** S (15 min)

## Recommended Model
Gemini 3.1 Pro High (Planning Mode: OFF)

## Required Reading
- `app/src/server/index.ts`
- `.env.example`

## Target Files
- `app/src/server/index.ts`
- `app/src/server/middleware/errorHandler.ts`
- `.env.example`

## Implementation Steps
1. Create a global error handling middleware in `app/src/server/middleware/errorHandler.ts` that catches any thrown errors and returns a 500 JSON response with a helpful message.
2. Register this middleware in `app/src/server/index.ts` (must be the last middleware).
3. Update `.env.example` to include `GEMINI_API_KEY` and any other required AI config.
4. Wrap service calls in routes with basic `try/catch` (or use an `asyncHandler` wrapper) to delegate to the global error handler.

## Acceptance Criteria
- [ ] Throwing an error in a service results in a structured JSON error response from the API.
- [ ] `.env.example` is updated.

## Out of Scope
- Implementing rate limiting or other advanced security (unless approved as a refinement).
