import { ChatMessage, ChatResponse } from '../../types';
import { processMessage, createChatSession } from './chatOrchestrator';

export class ChatService {
  /**
   * Generates a response using the AI (RAG) engine.
   * This bridges the legacy ChatService to the new ChatOrchestrator.
   */
  async generateResponse(message: string, _history: ChatMessage[], conversationId?: string): Promise<ChatResponse> {
    const id = conversationId || `conv-${Date.now()}`;
    
    // Ensure session exists
    createChatSession({ conversationId: id });

    // Process the message through the orchestrator
    const result = await processMessage(id, message);

    return {
      message: {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: result.text,
        citations: result.citations,
        toolCall: result.functionCalls[0], // First tool call for now
        timestamp: new Date().toISOString()
      },
      conversationId: id
    };
  }
}

export const chatService = new ChatService();
