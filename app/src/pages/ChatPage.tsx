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
  const [showBanner, setShowBanner] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);

    // Mock assistant response logic simulating streaming delay
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
      {/* Banner / Floating Popover Top Bar */}
      {showBanner && (
        <div className="chat-floating-banner">
          <div className="banner-content-left">
            <div className="banner-icon-box">
              <span className="material-symbols-outlined banner-wand-icon">auto_awesome</span>
            </div>
            <div className="banner-text-content">
              <h4 className="banner-title">Ask Split Zmaj anything!</h4>
              <p className="banner-subtitle">Trained on city regulations (GUP), parking, and municipal services.</p>
            </div>
          </div>
          <button 
            aria-label="Dismiss Banner" 
            className="banner-close-btn"
            onClick={() => setShowBanner(false)}
            title="Dismiss"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <PageContainer className="chat-page-container">
        {/* Active AI Status Header */}
        <div className="chat-status-header">
          <span className="chat-ai-badge">
            <span className="ai-dot animate-pulse"></span>
            Split AI Assistant
          </span>
          <div className="chat-online-indicator">
            <span className="online-dot animate-pulse"></span>
            <span className="online-text">Online</span>
          </div>
        </div>

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
            <div className="chat-streaming-wrapper">
              <div className="streaming-avatar">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div className="streaming-indicator-box">
                <div className="streaming-dot"></div>
                <div className="streaming-dot"></div>
                <div className="streaming-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </PageContainer>
      
      <div className="chat-sticky-footer">
        {messages.length === 1 && (
          <div className="prompts-animation-wrapper">
            <div className="suggested-header-bar">
              <span className="material-symbols-outlined suggested-icon">explore</span>
              <span className="suggested-title">Suggested Inquiries</span>
            </div>
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
