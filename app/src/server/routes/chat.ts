import { Router } from 'express';
import { chatService } from '../../services/ai/chatService.js';
import type { ChatRequest, APIResponse, ChatResponse } from '../../types/index.js';

const router = Router();

router.post('/', async (req, res) => {
  const { message, conversationId } = req.body as ChatRequest;
  try {
    const response = await chatService.generateResponse(message, [], conversationId);
    const apiResponse: APIResponse<ChatResponse> = {
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    };
    res.json(apiResponse);
  } catch (error: any) {
    console.error('[ChatRoute] Error:', error.message);
    const apiResponse: APIResponse<never> = {
      success: false,
      error: { code: 'CHAT_ERROR', message: error.message || 'Failed to generate response' },
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(apiResponse);
  }
});

export default router;
