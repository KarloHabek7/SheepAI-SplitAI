# Task 05.1: Civic Reporting Vision Schema

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Define the Zod and JSON schemas for classifying civic issue photos (e.g., broken pipes, illegal parking).

## Target Files
- `app/src/lib/ai/schemas.ts` (Part 1)

## Implementation Steps
1. **Define `civicReportSchema` (Zod):**
   - Strictly map enums for `IssueCategory`, `SeverityLevel`, `CityZone`, and `Department`.
   - Add validation for `confidence` (0 to 1).
2. **Generate `CIVIC_REPORT_RESPONSE_SCHEMA`:** Convert the Zod schema to a JSON Schema object compatible with the Gemini SDK's `responseSchema` parameter.
3. **Validation Logic:** Ensure the schema forces the model to categorize even ambiguous images (fallback to 'other').

## Acceptance Criteria
- [ ] Schema validates all fields required for a Gradsko Oko report.
- [ ] Enums are exhaustive and match `app/src/types/index.ts`.
