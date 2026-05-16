# Task 05: Vision Schemas (Zod Output Schemas)

> **Lane:** AI
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 04 (Function Calling Schema)
> **Depends On:** Task 01 (Gemini SDK Setup)

## Objective
Create Zod validation schemas for Gemini Vision's structured JSON outputs. These schemas ensure deterministic, typed responses when the AI classifies civic issue photos and Pazar market stall photos. Gemini uses `responseSchema` to constrain its output to match these exact shapes.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — Lines 156-165 (`CivicReportClassification`), Lines 222-226 (`PazarListingClassification`), Lines 212-219 (`PazarItem`)
- `docs/architecture/ARCHITECTURE.md` — Section 8.2 (Vision Prompt Templates)

**Key types these schemas must mirror:**
```typescript
interface CivicReportClassification {
  category: IssueCategory;
  severity: SeverityLevel;
  zone: CityZone;
  department: Department;
  description: string;
  suggestedAction: string;
  confidence: number;
}

interface PazarListingClassification {
  items: PazarItem[];
  freshness: 'morning' | 'midday' | 'afternoon';
  confidence: number;
}
```

## Interface Contract
**This task PRODUCES:**
- `app/src/lib/ai/schemas.ts` — Zod schemas + Gemini responseSchema objects:
  - `civicReportSchema` — Zod schema for `CivicReportClassification`
  - `pazarListingSchema` — Zod schema for `PazarListingClassification`
  - `CIVIC_REPORT_RESPONSE_SCHEMA` — JSON Schema object for Gemini `responseSchema` param
  - `PAZAR_LISTING_RESPONSE_SCHEMA` — JSON Schema object for Gemini `responseSchema` param

**This task CONSUMES:**
- `zod` package (check if installed, install if needed)
- Type definitions from `@/types`

## Implementation Steps
1. **Verify `zod` is installed** — Check `app/package.json`, install if missing
2. **Create `app/src/lib/ai/schemas.ts`:**
3. **Define `civicReportSchema`** (Zod):
   - `category`: z.enum([...all IssueCategory values])
   - `severity`: z.number().int().min(1).max(10)
   - `zone`: z.enum([...all CityZone values])
   - `department`: z.enum([...all Department values])
   - `description`: z.string()
   - `suggestedAction`: z.string()
   - `confidence`: z.number().min(0).max(1)
4. **Define `pazarListingSchema`** (Zod):
   - `items`: z.array(pazarItemSchema) where pazarItemSchema has name, category, price, unit, quantity
   - `freshness`: z.enum(['morning', 'midday', 'afternoon'])
   - `confidence`: z.number().min(0).max(1)
5. **Create JSON Schema equivalents** for Gemini's `responseSchema` parameter (the SDK may accept Zod directly or need JSON Schema — check the `@google/genai` SDK docs)
6. **Update `app/src/lib/ai/index.ts`** barrel export

## Acceptance Criteria
- [ ] `civicReportSchema` validates all `CivicReportClassification` fields with correct enum values
- [ ] `pazarListingSchema` validates `PazarListingClassification` with nested `PazarItem[]`
- [ ] Response schema objects are compatible with Gemini SDK's `responseSchema` parameter
- [ ] All enum values match the type contracts exactly
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT create the Vision API call logic (Task 06 handles orchestration)
- Do NOT create prompt templates (Task 03)
- Do NOT create React hooks or frontend components
- Do NOT modify Backend route files

## Handoff
- Push to: `lane/ai/vision-schemas`
- Notify: AI Task 06 (Chat Orchestration uses these for vision calls)
- Next task enabled: Task 06 (Chat Orchestration)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_AI/Task_05_Vision_Schemas.md`
