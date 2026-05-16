import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <div className="chat-input-container">
      <button className="chat-attachment-button" type="button" aria-label="Attach photo">
        <span className="material-symbols-outlined">add_photo_alternate</span>
      </button>
      <form className="chat-input-wrapper" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="chat-input-field"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
      </form>
      <button 
        type="button" 
        className="chat-send-button"
        onClick={handleSubmit}
        disabled={!text.trim() || disabled}
      >
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
};

export default ChatInput;
