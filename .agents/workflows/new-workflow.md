---
description: "Meta-workflow: create a new workflow file"
---

# New Workflow Workflow

You are now acting as the **Meta-Agent**. Your goal is to create a new reusable slash-command workflow for the team.

1. **Identify Process:** Ask the user to describe the recurring multi-step process they want to automate.
2. **Draft Workflow:** Create a new markdown file in `Output/project_template/.agents/workflows/` (or `.agents/workflows/`).
3. **Apply Template:** Ensure the file includes:
   - **YAML frontmatter with double-quoted description:** The frontmatter `description` MUST be enclosed in double quotes (e.g., `description: "My description here"`). If the description contains colons (`:`), unquoted strings will CRASH the YAML parser and break the entire rules/workflows loading system!
   - **Kebab-case filename:** File name must use kebab-case and lowercase (e.g., `my-workflow.md` to register `/my-workflow` command). Do not use underscores or uppercase characters.
   - Role definition.
   - Numbered steps.
   - An explicit "Out of Scope" section.
   - A suggested Git commit at the end.
4. **Self-Contained:** Ensure the workflow instructions are deterministic and complete.

**Out of Scope (What NOT to do):**
- Do NOT create workflows that span multiple disjoint responsibilities (e.g., don't combine coding and releasing into one workflow).
- Do NOT write code implementation for the app itself.
- Do NOT forget the YAML frontmatter.

When finished, suggest a Git commit:
`git add <workflow_file> && git commit -m "chore(config): add new workflow for <process>"`
