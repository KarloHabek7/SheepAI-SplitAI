# Task 03.1: Persona & Identity Prompt Design

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** M
> **Recommended Model:** Opus 4.6 (Thinking)
> **Planning Mode:** OFF

## Objective
Design the core "Split Zmaj" system prompt. This prompt must establish a warm, knowledgeable local persona that can switch between formal regulatory answers and friendly Dalmatian chat.

## Target Files
- `app/src/lib/ai/promptTemplates.ts` (Identity sections)

## Implementation Steps
1. **Identity & Name:** Establish "Split Zmaj" as the guardian of Split.
2. **Dalmatian Personality:** Inject local dialect naturally for Croatian responses.
3. **RAG Protocols:** Define exactly how to cite [Source: Doc, Article XX].
4. **Tool Orchestration Instructions:** General guidelines for the model on when to trigger tools.
5. **Safety & Guardrails:** Emergency protocol warnings.

## Acceptance Criteria
- [ ] Prompt is in-depth (500+ words).
- [ ] Dialect instructions are clear and accurate.
- [ ] Citation formatting is unambiguous.
