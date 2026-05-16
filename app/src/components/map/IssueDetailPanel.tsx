import React from 'react';
import { IssueFeatureProperties, MAP_MARKER_COLORS } from '@/types';
import './IssueDetailPanel.css';

interface IssueDetailPanelProps {
  issue: IssueFeatureProperties | null;
  onClose: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

const IssueDetailPanel: React.FC<IssueDetailPanelProps> = ({ issue, onClose }) => {
  if (!issue) return null;

  const statusColor = MAP_MARKER_COLORS[issue.status] ?? '#ccc';
  const severityPercent = issue.severity * 10;
  const isCritical = issue.severity > 7;

  return (
    <div className="issue-panel">
      {/* Hero image area with gradient overlay */}
      <div className="issue-panel-hero">
        {issue.imageUrl ? (
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="issue-panel-hero-img"
          />
        ) : (
          <div className="issue-panel-hero-placeholder">
            <span className="material-symbols-outlined">location_city</span>
          </div>
        )}
        <div className="issue-panel-hero-gradient" />

        {/* Overlay content on hero */}
        <div className="issue-panel-hero-content">
          <div className="issue-panel-hero-top">
            {/* Status badge */}
            <div className="issue-panel-status-badge">
              <span>{STATUS_LABELS[issue.status] ?? issue.status}</span>
              <span
                className="issue-panel-status-dot"
                style={{ background: statusColor }}
              />
            </div>
            {/* Close button */}
            <button
              className="issue-panel-close-btn"
              onClick={onClose}
              aria-label="Close panel"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="issue-panel-hero-bottom">
            <h2 className="issue-panel-title">
              {issue.title}
              {issue.category && (
                <span className="issue-panel-title-accent">
                  {' — '}{issue.category.replace(/_/g, ' ')}
                </span>
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Scrollable detail body */}
      <div className="issue-panel-body">
        {/* Description */}
        <p className="issue-panel-description">{issue.description}</p>

        {/* Severity bar */}
        <div className="issue-panel-severity">
          <div className="issue-panel-severity-header">
            <span className="issue-panel-severity-label">Severity Level</span>
            <span
              className={`issue-panel-severity-value ${isCritical ? 'critical' : ''}`}
            >
              {issue.severity}/10
            </span>
          </div>
          <div className="issue-panel-severity-track">
            <div
              className={`issue-panel-severity-fill ${isCritical ? 'critical' : ''}`}
              style={{ width: `${severityPercent}%` }}
            />
          </div>
        </div>

        {/* Meta info stats row */}
        <div className="issue-panel-meta-stats">
          <div className="issue-panel-meta-stat">
            <span className="material-symbols-outlined">location_on</span>
            <div>
              <span className="meta-stat-value">
                {issue.zone?.replace(/_/g, ' ') ?? 'Unknown'}
              </span>
              <span className="meta-stat-label">Zone</span>
            </div>
          </div>
          <div className="issue-panel-meta-stat">
            <span className="material-symbols-outlined">corporate_fare</span>
            <div>
              <span className="meta-stat-value">
                {issue.department?.replace(/_/g, ' ') ?? 'General'}
              </span>
              <span className="meta-stat-label">Department</span>
            </div>
          </div>
          <div className="issue-panel-meta-stat">
            <span className="material-symbols-outlined">calendar_today</span>
            <div>
              <span className="meta-stat-value">
                {new Date(issue.createdAt).toLocaleDateString()}
              </span>
              <span className="meta-stat-label">Reported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="issue-panel-footer">
        <button className="issue-panel-action-primary">
          <span className="material-symbols-outlined">volunteer_activism</span>
          Volunteer to help
        </button>
        <button className="issue-panel-action-icon" aria-label="Share issue">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  );
};

export default IssueDetailPanel;
