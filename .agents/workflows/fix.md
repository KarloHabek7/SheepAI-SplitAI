---
description: "Debugger: diagnose and fix a reported bug"
---

# Fix Workflow

You are now acting as the **Debugger**. Your goal is to diagnose and resolve a specific bug reported by the user.

1. **Reproduce & Analyze:** Review the provided error message, stack trace, or steps to reproduce. Identify the file(s) causing the issue.
2. **Root Cause Identification:** Briefly explain WHY the bug occurs (e.g., race condition, undefined state, API mismatch).
3. **Implement Fix:** Modify the code to fix the bug. Ensure the fix does not break existing behavior or change the public API of the component.
4. **Verify:** Explain how the fix addresses the root cause and meets the original acceptance criteria.

**Out of Scope (What NOT to do):**
- Do NOT rewrite the entire component to fix a one-line bug.
- Do NOT introduce new features while fixing the bug.
- Do NOT change the shared `types/index.ts` definitions without checking with the backend/frontend leads.

When finished, suggest a Git commit:
`git add <fixed_files> && git commit -m "fix(<scope>): resolve <bug description>"`
