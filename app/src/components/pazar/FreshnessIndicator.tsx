import React from 'react';
import './FreshnessIndicator.css';

interface FreshnessIndicatorProps {
  freshness: 'morning' | 'midday' | 'afternoon';
}

const FreshnessIndicator: React.FC<FreshnessIndicatorProps> = ({ freshness }) => {
  const getStatus = () => {
    switch (freshness) {
      case 'morning':
        return { label: 'Freshly Posted', class: 'fresh' };
      case 'midday':
        return { label: 'Updated Midday', class: 'mid' };
      case 'afternoon':
        return { label: 'Selling Out', class: 'late' };
      default:
        return { label: 'Unknown', class: '' };
    }
  };

  const status = getStatus();

  return (
    <div className={`freshness-indicator ${status.class}`}>
      <span className="dot"></span>
      <span className="label">{status.label}</span>
    </div>
  );
};

export default FreshnessIndicator;
