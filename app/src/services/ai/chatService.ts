import { ChatMessage, ChatResponse } from '../../types';

export class ChatService {
  /**
   * Generates a response using the AI (RAG) engine.
   * NOTE: This is currently a stub for the AI lane to implement.
   */
  async generateResponse(message: string, history: ChatMessage[]): Promise<ChatResponse> {
    console.log(`[ChatService] Processing message: "${message}" with history length: ${history.length}`);
    
    // Slight delay to simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      message: {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `This is a stubbed response for: "${message}". The AI Lane will replace this logic with Gemini RAG calls.`,
        citations: [{ sourceDocument: 'Local Stub Engine', excerpt: 'Stub' }],
        timestamp: new Date().toISOString()
      },
      conversationId: 'mock-conversation'
    };
  }
}

export const chatService = new ChatService();
