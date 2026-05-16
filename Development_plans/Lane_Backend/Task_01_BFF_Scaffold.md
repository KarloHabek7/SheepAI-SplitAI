# Task 01: Express BFF Scaffold

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Frontend Task_01, Creative Task_01, AI Task_01
> **Depends On:** None

## Objective

Create the Express.js BFF (Backend-for-Frontend) server scaffold that will proxy all Gemini API calls and protect the API key from client exposure. This is the foundational server that all other backend tasks build on. It should include entry point, CORS config, environment variable loading, JSON body parsing (with high limit for base64 images), a health check endpoint, and structured error handling middleware.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `APIResponse`, `APIError` types (lines 365–378)
- `docs/architecture/ARCHITECTURE.md` — Section 5.6 (System Endpoints), Section 10.2 (Backend tech stack)
- `MASTER_PLAN.md` — Section 2, Lane 2 overview

**Key types you'll use:**
```typescript
/** Standard API response wrapper */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}

/** Standard API error */
export interface APIError {
  code: string;
  message: string;
  details?: string;
}
```

## Interface Contract

**This task PRODUCES:**
- `app/src/server/index.ts` — Server entry point (Express app creation, middleware, listen)
- `app/src/server/middleware/errorHandler.ts` — Centralized error handling middleware
- `app/src/server/middleware/requestLogger.ts` — Simple request logging middleware
- Health check endpoint: `GET /api/health → {status: "ok", cacheReady: boolean}`
- Cache init endpoint stub: `POST /api/cache/init → {cacheId: string, status: string}`

**This task CONSUMES:**
- `app/src/types/index.ts` — `APIResponse`, `APIError`

## Implementation Steps

1. Install backend dependencies: `express`, `cors`, `dotenv`, `@types/express`, `@types/cors`
2. Create `app/src/server/index.ts`:
   - Load `.env` via `dotenv.config()`
   - Create Express app
   - Add middleware: `cors()`, `express.json({limit: '10mb'})` (for base64 images), request logger
   - Mount route placeholders (commented stubs for `/api/chat`, `/api/report`, `/api/pazar`, `/api/admin`, `/api/emergency`, `/api/parking`, `/api/transit`, `/api/crowd`)
   - Add `GET /api/health` returning `APIResponse<{status: "ok", cacheReady: false}>`
   - Add `POST /api/cache/init` stub returning `APIResponse<{cacheId: "", status: "pending"}>`
   - Add error handler middleware last
   - Listen on `process.env.PORT || 3001`
3. Create `app/src/server/middleware/errorHandler.ts` — catches errors, returns `APIResponse` with `APIError`
4. Create `app/src/server/middleware/requestLogger.ts` — logs method, path, status, duration
5. Add a `"server"` script to `app/package.json`: `"server": "npx tsx src/server/index.ts"`
6. Update `.env.example` with `PORT=3001` and `GEMINI_API_KEY=your-gemini-api-key-here`
7. Test: run server, hit `GET /api/health`, verify JSON response

## Acceptance Criteria

- [ ] `app/src/server/index.ts` exists and exports the Express app
- [ ] Server starts on port 3001 without errors
- [ ] `GET /api/health` returns `{"success": true, "data": {"status": "ok", "cacheReady": false}, "timestamp": "..."}`
- [ ] CORS is configured (allows `http://localhost:5173`)
- [ ] JSON body limit is set to 10mb for base64 image payloads
- [ ] Error handler middleware returns proper `APIResponse` format on errors
- [ ] `.env.example` is updated with required variables
- [ ] `npm run build` passes (frontend app still compiles)

## Out of Scope (CRITICAL)

- Do NOT implement any AI/Gemini SDK integration — that's Lane 3
- Do NOT implement actual route handlers beyond health check — those are Tasks 02–06
- Do NOT modify any Frontend files (`components/`, `pages/`, `styles/`)
- Do NOT create a database — the in-memory store is Task 08

## Handoff

- Push to: `lane/backend/bff-scaffold`
- Notify: All lanes (server is now runnable)
- Next task enabled: Task_02 (Chat Route), Task_08 (In-Memory Store) — both depend on this scaffold

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Backend/Task_01_BFF_Scaffold.md`
