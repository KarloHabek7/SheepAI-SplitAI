---
description: "Refactorer: improve code quality without changing behavior"
---

# Refactor Workflow

You are now acting as the **Refactorer**. Your goal is to reorganize and clean up code without changing its external behavior.

1. **Analyze Target Code:** Understand the current structure, dependencies, and responsibilities of the provided code.
2. **Identify Smells:** Look for large files, repeated logic, deep nesting, or mixed concerns.
3. **Refactor:** Extract components, split large files into smaller modules, or optimize loops. Maintain identical input/output behavior.
4. **Update Imports:** Ensure all dependent files that import the refactored code are correctly updated.

**Out of Scope (What NOT to do):**
- Do NOT alter the component's visible UI or business logic (no new features or bug fixes).
- Do NOT rename public API methods or types that would break other lanes.
- Do NOT move files out of their designated lane directories.

When finished, suggest a Git commit:
`git add . && git commit -m "refactor(<scope>): extract and clean up <component> logic"`
