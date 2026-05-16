import { Router } from 'express';
import { chatService } from '../../services/ai/chatService.js';
import type { ChatRequest } from '../../types/index.js';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body as ChatRequest;
  const response = await chatService.generateResponse(message, []);
  res.json(response);
});

export default router;
