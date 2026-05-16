---
description: "Phase 0a: Break the pre-ideation phase into parallel research and ideation sprint tasks."
---

# Research Plan Workflow (`/research-plan`)

You are now acting as the **Research & Ideation Architect**. This is **Phase 0a** of the hackathon — planning what needs to be investigated before the team can make an informed product decision.

> **Who uses this:** Team Lead (Karlo) immediately after the opening ceremony.
> **Model recommendation:** Opus 4.6 (Thinking) — requires strategic decomposition of unknowns.
> **Goal:** Produce a set of parallelizable research and ideation tasks that multiple agents can execute simultaneously.

## Instructions

1. **Gather Constraints:**
   - Ask for (or read from existing files):
     - Hackathon theme and any mandatory requirements
     - Judging criteria and their weights
     - Available time window for research (target: 15–30 minutes of parallel execution)
     - Team size and available parallel agents
     - Sponsor-specific API or tool mandates (e.g., "must use Google AI tools")
     - Any seed ideas the team already has (e.g., an `ideja.txt` or verbal concept)
   - If a seed idea file exists, read it — the research tasks will be partially shaped around validating and expanding on it.
   - If no seed idea exists, the research tasks will be broader and more exploratory.

2. **Design Research Categories:**
   Assess which of the following research categories are relevant and create tasks for each:

   | Category | Code | Purpose | When to Include |
   |---|---|---|---|
   | **Market Research** | `R_MKT` | Understand the problem space, user pain points, TAM/SAM | Always |
   | **Tech Scouting** | `R_TECH` | Catalog available APIs, SDKs, frameworks, AI capabilities | Always |
   | **Competitor Analysis** | `R_COMP` | Analyze existing solutions, identify gaps and opportunities | Always |
   | **Inspiration Mining** | `R_INSP` | Study award-winning projects, adjacent-market innovations | When time permits |
   | **Constraint Analysis** | `R_RULE` | Deep-read judging rubric, sponsor requirements, time math | When rules are complex |
   | **Domain Deep-Dive** | `R_DOMAIN` | Research a specific industry or user group in depth | When seed idea targets a niche |

3. **Design Ideation Sprints:**
   Create 2–4 ideation sprint tasks, each approaching the problem from a **different angle**:

   | Sprint Type | Code | Approach |
   |---|---|---|
   | **Persona-Driven** | `I_PERSONA` | "Generate ideas for [specific user persona]" |
   | **Tech-Driven** | `I_TECH` | "Generate ideas that maximally leverage [specific API/tool]" |
   | **Moonshot** | `I_MOON` | "Generate ambitious, high-risk/high-reward ideas" |
   | **Pragmatic** | `I_PRAG` | "Generate ideas optimized for buildability in <10 hours" |
   | **Gap-Filler** | `I_GAP` | "Generate ideas that fill gaps found in competitor analysis" |
   | **Seed Expansion** | `I_SEED` | "Expand and diverge from the seed idea in multiple directions" |

   > **Important:** Each ideation sprint should produce 3–5 distinct ideas. The sprints intentionally overlap — duplicate ideas from different angles signal high-confidence opportunities.

4. **Create Master Research Plan:**
   Create `Research/RESEARCH_PLAN.md` with:

   ```markdown
   # Research & Ideation Plan

   > **Created:** [Date]
   > **Time Budget:** [X minutes for research, Y minutes for ideation]
   > **Parallel Agents Available:** [N]

   ## Constraints
   - Theme: [hackathon theme]
   - Judging Criteria: [list with weights]
   - Mandatory Tools/APIs: [list]
   - Seed Idea: [summary or "None — open exploration"]

   ## Task Inventory

   ### Research Tasks
   | ID | Category | Title | Time Box | Model |
   |---|---|---|---|---|
   | R01 | R_MKT | [Title] | [10–15 min] | [Model] |
   | R02 | R_TECH | [Title] | [10–15 min] | [Model] |
   | ... | ... | ... | ... | ... |

   ### Ideation Sprints
   | ID | Sprint Type | Angle | Time Box | Model | Depends On |
   |---|---|---|---|---|---|
   | I01 | I_PERSONA | [Angle description] | [10 min] | [Model] | None / R01 |
   | I02 | I_TECH | [Angle description] | [10 min] | [Model] | R02 |
   | ... | ... | ... | ... | ... | ... |

   ## Parallelization Guide

   ### Dependency Graph
   ```mermaid
   graph LR
     R01[R01: Market Research] --> I03[I03: Gap-Filler Sprint]
     R02[R02: Tech Scouting] --> I02[I02: Tech-Driven Sprint]
     R03[R03: Competitor Analysis] --> I03
     R01 -.-> I01[I01: Persona Sprint]
     I01 --> IDEATE["/ideate: Consolidate & Decide"]
     I02 --> IDEATE
     I03 --> IDEATE
   ```

   ### Execution Waves
   | Wave | Tasks (run in parallel) | Agents Needed | Notes |
   |---|---|---|---|
   | Wave 1 | R01, R02, R03, I01 | 4 | Research + independent ideation |
   | Wave 2 | I02, I03 | 2 | Depends on Wave 1 research findings |
   | Wave 3 | `/ideate` (consolidation) | 1 | Reads all findings, makes decision |

   ### Agent Manager Instructions
   1. Open Agent Manager in Antigravity IDE
   2. Start **N agents** for Wave 1 — one per task
   3. Each agent runs: `/research-execute Research/Tasks/<task_file>.md`
   4. Wait for all Wave 1 agents to complete
   5. Start Wave 2 agents (if any tasks depend on Wave 1 output)
   6. Once all findings are in `Research/Findings/`, run: `/ideate`
   ```

5. **Create Individual Task Files:**
   For each task, create a file in `Research/Tasks/` following this template:

   ```markdown
   # [ID]: [Title]

   > **Category:** [R_MKT / R_TECH / R_COMP / I_PERSONA / etc.]
   > **Time Box:** [10–15 minutes]
   > **Recommended Model:** [Gemini 3.1 Pro High for research, Opus 4.6 for ideation]
   > **Depends On:** [Other task IDs, or "None"]

   ## Objective
   [One paragraph: what exactly to research or ideate on]

   ## Search Strategy
   [For research tasks: specific queries to run, domains to check, documentation to read]
   [For ideation tasks: the creative angle, the persona to embody, the constraint to apply]

   ## Output Format
   Write findings to `Research/Findings/[ID]_[slug]_findings.md` using this structure:

   ### For Research Tasks:
   - **Executive Summary** (3–5 bullet points of key insights)
   - **Detailed Findings** (organized by sub-topic)
   - **Data Points** (statistics, market sizes, user counts — with sources)
   - **Implications for Ideation** (what does this mean for what we should build?)
   - **Sources** (URLs and references)

   ### For Ideation Sprints:
   - **Sprint Angle** (what creative lens was applied)
   - **Ideas Generated** (3–5 ideas, each with):
     - One-line pitch (≤15 words)
     - Target user persona
     - Core AI/tech feature
     - Key differentiator from existing solutions
     - Feasibility rating (1–5)
     - Demo-ability rating (1–5)
     - Why this idea wins on judging criteria
   - **Cross-Pollination Notes** (ideas that could combine with other sprints)

   ## Out of Scope
   - Do NOT make a final decision — that's `/ideate`
   - Do NOT write any application code
   - Do NOT evaluate ideas against each other — just generate and document
   ```

6. **Output Summary:**
   Print a table of all created tasks with their parallelization status:

   | ID | Type | Title | Wave | Model | File |
   |---|---|---|---|---|---|
   | R01 | Research | [Title] | 1 | [Model] | `Research/Tasks/R01_xxx.md` |
   | I01 | Ideation | [Title] | 1 | [Model] | `Research/Tasks/I01_xxx.md` |
   | ... | ... | ... | ... | ... | ... |

7. **Transition:**
   Tell the user:
   > "Research plan created with **[N] parallel tasks**. Open Agent Manager and start Wave 1 agents. Each agent should run `/research-execute Research/Tasks/<file>.md`. Once all findings are collected, run `/ideate` to consolidate and decide."

**Out of Scope (What NOT to do):**
- Do NOT perform the actual research — only plan it.
- Do NOT generate product ideas — only design the ideation sprint parameters.
- Do NOT make any product decisions.
- Do NOT write application code.
- Do NOT create architecture or task delegation files — that's `/architect` and `/delegate`.

When finished, suggest:
`git add Research/ && git commit -m "docs(config): create research and ideation plan with [N] parallel tasks"`
