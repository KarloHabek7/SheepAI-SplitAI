import React from 'react';
import './SuggestedPrompts.css';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelect }) => {
  return (
    <div className="aura-prompts-wrapper">
      <div className="aura-prompts-scroll">
        {prompts.map((prompt, index) => (
          <button 
            key={index} 
            className="aura-prompt-chip"
            onClick={() => onSelect(prompt)}
            title={prompt}
          >
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
