# Task 03: Report Routes — Analyze + Submit + List Endpoints

> **Lane:** Backend
> **Priority:** P0-Critical
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_02, Task_04, Task_05, Task_06
> **Depends On:** Task_01 (BFF Scaffold), Task_08 (In-Memory Store — can stub if not ready)

## Objective

Implement the three report endpoints that power the civic issue photo reporting flow. `POST /api/report/analyze` receives a base64 image and returns a mock classification. `POST /api/report/submit` creates a ticket from the confirmed classification. `GET /api/reports` returns filtered reports from the in-memory store (also used by the 3D map's GeoJSON layer).

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `CivicReport`, `CivicReportClassification`, `ReportAnalyzeRequest`, `ReportAnalyzeResponse`, `ReportSubmitRequest`, `ReportSubmitResponse`, `GeoLocation`, `MapBoundingBox` (lines 155–206, 589–595)
- `docs/architecture/ARCHITECTURE.md` — Section 4.2 (Photo Report Flow), Section 5.2 (Report Endpoints), Section 15.11 (API Extension for bbox filtering)

**Key types you'll use:**
```typescript
export interface ReportAnalyzeRequest {
  image: string; // base64
  location?: GeoLocation;
}

export interface ReportAnalyzeResponse {
  classification: CivicReportClassification;
  imagePreviewUrl?: string;
}

export interface ReportSubmitRequest {
  classification: CivicReportClassification;
  imageUrl: string;
  location?: GeoLocation;
  userNote?: string;
}

export interface ReportSubmitResponse {
  ticketId: string;
  status: ReportStatus;
  estimatedResolution?: string;
}

export interface CivicReport {
  id: string;
  classification: CivicReportClassification;
  imageUrl: string;
  location?: GeoLocation;
  userNote?: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  ticketId?: string;
  assignedTo?: string;
}
```

## Interface Contract

**This task PRODUCES:**
- `app/src/server/routes/report.ts` — Express Router with:
  - `POST /api/report/analyze` — accepts `ReportAnalyzeRequest`, returns `APIResponse<ReportAnalyzeResponse>` (mock classification)
  - `POST /api/report/submit` — accepts `ReportSubmitRequest`, creates report in store, returns `APIResponse<ReportSubmitResponse>`
  - `GET /api/reports` — returns `APIResponse<CivicReport[]>` with query params: `status`, `severity`, `department`, `category`, `bbox`, `severity_min`

**This task CONSUMES:**
- `app/src/server/index.ts` — mounts router at `/api/report` (for analyze/submit) and `/api/reports` (for list)
- In-memory store for reports storage

## Implementation Steps

1. Create `app/src/server/routes/report.ts`:
   - `POST /analyze` handler:
     - Parse `ReportAnalyzeRequest` from body
     - Call mock classification function → return realistic `CivicReportClassification` (randomize from a pool of categories/severities)
     - Return `APIResponse<ReportAnalyzeResponse>`
   - `POST /submit` handler:
     - Parse `ReportSubmitRequest` from body
     - Generate `ticketId` (format: `GR-2026-XXXX`)
     - Create `CivicReport` object with all fields
     - If no `location` is provided, assign a random Split coordinate (for demo map visualization)
     - Store in reports array/map
     - Return `APIResponse<ReportSubmitResponse>`
   - `GET /` (mounted at `/api/reports`) handler:
     - Read query params: `status`, `severity`, `department`, `category`, `bbox`, `severity_min`
     - Filter reports from store based on params
     - **Bbox filter**: parse `bbox=west,south,east,north` and filter by `location.lng` and `location.lat`
     - Return `APIResponse<CivicReport[]>`
2. Pre-seed the in-memory store with **10-15 realistic mock reports** across Split's neighborhoods (Varoš, Bačvice, Manuš, Firule, Spinut, Diocletian's Palace area) with diverse categories and severities. This ensures the 3D map has data to display immediately.
3. Mount router in `app/src/server/index.ts`
4. Test all three endpoints

## Acceptance Criteria

- [ ] `POST /api/report/analyze` returns a realistic mock `CivicReportClassification` with category, severity, zone, department
- [ ] `POST /api/report/submit` creates a report with unique `ticketId` (format `GR-2026-XXXX`), stores it, and returns confirmation
- [ ] `GET /api/reports` returns all reports
- [ ] `GET /api/reports?bbox=16.42,43.50,16.46,43.52` returns only reports within that bounding box
- [ ] `GET /api/reports?status=submitted&category=pothole&severity_min=5` filters correctly
- [ ] Store is pre-seeded with 10-15 realistic reports across Split locations
- [ ] All responses use `APIResponse<T>` wrapper
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT implement actual Gemini Vision classification — use mock data
- Do NOT handle file uploads (multer) — images come as base64 in JSON body
- Do NOT modify Frontend or AI lane files

## Handoff

- Push to: `lane/backend/report-routes`
- Notify: Frontend (Report Page + 3D Map can now fetch real data), AI Lane (they will replace mock classification)
- Next task enabled: Frontend map layers can fetch issues via `GET /api/reports?bbox=...`

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Backend/Task_03_Report_Routes.md`
