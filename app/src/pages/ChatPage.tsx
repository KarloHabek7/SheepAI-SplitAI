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
  content: "Dobar dan! I am Split Zmaj, your personal municipal assistant. How can I help you today?",
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

    // Mock assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about: "${content}". This is a mock response. In the full version, I would query the Split city regulations and provide a detailed answer with citations.`,
        timestamp: new Date().toISOString(),
        citations: content.toLowerCase().includes('varo') ? [
          {
            sourceDocument: "GUP Grada Splita",
            article: "42",
            excerpt: "U staroj gradskoj jezgri (Varoš) gradnja terasa podliježe posebnim uvjetima konzervatorskog odjela."
          }
        ] : undefined
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 1000);
  };

  return (
    <div className="chat-page-root">
      <PageContainer className="chat-page-container">
        <div className="chat-messages-list">
          {messages.map(msg => (
            <div key={msg.id} className="chat-message-wrapper">
              <ChatBubble message={msg} />
              {msg.citations && msg.citations.map((cite, i) => (
                <div key={i} className="citation-wrapper">
                  <CitationCard citation={cite} />
                </div>
              ))}
              {msg.toolCall && (
                <div className="tool-call-wrapper">
                  <ToolCallCard toolCall={msg.toolCall} />
                </div>
              )}
            </div>
          ))}
          {isStreaming && (
            <div className="typing-indicator assistant">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </PageContainer>
      
      <div className="chat-footer">
        {messages.length === 1 && (
          <SuggestedPrompts 
            prompts={MOCK_PROMPTS} 
            onSelect={handleSendMessage} 
          />
        )}
        <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
};

export default ChatPage;
