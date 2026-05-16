# Task 3.1: Report Router & Mock Analyzer (`POST /analyze`)

> **Lane:** Backend
> **Priority:** P0
> **Estimated Effort:** S (20-30min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Create the report router file and implement the `/analyze` endpoint which provides mock classification results for uploaded images.

## Required Reading
- `app/src/types/index.ts` (CivicReportClassification, ReportAnalyzeRequest/Response)
- `Development_plans/Lane_Backend/Task_03_Report_Routes.md` (for mock logic details)

## Target Files
- `app/src/server/routes/report.ts` (Create)

## Implementation Steps
1. Create `app/src/server/routes/report.ts`.
2. Initialize an Express router.
3. Implement `POST /analyze`:
   - Parse `ReportAnalyzeRequest`.
   - Implement a helper function `mockClassifyImage(base64: string)` that returns a realistic `CivicReportClassification`.
   - The mock should randomize:
     - `category` (pothole, graffiti, illegal_parking, waste, lighting, etc.)
     - `severity` (1-10)
     - `zone` (Split neighborhood names)
     - `department` (Komunalno redarstvo, Parkovi i nasadi, Ceste Split, etc.)
   - Return `APIResponse<ReportAnalyzeResponse>`.
4. Export the router.

## Acceptance Criteria
- `POST /api/report/analyze` returns a valid `APIResponse` with a classification object.
- The classification feels "real" (correct departments for categories).
- The file follows the project's standard Express router pattern.

## Out of Scope
- Do NOT mount the router in `server/index.ts` (handled in Task 3.4).
- Do NOT implement submission logic yet.
