import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PhotoUpload from '@/components/report/PhotoUpload';
import ClassificationPreview from '@/components/report/ClassificationPreview';
import TicketConfirmation from '@/components/report/TicketConfirmation';
import { MOCK_CLASSIFICATION, generateTicketId } from '@/utils/mockReportData';
import './ReportPage.css';

type ReportStep = 'upload' | 'analyzing' | 'review' | 'success';

const ReportPage: React.FC = () => {
  const [step, setStep] = useState<ReportStep>('upload');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    setStep('analyzing');
    
    // Simulate AI Analysis
    setTimeout(() => {
      setStep('review');
    }, 2000);
  };

  const handleConfirm = (note: string) => {
    // In a real app, this would be a POST request
    console.log('Submitting report with note:', note);
    setStep('analyzing'); // Show loading during submission too
    
    setTimeout(() => {
      setTicketId(generateTicketId());
      setStep('success');
    }, 1500);
  };

  const resetFlow = () => {
    setStep('upload');
    setImageUrl(null);
    setTicketId(null);
  };

  return (
    <div className="report-page-root">
      <div className="report-header-bg">
        <PageContainer>
          <div className="report-hero">
            <h1>Marjan Vision</h1>
            <p>Smart civic reporting for the City of Split.</p>
          </div>
        </PageContainer>
      </div>

      <PageContainer>
        <div className="report-flow-container">
          {step === 'upload' && (
            <PhotoUpload onImageSelect={handleImageSelect} />
          )}

          {step === 'analyzing' && (
            <div className="analyzing-state">
              <div className="ai-scanner">
                {imageUrl && <img src={imageUrl} alt="Analyzing" className="scanning-image" />}
                <div className="scan-line"></div>
              </div>
              <div className="analyzing-text">
                <div className="spinner-small"></div>
                <h3>Gemini is analyzing...</h3>
                <p>Identifying category, severity, and department.</p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <ClassificationPreview 
              classification={MOCK_CLASSIFICATION} 
              onConfirm={handleConfirm}
              onBack={() => setStep('upload')}
            />
          )}

          {step === 'success' && ticketId && (
            <TicketConfirmation ticketId={ticketId} onReset={resetFlow} />
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default ReportPage;
