import React, { useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PazarGrid from '@/components/pazar/PazarGrid';
import { usePazarStore } from '@/stores/usePazarStore';
import './PazarFeedPage.css';

import imgFish from '@/assets/images/pazar_fish.png';
import imgFruit from '@/assets/images/pazar_fruit.png';
import imgCheese from '@/assets/images/pazar_cheese.png';

const PazarFeedPage: React.FC = () => {
  const { listings, isLoading, fetchListings } = usePazarStore();

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

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
        {isLoading && listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-secondary)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '0.5rem', opacity: 0.5 }}>hourglass_empty</span>
            Loading market listings…
          </div>
        ) : (
          <PazarGrid listings={listings} />
        )}
      </PageContainer>
    </div>
  );
};

export default PazarFeedPage;
