import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PhotoUpload from '@/components/report/PhotoUpload';
import ClassificationPreview from '@/components/report/ClassificationPreview';
import TicketConfirmation from '@/components/report/TicketConfirmation';
import Spinner from '@/components/ui/Spinner';
import { CivicReportClassification } from '@/types';
import './ReportPage.css';

type ReportStep = 'upload' | 'analyzing' | 'confirm' | 'submitting' | 'success';

const MOCK_CLASSIFICATION: CivicReportClassification = {
  category: 'waste_overflow',
  severity: 7,
  zone: 'unesco_core',
  department: 'cistoca',
  description: "Large pile of construction waste and household trash overflowing from container near the palace wall.",
  suggestedAction: "Immediate dispatch of garbage truck and fine investigation.",
  confidence: 0.94
};

const ReportPage: React.FC = () => {
  const [step, setStep] = useState<ReportStep>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [userNote, setUserNote] = useState('');
  const [ticketId, setTicketId] = useState('');

  const handleImageSelected = (img: string) => {
    setImage(img);
    setStep('analyzing');
    
    // Mock analysis delay
    setTimeout(() => {
      setStep('confirm');
    }, 1500);
  };

  const handleSubmit = () => {
    setStep('submitting');
    
    // Mock submission delay
    setTimeout(() => {
      setTicketId(`GR-2026-${Math.floor(Math.random() * 9000) + 1000}`);
      setStep('success');
    }, 1200);
  };

  const resetFlow = () => {
    setImage(null);
    setUserNote('');
    setStep('upload');
  };

  return (
    <PageContainer className="report-page">
      <div className="report-flow-header">
        <h1>Report Issue</h1>
        <p>Your photo will be analyzed by Gemini AI</p>
      </div>

      <div className="report-content">
        {step === 'upload' && (
          <div className="step-content animate-in">
            <PhotoUpload onImageSelected={handleImageSelected} currentImage={image} />
          </div>
        )}

        {step === 'analyzing' && (
          <div className="step-content centered animate-in">
            <Spinner />
            <p className="status-text">AI is identifying the issue...</p>
          </div>
        )}

        {step === 'confirm' && (
          <div className="step-content animate-in">
            <div className="report-preview-layout">
              <div className="preview-image-mini">
                <img src={image!} alt="Selected" />
              </div>
              <ClassificationPreview classification={MOCK_CLASSIFICATION} />
            </div>

            <div className="note-section">
              <label>Additional Note (Optional)</label>
              <textarea 
                placeholder="Anything else we should know?"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
              />
            </div>

            <div className="action-bar">
              <button className="secondary-btn" onClick={() => setStep('upload')}>Back</button>
              <button className="primary-btn" onClick={handleSubmit}>Submit Report</button>
            </div>
          </div>
        )}

        {step === 'submitting' && (
          <div className="step-content centered animate-in">
            <Spinner />
            <p className="status-text">Creating official ticket...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="step-content animate-in">
            <TicketConfirmation ticketId={ticketId} onReset={resetFlow} />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ReportPage;
