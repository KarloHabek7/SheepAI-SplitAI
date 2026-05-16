import React, { useState, useEffect, useRef } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import SuggestedPrompts from '@/components/chat/SuggestedPrompts';
import CitationCard from '@/components/chat/CitationCard';
import ToolCallCard from '@/components/chat/ToolCallCard';
import { ChatMessage } from '@/types';
import { MOCK_PROMPTS, INITIAL_MESSAGE, generateMockResponse } from '@/utils/mockChatData';
import './ChatPage.css';

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
      const mockResponse = generateMockResponse(content);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
        ...mockResponse
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
