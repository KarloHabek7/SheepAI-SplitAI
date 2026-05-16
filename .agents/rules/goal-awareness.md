---
trigger: always_on
title: "Goal Awareness"
---

# Goal Awareness Rules

> These rules ensure agents maintain persistent awareness of the project vision, current progress, and next steps. They enable agents to work with full context rather than in isolation.

1. **Read project state before any work.** If `Development_plans/PROJECT_STATE.md` exists, read it BEFORE starting any implementation. This file is the single source of truth for:
   - What has been completed across all lanes
   - What is currently in progress
   - What blockers exist
   - What your lane's next recommended action is
   - What vision refinements have been proposed

2. **Read the goal tree before any work.** If `Development_plans/GOAL_TREE.md` exists, locate your current task within the hierarchy. Understand:
   - Which **Pillar** your task belongs to (the strategic theme)
   - Which **Feature** your task contributes to
   - How your task connects to the **North Star Vision**
   - This context should influence the **quality and intent** of your implementation — a task under "Instant Dashboard Clarity" demands visual polish; a task under "Effortless Record-Keeping" demands UX simplicity.

3. **Update project state after completing a task (MANDATORY).** After finishing any task via `/execute`, you MUST update `Development_plans/PROJECT_STATE.md`:
   - **Your lane's task table:** Mark your task as `✅ Done`, add completion timestamp (e.g., `Agent@14:32`), add any implementation notes.
   - **Your lane's progress counter:** Increment the done count (e.g., `3/8 tasks done` → `4/8 tasks done`).
   - **Next Recommended Actions:** Update your lane's entry — identify the next unblocked task by checking the task dependency chain.
   - **Current Blockers:** If you discovered a new blocker during implementation, add it with your lane tag. If you resolved an existing blocker, remove it.

4. **Hybrid ownership for PROJECT_STATE.md.** To prevent merge conflicts:
   - **Agents update ONLY their own lane's section** (their lane's task table, progress counter, and Next Recommended Actions entry).
   - **Team Lead updates cross-lane sections:** Overall Progress percentage, Current Blockers (cross-lane items), and Vision Refinements Status column (approval/rejection decisions).
   - If you need to note a cross-lane blocker, add it to your lane's task Notes column. The Team Lead will promote it to the Blockers section at the next checkpoint.

5. **Vision refinement proposals.** If you notice improvements during implementation (missing functionality, UX enhancements, performance optimizations, better approaches), you may propose them by adding rows to the Vision Refinements table:

   | # | Suggestion | Source | Effort | Priority | Status |
   |---|---|---|---|---|---|
   | R## | [Description] | [Lane] Agent after [Task ID] | S/M/L | P1/P2/P3 | ⬜ Unevaluated |

   - Use the next available `R##` number.
   - Always set Status to `⬜ Unevaluated` — you do NOT have authority to approve your own suggestions.
   - Limit to **0–3 refinements per task** to avoid noise.

6. **Aesthetic autonomy clause (Frontend & Creative lanes only).** Agents operating in the Frontend or Creative lanes may implement **S-effort, no-risk, purely aesthetic** improvements immediately without a proposal. This includes:
   - ✅ Adding a hover effect or micro-animation
   - ✅ Improving spacing, alignment, or visual rhythm
   - ✅ Adding a CSS transition that enhances UX
   - ✅ Improving an error message or placeholder text
   - ❌ NOT: Adding new components, routes, or features
   - ❌ NOT: Changing data flow, API contracts, or state logic
   - ❌ NOT: Modifying files outside your lane
   - When using this autonomy, note the improvement in your task's Notes column: `[Aesthetic tweak: added hover scale to cards]`.

7. **No task deviation (ALL lanes).** Agents must NOT deviate from their assigned task scope. The reflection and refinement step is for **observations**, not **authorization to expand scope**. If you want to suggest adjustments:
   - Add entries to the Vision Refinements table
   - Do so only in the post-task reflection step (Step 6.5 of `/execute`)
   - Do NOT silently implement structural changes
   - The Team Lead will evaluate proposals via `/refine`

8. **Backend and AI lanes: strict propose-only.** Backend and AI lane agents must ALWAYS propose improvements through the Vision Refinements table. They have NO aesthetic autonomy exception. This is because changes in these lanes affect data contracts and service interfaces that other lanes depend on.

### DO / DON'T

```
✅ DO: Read PROJECT_STATE.md, see your lane has 3/8 done, find your task is next, then start
❌ DON'T: Jump straight into implementation without checking current project state

✅ DO: Read GOAL_TREE.md, see your MetricCard is under "Instant Dashboard Clarity" pillar, make it visually impactful
❌ DON'T: Build a minimal MetricCard because the task file only says "create MetricCard component"

✅ DO: After completing a task, update your lane's row in PROJECT_STATE.md and propose 1 refinement you noticed
❌ DON'T: Finish a task and immediately suggest a git commit without updating state

✅ DO (Frontend): Notice cards need a hover effect, implement it (S-effort, aesthetic), note in task Notes
❌ DON'T (Backend): Notice the API could return extra fields, silently add them without a proposal

✅ DO: Propose "R07: Add offline sync indicator to navbar" as a refinement
❌ DON'T: Implement offline sync because you think it would be nice
```
