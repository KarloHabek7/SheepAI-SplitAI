# Selected Idea: SplitAI (The Unified Municipal Agent)

> **Decision Date:** 2026-05-13
> **Decided By:** Decision Architect (via /ideate)
> **Research Backing:** 3 research tasks (R01, R02, R03), 3 ideation sprints (I01, I02, I03), 9 total ideas evaluated.
> **Convergence Score:** Strong convergence (3 independent sprints proposed overlapping concepts: I01's Gradsko oko Vision, I02's Smart Smeće, and I02's Split Zmaj RAG).

## One-Line Pitch
An all-in-one AI agent for Split that answers complex municipal questions via RAG and auto-reports civic issues via Vision AI.

## Target User
Local residents of Split navigating bureaucracy and reporting neighborhood issues, along with tourists needing guidance.

## Core Features (MVP Scope)
1. **"Split Zmaj" RAG Engine:** A conversational interface trained on Split's public PDFs, spatial plans (GUP), and rules. Users can ask, "How do I get a permit for a terrace in Zona A?" and get cited answers instantly.
2. **"Marjan Vision" Issue Reporting:** Users snap a photo of an overflowing bin or pothole. The AI classifies the issue, estimates severity, geotags it, and drafts a structured JSON payload ready for "Gradsko oko".
3. **Multi-lingual Tourist Fallback:** Instantly translates local rules (e.g., waste disposal, noise ordinances) for tourists.
4. **Mocked Integration Dashboard:** A simple admin view showing the reports the AI has triaged and categorized.

## Why This Idea Wins
- **Direct Budget Alignment:** Split has explicitly allocated €2M for an AI Center and an administrative AI Assistant (R01). This MVP is a direct prototype of that goal.
- **Solves the "Enforcement Gap":** By pre-classifying and triaging citizen reports (R02), it saves thousands of hours for city wardens (komunalni redari).
- **High Demo Wow Factor:** Combines two distinct, highly visual AI capabilities in one app: asking complex text questions (RAG) and uploading photos of trash/potholes (Vision).

## Research Evidence Summary
| Finding | Source | Implication |
|---|---|---|
| €2M allocated for Centar za umjetnu inteligenciju & AI Assistant | R01 | Direct alignment with the city's strategic funding and stated tech goals. |
| Overloaded city wardens & "Gradsko oko" | R02 / I01 / I02 | Opportunity to use Vision AI for triage and predictive dispatching of communal issues. |
| Fragmented digital ecosystem & heavy bureaucracy | R03 / I02 | A RAG-based answer engine cuts through the friction of navigating siloed city websites. |

## Initial Technical Approach
- Frontend: React / Vite (incorporating Aura.build design tokens)
- Backend: Node.js / Express
- AI (Text): Gemini API with RAG (vector database or simple in-memory embeddings of a few city PDFs)
- AI (Vision): Gemini Vision API to classify user-uploaded photos
- State Management: Zustand

## Demo Script (60 seconds)
1. **Scene 1 (15s):** User asks a complex bureaucratic question ("When can I drill during summer construction bans?"). The AI searches the indexed city PDFs and provides a cited answer.
2. **Scene 2 (20s):** User uploads a photo of an overflowing trash bin near Diocletian's Palace. The AI instantly returns: `{"category": "Bulk Waste", "severity": "High", "location": "Zona A"}` and readies the report.
3. **Scene 3 (15s):** Switch to an Admin Dashboard view where judges see how the AI automatically prioritized the trash bin issue above a minor pothole report.
4. **Scene 4 (10s):** Closing summary emphasizing the reduction of friction between citizens and city services, unlocking the €2M AI initiative.

## Risk Mitigation
| Risk | Probability | Fallback |
|---|---|---|
| RAG hallucinations | Medium | Constrain the context window tightly to only 2-3 specific, high-quality city PDFs. |
| Complex Frontend Scope | Medium | Focus strictly on a chat-interface MVP; drop complex maps or routing features. |

## Rejected Alternatives
| Idea | Score | Why Rejected |
|---|---|---|
| Tišina A (Acoustic Monitor) | 8.3 | Incredibly demo-able, but slightly narrower in scope; it only solves noise, whereas SplitAI solves general civic engagement. |
| Split Flow (Park & Ride AI) | 7.3 | Hard to mock realistic traffic effectively; lacks the direct visual "wow" of Vision AI. |
| Split Zimski Oživljivač | 6.9 | More of a social network / recommendation engine; less aligned with the "Smart City / AI Center" infrastructure theme. |
