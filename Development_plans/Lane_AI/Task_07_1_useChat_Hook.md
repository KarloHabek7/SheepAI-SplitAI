# Task 07.1: useChat Interaction Hook

> **Lane:** AI
> **Priority:** P1-High
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Depends On:** Task 06.2 (Orchestrator), Backend T02 (Chat Route)

## Objective
Implement the `useChat` hook which provides a high-level React interface for the "Split Zmaj" chat system.

## Target Files
- `app/src/hooks/ai/useChat.ts`

## Implementation Steps
1. **State Management:** Use `useState` for messages and loading states.
2. **`sendMessage`:** 
   - Call `POST /api/chat`.
   - Handle structured responses with citations.
   - Maintain conversation history locally for the UI.
3. **Suggested Prompts:** Provide the hardcoded multilingual starting questions.
4. **Error Handling:** Expose a clean `error` string to the UI.

## Acceptance Criteria
- [ ] Correctly manages message history (user + assistant).
- [ ] Tracks `isStreaming` state during API calls.
- [ ] Provides suggested prompts in 3 languages.
