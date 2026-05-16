# I01: Citizen-First AI Solutions — Ideation Results

> **Executed:** 2026-05-13 20:25
> **Creative Angle:** Citizen-first, daily local life (focusing entirely on Split residents)
> **Agent Model:** Opus 4.6 (Thinking)
> **Research Inputs Used:** R01_split_vision_findings.md, R02_pain_points_findings.md

## Ideas Generated

### Idea 1: Gradsko oko Voice & Vision AI
- **Pitch:** Talk to or show an AI your civic problem, and it auto-drafts the official report.
- **Target User:** Older or busy Split residents who find existing municipal apps clunky.
- **Core AI Feature:** Image analysis to detect issue types (pothole, illegal parking) and NLP to convert Croatian dialects/voice into structured reports.
- **Differentiator:** Removes all friction from civic engagement; no forms to fill out, just snap and talk.
- **Feasibility:** 5 — Wrapping the Gemini API around an image/audio upload is extremely fast.
- **Demo-ability:** 5 — Very visual; taking a picture of trash and watching the AI instantly fill out a detailed municipal ticket is a huge "wow" moment.
- **Judging Strengths:** High actual value, extremely demo-able.

### Idea 2: Kvart AI (Hyper-Local Community Hub)
- **Pitch:** AI curates and translates city news, neighborhood alerts, and community needs per "kvart" (neighborhood).
- **Target User:** Residents feeling disconnected from city hall or neighbors (e.g., Plokite, Mejaši).
- **Core AI Feature:** AI summarization of unstructured city PDF updates and social media groups into personalized daily briefs.
- **Differentiator:** Hyper-localized information; instead of reading all Split news, you only see what affects your specific street.
- **Feasibility:** 4 — Requires scraping some local news or FB groups, then passing through an LLM.
- **Demo-ability:** 3 — Good, but less flashy than visual/audio tools.
- **Judging Strengths:** High impact on community building.

### Idea 3: Split Zimski Oživljivač (Winter Revitalizer)
- **Pitch:** Matches local residents with winter-operating businesses via AI-driven dynamic discounts to combat the "dead city" vibe.
- **Target User:** Residents who stay in Split year-round and local businesses struggling in the off-season.
- **Core AI Feature:** Recommendation engine matching user preferences with local businesses offering excess inventory or low foot traffic.
- **Differentiator:** Focuses entirely on the off-season economy, specifically tackling the winter depression of Zona A.
- **Feasibility:** 3 — Needs a mocked business database and a matching algorithm.
- **Demo-ability:** 4 — A Tinder-style matching interface for local deals could look great.
- **Judging Strengths:** High actual value, directly addresses a documented pain point from R02.

## Cross-Pollination Notes
- **Gradsko oko Voice & Vision AI** could be easily merged with the **Pragmatic AI sprint (I02)** since it relies on simple, highly effective API calls.
- **Split Zimski Oživljivač** shares DNA with tourism routing—the same recommendation engine could route tourists in the summer and locals in the winter.

## Research Gaps Noticed
- We don't have the exact fields required by the actual "Gradsko oko" system, so we would have to mock the final submission payload.
