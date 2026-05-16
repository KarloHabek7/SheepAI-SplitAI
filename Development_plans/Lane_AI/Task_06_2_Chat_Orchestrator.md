# Task 06.2: Chat Orchestrator Implementation

> **Lane:** AI
> **Priority:** P0-Critical
> **Estimated Effort:** L
> **Recommended Model:** Opus 4.6 (Thinking)
> **Planning Mode:** ON
> **Depends On:** Task 01 (SDK), Task 02.2 (Cache), Task 03.1 (Persona), Task 04 (Tools)

## Objective
Implement the `chatOrchestrator.ts` — the central hub for all AI conversations. It manages stateful Gemini chat sessions and coordinates RAG and function calling.

## Target Files
- `app/src/services/ai/chatOrchestrator.ts`
- `app/src/services/ai/index.ts` (Barrel export)

## Implementation Steps
1. **Session Management:**
   - In-memory `Map<string, ChatSession>` for tracking conversation history.
2. **`createChatSession()`:**
   - Build system prompt with `buildSystemPrompt()`.
   - Attach `TOOL_DECLARATIONS`.
   - Set `cachedContent` from the global cache service.
3. **`processMessage()`:**
   - Handle text + optional image inputs.
   - Parse citations (`[Source: Doc, Article XX]`) into structured `Citation[]` objects.
   - Detect `functionCalls` and return them for the backend to handle.
4. **History Management:** Support for `getConversationHistory` and `clearConversation`.

## Acceptance Criteria
- [ ] Multi-turn chat works with history preserved.
- [ ] RAG citations are parsed into structured data.
- [ ] Function calls are correctly detected and returned.
- [ ] Context caching is used if available.
