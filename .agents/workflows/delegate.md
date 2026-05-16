---
description: "Phase 2: Create lane-specific task packages with full context for team members to /execute."
---

# Delegation Workflow (`/delegate`)

You are now acting as the **Team Orchestrator**. This is **Phase 2** of the hackathon — breaking the architecture into executable task packages that team members pick up with `/execute`.

> **Who uses this:** Team Lead (Karlo) to create delegation-ready task packages.
> **Model recommendation:** Opus 4.6 — needs multi-file awareness and cross-lane understanding.
> **Prerequisite:** Run `/architect` first. Read `Development_plans/MASTER_PLAN.md` and `app/src/types/index.ts`.

## Instructions

1. **Read Context:**
   - Read `Development_plans/MASTER_PLAN.md` (architecture, lane assignments, dependencies).
   - Read `app/src/types/index.ts` (shared type contracts).
   - Read `docs/architecture/ARCHITECTURE.md` (system diagram, API catalog).
   - Read `DESIGN.md` if it exists (design tokens for frontend/creative tasks).

2. **Identify Task Breakdown:**
   - For the feature(s) the user describes, identify all subtasks.
   - Assign each subtask to the correct lane: Frontend, Backend, AI, or Creative.
   - **UI Pipeline tasks:** If the UI hasn't been generated yet, include:
     - Creative lane: `/brand-site` task (clone + customize Aura template)
     - Creative lane: `/design-extract` task (generate DESIGN.md + tokens.css)
     - Frontend/Creative lane: `/stitch-generate` task (generate app UI via Stitch)
     - Frontend lane: `/aura-component` tasks (cherry-pick refinement components)
   - Identify **dependencies** between tasks (e.g., "Brand site must deploy before design-extract").
   - Identify which tasks can run **in parallel** (e.g., brand-site ∥ architecture).

3. **Create Per-Lane Task Folders:**
   Create organized task files under `Development_plans/`:
   ```
   Development_plans/
   ├── MASTER_PLAN.md                          (already exists)
   ├── PARALLEL_GUIDE.md                       (created by this workflow)
   ├── Lane_Frontend/
   │   ├── Task_01_<description>.md
   │   └── Task_02_<description>.md
   ├── Lane_Backend/
   │   ├── Task_01_<description>.md
   │   └── Task_02_<description>.md
   ├── Lane_AI/
   │   └── Task_01_<description>.md
   ├── Lane_Creative/
   │   └── Task_01_<description>.md
   └── Lane_Lead/                              (tasks Karlo will do himself)
       └── Task_01_<description>.md
   ```

3.5. **Populate Project State (AGAS):**
   - Open `Development_plans/PROJECT_STATE.md` (created by `/architect`).
   - For each lane, populate the task table with all tasks created in Steps 3–4.
   - Set every task's Status to `⬜ Not Started`.
   - Set each lane's progress counter to `0/N tasks done` (where N is the task count for that lane).
   - Update Overall Progress to `0/TOTAL tasks complete (0%)`.
   - Populate "Next Recommended Actions" for each lane — identify which task(s) have no dependencies and can start immediately.
   - Leave Vision Refinements and Current Blockers empty.

4. **Task File Template (MANDATORY):**
   Every task file MUST follow this exact structure:

   ```markdown
   # Task XX: [Title]

   > **Lane:** [Frontend / Backend / AI / Creative / Lead]
   > **Priority:** [P0-Critical / P1-High / P2-Medium]
   > **Estimated Effort:** [S (<30min) / M (30-60min) / L (60-120min)]
   > **Recommended Model:** [Gemini 3.0 Flash / Gemini 3.1 Pro High / Opus 4.6 / Opus 4.6 Thinking]
   > **Planning Mode:** [ON / OFF]
   > **Can Parallelize With:** [Task IDs that can run simultaneously, or "None"]
   > **Depends On:** [Task IDs that must complete first, or "None"]

   ## Objective
   [What needs to be built — clear, specific, one paragraph max]

   ## Context Snapshot
   **Read these files before starting:**
   - `app/src/types/index.ts` — [specific types relevant to this task]
   - `DESIGN.md` — [specific tokens relevant, if UI task]
   - [any other files with specific line numbers if needed]

   **Key types you'll use:**
   ```typescript
   // Paste the exact type definitions this task needs
   ```

   ## Interface Contract
   **This task PRODUCES:**
   - [Exported component / API endpoint / hook / asset]
   - [What other lanes will consume from this]

   **This task CONSUMES:**
   - [Types, hooks, services from other lanes]

   ## Implementation Steps
   1. [Step 1 — be specific]
   2. [Step 2]
   3. [Step 3]

   ## Acceptance Criteria
   - [ ] [Verifiable criterion 1]
   - [ ] [Verifiable criterion 2]
   - [ ] `npm run build` passes

   ## Out of Scope (CRITICAL)
   - Do NOT [specific thing to avoid]
   - Do NOT modify files outside of [lane's directories]

   ## Handoff
   - Push to: `lane/<lane>/<branch-name>`
   - Notify: [who needs to know when this is done]
   - Next task enabled: [Task ID this unblocks, if any]

   ---
   ## Ready-to-Execute
   > Paste this into your Antigravity chat to start:
   > `/execute Development_plans/Lane_<Lane>/Task_XX_<description>.md`
   ```

5. **Create Parallelization Guide:**
   Create `Development_plans/PARALLEL_GUIDE.md` containing:

   - **Dependency Graph** (Mermaid diagram showing task ordering)
   - **Parallel Execution Table:**
     | Wave | Tasks Running in Parallel | Agents Needed | Notes |
     |---|---|---|---|
     | Wave 1 | Backend T01, Frontend T01, Creative T01 | 3 | No dependencies |
     | Wave 2 | AI T01 (needs Backend T01 types) | 1 | Start after Wave 1 |
     | Wave 3 | Frontend T02 (needs AI hook) | 1 | Start after Wave 2 |
   - **Antigravity Agent Manager note:** "Use the Agent Manager to run Wave 1 tasks simultaneously — open 3 agent sessions, one per task."
   - **Model assignment per task** — which model each agent session should use.

5.5. **Populate Goal Tree (AGAS):**
   - Open `Development_plans/GOAL_TREE.md` (created by `/architect`).
   - For each task created, place it under the correct Pillar → Feature with a link to its task file:
     `- [ ] [Lane] Task XX: [Description] — \`Development_plans/Lane_[Lane]/Task_XX_[name].md\``
   - If no existing Feature under a Pillar fits a task, create a new Feature entry.
   - Ensure every task appears in the tree **exactly once**.
   - All tasks should be marked as `- [ ]` (unchecked).
   - Verify that every Pillar defined by `/architect` has at least one Feature with tasks.

6. **Summary Output:**
   Print a table of all created tasks:
   | Lane | Task | Priority | Effort | Depends On | Parallel With |
   |---|---|---|---|---|---|
   | Frontend | T01 Page Layout | P0 | M | None | Backend T01, Creative T01 |
   | Backend | T01 API Types | P0 | S | None | Frontend T01, Creative T01 |
   | ... | ... | ... | ... | ... | ... |

7. **Transition:**
   - Tell the user: "Task packages created. Distribute the `/execute` commands to your team, or use Agent Manager to run parallel tasks."
   - If Karlo wants to implement some tasks himself: "Run `/implement-any` for cross-lane work, or `/execute` for tasks in `Lane_Lead/`."

**Out of Scope (What NOT to do):**
- Do NOT write application code — only task specifications.
- Do NOT create tasks that span multiple lanes (split them).
- Do NOT create tasks without the mandatory template fields.

When finished, suggest:
`git add Development_plans/ ; git commit -m "docs(config): create delegation task packages for [feature]"`
