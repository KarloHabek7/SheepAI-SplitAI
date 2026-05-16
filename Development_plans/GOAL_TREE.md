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
<!-- Populated by /delegate -->

#### Feature 1.2: Multilingual Chat Interface
<!-- Populated by /delegate -->

#### Feature 1.3: Function Calling Orchestration
<!-- Populated by /delegate -->

---

### 👁️ Pillar 2: Vision Intelligence (The Eyes)

> **Why it matters:** Photo-to-ticket is the killer demo moment. Upload a photo → instant structured classification → auto-filed report. It's visual, tangible, and proves Gemini Vision works. The Pazar Feed extends this to daily utility, showing the AI isn't just for complaints.

#### Feature 2.1: Civic Issue Photo Reporting ("Marjan Vision")
<!-- Populated by /delegate -->

#### Feature 2.2: Pazar Market Feed
<!-- Populated by /delegate -->

---

### 📊 Pillar 3: Operational Impact (The Dashboard)

> **Why it matters:** This proves B2G value — the city can actually USE this. Showing an admin view with AI-triaged, categorized reports turns the demo from "cool chatbot" into "deployable municipal system." Judges weight city impact at 35%.

#### Feature 3.1: Admin Triage Dashboard
<!-- Populated by /delegate -->

#### Feature 3.2: Đir Index (Crowd Proxy)
<!-- Populated by /delegate -->

---

### 🎨 Pillar 4: Premium Experience (The Polish)

> **Why it matters:** Judging criteria weight Innovation & UX at 30%. A glassmorphic, responsive, installable PWA **and native Android/iOS app** with micro-animations will differentiate us from every other hackathon project with a bootstrap UI. The brand site creates the first impression. A real native app on a judge's phone is the ultimate "this is production-ready" signal.

#### Feature 4.1: Brand Website & Design System
<!-- Populated by /delegate -->

#### Feature 4.2: PWA & Responsive Web
<!-- Populated by /delegate -->

#### Feature 4.3: Native Mobile App (Capacitor)
<!-- Populated by /delegate -->

#### Feature 4.4: Pitch & Demo Materials
<!-- Populated by /delegate -->

---

### 🚨 Pillar 5: Crisis & Safety (The Shield)

> **Why it matters:** The "Siren Translator" feature — scan a QR code during an emergency and get instant multilingual safety instructions — is a powerful emotional moment in the demo. It shows the AI serves tourists in vulnerable moments, not just convenience. Low implementation cost, high demo impact.

#### Feature 5.1: Emergency Information System ("Siren Translator")
<!-- Populated by /delegate -->

---

### 🗺️ Pillar 6: Spatial Intelligence (The Map)

> **Why it matters:** A 3D isometric map of Split with live issue markers is the **visual centerpiece** of the app. When judges see colored pins appearing on a grayscale 3D city map after a photo report, the product instantly feels real and deployable. The map unifies all civic data spatially — every report, every cluster, every hotspot is visible at a glance. This is the bridge between "cool chatbot" and "civic control center." It also delivers the colleague's core concept (Gradsko Oko) as an integrated feature rather than a standalone app.

#### Feature 6.1: 3D Isometric Map View
<!-- Populated by /delegate -->

#### Feature 6.2: Issue Markers & Clustering
<!-- Populated by /delegate -->

#### Feature 6.3: Map Interaction & Overlays
<!-- Populated by /delegate -->

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
