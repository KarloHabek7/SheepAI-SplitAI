import React from 'react';
import { EmergencyType } from '../../types';
import './QRScanner.css';

interface QRScannerProps {
  onSelectType: (type: EmergencyType) => void;
  selectedType: EmergencyType | null;
}

const QRScanner: React.FC<QRScannerProps> = ({ onSelectType, selectedType }) => {
  const emergencyTypes: { type: EmergencyType; label: string; icon: string }[] = [
    { type: 'fire', label: 'Fire', icon: 'local_fire_department' },
    { type: 'bura_wind', label: 'Bura Wind', icon: 'cyclone' },
    { type: 'flood', label: 'Flood', icon: 'flood' },
    { type: 'earthquake', label: 'Earthquake', icon: 'volcano' },
    { type: 'air_quality', label: 'Air Quality', icon: 'air' },
    { type: 'general', label: 'General', icon: 'emergency' },
  ];

  return (
    <div className="qr-scanner-container">
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

      <div className="manual-selector">
        <p className="selector-label">Or select manually:</p>
        <div className="type-grid">
          {emergencyTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`type-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => onSelectType(type)}
            >
              <span className="material-symbols-rounded">{icon}</span>
              <span className="label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
