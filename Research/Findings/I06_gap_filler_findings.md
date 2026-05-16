# I06: Gap-Filler — What's Missing in Split's Digital Ecosystem? — Ideation Results

> **Executed:** 2026-05-16T10:58:00+02:00
> **Creative Angle:** Frustrated Split resident who just moved from Barcelona, designing what they wish existed to fix the fragmented ecosystem.
> **Agent Model:** Gemini 3.1 Pro (High)
> **Research Inputs Used:** R03 (Tech Data), R05 (System Integration), R06 (EU Benchmarks)

## Sprint Angle
Filling the gaps between Split's heavily siloed, proprietary systems (which lack open APIs) and the unified, proactive, and multilingual smart city experiences seen in Barcelona, Helsinki, and Venice.

## Ideas Generated

### Idea 1: SplitAI Super-App Middleware (The Unified Aggregator)
- **Pitch:** One multilingual chat interface that talks to Promet, Parking, and bills simultaneously.
- **Gap Being Filled:** Bridges the disjointed, closed systems (Promet, Split Parking, Moj Split) into a single conversational hub, much like Helsinki's Hester or Seoul's 120 Dasan, eliminating the need for 5 separate apps.
- **Target User Persona:** Frustrated citizens and expats who hate navigating clunky, disconnected local portals.
- **Core Features:** Natural language query routing across mocked subsystems; Multilingual 24/7 support; Unified user profile for bills and transit.
- **Integration Points:** Promet Split (transit), Split Parking, Moj Split (bills).
- **Modular Expansion Path:** MVP offers read-only availability and schedules. V2 allows executing write-actions (paying a bill, booking a ticket) directly through chat.
- **Killer Demo Moment:** User asks in Spanish, "Where can I park near the center and catch a bus to the beach?" The AI instantly queries both the parking and transit APIs to generate a seamless multimodal route.
- **Scoring:** Feasibility 4, Demo 5, AI Depth 4, City Alignment 5, Uniqueness 3

### Idea 2: Vision-Powered "Gradsko Oko" Auto-Triage
- **Pitch:** Snap a photo of a pothole, and AI instantly classifies, geolocates, and drafts the work order.
- **Gap Being Filled:** Replaces the manual, slow ticketing queue of "Gradsko oko" with automated severity scoring and department routing using advanced computer vision.
- **Target User Persona:** Civically engaged residents tired of feeling their infrastructure reports fall into a black hole.
- **Core Features:** Image classification via Gemini Vision; Automatic severity scoring based on city regulations (RAG); Direct department routing.
- **Integration Points:** Gradsko oko (mocked), GIS/Geoportal, Odluka o komunalnom redu.
- **Modular Expansion Path:** V1 empowers citizens with instant classification. V2 mounts cameras on Čistoća (garbage) trucks for passive, automated infrastructure scanning.
- **Killer Demo Moment:** Uploading a photo of graffiti on a historic wall; the AI identifies the stone type, references UNESCO rules from its RAG knowledge base, and flags it as "High Priority Vandalism" for immediate cleaning.
- **Scoring:** Feasibility 4, Demo 5, AI Depth 5, City Alignment 4, Uniqueness 4

### Idea 3: Peristil Pace (Crowd Control Engine)
- **Pitch:** Real-time forecasting and alternative routing to prevent Old Town tourist bottlenecks.
- **Gap Being Filled:** While Dubrovnik and Venice have active crowd control measures, Split's historic center suffers from unmanaged congestion.
- **Target User Persona:** Locals trying to commute through the center, and city managers tasked with preventing dangerous crowd crushes.
- **Core Features:** Predictive heatmaps based on cruise schedules; Live crowd status indicators; Alternative "local" route suggestions for tourists.
- **Integration Points:** GIS/Geoportal, National Data Portal, mocked CCTV crowd density feeds.
- **Modular Expansion Path:** V1 uses static cruise schedules and historical data to predict bottlenecks. V2 integrates live computer vision from municipal cameras for real-time traffic-light pacing.
- **Killer Demo Moment:** The AI sends a proactive push notification: "Peristil will be blocked in 15 mins by 3 arriving cruise groups. Re-routing your walk via the Riva."
- **Scoring:** Feasibility 3, Demo 4, AI Depth 4, City Alignment 5, Uniqueness 5

### Idea 4: GUP Guru (Zoning & Permits Copilot)
- **Pitch:** Ask natural questions about Split's complex urban rules and get instant, cited answers.
- **Gap Being Filled:** Translates static, dense PDF regulations (GUP, PPUG) into accessible, interactive knowledge, a transparency feature lacking in current portals.
- **Target User Persona:** Property owners, small business owners, and architects navigating Split's notorious bureaucracy.
- **Core Features:** RAG over municipal spatial plans; Multilingual explanations; "Can I build this?" logic checker.
- **Integration Points:** GIS / Geoportal Split spatial plans, Komunalni Red, National Data Portal.
- **Modular Expansion Path:** V1 serves as an answering engine with citations. V2 automatically pre-fills required permit applications based on the user's chat history.
- **Killer Demo Moment:** A user asks, "Can I put a glass terrace on my cafe in the Varoš neighborhood?" The AI checks zoning rules and instantly replies "No, conservation rules forbid it, but you can use a retractable awning," citing the exact page in the rulebook.
- **Scoring:** Feasibility 5, Demo 4, AI Depth 5, City Alignment 4, Uniqueness 4

## Cross-Pollination Notes
- **Idea 2 (Auto-Triage)** and **Idea 4 (GUP Guru)** share a strong foundation in RAG (knowledge of city rules). They could be combined so that when a citizen reports an issue, the AI immediately cites the specific rule being violated.
- **Idea 1 (Super-App)** could serve as the primary frontend for all of these features, creating a true "Civic Super-Agent" that handles crowds (Idea 3), complaints (Idea 2), and transit (Idea 1) through a single unified chat interface.

## Research Gaps Noticed
- Exact technical constraints of "Gradsko oko" are unknown, so we must rely heavily on mocking its endpoints for the MVP.
- Real-time crowd data for Split doesn't currently exist openly, so we will need to simulate this data source for Idea 3.
