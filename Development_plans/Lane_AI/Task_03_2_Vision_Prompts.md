# Task 03.2: Vision Intelligence Prompt Design

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Create the specialized vision prompts for photo classification (Civic Issues & Pazar Market).

## Target Files
- `app/src/lib/ai/promptTemplates.ts` (Vision sections)

## Implementation Steps
1. **Civic Report Vision:** 
   - Mapping to `IssueCategory` enums.
   - Severity scaling (1-10) with detailed descriptors.
   - Instructions for detecting the `CityZone` from visual context.
2. **Pazar Market Vision:**
   - Identifying produce items.
   - Extracting prices from tags.
   - Freshness estimation logic.
3. **Dynamic Prompt Builder:**
   - Implement `buildSystemPrompt()` to combine the base identity with vision or RAG context.

## Acceptance Criteria
- [ ] Vision prompts provide structured classification rules.
- [ ] Severity scale is well-defined.
- [ ] Prompt builder handles language and context options correctly.
