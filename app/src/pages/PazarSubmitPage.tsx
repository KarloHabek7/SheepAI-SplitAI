import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import VendorUpload from '@/components/pazar/VendorUpload';
import { PazarListingClassification } from '@/types';
import './PazarSubmitPage.css';

const PazarSubmitPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);

  const handleUploadComplete = (classification: PazarListingClassification) => {
    // In a real app, this would call the backend
    console.log('Submitting classification:', classification);
    setTimeout(() => {
      setListingId(`PZ-${Math.floor(Math.random() * 10000)}`);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="pazar-submit-content">
        {!isSubmitted ? (
          <>
            <div className="submit-header">
              <h1>Vendor Portal</h1>
              <p>Update your stall's availability and prices in seconds.</p>
            </div>
            <VendorUpload onComplete={handleUploadComplete} />
          </>
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
                <strong>{new Date(Date.now() + 4 * 3600000).toLocaleTimeString()}</strong>
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
