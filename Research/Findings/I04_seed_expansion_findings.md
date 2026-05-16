# I04: Seed Expansion Sprint — Ideation Results

> **Executed:** 2026-05-16T10:55:00Z
> **Creative Angle:** Expanding the SplitAI seed in 5 different architectural/thematic directions.
> **Agent Model:** Gemini 3.1 Pro (High)
> **Research Inputs Used:** R04, R05, pre_hackathon_mock_idea_reference

## Ideas Generated

### Idea 1: Split Sentinel (Splitski Stražar)
- **Pitch:** An AI command center that triages reports and predicts hotspots for city wardens.
- **Primary Focus:** B2G (Business to Government) - Optimizing the backend of municipal enforcement rather than the citizen-facing app.
- **Target User Persona:** City Warden (Komunalni redar) managing night-shift public order and party tourism.
- **Core AI Features:** Predictive hotspot mapping (time/location forecasting), Automated ticket drafting via Vision AI (reading license plates/identifying violations), Duplicate report clustering.
- **Integration Strategy:** Gradsko oko (backend integration for triage), Smart City Split (billing for fines).
- **Modular Architecture:** An event-driven architecture where incoming reports are placed on a queue, enriched by AI, and dispatched to a dashboard.
- **Killer Demo Moment:** Injecting 50 simulated messy complaints at once and showing the AI instantly group them into 3 high-priority tasks and map the optimal patrol route.
- **Scoring:**
  - Feasibility: 4
  - Demo-ability: 5
  - AI Depth: 4
  - City Alignment: 5
  - Uniqueness: 4

### Idea 2: Split Compass (Splitski Kompas)
- **Pitch:** A multilingual AI that guides tourists away from crowds and predicts bus arrivals.
- **Primary Focus:** Mitigating tourist overcrowding and fixing transit frustrations.
- **Target User Persona:** First-time international tourist overwhelmed by crowds at Diocletian's Palace and confused by buses.
- **Core AI Features:** Real-time crowd heatmaps (predictive modeling), NLP-based transit querying ("When's the next bus to Žnjan?"), Contextual rule translation (noise bans).
- **Integration Strategy:** Promet Split (mocked ETAs), Nextbike (availability), GIS (tourist zones).
- **Modular Architecture:** A lightweight progressive web app (PWA) with location-based triggers and a heavily cached RAG engine for transit queries.
- **Killer Demo Moment:** Asking "I'm at the Peristil and it's too crowded, where should I go?" and getting a dynamic route to a quieter historical site with an instant bus ETA.
- **Scoring:**
  - Feasibility: 4
  - Demo-ability: 4
  - AI Depth: 3
  - City Alignment: 4
  - Uniqueness: 3

### Idea 3: Split Hero (Splitski Junak)
- **Pitch:** A gamified reporting app that rewards citizens for identifying and verifying municipal issues.
- **Primary Focus:** Rebuilding trust in civic reporting (Gradsko oko) through transparency and civic rewards.
- **Target User Persona:** Frustrated resident who feels their past reports about illegal dumping (Karepovac issues) were ignored.
- **Core AI Features:** Vision AI to verify fixed issues (before/after comparison), LLM to translate bureaucratic status updates into plain language, Automated reward point calculation.
- **Integration Strategy:** Gradsko oko (reporting), Smart City Split (applying reward points to parking/bills).
- **Modular Architecture:** Gamification engine integrated with the user profile state, relying on external mocked webhook callbacks for issue resolution.
- **Killer Demo Moment:** User uploads a photo of a cleaned-up park (verified by AI), instantly earning "City Points" that discount their next parking ticket.
- **Scoring:**
  - Feasibility: 4
  - Demo-ability: 4
  - AI Depth: 3
  - City Alignment: 4
  - Uniqueness: 4

### Idea 4: Split Builder (Splitski Graditelj)
- **Pitch:** An AI consultant that instantly answers complex spatial planning and zoning questions.
- **Primary Focus:** Cutting red tape and accelerating urban development for residents and businesses.
- **Target User Persona:** Local homeowner or small investor trying to get a permit for a restaurant terrace or roof renovation.
- **Core AI Features:** Deep RAG over complex PDFs (GUP, PPUG, Odluka o komunalnom redu), Generative AI for visualizing compliant architectural changes, automated permit drafting.
- **Integration Strategy:** GIS/Geoportal (zoning map boundaries).
- **Modular Architecture:** A heavy document-retrieval system (Vector DB) with spatial query capabilities to map user coordinates to zoning laws.
- **Killer Demo Moment:** Dropping a pin on a map, asking "Can I build a 3-story hostel here?", and getting a cited "No" with the exact PDF paragraph highlighted.
- **Scoring:**
  - Feasibility: 3
  - Demo-ability: 5
  - AI Depth: 5
  - City Alignment: 4
  - Uniqueness: 5

### Idea 5: Glas Splita (Voice of Split)
- **Pitch:** An inclusive, voice-first AI hotline that helps the elderly access city services.
- **Primary Focus:** Digital inclusion and overcoming the friction of buggy mobile apps.
- **Target User Persona:** Elderly resident (umirovljenik) who struggles with smartphones but needs to check their city utility bills.
- **Core AI Features:** Voice-to-text with local dialect resilience (understanding Splitski/Čakavski terms), Conversational state machine for handling bill payments, Text-to-speech empathy.
- **Integration Strategy:** Smart City Split (Moj Split - querying bills).
- **Modular Architecture:** Integration with a telephony API (e.g., Twilio) connecting to a conversational AI agent backend.
- **Killer Demo Moment:** Making a live phone call to the AI, speaking with a heavy Dalmatian accent ("Jel mi doša račun za čistoću?"), and hearing it correctly summarize the outstanding balance.
- **Scoring:**
  - Feasibility: 3
  - Demo-ability: 5
  - AI Depth: 4
  - City Alignment: 4
  - Uniqueness: 5

## Cross-Pollination Notes
- **Sentinel + Builder:** The City Warden dashboard (Sentinel) could easily integrate the RAG capabilities (Builder) so wardens can instantly cite the exact rule they are enforcing.
- **Hero + Compass:** Gamification elements (Hero) could be applied to tourists (Compass) – e.g., rewarding tourists with discounts for using Nextbike instead of Ubers during peak hours.
- **Vision AI is universal:** All variants benefit from the core "Marjan Vision" seed feature, whether for ticketing (Sentinel), verifying fixes (Hero), or assessing crowd size (Compass).

## Research Gaps Noticed
- Would need actual samples of "Splitski" dialect audio to train or test the voice recognition capabilities for Idea 5.
- Need exact details on the reward mechanisms available in the real "Smart City Split" app to ensure Idea 3 is grounded in reality.
