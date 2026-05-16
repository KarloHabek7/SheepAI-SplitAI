import React from 'react';
import './SeverityChart.css';

interface SeverityChartProps {
  data: Record<string, number>;
}

const SeverityChart: React.FC<SeverityChartProps> = ({ data }) => {
  const maxValue = Math.max(...Object.values(data), 1);
  
  const categories = [
    { key: 'Low', label: 'Low (1-3)', class: 'bar-low' },
    { key: 'Medium', label: 'Medium (4-6)', class: 'bar-medium' },
    { key: 'High', label: 'High (7-8)', class: 'bar-high' },
    { key: 'Critical', label: 'Critical (9-10)', class: 'bar-critical' }
  ];

  return (
    <div className="severity-chart-card">
      <h3 className="chart-title">Severity Distribution</h3>
      <div className="chart-container">
        {categories.map((cat) => {
          const value = data[cat.key] || 0;
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={cat.key} className="chart-row">
              <div className="row-label">
                <span className="label-text">{cat.label}</span>
                <span className="label-value">{value}</span>
              </div>
              <div className="row-track">
                <div 
                  className={`row-bar ${cat.class}`} 
                  style={{ width: `${Math.max(percentage, 2)}%` }}
                >
                  {percentage > 15 && <span className="bar-count">{value}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeverityChart;
