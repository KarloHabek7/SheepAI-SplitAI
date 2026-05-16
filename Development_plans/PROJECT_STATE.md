# PROJECT STATE — Auto-Updated by Agents

> **Last Updated:** 2026-05-16T12:00:00+02:00
> **Updated By:** Lead Agent (Lane 0)

---

## 🎯 North Star Vision

"One AI agent for Split: ask anything, report anything, in any language — a unified municipal assistant that serves residents, tourists, and city workers through conversational RAG, Vision AI reporting, a daily Pazar market feed, and an admin triage dashboard, all powered by Gemini 3.0 Flash. Delivered as a web app, native Android/iOS app (via Capacitor), and branding website."

---

## 📊 Overall Progress: 0/35 tasks complete (0%) — All lanes delegated

<!-- Updated by Team Lead at checkpoints -->

---

## 🏗️ Lane Status

### Lane 1: Frontend — 0/8 tasks done

| Task | Status | Completed By | Notes |
|---|---|---|---|
| T01 App Shell + Layout | ⬜ Not Started | | Foundation: routing, Header, BottomNav, PageContainer |
| T02 Chat Page UI | ⬜ Not Started | | Bubbles, citations, suggested prompts, input bar |
| T03 Photo Report Page | ⬜ Not Started | | Upload, AI classification preview, ticket confirmation |
| T04 Pazar Feed + Vendor Upload | ⬜ Not Started | | Product cards, filters, vendor photo upload |
| T05 3D Map Page (Mapbox) | ⬜ Not Started | | Home screen: 3D buildings, issue markers, clustering |
| T06 Admin Dashboard | ⬜ Not Started | | Metric cards, severity chart, report table |
| T07 Emergency Page | ⬜ Not Started | | Multilingual Siren Translator |
| T08 PWA + Responsive + Capacitor | ⬜ Not Started | | PWA manifest, responsive audit, Android setup |

### Lane 2: Backend — 0/10 tasks done

| Task | Status | Completed By | Notes |
|---|---|---|---|
| T01: BFF Scaffold | ⬜ Not Started | — | No deps — start immediately |
| T02: Chat Route | ⬜ Not Started | — | Depends on T01 |
| T03: Report Routes | ⬜ Not Started | — | Depends on T01, T08 |
| T04: Pazar Routes | ⬜ Not Started | — | Depends on T01, T08 |
| T05: Admin Routes | ⬜ Not Started | — | Depends on T01, T03 |
| T06: Utility Routes | ⬜ Not Started | — | Depends on T01 |
| T07: Mock Tools | ⬜ Not Started | — | Depends on T01, T06 |
| T08: In-Memory Store | ⬜ Not Started | — | Depends on T01 |
| T09: Service Layer | ⬜ Not Started | — | Depends on T02–T06 |
| T10: Zustand Stores | ⬜ Not Started | — | Depends on T09 |

### Lane 3: AI — 0/7 tasks done

| Task | Status | Completed By | Notes |
|---|---|---|---|
| T01 Gemini SDK Setup | ⬜ Not Started | — | No deps, can start immediately |
| T02 Context Cache & RAG | ⬜ Not Started | — | Depends on T01 |
| T03 System Prompt Engineering | ⬜ Not Started | — | Depends on T01, parallel with T02 |
| T04 Function Calling Schema | ⬜ Not Started | — | Depends on T01, parallel with T05 |
| T05 Vision Schemas (Zod) | ⬜ Not Started | — | Depends on T01, parallel with T04 |
| T06 Chat Orchestration | ⬜ Not Started | — | Depends on T01-T05 |
| T07 AI React Hooks | ⬜ Not Started | — | Depends on T06 + Backend T01/T02 |

### Lane 4: Creative — 0/6 tasks done

| Task | Status | Completed By | Notes |
|---|---|---|---|
| T01: Brand Website | ⬜ Not Started | — | No deps — start immediately (Wave 1). Unblocks T02. |
| T02: Design Token Extraction | ⬜ Not Started | — | Depends on T01. Produces DESIGN.md + tokens.css. |
| T03: App Icons + PWA Icons | ⬜ Not Started | — | Depends on T02 (needs brand colors) |
| T04: Illustration Assets | ⬜ Not Started | — | Depends on T02, parallel with T03 |
| T05: Pitch Deck | ⬜ Not Started | — | Depends on T01 + T04 (needs screenshots + assets) |
| T06: Demo Script + Backup Video | ⬜ Not Started | — | Last task — depends on working app (CP3) |

### Lane 0: Lead — 0/4 tasks done

| Task | Status | Completed By | Notes |
|---|---|---|---|
| T01: CP1 Integration — Chat + RAG E2E | ⬜ Not Started | — | Blocked on Frontend T02, Backend T02, AI T01–T03 |
| T02: CP2 Integration — Vision + Pazar + Map E2E | ⬜ Not Started | — | Blocked on Lead T01, Frontend T03–T05, Backend T03–T06, AI T04–T07 |
| T03: CP3 Final Integration + QA Polish | ⬜ Not Started | — | Blocked on Lead T02, Frontend T06–T09, Creative T05 |
| T04: Demo Rehearsal & Backup Video | ⬜ Not Started | — | Blocked on Lead T03, Creative T05–T06 |

---

## 🔮 Vision Refinements (Agent-Suggested)

<!-- Agents add rows here during Step 6.5 of /execute. Team Lead evaluates via /refine. -->

| # | Suggestion | Source | Effort | Priority | Status |
|---|---|---|---|---|---|

### Status Legend
- `⬜ Unevaluated` — Not yet reviewed by Team Lead
- `✅ Approved` — Accepted, new task created
- `🕐 Deferred` — Good idea, moved to Post-MVP
- `❌ Rejected` — Not aligned or not feasible (reason noted)

---

## 🚧 Current Blockers

- _No blockers currently._

---

## ⏭️ Next Recommended Actions (per lane)

- **Frontend:** Start with **T01 App Shell + Layout** (no dependencies). Then T02–T07 in parallel (all depend on T01). T08 runs last. **Soft blocker:** tokens.css from Creative lane (use temp tokens until delivered).
- **Backend:** Start with **T01 (BFF Scaffold)** and **T08 (In-Memory Store)** in parallel — both have no deps beyond the scaffold. Then proceed to T02–T06 (routes), T07 (tools), T09 (services), T10 (stores).
- **AI:** Start **T01 Gemini SDK Setup** (no dependencies). Then T02+T03 in parallel, then T04+T05 in parallel, then T06, then T07.
- **Creative:** Start **T01 Brand Website** immediately (Wave 1, no deps). Then T02 (Design Tokens). Then T03+T04 in parallel. T05 after assets ready. T06 last (needs working app).
- **Lead:** Delegation complete. Next: wait for Frontend T02, Backend T02, AI T01–T03 to finish, then run CP1 Integration (Lead T01) at ~14:00.
