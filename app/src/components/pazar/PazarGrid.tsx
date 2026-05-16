import React, { useState } from 'react';
import { PazarListing, ProduceCategory } from '@/types';
import ProductCard from './ProductCard';
import './PazarGrid.css';

interface PazarGridProps {
  listings: PazarListing[];
}

const CATEGORIES: { value: ProduceCategory | 'all', label: string }[] = [
  { value: 'all', label: 'All Produce' },
  { value: 'fish', label: 'Fish' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'vegetable', label: 'Vegetables' },
  { value: 'olive_oil', label: 'Olive Oil' },
  { value: 'cheese', label: 'Cheese' },
  { value: 'meat', label: 'Meat' },
  { value: 'herbs', label: 'Herbs' },
];

const PazarGrid: React.FC<PazarGridProps> = ({ listings }) => {
  const [activeCategory, setActiveCategory] = useState<ProduceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredListings = listings.filter(listing => {
    const matchesCategory = activeCategory === 'all' || 
      listing.items.some(item => item.category === activeCategory);
    
    const matchesSearch = listing.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pazar-grid-container">
      <div className="filter-bar">
        <div className="search-box">
          <span className="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search vendor or product..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-scroll">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.value}
              className={`category-chip ${activeCategory === cat.value ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="listings-grid">
        {filteredListings.length > 0 ? (
          filteredListings.map(listing => (
            <ProductCard key={listing.id} listing={listing} />
          ))
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-icon">shopping_basket</span>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PazarGrid;
