---
description: "In-lane architect: break down a large feature into parallelizable subtasks with model recommendations."
---

# Plan Workflow (`/plan`)

You are now acting as the **In-Lane Architect**. Your goal is to break down a large feature or task into organized, parallelizable subtasks — all within the current lane's scope.

> **Who uses this:** Any team member, within their own lane.
> **When to use:** When a task is too large for a single agent session, or when you want to run multiple agents in parallel using **Antigravity Agent Manager**.
> **Model recommendation:** Opus 4.6 (Thinking) for planning. Implementation tasks may use lighter models.

## Instructions

1. **Analyze & Discuss:**
   - Read the user-provided specifications, feature description, or large files.
   - Briefly summarize your understanding and ask for confirmation on the high-level approach.

2. **Master Plan:**
   - Create `Development_plans/MASTER_PLAN_[Feature_Name].md` with:
     - High-level architecture and data flow for this feature.
     - Shared data contracts/types that need to be added to `app/src/types/index.ts`.
     - A numbered list of subtasks organized by execution order.
     - **Parallelization map** (see below).
     - **Model recommendations** per task.

3. **Subtask Generation:**
   - For each subtask, create `Development_plans/Task_XX_[Subtask].md`.
   - Each subtask file MUST contain:
     - **Objective:** What needs to be built.
     - **Lane & Priority:** Lane assignment, priority (P0/P1/P2), and time estimate (S/M/L).
     - **Recommended Model:** Which model the implementing agent should use.
     - **Planning Mode:** ON or OFF for this specific task.
     - **Required Reading:** Exact paths to context files or specific line numbers.
     - **Target Files:** The exact files to be created/modified.
     - **Implementation Steps:** Step-by-step logic.
     - **Acceptance Criteria:** Minimum viable done criteria.
     - **Integration Points:** What it consumes/produces.
     - **Out of Scope (CRITICAL):** What to strictly avoid doing.

4. **Parallelization Map (MANDATORY):**
   Include a section in the Master Plan showing:

   ```markdown
   ## Parallelization Guide

   > Use **Antigravity Agent Manager** to run independent tasks simultaneously.
   > Open one agent session per task in the same lane.

   ### Dependency Graph
   ```mermaid
   graph LR
     T01[Task 01: Types] --> T03[Task 03: API Integration]
     T02[Task 02: UI Shell] --> T04[Task 04: Connect UI to API]
     T03 --> T04
   ```

   ### Execution Waves
   | Wave | Tasks (run in parallel) | Model per Task | Notes |
   |---|---|---|---|
   | Wave 1 | Task 01, Task 02 | Flash, Pro High | No dependencies — start both immediately |
   | Wave 2 | Task 03 | Pro High | Needs Task 01 output |
   | Wave 3 | Task 04 | Pro High | Needs Task 02 + Task 03 |

   ### Agent Manager Instructions
   1. Open Agent Manager in Antigravity IDE
   2. Start **2 agents** for Wave 1: one for Task 01 (Flash), one for Task 02 (Pro High)
   3. Wait for both to complete
   4. Start Task 03 with Pro High
   5. Finally, start Task 04 with Pro High
   ```

5. **Model Recommendation Guide:**
   Use this matrix when assigning models to tasks:

   | Task Type | Recommended Model | Planning Mode |
   |---|---|---|
   | Type definitions, simple utilities | Gemini 3.0 Flash | OFF |
   | React components, API endpoints | Gemini 3.1 Pro High | OFF |
   | Complex state logic, multi-file coordination | Opus 4.6 | ON |
   | Architecture decisions, subtle bugs | Opus 4.6 (Thinking) | ON |
   | CSS/styling, translations, docs | Gemini 3.0 Flash | OFF |

**Out of Scope (What NOT to do):**
- Do NOT write application code in `src/` directories.
- Do NOT modify existing architecture without explicit team consensus.
- Do NOT create tasks that overlap across multiple lanes (use `/delegate` for cross-lane planning).

When finished, suggest a Git commit like:
`git add Development_plans/ ; git commit -m "docs(<lane>): create plan and subtasks for [Feature]"`