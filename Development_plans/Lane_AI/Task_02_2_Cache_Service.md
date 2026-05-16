# Task 02.2: Gemini Cache Service Implementation

> **Lane:** AI
> **Priority:** P0
> **Estimated Effort:** M
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Depends On:** Task 01 (SDK Setup), Task 02.1 (Knowledge Base)

## Objective
Implement the technical caching logic using the Gemini SDK. This service will upload the knowledge base files to the Gemini Context Cache.

## Target Files
- `app/src/services/ai/cacheService.ts`
- `app/src/services/ai/index.ts` (Barrel export)

## Implementation Steps
1. **Import SDK:** Use `getGeminiClient` from `@/lib/ai`.
2. **Implement `initializeCache()`:**
   - Read files from `app/public/assets/docs/`.
   - Call `caches.create()` with the file contents.
   - Set 1-hour TTL.
3. **Implement Helpers:** `getCacheId()`, `isCacheReady()`, `invalidateCache()`.
4. **Fallback Logic:** If caching fails (quota/region), ensure the system logs the error and returns `null` for `getCacheId()` so the orchestrator can fall back to standard RAG or no-context.

## Acceptance Criteria
- [ ] Service compiles without errors.
- [ ] Successfully retrieves and returns a `cacheId`.
- [ ] No hardcoded model names (import from `lib/ai`).
