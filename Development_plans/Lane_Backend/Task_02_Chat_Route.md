# Task 02: Chat Route — POST /api/chat + Conversation Management

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_03, Task_04, Task_05, Task_06, Task_08
> **Depends On:** Task_01 (BFF Scaffold)

## Objective

Implement the chat route that receives user messages and returns AI-generated responses. This is the **most critical backend endpoint** — it's the backbone of the CP1 demo milestone. For now, the route will call a **stub AI service** that returns a mock response; the actual Gemini integration will be provided by Lane 3 (AI) and wired in during integration. The route also manages conversation history using the in-memory store.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `ChatRequest`, `ChatResponse`, `ChatMessage`, `ToolCallResult`, `Citation`, `APIResponse` (lines 108–149, 365–378)
- `docs/architecture/ARCHITECTURE.md` — Section 4.1 (Chat Flow), Section 5.1 (Chat Endpoints)
- `app/src/server/index.ts` — Mount point for the chat router

**Key types you'll use:**
```typescript
export interface ChatRequest {
  message: string;
  conversationId?: string;
  language?: SupportedLanguage;
  image?: string; // base64
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  language?: SupportedLanguage;
  timestamp: string;
  toolCall?: ToolCallResult;
}
```

## Interface Contract

**This task PRODUCES:**
- `app/src/server/routes/chat.ts` — Express Router with:
  - `POST /api/chat` — accepts `ChatRequest`, returns `APIResponse<ChatResponse>`
  - `GET /api/chat/history/:conversationId` — returns `APIResponse<ChatMessage[]>`
- Stub AI service call that returns a mock response until Lane 3 delivers real integration

**This task CONSUMES:**
- `app/src/server/index.ts` — mounts router at `/api/chat`
- `app/src/types/index.ts` — all chat types
- In-memory store (Task_08) — if not done yet, create a minimal local map for conversations

## Implementation Steps

1. Create `app/src/server/routes/chat.ts`:
   - Create an Express Router
   - `POST /` handler:
     - Parse `ChatRequest` from body
     - Generate or reuse `conversationId` (UUID)
     - Store user message in conversation history (in-memory map)
     - Call stub AI function: `generateChatResponse(message, conversationId, language, image?)` → returns a `ChatMessage`
     - The stub should return a friendly mock response like: "Pozdrav! Ja sam Split Zmaj 🐉, vaš AI asistent za grad Split. Ovo je demo odgovor — AI integracija dolazi uskoro!"
     - Include 1-2 mock citations in the stub response
     - Store assistant message in history
     - Return `APIResponse<ChatResponse>`
   - `GET /history/:conversationId` handler:
     - Retrieve messages from in-memory map
     - Return `APIResponse<ChatMessage[]>`
2. Create stub function `generateMockChatResponse()` in the route file (will be replaced by Lane 3's service)
3. Mount router in `app/src/server/index.ts` at `/api/chat`
4. Test: POST a message, verify response format matches `ChatResponse`

## Acceptance Criteria

- [ ] `POST /api/chat` with `{"message": "Hello"}` returns a valid `ChatResponse` with mock content
- [ ] `conversationId` is generated on first message and reused on subsequent messages
- [ ] `GET /api/chat/history/:conversationId` returns the conversation messages in order
- [ ] Response includes mock `citations` array with at least one entry
- [ ] All responses wrapped in `APIResponse<T>` format
- [ ] Invalid requests return proper error responses
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement actual Gemini SDK calls — use a mock/stub function
- Do NOT implement streaming/SSE — that's a future enhancement
- Do NOT modify Frontend files
- Do NOT create Zustand stores — that's also Backend lane but separate (Task_08 handles the data store pattern)

## Handoff

- Push to: `lane/backend/chat-route`
- Notify: AI Lane (they will replace the stub with real Gemini calls at integration)
- Next task enabled: Frontend Chat Page can now test against this endpoint

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Backend/Task_02_Chat_Route.md`
