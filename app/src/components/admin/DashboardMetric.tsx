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
    <div className={`metric-card metric-card--${color} animate-scale-in`}>
      <div className="metric-header">
        <span className="material-symbols-outlined metric-icon">{icon}</span>
        <span className="metric-label">{label}</span>
      </div>
      <p className="metric-value">{value}</p>
      {trend && (
        <p className="metric-trend">
          <span className={trend.isUp ? 'trend-up' : 'trend-down'}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
          {' '}vs last month
        </p>
      )}
    </div>
  );
};

export default DashboardMetric;
