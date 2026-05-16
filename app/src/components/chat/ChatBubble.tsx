import React from 'react';
import { ChatMessage } from '@/types';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`chat-bubble-wrapper ${isAssistant ? 'assistant' : 'user'}`}>
      {isAssistant && (
        <div className="bubble-avatar" title="Split Zmaj AI">
          <span className="material-symbols-outlined avatar-icon">smart_toy</span>
        </div>
      )}

      <div className="chat-bubble-content-box">
        {isAssistant && (
          <div className="bubble-header">
            <span className="assistant-name">Split Zmaj</span>
            <span className="assistant-badge">AI Assistant</span>
          </div>
        )}

        <div className="bubble-text">
          {message.content}
        </div>

        <div className="bubble-footer">
          <span className="bubble-time">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {message.language && (
            <span className="bubble-lang">{message.language.toUpperCase()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
