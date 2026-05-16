import { CivicReport, PazarListing } from '@/types';

/**
 * Mock Reports for Split (Synchronized with backend seed data)
 */
export const MOCK_REPORTS: CivicReport[] = [
  {
    id: 'mock-1',
    ticketId: 'GR-2026-1001',
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5081, lng: 16.4342, address: 'Varoš, Senjska ul.' },
    classification: {
      category: 'graffiti',
      severity: 4,
      zone: 'zona_a',
      department: 'komunalni_redari',
      description: 'Large graffiti on a historical stone wall.',
      suggestedAction: 'Clean with specialized solvent for stone.',
      confidence: 0.95
    }
  },
  {
    id: 'mock-2',
    ticketId: 'GR-2026-1002',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5025, lng: 16.4485, address: 'Bačvice, Šetalište Petra Preradovića' },
    classification: {
      category: 'waste_overflow',
      severity: 7,
      zone: 'zona_b',
      department: 'cistoca',
      description: 'Trash cans overflowing near the beach entrance.',
      suggestedAction: 'Emergency pickup required.',
      confidence: 0.98
    }
  },
  {
    id: 'mock-3',
    ticketId: 'GR-2026-1003',
    status: 'resolved',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5122, lng: 16.4401, address: 'Manuš, Mažuranićevo šetalište' },
    classification: {
      category: 'pothole',
      severity: 6,
      zone: 'zona_b',
      department: 'promet',
      description: 'Deep pothole in the middle of the road.',
      suggestedAction: 'Asphalt patching.',
      confidence: 0.92
    }
  },
  {
    id: 'mock-4',
    ticketId: 'GR-2026-1004',
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-f09e5e2289ba?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5154, lng: 16.4262, address: 'Spinut, Matoševa ul.' },
    classification: {
      category: 'illegal_parking',
      severity: 5,
      zone: 'zona_c',
      department: 'promet',
      description: 'Car blocking a wheelchair ramp.',
      suggestedAction: 'Deploy tow truck.',
      confidence: 0.99
    }
  },
  {
    id: 'mock-5',
    ticketId: 'GR-2026-1005',
    status: 'submitted',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5085, lng: 16.4402, address: 'Diocletian\'s Palace, Peristil' },
    classification: {
      category: 'damaged_infrastructure',
      severity: 3,
      zone: 'unesco_core',
      department: 'komunalni_redari',
      description: 'Loose paving stone near the cathedral.',
      suggestedAction: 'Repair stone placement.',
      confidence: 0.88
    }
  },
  {
    id: 'mock-16',
    ticketId: 'GR-2026-1016',
    status: 'submitted',
    createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?q=80&w=2070&auto=format&fit=crop',
    location: { lat: 43.5072, lng: 16.4385, address: 'Diocletian\'s Palace, Vestibul' },
    classification: {
      category: 'noise_complaint',
      severity: 9,
      zone: 'unesco_core',
      department: 'komunalni_redari',
      description: 'Unauthorized amplified music from a nearby balcony.',
      suggestedAction: 'Dispatch redari for fine issuance.',
      confidence: 0.94
    }
  }
];

/**
 * Mock Pazar Listings for Split
 */
export const MOCK_LISTINGS: PazarListing[] = [
  {
    id: 'pazar-1',
    vendor: 'Ribarna Matejuška',
    items: [{ name: 'Brancin', category: 'fish', price: 18, unit: '€/kg' }],
    freshness: 'midday',
    isActive: true,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'pazar-2',
    vendor: 'OPG Kaštela',
    items: [{ name: 'Blitva', category: 'vegetable', price: 2.5, unit: '€/bunch' }],
    freshness: 'morning',
    isActive: true,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'pazar-3',
    vendor: 'Uljara Brač',
    items: [{ name: 'Maslinovo ulje', category: 'olive_oil', price: 12, unit: '€/L' }],
    freshness: 'midday',
    isActive: true,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2070&auto=format&fit=crop'
  }
];
