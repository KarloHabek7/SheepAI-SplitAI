# Task AI-T01-B: Prompt Engineering

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Define the "Split Zmaj" (Dragon of Split) municipal assistant persona and ensure it handles citations correctly.

## Context Snapshot
- `docs/research/` (if available) for Split-specific context.
- `app/src/types/index.ts` for response format.

## Implementation Steps
1. Draft the system prompt in a new file `app/src/services/ai/prompts.ts`.
2. Define the persona: helpful, local Split dialect (standard Croatian but with local flair), expert on municipal issues.
3. Include explicit instructions for using `[1]`, `[2]` citation format when context is provided.
4. Define a fallback response for when it doesn't know the answer.

## Acceptance Criteria
- `prompts.ts` exports a `SYSTEM_PROMPT` constant.
- Prompt contains persona details and citation rules.

## Out of Scope
- API implementation.
- Frontend UI.
