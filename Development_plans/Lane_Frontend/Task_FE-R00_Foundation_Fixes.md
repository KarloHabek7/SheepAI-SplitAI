# Task FE-R00: Foundation Fixes

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** S (15 min)
> **Type:** 🤖 Agent solo (no user input needed)
> **Planning Mode:** OFF
> **Depends On:** None

## Objective

Fix critical bugs, extract inline mock data from pages, and create missing architecture files. This unblocks all subsequent tasks.

## Required Reading

- `app/src/pages/EmergencyPage.tsx` — 350+ lines of inline mock data to extract
- `app/src/pages/MapPage.tsx` — line 46, `window.location.href` bug
- `app/src/pages/ChatPage.tsx` — inline mock prompts/messages
- `app/src/pages/PazarFeedPage.tsx` — inline mock listings
- `app/src/components/ui/` — missing barrel export
- `DESIGN.md` — for icon consistency reference

## Target Files

### Create:
- `app/src/utils/mockData/emergencyData.ts` — extracted emergency mock data
- `app/src/utils/mockData/chatData.ts` — extracted chat mock data
- `app/src/utils/mockData/pazarData.ts` — extracted pazar mock data
- `app/src/components/ui/index.ts` — barrel export

### Modify:
- `app/src/pages/EmergencyPage.tsx` — import from mockData, show all 5 languages
- `app/src/pages/MapPage.tsx` — `useNavigate()` instead of `window.location.href`
- `app/src/pages/ChatPage.tsx` — import from mockData
- `app/src/pages/PazarFeedPage.tsx` — import from mockData
- All components using `material-symbols-outlined` → standardize to `material-symbols-rounded`

## Implementation Steps

1. Create `utils/mockData/` directory
2. Extract emergency mock data (~350 lines) to `emergencyData.ts`
3. Extract chat mock data (prompts, initial message) to `chatData.ts`
4. Extract pazar mock data (listings array) to `pazarData.ts`
5. Update EmergencyPage to import from `emergencyData.ts` and show all 5 languages in switcher
6. Update MapPage: replace `window.location.href = '/report'` with `useNavigate()` from react-router-dom
7. Update ChatPage and PazarFeedPage to import from their mock files
8. Create `components/ui/index.ts` barrel exporting `Spinner`
9. Grep all files for `material-symbols-outlined` and change to `material-symbols-rounded`
10. Run `npm run build` to verify

## Acceptance Criteria

- [ ] No inline mock data in any page file (all extracted to `utils/mockData/`)
- [ ] MapPage uses `useNavigate()` — no `window.location.href`
- [ ] EmergencyPage shows all 5 languages (hr, en, de, it, fr) in switcher
- [ ] All icons use `material-symbols-rounded` consistently
- [ ] `components/ui/index.ts` barrel export exists
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT redesign any component visuals (that's FE-R01+)
- Do NOT add new components
- Do NOT modify CSS styling
- Do NOT change any component's public interface/props
