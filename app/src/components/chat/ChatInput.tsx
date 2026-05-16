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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <form className="aura-input-bar" onSubmit={handleSubmit}>
      <button 
        type="button" 
        className="aura-attach-btn" 
        aria-label="Attach Photo"
        title="Attach Photo"
        disabled={disabled}
      >
        <span className="material-symbols-outlined text-lg">add_a_photo</span>
      </button>
      
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message to Split Zmaj..."
        rows={1}
        disabled={disabled}
        className="aura-input-field"
      />
      
      <button 
        type="submit" 
        className={`aura-send-btn ${message.trim() ? 'active' : ''}`}
        disabled={!message.trim() || disabled}
        aria-label="Send Message"
        title="Send Message"
      >
        <span className="material-symbols-outlined text-sm text-white">arrow_upward</span>
      </button>
    </form>
  );
};

export default ChatInput;
