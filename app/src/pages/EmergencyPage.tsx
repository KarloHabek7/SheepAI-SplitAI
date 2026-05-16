import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmergencyType, SupportedLanguage } from '../types';
import QRScanner from '../components/emergency/QRScanner';
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

  return (
    <div className="emergency-page-root">
      <div className="emergency-hero-bg">
        <div className="emergency-hero-overlay"></div>
        <div className="emergency-hero-content">
          <div className="header-text">
            <span className="material-symbols-rounded emergency-hero-icon">notifications_active</span>
            <h1 className="page-title">{t('emergency.title')}</h1>
            <p className="page-subtitle">{t('emergency.subtitle')}</p>
          </div>
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
      </div>

      <PageContainer>
        <div className="emergency-content">
          {!selectedType ? (
            <QRScanner onSelectType={handleSelectType} selectedType={selectedType} />
          ) : (
            <div className="info-view">
              <button className="back-btn" onClick={() => setSelectedType(null)}>
                <span className="material-symbols-rounded">arrow_back</span>
                {t('common.back')}
              </button>
              {currentInfo && <EmergencyCard info={currentInfo} />}
            </div>
          )}
        </div>

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
