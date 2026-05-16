# Task AI-T01-D: RAG Context Integration

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** OFF

## Objective
Inject provided context files into the Gemini prompt to enable RAG-style responses.

## Context Snapshot
- `app/src/services/ai/geminiText.ts` (Task AI-T01-C).

## Implementation Steps
1. In `generateChatReply`, if `contextFiles` are provided, prepend them to the user message or system prompt as "Reference Context".
2. Ensure the prompt clearly separates context from history.
3. Verify that citations `[1]`, `[2]` are correctly generated based on this context.

## Acceptance Criteria
- AI uses injected context to answer questions.
- Citations are present when context is used.

## Out of Scope
- Actually fetching files from disk (assume they are passed as strings for now).
