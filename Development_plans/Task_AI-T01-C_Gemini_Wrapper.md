# Task AI-T01-C: Gemini Wrapper

> **Lane:** AI
> **Priority:** P0
> **Estimated Effort:** M
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Implement the `generateChatReply` function in `app/src/services/ai/geminiText.ts`.

## Context Snapshot
- `app/src/services/ai/prompts.ts` (Task AI-T01-B).
- `app/src/types/index.ts` for `ChatResponse` and `ChatMessage`.

## Interface Contract
```typescript
export async function generateChatReply(
  message: string, 
  history: ChatMessage[], 
  contextFiles?: string[]
): Promise<ChatResponse>
```

## Implementation Steps
1. Create `app/src/services/ai/geminiText.ts`.
2. Initialize the Gemini Pro model.
3. Convert `history` into the format required by the SDK.
4. Send the user `message` + `SYSTEM_PROMPT`.
5. Parse the result into `ChatResponse` (reply and citations).

## Acceptance Criteria
- Function returns a valid `ChatResponse`.
- History is correctly preserved in the conversation.

## Out of Scope
- RAG context injection (Task AI-T01-D).
- Unit tests.
