import React from 'react';
import './SuggestedPrompts.css';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelect }) => {
  return (
    <div className="suggested-prompts-container">
      <div className="suggested-prompts-scroll">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className="suggested-prompt-chip"
            onClick={() => onSelect(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
