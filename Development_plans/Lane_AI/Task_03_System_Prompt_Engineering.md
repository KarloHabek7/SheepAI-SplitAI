# Task 03: System Prompt Engineering ("Split Zmaj" Personality)

> **Lane:** AI
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 02 (Context Cache)
> **Depends On:** Task 01 (Gemini SDK Setup)

## Objective
Design and implement the system prompt that defines the "Split Zmaj" AI personality. This prompt controls everything: how the AI responds, when it calls tools, how it cites sources, what language it uses, and its overall character. This is the most demo-visible AI work — the quality of this prompt directly determines how impressive the live demo feels.

## Context Snapshot
**Read these files before starting:**
- `docs/architecture/ARCHITECTURE.md` — Section 8 (AI System Prompt Architecture)
- `Decisions/selected_idea.md` — Lines 197-207 (Core Features) and Lines 240-257 (Demo Script)
- `app/src/types/index.ts` — Lines 109-115 (`Citation`), Lines 45-57 (`IssueCategory`), Lines 59-68 (`CityZone`), Lines 70-77 (`EmergencyType`)

**Key architecture reference:**
```
[IDENTITY] You are "Split Zmaj" — the AI assistant for the City of Split...
[CAPABILITIES] You can: answer regulation questions, classify civic issues...
[TOOLS] Available function calls: submit_gradsko_oko_report, check_parking...
[RAG CONTEXT] The following municipal documents are loaded...
[BEHAVIOR] Always cite source articles. Auto-detect language. Be warm but efficient.
[OUTPUT] Respond in the user's detected language. Include citations as structured objects.
```

## Interface Contract
**This task PRODUCES:**
- `app/src/lib/ai/promptTemplates.ts` — All prompt templates as exported string constants/functions:
  - `SPLIT_ZMAJ_SYSTEM_PROMPT: string` — The main system prompt
  - `CIVIC_REPORT_VISION_PROMPT: string` — Prompt for classifying civic issue photos
  - `PAZAR_LISTING_VISION_PROMPT: string` — Prompt for extracting Pazar market data from photos
  - `buildSystemPrompt(options?: { language?: string, cacheContext?: boolean }): string` — Dynamic system prompt builder that can adjust based on context

**This task CONSUMES:**
- Type enums from `@/types` for reference (IssueCategory, CityZone, Department, etc.)
- Architecture docs for prompt structure guidance

## Implementation Steps
1. **Create `app/src/lib/ai/promptTemplates.ts`:**
2. **Write `SPLIT_ZMAJ_SYSTEM_PROMPT`** — The main personality prompt. Must include:
   - **IDENTITY:** "You are Split Zmaj (Splitski Zmaj), the AI assistant for the City of Split, Croatia. You are named after the legendary dragon said to guard Diocletian's Palace..."
   - **PERSONALITY:** Warm, efficient, locally knowledgeable. Use Dalmatian expressions when speaking Croatian (e.g., "ajme", "vala", "ča"). Be professional but personable — like a knowledgeable local friend, not a bureaucratic chatbot.
   - **CAPABILITIES LIST:** Enumerate all 6 tools the AI can use, with brief descriptions
   - **RAG BEHAVIOR:** "When answering questions about regulations, building codes, zoning, or city rules, ALWAYS cite the specific article (Članak) and document. Format citations as: [Source: Document Name, Članak XX]. If you cannot find a relevant regulation, say 'Nisam pronašao/la specifičan propis za ovo pitanje.' Never fabricate article numbers."
   - **LANGUAGE RULES:** "Auto-detect the user's language from their message. Respond in the SAME language. Supported: Croatian (HR), English (EN), German (DE), Italian (IT), French (FR). When speaking Croatian, use Dalmatian/Split dialect where natural."
   - **TOOL USAGE RULES:** "When a user describes a civic issue or uploads a photo, use `submit_gradsko_oko_report` to file the report. When asked about parking, transit, crowds, or emergencies, use the appropriate tool. Always confirm tool actions with the user."
   - **OUTPUT FORMAT:** "Structure your responses clearly. Use bullet points for lists. Keep answers concise but complete. For regulation answers, always include the source citation."
   - **SAFETY:** "Never provide legal advice — only quote regulations. For emergencies, always recommend calling 112 first. Never share personal data."
3. **Write `CIVIC_REPORT_VISION_PROMPT`** — For photo classification:
   - Instruct the model to analyze the image and classify: category, severity (1-10), zone, department, description, suggested action
   - List all valid categories from the `IssueCategory` enum
   - List all valid zones from the `CityZone` enum
   - Explain severity scale: 1-3 (cosmetic), 4-6 (moderate inconvenience), 7-8 (safety concern), 9-10 (immediate danger)
   - Instruct: "If the image doesn't contain a civic issue, respond with category 'other' and severity 1"
4. **Write `PAZAR_LISTING_VISION_PROMPT`** — For market stall photos:
   - Instruct the model to identify all produce/fish items visible
   - Extract estimated prices from visible price tags (if any)
   - Classify items by `ProduceCategory`
   - Estimate freshness based on visual cues and time of day
5. **Write `buildSystemPrompt(options?)`** — A builder function that:
   - Starts with `SPLIT_ZMAJ_SYSTEM_PROMPT` as base
   - If `options.language` is set, prepend "IMPORTANT: Respond in {language}"
   - If `options.cacheContext` is true, append "You have access to the following cached municipal documents: GUP (Generalni Urbanistički Plan), Komunalni Red, Hitne Procedure. Reference these when answering regulation questions."
   - Returns the assembled prompt string
6. **Export everything from `app/src/lib/ai/index.ts`** — Update barrel export

## Acceptance Criteria
- [ ] `SPLIT_ZMAJ_SYSTEM_PROMPT` is a well-crafted, comprehensive system prompt (at least 500 words)
- [ ] Prompt includes all 6 tool names and descriptions
- [ ] Prompt includes RAG citation behavior rules
- [ ] Prompt includes language auto-detection rules
- [ ] `CIVIC_REPORT_VISION_PROMPT` lists all `IssueCategory` and `CityZone` values
- [ ] `PAZAR_LISTING_VISION_PROMPT` covers produce identification and price extraction
- [ ] `buildSystemPrompt()` dynamically adjusts based on options
- [ ] All prompts are exported and importable
- [ ] No hardcoded secrets
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create the Gemini chat session or orchestration logic (that's Task 06)
- Do NOT create any React hooks or frontend components
- Do NOT create Zod schemas (that's Task 05)
- Do NOT create function calling declarations (that's Task 04)
- Do NOT modify Backend route files
- Do NOT test prompts with actual Gemini API calls — just define the templates

## Handoff
- Push to: `lane/ai/system-prompts`
- Notify: Backend lane (they'll use `buildSystemPrompt()` in the chat route), AI Task 06 (Chat Orchestration)
- Next task enabled: Task 06 (Chat Orchestration) — needs the system prompt to configure chat sessions

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_AI/Task_03_System_Prompt_Engineering.md`
