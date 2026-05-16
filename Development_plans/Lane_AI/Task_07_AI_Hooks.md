# Task 07: AI React Hooks (useChat, useVisionAnalysis)

> **Lane:** AI
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** None
> **Depends On:** Task 06 (Chat Orchestration), Backend T01 (BFF Scaffold), Backend T02 (Chat Route)

## Objective
Create the React hooks that bridge the AI services to the frontend UI. These hooks call the BFF API endpoints (not Gemini directly) and expose clean, typed interfaces that Frontend page components consume. They manage loading states, errors, streaming indicators, and data transformation.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — Lines 494-531 (Hook return types: `UseChatReturn`, `UseVisionAnalysisReturn`, `UsePazarFeedReturn`)
- `app/src/types/index.ts` — Lines 414-424 (`ChatStoreState`), Lines 427-437 (`ReportStoreState`)
- `docs/architecture/ARCHITECTURE.md` — Section 5.1-5.3 (API endpoints)

**Key hook return types (already defined in types/):**
```typescript
interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  suggestedPrompts: string[];
  sendMessage: (message: string, image?: string) => Promise<void>;
  clearChat: () => void;
}

interface UseVisionAnalysisReturn {
  classification: CivicReportClassification | null;
  isAnalyzing: boolean;
  error: string | null;
  analyze: (image: string, location?: GeoLocation) => Promise<void>;
  reset: () => void;
}
```

## Interface Contract
**This task PRODUCES:**
- `app/src/hooks/ai/useChat.ts` — Chat hook that calls `POST /api/chat` via the service layer
- `app/src/hooks/ai/useVisionAnalysis.ts` — Vision hook that calls `POST /api/report/analyze`
- `app/src/hooks/ai/index.ts` — Barrel export

**This task CONSUMES:**
- Frontend service layer (or fetches directly to BFF endpoints)
- Types from `@/types`
- Zustand stores (chatStore, reportStore) if they exist

## Implementation Steps
1. **Create `app/src/hooks/ai/useChat.ts`:**
   - Implement `useChat(): UseChatReturn`
   - Maintain `messages` state (ChatMessage[])
   - `sendMessage()` — POST to `/api/chat` with message + conversationId + optional image
   - Handle response: add assistant message to state, extract citations
   - Track `isStreaming` boolean during API calls
   - Provide `suggestedPrompts` — hardcoded initial prompts:
     - "Mogu li napraviti terasu u starom gradu?"
     - "Where can I park near Diocletian's Palace?"
     - "Was gibt es heute auf dem Fischmarkt?"
   - `clearChat()` — reset messages and conversationId
   - Error handling: show user-friendly error messages
2. **Create `app/src/hooks/ai/useVisionAnalysis.ts`:**
   - Implement `useVisionAnalysis(): UseVisionAnalysisReturn`
   - `analyze(image, location?)` — POST base64 image to `/api/report/analyze`
   - Parse response as `CivicReportClassification`
   - Track `isAnalyzing` loading state
   - Track `error` state
   - `reset()` — clear classification and error
3. **Create `app/src/hooks/ai/index.ts`** — Barrel export both hooks
4. **Use `fetch` directly** to call BFF endpoints (the service layer may not exist yet — use raw fetch with proper error handling and type assertions)

## Acceptance Criteria
- [ ] `useChat()` sends messages and receives typed `ChatResponse` from BFF
- [ ] Messages accumulate correctly in state (user + assistant)
- [ ] `isStreaming` is true during API call, false after
- [ ] `suggestedPrompts` returns at least 3 multilingual examples
- [ ] `useVisionAnalysis()` sends images and returns typed classification
- [ ] `isAnalyzing` tracks loading state correctly
- [ ] Errors are caught and exposed via `error` state (not console-only)
- [ ] Hooks follow React rules (no conditional hook calls, proper dependency arrays)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create UI components (Frontend lane)
- Do NOT create BFF routes or endpoints (Backend lane)
- Do NOT call Gemini SDK directly from hooks — always go through BFF endpoints
- Do NOT create Zustand stores (Backend lane)
- Do NOT modify any files outside `app/src/hooks/ai/`

## Handoff
- Push to: `lane/ai/react-hooks`
- Notify: Frontend lane (they consume these hooks in ChatPage, ReportPage)
- Next task enabled: None — this is the final AI lane task. Frontend can start wiring hooks.

---
## Ready-to-Execute
> `/execute Development_plans/Lane_AI/Task_07_AI_Hooks.md`
