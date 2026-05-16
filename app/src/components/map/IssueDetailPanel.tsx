import React from 'react';
import { IssueFeatureProperties, MAP_MARKER_COLORS } from '@/types';
import './IssueDetailPanel.tsx'; // Wait, should be .css
import './IssueDetailPanel.css';

interface IssueDetailPanelProps {
  issue: IssueFeatureProperties | null;
  onClose: () => void;
}

const IssueDetailPanel: React.FC<IssueDetailPanelProps> = ({ issue, onClose }) => {
  if (!issue) return null;

  return (
    <div className="issue-detail-panel">
      <button className="panel-close-btn" onClick={onClose}>×</button>
      
      <div className="panel-header">
        <h2 className="panel-title">{issue.title}</h2>
        <span 
          className="status-badge" 
          style={{ backgroundColor: MAP_MARKER_COLORS[issue.status] }}
        >
          {issue.status.replace('_', ' ')}
        </span>
      </div>

      <div className="panel-content">
        <div className="detail-row">
          <label>Category</label>
          <div className="value capitalize">{issue.category.replace('_', ' ')}</div>
        </div>

        <div className="detail-row">
          <label>Severity</label>
          <div className="severity-bar-container">
            <div 
              className="severity-bar" 
              style={{ 
                width: `${issue.severity * 10}%`,
                backgroundColor: MAP_MARKER_COLORS[issue.status] 
              }} 
            />
          </div>
        </div>

        <div className="detail-row">
          <label>Description</label>
          <p className="description-text">{issue.description}</p>
        </div>

        <div className="detail-row">
          <label>Created</label>
          <div className="value">{new Date(issue.createdAt).toLocaleDateString()}</div>
        </div>

        <button className="resolve-btn">Submit Resolution Info</button>
      </div>
    </div>
  );
};

export default IssueDetailPanel;
