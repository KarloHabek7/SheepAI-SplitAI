# Task 06.1: Vision Service Implementation

> **Lane:** AI
> **Priority:** P0
> **Estimated Effort:** M
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Depends On:** Task 01 (SDK), Task 03.2 (Vision Prompts), Task 05 (Vision Schemas)

## Objective
Implement the `visionService.ts` which provides standalone image analysis for civic reports and market listings. This is the foundation for the "Photo-to-Ticket" feature.

## Target Files
- `app/src/services/ai/visionService.ts`

## Implementation Steps
1. **Civic Report Analysis:**
   - Use `analyzeCivicReport(imageBase64: string)`.
   - Call Gemini with `CIVIC_REPORT_VISION_PROMPT`.
   - Constrain output with `CIVIC_REPORT_RESPONSE_SCHEMA`.
   - Parse and return the validated `CivicReportClassification`.
2. **Pazar Listing Analysis:**
   - Use `analyzePazarListing(imageBase64: string)`.
   - Call Gemini with `PAZAR_LISTING_VISION_PROMPT`.
   - Constrain output with `PAZAR_LISTING_RESPONSE_SCHEMA`.
3. **Error Handling:** 
   - Handle invalid images or API failures by returning a "best-effort" classification with low confidence.

## Acceptance Criteria
- [ ] Correctly classifies civic issues into enums.
- [ ] Correctly extracts items and prices from Pazar photos.
- [ ] Deterministic JSON output via Zod validation.
