# Task 3.2: Report Submission & Ticket Generation (`POST /submit`)

> **Lane:** Backend
> **Priority:** P0
> **Estimated Effort:** S (20-30min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Implement the `/submit` endpoint to create and store civic reports, generating unique ticket IDs.

## Required Reading
- `app/src/types/index.ts` (CivicReport, ReportSubmitRequest/Response)
- `app/src/server/routes/report.ts` (Existing from Task 3.1)

## Target Files
- `app/src/server/routes/report.ts` (Modify)

## Implementation Steps
1. Add `POST /submit` to `app/src/server/routes/report.ts`.
2. Implement submission logic:
   - Parse `ReportSubmitRequest`.
   - Generate a `ticketId` using the format `GR-2026-XXXX` (where XXXX is a random or incrementing number).
   - Create a `CivicReport` object.
   - If `location` is missing, assign random coordinates within Split's bounding box (approx: Lat 43.50-43.52, Lng 16.42-16.46).
   - Store the report in the `reportsStore` (import from `app/src/server/store.ts` or similar).
   - Return `APIResponse<ReportSubmitResponse>`.

## Acceptance Criteria
- `POST /api/report/submit` creates a report record.
- The response includes a correctly formatted `ticketId`.
- The report is retrievable from the store.

## Out of Scope
- Do NOT implement the listing/filtering logic (Task 3.3).
- Do NOT worry about real database persistence (use in-memory store).
