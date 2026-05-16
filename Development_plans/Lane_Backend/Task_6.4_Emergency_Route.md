# Task 6.4: Emergency Route

> **Lane:** Backend
> **Priority:** P2-Medium
> **Estimated Effort:** XS (<15min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task_01 (BFF Scaffold) ✅
> **Can Parallelize With:** Task 6.1, 6.2, 6.3

## Objective

Create `GET /api/emergency/:type` returning multilingual emergency instructions for Split-specific alert types. Supports `?lang=hr|en|de` query parameter.

## Required Reading

- `app/src/types/index.ts` — `EmergencyInfo` (lines 268–276), `EmergencyContact` (lines 279–283), `EmergencyType` (lines 71–77), `SupportedLanguage` (line 16), `APIResponse` (lines 366–371)
- `app/src/server/routes/report.ts` — Pattern reference

## Target Files

- **CREATE:** `app/src/server/routes/emergency.ts`

## Implementation Steps

1. Create Express Router with `GET /:type` handler
2. Define multilingual emergency data structure — `Record<EmergencyType, Record<string, EmergencyInfo>>` covering at least `hr`, `en`, `de` for each type:
   - **`bura_wind`**: Instructions for the bura storm (secure windows, avoid bridges, stay indoors), contacts: 112, Vatrogasci 193
   - **`flood`**: Flash flood instructions (move to higher ground, avoid underpasses), contacts: 112, Vatrogasci 193, Hitna 194
   - **`earthquake`**: Drop-cover-hold, stay away from buildings, aftershock warnings, contacts: 112, all emergency
   - **`fire`**: Evacuation instructions, contacts: Vatrogasci 193, 112
   - **`air_quality`**: Stay indoors, close windows, contacts: 112
   - **`general`**: Generic safety tips with all emergency contacts
3. Emergency contacts (shared across all types, in respective language):
   - Opći hitni broj / General Emergency: 112
   - Vatrogasci / Fire Brigade: 193
   - Hitna pomoć / Ambulance: 194
   - Policija / Police: 195
4. Extract `type` from `req.params.type` and `lang` from `req.query.lang` (default: `'hr'`)
5. Validate `type` exists. If not → 404 `{ code: "ALERT_TYPE_NOT_FOUND" }`
6. If `lang` is unsupported, fall back to `'en'`
7. Return `APIResponse<EmergencyInfo>` with `lastUpdated` set to current timestamp
8. Try/catch with 500 fallback

## Acceptance Criteria

- [ ] `GET /api/emergency/bura_wind` returns Croatian instructions by default
- [ ] `GET /api/emergency/bura_wind?lang=en` returns English instructions
- [ ] `GET /api/emergency/bura_wind?lang=de` returns German instructions
- [ ] `GET /api/emergency/bura_wind?lang=jp` falls back to English
- [ ] Contacts include real Split emergency numbers (112, 193, 194, 195)
- [ ] Invalid type returns 404
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] Export default router

## Out of Scope (CRITICAL)

- Do NOT mount in `server/index.ts` (Task 6.5)
- Do NOT implement Italian/French — only hr, en, de for demo
- Do NOT create UI components
- Do NOT connect to real alert APIs

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_6.4_Emergency_Route.md`
