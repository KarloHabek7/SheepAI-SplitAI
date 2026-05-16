---
trigger: always_on
title: "Agent Behavior"
---

# Agent Behavior Rules

> General behavioral guidelines for all AI agents in this project. These rules override default agent tendencies.

1. **Be concise.** Keep responses short and action-oriented. Do not explain what you are about to do — just do it. Provide a brief summary when you finish.

2. **Verify before committing.** Before every git commit, confirm:
   - `npm run build` succeeds with zero errors
   - `git status` shows only intended file changes
   - You are on a fresh task-specific branch (never `main` or a stale feature branch)
   - Commit message follows the `<type>(<scope>): <description>` format

3. **One task at a time.** Complete the current task fully before starting the next one. Do not leave files in a half-edited state. If you cannot finish, tell the user what remains.

4. **Do not refactor unprompted.** Only change files directly related to the current task. If you notice code that could be improved elsewhere, mention it to the user but do NOT modify it.

5. **Escalation triggers — tell the user immediately if:**
   - You encounter a bug you cannot resolve after two attempts
   - A required file or type from another lane does not exist yet
   - You need to modify a file outside your lane's ownership (suggest `/implement-any` if operating as Team Lead)
   - The build fails due to an issue in code you did not write
   - You are unsure about an architectural decision

6. **Preserve existing code.** When modifying a file, keep all existing comments, imports, and exports that are unrelated to your change. Do not reorganize imports, reformat code, or rename variables unless specifically asked.

7. **Use the project's design tokens.** When writing any CSS or styling, import colors, fonts, and spacing from `app/src/styles/tokens.css`. Never hardcode visual values.

8. **Ask before deleting.** Never delete files without explicit user confirmation. If a file seems unnecessary, tell the user and let them decide.

9. **Follow the model routing strategy.** You are using the model assigned by the team's routing strategy. Do not suggest switching models unless the current task is failing and matches an escalation trigger.

10. **Respect the 10-minute rule.** If you are stuck on a problem after two focused attempts, tell the user immediately so they can escalate, simplify, or reassign the task. Do not loop.

11. **Workflow Autonomy:** If the user does not specify a slash command workflow (e.g., `/execute`, `/plan`, `/delegate`), analyze their request and autonomously select and apply the most relevant workflow from `.agents/workflows/` (as detailed in `workflow-routing.md`). Announce your selection before beginning.

12. **Team Lead Mode.** If the user identifies as the Team Lead (Karlo / Lane 0), they have access to additional workflows:
    - `/ideate` — Phase 0 brainstorming
    - `/architect` — Phase 1 architecture & type contracts
    - `/delegate` — Phase 2 cross-lane task package creation
    - `/implement-any` — Cross-lane implementation with safety checks
    - `/integrate` — Integration checkpoint protocol
    - The Team Lead may also use all in-lane workflows (`/plan`, `/execute`) without lane restrictions.
    - When the Team Lead uses `/implement-any`, lane isolation is temporarily relaxed for that session.

13. **Post-task state update (AGAS).** After completing any task via `/execute`, you MUST update `Development_plans/PROJECT_STATE.md` with your progress. This is not optional. Mark your task done, update lane counters, and identify the next unblocked task for your lane. If you noticed improvements during implementation, add them to the Vision Refinements table — do NOT implement them unless you are Frontend/Creative AND the change is S-effort, no-risk, and purely aesthetic. See `goal-awareness.md` for full rules.

### DO / DON'T

```
✅ DO: Complete the component, verify build, commit, then summarize what you did
❌ DON'T: Write a 500-word explanation of your plan before touching any code

✅ DO: "Build failed due to missing UserProfile type from Backend lane. Please ask the Backend Lead to add it."
❌ DON'T: Create a temporary UserProfile type in the Frontend directory to unblock yourself

✅ DO: Fix the bug in Dashboard.tsx as requested
❌ DON'T: Also refactor Sidebar.tsx because you noticed it could be cleaner

✅ DO: "I've attempted this twice and cannot resolve the state mutation bug. Recommend escalating to Opus Thinking."
❌ DON'T: Silently retry the same approach 10 times
```
