import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <div className="chat-input-pill">
        <button 
          type="button" 
          className="chat-action-btn" 
          aria-label="Attach Photo"
          title="Attach Photo"
          disabled={disabled}
        >
          <span className="material-symbols-outlined">add_a_photo</span>
        </button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Split Zmaj anything (e.g. Varoš regulations, parking near Riva)..."
          rows={1}
          disabled={disabled}
          className="chat-textarea"
        />
        
        <button 
          type="submit" 
          className={`chat-send-btn ${message.trim() ? 'active' : ''}`}
          disabled={!message.trim() || disabled}
          aria-label="Send Message"
          title="Send Message"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
