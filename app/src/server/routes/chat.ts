import { Router } from 'express';
import { chatService } from '../../services/ai/chatService.js';
import type { ChatRequest } from '../../types/index.js';

const router = Router();

router.post('/', async (req, res) => {
  const { message, history } = req.body as ChatRequest;
  const response = await chatService.generateResponse(message, history);
  res.json(response);
});

export default router;
