---
description: "Vision refinement: triage agent-suggested improvements and fold approved ones into the plan."
---

# Vision Refinement Workflow (`/refine`)

You are now acting as the **Vision Curator**. This workflow evaluates improvement suggestions that agents have proposed during task execution, and decides which ones become real tasks.

> **Who uses this:** Team Lead (Karlo) — can be triggered anytime, plus runs automatically at integration checkpoints.
> **Model recommendation:** Gemini 3.1 Pro High — structured evaluation, low reasoning complexity.
> **Prerequisite:** `Development_plans/PROJECT_STATE.md` must exist with at least one `⬜ Unevaluated` entry in the Vision Refinements table.

## Instructions

1. **Read Current State:**
   - Read `Development_plans/PROJECT_STATE.md` — focus on the Vision Refinements table.
   - Read `Development_plans/GOAL_TREE.md` — understand current pillars, features, and task coverage.
   - Note the Overall Progress percentage — this informs time feasibility.

2. **Filter Unevaluated Suggestions:**
   - Extract all rows from the Vision Refinements table where Status = `⬜ Unevaluated`.
   - If none exist, inform the user: "No unevaluated refinements. Nothing to triage."
   - If suggestions exist, present them in a numbered list for review.

3. **Evaluate Each Suggestion:**
   For each unevaluated suggestion, assess against these criteria:

   | Criterion | Question | Weight |
   |---|---|---|
   | **North Star Alignment** | Does this support the project vision? | High |
   | **Demo Impact** | Will judges/users notice this improvement? | High |
   | **Time Feasibility** | Can it be completed in remaining time without displacing P0 tasks? | Critical |
   | **Conflict Risk** | Does it clash with in-progress work or require cross-lane coordination? | Medium |
   | **Effort vs. Value** | Is the improvement worth the implementation cost? | Medium |

   Present your assessment as a table:

   | # | Suggestion | Alignment | Demo Impact | Feasible | Risk | Recommendation |
   |---|---|---|---|---|---|---|
   | R01 | [desc] | ✅ High | ✅ High | ✅ Yes | ⚠️ Low | **Approve** |
   | R02 | [desc] | ✅ Med | ❌ Low | ✅ Yes | ✅ None | **Defer** |

4. **Present Recommendations to Team Lead:**
   - Group suggestions into three categories: **Approve**, **Defer**, **Reject**.
   - For each **Approve**: explain what task to create and which lane/pillar it belongs to.
   - For each **Defer**: explain why it's good but not now — move to Post-MVP Ideas.
   - For each **Reject**: explain why it doesn't fit.
   - Ask the Team Lead for confirmation before proceeding.

5. **Execute Decisions (after Team Lead confirms):**

   **For each ✅ Approved suggestion:**
   - Create a new task file in `Development_plans/Lane_<Lane>/Task_XX_<description>.md` using the standard task template from `/delegate`.
   - Add the task to `Development_plans/GOAL_TREE.md` under the appropriate Pillar → Feature. If no existing Feature fits, create a new one.
   - Update the lane's task table in `Development_plans/PROJECT_STATE.md` with the new task (Status: `⬜ Not Started`).
   - Increment the lane's total task count.
   - Update the Vision Refinements table: set Status to `✅ Approved`.
   - If the task has dependencies, update `Development_plans/PARALLEL_GUIDE.md`.

   **For each 🕐 Deferred suggestion:**
   - Add it to the "Post-MVP Ideas" table in `Development_plans/GOAL_TREE.md` with the deferral reason.
   - Update the Vision Refinements table: set Status to `🕐 Deferred`.

   **For each ❌ Rejected suggestion:**
   - Update the Vision Refinements table: set Status to `❌ Rejected — [brief reason]`.

6. **Update Overall Progress:**
   - Recalculate the total task count (it may have increased due to approved suggestions).
   - Update the Overall Progress percentage in `PROJECT_STATE.md`.
   - Update "Next Recommended Actions" for any lane that received new tasks.

7. **Output Summary:**
   ```
   Vision Refinement Complete:
   - Evaluated: N suggestions
   - ✅ Approved: X (new tasks created)
   - 🕐 Deferred: Y (added to Post-MVP)
   - ❌ Rejected: Z
   - New total task count: [old] → [new]
   ```

## When This Runs

| Trigger | Who Initiates | Context |
|---|---|---|
| **Manual** | Team Lead says `/refine` or "evaluate refinements" | Anytime |
| **At checkpoints** | Automatic during `/integrate` Step "Vision Refinement Check" | After merge verification |
| **Threshold** | Team Lead notices ≥3 unevaluated entries | Proactive cleanup |

## Out of Scope (What NOT to do)
- Do NOT approve refinements without Team Lead confirmation.
- Do NOT implement the approved tasks — only create the task files. Agents pick them up via `/execute`.
- Do NOT modify existing completed tasks — only add new ones.
- Do NOT remove rejected suggestions from the table — keep them for audit trail.

When finished, suggest:
`git add Development_plans/ ; git commit -m "docs(lead): triage vision refinements — [X] approved, [Y] deferred, [Z] rejected"`
