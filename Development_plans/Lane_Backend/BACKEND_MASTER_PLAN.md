# Backend Lane Master Plan

> **Lane:** Backend / API / Data (Viktor Smokvina)
> **Role:** Establish the BFF infrastructure, API endpoints, mock data services, and client state stores.
> **Current Status:** 2/10 Tasks Done (BFF Scaffold, Chat Route)

---

## 📅 Execution Roadmap (Waves)

| Wave | Task ID | Description | Recommended Agent | Status |
|---|---|---|---|---|
| **Wave 2** | T01 | **BFF Scaffold** | Sonnet 3.5 | ✅ Done |
| **Wave 3** | T02 | **Chat Route** | Gemini 3.0 Flash | ✅ Done |
| **Wave 3** | T03 | **Report Routes** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 3** | T04 | **Pazar Routes** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 3** | T05 | **Admin Routes** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 3** | T06 | **Utility Routes** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 4** | T07 | **Mock Tools** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 4** | T08 | **In-Memory Store** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 5** | T09 | **Service Layer** | Gemini 3.0 Flash | ⬜ Not Started |
| **Wave 5** | T10 | **Zustand Stores** | Gemini 3.0 Flash | ⬜ Not Started |

---

## 🏗️ Detailed Task Breakdown

### Phase 1: Foundation (Waves 2-3)
*Focus: Getting the server up and defining the REST API contracts.*

- **T01: BFF Scaffold**
  - Setup Express, CORS, environment variables, and health checks.
- **T02: Chat Route**
  - `POST /api/chat` for initial text interactions.
- **T03: Report Routes**
  - Endpoints for analyzing civic issues (Vision) and submitting reports.
- **T04: Pazar Routes**
  - Endpoints for market listings analysis and feed retrieval.
- **T05: Admin Routes**
  - Statistics and report management for the triage dashboard.
- **T06: Utility Routes**
  - Parking, transit, and emergency siren translation stubs.

### Phase 2: Intelligence & Persistence (Wave 4)
*Focus: Enabling AI function calling and managing ephemeral state.*

- **T07: Mock Tools**
  - Implement the "function-call" logic that Gemini will trigger (Parking, Events, Siren, etc.).
- **T08: In-Memory Store**
  - Centralized store for reports, listings, and conversations to decouple from route logic.

### Phase 3: Client Integration (Wave 5)
*Focus: Creating the bridge to the Frontend.*

- **T09: Service Layer**
  - The `app/src/services/` client wrappers (API client) for the Frontend hooks.
- **T10: Zustand Stores**
  - Global client state management (Chat, Report, Map, Pazar, Admin).

---

## 🤖 Agent Selection Strategy

| Task Type | Recommended Agent | Reasoning |
|---|---|---|
| **Infrastructure / Config** | **Sonnet 3.5** | High precision for boilerplate, middleware, and project structure. |
| **Routes / CRUD / API** | **Gemini 3.0 Flash** | Fast, reliable for standard endpoint implementations and type matching. |
| **State / Stores** | **Gemini 3.0 Flash** | Efficient at translating types to state management patterns. |
| **Complex Logic / Debugging** | **Gemini 3.0 Pro** | Use only if stuck or implementing complex data transformations. |

---

## 🛑 Blockers & Dependencies

- **Creative Lane:** Needs `tokens.css` (T4.2) for the UI work in Wave 3/4 (not a hard blocker for Backend).
- **AI Lane:** Needs AI Schemas (T3.4-3.5) for functional parity in Wave 4.
- **Frontend Lane:** Backend T09/T10 are the primary unblockers for Frontend feature integration.

---

## ⏭️ Next Step

1. Execute **Task 08: In-Memory Store** (to decouple state) OR **Task 03: Report Routes**.
2. Run `/execute Development_plans/Lane_Backend/Task_08_InMemory_Store.md`
