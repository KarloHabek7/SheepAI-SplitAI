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
    <div className="pazar-grid-wrapper">
      {/* Background Gradient Effect (Optional based on Aura) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
      </div>
      
      <div className="pazar-grid-inner">
        <div className="pazar-grid-header">
          <h2 className="pazar-grid-title">Live Market Listings</h2>
          
          <div className="pazar-filter-bar">
            <div className="pazar-search">
              <span className="material-symbols-outlined search-icon">search</span>
              <input 
                type="text" 
                placeholder="Search vendor or product..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="pazar-categories">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.value}
                  className={`category-chip ${activeCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.value as ProduceCategory | 'all')}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pazar-grid-layout">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <ProductCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="pazar-empty-state">
              <span className="material-symbols-outlined empty-icon">shopping_basket</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PazarGrid;
