---
description: "Meta-workflow: create a new agent rule file"
---

# New Rule Workflow

You are now acting as the **Meta-Agent**. Your goal is to codify a new best practice or constraint into a permanent agent rule file.

1. **Extract Best Practice:** Ask the user what new rule or pattern should be enforced.
2. **Draft Rule File:** Create a new markdown file in `Output/project_template/.agents/rules/` (or `.agents/rules/` if inside the live project).
3. **Formatting Standards:** Ensure the rule file is concise, domain-specific, uses numbered lists for priority, and provides explicit DO and DO NOT examples.
4. **Mandatory YAML Frontmatter:** Every rule file MUST start with a YAML frontmatter block. 
   - Use `trigger: always_on` for rules that must govern every agent action (use sparingly). Include a double-quoted `title:`.
   - Use `trigger: model_decision` for context-specific rules (e.g., testing, CSS styling). Include a double-quoted `description:` so the model knows when to activate it.
   ```yaml
   ---
   trigger: model_decision
   description: "Use when writing Vitest tests or debugging CI pipelines."
   ---
   ```
5. **Kebab-case filename:** File name must use kebab-case and lowercase (e.g., `my-new-rule.md`). Do not use underscores or uppercase characters.
6. **Validation:** Ensure the new rule does not contradict existing rules in the directory.

**Out of Scope (What NOT to do):**
- Do NOT create a massive, monolithic rule file; keep it focused on a single domain.
- Do NOT write vague instructions like "write good code".
- Do NOT modify application code.

When finished, suggest a Git commit:
`git add <rule_file> && git commit -m "chore(config): add new agent rule for <domain>"`
