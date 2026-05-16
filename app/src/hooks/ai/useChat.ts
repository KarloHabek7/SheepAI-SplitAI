import { useState, useCallback } from 'react';
import { UseChatReturn, ChatMessage, SupportedLanguage, ChatRequest, APIResponse, ChatResponse } from '@/types';

const SUGGESTED_PROMPTS: Record<SupportedLanguage, string[]> = {
  hr: [
    'Prijavi rupu na cesti',
    'Kada dolazi sljedeći autobus za Marjan?',
    'Gdje mogu parkirati blizu Rive?'
  ],
  en: [
    'Report a pothole',
    'When is the next bus to Marjan?',
    'Where can I park near the Riva?'
  ],
  de: [
    'Schlagloch melden',
    'Wann fährt der nächste Bus nach Marjan?',
    'Wo kann ich in der Nähe der Riva parken?'
  ],
  it: [
    'Segnala una buca',
    'Quando passa il prossimo autobus per Marjan?',
    'Dove posso parcheggiare vicino alla Riva?'
  ],
  fr: [
    'Signaler un nid-de-poule',
    'À quelle heure est le prochain bus pour Marjan?',
    'Où puis-je me garer près de la Riva?'
  ]
};

export const useChat = (language: SupportedLanguage = 'hr'): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const sendMessage = useCallback(async (messageText: string, image?: string) => {
    setError(null);
    setIsStreaming(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
      language
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const requestBody: ChatRequest = {
        message: messageText,
        conversationId,
        language,
        image
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: APIResponse<ChatResponse> = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error(responseData.error?.message || 'Failed to fetch response');
      }

      setConversationId(responseData.data.conversationId);
      
      const assistantMessage: ChatMessage = responseData.data.message;
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: any) {
      console.error('Error sending chat message:', err);
      setError(err.message || 'Došlo je do pogreške prilikom slanja poruke.');
    } finally {
      setIsStreaming(false);
    }
  }, [conversationId, language]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return {
    messages,
    isStreaming,
    error,
    suggestedPrompts: SUGGESTED_PROMPTS[language] || SUGGESTED_PROMPTS['en'],
    sendMessage,
    clearChat
  };
};
