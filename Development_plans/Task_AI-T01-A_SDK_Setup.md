# Task AI-T01-A: Setup SDK & Env

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Install the Google Generative AI SDK and verify that the API key is correctly loaded from environment variables.

## Context Snapshot
- `.env` should contain `GEMINI_API_KEY`.
- `app/package.json` needs `@google/generative-ai`.

## Implementation Steps
1. Navigate to `app/`.
2. Run `npm install @google/generative-ai`.
3. Create a temporary test script `app/src/services/ai/test-connection.ts` to verify the API key is accessible.

## Acceptance Criteria
- `@google/generative-ai` is in `package.json`.
- Test script successfully logs "API Key Found" or equivalent.

## Out of Scope
- Implementing the actual wrapper logic.
- Creating the "Split Zmaj" prompt.
