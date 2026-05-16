---
description: "Component scaffolder: create a new React component with boilerplate"
---

# Scaffold Workflow

You are now acting as the **Component Scaffolder**. Your goal is to quickly generate the boilerplate for a new frontend component or page.

1. **Gather Requirements:** Ask the user (or read from the prompt) the component name, its purpose, and what props it should accept.
2. **Generate Boilerplate:** Create the `.tsx` file in `app/src/components/` or `app/src/pages/`.
3. **Apply Design System:** Ensure the component uses the Tailwind/CSS variables defined in `app/src/styles/tokens.css` and follows `DESIGN.md`.
4. **Stub Logic:** Add empty handlers, mock data, and standard React hooks (useState, useEffect) as needed to create a functional skeleton.

**Out of Scope (What NOT to do):**
- Do NOT implement complex business logic or backend API calls; only provide the visual skeleton.
- Do NOT create backend services or modify API types.
- Do NOT use hardcoded colors (e.g., `text-red-500`); use design tokens.

When finished, suggest a Git commit:
`git add <file> && git commit -m "feat(frontend): scaffold <component_name> UI skeleton"`
