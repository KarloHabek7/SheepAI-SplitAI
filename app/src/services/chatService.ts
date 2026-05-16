import { fetchApi } from './apiClient';
import { ChatRequest, ChatResponse, APIResponse } from '@/types';

/**
 * Sends a message to the AI chat endpoint.
 * 
 * @param req - Chat request containing message, conversationId, etc.
 * @returns Promise<APIResponse<ChatResponse>>
 */
export async function sendMessage(req: ChatRequest): Promise<APIResponse<ChatResponse>> {
  return fetchApi<ChatResponse>('/api/chat', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}
