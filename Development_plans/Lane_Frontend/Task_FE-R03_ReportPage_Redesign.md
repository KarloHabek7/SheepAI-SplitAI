# Task FE-R03: Report Page Redesign

> **Lane:** Frontend
> **Priority:** P0-Critical (demo-critical page)
> **Estimated Effort:** M (20 min)
> **Type:** 🤝 Interactive (Aura components)
> **Planning Mode:** OFF
> **Depends On:** FE-R01

## Objective

Redesign the 3-step photo reporting flow (Upload → AI Analysis → Confirmation) to feel like a premium, high-tech civic reporting tool. The "photo-to-ticket" moment is a killer demo feature.

## Required Reading

- `app/src/pages/ReportPage.tsx` — Current 3-step flow
- `app/src/components/report/` — PhotoUpload, ClassificationPreview, TicketConfirmation
- `app/src/types/index.ts` — `CivicReportClassification`
- `DESIGN.md` — Effects section

## Target Files

### Modify:
- `app/src/pages/ReportPage.tsx` + `ReportPage.css`
- `app/src/components/report/PhotoUpload.tsx` + `PhotoUpload.css`
- `app/src/components/report/ClassificationPreview.tsx` + `ClassificationPreview.css`
- `app/src/components/report/TicketConfirmation.tsx` + `TicketConfirmation.css`

## Interactive Workflow

⏸️ **PAUSE — User browses aura.build for:**
1. **File upload / drag-drop zone** — with icon, dashed border, hover state
2. **Results/classification card** — for showing AI analysis output (category, severity, department)
3. **Success/confirmation screen** — with checkmark animation, ticket ID display
4. **Progress stepper** (optional) — 3-step indicator at the top

Paste HTML → Agent converts.

## Key UX Requirements

- **Upload zone** should have drag-drop with visual feedback
- **AI scanner animation** (scan line moving over the uploaded image) — keep existing, polish it
- **Classification cards** should show: category icon, severity bar (color-coded), zone, department, confidence %
- **Ticket confirmation** should feel celebratory — checkmark animation, ticket ID in a prominent badge
- **Step indicator** at the top showing progress (Upload → Analyzing → Review → Done)

## Acceptance Criteria

- [ ] 3-step flow works: upload → analyzing animation → classification review → success
- [ ] Scanner animation is smooth and visually impressive
- [ ] Classification preview shows all fields from `CivicReportClassification`
- [ ] Success screen shows generated ticket ID prominently
- [ ] Responsive on mobile and desktop
- [ ] `npm run build` passes

## Out of Scope

- Do NOT connect to real Vision API
- Do NOT modify the mock classification data
- Do NOT add real camera integration
