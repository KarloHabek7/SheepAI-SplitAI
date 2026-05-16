# Task 06: Chat Orchestration Service

> **Lane:** AI
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Opus 4.6 Thinking
> **Planning Mode:** ON
> **Can Parallelize With:** None — this is the integration point
> **Depends On:** Task 01 (SDK), Task 02 (Cache), Task 03 (Prompts), Task 04 (Tools), Task 05 (Schemas)

## Objective
Build the core AI orchestration service that ties together the SDK client, context cache, system prompt, function calling, and vision schemas into a unified chat and vision service. This is the central AI module that the Backend lane's routes will consume. It handles: creating chat sessions with cached context, processing multi-turn conversations, executing function calls, classifying images, and managing conversation history.

## Context Snapshot
**Read these files before starting:**
- `app/src/lib/ai/geminiClient.ts` (Task 01)
- `app/src/services/ai/cacheService.ts` (Task 02)
- `app/src/lib/ai/promptTemplates.ts` (Task 03)
- `app/src/lib/ai/toolDeclarations.ts` (Task 04)
- `app/src/lib/ai/schemas.ts` (Task 05)
- `app/src/types/index.ts` — ChatMessage, ChatRequest, ChatResponse, CivicReportClassification, PazarListingClassification, ToolCallResult, Citation
- `docs/architecture/ARCHITECTURE.md` — Section 4.1 (Chat Flow), 4.2 (Photo Report Flow), 4.3 (Pazar Feed Flow)

## Interface Contract
**This task PRODUCES:**
- `app/src/services/ai/chatOrchestrator.ts` — Main orchestration service:
  - `createChatSession(conversationId: string, language?: SupportedLanguage): ChatSession` — Creates a new Gemini chat session with system prompt + cached context + tools
  - `processMessage(conversationId: string, message: string, image?: string): Promise<ChatResponse>` — Sends a message (with optional image) and returns the AI response, handling any function calls
  - `classifyImage(image: string, type: 'civic' | 'pazar'): Promise<CivicReportClassification | PazarListingClassification>` — Standalone vision classification
  - `getConversationHistory(conversationId: string): ChatMessage[]` — Returns chat history for a conversation
  - `clearConversation(conversationId: string): void` — Clears a conversation's history
- `app/src/services/ai/visionService.ts` — Dedicated vision service:
  - `analyzeCivicReport(imageBase64: string, location?: GeoLocation): Promise<CivicReportClassification>` — Classify a civic issue photo
  - `analyzePazarListing(imageBase64: string): Promise<PazarListingClassification>` — Classify a Pazar stall photo

**This task CONSUMES:**
- All outputs from Tasks 01-05

## Implementation Steps
1. **Create `app/src/services/ai/chatOrchestrator.ts`:**
   - Maintain an in-memory `Map<string, ChatSession>` for conversation sessions
   - `createChatSession()`: Use `getGeminiModel()`, configure with `buildSystemPrompt()`, attach `TOOL_DECLARATIONS`, set `cachedContent` from `getCacheId()` if available
   - `processMessage()`:
     - Get or create a chat session for the conversationId
     - Send user message via `session.sendMessage()`
     - If response contains function calls, execute them by dispatching to the appropriate handler (or return the function call info for Backend to handle)
     - Extract citations from the response text (parse `[Source: ...]` patterns)
     - Build a `ChatMessage` with content, citations, and any toolCall results
     - Store in conversation history
     - Return `ChatResponse`
   - Handle multi-turn: conversation history is maintained by the Gemini chat session object
   - Handle images: if `image` is provided, include it as an inline data part in the message
2. **Create `app/src/services/ai/visionService.ts`:**
   - `analyzeCivicReport()`: Use `getGeminiModel()`, send image + `CIVIC_REPORT_VISION_PROMPT`, set `responseSchema` to `CIVIC_REPORT_RESPONSE_SCHEMA`, parse and validate response with `civicReportSchema`
   - `analyzePazarListing()`: Same pattern with Pazar prompt and schema
   - Both should handle errors gracefully and return typed results
3. **Update `app/src/services/ai/index.ts`** barrel export
4. **Add error handling:** Wrap all Gemini API calls in try/catch with meaningful error messages

## Acceptance Criteria
- [ ] `processMessage()` creates a Gemini chat session with system prompt + tools + cache
- [ ] Multi-turn conversation works (history preserved in session)
- [ ] Function calls are detected and returned in the response
- [ ] Citations are extracted from AI responses
- [ ] `analyzeCivicReport()` returns typed `CivicReportClassification`
- [ ] `analyzePazarListing()` returns typed `PazarListingClassification`
- [ ] Conversation history is tracked per conversationId
- [ ] Errors are handled gracefully (no raw SDK crashes reaching the caller)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create Express routes or endpoints (Backend lane)
- Do NOT create React hooks (Task 07)
- Do NOT implement actual tool execution (Backend lane's mock tools handle that)
- Do NOT create frontend components
- Do NOT handle HTTP request/response — only the AI logic

## Handoff
- Push to: `lane/ai/chat-orchestration`
- Notify: Backend lane (they import chatOrchestrator in their routes)
- Next task enabled: Task 07 (AI Hooks)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_AI/Task_06_Chat_Orchestration.md`
