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

  const getSeverityLabel = (level: number) => {
    if (level <= 3) return 'Low';
    if (level <= 7) return 'Medium';
    return 'High';
  };

  const categoryLabel = classification.category.replace(/_/g, ' ');
  const departmentLabel = classification.department.replace(/_/g, ' ');
  const zoneLabel = classification.zone.replace(/_/g, ' ');

  // Build code-block lines to display the JSON-like classification
  const codeLines = [
    { line: '{', cls: 'bracket' },
    { line: `  "category": "${categoryLabel}"`, cls: '' },
    { line: `  "severity": ${classification.severity}`, cls: '' },
    { line: `  "department": "${departmentLabel}"`, cls: '' },
    { line: `  "zone": "${zoneLabel}"`, cls: '' },
    { line: `  "confidence": ${(classification.confidence * 100).toFixed(0)}%`, cls: '' },
    { line: '}', cls: 'bracket' },
  ];

  return (
    <div className="classification-preview">
      <div className="cp-glass-card">
        <div className="cp-border-highlight" />
        <div className="cp-border-dim" />
        <div className="cp-glow" />

        <div className="cp-content">
          {/* Header */}
          <div className="cp-header">
            <div className="cp-header-left">
              <h2 className="cp-title">AI Analysis</h2>
              <p className="cp-subtitle">Gemini Vision • Civic Report</p>
            </div>
            <div className="cp-header-right">
              <div className="cp-ai-tag">GEMINI-AI</div>
              <div className="cp-status-indicator">
                <div className="cp-status-dot" />
                <span className="cp-status-text">CLASSIFIED</span>
              </div>
            </div>
          </div>

          {/* Code block preview */}
          <div className="cp-code-block">
            <div className="cp-code-header">
              <div className="cp-code-dots">
                <span className="cp-code-dot red" />
                <span className="cp-code-dot yellow" />
                <span className="cp-code-dot green" />
              </div>
              <div className="cp-code-search">
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>search</span>
                classification.json
              </div>
            </div>
            <div className="cp-code-body">
              <div className="cp-code-lines">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="cp-code-content">
                {codeLines.map((cl, i) => {
                  if (cl.cls === 'bracket') {
                    return <div key={i}><span className="bracket">{cl.line}</span></div>;
                  }
                  const [key, val] = cl.line.split(': ');
                  const isNum = val && !val.startsWith('"');
                  return (
                    <div key={i}>
                      <span className="key">{key}</span>: <span className={isNum ? 'value-num' : 'value-str'}>{val}</span>
                    </div>
                  );
                })}
              </pre>
              <div className="cp-code-fade" />
            </div>
          </div>

          {/* Severity bar */}
          <div className="cp-severity-section">
            <div className="cp-severity-label">
              Severity Level — {classification.severity}/10 ({getSeverityLabel(classification.severity)})
            </div>
            <div className="cp-severity-track">
              <div
                className="cp-severity-fill"
                style={{
                  width: `${classification.severity * 10}%`,
                  background: getSeverityColor(classification.severity),
                }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="cp-stats-row">
            <div className="cp-stat">
              <div className="cp-stat-value">{classification.severity}</div>
              <div className="cp-stat-label">SEVERITY</div>
            </div>
            <div className="cp-stat-divider" />
            <div className="cp-stat">
              <div className="cp-stat-value">{(classification.confidence * 100).toFixed(0)}%</div>
              <div className="cp-stat-label">CONFIDENCE</div>
            </div>
            <div className="cp-stat-divider" />
            <div className="cp-stat">
              <div className="cp-stat-value">48h</div>
              <div className="cp-stat-label">EST. RESPONSE</div>
            </div>
          </div>

          <div className="cp-divider" />

          {/* Tags */}
          <div className="cp-tags">
            <span className="cp-tag category">
              <span className="material-symbols-outlined">report</span>
              {categoryLabel}
            </span>
            <span className="cp-tag department">
              <span className="material-symbols-outlined">business</span>
              {departmentLabel}
            </span>
            <span className="cp-tag zone">
              <span className="material-symbols-outlined">location_on</span>
              {zoneLabel}
            </span>
          </div>

          {/* Description bar */}
          <div className="cp-description-bar">
            {classification.description}
          </div>

          {/* Note */}
          <div className="cp-note-section">
            <div className="cp-note-label">Additional Notes (Optional)</div>
            <textarea
              className="cp-note-textarea"
              placeholder="Add context about the issue location, urgency, or other details…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="cp-divider" />

          {/* Footer actions */}
          <div className="cp-footer">
            <button className="cp-back-btn" onClick={onBack}>
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back</span>
            </button>
            <button className="cp-submit-btn" onClick={() => onConfirm(note)}>
              <span className="material-symbols-outlined">send</span>
              <span>Confirm & Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPreview;
