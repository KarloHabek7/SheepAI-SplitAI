import React from 'react';
import { MAP_MARKER_COLORS } from '@/types';
import './StatusLegend.css';

const StatusLegend: React.FC = () => {
  return (
    <div className="status-legend">
      <div className="legend-item">
        <span className="dot" style={{ backgroundColor: MAP_MARKER_COLORS.open }} />
        <span>Open</span>
      </div>
      <div className="legend-item">
        <span className="dot" style={{ backgroundColor: MAP_MARKER_COLORS.in_progress }} />
        <span>In Progress</span>
      </div>
      <div className="legend-item">
        <span className="dot" style={{ backgroundColor: MAP_MARKER_COLORS.resolved }} />
        <span>Resolved</span>
      </div>
    </div>
  );
};

export default StatusLegend;
