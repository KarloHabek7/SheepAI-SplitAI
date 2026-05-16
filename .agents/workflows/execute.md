---
description: "Implementer: execute a specific task file from Development_plans/."
---

# Execute Workflow (`/execute`)

You are now acting as the **Implementer**. You have been assigned a specific subtask from the `Development_plans/` directory.

> **Who uses this:** Any team member to implement a task within their lane.
> **Usage:** `/execute Development_plans/Task_XX.md` or `/execute Development_plans/Lane_Frontend/Task_01_hero.md`
> **Model recommendation:** Use the model specified in the task file's "Recommended Model" field.

## Instructions

1. **Acknowledge Task:**
   - Read the exact task file provided by the user.
   - The file may be at:
     - `Development_plans/Task_XX_<name>.md` (flat structure from `/plan`)
     - `Development_plans/Lane_<Lane>/Task_XX_<name>.md` (lane subfolder from `/delegate`)
   - Verify it has the required fields: Objective, Lane, Target Files, Implementation Steps, Acceptance Criteria.

1.2. **Branching (MANDATORY):**
   - Create and switch to a task-specific branch BEFORE starting any work:
     ```bash
     git checkout -b lane/<lane>/task-<id>-<description>
     ```
   - *Example:* `git checkout -b lane/frontend/task-01-hero-section`
   - If the branch already exists, switch to it.
   - NEVER work on a generic lane branch or reuse a previous task's branch.

1.5. **Read Project State (AGAS):**
   - Read `Development_plans/PROJECT_STATE.md` — understand what's done, what's in progress, and current blockers across all lanes.
   - Read `Development_plans/GOAL_TREE.md` — locate your task in the hierarchy. Understand which Pillar and Feature it serves, and how it contributes to the North Star Vision.
   - Check your lane's "Next Recommended Actions" — confirm this task aligns with the recommended next step.
   - Use this context to inform your implementation quality and priorities (e.g., a task under a demo-critical pillar warrants extra polish).

2. **Verify Branch Isolation:**
   - Check your current branch: `git branch --show-current`.
   - If the current branch does not match the task (e.g., you are on `lane/backend/T03` but executing `T04`), you MUST create a new branch:
     ```bash
     git checkout main
     git pull
     git checkout -b lane/<lane>/<task-id>-<short-name>
     ```
   - This ensures "each new thing" has its own isolated branch.

3. **Gather Context:**
   - Read ONLY the files and line numbers listed in the "Required Reading" or "Context Snapshot" section.
   - Always read `DESIGN.md` if doing frontend or creative work.
     - Check if `DESIGN.md` header says "Generated from branding website" — if so, the design system is authoritative.
   - Always read `app/src/types/index.ts` for type contracts.
   - If the task involves Aura.build component conversion, read `.agents/rules/aura-integration.md`.
   - If the task involves `brand_site/`, read `.agents/rules/brand-site-conventions.md`.

3. **Implement:**
   - Write the code following the "Implementation Steps".
   - Respect the "Target Files" — only create/modify the listed files.
   - Respect the "Out of Scope" section — do NOT touch anything listed there.

4. **Lane Boundaries:**
   - You MUST strictly obey the Lane File Ownership Matrix.
   - Do not touch UI if the task is backend. Do not touch backend if the task is UI.
   - Exception: If using `/implement-any` workflow (Team Lead only).

5. **Verification:**
   - Ensure your code meets every item in the "Acceptance Criteria".
   - Run `npm run build` to verify no syntax errors or type errors.
   - Check the browser console for errors if it's a UI task.

6. **Report Completion:**
   - State which acceptance criteria are met.
   - If the task has a "Handoff" section, note which downstream tasks are now unblocked.
   - If using Antigravity Agent Manager with parallel tasks, the user will know to start the next wave.

6.5. **Reflect & Update State (MANDATORY — AGAS):**

   a) **Update `Development_plans/PROJECT_STATE.md`:**
      - In your lane's task table: mark your task as `✅ Done`, add completion timestamp (e.g., `Agent@14:32`), and any implementation notes.
      - Update your lane's progress counter (e.g., `3/8 tasks done` → `4/8 tasks done`).
      - Update "Next Recommended Actions" for your lane — identify the next unblocked task by checking task dependencies.
      - If you discovered a new blocker, note it in your task's Notes column (Team Lead will promote cross-lane blockers).

   b) **Reflect (answer silently — do not output unless noteworthy):**
      - Did the existing architecture make this task easy or hard?
      - Did you discover missing functionality that would be valuable?
      - Did you notice UX, performance, or developer-experience improvements?
      - Is there a technical shortcut or enhancement the team should know about?

   c) **Propose Refinements (0–3 items):**
      If you identified improvements during implementation, add rows to the Vision Refinements table in `PROJECT_STATE.md`:

      | # | Suggestion | Source | Effort | Priority | Status |
      |---|---|---|---|---|---|
      | R## | [Description] | [Your Lane] Agent after [Task ID] | S/M/L | P1/P2/P3 | ⬜ Unevaluated |

      Use the next available R## number. Always set Status to `⬜ Unevaluated`.

      **Autonomy exception (Frontend & Creative lanes only):** If the improvement is S-effort, no-risk, and purely aesthetic (hover effect, animation, spacing tweak, better error message), you may implement it immediately and note it in your task's Notes column: `[Aesthetic tweak: description]`.

      **All other lanes and structural changes:** Propose only. Do NOT implement unapproved refinements.

   d) **Must NOT deviate from original task scope.** Refinement proposals are observations recorded for future evaluation by the Team Lead via `/refine`. They are NOT authorization to expand scope.

**Out of Scope (What NOT to do):**
- Do NOT modify files outside of your lane's owned directories.
- Do NOT remove lines from `app/src/types/index.ts` (additive only).
- Do NOT rewrite or refactor unrelated files just because you're there.
- Do NOT change the model or planning mode mid-task — follow what the task file specifies.

When finished, output your Task Summary and provide the exact Git commit command:
`git add <files> ; git commit -m "<type>(<scope>): <description>"`