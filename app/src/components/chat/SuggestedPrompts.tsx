import React from 'react';
import './SuggestedPrompts.css';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelect }) => {
  return (
    <div className="suggested-prompts-wrapper">
      <div className="prompts-scroll-container">
        {prompts.map((prompt, index) => (
          <button 
            key={index} 
            className="suggested-prompt-chip"
            onClick={() => onSelect(prompt)}
            title={prompt}
          >
            <span className="material-symbols-outlined prompt-chip-icon">lightbulb</span>
            <span className="prompt-chip-text">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
