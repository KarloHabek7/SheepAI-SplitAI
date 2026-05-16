import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatStoreState, ChatMessage, SupportedLanguage } from '@/types';
import { sendMessage as sendChatMessage } from '@/services/chatService';

/**
 * Chat Store
 * Manages the AI conversation state, including message history and streaming status.
 * Persists messages and conversationId to localStorage.
 */
export const useChatStore = create<ChatStoreState>()(
  persist(
    (set, get) => ({
      messages: [],
      conversationId: null,
      isStreaming: false,
      suggestedPrompts: [
        'Kako mogu prijaviti kvar na cesti?',
        'Koja je gužva na Dioklecijanovoj palači?',
        'Gdje mogu parkirati u zoni A?',
      ],
      language: 'hr',

      /**
       * Sends a message to the AI and manages the optimistic UI update.
       */
      sendMessage: async (message: string, image?: string) => {
        const { messages, conversationId, language } = get();

        // 1. Optimistic Update: Add user message
        const userMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
          language,
        };

        set({ 
          messages: [...messages, userMessage],
          isStreaming: true 
        });

        try {
          // 2. Call Service
          const response = await sendChatMessage({
            message,
            conversationId: conversationId || undefined,
            language,
            image,
          });

          if (response.success && response.data) {
            // 3. Success: Append assistant message and update ID
            set((state) => ({
              messages: [...state.messages, response.data!.message],
              conversationId: response.data!.conversationId,
            }));
          } else {
            throw new Error(response.error?.message || 'Unknown error');
          }
        } catch (error) {
          console.error('[ChatStore] Send message failed:', error);
          
          // 4. Error: Append system/error message
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Došlo je do greške. Molimo pokušajte ponovo.',
            timestamp: new Date().toISOString(),
            language,
          };

          set((state) => ({
            messages: [...state.messages, errorMessage],
          }));
        } finally {
          set({ isStreaming: false });
        }
      },

      /**
       * Clears the current conversation.
       */
      clearChat: () => set({ messages: [], conversationId: null }),

      /**
       * Updates the chat language.
       */
      setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
    }),
    {
      name: 'splitai-chat',
      // Persist messages and conversationId
      partialize: (state) => ({ 
        messages: state.messages, 
        conversationId: state.conversationId 
      }),
    }
  )
);
