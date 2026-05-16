# Task 01.1: UI Primitives & Page Stubs

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** S (20-40min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 01.2
> **Depends On:** None

## Objective
Create the foundational UI primitives (`Spinner`, `PageContainer`) and empty placeholder page components for all main routes. These are needed before we can set up the routing system.

## Context Snapshot
**Read these files before starting:**
- `docs/architecture/ARCHITECTURE.md` — Section 6.1 (Route Map)
- `app/src/styles/tokens.css` — Design tokens (if available)

## Interface Contract
**This task PRODUCES:**
- `app/src/components/ui/Spinner.tsx`
- `app/src/components/layout/PageContainer.tsx`
- `app/src/pages/MapPage.tsx`
- `app/src/pages/ChatPage.tsx`
- `app/src/pages/ReportPage.tsx`
- `app/src/pages/PazarFeedPage.tsx`
- `app/src/pages/PazarSubmitPage.tsx`
- `app/src/pages/EmergencyPage.tsx`
- `app/src/pages/AdminDashboardPage.tsx`
- `app/src/pages/AdminReportsPage.tsx`

## Implementation Steps
1. Create `components/ui/Spinner.tsx` as a simple CSS animated loading spinner.
2. Create `components/layout/PageContainer.tsx` which wraps page content with appropriate max-width and padding.
3. Create empty placeholder components for all pages listed in the interface contract. Each page should just render its name (e.g., `<div>Map Page Stub</div>`).

## Acceptance Criteria
- [ ] Spinner component exists and is animated.
- [ ] PageContainer component exists.
- [ ] All 8 page stubs exist and have default exports.
- [ ] `npm run build` passes.

## Out of Scope (CRITICAL)
- Do NOT implement real page content for the stubs.
- Do NOT configure routing.
- Do NOT modify `App.tsx`.

## Handoff
- Push to: `lane/frontend/app-shell`
- Next task enabled: Task 01.3

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_01.1_UI_Primitives_Stubs.md`
