/**
 * Chat Orchestrator — Central hub for all AI conversations.
 *
 * Manages stateful Gemini chat sessions and coordinates RAG context caching,
 * citation parsing, and function calling detection.
 *
 * @module chatOrchestrator
 * @lane AI (Lane 3)
 * @task T06.2 — Chat Orchestrator
 */

import type { ChatSession } from '@google/generative-ai';
import type {
  ChatMessage,
  Citation,
  ToolCallResult,
  SupportedLanguage,
} from '../../types';
import { getGeminiClient, GEMINI_MODELS } from '../../lib/ai/geminiClient';
import { TOOL_DECLARATIONS } from '../../lib/ai/toolDeclarations';
import { buildSystemPrompt } from './prompts';
import { getCacheId, isCacheReady } from './cacheService';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Options for creating a new chat session */
export interface CreateSessionOptions {
  /** Unique identifier for this conversation */
  conversationId: string;
  /** User's preferred language */
  language?: SupportedLanguage;
  /** Whether to treat the user as a tourist */
  isTourist?: boolean;
  /** Names of documents available in the context cache */
  availableDocuments?: string[];
}

/** Result returned from processMessage */
export interface OrchestratorResponse {
  /** The text content of the assistant's reply */
  text: string;
  /** Structured citations parsed from the response */
  citations: Citation[];
  /** Function calls detected in the response (to be executed by the backend) */
  functionCalls: ToolCallResult[];
  /** The conversation ID this response belongs to */
  conversationId: string;
}

// ---------------------------------------------------------------------------
// Session Store (in-memory)
// ---------------------------------------------------------------------------

/**
 * In-memory map tracking active Gemini chat sessions by conversation ID.
 * Each entry holds the ChatSession instance and metadata for history retrieval.
 */
const activeSessions = new Map<
  string,
  {
    session: ChatSession;
    history: ChatMessage[];
    language: SupportedLanguage;
    createdAt: string;
  }
>();

// ---------------------------------------------------------------------------
// Session Management
// ---------------------------------------------------------------------------

/**
 * Creates a new Gemini chat session with the Split Zmaj persona,
 * tool declarations, and optional cached context.
 *
 * If a session for the given conversationId already exists, it is returned as-is.
 *
 * @param options - Session creation options
 * @returns The conversation ID for the created session
 */
export function createChatSession(options: CreateSessionOptions): string {
  const { conversationId, language = 'hr', isTourist = false, availableDocuments } = options;

  // Return existing session if already active
  if (activeSessions.has(conversationId)) {
    console.log(`[ChatOrchestrator] Reusing existing session: ${conversationId}`);
    return conversationId;
  }

  // Build the system prompt with all contextual layers
  const systemPrompt = buildSystemPrompt({
    language,
    isTourist,
    availableDocuments,
  });

  // Initialise the generative model with tools
  const client = getGeminiClient();

  // Determine model config — use cached content if available
  const cacheId = getCacheId();
  const modelConfig: Record<string, unknown> = {
    model: GEMINI_MODELS.text,
    systemInstruction: systemPrompt,
    tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
  };

  if (cacheId && isCacheReady()) {
    modelConfig.cachedContent = cacheId;
    console.log(`[ChatOrchestrator] Using cached context: ${cacheId}`);
  }

  const model = client.getGenerativeModel(modelConfig as any);

  // Start a new multi-turn chat session
  const session = model.startChat({
    history: [],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.95,
    },
  });

  activeSessions.set(conversationId, {
    session,
    history: [],
    language,
    createdAt: new Date().toISOString(),
  });

  console.log(`[ChatOrchestrator] Created new session: ${conversationId} (lang=${language})`);
  return conversationId;
}

// ---------------------------------------------------------------------------
// Message Processing
// ---------------------------------------------------------------------------

/**
 * Processes a user message through the Gemini chat session.
 *
 * Handles:
 * - Text messages
 * - Optional inline images (base64)
 * - Citation extraction from the response
 * - Function call detection (returned for backend execution)
 *
 * @param conversationId - The session to send the message to
 * @param message - The user's text message
 * @param imageBase64 - Optional base64-encoded image (with or without data URI prefix)
 * @returns The orchestrated response with text, citations, and function calls
 */
export async function processMessage(
  conversationId: string,
  message: string,
  imageBase64?: string,
): Promise<OrchestratorResponse> {
  const entry = activeSessions.get(conversationId);
  if (!entry) {
    throw new Error(`[ChatOrchestrator] No active session for conversation: ${conversationId}`);
  }

  const { session, history } = entry;

  // Build the message parts
  const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [
    { text: message },
  ];

  if (imageBase64) {
    const { mimeType, data } = extractBase64(imageBase64);
    parts.push({
      inlineData: { data, mimeType },
    });
  }

  // Record user message in local history
  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    role: 'user',
    content: message,
    timestamp: new Date().toISOString(),
    language: entry.language,
  };
  history.push(userMessage);

  try {
    // Send to Gemini
    const result = await session.sendMessage(parts);
    const response = result.response;

    // --- Extract function calls ---
    const functionCalls: ToolCallResult[] = [];
    const candidates = response.candidates ?? [];
    for (const candidate of candidates) {
      for (const part of candidate.content?.parts ?? []) {
        if ('functionCall' in part && part.functionCall) {
          functionCalls.push({
            toolName: part.functionCall.name,
            args: (part.functionCall.args as Record<string, unknown>) ?? {},
            result: {}, // placeholder — backend fills this after execution
          });
        }
      }
    }

    // --- Extract text ---
    const text = response.text?.() ?? '';

    // --- Parse citations ---
    const citations = parseCitations(text);

    // Record assistant message in local history
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: text,
      citations: citations.length > 0 ? citations : undefined,
      toolCall: functionCalls.length > 0 ? functionCalls[0] : undefined,
      timestamp: new Date().toISOString(),
      language: entry.language,
    };
    history.push(assistantMessage);

    return {
      text,
      citations,
      functionCalls,
      conversationId,
    };
  } catch (error) {
    console.error(`[ChatOrchestrator] Error processing message in ${conversationId}:`, error);

    // Push an error message to history so context isn't lost
    const errorMessage: ChatMessage = {
      id: `error-${Date.now()}`,
      role: 'assistant',
      content: 'Nažalost, došlo je do greške pri obradi tvog upita. Pokušaj ponovo ili kontaktiraj podršku. 🐉',
      timestamp: new Date().toISOString(),
      language: entry.language,
    };
    history.push(errorMessage);

    return {
      text: errorMessage.content,
      citations: [],
      functionCalls: [],
      conversationId,
    };
  }
}

// ---------------------------------------------------------------------------
// History & Cleanup
// ---------------------------------------------------------------------------

/**
 * Returns the full conversation history for a given session.
 *
 * @param conversationId - The conversation to retrieve history for
 * @returns Array of chat messages, or empty array if session not found
 */
export function getConversationHistory(conversationId: string): ChatMessage[] {
  const entry = activeSessions.get(conversationId);
  if (!entry) {
    console.warn(`[ChatOrchestrator] No session found for history lookup: ${conversationId}`);
    return [];
  }
  return [...entry.history];
}

/**
 * Clears a conversation session and its history.
 *
 * @param conversationId - The conversation to clear
 */
export function clearConversation(conversationId: string): void {
  if (activeSessions.has(conversationId)) {
    activeSessions.delete(conversationId);
    console.log(`[ChatOrchestrator] Cleared session: ${conversationId}`);
  }
}

/**
 * Returns a list of all active conversation IDs.
 */
export function getActiveConversationIds(): string[] {
  return Array.from(activeSessions.keys());
}

/**
 * Clears all active sessions. Useful for testing or server restart.
 */
export function clearAllConversations(): void {
  const count = activeSessions.size;
  activeSessions.clear();
  console.log(`[ChatOrchestrator] Cleared all ${count} sessions.`);
}

// ---------------------------------------------------------------------------
// Citation Parser
// ---------------------------------------------------------------------------

/**
 * Parses citation markers from response text into structured Citation objects.
 *
 * Recognises two formats:
 * 1. `[Source: DocumentName, Article XX]`  — full structured citation
 * 2. `[1]`, `[2]`, `[1][3]`               — numeric index references
 *
 * @param text - The response text to parse
 * @returns Array of parsed Citation objects
 */
function parseCitations(text: string): Citation[] {
  const citations: Citation[] = [];
  const seen = new Set<string>();

  // Pattern 1: [Source: DocName, Article XX]
  const structuredPattern = /\[Source:\s*([^,\]]+)(?:,\s*(?:Article|Članak)\s*(\d+))?\]/gi;
  let match: RegExpExecArray | null;

  while ((match = structuredPattern.exec(text)) !== null) {
    const sourceDocument = match[1].trim();
    const article = match[2] || undefined;
    const key = `${sourceDocument}-${article ?? 'none'}`;

    if (!seen.has(key)) {
      seen.add(key);
      citations.push({
        sourceDocument,
        article: article ? `Article ${article}` : undefined,
        excerpt: extractExcerptAround(text, match.index, 120),
      });
    }
  }

  // Pattern 2: [1], [2], [3], ...
  const numericPattern = /\[(\d+)\]/g;
  while ((match = numericPattern.exec(text)) !== null) {
    const index = match[1];
    const key = `idx-${index}`;

    if (!seen.has(key)) {
      seen.add(key);
      citations.push({
        sourceDocument: `Document [${index}]`,
        excerpt: extractExcerptAround(text, match.index, 120),
      });
    }
  }

  return citations;
}

/**
 * Extracts a text excerpt around a given position for citation context.
 */
function extractExcerptAround(text: string, position: number, radius: number): string {
  const start = Math.max(0, position - radius);
  const end = Math.min(text.length, position + radius);
  let excerpt = text.slice(start, end).trim();

  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';

  // Remove citation markers from the excerpt itself for readability
  return excerpt.replace(/\[Source:[^\]]+\]/g, '').replace(/\[\d+\]/g, '').trim();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts MIME type and raw base64 data from a data URI or plain base64 string.
 */
function extractBase64(imageBase64: string): { mimeType: string; data: string } {
  const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  return { mimeType: 'image/jpeg', data: imageBase64 };
}
