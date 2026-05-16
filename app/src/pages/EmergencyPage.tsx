import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmergencyType, SupportedLanguage } from '../types';
import EmergencyCard from '../components/emergency/EmergencyCard';
import PageContainer from '../components/layout/PageContainer';
import { mockEmergencyData } from '../utils/mockEmergencyData';
import './EmergencyPage.css';

const EmergencyPage: React.FC = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguage>('hr');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);

  const handleSelectType = (type: EmergencyType) => {
    setSelectedType(type);
  };

  const currentInfo = selectedType ? mockEmergencyData[language][selectedType] : null;

  const emergencyTypes: { type: EmergencyType; label: string; icon: string }[] = [
    { type: 'fire', label: 'Fire', icon: 'local_fire_department' },
    { type: 'bura_wind', label: 'Bura Wind', icon: 'cyclone' },
    { type: 'flood', label: 'Flood', icon: 'flood' },
    { type: 'earthquake', label: 'Earthquake', icon: 'volcano' },
    { type: 'air_quality', label: 'Air Quality', icon: 'air' },
    { type: 'general', label: 'General', icon: 'emergency' },
  ];

  return (
    <div className="emergency-page-root">
      <div className="emergency-page-bg"></div>
      
      <PageContainer>
        {!selectedType ? (
          <div className="emergency-split-layout animate-fade-in">
            {/* LEFT COLUMN: Branding & Scanner */}
            <div className="layout-column branding-scanner">
              <div className="branding-section">
                <span className="material-symbols-rounded emergency-hero-icon">notifications_active</span>
                <div className="title-group">
                  <h1 className="page-title">{t('emergency.title')}</h1>
                  <p className="page-subtitle">{t('emergency.subtitle')}</p>
                </div>
              </div>

              <div className="scanner-section-compact">
                <div className="scanner-placeholder">
                  <div className="scanner-frame">
                    <span className="material-symbols-rounded scanner-icon">qr_code_scanner</span>
                    <p>Scan Siren QR Code</p>
                  </div>
                  <div className="scanner-overlay">
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Language & Manual Selection */}
            <div className="layout-column control-selection">
              <div className="language-section">
                <p className="section-label">Select Language:</p>
                <div className="language-switcher-glass">
                  {(['hr', 'en', 'de', 'it', 'fr'] as SupportedLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      className={`lang-pill ${language === lang ? 'active' : ''}`}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="manual-section">
                <p className="section-label">Or Select Manually:</p>
                <div className="type-grid-compact">
                  {emergencyTypes.map(({ type, label, icon }) => (
                    <button
                      key={type}
                      className={`type-button-compact ${selectedType === type ? 'active' : ''}`}
                      onClick={() => handleSelectType(type)}
                    >
                      <span className="material-symbols-rounded">{icon}</span>
                      <span className="label">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="info-view">
            <button className="back-btn" onClick={() => setSelectedType(null)}>
              <span className="material-symbols-rounded">arrow_back</span>
              {t('common.back')}
            </button>
            {currentInfo && <EmergencyCard info={currentInfo} />}
          </div>
        )}

        <div className="emergency-footer">
          <div className="safety-badge">
            <span className="material-symbols-rounded">verified_user</span>
            <span>Official Civil Protection Protocol — City of Split</span>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default EmergencyPage;
