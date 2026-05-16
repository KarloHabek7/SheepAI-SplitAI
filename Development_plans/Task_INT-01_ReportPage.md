# Task INT-01: Wire ReportPage to Backend

> **Priority:** P0 — Demo flagship, must work first
> **Lane:** Flex (Lane 5) — cross-lane integration
> **Time estimate:** S (10 min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective

Replace mock data in `ReportPage.tsx` with real API calls via `useReportStore`. When a user uploads a photo, it should be sent to `/api/report/analyze` for AI classification, then submitted to `/api/report/submit`.

## Required Reading

- `app/src/pages/ReportPage.tsx` — current page (uses `MOCK_CLASSIFICATION` and `setTimeout`)
- `app/src/stores/useReportStore.ts` — store with `analyzeImage()` and `submitReport()` already wired
- `app/src/services/reportService.ts` — service calling `/api/report/analyze` and `/api/report/submit`
- `app/src/utils/mockReportData.ts` — the mock data being replaced

## Target Files

- **[MODIFY]** `app/src/pages/ReportPage.tsx`

## Implementation Steps

1. Import `useReportStore` from `@/stores/useReportStore`
2. Destructure: `{ currentImage, classification, submissionStatus, isAnalyzing, isSubmitting, analyzeImage, submitReport, reset }`
3. **Image upload flow** (`handleImageSelect`):
   - Read the file as base64 using `FileReader.readAsDataURL()`
   - Call `store.analyzeImage(base64String)` (NOT the old `setTimeout`)
   - The store sets `isAnalyzing = true`, then `classification` when done
4. **Step transitions** — derive `step` from store state instead of manual `useState`:
   - No image → `'upload'`
   - `isAnalyzing === true` → `'analyzing'`
   - `classification !== null && submissionStatus === null` → `'review'`
   - `submissionStatus === 'submitted'` → `'success'`
5. **Review step**: Pass `store.classification` (not `MOCK_CLASSIFICATION`) to `<ClassificationPreview>`
6. **Confirm handler** (`handleConfirm`):
   - Call `store.submitReport(note)` (NOT the old `setTimeout`)
   - The store sets `isSubmitting = true`, then `submissionStatus = 'submitted'`
7. **Success step**: Generate ticket ID from the response or use `classification.category + timestamp`
8. **Reset**: Call `store.reset()` in `resetFlow`
9. Remove all imports from `@/utils/mockReportData`

## Key Code Pattern

```tsx
import { useReportStore } from '@/stores/useReportStore';

const ReportPage: React.FC = () => {
  const { 
    currentImage, classification, submissionStatus, 
    isAnalyzing, isSubmitting, analyzeImage, submitReport, reset 
  } = useReportStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  // Derive step from store state
  const step: ReportStep = submissionStatus === 'submitted' ? 'success'
    : classification ? 'review'
    : isAnalyzing ? 'analyzing'
    : 'upload';

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = async (note: string) => {
    await submitReport(note);
    setTicketId(`GR-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`);
  };

  const resetFlow = () => {
    reset();
    setTicketId(null);
  };
  // ... rest of JSX stays the same, just use store values
};
```

## Acceptance Criteria

- [ ] Upload a photo → `/api/report/analyze` is called (check Network tab)
- [ ] AI classification appears in the review step (not `MOCK_CLASSIFICATION`)
- [ ] Clicking "Confirm" calls `/api/report/submit`
- [ ] Success screen shows ticket ID
- [ ] `npm run build` passes with zero errors
- [ ] No imports from `mockReportData` remain

## Integration Points

- **Consumes:** `useReportStore` (already calls `reportService.analyzeImage()`)
- **Backend:** `/api/report/analyze` returns `APIResponse<ReportAnalyzeResponse>`
- **Backend:** `/api/report/submit` returns `APIResponse<ReportSubmitResponse>`

## Out of Scope (CRITICAL)

- Do NOT modify `useReportStore.ts`, `reportService.ts`, or any backend files
- Do NOT change the CSS or visual design
- Do NOT add new types
- Do NOT touch any other page files
