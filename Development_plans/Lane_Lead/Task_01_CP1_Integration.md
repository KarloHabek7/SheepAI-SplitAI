# Task 01: CP1 Integration — Chat + RAG End-to-End

> **Lane:** Lead
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF
> **Can Parallelize With:** None — this is a synchronization point
> **Depends On:** Frontend T02 (ChatPage), Backend T02 (Chat Route), AI T01–T03 (SDK, Cache, Prompts)

## Objective

Run the first Integration Checkpoint (CP1) at ~14:00. Wire the Chat UI → BFF `/api/chat` → Gemini with Context Cache end-to-end. Verify a user can type a regulation question, receive a cited answer from Split Zmaj, and see citation cards rendered in the UI. This is the **minimum viable demo** — if this works, the product is real.

## Context Snapshot

**Read these files before starting:**
- `Development_plans/PROJECT_STATE.md` — check all prerequisite tasks are ✅ Done
- `docs/architecture/ARCHITECTURE.md` §4.1 — Chat data flow diagram
- `app/src/types/index.ts` — `ChatRequest`, `ChatResponse`, `ChatMessage`, `Citation` types

**Key types you'll use:**
```typescript
interface ChatRequest {
  message: string;
  conversationId?: string;
  language?: SupportedLanguage;
  image?: string;
}
interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
}
interface ChatMessage {
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
- Verified E2E chat flow working in the browser
- Updated `PROJECT_STATE.md` with CP1 results
- List of bugs/issues found during integration (if any)
- Confirmation that the product meets "minimum viable demo" bar

**This task CONSUMES:**
- Frontend `ChatPage` component (Lane 1 Task 02)
- Backend `/api/chat` route (Lane 2 Task 02)
- AI Gemini SDK + Context Cache + System Prompt (Lane 3 Tasks 01–03)
- Frontend Service Layer `chatService.ts` (Lane 2 Task 09 or mock)

## Implementation Steps

1. **Pre-check: Verify prerequisites**
   - Run `git status` on all lane branches to confirm relevant tasks are merged or ready
   - Check `PROJECT_STATE.md` — Frontend T02, Backend T02, AI T01–T03 must be ✅ Done
   - If any prerequisite is not done, identify which and escalate to the user

2. **Merge lane branches to `main`**
   - Use `/integrate` workflow if available, or manually:
     ```
     git checkout main
     git merge lane/frontend/... --no-ff
     git merge lane/backend/... --no-ff
     git merge lane/ai/... --no-ff
     ```
   - Resolve any merge conflicts (shared files: `types/index.ts`, `App.tsx`, `package.json`)
   - Run `npm install` in `app/` after merges

3. **Start both servers**
   - Terminal 1: `cd app && npm run dev` (Vite dev server)
   - Terminal 2: Start BFF server (e.g., `node app/src/server/index.ts` or `npx tsx app/src/server/index.ts`)
   - Verify health check: `GET http://localhost:3001/api/health` → `{status: "ok", cacheReady: true}`

4. **Smoke test: Chat E2E**
   - Open browser → navigate to `/chat`
   - Type: "Mogu li izgraditi terasu u Varošu?" (Croatian regulation question)
   - Verify: Response appears within ~1s, contains regulation citation
   - Type: "Can I park near Diocletian's Palace?" (English, function call test)
   - Verify: Response includes parking info from mock tool
   - Type: "Welche Buslinie fährt zum Strand?" (German, multilingual test)
   - Verify: Response in German, bus ETA from mock tool

5. **Verify citation cards**
   - After a regulation answer, verify citation cards render below the response
   - Check: `sourceDocument`, `article`, `page` fields visible in the UI
   - Check: Citation cards are clickable/expandable (per frontend design)

6. **Check error handling**
   - Send empty message → graceful error
   - Send very long message (1000+ chars) → handled without crash
   - Kill BFF server → frontend shows connection error, not crash

7. **Performance check**
   - Time 3 text-only responses → average should be < 1s
   - Time 1 response with function call → should be < 2s
   - Check: No console errors in browser DevTools

8. **Document results**
   - Update `PROJECT_STATE.md`: Mark CP1 as completed or note blockers
   - If bugs found, create quick fix tasks or fix inline with `/implement-any`

## Acceptance Criteria

- [ ] Chat question → cited response end-to-end working in browser
- [ ] Multilingual responses work (at least HR, EN, DE)
- [ ] Function calling triggers mock tools and returns data
- [ ] Citation cards render in the UI
- [ ] Response time < 2s for text queries
- [ ] No critical console errors
- [ ] `PROJECT_STATE.md` updated with CP1 results
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT add new features — this is integration testing only
- Do NOT refactor code unless it's blocking the E2E flow
- Do NOT modify files outside of `Development_plans/` unless fixing a critical integration bug (use `/implement-any` if needed)
- Do NOT attempt to fix non-blocking UI polish issues — note them for later

## Handoff

- Push to: `lane/lead/cp1-integration`
- Notify: All lanes — CP1 results affect everyone's next steps
- Next task enabled: All Wave 4–5 tasks (if CP1 passes); bug fix tasks (if CP1 fails)

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Lead/Task_01_CP1_Integration.md`
