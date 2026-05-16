import React from 'react';
import { ChatMessage } from '@/types';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`chat-bubble-container ${isAssistant ? 'assistant' : 'user'}`}>
      <div className="chat-bubble">
        <div className="bubble-content">
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
