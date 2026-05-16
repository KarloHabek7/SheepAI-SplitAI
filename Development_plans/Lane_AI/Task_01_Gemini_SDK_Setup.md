# Task 01: Gemini SDK Setup & Client Initialization

> **Lane:** AI
> **Priority:** P0-Critical
> **Estimated Effort:** S (<30min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Backend T01 (BFF Scaffold), Creative T01 (Brand Site)
> **Depends On:** None (types/index.ts already exists)

## Objective
Initialize the Gemini 3.0 Flash SDK client (`@google/genai`) as a reusable module in `app/src/lib/ai/`. This module provides a configured, typed Gemini client that the rest of the AI lane and Backend lane will consume. It handles environment variable validation, default model configuration, and error wrapping.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — Lines 382–408 (`GeminiConfig`, `ToolDeclaration`, `ContextCacheInfo`)
- `docs/architecture/ARCHITECTURE.md` — Section 10.3 (AI Technology Stack)
- `.env.example` — Check existing env vars

**Key types you'll use:**
```typescript
export interface GeminiConfig {
  modelName: string;
  cachedContentId?: string;
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
}

export interface ContextCacheInfo {
  cacheId: string;
  displayName: string;
  model: string;
  tokenCount: number;
  createTime: string;
  expireTime: string;
}
```

## Interface Contract
**This task PRODUCES:**
- `app/src/lib/ai/geminiClient.ts` — Singleton Gemini client factory with `getGeminiClient()` and `getGeminiModel(config?)` exports
- `app/src/lib/ai/index.ts` — Barrel export for the `lib/ai/` module
- Updated `.env.example` with `GEMINI_API_KEY` placeholder

**This task CONSUMES:**
- `@google/genai` npm package (already installed or needs `npm install @google/genai`)
- `GeminiConfig` type from `@/types`

## Implementation Steps
1. **Verify `@google/genai` is installed** — Check `app/package.json`. If not present, add it.
2. **Create `app/src/lib/ai/geminiClient.ts`:**
   - Import `GoogleGenAI` from `@google/genai`
   - Read `GEMINI_API_KEY` from `process.env` (server-side) — this file runs on the BFF, never in the browser
   - Create a singleton `GoogleGenAI` instance
   - Export `getGeminiClient()` — returns the raw SDK client
   - Export `getGeminiModel(config?: Partial<GeminiConfig>)` — returns a model instance with defaults:
     - `modelName: 'gemini-3.0-flash'`
     - `temperature: 0.7`
     - `maxOutputTokens: 2048`
     - `topP: 0.95`
   - Export `DEFAULT_MODEL_CONFIG: GeminiConfig` constant
   - Add proper error handling: throw descriptive error if API key is missing
3. **Create `app/src/lib/ai/index.ts`** — Barrel export: `export * from './geminiClient'`
4. **Update `.env.example`** — Add `GEMINI_API_KEY=your-gemini-api-key-here` with a descriptive comment
5. **Verify build** — `npm run build` must pass

## Acceptance Criteria
- [ ] `getGeminiClient()` returns a configured `GoogleGenAI` instance
- [ ] `getGeminiModel()` returns a model with sensible defaults
- [ ] Missing API key throws a clear error (not a cryptic SDK crash)
- [ ] No API key is hardcoded anywhere — only read from `process.env`
- [ ] `app/src/lib/ai/index.ts` barrel export works
- [ ] `.env.example` documents `GEMINI_API_KEY`
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create any React hooks or components
- Do NOT create services that call BFF endpoints — those belong to Backend lane
- Do NOT create prompt templates (that's Task 03)
- Do NOT set up Context Caching (that's Task 02)
- Do NOT modify files outside `app/src/lib/ai/`, `.env.example`, and `app/package.json`

## Handoff
- Push to: `lane/ai/gemini-sdk-setup`
- Notify: Backend lane (they will import from `lib/ai/` in their routes)
- Next task enabled: Task 02 (Context Cache), Task 03 (System Prompt) — both can start after this

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_AI/Task_01_Gemini_SDK_Setup.md`
