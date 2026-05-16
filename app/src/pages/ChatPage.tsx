import React, { useState, useEffect, useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import SuggestedPrompts from '@/components/chat/SuggestedPrompts';
import CitationCard from '@/components/chat/CitationCard';
import ToolCallCard from '@/components/chat/ToolCallCard';
import { ChatMessage } from '@/types';
import './ChatPage.css';

const MOCK_PROMPTS = [
  "Can I build a terrace in Varoš?",
  "Where can I park near Riva?",
  "Koji je red za odvoz smeća?",
  "Is the fish market open?",
  "Report a broken street light"
];

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: "Dobar dan! I am Split Zmaj, your personal municipal assistant. I've been trained on the city's regulations (GUP), waste management protocols, and local services. How can I help you today?",
  timestamp: new Date().toISOString(),
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Mock assistant response logic
    setTimeout(() => {
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

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString(),
        citations,
        toolCall
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 1200);
  };

  return (
    <div className="chat-page-root">
      <PageContainer className="chat-page-container">
        <div className="chat-messages-list">
          {messages.map(msg => (
            <div key={msg.id} className="chat-message-group">
              <ChatBubble message={msg} />
              {msg.citations && (
                <div className="citations-list">
                  {msg.citations.map((cite, i) => (
                    <CitationCard key={i} citation={cite} />
                  ))}
                </div>
              )}
              {msg.toolCall && <ToolCallCard toolCall={msg.toolCall} />}
            </div>
          ))}
          {isStreaming && (
            <div className="streaming-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </PageContainer>
      
      <div className="chat-sticky-footer">
        {messages.length === 1 && (
          <div className="prompts-wrapper">
            <p className="suggested-label">Try asking:</p>
            <SuggestedPrompts 
              prompts={MOCK_PROMPTS} 
              onSelect={handleSendMessage} 
            />
          </div>
        )}
        <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
};

export default ChatPage;
