import React from 'react';
import { ToolCallResult } from '@/types';
import './ToolCallCard.css';

interface ToolCallCardProps {
  toolCall: ToolCallResult;
}

const ToolCallCard: React.FC<ToolCallCardProps> = ({ toolCall }) => {
  return (
    <div className="tool-call-card">
      <div className="tool-call-header">
        <span className="tool-call-icon">🛠️</span>
        <span className="tool-call-name">{toolCall.toolName}</span>
      </div>
      <div className="tool-call-content">
        {/* Render a simplified summary of the tool result */}
        <pre className="tool-call-summary">
          {JSON.stringify(toolCall.result, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ToolCallCard;
