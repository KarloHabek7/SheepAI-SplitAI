# I05: Gemini-Maximal — What Can ONLY AI Do? — Ideation Results

> **Executed:** 2026-05-16T10:57:00+02:00
> **Creative Angle:** Ideas that are impossible without AI — pushing Gemini to its limits.
> **Agent Model:** Gemini 3.1 Pro (High)
> **Research Inputs Used:** R07_gemini_audit_findings.md, pre_hackathon_mock_idea_reference.md

## Ideas Generated

### Idea 1: SplitLive Bidi-Guide
- **Pitch:** Real-time, hands-free multilingual AI tour guide that sees what you see.
- **Why it NEEDS AI:** Real-time translation, historical knowledge retrieval, and live visual recognition cannot be done simultaneously by any traditional app or human guide at scale.
- **Target User:** International tourists exploring Diocletian's Palace.
- **Gemini Features Used:** Multimodal Live API (WebSockets) with `gemini-2.5-flash-native-audio` and continuous video streaming.
- **Input → Output Flow:** Live camera feed + tourist's native voice questions → Spoken translation and historical context based on visual feed.
- **Killer Demo Moment:** Pointing a phone at an unmarked column, asking "Was ist das?" (What is this?), and instantly hearing "Das ist eine ägyptische Sphinx..." based purely on the video feed.
- **Scoring:** Feasibility: 3, Demo-ability: 5, AI Depth: 5, City Alignment: 4, Uniqueness: 5

### Idea 2: Omni-Inspector (Komunalni Skener)
- **Pitch:** Dashcam AI that automatically logs city violations as municipal vehicles drive.
- **Why it NEEDS AI:** Humans cannot actively drive and flawlessly categorize every pothole, graffiti, and parking violation with exact severity scores simultaneously.
- **Target User:** Municipal wardens (komunalni redari) and city vehicles (buses/garbage trucks).
- **Gemini Features Used:** Multimodal Live API (1 FPS video stream) + Strict JSON Structured Outputs (`response_schema`).
- **Input → Output Flow:** Dashcam video feed → Continuous JSON stream of categorized civic issues (hazard type, severity, location) mapped to a dashboard.
- **Killer Demo Moment:** Playing a 30-second driving video through the system and watching a live map instantly light up with categorized and prioritized civic issues.
- **Scoring:** Feasibility: 4, Demo-ability: 5, AI Depth: 4, City Alignment: 5, Uniqueness: 4

### Idea 3: GUP Oracle (Urbanist-in-a-Box)
- **Pitch:** Instantly verify if your architectural sketch is legal against Split's zoning laws.
- **Why it NEEDS AI:** Cross-referencing hundreds of pages of complex spatial plans (GUP) against a visual drawing takes human architects hours or days.
- **Target User:** Local residents planning renovations, architects, and city planners.
- **Gemini Features Used:** Context Caching (entire Split GUP PDF loaded in RAM) + Vision API.
- **Input → Output Flow:** User uploads a napkin sketch of a terrace + address → Gemini cross-references the cached GUP and outputs a strict JSON report of violations.
- **Killer Demo Moment:** Uploading a scribbled drawing of a new balcony and getting an exact page citation from the GUP explaining why it exceeds maximum height for Zona A.
- **Scoring:** Feasibility: 5, Demo-ability: 4, AI Depth: 5, City Alignment: 5, Uniqueness: 5

### Idea 4: Split Whisperer (Dialect-to-Action API)
- **Pitch:** Voice-first issue reporting that perfectly understands heavy Dalmatian dialect.
- **Why it NEEDS AI:** Traditional speech-to-text fails on informal Dalmatian dialect ("fjaka", "pazar", "škovace"). Deep LLM context is required to map slang to bureaucratic terms.
- **Target User:** Elderly Split residents or frustrated citizens who prefer WhatsApp voice notes over web forms.
- **Gemini Features Used:** `gemini-2.5-flash-native-audio` + Structured Outputs + Function Calling.
- **Input → Output Flow:** A furious, slang-filled 20-second voice note complaining about trash → Function call to `createTicket` with perfectly formatted, polite bureaucratic data.
- **Killer Demo Moment:** Playing a deeply local, slang-filled, angry Croatian voice note and watching the AI instantly create a perfectly formatted, polite ticket for "Bulk Waste Management".
- **Scoring:** Feasibility: 5, Demo-ability: 5, AI Depth: 4, City Alignment: 5, Uniqueness: 4

## Cross-Pollination Notes
- Idea 2 (Omni-Inspector) and Idea 4 (Split Whisperer) heavily complement the existing SplitAI (The Unified Municipal Agent) core from the pre-hackathon reference. They supercharge the "Marjan Vision" and "Split Zmaj" features by pushing them into automated dashcam feeds and audio-first dialect interfaces.
- Idea 3 (GUP Oracle) can be integrated as the ultimate "wow" feature for the RAG engine component of SplitAI, upgrading it from text-only Q&A to multimodal sketch verification.

## Research Gaps Noticed
- We need a small sample of representative dashcam footage of Split streets to test the Omni-Inspector concept effectively for the demo.
- We require access to a digital copy of the Split General Urban Plan (GUP) to use for Context Caching.
