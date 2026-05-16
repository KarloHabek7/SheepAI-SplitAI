# Task 02.1: Municipal Knowledge Base Generation

> **Lane:** AI
> **Priority:** P0
> **Estimated Effort:** S
> **Recommended Model:** Opus 4.6 (Thinking)
> **Planning Mode:** OFF

## Objective
Create the Croatian municipal document excerpts that will serve as the "brain" for the Split Zmaj RAG system. These files must be realistic, formatted like legal documents, and cover common citizen/tourist scenarios.

## Target Files
- `app/public/assets/docs/gup_excerpt.txt`
- `app/public/assets/docs/komunalni_red_excerpt.txt`
- `app/public/assets/docs/emergency_protocols.txt`

## Implementation Steps
1. **Create Directory:** Ensure `app/public/assets/docs/` exists.
2. **Generate GUP Excerpt:** 
   - Content: Zoning, UNESCO protection (Varoš/Dioklecijanova), terrace permits, parking requirements.
   - Language: Formal Croatian.
3. **Generate Komunalni Red Excerpt:**
   - Content: Noise curfews, public order (alcohol on street), animal control, waste disposal.
4. **Generate Emergency Protocols:**
   - Content: Bura wind warnings, fire safety in Marjan, flood responses.

## Acceptance Criteria
- [ ] Files are in UTF-8.
- [ ] Language is high-quality Croatian.
- [ ] Content allows answering questions like "Can I have a drink on the street?" or "What are the rules for UNESCO zone renovations?"
