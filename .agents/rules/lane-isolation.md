---
trigger: always_on
title: "Lane Isolation"
---

# Lane Isolation Rules

> These rules prevent merge conflicts by enforcing strict file ownership across the 5 development lanes. Violating these rules WILL cause integration failures.

1. **You may ONLY modify files in your lane's owned directories.** Before editing any file, verify it belongs to your lane. If it doesn't, STOP and inform the user. **Exceptions:** Lane 0 (Team Lead) may use `/implement-any`, and ANY agent utilizing the `/flex` workflow may bypass this rule.

2. **Lane ownership matrix:**

   | Lane | Role | Owned Directories |
   |---|---|---|
   | **Lane 0: Lead** | Team Lead (Karlo) | `Development_plans/`, `docs/architecture/`, project root config files. **Special:** Can write to any lane via `/implement-any` workflow. |
   | **Lane 1: Frontend** | Frontend Lead | `app/src/components/`, `app/src/pages/`, `app/src/styles/`, `app/src/assets/images/` |
   | **Lane 2: Backend** | Backend Lead | `app/src/services/` (non-AI), `app/src/stores/`, `app/src/server/`, `app/src/lib/` (non-AI), `app/src/middleware/` |
   | **Lane 3: AI** | AI/ML Integrator | `app/src/hooks/ai/`, `app/src/services/ai/`, `app/src/lib/ai/` |
   | **Lane 4: Creative** | Creative Lead (Assets + Pitch) | `assets/`, `app/public/assets/`, `brand_site/`, `docs/design/`, `docs/pitch/`, `docs/demo/`, `DESIGN.md`, `PITCH.md` |
   | **Lane 5: Flex** | General Purpose / Emergency | All directories (`app/src/`, `assets/`, etc.). **Special:** Used via `/flex` for multi-lane patches. |

3. **Shared files are additive-only.** The following files may be edited by any lane, but ONLY by ADDING new entries. Never delete, rename, or reorder existing lines:
   - `app/src/types/index.ts` — Add new type exports only (Lane 0 is primary owner during architecture phase)
   - `app/src/App.tsx` — Add new routes only (coordinate at checkpoints)
   - `app/package.json` — Add new dependencies only, never remove existing ones
   - `app/src/i18n/locales/*.json` — Add new translation keys only, never rename existing keys

4. **Read-only access to other lanes.** You may READ files from other lanes to understand interfaces, types, or behavior. You must NEVER WRITE to files owned by another lane.

5. **If you need something from another lane, ask.** If you need a type, API endpoint, or asset that doesn't exist yet:
   - Tell the user: "I need `[type/endpoint/asset]` from the [Lane Name] lane."
   - Do NOT create a temporary version in your own directory. Wait for the owner to provide it.

6. **Cross-lane integration happens only at checkpoints.** Do not attempt to wire up real API calls or replace mock data outside of the scheduled Integration Checkpoints (CP1 at 14:00, CP2 at 17:00, CP3 at 18:30).

7. **Identify your lane at conversation start.** When the user begins a new task, confirm which lane you are operating in. If unclear, ask: "Which lane am I working in? (Lead, Frontend, Backend, AI, or Creative)"

8. **Team Lead cross-lane access (Lane 0 only):**
   - The Team Lead may write to ANY lane's directories when using the `/implement-any` workflow.
   - Before cross-lane writes, the agent MUST run `git status` and check for conflicts.
   - Cross-lane commits use the `lead→<lane>` scope: `feat(lead→frontend): description`.
   - The lane owner should review cross-lane changes at the next checkpoint.
   - This privilege exists to **unblock** stuck lanes, not to do routine lane work.

### DO / DON'T

```
✅ DO (Frontend agent): Create a new component in app/src/components/Dashboard.tsx
❌ DON'T (Frontend agent): Modify app/src/services/auth.ts (owned by Backend)

✅ DO (Backend agent): Add a new type to app/src/types/index.ts (shared, additive)
❌ DON'T (Backend agent): Rename an existing type in app/src/types/index.ts

✅ DO (AI agent): Read app/src/types/index.ts to understand the APIResponse type
❌ DON'T (AI agent): Create app/src/components/AIChatWidget.tsx (owned by Frontend)

✅ DO (Lead agent): Use /implement-any to fix a blocked Frontend component
❌ DON'T (Lead agent): Bypass /implement-any safety checks for convenience

✅ DO: Tell the user "I need the User type from Backend lane" and wait
❌ DON'T: Create your own User type in the Frontend directory
```
