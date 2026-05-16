# Task 07: Emergency Page

> **Lane:** Frontend
> **Priority:** P2-Medium
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Frontend T04, Frontend T06
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build the Emergency Page ("Siren Translator") — multilingual emergency info screen. Tourist hears a siren, scans QR / navigates to `/emergency`, gets instant safety instructions in their language.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `EmergencyInfo`, `EmergencyContact`, `EmergencyType`, `SupportedLanguage`
- `docs/architecture/ARCHITECTURE.md` — Section 6.2 (EmergencyPage)

**Key types you'll use:**
```typescript
export type EmergencyType = 'bura_wind' | 'flood' | 'earthquake' | 'fire' | 'air_quality' | 'general';
export interface EmergencyInfo {
  alertType: EmergencyType;
  title: string;
  instructions: string[];
  safetyTips: string[];
  contacts: EmergencyContact[];
  language: SupportedLanguage;
  lastUpdated: string;
}
```

## Interface Contract
**This task PRODUCES:**
- `pages/EmergencyPage.tsx` — Emergency info with type selector + language switcher
- `components/emergency/EmergencyCard.tsx` — Alert card with instructions, tips, contacts
- `components/emergency/QRScanner.tsx` — Placeholder QR scanner with manual type selector

**This task CONSUMES:**
- `types/index.ts` — Emergency types
- `components/ui/` — Button, Badge
- `styles/tokens.css`

## Implementation Steps
1. Create `EmergencyCard.tsx` — icon per type (🌪️🌊🔥), title, numbered instructions, safety tips callout, clickable phone contacts (`tel:`)
2. Create `QRScanner.tsx` — placeholder camera area + manual dropdown for emergency type
3. Create `EmergencyPage.tsx` — language selector, emergency type grid, selected EmergencyCard
4. Mock data for each type in HR, EN, DE with real Split numbers (112, 193, 194, 192)
5. Style with urgency: red/orange accent, large touch targets, clear typography

## Acceptance Criteria
- [ ] Type selector grid renders all emergency types
- [ ] Selecting type shows correct EmergencyCard
- [ ] Language switcher changes content (HR, EN, DE minimum)
- [ ] Phone numbers are clickable
- [ ] Responsive (primarily mobile-used)
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real QR scanning
- Do NOT implement real API calls
- Do NOT modify files outside `components/emergency/`, `pages/EmergencyPage.tsx`

## Handoff
- Push to: `lane/frontend/emergency-page`
- Next task enabled: None (standalone)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Frontend/Task_07_EmergencyPage.md`
