# Task FE-R07: Emergency Page Refactor

> **Lane:** Frontend
> **Priority:** P2-Nice
> **Estimated Effort:** S (15 min)
> **Type:** 🤝 Interactive (Aura components)
> **Planning Mode:** OFF
> **Depends On:** FE-R00 (mock data extraction), FE-R01

## Objective

Polish the Siren Translator emergency page. The mock data was already extracted in FE-R00. This task focuses on the visual design of the emergency cards, language switcher, and QR scanner placeholder.

## Required Reading

- `app/src/pages/EmergencyPage.tsx` — Current (post-R00: data extracted)
- `app/src/components/emergency/EmergencyCard.tsx` — Alert card
- `app/src/components/emergency/QRScanner.tsx` — QR placeholder

## Target Files

### Modify:
- `app/src/pages/EmergencyPage.tsx` + `EmergencyPage.css`
- `app/src/components/emergency/EmergencyCard.tsx` + `EmergencyCard.css`
- `app/src/components/emergency/QRScanner.tsx` + `QRScanner.css`

## Interactive Workflow

⏸️ **PAUSE — User browses aura.build for:**
1. **Alert/notification card** — for emergency instructions (prominent, color-coded by severity)
2. **Language switcher** — flag buttons or pill selector
3. **Contact list** — phone numbers with call icons

Paste HTML → Agent converts.

## Key UX Requirements

- **Emergency cards** should use danger-red accent, high contrast, large text
- **Language switcher** should be prominent and easy to tap (tourists in panic)
- **Contact numbers** should be clickable (`tel:` links)
- **QR scanner placeholder** should look like a camera viewfinder

## Acceptance Criteria

- [ ] Emergency cards render for all 6 emergency types
- [ ] Language switcher shows all 5 languages and switches content
- [ ] Phone numbers are clickable `tel:` links
- [ ] Page has a serious, authoritative feel
- [ ] `npm run build` passes

## Out of Scope

- Do NOT implement real QR scanning
- Do NOT add real emergency API integration
- Do NOT modify mock data (already extracted in FE-R00)
