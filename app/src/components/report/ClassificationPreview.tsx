import React from 'react';
import { CivicReportClassification } from '@/types';
import './ClassificationPreview.css';

interface ClassificationPreviewProps {
  classification: CivicReportClassification;
  onConfirm: (note: string) => void;
  onBack: () => void;
}

const ClassificationPreview: React.FC<ClassificationPreviewProps> = ({ classification, onConfirm, onBack }) => {
  const [note, setNote] = React.useState('');

  const getSeverityColor = (level: number) => {
    if (level <= 3) return 'var(--color-success)';
    if (level <= 7) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="classification-preview">
      <div className="ai-badge">
        <span className="material-symbols-outlined">auto_awesome</span>
        AI Analysis Complete
      </div>
      
      <div className="result-card">
        <div className="card-section category-section">
          <div className="section-label">Identified Category</div>
          <div className="category-value">
            <span className="material-symbols-outlined category-icon">report</span>
            {classification.category.replace(/_/g, ' ')}
          </div>
        </div>

        <div className="card-section severity-section">
          <div className="section-label">Severity Level ({classification.severity}/10)</div>
          <div className="severity-bar-container">
            <div 
              className="severity-bar-fill" 
              style={{ 
                width: `${classification.severity * 10}%`,
                background: getSeverityColor(classification.severity)
              }}
            ></div>
          </div>
        </div>

        <div className="grid-details">
          <div className="card-section">
            <div className="section-label">Department</div>
            <div className="detail-value">{classification.department.replace(/_/g, ' ')}</div>
          </div>
          <div className="card-section">
            <div className="section-label">City Zone</div>
            <div className="detail-value">{classification.zone.replace(/_/g, ' ')}</div>
          </div>
        </div>

        <div className="card-section">
          <div className="section-label">AI Description</div>
          <p className="ai-description">{classification.description}</p>
        </div>

        <div className="card-section note-section">
          <div className="section-label">Add a Note (Optional)</div>
          <textarea 
            placeholder="Add any additional details..." 
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="action-footer">
        <button className="secondary-btn" onClick={onBack}>Back</button>
        <button className="primary-btn submit-btn" onClick={() => onConfirm(note)}>
          Confirm & Submit Report
        </button>
      </div>
    </div>
  );
};

export default ClassificationPreview;
