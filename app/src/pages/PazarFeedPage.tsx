import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PazarGrid from '@/components/pazar/PazarGrid';
import { PazarListing } from '@/types';
import './PazarFeedPage.css';

const MOCK_LISTINGS: PazarListing[] = [
  {
    id: '1',
    vendor: 'OPG Marić',
    freshness: 'morning',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    isActive: true,
    items: [
      { name: 'Brancin (divlji)', category: 'fish', price: 28, unit: 'kg' },
      { name: 'Orada', category: 'fish', price: 22, unit: 'kg' },
      { name: 'Trlja', category: 'fish', price: 12, unit: 'kg' }
    ]
  },
  {
    id: '2',
    vendor: 'Obrt Zeleno',
    freshness: 'morning',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    isActive: true,
    items: [
      { name: 'Blitva', category: 'vegetable', price: 2.5, unit: 'bunch' },
      { name: 'Mladi luk', category: 'vegetable', price: 1.5, unit: 'bunch' },
      { name: 'Krumpir (mladi)', category: 'vegetable', price: 1.8, unit: 'kg' }
    ]
  },
  {
    id: '3',
    vendor: 'Domaće Masline',
    freshness: 'midday',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
    isActive: true,
    items: [
      { name: 'Maslinovo ulje (extra djevičansko)', category: 'olive_oil', price: 15, unit: 'liter' },
      { name: 'Crne masline', category: 'olive_oil', price: 10, unit: 'kg' }
    ]
  },
  {
    id: '4',
    vendor: 'Sir & Pršut Brač',
    freshness: 'afternoon',
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
    isActive: true,
    items: [
      { name: 'Paški sir', category: 'cheese', price: 35, unit: 'kg' },
      { name: 'Pršut (narezani)', category: 'meat', price: 45, unit: 'kg' }
    ]
  },
  {
    id: '5',
    vendor: 'Jagode Vrgorac',
    freshness: 'morning',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 3600000).toISOString(),
    isActive: true,
    items: [
      { name: 'Jagode (mjerica)', category: 'fruit', price: 4, unit: 'measure' },
      { name: 'Trešnje', category: 'fruit', price: 8, unit: 'kg' }
    ]
  }
];

const PazarFeedPage: React.FC = () => {
  return (
    <div className="pazar-feed-page">
      <div className="page-header-bg">
        <PageContainer>
          <div className="hero-section">
            <h1 className="hero-title">Daily Pazar Feed</h1>
            <p className="hero-subtitle">Real-time prices from Split's central market. Fresh from the source.</p>
          </div>
        </PageContainer>
      </div>
      
      <PageContainer>
        <PazarGrid listings={MOCK_LISTINGS} />
      </PageContainer>
    </div>
  );
};

export default PazarFeedPage;
