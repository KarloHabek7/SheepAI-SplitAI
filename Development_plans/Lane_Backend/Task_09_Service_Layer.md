# Task 09: Frontend Service Layer — API Client Wrappers

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** None (best done after routes are defined)
> **Depends On:** Task_02, Task_03, Task_04, Task_05, Task_06

## Objective

Create typed API client wrappers in `app/src/services/` that the Frontend hooks will call. Each service file maps to a backend route group and provides clean async functions that handle `fetch()`, error handling, and response unwrapping. This is the **bridge** between Frontend hooks and Backend routes.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — All request/response types
- `docs/architecture/ARCHITECTURE.md` — Full API catalog (Section 5)
- `app/src/server/routes/` — All route files (to match endpoints exactly)

## Interface Contract

**This task PRODUCES:**
- `app/src/services/chatService.ts` — `sendMessage()`, `getHistory()`
- `app/src/services/reportService.ts` — `analyzeImage()`, `submitReport()`, `getReports()`
- `app/src/services/pazarService.ts` — `analyzeVendorPhoto()`, `submitListing()`, `getFeed()`
- `app/src/services/adminService.ts` — `getDashboard()`, `updateReportStatus()`
- `app/src/services/utilityService.ts` — `getParking()`, `getTransit()`, `getCrowd()`, `getEmergency()`
- `app/src/services/apiClient.ts` — shared `fetchApi<T>()` helper with error handling

**This task CONSUMES:**
- All types from `app/src/types/index.ts`
- Backend API endpoints (must match exactly)

## Implementation Steps

1. Create `app/src/services/apiClient.ts`:
   - `const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'`
   - `async function fetchApi<T>(path, options?): Promise<APIResponse<T>>` — wraps `fetch()`, handles JSON parsing, network errors
2. Create each service file calling `fetchApi<T>()` with correct paths and types
3. All functions should accept typed request objects and return typed responses
4. `reportService.getReports()` should accept optional filter params including `bbox` for map integration

## Acceptance Criteria

- [ ] `apiClient.ts` provides a reusable `fetchApi<T>()` with error handling
- [ ] All 5 service files exist with fully typed functions
- [ ] `chatService.sendMessage({message: "test"})` calls `POST /api/chat` correctly
- [ ] `reportService.getReports({bbox: {...}})` passes bbox as query params
- [ ] `adminService.updateReportStatus(id, status)` calls `PATCH /api/admin/reports/:id`
- [ ] No `any` types — all inputs and outputs are properly typed
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT create React hooks (those consume these services)
- Do NOT create Zustand stores
- Do NOT modify Frontend components

## Handoff

- Push to: `lane/backend/service-layer`
- Notify: Frontend (hooks can now import from services)
- Next task enabled: Frontend hooks can wire up to real API calls

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_09_Service_Layer.md`
