import React from 'react';
import './FreshnessIndicator.css';

interface FreshnessIndicatorProps {
  freshness: 'morning' | 'midday' | 'afternoon';
}

const FreshnessIndicator: React.FC<FreshnessIndicatorProps> = ({ freshness }) => {
  const getStatus = () => {
    switch (freshness) {
      case 'morning': return { label: 'Freshly Picked', color: '#16c784' };
      case 'midday': return { label: 'Midday Selection', color: '#ffb000' };
      case 'afternoon': return { label: 'Selling Out', color: '#ff2d2d' };
      default: return { label: 'Market Active', color: '#16c784' };
    }
  };

  const { label, color } = getStatus();

  return (
    <div className="freshness-indicator">
      <span className="freshness-dot" style={{ backgroundColor: color }} />
      <span className="freshness-label" style={{ color }}>{label}</span>
    </div>
  );
};

export default FreshnessIndicator;
