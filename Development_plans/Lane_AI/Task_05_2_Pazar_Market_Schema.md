# Task 05.2: Pazar Market Vision Schema

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Define the Zod and JSON schemas for extracting structured data from Pazar market stall photos.

## Target Files
- `app/src/lib/ai/schemas.ts` (Part 2)

## Implementation Steps
1. **Define `pazarItemSchema`:** Individual items with name, price, and category.
2. **Define `pazarListingSchema` (Zod):**
   - Array of items.
   - Freshness enum: `morning`, `midday`, `afternoon`.
3. **Generate `PAZAR_LISTING_RESPONSE_SCHEMA`:** JSON Schema conversion for the SDK.
4. **Exporting:** Barrel export from `app/src/lib/ai/index.ts`.

## Acceptance Criteria
- [ ] Schema handles nested arrays of items correctly.
- [ ] Freshness detection is constrained to valid enums.
