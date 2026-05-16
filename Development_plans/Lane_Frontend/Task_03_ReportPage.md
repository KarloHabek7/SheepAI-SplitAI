# Task 03: Photo Report Page

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T02, Frontend T04, Backend T03
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build the Photo Report Page with camera/file upload, AI classification preview card, user note input, confirm & submit flow, and ticket confirmation screen. This is the "Marjan Vision" feature — the killer demo moment where a photo becomes a structured civic report.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `CivicReportClassification`, `CivicReport`, `ReportAnalyzeRequest`, `ReportAnalyzeResponse`, `ReportSubmitRequest`, `ReportSubmitResponse`, `ReportStoreState`, `IssueCategory`, `SeverityLevel`, `CityZone`, `Department`
- `docs/architecture/ARCHITECTURE.md` — Section 4.2 (Photo Report Flow), Section 6.2 (ReportPage)

**Key types you'll use:**
```typescript
export interface CivicReportClassification {
  category: IssueCategory;
  severity: SeverityLevel;
  zone: CityZone;
  department: Department;
  description: string;
  suggestedAction: string;
  confidence: number;
}
```

## Interface Contract
**This task PRODUCES:**
- `pages/ReportPage.tsx` — Multi-step report flow page
- `components/report/PhotoUpload.tsx` — Camera/file input with image preview
- `components/report/ClassificationPreview.tsx` — Shows AI classification result with category, severity badge, zone, department
- `components/report/TicketConfirmation.tsx` — Success screen with ticket ID and status

**This task CONSUMES:**
- `types/index.ts` — Report types
- `components/ui/` — Button, Badge, Spinner
- `styles/tokens.css`

## Implementation Steps
1. Create `components/report/PhotoUpload.tsx` — file input styled as a large drop zone. Show image preview after selection. Support camera capture on mobile (`accept="image/*" capture="environment"`).
2. Create `components/report/ClassificationPreview.tsx` — card showing: category icon, severity bar (color-coded 1-10), zone name, department, AI description, confidence percentage, suggested action. Include "Edit" ability for user corrections.
3. Create `components/report/TicketConfirmation.tsx` — success animation, ticket ID (e.g., "GR-2026-0847"), status badge, estimated resolution time.
4. Create `pages/ReportPage.tsx` — 3-step flow:
   - Step 1: PhotoUpload (select/capture image)
   - Step 2: ClassificationPreview (shows mock AI result, user adds note, confirms)
   - Step 3: TicketConfirmation (success with ticket ID)
5. Add mock classification data for development
6. Add step progress indicator at top
7. Style with premium animations between steps (slide transitions)

## Acceptance Criteria
- [ ] User can upload/capture a photo
- [ ] Photo preview displays after selection
- [ ] Mock classification appears after "analyzing" (1s spinner)
- [ ] Classification card shows all fields (category, severity, zone, department, etc.)
- [ ] User can add a note before submitting
- [ ] Ticket confirmation shows after submit with mock ticket ID
- [ ] Flow can be restarted (report another issue)
- [ ] Responsive on mobile and desktop
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real API calls (use mock data)
- Do NOT create Zustand stores
- Do NOT implement map pin placement (that's in the Map tasks)
- Do NOT modify files outside `components/report/`, `pages/ReportPage.tsx`

## Handoff
- Push to: `lane/frontend/report-page`
- Notify: Backend + AI lanes (will wire up real Vision API at CP2)
- Next task enabled: Integration at CP2

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_03_ReportPage.md`
