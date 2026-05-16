# Task 04: Function Calling Schema (Tool Declarations)

> **Lane:** AI
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 05 (Vision Schemas)
> **Depends On:** Task 01 (Gemini SDK Setup)

## Objective
Define Gemini function calling declarations for all 6 mock municipal tools. These tell Gemini what tools exist, their parameters, and when to use them — enabling autonomous routing of user requests to city services.

## Context Snapshot
**Read these files before starting:**
- `docs/architecture/ARCHITECTURE.md` — Section 3.4 (Tool Layer)
- `app/src/types/index.ts` — Lines 45-91 (enums), Lines 289-334 (service types)
- `app/src/lib/ai/geminiClient.ts` — (Task 01)

**The 6 tools:**
1. `submit_gradsko_oko_report` — File civic issue reports
2. `check_parking_availability` — Parking zone availability
3. `get_bus_eta` — Promet Split bus ETAs
4. `get_dir_index` — Đir Index crowd levels
5. `submit_pazar_listing` — Pazar vendor listing submission
6. `get_emergency_info` — Emergency instructions (Siren Translator)

## Interface Contract
**This task PRODUCES:**
- `app/src/lib/ai/toolDeclarations.ts` — All 6 `FunctionDeclaration` schemas
  - `TOOL_DECLARATIONS` array export
  - Individual exports: `REPORT_TOOL`, `PARKING_TOOL`, `TRANSIT_TOOL`, `CROWD_TOOL`, `PAZAR_TOOL`, `EMERGENCY_TOOL`

**This task CONSUMES:**
- `@google/genai` SDK types
- Enum values from `@/types`

## Implementation Steps
1. Create `app/src/lib/ai/toolDeclarations.ts`
2. Define each tool with `name`, `description` (guides routing), and `parameters` (JSON Schema)
3. Use enum values from types for parameter constraints (IssueCategory, CityZone, EmergencyType, etc.)
4. Each description must clearly state WHEN Gemini should call this tool
5. Export individual tools and a combined `TOOL_DECLARATIONS` array
6. Update `app/src/lib/ai/index.ts` barrel export

## Acceptance Criteria
- [ ] All 6 tools defined with proper JSON Schema parameters
- [ ] Clear routing descriptions
- [ ] Enum parameters list valid values from type contracts
- [ ] `TOOL_DECLARATIONS` array exported
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement tool execution logic (Backend lane)
- Do NOT create chat orchestration (Task 06)
- Do NOT create React hooks/components
- Do NOT test with API calls — just schemas

## Handoff
- Push to: `lane/ai/function-calling-schema`
- Notify: Backend lane (mock tool handlers), AI Task 06
- Next task enabled: Task 06 (Chat Orchestration)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_AI/Task_04_Function_Calling_Schema.md`
