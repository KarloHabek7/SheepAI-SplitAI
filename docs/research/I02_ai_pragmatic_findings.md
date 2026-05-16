# I02: Pragmatic "Quick Win" AI for Split — Ideation Results

> **Executed:** 2026-05-13 20:26
> **Creative Angle:** Pragmatic, high demo-ability, buildable in 10h
> **Agent Model:** Opus 4.6 (Thinking)
> **Research Inputs Used:** R03_tech_data_findings.md

## Ideas Generated

### Idea 1: Split Zmaj (City Documents RAG)
- **Pitch:** An instant AI answer engine for all of Split's municipal rules, spatial plans, and permits.
- **Target User:** Local business owners, developers, and citizens navigating bureaucracy.
- **Core AI Feature:** Retrieval-Augmented Generation (RAG) using Split's public PDFs, spatial plans (GUP), and City Council decisions.
- **Differentiator:** Replaces tedious searching through unstructured city websites with an instant, conversational answer complete with citations.
- **Feasibility:** 5 — Extremely fast to build using standard RAG tools and a few scraped PDFs.
- **Demo-ability:** 4 — Highly effective demo; asking a complex zoning question and getting an instant, cited answer proves immediate value.
- **Judging Strengths:** High actual value, extremely achievable MVP.

### Idea 2: Nextbike Whisperer (Predictive Availability)
- **Pitch:** AI that predicts if you'll actually find a bike or an empty slot at your destination in 15 minutes.
- **Target User:** Commuters and tourists relying on Split's micromobility network.
- **Core AI Feature:** Time-series prediction based on historical Nextbike GBFS data (which is openly available, per R03).
- **Differentiator:** Goes beyond current "real-time" apps by offering "future-time" certainty, encouraging eco-mobility.
- **Feasibility:** 4 — GBFS data is accessible, though the ML model needs a bit of mocked historical data for a hackathon.
- **Demo-ability:** 4 — A sleek UI showing probability percentages on a map is very visually compelling.
- **Judging Strengths:** Utilizes real open data (GBFS), directly impacts urban mobility.

### Idea 3: Smart Smeće Vision (Instant Commute Tracker)
- **Pitch:** Take a photo of an overflowing bin; AI classifies the waste, estimates volume, and auto-routes to Čistoća.
- **Target User:** Eco-conscious citizens and city wardens.
- **Core AI Feature:** Vision model to classify waste type (plastic, mixed, bulky) and severity (overflow percentage).
- **Differentiator:** Automates the triage step for city workers, meaning they don't have to manually sort through thousands of citizen reports.
- **Feasibility:** 5 — Image classification via Gemini is trivial to implement.
- **Demo-ability:** 5 — Live uploading a picture of a trash pile and seeing it instantly tagged with "Bulk Waste - High Priority" is a guaranteed crowd-pleaser.
- **Judging Strengths:** Demo-ability and AI usage.

## Cross-Pollination Notes
- **Smart Smeće Vision** overlaps perfectly with the **Gradsko oko Vision** idea from I01. They are essentially the exact same technical implementation applied to slightly different angles.
- **Split Zmaj (RAG)** could be the foundational layer for the "AI Assistant" that the City of Split wants to build with its €2M budget (from R01).

## Research Gaps Noticed
- While GBFS data is available, historical datasets for a true predictive model might be hard to download in bulk during a hackathon, necessitating mock historical data.
