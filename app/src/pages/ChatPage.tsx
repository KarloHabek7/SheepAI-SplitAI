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
  const [showPopover, setShowPopover] = useState(true);
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

    // Mock assistant response logic simulating streaming
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
        <div className="aura-chat-wrapper">
          
          {/* Main Chat Card */}
          <div className="aura-chat-card group">
            
            {/* Popover Tip (Top Right) */}
            {showPopover && (
              <div className="aura-floating-popover">
                <div className="popover-header">
                  <div className="popover-icon-box">
                    <span className="material-symbols-outlined popover-wand-icon">auto_awesome</span>
                  </div>
                  <button 
                    aria-label="Dismiss" 
                    className="popover-dismiss-btn"
                    onClick={() => setShowPopover(false)}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="popover-body">
                  <h4 className="popover-title">Ask Split Zmaj to assist you!</h4>
                  <p className="popover-subtitle">The more details you share, the better municipal advice it delivers.</p>
                </div>
                {/* Pointer triangle */}
                <div className="popover-arrow"></div>
              </div>
            )}

            {/* Background glowing accent */}
            <div className="aura-card-glow"></div>

            <div className="aura-card-content">
              {/* Header Info */}
              <div className="aura-card-header">
                <span className="aura-ai-badge">
                  <span className="aura-ai-pulse"></span>
                  AI Assistant
                </span>
                <div className="aura-online-status">
                  <span className="aura-online-pulse"></span>
                  <span className="aura-online-label">Online</span>
                </div>
              </div>

              <h3 className="aura-card-title">Split Zmaj Assistant</h3>
              <p className="aura-card-subtitle">
                Ask me anything! I can help with municipal regulations (GUP), parking spots near Riva, waste schedules, and city services. Just type your question below.
              </p>

              {/* Chat Messages Interface Box (#1C1C1E) */}
              <div className="aura-messages-box">
                <div className="aura-messages-scroll">
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
                    <div className="aura-streaming-row">
                      <div className="aura-avatar">
                        <span className="material-symbols-outlined">smart_toy</span>
                      </div>
                      <div className="aura-streaming-dots">
                        <div className="sdot"></div>
                        <div className="sdot"></div>
                        <div className="sdot"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Suggested Prompts before input */}
              {messages.length === 1 && (
                <div className="aura-suggested-section">
                  <SuggestedPrompts 
                    prompts={MOCK_PROMPTS} 
                    onSelect={handleSendMessage} 
                  />
                </div>
              )}

              {/* Input Area */}
              <div className="aura-input-section">
                <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
              </div>

            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ChatPage;
