# Goal Tree

> This document maps the project's North Star Vision through strategic Pillars, into concrete Features, and down to individual Tasks. Every agent should locate their current task here to understand WHY it matters.

---

## 🌟 North Star

"One AI agent for Split: ask anything, report anything, in any language — unifying citizen services, tourist assistance, and municipal operations into a single conversational AI powered by Gemini 3.0 Flash."

---

## Pillars

### 🧠 Pillar 1: Intelligent Conversation (The Brain)

> **Why it matters:** This is the core demo moment. When a judge types a question and gets a cited, multilingual answer in under a second, they'll know this is real AI. RAG + Function Calling is the foundation everything else builds on. Without this, there is no product.

#### Feature 1.1: RAG-Powered Regulation Q&A ("Split Zmaj")
- [ ] [AI] Task 01: Gemini SDK Setup — `Development_plans/Lane_AI/Task_01_Gemini_SDK_Setup.md`
- [ ] [AI] Task 02: Context Cache & RAG — `Development_plans/Lane_AI/Task_02_Context_Cache_RAG.md`
- [ ] [AI] Task 03: System Prompt Engineering — `Development_plans/Lane_AI/Task_03_System_Prompt_Engineering.md`
- [ ] [Frontend] Task 02: Chat Page UI — `Development_plans/Lane_Frontend/Task_02_ChatPage.md`
- [ ] [Backend] Task 02: Chat Route — `Development_plans/Lane_Backend/Task_02_Chat_Route.md`
- [ ] [Lead] Task 01: CP1 Integration — Chat + RAG E2E — `Development_plans/Lane_Lead/Task_01_CP1_Integration.md`

#### Feature 1.2: Multilingual Chat Interface
- [ ] [Frontend] Task 02: Chat Page UI (multilingual display) — `Development_plans/Lane_Frontend/Task_02_ChatPage.md`

#### Feature 1.3: Function Calling Orchestration
- [ ] [AI] Task 04: Function Calling Schema — `Development_plans/Lane_AI/Task_04_Function_Calling_Schema.md`
- [ ] [AI] Task 06: Chat Orchestration Service — `Development_plans/Lane_AI/Task_06_Chat_Orchestration.md`
- [ ] [AI] Task 07: AI React Hooks — `Development_plans/Lane_AI/Task_07_AI_Hooks.md`
- [ ] [Backend] Task 07: Mock Tool Implementations — `Development_plans/Lane_Backend/Task_07_Mock_Tools.md`
- [ ] [Backend] Task 06: Utility Routes — `Development_plans/Lane_Backend/Task_06_Utility_Routes.md`

---

### 👁️ Pillar 2: Vision Intelligence (The Eyes)

> **Why it matters:** Photo-to-ticket is the killer demo moment. Upload a photo → instant structured classification → auto-filed report. It's visual, tangible, and proves Gemini Vision works. The Pazar Feed extends this to daily utility, showing the AI isn't just for complaints.

#### Feature 2.1: Civic Issue Photo Reporting ("Marjan Vision")
- [ ] [AI] Task 05: Vision Schemas (Zod) — `Development_plans/Lane_AI/Task_05_Vision_Schemas.md`
- [ ] [Frontend] Task 03: Photo Report Page — `Development_plans/Lane_Frontend/Task_03_ReportPage.md`
- [ ] [Backend] Task 03: Report Routes — `Development_plans/Lane_Backend/Task_03_Report_Routes.md`
- [ ] [Lead] Task 02: CP2 Integration — Vision + Pazar + Map E2E — `Development_plans/Lane_Lead/Task_02_CP2_Integration.md`

#### Feature 2.2: Pazar Market Feed
- [ ] [Frontend] Task 04: Pazar Feed + Vendor Upload — `Development_plans/Lane_Frontend/Task_04_PazarPages.md`
- [ ] [Backend] Task 04: Pazar Routes — `Development_plans/Lane_Backend/Task_04_Pazar_Routes.md`

---

### 📊 Pillar 3: Operational Impact (The Dashboard)

> **Why it matters:** This proves B2G value — the city can actually USE this. Showing an admin view with AI-triaged, categorized reports turns the demo from "cool chatbot" into "deployable municipal system." Judges weight city impact at 35%.

#### Feature 3.1: Admin Triage Dashboard
- [ ] [Frontend] Task 06: Admin Dashboard — `Development_plans/Lane_Frontend/Task_06_AdminDashboard.md`
- [ ] [Backend] Task 05: Admin Routes — `Development_plans/Lane_Backend/Task_05_Admin_Routes.md`

#### Feature 3.2: Đir Index (Crowd Proxy)
- [ ] [Backend] Task 06: Utility Routes (Crowd endpoint) — `Development_plans/Lane_Backend/Task_06_Utility_Routes.md`

---

### 🎨 Pillar 4: Premium Experience (The Polish)

> **Why it matters:** Judging criteria weight Innovation & UX at 30%. A glassmorphic, responsive, installable PWA **and native Android/iOS app** with micro-animations will differentiate us from every other hackathon project with a bootstrap UI. The brand site creates the first impression. A real native app on a judge's phone is the ultimate "this is production-ready" signal.

#### Feature 4.1: Brand Website & Design System
- [ ] [Creative] Task 01: Brand Website — `Development_plans/Lane_Creative/Task_01_Brand_Website.md`
- [ ] [Creative] Task 02: Design Token Extraction — `Development_plans/Lane_Creative/Task_02_Design_Token_Extraction.md`
- [ ] [Creative] Task 03: App Icons + PWA Icons — `Development_plans/Lane_Creative/Task_03_App_Icons.md`
- [ ] [Creative] Task 04: Illustration Assets — `Development_plans/Lane_Creative/Task_04_Illustration_Assets.md`

#### Feature 4.5: Backend Foundation & Data Layer
- [ ] [Backend] Task 01: BFF Scaffold — `Development_plans/Lane_Backend/Task_01_BFF_Scaffold.md`
- [ ] [Backend] Task 08: In-Memory Store — `Development_plans/Lane_Backend/Task_08_InMemory_Store.md`
- [ ] [Backend] Task 09: Service Layer — `Development_plans/Lane_Backend/Task_09_Service_Layer.md`
- [ ] [Backend] Task 10: Zustand Stores — `Development_plans/Lane_Backend/Task_10_Zustand_Stores.md`

#### Feature 4.2: PWA & Responsive Web
- [ ] [Frontend] Task 01: App Shell + Layout — `Development_plans/Lane_Frontend/Task_01_AppShell_Layout.md`
- [ ] [Frontend] Task 08: PWA + Responsive + Capacitor — `Development_plans/Lane_Frontend/Task_08_PWA_Capacitor.md`
- [ ] [Lead] Task 03: CP3 Final Integration + QA Polish — `Development_plans/Lane_Lead/Task_03_CP3_Final_QA.md`

#### Feature 4.3: Native Mobile App (Capacitor)
- [ ] [Frontend] Task 08: Capacitor Init — `Development_plans/Lane_Frontend/Task_08_PWA_Capacitor.md`

#### Feature 4.4: Pitch & Demo Materials
- [ ] [Creative] Task 05: Pitch Deck — `Development_plans/Lane_Creative/Task_05_Pitch_Deck.md`
- [ ] [Creative] Task 06: Demo Script + Backup Video — `Development_plans/Lane_Creative/Task_06_Demo_Script.md`
- [ ] [Lead] Task 04: Demo Rehearsal & Backup Video — `Development_plans/Lane_Lead/Task_04_Demo_Rehearsal.md`

---

### 🚨 Pillar 5: Crisis & Safety (The Shield)

> **Why it matters:** The "Siren Translator" feature — scan a QR code during an emergency and get instant multilingual safety instructions — is a powerful emotional moment in the demo. It shows the AI serves tourists in vulnerable moments, not just convenience. Low implementation cost, high demo impact.

#### Feature 5.1: Emergency Information System ("Siren Translator")
- [ ] [Frontend] Task 07: Emergency Page — `Development_plans/Lane_Frontend/Task_07_EmergencyPage.md`
- [ ] [Backend] Task 06: Utility Routes (Emergency endpoint) — `Development_plans/Lane_Backend/Task_06_Utility_Routes.md`

---

### 🗺️ Pillar 6: Spatial Intelligence (The Map)

> **Why it matters:** A 3D isometric map of Split with live issue markers is the **visual centerpiece** of the app. When judges see colored pins appearing on a grayscale 3D city map after a photo report, the product instantly feels real and deployable. The map unifies all civic data spatially — every report, every cluster, every hotspot is visible at a glance. This is the bridge between "cool chatbot" and "civic control center." It also delivers the colleague's core concept (Gradsko Oko) as an integrated feature rather than a standalone app.

#### Feature 6.1: 3D Isometric Map View
- [ ] [Frontend] Task 05: 3D Map Page — `Development_plans/Lane_Frontend/Task_05_MapPage.md`

#### Feature 6.2: Issue Markers & Clustering
- [ ] [Frontend] Task 05: Map Issue Layers — `Development_plans/Lane_Frontend/Task_05_MapPage.md`

#### Feature 6.3: Map Interaction & Overlays
- [ ] [Frontend] Task 05: Map UI Overlays — `Development_plans/Lane_Frontend/Task_05_MapPage.md`

---

## Post-MVP Ideas

<!-- Approved refinements that don't fit the current sprint. Populated by /refine when
     suggestions are categorized as 🕐 Deferred. -->

| # | Idea | Source | Why Deferred |
|---|---|---|---|
| D01 | Čisti Račun — Gamified waste/recycling with Promet points | Ideation I04 | Full gamification engine too complex for 24h |
| D02 | SplitLive Bidi-Guide — Real-time camera AR tour guide | Ideation I05 | WebSocket stability risk for live demo |
| D03 | Smart Split Sound — Noise prediction + nudging | Ideation I07 | No acoustic sensor infrastructure to mock |
| D04 | Voice Input ("Split Whisperer") — Dialect-to-ticket | Selected Idea (nice-to-have) | Cut-if-late, depends on native-audio model |
