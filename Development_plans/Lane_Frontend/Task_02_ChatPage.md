# Task 02: Chat Page UI

> **Lane:** Frontend
> **Priority:** P0-Critical
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.1 Pro High
> **Planning Mode:** ON
> **Can Parallelize With:** Frontend T03, Frontend T04, Backend T02
> **Depends On:** Frontend T01 (App Shell)

## Objective
Build the full Chat Page with message bubbles, user input bar, suggested prompt chips, citation cards, and language auto-detect indicator. This is the primary conversational interface for SplitAI ("Split Zmaj"). Use mock data initially — real API integration happens at checkpoint.

## Context Snapshot
**Read these files before starting:**
- `app/src/types/index.ts` — `ChatMessage`, `Citation`, `ChatRequest`, `ChatResponse`, `ChatStoreState`, `UseChatReturn`, `ToolCallResult`
- `docs/architecture/ARCHITECTURE.md` — Section 6.2 (ChatPage), Section 4.1 (Chat Flow)
- `app/src/styles/tokens.css` — Design tokens

**Key types you'll use:**
```typescript
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  language?: SupportedLanguage;
  timestamp: string;
  toolCall?: ToolCallResult;
}

export interface Citation {
  sourceDocument: string;
  article?: string;
  page?: number;
  excerpt: string;
}
```

## Interface Contract
**This task PRODUCES:**
- `pages/ChatPage.tsx` — Full chat page composing all chat components
- `components/chat/ChatBubble.tsx` — Message bubble (user vs assistant styling)
- `components/chat/ChatInput.tsx` — Text input with send button + optional image attach
- `components/chat/CitationCard.tsx` — Expandable citation card showing source, article, excerpt
- `components/chat/SuggestedPrompts.tsx` — Horizontal scrollable chips with example questions
- `components/chat/ToolCallCard.tsx` — Visual card showing tool call name + result summary

**This task CONSUMES:**
- `types/index.ts` — Chat types
- `components/ui/` — Spinner, Button (if available)
- `styles/tokens.css` — Design tokens

## Implementation Steps
1. Create `components/chat/ChatBubble.tsx` — different styling for user (right-aligned, primary color) vs assistant (left-aligned, surface color). Show timestamp. Render markdown-like content.
2. Create `components/chat/CitationCard.tsx` — collapsible card showing document name, article number, page, and excerpt. Use subtle border + accent color.
3. Create `components/chat/ToolCallCard.tsx` — shows function name and a summary of args/result in a styled card
4. Create `components/chat/SuggestedPrompts.tsx` — horizontal scroll of chip buttons. Example prompts: "Can I build a terrace in Varoš?", "Where can I park near Riva?", "Koji je red za odvoz smeća?"
5. Create `components/chat/ChatInput.tsx` — text input with send button. Optional camera/image button. Disable while streaming.
6. Create `pages/ChatPage.tsx` — compose all above. Auto-scroll on new messages. Show SuggestedPrompts when no messages. Show a welcome message from the assistant.
7. Add mock messages array for development (2-3 sample exchanges with citations)
8. Style with glassmorphism effects on bubbles, smooth scroll, micro-animations on send

## Acceptance Criteria
- [ ] Chat page renders with welcome message and suggested prompts
- [ ] Clicking a suggested prompt "sends" it (appears as user bubble)
- [ ] Assistant bubbles show citation cards when citations exist
- [ ] Chat auto-scrolls to bottom on new messages
- [ ] Input is disabled while "streaming" (mock 1s delay)
- [ ] Responsive: works on mobile and desktop
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)
- Do NOT implement real API calls (use mock data / setTimeout)
- Do NOT create Zustand stores (that's Backend lane)
- Do NOT modify files outside `components/chat/`, `pages/ChatPage.tsx`

## Handoff
- Push to: `lane/frontend/chat-page`
- Notify: Backend lane (will need to wire up real API at CP1)
- Next task enabled: Integration at CP1

---
## Ready-to-Execute
> Paste this into your Antigravity chat to start:
> `/execute Development_plans/Lane_Frontend/Task_02_ChatPage.md`
