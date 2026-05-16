import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import VendorUpload from '@/components/pazar/VendorUpload';
import { PazarListingClassification } from '@/types';
import { submitListing } from '@/services/pazarService';
import './PazarSubmitPage.css';

const PazarSubmitPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleUploadComplete = async (classification: PazarListingClassification) => {
    setIsSubmitting(true);
    try {
      const response = await submitListing({
        classification,
        vendor: 'Local Vendor', // TODO: from auth context
      });
      if (response.success && response.data) {
        setListingId(response.data.listingId);
        setExpiresAt(response.data.expiresAt);
        setIsSubmitted(true);
      } else {
        console.error('[PazarSubmit] Submission failed:', response.error);
      }
    } catch (error) {
      console.error('[PazarSubmit] Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="pazar-submit-content">
        {!isSubmitted ? (
          <div style={{ position: 'relative' }}>
            <VendorUpload onComplete={handleUploadComplete} />
            {isSubmitting && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)', borderRadius: '16px', backdropFilter: 'blur(4px)', zIndex: 10
              }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>Publishing listing…</span>
              </div>
            )}
          </div>
        ) : (
          <div className="success-state">
            <div className="success-icon-container">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h2>Listing Published!</h2>
            <p>Your products are now visible on the public feed. It will expire in 4 hours.</p>
            <div className="listing-info">
              <div className="info-row">
                <span>Listing ID:</span>
                <strong>{listingId}</strong>
              </div>
              <div className="info-row">
                <span>Expires at:</span>
                <strong>{expiresAt ? new Date(expiresAt).toLocaleTimeString() : '—'}</strong>
              </div>
            </div>
            <button className="primary-btn" onClick={() => setIsSubmitted(false)}>
              Post Another Listing
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PazarSubmitPage;
