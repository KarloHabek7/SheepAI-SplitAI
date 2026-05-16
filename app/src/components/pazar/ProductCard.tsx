import React from 'react';
import { PazarListing } from '@/types';
import FreshnessIndicator from './FreshnessIndicator';
import './ProductCard.css';

import imgFruit from '@/assets/images/pazar_fruit.png';

interface ProductCardProps {
  listing: PazarListing;
}

const ProductCard: React.FC<ProductCardProps> = ({ listing }) => {
  const fallbackImg = imgFruit;
  
  return (
    <div className="product-card">
      <div className="product-card-bg">
        <img src={listing.imageUrl || fallbackImg} alt={listing.vendor} />
        <div className="product-card-overlay"></div>
      </div>
      
      <div className="product-card-content">
        <div className="product-card-header">
          <FreshnessIndicator freshness={listing.freshness} />
        </div>
        
        <div className="product-card-middle">
          <h3 className="vendor-name">{listing.vendor}</h3>
          <ul className="product-items-list">
            {listing.items.slice(0, 3).map((item, index) => (
              <li key={index} className="product-item-row">
                <span className="product-item-name">{item.name}</span>
                <span className="product-item-price">{item.price.toFixed(2)}€ /{item.unit}</span>
              </li>
            ))}
            {listing.items.length > 3 && (
              <li className="product-item-row" style={{ background: 'transparent', border: 'none' }}>
                <span className="product-item-name" style={{ opacity: 0.7 }}>+ {listing.items.length - 3} more items</span>
              </li>
            )}
          </ul>
        </div>
        
        <div className="product-card-footer">
          <span className="product-timestamp">
            {new Date(listing.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button className="view-stall-btn">
            View Stall
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
