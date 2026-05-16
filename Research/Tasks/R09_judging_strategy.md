# R09: Hackathon Judging Criteria & Winning Strategy

> **Category:** R_RULE (Constraint Analysis)
> **Time Box:** 10 min
> **Recommended Model:** Gemini 3.1 Pro High
> **Depends On:** None
> **Priority:** 🟡 High

## Objective

Research the SheepAI hackathon judging criteria, sponsor expectations, and what typically wins hackathons with a "City/Municipal" theme. Produce a scoring framework we can use during `/ideate` to evaluate ideas objectively.

## Search Strategy

1. **SheepAI Hackathon** — "SheepAI hackathon 2026" / "SheepAI natjecanje" / sheepai.app
   - Official rules, judging rubric, sponsor list, prize categories
   - Any mentor profiles or judge backgrounds
2. **Google AI Sponsor Expectations** — If Google is a sponsor, what do they want to see?
   - Heavy Gemini API usage? Multi-modal? Creative AI applications?
3. **Hackathon Winning Patterns** — "how to win hackathon smart city" / "hackathon demo tips"
   - What features make demos memorable?
   - Common mistakes (over-scoping, boring demos, no live AI)
4. **City of Split Expectations** — If Split municipality is involved, what would they want?
   - Alignment with Strategija 2030 priorities
   - Practical deployability vs. research prototype

## Output Format

Write to `Research/Findings/R09_judging_strategy_findings.md`:

### Executive Summary
- Top 3 judging criteria by weight
- What the judges want to SEE in a demo
- Biggest pitfalls to avoid

### Judging Criteria Breakdown
| Criterion | Weight | What Judges Look For | How to Score High |
|---|---|---|---|
| Innovation | [X%] | [Description] | [Strategy] |
| Technical Execution | [X%] | [Description] | [Strategy] |
| ... | ... | ... | ... |

### Winning Strategy Framework
- **Demo Script Principles** — What makes a 60-second demo unforgettable?
- **AI Depth vs. Breadth** — Should we do 1 thing deeply or 3 things broadly?
- **"Wow Moment" Checklist** — Live AI inference, real data, unexpected capability
- **Anti-Patterns** — Slides-only, no live demo, over-promising, scope creep

### Scoring Rubric for Ideation
A template the `/ideate` step can use to rank ideas:
| Dimension | Weight | 1 (Low) | 3 (Medium) | 5 (High) |
|---|---|---|---|---|
| Feasibility | 20% | Can't finish | Tight but doable | Comfortable MVP |
| Demo Impact | 25% | Boring | Good | Jaw-dropping |
| AI Depth | 20% | Wrapper | Meaningful | Core to UX |
| City Alignment | 20% | Tangential | Relevant | Direct €2M match |
| Uniqueness | 15% | Exists already | Some novelty | Never seen before |

### Implications for Ideation
- Which idea archetype scores highest across all criteria?
- What's the minimum viable "wow moment" we must deliver?
- Time allocation: how much for polish vs. features?

## Out of Scope
- Do NOT evaluate any specific ideas — just build the framework
