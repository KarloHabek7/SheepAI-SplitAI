# Task 04: Pazar Feed + Vendor Upload Pages

> **Lane:** Frontend
> **Priority:** P1-High
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T02, Frontend T03, Frontend T07, Backend T03
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build two pages for the Pazar Market feature: (1) a public-facing **Pazar Feed** showing AI-extracted product listings with prices, freshness indicators, and category filters, and (2) a **Vendor Upload** page where vendors photograph their stall and the AI extracts items + prices. These pages showcase the daily utility of SplitAI — it's not just for complaints, it's for everyday life.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `PazarListing`, `PazarItem`, `ProduceCategory`, `PazarListingClassification`, `PazarFilters`, `PazarStoreState`, `UsePazarFeedReturn`
- `docs/architecture/ARCHITECTURE.md` — Section 4.3 (Pazar Feed Flow), Section 6.2 (PazarFeedPage, PazarSubmitPage)
- `app/src/styles/tokens.css` — Design tokens

**Key types you'll use:**
```typescript
export interface PazarListing {
  id: string;
  vendor: string;
  items: PazarItem[];
  imageUrl?: string;
  freshness: 'morning' | 'midday' | 'afternoon';
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface PazarItem {
  name: string;
  category: ProduceCategory;
  price: number;
  unit: string; // e.g., "€/kg", "€/bunch"
  quantity?: string;
}

export interface PazarFilters {
  category?: ProduceCategory;
  activeOnly: boolean;
  searchTerm?: string;
}
```

## Interface Contract
**This task PRODUCES:**
- `pages/PazarFeedPage.tsx` — Public feed showing all active listings
- `pages/PazarSubmitPage.tsx` — Vendor photo upload + AI extraction preview
- `components/pazar/ProductCard.tsx` — Individual listing card (vendor, items, prices, freshness)
- `components/pazar/PazarGrid.tsx` — Responsive grid layout for product cards
- `components/pazar/VendorUpload.tsx` — Photo upload with AI extraction preview
- `components/pazar/FreshnessIndicator.tsx` — Visual indicator (morning=green, midday=yellow, afternoon=red)

**This task CONSUMES:**
- `types/index.ts` — Pazar types
- `components/ui/` — Button, Badge, Spinner
- `styles/tokens.css`

## Implementation Steps
1. Create `components/pazar/FreshnessIndicator.tsx` — colored dot/badge with label ("Just posted", "A few hours ago", "Selling out")
2. Create `components/pazar/ProductCard.tsx` — card showing vendor name, item list with prices, freshness indicator, category icons, optional image. Should feel like a market stall card.
3. Create `components/pazar/PazarGrid.tsx` — responsive CSS grid (1 col mobile, 2 cols tablet, 3 cols desktop). Includes filter bar at top (category dropdown, search, "active only" toggle).
4. Create `pages/PazarFeedPage.tsx` — compose PazarGrid with mock listing data (5-8 diverse listings: fish, vegetables, olive oil, cheese). Show empty state when no listings match filters.
5. Create `components/pazar/VendorUpload.tsx` — photo upload zone (reuse pattern from Report's PhotoUpload). After upload, shows AI-extracted items with editable fields (name, price, unit). Vendor can correct before submitting.
6. Create `pages/PazarSubmitPage.tsx` — 2-step: upload photo → review/edit extracted listing → submit confirmation with expiry time.
7. Use mock data with realistic Split Pazar products: "Brancin €22/kg", "Orade €18/kg", "Domaće masline €12/kg", "Blitva €3/bunch"
8. Add micro-animations: cards appear with staggered fade-in, freshness indicators pulse subtly

## Acceptance Criteria
- [ ] Pazar Feed page shows mock listings in a responsive grid
- [ ] Filter by category works (dropdown with produce categories)
- [ ] Search by term filters listings
- [ ] FreshnessIndicator shows correct color per time category
- [ ] Vendor Upload page allows photo selection
- [ ] AI extraction preview shows editable item/price list (mocked)
- [ ] Submit confirmation shows listing ID and expiry time
- [ ] Responsive on mobile and desktop
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real API calls (use mock data)
- Do NOT create Zustand stores (Backend lane)
- Do NOT modify files outside `components/pazar/`, `pages/PazarFeedPage.tsx`, `pages/PazarSubmitPage.tsx`

## Handoff
- Push to: `lane/frontend/pazar-pages`
- Notify: Backend lane (will wire up real Pazar API at CP2)
- Next task enabled: Integration at CP2

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_04_PazarPages.md`
