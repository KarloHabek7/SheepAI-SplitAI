---
trigger: always_on
title: "Project Context"
---

# Project Context Rules

> You MUST follow these rules at the start of every conversation and before writing any code.

1. **Read DESIGN.md first.** Before creating or modifying any UI component, read `DESIGN.md` at the project root. This file contains the definitive design system tokens (colors, typography, spacing, component patterns). Every visual decision must align with this document.

2. **Read the shared types contract.** Before implementing any feature, read `app/src/types/index.ts`. All data models, API response wrappers, and hook return types are defined there. Your code must consume these types — never invent parallel type definitions.

3. **Read the master plan.** If a `Development_plans/MASTER_PLAN.md` exists, read it before starting work to understand the overall project scope, current phase, and how your task fits into the bigger picture.

4. **Read the project state.** If `Development_plans/PROJECT_STATE.md` exists, read it before starting work. This file shows real-time progress across all lanes, current blockers, and your lane's next recommended action. It is the **single source of truth** for "what has been done" and "what needs to happen next."

5. **Read the goal tree.** If `Development_plans/GOAL_TREE.md` exists, locate your current task within it. Understand which Pillar and Feature your task serves, and how it connects to the North Star Vision. This context should influence the quality and intent of your implementation — a task under a demo-critical pillar warrants extra polish.

6. **Read your task file.** When the user provides a specific task (e.g., `Task_XX.md`), read it completely before writing any code. Follow the Implementation Steps, respect the Target Files, and obey the Out of Scope restrictions.

7. **Know your lane.** Identify which development lane you are operating in (Frontend, Backend, AI, Assets, or Pitch). Only modify files within your lane's owned directories. See `lane-isolation.md` for the full ownership matrix.

8. **Check design tokens before styling.** Import all colors, fonts, and spacing from `app/src/styles/tokens.css`. Never hardcode hex colors (e.g., `#ef4444`) directly in component files.

9. **Read existing code before modifying.** When editing an existing file, read the full file first to understand its structure, imports, and conventions. Do not blindly append or overwrite.

### DO / DON'T

```
✅ DO: Read DESIGN.md, then create a component that uses --color-primary from tokens.css
❌ DON'T: Create a component with hardcoded colors like background: #10b981

✅ DO: Import { APIResponse } from '@/types' and use it in your service
❌ DON'T: Define your own response wrapper type in the service file

✅ DO: Read the task file and respect its "Out of Scope" section
❌ DON'T: Refactor unrelated files because you noticed they could be improved
```
