import React from 'react';
import { CivicReportClassification } from '@/types';
import './ClassificationPreview.css';

interface ClassificationPreviewProps {
  classification: CivicReportClassification;
}

const ClassificationPreview: React.FC<ClassificationPreviewProps> = ({ classification }) => {
  const getSeverityColor = (level: number) => {
    if (level >= 8) return '#ff2d2d'; // High
    if (level >= 4) return '#ffb000'; // Medium
    return '#16c784'; // Low
  };

  return (
    <div className="classification-card">
      <div className="classification-header">
        <div className="classification-badge">AI Analysis Complete</div>
        <div className="confidence-meter">
          {Math.round(classification.confidence * 100)}% Match
        </div>
      </div>

      <div className="classification-body">
        <div className="field-group">
          <label>Category</label>
          <div className="field-value capitalize">{classification.category.replace('_', ' ')}</div>
        </div>

        <div className="field-group">
          <label>Department</label>
          <div className="field-value capitalize">{classification.department.replace('_', ' ')}</div>
        </div>

        <div className="field-group">
          <label>Severity</label>
          <div className="severity-row">
            <div className="severity-bar-bg">
              <div 
                className="severity-bar-fill" 
                style={{ 
                  width: `${classification.severity * 10}%`,
                  backgroundColor: getSeverityColor(classification.severity)
                }}
              />
            </div>
            <span className="severity-text">{classification.severity}/10</span>
          </div>
        </div>

        <div className="field-group">
          <label>Zone</label>
          <div className="field-value capitalize">{classification.zone.replace('_', ' ')}</div>
        </div>

        <div className="field-group">
          <label>Description</label>
          <div className="field-value description">{classification.description}</div>
        </div>

        <div className="field-group suggested">
          <label>Suggested Action</label>
          <div className="field-value action">{classification.suggestedAction}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPreview;
