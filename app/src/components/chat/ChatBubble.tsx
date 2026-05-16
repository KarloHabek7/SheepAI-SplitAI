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
        <div className="chat-bubble-content">
          {message.content}
        </div>
        <div className="chat-bubble-meta">
          <span className="chat-bubble-time">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
