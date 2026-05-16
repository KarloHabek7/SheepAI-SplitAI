# Task FE-R02: Chat Page Redesign

> **Lane:** Frontend
> **Priority:** P0-Critical (demo-critical page)
> **Estimated Effort:** M (20 min)
> **Type:** 🤝 Interactive (Stitch prompt OR Aura components)
> **Planning Mode:** OFF
> **Depends On:** FE-R01

## Objective

Redesign the chat interface to feel like a premium AI assistant. The Chat page is a core demo moment — judges type a question and see a beautiful, responsive AI answer with citations.

## Required Reading

- `app/src/pages/ChatPage.tsx` — Current implementation
- `app/src/components/chat/` — All chat sub-components
- `app/src/types/index.ts` — `ChatMessage`, `Citation`, `ToolCallResult`
- `DESIGN.md` — Effects section (glassmorphism, gradients)

## Target Files

### Modify:
- `app/src/pages/ChatPage.tsx` + `ChatPage.css`
- `app/src/components/chat/ChatBubble.tsx` + `ChatBubble.css`
- `app/src/components/chat/ChatInput.tsx` + `ChatInput.css`
- `app/src/components/chat/SuggestedPrompts.tsx` + `SuggestedPrompts.css`
- `app/src/components/chat/CitationCard.tsx` + `CitationCard.css`
- `app/src/components/chat/ToolCallCard.tsx` + `ToolCallCard.css`

## Interactive Workflow

### Option A: Google Stitch (Full Page)
🤖 Agent prepares Stitch prompt:
```
Page: AI Chat Assistant
Purpose: Conversational AI interface for municipal questions about Split, Croatia
Layout: Mobile-first chat view with messages list and sticky input at bottom
Key elements:
- Welcome message with suggested prompt pills
- User bubbles (right-aligned, accent color)
- Assistant bubbles (left-aligned, glassmorphism card)
- Citation cards below assistant messages (source doc, article, excerpt)
- Tool call result cards (function name, args, result as JSON)
- Streaming indicator (three animated dots)
- Sticky input bar with send button at bottom
- Suggested prompts as horizontal scrollable pills
Style: Premium, glassmorphism cards, smooth send animations
```

👤 User runs Stitch → pastes output → Agent adapts.

### Option B: Aura Components (Cherry-Pick)
⏸️ **PAUSE — User browses aura.build for:**
1. **Chat message bubbles** — user/assistant styles
2. **Chat input bar** — with send button, maybe attachment icon
3. **Suggestion pills/chips** — horizontal scrollable
4. **Card component** — for citations and tool call results

Paste HTML → Agent converts.

## Key UX Requirements

- Assistant bubbles should have **glassmorphism** effect
- User bubbles should use **primary color** gradient
- **Streaming indicator** needs smooth dot animation
- **Suggested prompts** should slide in with entrance animation
- **Citation cards** should be collapsible or compact
- Input bar should be **sticky at bottom** with safe-area padding

## Acceptance Criteria

- [ ] Chat feels premium — glassmorphism, animations, smooth scrolling
- [ ] Mock conversation flow works (send message → get response)
- [ ] Citations render below assistant messages
- [ ] Tool call cards render with structured data
- [ ] Input bar stays fixed at bottom on mobile
- [ ] Suggested prompts visible on initial state, hidden after first message
- [ ] `npm run build` passes

## Out of Scope

- Do NOT connect to real API (keep mock responses)
- Do NOT implement real streaming (keep setTimeout mock)
- Do NOT modify types or hooks
