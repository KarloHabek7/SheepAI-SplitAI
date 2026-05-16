# Task 10: Zustand Stores — All Frontend State Stores

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_09 (Service Layer)
> **Depends On:** Task_09 (Service Layer — stores call service functions)

## Objective

Create all Zustand store definitions that the Frontend hooks and pages will consume. Each store manages a specific domain's client state and exposes typed actions. Stores delegate async work to the service layer (Task_09). Some stores use `localStorage` persistence.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — All store state types (lines 414–488) and `MapStoreState` (lines 632–668)
- `docs/architecture/ARCHITECTURE.md` — Section 7 (State Management Architecture)
- `app/src/services/` — Service functions this task will call

**Key store state types:**
```typescript
export interface ChatStoreState { messages, conversationId, isStreaming, ... }
export interface ReportStoreState { currentImage, classification, isAnalyzing, ... }
export interface PazarStoreState { listings, isLoading, filters, ... }
export interface AdminStoreState { reports, dashboardData, selectedReport, ... }
export interface AppStoreState { language, theme, isOnline, cacheStatus, ... }
export interface MapStoreState { camera, bounds, issuesGeoJson, filters, ... }
```

## Interface Contract

**This task PRODUCES:**
- `app/src/stores/useChatStore.ts` — Chat state + `sendMessage()`, `clearChat()`
- `app/src/stores/useReportStore.ts` — Report workflow state + `analyzeImage()`, `submitReport()`
- `app/src/stores/usePazarStore.ts` — Pazar feed state + `fetchListings()`
- `app/src/stores/useAdminStore.ts` — Admin dashboard state + `fetchDashboard()`, `updateReportStatus()`
- `app/src/stores/useAppStore.ts` — Global app state (language, theme) with `localStorage` persistence
- `app/src/stores/useMapStore.ts` — Map state (camera, bounds, GeoJSON, filters, report mode)

**This task CONSUMES:**
- `app/src/services/` — all service functions
- `app/src/types/index.ts` — all store state interfaces

## Implementation Steps

1. Create each store using `zustand`'s `create()`:
   - Match the interface exactly from `types/index.ts`
   - Actions call service layer functions from `app/src/services/`
   - Use try/catch with error state for async operations
2. `useAppStore`: add `persist()` middleware for `language` and `theme`
3. `useChatStore`: add `persist()` middleware for `messages` (conversation history)
4. `useMapStore`: implement `fetchIssuesByBounds()` calling `reportService.getReports({bbox})` and transforming `CivicReport[]` → `IssueGeoJSONCollection`
5. All stores should have `isLoading`/`isStreaming` flags set correctly during async ops

## Acceptance Criteria

- [ ] All 6 store files exist and export named hooks
- [ ] Each store implements its full interface from `types/index.ts`
- [ ] `useAppStore` persists `language` and `theme` to localStorage
- [ ] `useChatStore` persists `messages` to localStorage
- [ ] `useMapStore.fetchIssuesByBounds()` transforms `CivicReport[]` to `IssueGeoJSONCollection`
- [ ] All async actions correctly set loading flags and handle errors
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT create React hooks that wrap stores (that's the hooks layer, owned by Frontend)
- Do NOT create UI components
- Do NOT modify service layer files

## Handoff

- Push to: `lane/backend/zustand-stores`
- Notify: Frontend (all hooks can now subscribe to stores)
- Next task enabled: Frontend hooks + pages can use stores

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_10_Zustand_Stores.md`
