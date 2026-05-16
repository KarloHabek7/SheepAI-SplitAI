import React, { useState } from 'react';
import { EmergencyType, SupportedLanguage } from '../types';
import QRScanner from '../components/emergency/QRScanner';
import EmergencyCard from '../components/emergency/EmergencyCard';
import PageContainer from '../components/layout/PageContainer';
import { mockEmergencyData } from '../utils/mockEmergencyData';
import './EmergencyPage.css';

const EmergencyPage: React.FC = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('hr');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);

  const handleSelectType = (type: EmergencyType) => {
    setSelectedType(type);
  };

  const currentInfo = selectedType ? mockEmergencyData[language][selectedType] : null;

  return (
    <PageContainer>
      <div className="emergency-page">
        <div className="emergency-header">
          <div className="header-text">
            <h1 className="page-title">Siren Translator</h1>
            <p className="page-subtitle">Instant safety instructions in your language</p>
          </div>
          <div className="language-switcher">
            {(['hr', 'en', 'de'] as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="emergency-content">
          {!selectedType ? (
            <QRScanner onSelectType={handleSelectType} selectedType={selectedType} />
          ) : (
            <div className="info-view">
              <button className="back-btn" onClick={() => setSelectedType(null)}>
                <span className="material-symbols-rounded">arrow_back</span>
                Back to Scanner
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
      </div>
    </PageContainer>
  );
};

export default EmergencyPage;
