import React from 'react';
import { PazarListing } from '@/types';
import FreshnessIndicator from './FreshnessIndicator';
import './ProductCard.css';

interface ProductCardProps {
  listing: PazarListing;
}

const ProductCard: React.FC<ProductCardProps> = ({ listing }) => {
  return (
    <div className="product-card">
      {listing.imageUrl && (
        <div className="card-image">
          <img src={listing.imageUrl} alt={listing.vendor} />
        </div>
      )}
      <div className="card-content">
        <div className="card-header">
          <h3 className="vendor-name">{listing.vendor}</h3>
          <FreshnessIndicator freshness={listing.freshness} />
        </div>
        
        <ul className="items-list">
          {listing.items.map((item, index) => (
            <li key={index} className="product-item">
              <span className="item-name">{item.name}</span>
              <div className="item-price-row">
                <span className="item-price">{item.price.toFixed(2)}€</span>
                <span className="item-unit">/{item.unit}</span>
                {item.quantity && <span className="item-qty">({item.quantity})</span>}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="card-footer">
          <span className="timestamp">
            {new Date(listing.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button className="view-details-btn">View Stall</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
