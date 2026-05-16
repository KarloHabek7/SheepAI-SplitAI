import React from 'react';
import './SeverityBadge.css';
import { SeverityLevel } from '@/types';

interface SeverityBadgeProps {
  level: SeverityLevel;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ level }) => {
  const getSeverityInfo = (lvl: number) => {
    if (lvl <= 3) return { label: 'Low', class: 'severity-low' };
    if (lvl <= 6) return { label: 'Medium', class: 'severity-medium' };
    if (lvl <= 8) return { label: 'High', class: 'severity-high' };
    return { label: 'Critical', class: 'severity-critical' };
  };

  const info = getSeverityInfo(level);

  return (
    <span className={`severity-badge ${info.class}`}>
      {info.label} ({level})
    </span>
  );
};

export default SeverityBadge;
