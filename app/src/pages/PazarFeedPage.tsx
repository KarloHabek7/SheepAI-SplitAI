import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PazarGrid from '@/components/pazar/PazarGrid';
import { MOCK_PAZAR_LISTINGS } from '@/utils/mockPazarData';
import './PazarFeedPage.css';

const PazarFeedPage: React.FC = () => {
  const images = [
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/de692cd3-6ed5-40da-b589-663e89889a1c_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/42dfe760-aef6-44a2-bff9-70aa005c5961_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c18d9fac-84d4-4727-95df-38b04c62ac05_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c3e3fffd-33c5-442f-924a-7bc1032b2c0f_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/31996fe3-f9da-42d7-bf65-2cc5d5417271_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5989c16d-4aa3-4351-bfdb-fac959736459_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6c39c735-18f1-4b74-aa61-180fbb2b4770_800w.jpg"
  ];

  return (
    <div className="pazar-feed-page">
      <section className="pazar-hero">
        <div className="pazar-hero-content">
          <span className="pazar-badge">Daily Market Feed</span>
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
