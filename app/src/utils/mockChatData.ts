import { ChatMessage } from '@/types';

/** Mock suggested prompts for the chat page */
export const MOCK_PROMPTS = [
  "Can I build a terrace in Varoš?",
  "Where can I park near Riva?",
  "Koji je red za odvoz smeća?",
  "Is the fish market open?",
  "Report a broken street light"
];

/** Initial greeting message from Split Zmaj */
export const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Dobar dan! I am Split Zmaj, your personal municipal assistant. I've been trained on the city's regulations (GUP), waste management protocols, and local services. How can I help you today?",
  timestamp: new Date().toISOString(),
};

/**
 * Generate a mock assistant response based on user message content.
 * Used until the real Gemini backend is connected.
 */
export const generateMockResponse = (content: string): Omit<ChatMessage, 'id' | 'timestamp'> => {
  let responseContent = `I understand you're asking about: "${content}". `;
  let citations = undefined;
  let toolCall = undefined;

  if (content.toLowerCase().includes('varo')) {
    responseContent = "According to the General Urbanistic Plan (GUP) of Split, Varoš is part of the protected historical buffer zone. Building a terrace requires a special conservation permit.";
    citations = [
      {
        sourceDocument: "GUP Grada Splita",
        article: "47",
        page: 112,
        excerpt: "U povijesnim predgrađima (Varoš, Dobri, Manus, Lučac), svaka vanjska intervencija mora biti odobrena od strane Konzervatorskog odjela."
      }
    ];
  } else if (content.toLowerCase().includes('park')) {
    responseContent = "I've checked the real-time parking data for the Riva area.";
    toolCall = {
      toolName: "check_parking_availability",
      args: { zone: "Zone A", location: "Riva" },
      result: { available_spots: 12, price: "1.50€/hr" }
    };
  }

  return {
    role: 'assistant' as const,
    content: responseContent,
    citations,
    toolCall
  };
};
