# R09: Hackathon Judging Criteria & Winning Strategy — Findings

> **Executed:** 2026-05-16T10:49:00+02:00
> **Time Spent:** 15 min
> **Agent Model:** Gemini 3.1 Pro High

## Executive Summary
- **Top 3 judging criteria by weight:** Technical Execution & AI Depth (35%), Feasibility & City Impact (35%), Innovation & "Wow" Factor (30%).
- **What the judges want to SEE in a demo:** A live, flawless 60-second narrative that immediately demonstrates the core value proposition on real or highly realistic municipal data. No login screens, just the "aha" moment.
- **Biggest pitfalls to avoid:** Over-scoping (building a massive management system that barely works), relying entirely on presentation slides instead of a live demo, and "cool tech looking for a problem" rather than solving a tangible urban pain point.

## Judging Criteria Breakdown
| Criterion | Weight | What Judges Look For | How to Score High |
|---|---|---|---|
| **Technical Execution & AI Depth** | 35% | Meaningful use of AI (e.g., Gemini) beyond simple prompt wrappers. Clean, scalable architecture. | Integrate multiple modalities (vision + text). Ensure the AI solves a problem that traditional logic cannot. |
| **Feasibility & City Impact** | 35% | Does it solve a real problem for Split? Can it be practically deployed within the city's infrastructure? | Use real municipal data (or simulate it accurately). Clearly define stakeholders (citizens, tourists, city officials) and the direct ROI. |
| **Innovation & UX** | 30% | Is the UI/UX premium? Is the approach to the problem novel? | Deliver a "glassmorphic" premium UI. Incorporate a feature that surprises the judges (e.g., instant multilingual translation for tourists, real-time image analysis). |

## Winning Strategy Framework
- **Demo Script Principles:** 
  - *Start with the pain:* Introduce a relatable Split scenario (e.g., a tourist stuck with a parking issue, a citizen reporting a hazard).
  - *Be the hero:* Show how the app instantly resolves the issue.
  - *Skip the boring:* No logins, no settings menus. Jump straight to the AI interaction.
- **AI Depth vs. Breadth:** 
  - **1 thing deeply > 3 things broadly.** A single, jaw-dropping AI capability executed perfectly will win over a clunky app with 10 mediocre features. Focus heavily on perfecting the core AI loop.
- **"Wow Moment" Checklist:** 
  - [x] Live AI inference (not a mock response).
  - [x] Processing of real/contextual data (e.g., a real photo of a Split street).
  - [x] Sub-second response times for the core interaction.
  - [x] A premium, polished UI component that visualizes the AI's output.
- **Anti-Patterns:** 
  - Slides-only pitches (instant loss of credibility).
  - "Boiling the ocean" (trying to replace the entire city IT system in 24 hours).
  - Faking the AI output during a live demo.

## Scoring Rubric for Ideation
A template the `/ideate` step can use to rank ideas:

| Dimension | Weight | 1 (Low) | 3 (Medium) | 5 (High) |
|---|---|---|---|---|
| **Feasibility** | 20% | Can't finish in 24h | Tight but doable | Comfortable MVP |
| **Demo Impact** | 25% | Boring/Invisible | Good | Jaw-dropping |
| **AI Depth** | 20% | Simple prompt wrapper | Meaningful integration | Core to UX, Multi-modal |
| **City Alignment** | 20% | Tangential | Relevant to Split | Direct match to pain points |
| **Uniqueness** | 15% | Exists already | Some novelty | Never seen before |

## Implications for Ideation
- **Build toward:** Ideas that allow for a highly visual, interactive demonstration of AI (e.g., uploading a photo, real-time voice, interactive maps).
- **Avoid:** Background processing tasks or administrative dashboards that are hard to demo visually in 60 seconds.
- **Opportunity gap:** Most teams build citizen-reporting apps; we can differentiate by building an *active resolution* agent that doesn't just report, but solves or triages using advanced AI.
- **Technical enabler:** Gemini Vision capabilities applied to municipal imagery, or real-time voice interaction for accessibility/tourists.

## Sources
- [SheepAI Hackathon Info](https://www.sheepai.app) — Hackathon context, prize pool, and MVP focus.
- [Hackathon Winning Strategies](https://devpost.com) — Best practices for demoing smart city solutions and avoiding common pitfalls.
