import React from 'react';
import { ToolCallResult } from '@/types';
import './ToolCallCard.css';

interface ToolCallCardProps {
  toolCall: ToolCallResult;
}

const ToolCallCard: React.FC<ToolCallCardProps> = ({ toolCall }) => {
  return (
    <div className="tool-call-card">
      <div className="tool-header">
        <span className="material-symbols-outlined tool-icon">terminal</span>
        <span className="tool-name">{toolCall.toolName.replace(/_/g, ' ')}</span>
      </div>
      <div className="tool-body">
        <div className="tool-args">
          {Object.entries(toolCall.args).map(([key, val]) => (
            <div key={key} className="arg-row">
              <span className="arg-key">{key}:</span>
              <span className="arg-val">{String(val)}</span>
            </div>
          ))}
        </div>
        <div className="tool-result">
          <span className="result-label">Status:</span>
          <span className="result-val">SUCCESS</span>
        </div>
      </div>
    </div>
  );
};

export default ToolCallCard;
