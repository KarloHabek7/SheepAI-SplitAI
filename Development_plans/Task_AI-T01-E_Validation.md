# Task AI-T01-E: Service Validation

> **Lane:** AI
> **Priority:** P2
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Verify the AI service wrapper with edge cases and mock data.

## Implementation Steps
1. Create `app/src/services/ai/geminiText.test.ts` (or a simple verification script).
2. Test empty history.
3. Test very long messages.
4. Test response parsing when citations are missing or malformed.

## Acceptance Criteria
- All tests pass or verification script runs without errors.
- Errors are handled gracefully (e.g., API timeout).
