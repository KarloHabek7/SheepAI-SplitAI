---
description: "Integration checkpoint: merge all lane branches to main with safety checks."
---

# Integration Checkpoint Workflow (`/integrate`)

You are now acting as the **Integration Manager**. This workflow runs the formal checkpoint protocol to merge lane branches into `main`.

> **Who uses this:** Team Lead (Karlo) at scheduled checkpoints (CP1 at 14:00, CP2 at 17:00, CP3 at 18:30).
> **Model recommendation:** Gemini 3.1 Pro High — procedural, low reasoning complexity.

## Pre-Checkpoint (2 min)

1. **Announce:** Tell all team members: "CHECKPOINT — commit and push your current work NOW."
2. **Wait** for confirmation that all lanes have pushed.
3. **Fetch all remote branches:**
   ```powershell
   git fetch --all
   git branch -r
   ```

## Merge Protocol (5 min)

Merge in **dependency order** to minimize conflicts:
1. **Shared types** — any additions to `app/src/types/index.ts`
2. **Backend** — API endpoints and services
3. **AI** — AI hooks and services
4. **Frontend** — UI components and pages
5. **Creative** — Assets, design tokens, pitch materials

**For each lane, execute:**
```powershell
git checkout main
git pull origin main
git merge --squash lane/<lane>/<branch>
npm run build
```

- ✅ If build passes:
  ```powershell
  git commit -m "feat(<scope>): integrate <description>"
  git push origin main
  ```

- ❌ If build fails:
  - Identify which file(s) cause the failure.
  - If quick fix (<2 min): fix it and commit.
  - If complex: `git merge --abort`, skip this lane, and continue with others. The lane owner fixes their branch for next checkpoint.

## Verify (3 min)

After all merges:
1. `npm run build` — must succeed with zero errors.
2. `npm run dev` — app must load without crashes.
3. **Smoke test:**
   - Navigate all pages — no white screens or console errors.
   - Test core user flow — primary journey works end-to-end.
   - Check responsive layout at mobile and desktop breakpoints.

## Rebase All Lanes (3 min)

Notify all team members to rebase their working branches:
```powershell
git checkout lane/<your-branch>
git pull origin main --rebase
```

If rebase conflicts occur, the lane owner resolves them locally.

## If Main Breaks

```
1. git log --oneline -5          → identify which merge broke it
2. git revert <bad-commit-hash>  → undo that merge
3. git push origin main          → push fixed main
4. Notify the lane owner         → they fix their branch
5. Re-merge at next checkpoint   → or when fix is ready
```

## Post-Checkpoint

- Announce: "Checkpoint complete. Resume work on rebased branches."
- Document in a checkpoint log what merged, what was deferred, and any known issues.

## Vision Refinement Check (AGAS — 2 min)

After verifying the build and before announcing checkpoint completion:

1. **Read** `Development_plans/PROJECT_STATE.md` → Vision Refinements table.
2. **Count** rows with Status = `⬜ Unevaluated`.
3. **If count ≥ 1:**
   - Present the unevaluated suggestions to the Team Lead in a summary table.
   - Ask: "Would you like to run `/refine` now to triage these, or defer to next checkpoint?"
   - If the Lead says yes → run the `/refine` workflow inline.
   - If the Lead says defer → continue without changes.
4. **Update project state:**
   - Recalculate and update the Overall Progress percentage based on merged work.
   - Update lane progress counters to reflect the integrated state.
   - Reconcile any cross-lane blockers that were resolved by this merge (remove resolved blockers).
   - Update Next Recommended Actions based on newly unblocked tasks.

## Checkpoint-Specific Notes

| Checkpoint | Time | Focus |
|---|---|---|
| **CP1** | 14:00 | Basic structures: page layouts, API skeletons, AI wrapper shell |
| **CP2** | 17:00 | Major merge: all features land, mock data → real data, Vercel deploy test |
| **CP3** | 18:30 | Final: bug fixes, polish, production Vercel deploy, code freeze at 18:45 |

**Out of Scope (What NOT to do):**
- Do NOT run git commands automatically — provide them for the user to execute.
- Do NOT bypass the squash merge requirement.
- Do NOT add new features during a checkpoint — only merge existing work.
