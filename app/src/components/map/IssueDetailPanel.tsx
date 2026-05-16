import React from 'react';
import { IssueFeatureProperties, MAP_MARKER_COLORS } from '@/types';
import './IssueDetailPanel.css';

interface IssueDetailPanelProps {
  issue: IssueFeatureProperties | null;
  onClose: () => void;
}

const IssueDetailPanel: React.FC<IssueDetailPanelProps> = ({ issue, onClose }) => {
  if (!issue) return null;

  return (
    <div className="issue-detail-panel">
      <div className="panel-header">
        <div className="status-indicator">
          <span 
            className="status-dot" 
            style={{ background: MAP_MARKER_COLORS[issue.status] }}
          ></span>
          <span className="status-label">{issue.status.replace(/_/g, ' ')}</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="panel-scroll-content">
        <h2 className="issue-title">{issue.title}</h2>
        
        {issue.imageUrl && (
          <div className="issue-image">
            <img src={issue.imageUrl} alt={issue.title} />
          </div>
        )}

        <div className="issue-meta">
          <div className="meta-item">
            <span className="material-symbols-outlined">category</span>
            <span>{issue.category.replace(/_/g, ' ')}</span>
          </div>
          <div className="meta-item">
            <span className="material-symbols-outlined">location_on</span>
            <span>{issue.zone?.replace(/_/g, ' ')}</span>
          </div>
          <div className="meta-item">
            <span className="material-symbols-outlined">corporate_fare</span>
            <span>{issue.department?.replace(/_/g, ' ')}</span>
          </div>
        </div>

        <div className="severity-info">
          <div className="label">Severity Level ({issue.severity}/10)</div>
          <div className="severity-bar">
            <div 
              className="severity-fill" 
              style={{ 
                width: `${issue.severity * 10}%`,
                background: issue.severity > 7 ? 'var(--color-error)' : 'var(--color-primary)'
              }}
            ></div>
          </div>
        </div>

        <div className="issue-description">
          <p>{issue.description}</p>
        </div>

        <div className="timestamp">
          Reported on {new Date(issue.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="panel-footer">
        <button className="action-btn resolve">Volunteer to help</button>
        <button className="action-btn share">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  );
};

export default IssueDetailPanel;
