# Selected Idea: SplitAI — The Unified Municipal AI Agent (Refined)

> **Decision Date:** 2026-05-16
> **Decided By:** Karlo (Team Lead) — confirmed direction, refined via `/ideate`
> **Research Backing:** 6 research tasks (R04–R09), 4 ideation sprints (I04–I07), 20+ total ideas evaluated
> **Convergence Score:** 🔴 Very High — 8 of 10 research/ideation outputs independently converged on a "unified civic AI agent" with RAG + Vision at its core

---

## Research Landscape Summary

### Market Opportunity
Split's citizens are **furious** about three things (R04):
1. **Party tourism noise** destroying Old Town livability (rage-level intensity)
2. **Broken transit app** (Promet Split) with useless real-time tracking
3. **Gradsko oko reports going into a black hole** — 7-day SLA met with paper-pushing, not fixes

Tourists complain about **overcrowding at Diocletian's Palace** and **tourist-trap pricing** (R04). Both groups share frustration with fragmented, unreliable digital services.

### Technical Landscape
- **All municipal systems are closed** — no public APIs for Gradsko oko, Split Parking, Promet Split, or Smart City Split (R05)
- **MVP must mock integrations** — but this is fine for a hackathon; the architecture just needs clean tool-calling interfaces (R05)
- **Gemini 2.5 Flash** is the optimal model: free tier (1,500 RPD), 1M token context, excellent Croatian + Dalmatian dialect, strict JSON outputs, and native audio (R07)
- **Context Caching** enables loading entire GUP (250+ pages) into RAM for instant Q&A (R07)
- **RAG goldmine**: GUP, Komunalni Red, Službeni Glasnik are all publicly available PDFs with high RAG readiness (R08)

### Competitive Gaps
No Mediterranean city has unified **multilingual tourist assistance + citizen issue reporting via Vision AI + municipal regulation RAG** into a single agent (R06). Split can leapfrog:
- **Dubrovnik** (has crowd monitoring but no AI guidance)
- **Venice** (has control room but closed to citizens)
- **Helsinki** (has Hester chatbot but fragmented across siloed bots)
- **Barcelona** (has Sentilo IoT but limited AI in civic engagement)
- **Seoul** (has AI call center but no vision/multimodal)

### Hackathon-Specific Factors
Judging weights (R09): **Technical Execution & AI Depth (35%) + Feasibility & City Impact (35%) + Innovation & UX (30%)**. Key winning strategies:
- **1 thing deeply > 3 things broadly** — perfect the core AI loop
- **Live demo, not slides** — show real inference on real data
- **Start with the pain** — relatable Split scenario, then instant resolution
- **Sub-second response times** and premium UI are mandatory

### Key Insight Intersections
Multiple research streams independently point to the same opportunity:
1. R04 (complaints) + R05 (systems) + R06 (competitors) → **Unified civic super-agent**
2. R07 (Gemini) + R08 (regulations) → **RAG on city PDFs with Vision AI classification**
3. R09 (judging) + R04 (pain points) → **Photo-to-ticket as the killer demo moment**

---

## Idea Consolidation & Scoring

### Deduplication Results
After merging overlapping concepts across 4 sprints, **13 unique ideas** emerged, clustered into 4 families:

| Cluster | Ideas | Convergence Signal |
|---|---|---|
| **🏛️ Unified Civic Agent** | I04-Idea1 (Sentinel), I06-Idea1 (Super-App), I07-Idea1 (Triage Hub) | 🔴 3 sprints |
| **📸 Vision AI Reporting** | I05-Idea2 (Omni-Inspector), I06-Idea2 (Auto-Triage), I05-Idea4 (Whisperer) | 🔴 3 sprints |
| **📜 RAG Regulation Engine** | I04-Idea4 (Builder), I05-Idea3 (GUP Oracle), I06-Idea4 (GUP Guru) | 🔴 3 sprints |
| **🧭 Tourist Navigation** | I04-Idea2 (Compass), I05-Idea1 (BidiGuide), I06-Idea3 (Peristil Pace) | 🟡 2 sprints |

### Scoring Matrix

Criteria weights from R09: Feasibility (20%), Demo Impact (25%), AI Depth (20%), City Alignment (20%), Uniqueness (15%).

| # | Idea | Feas. (20%) | Demo (25%) | AI (20%) | City (20%) | Uniq. (15%) | **Weighted** |
|---|---|---|---|---|---|---|---|
| 1 | **SplitAI Unified Agent** (merged: Sentinel + Super-App + Triage) | 4 | 5 | 5 | 5 | 4 | **4.65** |
| 2 | **Vision Auto-Triage** (merged: Omni-Inspector + Auto-Triage + Whisperer) | 4 | 5 | 5 | 5 | 4 | **4.65** |
| 3 | **GUP Oracle** (merged: Builder + GUP Guru) | 4 | 5 | 5 | 4 | 5 | **4.60** |
| 4 | Smart Split Sound & Sentiment (I07-Idea2) | 3 | 5 | 5 | 5 | 5 | **4.55** |
| 5 | SplitLive Bidi-Guide (I05-Idea1) | 3 | 5 | 5 | 4 | 5 | **4.40** |
| 6 | Glas Splita Voice Hotline (I04-Idea5) | 3 | 5 | 4 | 4 | 5 | **4.20** |
| 7 | Peristil Pace Crowd Control (I06-Idea3) | 3 | 4 | 4 | 5 | 5 | **4.10** |
| 8 | Omni-Transit Predictor (I07-Idea3) | 4 | 4 | 4 | 5 | 3 | **4.00** |
| 9 | Dynamic Waste Oracle (I07-Idea4) | 4 | 4 | 3 | 5 | 4 | **3.95** |
| 10 | Split Hero Gamification (I04-Idea3) | 4 | 4 | 3 | 4 | 4 | **3.80** |
| 11 | Split Compass Tourist Nav (I04-Idea2) | 4 | 4 | 3 | 4 | 3 | **3.65** |

---

## Top 5 Deep-Dive

### #1: SplitAI — The Unified Municipal AI Agent (RECOMMENDED)

| Dimension | Assessment |
|---|---|
| **One-Line Pitch** | One AI agent for Split: ask anything, report anything, in any language. |
| **Target User** | Split resident (Marija, 42, frustrated by bureaucracy), international tourist (Thomas, 28, confused by transit), city warden (Ivan, 55, drowning in reports) |
| **Core AI Feature** | Gemini 2.5 Flash with Function Calling — routes natural language requests to the correct municipal subsystem via structured tool calls |
| **Competitive Moat** | First Mediterranean civic super-agent unifying RAG + Vision + multilingual chat. No city has done this end-to-end. |
| **MVP Features** | **Must-have:** (1) RAG Q&A on city regulations (GUP, Komunalni Red), (2) Photo-to-ticket Vision AI reporting, (3) Multilingual conversational interface. **Nice-to-have:** (4) Admin triage dashboard, (5) Voice input with dialect support |
| **Technical Risk** | RAG hallucination on legal docs → mitigate with Context Caching + strict citation. Demo latency → use Flash model with JSON schema for deterministic sub-second responses. |
| **Demo Script** | Tourist asks in German about parking rules → instant translated answer with citation. Citizen uploads pothole photo → AI classifies severity, drafts ticket, shows admin dashboard. |
| **Research Evidence** | R04 (complaints validate need), R05 (fragmented systems validate super-agent), R06 (no competitor has unified this), R07 (Gemini can do it), R08 (RAG docs available), R09 (demo-first strategy) |
| **Convergence Signal** | 🔴 8/10 outputs converged on this concept |

✅ Combines the highest-impact features from ALL clusters
✅ Directly aligns with Split's €2M AI Center initiative
✅ Maximum demo versatility — can show RAG, Vision, and multilingual in 60 seconds
✅ Clean architecture with mocked tool-calling endpoints
❌ Risk of over-scoping if we try to do everything equally deeply

### #2: Vision Auto-Triage Engine

| Dimension | Assessment |
|---|---|
| **One-Line Pitch** | Snap a photo of any city problem — AI instantly classifies, prioritizes, and dispatches. |
| **Target User** | Civically engaged resident tired of Gradsko oko's black hole |
| **Core AI Feature** | Gemini Vision + Structured JSON Outputs → instant severity scoring and department routing |
| **Competitive Moat** | Automated CV-based triage with regulatory cross-reference is unique to Split |
| **MVP Features** | (1) Photo upload → structured classification, (2) Severity scoring with RAG regulation check, (3) Admin dashboard with grouped/deduplicated issues |
| **Technical Risk** | Low — Vision classification is Gemini's strongest capability |
| **Demo Script** | Upload graffiti on historic wall → AI identifies UNESCO zone, flags high priority, drafts work order |
| **Research Evidence** | R04 (Gradsko oko frustration), R06 (no competitor does CV triage), R07 (Gemini Vision excellent) |
| **Convergence Signal** | 🔴 3 sprints independently proposed this |

✅ Highest demo impact — visual, instant, tangible
✅ Technically safest — Vision classification is mature
❌ Narrower scope — only solves reporting, not Q&A or tourist needs

### #3: GUP Oracle (Urbanist-in-a-Box)

| Dimension | Assessment |
|---|---|
| **One-Line Pitch** | Ask any zoning or permit question about Split — get a cited legal answer in seconds. |
| **Target User** | Property owner navigating renovation permits, café owner asking about terrace rules |
| **Core AI Feature** | Context Caching of full GUP PDF (250+ pages) + Gemini RAG with page-level citations |
| **Competitive Moat** | No city worldwide offers AI-powered zoning Q&A with exact document citations |
| **MVP Features** | (1) Natural language zoning Q&A, (2) Exact page/article citations, (3) Multilingual support |
| **Technical Risk** | Medium — complex legal documents may produce ambiguous answers. Mitigate with strict citation requirement. |
| **Demo Script** | "Can I build a glass terrace on my café in Varoš?" → "No, Article 47 prohibits..." with highlighted PDF section |
| **Research Evidence** | R08 (RAG document catalog), R07 (Context Caching), R04 (bureaucracy frustration) |
| **Convergence Signal** | 🔴 3 sprints independently proposed this |

✅ Extremely high "wow" — judges love live document Q&A with citations
✅ Uses Gemini's strongest differentiator (Context Caching + 1M context)
❌ Narrow audience — mainly relevant to property owners / businesses

### #4: Smart Split Sound & Sentiment

| Dimension | Assessment |
|---|---|
| **One-Line Pitch** | AI predicts noise hotspots and nudges tourists before parties escalate. |
| **Target User** | Old Town resident suffering from party tourism, city warden on night shift |
| **Core AI Feature** | Predictive analytics + automated multilingual nudges |
| **Technical Risk** | High — no existing audio sensor infrastructure in Split. Would need heavy mocking. |
| **Convergence Signal** | 1 sprint (I07) |

✅ Solves the #1 pain point (party tourism noise)
❌ Heavy reliance on infrastructure that doesn't exist → hard to demo convincingly

### #5: SplitLive Bidi-Guide

| Dimension | Assessment |
|---|---|
| **One-Line Pitch** | Point your phone at anything in Split — AI tells you what it is, in your language. |
| **Target User** | International tourist exploring Diocletian's Palace |
| **Core AI Feature** | Multimodal Live API (WebSocket) with real-time video + native audio |
| **Technical Risk** | Medium — Live API at 1 FPS may be laggy. Backend proxy needed for security. |
| **Convergence Signal** | 1 sprint (I05) |

✅ Highest possible "wow factor" if it works
❌ Technically fragile for a live demo — WebSocket stability is unpredictable

---

## Final Decision

### 🏆 Selected: SplitAI — The Unified Municipal AI Agent

**Why #1 wins over the others:**
- It **subsumes** #2 (Vision Triage) and #3 (GUP Oracle) as features rather than standalone products
- It scores highest on **City Alignment** because it serves all 3 stakeholders simultaneously (R04, I07)
- It perfectly matches the judging criteria: **deep AI** (RAG + Vision + multilingual), **real city impact** (addresses top 3 pain points), **innovative UX** (one conversational interface for everything)
- R09 says "1 thing deeply > 3 things broadly" — but SplitAI's "1 thing" IS the unified agent. The depth comes from how well the AI routes between its capabilities.

**What would need to be true for a runner-up to win:**
- **#2 (Vision Triage)** would win if we had < 8 hours left and needed to cut scope drastically
- **#3 (GUP Oracle)** would win if judges heavily weighted regulatory/legal innovation
- **#5 (Bidi-Guide)** would win if we could guarantee WebSocket stability for the live demo

---

## One-Line Pitch
One AI agent for Split: ask anything, report anything, in any language.

## Target User
Three personas served simultaneously:
- **Marija** (42, Split resident) — reports neighborhood issues, asks about regulations
- **Thomas** (28, German tourist) — asks about parking, transit, and cultural rules in his language
- **Ivan** (55, komunalni redar) — receives pre-triaged, deduplicated reports with optimized routes

## Core Features (MVP Scope)

### Must-Have (Demo Critical)
1. **"Split Zmaj" RAG Engine** — Conversational Q&A over Split's GUP, Komunalni Red, and city regulations. Users ask natural language questions → get cited answers with exact article references. Powered by Gemini Context Caching with 1M token window. Includes the **"Siren Translator"** (scan a QR code during emergencies for instant, multilingual safety instructions).
2. **"Marjan Vision" Photo Reporting** — User uploads a photo of a civic issue (pothole, graffiti, overflowing bin). Gemini Vision classifies the issue type, estimates severity (1–10), extracts location, and generates a structured JSON payload ready for Gradsko oko. All in < 1 second.
3. **Pazar Market Feed (Daily Utility)** — Vendors snap a photo of their stall at 7am. Gemini Vision identifies produce/fish, extracts prices, and generates a live, structured feed for residents (e.g., "Sardines €8/kg, gone by 9:30"). Adds daily emotional hook and recurring usage.
4. **Multilingual Conversational Interface** — Single chat UI that auto-detects language and handles Croatian (including Dalmatian dialect), English, German, Italian, French. Uses Gemini's native multilingual capabilities — no separate translation layer needed.
5. **"Gradsko Oko" 3D Isometric Map** — A full-screen, stylized grayscale 3D map of Split (Mapbox GL JS) serving as the app's visual centerpiece and home screen. All civic reports appear as colored GeoJSON markers (red = open, yellow = in progress, green = resolved) on top of subtle 3D building extrusions. Features include: fixed isometric camera (pitch 60°, bearing -35°), marker clustering for scalability, status/category/severity filters, "locate me" GPS button, click-to-inspect issue details via side panel (desktop) or bottom sheet (mobile), and pin adjustment for new report location. The map transforms the app from a chatbot into a **civic control center** — judges see the entire city’s issue landscape at a glance. Integrates the colleague’s "Gradsko Oko Split" vision as a core feature rather than a standalone product.

### Nice-to-Have (Cut if behind schedule)
6. **"Đir Index" (Anti-Crowd Proxy)** — A mocked tool showing crowd levels in the center (simulating WiFi analytics) to suggest alternative tourist routes and relieve locals.
7. **Admin Triage Dashboard** — Simple view showing AI-categorized reports grouped by type, severity, and location. Demonstrates the B2G value for city workers.
8. **Voice Input with Dialect Support** — Using `gemini-2.5-flash-native-audio` for hands-free reporting. The "Split Whisperer" feature: angry Dalmatian voice note → perfectly formatted bureaucratic ticket.

## Why This Idea Wins
- **Research-validated pain points:** Addresses the top 3 citizen frustrations identified in R04 (noise enforcement gaps, broken transit info, ignored reports)
- **Judging criteria alignment:** Scores maximum on all 3 axes — Technical AI Depth (35%), City Impact (35%), and Innovation/UX (30%) per R09
- **No competitor has unified this:** R06 confirms no Mediterranean city combines RAG + Vision + multilingual in one agent
- **Technically proven:** R07 confirms Gemini 2.5 Flash handles all required capabilities on free tier
- **RAG content is freely available:** R08 cataloged 5+ high-value municipal PDFs ready for ingestion
- **Demo versatility:** Can show 3 distinct AI capabilities in 60 seconds, each with visual output

## Research Evidence Summary
| Finding | Source | Implication |
|---|---|---|
| Citizens rage about ignored Gradsko oko reports | R04 | Vision AI auto-triage directly solves the bottleneck |
| All municipal systems are closed — no public APIs | R05 | Architecture must use mocked tool-calling endpoints (clean for demo) |
| No Mediterranean city has unified RAG + Vision + multilingual | R06 | Unique competitive position — judges will notice |
| Gemini 2.5 Flash: free tier, 1M context, strict JSON, Croatian fluency | R07 | All core features are technically feasible on free tier |
| GUP, Komunalni Red, Službeni Glasnik are high-value RAG targets | R08 | RAG content exists and is ready for ingestion |
| Judges want: live demo, sub-second AI, premium UI, real city impact | R09 | Architecture optimized for exactly this |
| €2M allocated for AI Center and AI Assistant by Split city | Pre-hack R01 | Direct prototype of the city's stated strategic goal |
| 8/10 research outputs converged on unified civic agent concept | All | Strongest convergence signal across all sprints |

## Initial Technical Approach
- **Frontend:** React 19 + Vite + TypeScript (existing scaffold)
- **Styling / Branding:** Vanilla CSS with design tokens from `tokens.css`. Glassmorphic premium aesthetic. **Color Palette:** Deep Adriatic Blue (#003366) and Hajduk White/Red accents (#FFFFFF, #E3001B) to evoke strong local identity and pride, avoiding generic corporate blues.
- **State Management:** Zustand
- **AI Engine:** Gemini 2.5 Flash via `@google/genai` TypeScript SDK
- **RAG Strategy:** Context Caching (upload GUP, Komunalni Red, and Emergency Protocols into Gemini cache, 1M token window). No vector DB needed for MVP — Gemini handles retrieval natively.
- **Vision:** Gemini Vision with `response_mime_type: "application/json"` + Zod schemas for structured classification output (used for both Civic Tickets and the Pazar Feed).
- **Multilingual:** Native Gemini capability — no separate i18n layer for AI responses
- **Backend Proxy:** Lightweight Node.js BFF to protect API keys (never exposed to client)
- **Mock Integrations:** Tool/Function Calling with mocked endpoints (`submit_gradsko_oko_report`, `check_parking`, `get_bus_eta`, `get_dir_index`, `submit_pazar_listing`, `get_emergency_info`)
- **3D Map:** Mapbox GL JS (`mapbox-gl` npm) with custom grayscale style, 3D building extrusions (`fill-extrusion`), GeoJSON source + circle/cluster layers for issue markers. Public Mapbox token stored as `VITE_MAPBOX_TOKEN` (domain-restricted). No wrapper library — direct `useRef` + `useEffect` for max control.

## Demo Script (90 seconds)

1. **Scene 1: The Map Overview (15s)**
   App opens to a stunning 3D isometric map of Split. Grayscale buildings, colored markers dotting the city. A cluster near Diocletian’s Palace shows "12" — click to zoom in, revealing individual red and yellow pins. The city’s issue landscape at a glance.

2. **Scene 2: The Pazar Morning (15s)**
   A vendor snaps a photo of their fish stall. AI instantly recognizes "brancin" and "orade", reading hand-written price tags. Marija opens the app, sees "Peškarija Feed: Brancin €22/kg" and taps a button to reserve it before 9am.

3. **Scene 3: The Tourist Question & Siren (15s)**
   Thomas hears a siren, scans a QR code. SplitAI instantly explains in German: "Bura wind warning, secure loose items." He then asks "Wo kann ich parken?" and gets a map pin.

4. **Scene 4: The Photo Report → Map Pin (25s)**
   Marija uploads a photo of graffiti on a historic wall near Peristil.
   → AI instantly returns: `{category: "Vandalism - Historic Zone", severity: 9, zone: "UNESCO Buffer", department: "Komunalni Redari"}` with the ticket auto-filed.
   → **A new red marker appears on the 3D map in real-time at the exact GPS location.** This is the killer moment.

5. **Scene 5: The Admin Dashboard & Closing (20s)**
   Switch to Ivan’s view — the dashboard shows 3 clustered high-priority issues in Zona A, with an optimized patrol route. The AI also suggests Thomas bypass the crowded Peristil using the "Đir Index". One AI, three stakeholders, zero friction.

## Risk Mitigation
| Risk | Probability | Fallback |
|---|---|---|
| RAG hallucination on legal docs | Medium | Use Context Caching (not embeddings) for higher fidelity. Require all answers to include `source_article` field. If no match, AI says "I couldn't find a specific regulation." |
| Demo latency > 2s | Low | Gemini Flash is sub-second for text, ~1s for vision. Pre-warm the cache before demo. Have a pre-recorded backup video. |
| Gemini free tier quota exhaustion | Low | 1,500 RPD is sufficient. Monitor usage. Switch to Flash-Lite as emergency fallback. |
| Over-scoping the MVP | Medium | Strict priority: RAG first → Vision second → Dashboard third. Voice input is cut-if-late. |
| API key exposure in client | Low | Backend proxy (BFF) handles all Gemini calls. Frontend never sees the key. |
| Complex UI overwhelming judges | Low | Keep it to a single chat interface + one admin dashboard. No settings, no login screens in demo. |

## Rejected Alternatives (or deferred to V2)
| Idea | Score | Why Rejected/Deferred |
|---|---|---|
| Čisti račun (Gamified Waste) | 4.20 | Excellent concept for V2. Building a full gamification/rewards engine with Promet points is too risky for a 24h hackathon MVP. |
| Smart Split Sound & Sentiment | 4.55 | Highest uniqueness, but relies on non-existent acoustic sensor infrastructure. Too much mocking undermines credibility. |
| SplitLive Bidi-Guide | 4.40 | Maximum wow factor but technically fragile — WebSocket stability in a live demo is risky. Could be a V2 feature. |
| Split Hero Gamification | 3.80 | Fun concept but gamification engine is complex to build well. Judges may see it as gimmicky vs. solving real problems. |
| Peristil Pace Crowd Control | 4.10 | Re-scoped into the lightweight "Đir Index" mock tool rather than a full predictive engine. |
