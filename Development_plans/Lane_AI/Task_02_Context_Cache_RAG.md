# Task 02: Context Cache & RAG Setup

> **Lane:** AI
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Opus 4.6 Thinking
> **Planning Mode:** ON
> **Can Parallelize With:** Task 03 (System Prompt Engineering)
> **Depends On:** Task 01 (Gemini SDK Setup)

## Objective
Implement the Context Caching service that pre-loads Split's municipal documents (GUP, Komunalni Red, Emergency Protocols) into Gemini's context window. This is the foundation of the RAG Q&A capability — the AI's "brain" for answering regulation questions with page-level citations. The cache is created at BFF server startup and shared across all chat requests.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — Lines 382–408 (`GeminiConfig`, `ContextCacheInfo`)
- `app/src/types/index.ts` — Lines 109–115 (`Citation` type)
- `app/src/lib/ai/geminiClient.ts` — (created by Task 01)
- `docs/architecture/ARCHITECTURE.md` — Section 3.3 (AI Layer), Section 4.1 (Chat Flow)

**Key types you'll use:**
```typescript
export interface ContextCacheInfo {
  cacheId: string;
  displayName: string;
  model: string;
  tokenCount: number;
  createTime: string;
  expireTime: string;
}

export interface Citation {
  sourceDocument: string;
  article?: string;
  page?: number;
  excerpt: string;
}
```

## Interface Contract
**This task PRODUCES:**
- `app/src/services/ai/cacheService.ts` — Functions to create, retrieve, and manage the Gemini Context Cache
- `app/public/assets/docs/` — Directory for PDF/text documents (GUP excerpt, Komunalni Red excerpt, Emergency Protocols)
- Exported functions:
  - `initializeCache(): Promise<ContextCacheInfo>` — Creates or refreshes the context cache with loaded documents
  - `getCacheId(): string | null` — Returns the current cache ID (for use in chat requests)
  - `isCacheReady(): boolean` — Status check
  - `invalidateCache(): void` — Force refresh

**This task CONSUMES:**
- `getGeminiClient()` from `app/src/lib/ai/geminiClient.ts` (Task 01)
- `@google/genai` SDK — `caches.create()`, `caches.get()` APIs
- PDF/text documents placed in `app/public/assets/docs/`

## Implementation Steps
1. **Prepare document excerpts:**
   - Create `app/public/assets/docs/` directory
   - Create representative text excerpts for demo purposes (we don't need the full 250-page GUP):
     - `gup_excerpt.txt` — 15-20 key articles covering zoning, construction, UNESCO zones, terraces, parking rules (~3-5 pages of content)
     - `komunalni_red_excerpt.txt` — 10-15 key articles covering noise, waste, public order, animal control (~2-3 pages)
     - `emergency_protocols.txt` — Emergency procedures for bura, flood, earthquake, fire (~1-2 pages)
   - Write these in **Croatian** with realistic legal formatting (Članak XX, Stavak XX)
   - Include articles that match common citizen questions: terrace rules, parking zones, noise curfews, building permits, UNESCO restrictions
2. **Create `app/src/services/ai/cacheService.ts`:**
   - Import `getGeminiClient` from `@/lib/ai`
   - Implement `initializeCache()`:
     - Read all document files from `app/public/assets/docs/`
     - Use the Gemini SDK `caches.create()` API to upload documents into a cached content object
     - Set `displayName: 'SplitAI Municipal Knowledge Base'`
     - Set `model: 'models/gemini-3.0-flash'` (or the appropriate model string for caching)
     - Set `ttl` to at least 1 hour for the demo
     - Store the cache ID in a module-level variable
     - Return `ContextCacheInfo` with metadata
   - Implement `getCacheId()` — returns the stored cache ID or null
   - Implement `isCacheReady()` — boolean check
   - Implement `invalidateCache()` — clears the stored ID, allowing re-creation
   - Add robust error handling: if caching fails (e.g., quota), log the error and set a fallback flag so the system can operate without cache (with degraded RAG quality)
3. **Create `app/src/services/ai/index.ts`** — Barrel export for services/ai/
4. **Verify the cache service module compiles** — `npm run build` must pass

**Note on document content:** Write realistic but concise Croatian legal text. The documents don't need to be legally accurate — they need to be realistic enough that the AI can answer demo questions like:
- "Mogu li napraviti terasu na balkonu u Varošu?"
- "Koliko je kazna za preglasnu glazbu nakon 23h?"
- "Što moram napraviti ako puše bura?"

## Acceptance Criteria
- [ ] `app/public/assets/docs/` contains 3 text files with realistic Croatian municipal content
- [ ] `initializeCache()` creates a Gemini Context Cache using the SDK
- [ ] `getCacheId()` returns the cache ID after initialization
- [ ] `isCacheReady()` returns correct boolean status
- [ ] Error handling: if cache creation fails, the service doesn't crash — it logs and degrades gracefully
- [ ] No API keys hardcoded
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create chat orchestration logic (that's Task 06)
- Do NOT create the system prompt (that's Task 03)
- Do NOT create any React hooks or frontend components
- Do NOT modify Backend route files — the Backend lane owns those
- Do NOT create an endpoint — just the service module that Backend will consume
- Do NOT worry about cache expiry management for production — this is a demo

## Handoff
- Push to: `lane/ai/context-cache-rag`
- Notify: Backend lane (they need `getCacheId()` in the chat route)
- Next task enabled: Task 06 (Chat Orchestration) — needs cache ID to create cached content chat sessions

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_AI/Task_02_Context_Cache_RAG.md`
