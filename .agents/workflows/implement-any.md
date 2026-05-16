---
description: "Team Lead cross-lane implementation with safety checks. Bypasses lane isolation."
---

# Implement Any Lane (`/implement-any`)

You are now acting as the **Team Lead Implementer**. This workflow allows Karlo to implement code in **ANY lane's directory** — bypassing normal lane isolation rules.

> **Who uses this:** ONLY the Team Lead (Karlo). Other team members must NEVER use this workflow.
> **When to use:** When a lane is blocked, stuck, or you need to unblock yourself faster than waiting for the lane owner.
> **Model recommendation:** Match the model to the task complexity (see `Decisions/team_workflow.md` model selection guide).

## Safety Protocol

### Step 1: Confirm Identity
- State: "Operating as Team Lead (Karlo) with cross-lane write access."
- If the user is NOT Karlo / Team Lead, REFUSE and redirect them to their lane's `/execute` workflow.

### Step 2: Identify Target
- Ask (or infer from context):
  - **Target lane:** Which lane's code are you touching? (Frontend, Backend, AI, Creative)
  - **Target files:** Which specific file(s) will you create or modify?
  - **Reason:** Why are you implementing this instead of the lane owner? (blocked, time-critical, unblocking another lane)

### Step 3: Pre-Flight Safety Check
Run these checks before writing any code:

```powershell
# Check local workspace is clean
git status

# Check if target lane's branch has recent remote activity
git log --oneline -5 origin/lane/<target-lane>/<branch> 2>$null
```

- ✅ If no conflicts detected → proceed to implementation.
- ⚠️ If the target lane has uncommitted or recent changes in the same files → **WARN** the user:
  > "The [Lane] owner has recent changes to [files]. Proceeding may cause merge conflicts at the next checkpoint. Coordinate with them first, or continue at your own risk."
- The user decides whether to proceed after the warning.

### Step 4: Implement
- Follow all normal coding standards (`coding-standards.md`, `documentation-requirements.md`).
- Follow the target lane's conventions (e.g., if implementing Frontend, use CSS from `tokens.css`, use `useTranslation()` for strings).
- Read `DESIGN.md` for any UI work.
- Read `app/src/types/index.ts` for type contracts.

### Step 5: Commit with Lead Scope
Use the special `lead→<lane>` scope pattern to make cross-lane work visible in git history:

```powershell
git add <files>
git commit -m "<type>(lead→<target-lane>): <description>"
```

**Examples:**
```powershell
git commit -m "feat(lead→frontend): implement responsive nav component"
git commit -m "fix(lead→backend): resolve auth middleware null pointer"
git commit -m "feat(lead→ai): add streaming response parser"
git commit -m "style(lead→creative): add hero background asset"
```

### Step 6: Post-Implementation
- Run `npm run build` to verify no regressions.
- Output a notice:
  > "⚠️ Cross-lane changes made to [files] (owned by [Lane Name] lane). The lane owner should review these changes at the next integration checkpoint."
- If the change affects shared types or interfaces, note which other lanes may need to update their code.

## When NOT to Use This
- For routine work in your own lane → use `/execute` instead.
- For planning or task creation → use `/delegate` instead.
- For integration merges → use `/integrate` instead.
- If the lane owner is available and not blocked → let them do it.

**Out of Scope (What NOT to do):**
- Do NOT use this to do routine work that should be delegated.
- Do NOT restructure or refactor another lane's existing code — only add or fix.
- Do NOT skip the pre-flight safety check.
