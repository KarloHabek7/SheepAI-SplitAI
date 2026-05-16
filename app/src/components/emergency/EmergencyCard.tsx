import React from 'react';
import { EmergencyInfo } from '../../types';
import './EmergencyCard.css';

interface EmergencyCardProps {
  info: EmergencyInfo;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ info }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'bura_wind': return 'cyclone';
      case 'flood': return 'flood';
      case 'earthquake': return 'volcano'; // volcano is closest to earthquake in some sets, or use 'emergency'
      case 'fire': return 'local_fire_department';
      case 'air_quality': return 'air';
      default: return 'warning';
    }
  };

  return (
    <div className={`emergency-card alert-${info.alertType} animate-slide-up`}>
      <div className="card-header">
        <span className="material-symbols-rounded emergency-icon">
          {getIcon(info.alertType)}
        </span>
        <h2 className="emergency-title">{info.title}</h2>
      </div>

      <div className="instructions-section">
        <h3>Instructions</h3>
        <ol className="instructions-list">
          {info.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="tips-section">
        <div className="tips-badge">
          <span className="material-symbols-rounded">lightbulb</span>
          <span>Safety Tips</span>
        </div>
        <ul className="tips-list">
          {info.safetyTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="contacts-section">
        <h3>Emergency Contacts</h3>
        <div className="contacts-grid">
          {info.contacts.map((contact, index) => (
            <a key={index} href={`tel:${contact.phone}`} className="contact-item">
              <div className="contact-info">
                <span className="contact-name">{contact.name}</span>
                <span className="contact-desc">{contact.description}</span>
              </div>
              <span className="contact-phone">{contact.phone}</span>
              <span className="material-symbols-rounded call-icon">call</span>
            </a>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <p>Last updated: {new Date(info.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EmergencyCard;
