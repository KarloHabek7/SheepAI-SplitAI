import React from 'react';
import { ToolCallResult } from '@/types';
import './ToolCallCard.css';

interface ToolCallCardProps {
  toolCall: ToolCallResult;
}

const ToolCallCard: React.FC<ToolCallCardProps> = ({ toolCall }) => {
  return (
    <div className="tool-call-box">
      <div className="tool-call-header">
        <div className="tool-header-left">
          <span className="material-symbols-outlined tool-pulse-icon">build_circle</span>
          <span className="tool-exec-title">{toolCall.toolName.replace(/_/g, ' ')}</span>
        </div>
        <div className="tool-status-pill">
          <span className="status-dot animate-pulse"></span>
          <span>Executed</span>
        </div>
      </div>
      
      <div className="tool-call-body">
        <div className="tool-section-label">Parameters</div>
        <div className="tool-args-grid">
          {Object.entries(toolCall.args).map(([key, val]) => (
            <div key={key} className="tool-arg-item">
              <span className="arg-label">{key}:</span>
              <span className="arg-value">{String(val)}</span>
            </div>
          ))}
        </div>
        
        <div className="tool-section-label mt-2">Result</div>
        <div className="tool-result-panel">
          {Object.entries(toolCall.result).map(([key, val]) => (
            <div key={key} className="tool-result-item">
              <span className="result-key">{key}:</span>
              <span className="result-val">{String(val)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCallCard;
