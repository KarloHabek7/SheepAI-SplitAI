import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PazarGrid from '@/components/pazar/PazarGrid';
import { MOCK_PAZAR_LISTINGS } from '@/utils/mockPazarData';
import './PazarFeedPage.css';

import imgFish from '@/assets/images/pazar_fish.png';
import imgFruit from '@/assets/images/pazar_fruit.png';
import imgCheese from '@/assets/images/pazar_cheese.png';

const PazarFeedPage: React.FC = () => {
  // Use our locally generated images repeatedly for the marquee
  const images = [
    imgFish, imgFruit, imgCheese, imgFish, imgFruit, imgCheese, imgFish, imgFruit
  ];

  return (
    <div className="pazar-feed-page">
      <section className="pazar-hero">
        <div className="pazar-hero-content">
          <span className="pazar-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>storefront</span>
            Daily Market Feed
          </span>
          <h1 className="pazar-hero-title">Fresh from Split's central market</h1>
          <p className="pazar-hero-subtitle">
            Real-time prices and availability from local vendors. Support local, eat fresh.
          </p>
          <div className="pazar-hero-actions">
            <button className="pazar-cta-btn">
              Explore Produce
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
        </div>

        <div className="pazar-marquee-wrapper">
          <div className="pazar-marquee">
            <div className="pazar-marquee-track">
              {images.map((src, idx) => (
                <div key={`img1-${idx}`} className="pazar-marquee-item">
                  <img src={src} alt="Market produce" />
                </div>
              ))}
            </div>
            <div className="pazar-marquee-track">
              {images.map((src, idx) => (
                <div key={`img2-${idx}`} className="pazar-marquee-item">
                  <img src={src} alt="Market produce" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <PageContainer>
        <PazarGrid listings={MOCK_PAZAR_LISTINGS} />
      </PageContainer>
    </div>
  );
};

export default PazarFeedPage;
