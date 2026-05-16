---
trigger: model_decision
title: "Git Conventions"
description: "Use when writing commit messages, branching, or interacting with Git."
---

# Git Conventions

> All git operations MUST follow these exact conventions. No exceptions.

1. **NEVER commit to `main`.** The `main` branch is protected. Only the Tech Lead (Karlo) merges to `main` during scheduled Integration Checkpoints. Agents must only commit to their lane's feature branch.

2. **Branch naming format:** `lane/<lane-name>/<feature-description>`
   - All lowercase, hyphens for spaces, no special characters.
   - Lane names: `lead`, `frontend`, `backend`, `ai`, `creative`, `flex`.

   ```bash
   # ✅ DO
   lane/lead/architecture-setup
   lane/frontend/dashboard-layout
   lane/backend/auth-state-store
   lane/ai/gemini-stream-hook
   lane/creative/hero-illustrations
   lane/flex/emergency-api-hotfix

   # ❌ DON'T
   feature/dashboard          # missing lane prefix
   lane/Frontend/Dashboard    # uppercase forbidden
   lane/frontend/dashboard_layout  # underscores forbidden
   lane/assets/hero-illustrations   # old lane name, use 'creative'
   ```

3. **Commit message format:** `<type>(<scope>): <description>`
   - **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - **Scopes:** `lead`, `frontend`, `backend`, `ai`, `creative`, `config`, `flex`
   - **Cross-lane scope (Team Lead only):** `lead→<target-lane>` (e.g., `lead→frontend`)
   - Description: imperative mood, lowercase, no period at end, max 72 characters.

   ```bash
   # ✅ DO
   git commit -m "feat(frontend): implement responsive telemetry dashboard grid"
   git commit -m "fix(backend): resolve null pointer in auth session handler"
   git commit -m "docs(creative): finalize pitch slide 4 market size matrix"
   git commit -m "style(creative): apply dark-mode glassmorphism theme tokens"
   git commit -m "chore(config): add shadcn-ui accordion to packages"
   git commit -m "feat(lead→frontend): unblock hero section layout"  # Team Lead cross-lane
   git commit -m "fix(lead→ai): patch streaming response parser"     # Team Lead cross-lane
   git commit -m "fix(flex): resolve cross-boundary schema conflict" # Flex mode cross-lane

   # ❌ DON'T
   git commit -m "Updated stuff"
   git commit -m "WIP"
   git commit -m "feat: add dashboard"  # missing scope
   git commit -m "Feat(Frontend): Add Dashboard."  # wrong casing, period
   git commit -m "feat(assets): ..."  # old scope, use 'creative'
   ```

4. **Commit frequently.** Make small, focused commits after each meaningful change. Each commit should represent one logical unit of work. Never bundle unrelated changes.

5. **Push regularly.** Push to the remote feature branch after every few commits to back up work and make progress visible to the team.

6. **Before committing, verify:**
   - `npm run build` passes (no build errors)
   - `git status` shows no unintended file changes
   - You are on the correct feature branch (not `main`)

7. **Shared files are additive-only.** When editing shared files (`app/src/types/index.ts`, `app/package.json`, locale files), only ADD new entries. Never delete, rename, or reorder existing entries.

8. **Checkpoint sync command.** When instructed to sync for a checkpoint, run:
   ```bash
   git add -A && git commit -m "wip: checkpoint sync" && git push
   ```

### DO / DON'T

```
✅ DO: git checkout lane/frontend/hero-section && git commit -m "feat(frontend): add hero section with gradient overlay"
❌ DON'T: git checkout main && git commit -m "added hero"

✅ DO: Add a new export to app/src/types/index.ts without touching existing lines
❌ DON'T: Reorganize or rename existing type exports in the shared types file
```
