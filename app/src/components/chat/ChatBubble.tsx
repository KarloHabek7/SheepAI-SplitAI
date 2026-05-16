import React from 'react';
import { ChatMessage } from '@/types';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`aura-bubble-row ${isAssistant ? 'assistant' : 'user'}`}>
      {isAssistant && (
        <div className="aura-avatar" title="Split Zmaj AI">
          <span className="material-symbols-outlined text-sm">smart_toy</span>
        </div>
      )}

      <div className="aura-bubble-box">
        <div className="bubble-text">
          {message.content}
        </div>

        <div className="bubble-meta">
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
