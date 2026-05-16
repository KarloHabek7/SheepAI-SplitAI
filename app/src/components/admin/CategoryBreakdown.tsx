import React from 'react';
import './CategoryBreakdown.css';
import { IssueCategory } from '@/types';

interface CategoryBreakdownProps {
  data: Record<IssueCategory, number>;
}

const CATEGORY_ICONS: Record<IssueCategory, string> = {
  pothole: 'road',
  graffiti: 'format_paint',
  illegal_parking: 'directions_car',
  noise_complaint: 'volume_up',
  waste_overflow: 'delete',
  damaged_infrastructure: 'build',
  illegal_construction: 'architecture',
  vandalism: 'warning',
  abandoned_vehicle: 'car_crash',
  public_safety: 'security',
  other: 'help'
};

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ data }) => {
  const sortedCategories = (Object.keys(data) as IssueCategory[]).sort((a, b) => data[b] - data[a]);

  return (
    <div className="category-breakdown-card">
      <h3 className="chart-title">By Category</h3>
      <div className="category-list">
        {sortedCategories.map((cat) => (
          <div key={cat} className="category-item">
            <div className="category-info">
              <span className="material-symbols-outlined cat-icon">
                {CATEGORY_ICONS[cat] || 'help'}
              </span>
              <span className="cat-name">{cat.replace(/_/g, ' ')}</span>
            </div>
            <span className="cat-count">{data[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
