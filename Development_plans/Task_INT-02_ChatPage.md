# Task INT-02: Wire ChatPage to Backend

> **Priority:** P0 — Demo flagship
> **Lane:** Flex (Lane 5) — cross-lane integration
> **Time estimate:** S (10 min)
> **Recommended Model:** Opus 4.6
> **Planning Mode:** OFF

## Objective

Replace the mock `generateMockResponse()` in `ChatPage.tsx` with real AI chat via `useChatStore`. When a user sends a message, it should go to `/api/chat` → Gemini AI → response back.

## Required Reading

- `app/src/pages/ChatPage.tsx` — current page (uses `generateMockResponse` + `setTimeout`)
- `app/src/stores/useChatStore.ts` — store with `sendMessage()` already wired to `chatService`
- `app/src/services/chatService.ts` — calls `/api/chat`
- `app/src/utils/mockChatData.ts` — mock data being replaced (INITIAL_MESSAGE, MOCK_PROMPTS, generateMockResponse)

## Target Files

- **[MODIFY]** `app/src/pages/ChatPage.tsx`

## Implementation Steps

1. Import `useChatStore` from `@/stores/useChatStore`
2. Destructure: `{ messages, isStreaming, sendMessage, clearChat, suggestedPrompts }`
3. Remove all `useState` for messages and isStreaming — use store values
4. Keep `showPopover` as local state (UI-only)
5. **Initial greeting**: Add an `useEffect` on mount that checks if `messages.length === 0` and manually pushes the initial greeting. OR just keep the greeting as a constant that's displayed before messages.
6. **handleSendMessage**: Replace the entire mock logic with just `sendMessage(content)`
7. **Suggested prompts**: Use `suggestedPrompts` from the store (it has defaults)
8. Remove all imports from `@/utils/mockChatData`
9. Keep the scroll-to-bottom logic
10. Keep all CSS classes and visual structure unchanged

## Key Code Pattern

```tsx
import { useChatStore } from '@/stores/useChatStore';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Dobar dan! I am Split Zmaj, your personal municipal assistant...",
  timestamp: new Date().toISOString(),
};

const ChatPage: React.FC = () => {
  const { messages, isStreaming, sendMessage, suggestedPrompts } = useChatStore();
  const [showPopover, setShowPopover] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Display initial greeting + store messages
  const allMessages = messages.length === 0 
    ? [INITIAL_MESSAGE] 
    : [INITIAL_MESSAGE, ...messages];

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  // ... rest of JSX uses allMessages instead of messages
};
```

## Important Notes

- The `useChatStore.sendMessage()` already does optimistic UI (adds user message immediately, then appends assistant response)
- The store persists messages to localStorage via zustand/persist
- If the API is down, the store catches the error and shows "Došlo je do greške..." message
- The store's `suggestedPrompts` are hardcoded Croatian prompts — feel free to keep `MOCK_PROMPTS` if they look better

## Acceptance Criteria

- [ ] Send a message → `/api/chat` is called (check Network tab)
- [ ] AI response appears in chat (from Gemini, not mock)
- [ ] Streaming dots show while waiting
- [ ] Error messages appear gracefully if API fails
- [ ] `npm run build` passes with zero errors
- [ ] No imports from `mockChatData` remain

## Integration Points

- **Consumes:** `useChatStore` (calls `services/chatService.sendMessage()`)
- **Backend:** POST `/api/chat` → `chatOrchestrator` → Gemini AI
- **Response format:** `APIResponse<ChatResponse>` with `{ message: ChatMessage, conversationId: string }`

## Out of Scope (CRITICAL)

- Do NOT modify `useChatStore.ts`, `services/chatService.ts`, or `server/routes/chat.ts`
- Do NOT change the CSS or visual design
- Do NOT touch any other page files
- Do NOT modify the chat components (ChatBubble, ChatInput, etc.)
