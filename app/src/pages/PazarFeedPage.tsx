import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PazarGrid from '@/components/pazar/PazarGrid';
import { MOCK_PAZAR_LISTINGS } from '@/utils/mockPazarData';
import './PazarFeedPage.css';

const PazarFeedPage: React.FC = () => {
  return (
    <div className="pazar-feed-page">
      <div className="page-header-bg">
        <PageContainer>
          <div className="hero-section">
            <h1 className="hero-title">Daily Pazar Feed</h1>
            <p className="hero-subtitle">Real-time prices from Split's central market. Fresh from the source.</p>
          </div>
        </PageContainer>
      </div>
      
      <PageContainer>
        <PazarGrid listings={MOCK_PAZAR_LISTINGS} />
      </PageContainer>
    </div>
  );
};

export default PazarFeedPage;
