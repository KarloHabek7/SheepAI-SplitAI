import React from 'react';
import './DashboardMetric.css';

interface DashboardMetricProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({ 
  label, 
  value, 
  trend, 
  icon,
  color = 'primary'
}) => {
  return (
    <div className={`metric-card metric-card--${color}`}>
      <div className="metric-header">
        <span className="material-symbols-outlined metric-icon">{icon}</span>
        {trend && (
          <div className={`metric-trend ${trend.isUp ? 'trend--up' : 'trend--down'}`}>
            <span className="material-symbols-outlined trend-icon">
              {trend.isUp ? 'trending_up' : 'trending_down'}
            </span>
            <span className="trend-value">{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="metric-body">
        <h2 className="metric-value">{value}</h2>
        <p className="metric-label">{label}</p>
      </div>
    </div>
  );
};

export default DashboardMetric;
