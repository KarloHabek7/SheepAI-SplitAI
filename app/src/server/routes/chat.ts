import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { 
  ChatRequest, 
  ChatResponse, 
  ChatMessage, 
  APIResponse, 
  SupportedLanguage 
} from '../../types/index.js';
import { store } from '../store.js';

const router = Router();

// In-memory conversation store now managed by centralized store.ts

/**
 * Stub AI function to generate a mock response.
 * This will be replaced by Lane 3 (AI) with real Gemini integration.
 */
const generateMockChatResponse = (
  _message: string,
  _conversationId: string,
  language: SupportedLanguage = 'hr'
): ChatMessage => {
  const timestamp = new Date().toISOString();
  
  // Default mock content
  let content = "Pozdrav! Ja sam Split Zmaj 🐉, vaš AI asistent za grad Split. Ovo je demo odgovor — AI integracija dolazi uskoro!";
  
  // Simple language variations
  if (language === 'en') {
    content = "Hello! I am Split Zmaj 🐉, your AI assistant for the City of Split. This is a demo response — AI integration is coming soon!";
  } else if (language === 'de') {
    content = "Hallo! Ich bin Split Zmaj 🐉, Ihr AI-Assistent für die Stadt Split. Dies ist eine Demo-Antwort — die AI-Integration folgt in Kürze!";
  }

  return {
    id: uuidv4(),
    role: 'assistant',
    content,
    language,
    timestamp,
    citations: [
      {
        sourceDocument: "GUP Grada Splita",
        article: "Članak 47",
        page: 112,
        excerpt: "Odredbe o uređenju prostora u povijesnoj jezgri..."
      },
      {
        sourceDocument: "Odluka o komunalnom redu",
        article: "Članak 12",
        excerpt: "Zabranjeno je postavljanje reklama bez odobrenja nadležnog tijela..."
      }
    ]
  };
};

/**
 * POST /api/chat
 * Main chat endpoint for citizen/tourist Q&A
 */
router.post('/', (req: Request<{}, {}, ChatRequest>, res: Response) => {
  try {
    const { message, conversationId, language = 'hr', image: _image } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_MESSAGE', message: 'Message is required' },
        timestamp: new Date().toISOString()
      });
    }

    // 1. Resolve or create conversationId
    const activeId = conversationId || uuidv4();
    
    // 2. Initialize history if new
    // 2. Initialize history if new (already handled by store.appendMessage internally if needed)

    // 3. Store user message
    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      language,
      timestamp: new Date().toISOString()
    };
    store.appendMessage(activeId, userMsg);

    // 4. Generate mock response
    const assistantMsg = generateMockChatResponse(message, activeId, language);
    store.appendMessage(activeId, assistantMsg);

    // 5. Return response
    const response: APIResponse<ChatResponse> = {
      success: true,
      data: {
        message: assistantMsg,
        conversationId: activeId
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to process chat message' },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/chat/history/:conversationId
 * Retrieve conversation history
 */
router.get('/history/:conversationId', (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const history = store.getConversation(conversationId as string);

    const response: APIResponse<ChatMessage[]> = {
      success: true,
      data: history,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch history' },
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
