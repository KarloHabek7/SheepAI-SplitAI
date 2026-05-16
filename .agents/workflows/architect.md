---
description: "Phase 1: Define system architecture, data flow, API contracts, and shared type interfaces."
---

# Architecture Workflow (`/architect`)

You are now acting as the **System Architect**. This is **Phase 1** of the hackathon — defining what gets built and how it all connects.

> **Who uses this:** Team Lead (Karlo) during the architecture window (10:30–11:00).
> **Model recommendation:** Opus 4.6 (Thinking) — architecture decisions are high-impact and benefit from deep reasoning.
> **Prerequisite:** Run `/ideate` first. Read `Decisions/selected_idea.md`.

## Instructions

1. **Read Context:**
   - Read `Decisions/selected_idea.md` (the chosen idea and MVP scope).
   - Read `DESIGN.md` if it exists (design system tokens — generated from branding website via `/design-extract`).
   - Read `Decisions/brand_site.md` if it exists (branding website URL and visual direction).
   - Read any relevant Split background context in `docs/research/`.

2. **Define System Architecture:**
   - Draw the high-level architecture using a Mermaid diagram:
     - Frontend (React/Vite) → Backend (API endpoints) → AI Services (Gemini) → External APIs
   - Identify all major components and their responsibilities.
   - Define the data flow between components (what calls what, what data flows where).
   - Identify which components are **critical path** (must work for demo) vs **nice-to-have**.

3. **Design API Contracts:**
   - Define all API endpoints: `METHOD /path` → Request body → Response shape.
   - Define all core data models (User, Project, etc.).
   - Define the shared type interface file content for `app/src/types/index.ts`.

4. **Create Lane Responsibility Map:**
   - For each lane (Frontend, Backend, AI, Creative), define exactly:
     - What they **produce** (exports, endpoints, assets)
     - What they **consume** (types, hooks, design tokens)
     - **Handoff points** (when and what they deliver to other lanes)
   - Create a **dependency graph** (Mermaid) showing which lanes block which.

5. **Output Files:**

   **a) Create/Update `docs/architecture/ARCHITECTURE.md`:**
   - System diagram (Mermaid)
   - Component responsibilities table
   - Data flow description
   - API endpoint catalog
   - Lane dependency graph

   **b) Create/Update `app/src/types/index.ts`:**
   - All shared types, interfaces, API response wrappers, hook return types
   - This becomes the **contract** that all lanes code against

   **c) Create/Update `Development_plans/MASTER_PLAN.md`:**
   - High-level architecture section
   - Lane responsibility assignments
   - Critical path identification
   - Dependency graph
   - Timeline mapping (which lane tasks map to which time blocks)

   **d) Create `Development_plans/PROJECT_STATE.md` (AGAS):**
   - Copy structure from `Development_plans/PROJECT_STATE_TEMPLATE.md`.
   - Populate the North Star Vision from `Decisions/selected_idea.md`.
   - Leave lane status tables empty — they will be populated by `/delegate`.
   - Initialize Overall Progress to `0/0 tasks complete (0%)`.
   - Set all Next Recommended Actions to "Awaiting task delegation".

   **e) Create `Development_plans/GOAL_TREE.md` (AGAS):**
   - Copy structure from `Development_plans/GOAL_TREE_TEMPLATE.md`.
   - Populate the North Star from `Decisions/selected_idea.md`.
   - Define **Pillars** (3–5) based on the architecture's critical paths, demo moments, and user value areas.
   - Add a brief description to each Pillar explaining why it matters for the demo/judges/users.
   - Leave Feature and Task entries empty — they will be populated by `/delegate`.

6. **Parallelization Analysis:**
   - Identify which lane tasks can start immediately (no dependencies).
   - Identify which tasks are blocked until another lane delivers (e.g., Frontend blocked on Backend types).
   - Output a **parallel execution timeline** showing what happens simultaneously.

7. **Transition to Next Phase:**
   - If `DESIGN.md` exists: Tell the user: "Architecture complete. Run `/delegate` to create per-lane task packages for your team."
   - If `DESIGN.md` does NOT exist: Tell the user: "Architecture complete. If the branding site is not yet deployed, run `/brand-site` (can be done by Creative Lead in parallel). Then run `/design-extract` to generate `DESIGN.md` and `tokens.css` before delegating UI tasks. Finally, run `/delegate`."

**Out of Scope (What NOT to do):**
- Do NOT write application code (only type definitions).
- Do NOT create lane-specific task files — that's `/delegate`.
- Do NOT make design/aesthetic decisions — that's the Creative lane.

When finished, suggest:
`git add docs/architecture/ app/src/types/ Development_plans/ ; git commit -m "docs(config): define system architecture and type contracts"`
