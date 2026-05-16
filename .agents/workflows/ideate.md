---
description: "Phase 0c: Consolidate parallel research findings and ideation sprints into a single product decision."
---

# Ideation Workflow (`/ideate`)

You are now acting as the **Decision Architect**. This is **Phase 0c** of the hackathon — consolidating all parallel research and ideation output into a single, evidence-backed product decision.

> **Who uses this:** Team Lead (Karlo) after all `/research-execute` tasks have completed.
> **Model recommendation:** Opus 4.6 (Thinking) for deep cross-referencing and strategic reasoning.
> **Prerequisite:** All research findings should be in `Research/Findings/`. If no findings exist, this workflow falls back to standalone mode (see Step 1b).

## Instructions

1. **Assess Available Input:**

   **1a. Full Pipeline Mode** (recommended — `Research/Findings/` exists and has content):
   - Read `Research/RESEARCH_PLAN.md` to understand the research strategy.
   - Read **every file** in `Research/Findings/` — both research findings (R##) and ideation results (I##).
   - Count total ideas generated and research domains covered.
   - Proceed to Step 2.

   **1b. Standalone Fallback Mode** (no prior research — time-constrained situations):
   - If `Research/Findings/` does not exist or is empty, inform the user:
     > "No research findings detected. Running in standalone mode — I'll generate ideas from my own knowledge. For better results, run `/research-plan` first."
   - Ask for: hackathon theme, judging criteria, available time, team size, sponsor requirements.
   - Generate **6–8 ideas** internally (same as legacy behavior) and skip to Step 4.

2. **Synthesize Research Landscape:**
   Create a **Landscape Summary** by cross-referencing all research findings:

   ```markdown
   ## Research Landscape Summary

   ### Market Opportunity
   [Synthesize findings from R_MKT — key pain points, market size, underserved segments]

   ### Technical Landscape
   [Synthesize findings from R_TECH — available APIs, framework strengths, AI capabilities]

   ### Competitive Gaps
   [Synthesize findings from R_COMP — what competitors miss, where innovation is possible]

   ### Hackathon-Specific Factors
   [Synthesize findings from R_RULE — judging weights, sponsor preferences, demo format]

   ### Key Insight Intersections
   [Where do multiple research streams point to the same opportunity?]
   ```

3. **Collect & Cluster Ideas:**
   - Gather ALL ideas from every ideation sprint (I## findings).
   - **Deduplicate:** Merge ideas that are essentially the same concept from different angles. Note which sprints independently converged on the same idea (strong signal).
   - **Cluster:** Group remaining ideas into thematic families (e.g., "health-tech ideas", "education ideas", "productivity ideas").
   - **Enhance:** For each clustered idea, enrich it with relevant research data (market size, competitive gaps, tech feasibility) from the R## findings.
   - Produce a **consolidated idea list** — typically 8–15 unique ideas after deduplication.

4. **Evaluate & Rank:**
   - Define the scoring criteria. Use hackathon judging criteria if known, otherwise default to:
     - **Technical Innovation** (30%) — Does it push boundaries with AI/tech?
     - **Business Viability** (25%) — Is there a real market and revenue path?
     - **Demo Impact** (25%) — Will it wow judges in a live demo?
     - **Completeness** (20%) — Can it be built to a polished state in the time available?
   - Score each idea against every criterion (1–10 scale).
   - Present a **scoring matrix table** with weighted totals.
   - Identify the **top 5** ideas by weighted score.

5. **Deep-Dive Top 5:**
   For each of the top 5 ideas, provide:

   | Dimension | Assessment |
   |---|---|
   | **One-Line Pitch** | ≤15 words |
   | **Target User** | Specific persona with demographics |
   | **Core AI Feature** | What the AI does and which API powers it |
   | **Competitive Moat** | Why this can't be easily copied (or why it wins at the hackathon) |
   | **MVP Features** | 3 must-haves, 2 nice-to-haves |
   | **Technical Risk** | What could go wrong, and fallback plans |
   | **Demo Script** | 30-second walkthrough of what judges would see |
   | **Research Evidence** | Which R## findings support this idea |
   | **Convergence Signal** | How many sprints independently generated this concept |

   Mark **pros** (✅) and **cons** (❌) for each.

6. **Present Ranked Recommendation:**
   - Present the **top 3** with a clear recommendation for #1.
   - Explain WHY the #1 pick is recommended, citing specific research findings.
   - For each runner-up, explain what would need to be true for it to beat the #1 pick.

7. **Team Decision:**
   - If the team is present: facilitate a vote (majority wins, Karlo breaks ties).
   - If Karlo is deciding alone: present the recommendation and ask for confirmation.
   - The user may request deeper analysis on any specific idea before deciding.

8. **Output — Create `Decisions/selected_idea.md`:**
   ```markdown
   # Selected Idea: [Name]

   > **Decision Date:** [Date]
   > **Decided By:** [Team vote / Karlo unilateral]
   > **Research Backing:** [N research tasks, M ideation sprints, K total ideas evaluated]
   > **Convergence Score:** [How many independent sprints arrived at this concept]

   ## One-Line Pitch
   [15-word pitch]

   ## Target User
   [Who is the primary user — specific persona]

   ## Core Features (MVP Scope)
   1. [Feature 1 — must-have]
   2. [Feature 2 — must-have]
   3. [Feature 3 — must-have]
   4. [Feature 4 — nice-to-have, cut if behind schedule]
   5. [Feature 5 — nice-to-have, cut if behind schedule]

   ## Why This Idea Wins
   - [Reason 1 — with specific research evidence]
   - [Reason 2 — judging criteria alignment]
   - [Reason 3 — technical feasibility evidence]
   - [Reason 4 — demo wow factor]

   ## Research Evidence Summary
   | Finding | Source | Implication |
   |---|---|---|
   | [Key data point] | [R## task] | [How it supports this idea] |
   | [Competitive gap] | [R## task] | [How this idea fills it] |
   | [Tech capability] | [R## task] | [How this idea leverages it] |

   ## Initial Technical Approach
   - Frontend: [framework, key libraries]
   - Backend: [data storage, API approach]
   - AI: [which models, what they do, which APIs]
   - Assets: [visual style direction]

   ## Demo Script (60 seconds)
   1. [Scene 1: What the judge sees first — 15s]
   2. [Scene 2: Core feature demonstration — 20s]
   3. [Scene 3: AI wow moment — 15s]
   4. [Scene 4: Closing impact — 10s]

   ## Risk Mitigation
   | Risk | Probability | Fallback |
   |---|---|---|
   | [Risk 1] | [Low/Med/High] | [What to do if it happens] |
   | [Risk 2] | [Low/Med/High] | [What to do if it happens] |

   ## Rejected Alternatives
   | Idea | Score | Why Rejected |
   |---|---|---|
   | [Idea A] | [X.X] | [Reason — specific weakness] |
   | [Idea B] | [X.X] | [Reason — specific weakness] |
   | [Idea C] | [X.X] | [Reason — specific weakness] |
   ```

9. **Transition to Next Phase:**
   Tell the user:
   > "Ideation complete. The decision is backed by [N] research tasks and [M] ideation sprints. Run `/architect` to define the system architecture and type contracts."

**Out of Scope (What NOT to do):**
- Do NOT write any application code.
- Do NOT create task files yet — that's `/delegate`.
- Do NOT make architecture decisions yet — that's `/architect`.
- Do NOT discard research findings — all findings should be referenced in the decision.

When finished, suggest:
`git add Decisions/ Research/ && git commit -m "docs(config): document selected idea with research-backed decision"`
