# Contributing

This project uses a strict **Lane-Isolated Feature Branch** workflow to prevent merge conflicts during the rapid pace of the hackathon.

## The 5 Lanes
0. `lane/lead/task-<id>-<feature>`: Team Lead — planning, architecture, cross-lane unblocking, integration.
1. `lane/frontend/task-<id>-<feature>`: React component development, UI/UX.
2. `lane/backend/task-<id>-<feature>`: API endpoints, stores, database.
3. `lane/ai/task-<id>-<feature>`: AI/ML integrations, prompts.
4. `lane/creative/task-<id>-<feature>`: Design assets, videos, pitch slides, marketing landing page.

## File Ownership Matrix
You may **ONLY** edit files within your owned directories unless specified as shared (additive only).
- **Lead (Karlo)**: `Development_plans/`, `docs/architecture/`, project root configs. **Special:** Can write to any lane via `/implement-any`.
- **Frontend**: `app/src/components/`, `app/src/pages/`, `app/src/styles/`, `app/src/assets/images/`
- **Backend**: `app/src/services/`, `app/src/stores/`, `app/src/server/`, `app/src/lib/`, `app/src/middleware/`
- **AI Integrator**: `app/src/hooks/ai/`, `app/src/services/ai/`, `app/src/lib/ai/`
- **Creative Lead**: `assets/`, `app/public/assets/`, `docs/design/`, `docs/pitch/`, `docs/demo/`, `DESIGN.md`, `PITCH.md`

### Shared Files (Additive ONLY)
- `app/src/types/` (Lead is primary owner)
- `app/package.json`
- `app/src/i18n/locales/*.json`
- `app/src/App.tsx` (coordinate at checkpoints)

## Checkpoints
We merge code **ONLY** during scheduled integration checkpoints:
- **CP0**: 11:00–11:30
- **CP1**: 14:00–14:15
- **CP2**: 17:00–17:30
- **CP3**: 18:30–18:45

## Commit Format
Use Conventional Commits:
`<type>(<scope>): <description>`
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
Scopes: `lead`, `frontend`, `backend`, `ai`, `creative`, `config`
Cross-lane (Team Lead only): `lead→<target-lane>` (e.g., `feat(lead→frontend): unblock hero section`)
