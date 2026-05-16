import React, { useState, useRef, useEffect } from 'react';
import { useReportStore } from '@/stores/useReportStore';
import ClassificationPreview from '@/components/report/ClassificationPreview';
import TicketConfirmation from '@/components/report/TicketConfirmation';
import './ReportPage.css';

type ReportStep = 'upload' | 'analyzing' | 'review' | 'success';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const ReportPage: React.FC = () => {
  const [step, setStep] = useState<ReportStep>('upload');
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    currentImage, 
    classification, 
    submissionStatus, 
    submittedTicketId,
    isAnalyzing, 
    isSubmitting,
    analyzeImage,
    submitReport,
    reset
  } = useReportStore();

  // Sync step with store state
  useEffect(() => {
    if (isAnalyzing || isSubmitting) {
      setStep('analyzing');
    } else if (submissionStatus === 'submitted') {
      setStep('success');
    } else if (classification) {
      setStep('review');
    } else if (!currentImage) {
      setStep('upload');
    }
  }, [isAnalyzing, isSubmitting, classification, submissionStatus, currentImage]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Local preview URL for immediate feedback
      const url = URL.createObjectURL(file);
      setLocalImageUrl(url);
      
      try {
        const base64 = await fileToBase64(file);
        await analyzeImage(base64);
      } catch (err) {
        console.error('Failed to process image:', err);
        setStep('upload');
      }
    }
  };

  const handleConfirm = async (note: string) => {
    await submitReport(note);
  };

  const resetFlow = () => {
    reset();
    setLocalImageUrl(null);
    setStep('upload');
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    reset();
    setLocalImageUrl(null);
    setStep('upload');
  };

  const currentStepIndex = ['upload', 'analyzing', 'review', 'success'].indexOf(step);

  const steps = [
    { name: 'Upload Photo', sub: 'Step 1', getStatus: () => (currentStepIndex > 0 ? 'done' : currentStepIndex === 0 ? 'active' : 'pending') },
    { name: 'AI Analysis', sub: 'Step 2', getStatus: () => (currentStepIndex > 1 ? 'done' : currentStepIndex === 1 ? 'active' : 'pending') },
    { name: 'Review & Confirm', sub: 'Step 3', getStatus: () => (currentStepIndex > 2 ? 'done' : currentStepIndex === 2 ? 'active' : 'pending') },
    { name: 'Report Submitted', sub: 'Complete', getStatus: () => (currentStepIndex === 3 ? 'done' : 'pending') },
  ];

  return (
    <div className="report-page-root">
      {/* === Hero Section === */}
      <section className="report-hero-section">
        <div className="report-hero-grid">
          <div className="report-hero-text">
            <h1>
              <span>Marjan</span>
              <span>Vision</span>
            </h1>
            <p className="report-hero-description">
              Smart civic reporting for the City of Split. Snap a photo of any issue — our Gemini AI identifies the problem, routes it to the right department, and tracks resolution.
            </p>

            <div className="report-hero-ctas">
              <button
                className="report-cta-primary"
                onClick={() => {
                  const el = document.getElementById('report-flow');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>photo_camera</span>
                <span>Start Reporting</span>
              </button>
              <button className="report-cta-secondary" onClick={() => window.location.href = '/map'}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>map</span>
                <span>View Issue Map</span>
              </button>
            </div>

            <div className="report-hero-stats">
              <div className="report-stat-item">
                <span className="material-symbols-outlined">location_on</span>
                <div>
                  <p className="report-stat-title">City of Split</p>
                  <p className="report-stat-sub">Diocletian's Palace & beyond</p>
                </div>
              </div>
              <div className="report-stat-item">
                <span className="material-symbols-outlined">auto_awesome</span>
                <div>
                  <p className="report-stat-title">Gemini Vision AI</p>
                  <p className="report-stat-sub">Instant classification</p>
                </div>
              </div>
              <div className="report-stat-item">
                <span className="material-symbols-outlined">verified</span>
                <div>
                  <p className="report-stat-title">Track Resolution</p>
                  <p className="report-stat-sub">48h average response</p>
                </div>
              </div>
            </div>
          </div>

          <div className="report-hero-image-wrapper">
            <img
              src="/assets/images/split-civic-hero.png"
              alt="Aerial view of Split, Croatia"
              className="report-hero-image"
            />
            <div className="report-hero-image-gradient" />

            <div className="report-hero-overlay-stats">
              <div className="report-overlay-stat">
                <div className="report-overlay-stat-header">
                  <div className="report-overlay-stat-dot" />
                  <div className="report-overlay-stat-value">94%</div>
                </div>
                <div className="report-overlay-stat-label">AI accuracy</div>
              </div>
              <div className="report-overlay-stat">
                <div className="report-overlay-stat-header">
                  <div className="report-overlay-stat-dot" />
                  <div className="report-overlay-stat-value">1.2s</div>
                </div>
                <div className="report-overlay-stat-label">avg analysis</div>
              </div>
              <div className="report-overlay-stat">
                <div className="report-overlay-stat-header">
                  <div className="report-overlay-stat-dot" />
                  <div className="report-overlay-stat-value">847</div>
                </div>
                <div className="report-overlay-stat-label">reports filed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Report Flow Section === */}
      <section className="report-flow-section" id="report-flow">
        <div className="report-flow-container">
          <div className="report-step-card" style={{ marginBottom: 24 }}>
            <div className="report-step-header">
              <div className="report-step-tabs">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    className={`report-step-tab ${s.getStatus() === 'active' ? 'active' : ''}`}
                  >
                    Step {i + 1}
                  </button>
                ))}
              </div>
              <div className="report-step-count">{currentStepIndex + 1}/4</div>
            </div>
            <div className="report-step-list">
              {steps.map((s, i) => {
                const status = s.getStatus();
                return (
                  <div className="report-step-row" key={i}>
                    <div className="report-step-row-left">
                      <div className={`report-step-dot ${status}`} />
                      <div>
                        <div className="report-step-name">{s.name}</div>
                        <div className="report-step-sub">{s.sub}</div>
                      </div>
                    </div>
                    <span className={`report-step-badge ${status}`}>
                      {status === 'done' ? 'Done' : status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {step === 'upload' && (
            <div className="report-step-card">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                capture="environment"
                hidden
              />
              <div
                className="report-upload-area"
                onClick={() => fileInputRef.current?.click()}
              >
                {!localImageUrl ? (
                  <div className="report-upload-inner">
                    <div className="report-upload-icon">
                      <span className="material-symbols-outlined">add_a_photo</span>
                    </div>
                    <p className="report-upload-title">Capture or select a photo</p>
                    <p className="report-upload-subtitle">
                      Show us the problem — Gemini will classify it automatically
                    </p>
                    <button className="report-upload-btn" type="button">
                      Select or Capture
                    </button>
                  </div>
                ) : (
                  <div className="report-upload-preview">
                    <img src={localImageUrl} alt="Problem preview" />
                    <div className="report-upload-preview-overlay">
                      <button className="report-remove-btn" onClick={clearImage}>
                        <span className="material-symbols-outlined">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="report-step-card">
              <div className="report-analyzing-state">
                <div className="report-ai-scanner">
                  {localImageUrl && <img src={localImageUrl} alt="Analyzing" className="report-scanning-image" />}
                  <div className="report-scan-line" />
                </div>
                <div className="report-analyzing-info">
                  <div className="report-spinner" />
                  <h3>{isSubmitting ? 'Submitting report...' : 'Gemini is analyzing…'}</h3>
                  <p>{isSubmitting ? 'Saving to municipal database' : 'Identifying category, severity, and department'}</p>
                </div>
              </div>
            </div>
          )}

          {step === 'review' && classification && (
            <ClassificationPreview
              classification={classification}
              onConfirm={handleConfirm}
              onBack={() => reset()}
            />
          )}

          {step === 'success' && submittedTicketId && (
            <TicketConfirmation ticketId={submittedTicketId} onReset={resetFlow} />
          )}
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
