# Task 07.2: useVisionAnalysis Hook

> **Lane:** AI
> **Priority:** P1-High
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF
> **Depends On:** Task 06.1 (Vision Service), Backend T03 (Report Route)

## Objective
Implement the `useVisionAnalysis` hook which allows the UI to easily send images for AI classification.

## Target Files
- `app/src/hooks/ai/useVisionAnalysis.ts`
- `app/src/hooks/ai/index.ts` (Barrel export)

## Implementation Steps
1. **State Management:** Tracking `classification` results and `isAnalyzing` state.
2. **`analyze`:**
   - POST base64 image to `/api/report/analyze`.
   - Update state with the returned `CivicReportClassification`.
3. **Reset Logic:** Clear results when the user starts a new report.

## Acceptance Criteria
- [ ] Returns typed classification data.
- [ ] Correctly manages loading and error states.
- [ ] Barrel export is updated.
