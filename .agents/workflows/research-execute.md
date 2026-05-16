---
description: "Phase 0b: Execute a single research or ideation sprint task from Research/Tasks/ in parallel with other agents."
---

# Research Execute Workflow (`/research-execute`)

You are now acting as a **Research Agent** or **Ideation Agent**. You have been assigned a single task from `Research/Tasks/` to execute independently — other agents are running their own tasks in parallel.

> **Who uses this:** Any agent session spawned from Agent Manager during the research phase.
> **Usage:** `/research-execute Research/Tasks/R01_market_research.md` or `/research-execute Research/Tasks/I02_tech_ideation.md`
> **Model recommendation:** Use the model specified in the task file's "Recommended Model" field.

## Instructions

1. **Acknowledge Task:**
   - Read the exact task file provided by the user.
   - The file will be at `Research/Tasks/<ID>_<slug>.md`.
   - Identify whether this is a **Research task** (R##) or an **Ideation Sprint** (I##).
   - Verify it has: Objective, Search Strategy, Output Format, Time Box.

2. **Gather Context:**
   - Read the `Research/RESEARCH_PLAN.md` to understand the overall research strategy and your task's role in it.
   - If this task has **dependencies** (e.g., "Depends On: R01"), check if `Research/Findings/R01_*_findings.md` exists:
     - If it exists: read it and use those findings as input.
     - If it does NOT exist: inform the user that a dependency is missing. Proceed with best-effort execution, noting the gap.
   - If a seed idea file exists (e.g., `ideja.txt`, `Decisions/seed_idea.md`), read it for context.

3. **Execute — Research Task (R## prefix):**
   If this is a research task:
   - Follow the "Search Strategy" in the task file.
   - Use `search_web` to find relevant information, articles, documentation, and data.
   - Use `read_url_content` to extract detailed information from promising sources.
   - Organize findings into the output format specified in the task file.
   - Focus on **actionable insights** — every finding should have an "implication for ideation" note.
   - Capture specific data points with sources (market sizes, user counts, pricing, etc.).
   - Note any surprising discoveries or counter-intuitive findings — these often lead to the best ideas.

4. **Execute — Ideation Sprint (I## prefix):**
   If this is an ideation sprint:
   - Read any available research findings in `Research/Findings/` for context (especially those listed in your dependencies).
   - Embody the creative angle specified in your task (persona-driven, tech-driven, moonshot, etc.).
   - Generate **3–5 distinct product ideas**, each with:
     - **One-line pitch** (≤15 words)
     - **Target user persona** (who specifically benefits)
     - **Core AI/tech feature** (what makes it technically unique)
     - **Key differentiator** (why this beats existing solutions)
     - **Feasibility rating** (1–5, where 5 = definitely buildable in <10 hours)
     - **Demo-ability rating** (1–5, where 5 = immediately impressive in a live demo)
     - **Judging criteria alignment** (which criteria does this idea score highest on)
   - Push for **creative diversity** — if two ideas feel similar, merge them and generate a new one.
   - Include **cross-pollination notes**: ideas that could combine with concepts from other sprints.

5. **Write Findings:**
   Create the output file at `Research/Findings/<ID>_<slug>_findings.md` using this structure:

   **For Research Tasks (R##):**
   ```markdown
   # [ID]: [Title] — Findings

   > **Executed:** [Date/Time]
   > **Time Spent:** [actual time]
   > **Agent Model:** [model used]

   ## Executive Summary
   - [Key insight 1]
   - [Key insight 2]
   - [Key insight 3]
   - [Key insight 4 — most surprising finding]

   ## Detailed Findings

   ### [Sub-topic 1]
   [Findings with supporting evidence]

   ### [Sub-topic 2]
   [Findings with supporting evidence]

   ## Data Points
   | Metric | Value | Source |
   |---|---|---|
   | [Market size] | [Value] | [URL] |
   | [User base] | [Value] | [URL] |

   ## Implications for Ideation
   - **Build toward:** [what the research suggests we should build]
   - **Avoid:** [what the research suggests is saturated or infeasible]
   - **Opportunity gap:** [underserved area discovered]
   - **Technical enabler:** [API or tool that unlocks a unique approach]

   ## Sources
   - [Title](URL) — [one-line summary of relevance]
   - [Title](URL) — [one-line summary of relevance]
   ```

   **For Ideation Sprints (I##):**
   ```markdown
   # [ID]: [Sprint Title] — Ideation Results

   > **Executed:** [Date/Time]
   > **Creative Angle:** [Persona-driven / Tech-driven / Moonshot / etc.]
   > **Agent Model:** [model used]
   > **Research Inputs Used:** [list of R## findings read, or "None"]

   ## Ideas Generated

   ### Idea 1: [Name]
   - **Pitch:** [≤15 words]
   - **Target User:** [specific persona]
   - **Core AI Feature:** [what AI does in this product]
   - **Differentiator:** [why this is better than existing solutions]
   - **Feasibility:** [1–5] — [brief justification]
   - **Demo-ability:** [1–5] — [brief justification]
   - **Judging Strengths:** [which criteria this scores highest on]
   - **MVP Scope:** [3 bullet points of must-have features]

   ### Idea 2: [Name]
   [same structure]

   ### Idea 3: [Name]
   [same structure]

   ## Cross-Pollination Notes
   - Idea [X] could combine with a tech-driven approach if [condition]
   - Idea [Y] shares DNA with moonshot concepts around [theme]

   ## Research Gaps Noticed
   - [Any information that would have helped but wasn't available]
   ```

6. **Report Completion:**
   - State which output file was created and its location.
   - Summarize the top 2–3 findings or ideas in bullet form.
   - If this task was a dependency for other tasks, note: "Tasks [IDs] are now unblocked."
   - If you noticed research gaps, flag them for the consolidation phase.

**Out of Scope (What NOT to do):**
- Do NOT make a final product decision — that's `/ideate` (consolidation).
- Do NOT rank ideas against ideas from other sprints — just generate your own.
- Do NOT write any application code.
- Do NOT create architecture, type definitions, or task delegation files.
- Do NOT modify other agents' findings files.
- Do NOT skip the output format — the consolidation agent depends on consistent structure.

When finished, output your findings summary and suggest:
`git add Research/Findings/ && git commit -m "research(config): complete [ID] [title] findings"`
