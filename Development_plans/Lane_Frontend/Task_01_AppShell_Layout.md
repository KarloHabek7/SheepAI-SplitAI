# Task 01: App Shell + Layout

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Backend T01, AI T01, Creative T01
> **Depends On:** None (can start with temp tokens if Creative hasn't delivered tokens.css yet)

## Objective
Build the root application shell: `AppShell` layout component with `Header`, `BottomNav` (mobile), routing setup in `App.tsx` with lazy-loaded pages, and `PageContainer` wrapper. This is the structural foundation every other frontend task builds on.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `AppStoreState`, `SupportedLanguage`, `Theme`
- `docs/architecture/ARCHITECTURE.md` — Section 6 (Route Map, Shared Layout)
- `app/src/styles/tokens.css` — Design tokens (if available; use temp values if not)

**Key types you'll use:**
```typescript
export type SupportedLanguage = 'hr' | 'en' | 'de' | 'it' | 'fr';
export type Theme = 'light' | 'dark' | 'system';
```

## Interface Contract
**This task PRODUCES:**
- `components/layout/AppShell.tsx` — Root layout with `<Outlet />`
- `components/layout/Header.tsx` — Logo, nav tabs, language selector, theme toggle
- `components/layout/BottomNav.tsx` — Mobile bottom navigation (Chat, Map, Report, Pazar)
- `components/layout/PageContainer.tsx` — Content wrapper with padding/max-width
- Updated `App.tsx` with lazy-loaded routes and `<Suspense>` fallback
- `components/ui/Spinner.tsx` — Loading spinner for Suspense fallback

**This task CONSUMES:**
- `types/index.ts` — `SupportedLanguage`, `Theme`
- `styles/tokens.css` — Design tokens

## Implementation Steps
1. Create `components/ui/Spinner.tsx` — simple animated loading spinner
2. Create `components/layout/PageContainer.tsx` — content wrapper div
3. Create `components/layout/Header.tsx` — top bar with logo, nav links, language dropdown, theme toggle
4. Create `components/layout/BottomNav.tsx` — mobile-only fixed bottom bar with icons (Map, Chat, Report, Pazar)
5. Create `components/layout/AppShell.tsx` — wraps Header + Outlet + BottomNav
6. Update `App.tsx` — define all routes with `React.lazy()`, wrap in `<Suspense>`, use `AppShell` as layout route
7. Create placeholder page stubs (`pages/MapPage.tsx`, `pages/ChatPage.tsx`, etc.) that just show the page name — so routing works without real content
8. Add responsive CSS: Header visible on desktop, BottomNav visible on mobile (<768px)

## Acceptance Criteria
- [ ] All routes defined in architecture Section 6.1 are present in `App.tsx`
- [ ] Navigation between pages works (clicking nav links changes route)
- [ ] Header shows on desktop, BottomNav shows on mobile
- [ ] Lazy loading works (Spinner shows briefly on first page load)
- [ ] All components use tokens.css variables (or temp values with `/* TODO: replace with tokens */` comments)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real page content (just stubs)
- Do NOT create stores or services
- Do NOT add i18n keys (just hardcode English for now)
- Do NOT modify files outside `components/`, `pages/`, `App.tsx`, `App.css`

## Handoff
- Push to: `lane/frontend/app-shell`
- Notify: All lanes (routing is now available)
- Next task enabled: Frontend T02, T03, T04, T05, T06, T07 (all page tasks)

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_01_AppShell_Layout.md`
