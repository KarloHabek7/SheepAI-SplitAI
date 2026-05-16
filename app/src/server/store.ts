import { 
  CivicReport, 
  ChatMessage, 
  PazarListing, 
  ReportStatus, 
  IssueCategory, 
  SeverityLevel, 
  MapBoundingBox 
} from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Filter options for civic reports.
 */
interface ReportFilters {
  bbox?: MapBoundingBox;
  status?: ReportStatus;
  category?: IssueCategory;
  severity?: SeverityLevel;
}

/**
 * Centralized In-Memory Data Store for the SplitAI Hackathon Demo.
 * This replaces a real database to allow fast iteration.
 */
class DataStore {
  reports: CivicReport[] = [];
  listings: PazarListing[] = [];
  conversations: Map<string, ChatMessage[]> = new Map();

  constructor() {
    console.log('📦 DataStore initialized');
  }

  // --- Report Helpers ---
  addReport(report: CivicReport) {
    this.reports.push(report);
  }

  getAllReports() {
    return this.reports;
  }

  getReportById(id: string) {
    return this.reports.find(r => r.id === id);
  }

  /**
   * Filter reports based on various criteria (spatial, status, category, severity).
   */
  filterReports(filters: ReportFilters) {
    let filtered = [...this.reports];

    // Filter by bounding box (spatial)
    if (filters.bbox) {
      const { north, south, east, west } = filters.bbox;
      filtered = filtered.filter(r => {
        if (!r.location) return false;
        return (
          r.location.lat >= south &&
          r.location.lat <= north &&
          r.location.lng >= west &&
          r.location.lng <= east
        );
      });
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(r => r.classification.category === filters.category);
    }

    // Filter by minimum severity
    if (filters.severity) {
      filtered = filtered.filter(r => r.classification.severity >= (filters.severity as number));
    }

    return filtered;
  }

  /**
   * Update an existing report with partial data.
   */
  updateReport(id: string, updates: Partial<Pick<CivicReport, 'status' | 'assignedTo'>>) {
    const report = this.getReportById(id);
    if (!report) return undefined;

    Object.assign(report, updates);
    report.updatedAt = new Date().toISOString();
    return report;
  }

  // --- Listing Helpers ---
  addListing(listing: PazarListing) {
    this.listings.push(listing);
  }

  getAllListings() {
    return this.listings;
  }

  /**
   * Get listings that are both active and not yet expired.
   */
  getActiveListings() {
    const now = new Date();
    return this.listings.filter(l => 
      l.isActive && new Date(l.expiresAt) > now
    );
  }

  // --- Chat Helpers ---
  getConversation(id: string) {
    return this.conversations.get(id) || [];
  }

  appendMessage(id: string, message: ChatMessage) {
    if (!this.conversations.has(id)) {
      this.conversations.set(id, []);
    }
    this.conversations.get(id)!.push(message);
  }

  /**
   * Clear a conversation by its ID.
   */
  clearConversation(id: string) {
    this.conversations.delete(id);
  }
}

export const store = new DataStore();

/**
 * Seed the store with realistic demo data for the City of Split.
 */
export const seedReports = () => {
  console.log('🌱 Seeding demo reports for Split...');
  
  const mockReports: CivicReport[] = [
    {
      id: uuidv4(),
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
      id: uuidv4(),
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
      id: uuidv4(),
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
      id: uuidv4(),
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
      id: uuidv4(),
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
    }
  ];

  mockReports.forEach(r => store.addReport(r));

  // Add 10 more reports for remaining neighborhoods
  const extraReports: CivicReport[] = [
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1006',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5011, lng: 16.4532, address: 'Firule, Spinčićeva ul.' },
      classification: {
        category: 'pothole',
        severity: 5,
        zone: 'zona_b',
        department: 'promet',
        description: 'Pothole near the hospital entrance.',
        suggestedAction: 'Fill with cold mix asphalt.',
        confidence: 0.91
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1007',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5142, lng: 16.4455, address: 'Gripe, Ul. slobode' },
      classification: {
        category: 'waste_overflow',
        severity: 8,
        zone: 'zona_b',
        department: 'cistoca',
        description: 'Recycling containers overflowing with cardboard.',
        suggestedAction: 'Schedule extra pickup.',
        confidence: 0.97
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1008',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5115, lng: 16.4322, address: 'Lovret, Gundulićeva ul.' },
      classification: {
        category: 'illegal_parking',
        severity: 4,
        zone: 'zona_a',
        department: 'promet',
        description: 'Delivery truck parked on the sidewalk.',
        suggestedAction: 'Issue fine.',
        confidence: 0.94
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1009',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5098, lng: 16.4451, address: 'Lučac, Ul. kralja Zvonimira' },
      classification: {
        category: 'damaged_infrastructure',
        severity: 6,
        zone: 'zona_a',
        department: 'komunalni_redari',
        description: 'Broken handrail on public stairs.',
        suggestedAction: 'Weld and repaint.',
        confidence: 0.89
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1010',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5085, lng: 16.4348, address: 'Varoš, Križeva ul.' },
      classification: {
        category: 'vandalism',
        severity: 7,
        zone: 'zona_a',
        department: 'komunalni_redari',
        description: 'Smashed public lighting fixture.',
        suggestedAction: 'Replace glass and bulb.',
        confidence: 0.93
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1011',
      status: 'resolved',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      imageUrl: '',
      location: { lat: 43.5021, lng: 16.4481, address: 'Bačvice, Preradovićevo šetalište' },
      classification: {
        category: 'noise_complaint',
        severity: 3,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Loud music from a temporary stall.',
        suggestedAction: 'Warn owner and check permit.',
        confidence: 0.85
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1012',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1541888941259-79974dfb9602?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5088, lng: 16.4405, address: 'Diocletian\'s Palace, Ul. Dominisova' },
      classification: {
        category: 'illegal_construction',
        severity: 9,
        zone: 'unesco_core',
        department: 'urbanizam',
        description: 'New window opening in a protected wall without permit.',
        suggestedAction: 'Stop works and restore stone.',
        confidence: 0.98
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1013',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1506197357523-6447817b53e3?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5158, lng: 16.4265, address: 'Spinut, Ul. sedam Kaštela' },
      classification: {
        category: 'abandoned_vehicle',
        severity: 4,
        zone: 'zona_c',
        department: 'promet',
        description: 'Rusty car with no plates blocking parking.',
        suggestedAction: 'Attach warning, tow if not moved.',
        confidence: 0.96
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1014',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5125, lng: 16.4405, address: 'Manuš, Vukovarska ul.' },
      classification: {
        category: 'public_safety',
        severity: 8,
        zone: 'zona_b',
        department: 'policija',
        description: 'Aggressive behavior in the park area.',
        suggestedAction: 'Dispatch patrol.',
        confidence: 0.90
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1015',
      status: 'resolved',
      createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      imageUrl: '',
      location: { lat: 43.5015, lng: 16.4535, address: 'Firule, Put Firula' },
      classification: {
        category: 'graffiti',
        severity: 3,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Small tags on a utility box.',
        suggestedAction: 'Paint over with gray paint.',
        confidence: 0.88
      }
    }
  ];

  extraReports.forEach(r => store.addReport(r));
  console.log(`✅ Seeded ${mockReports.length + extraReports.length} reports.`);
};

/**
 * Seed the store with realistic Pazar (Green Market) listings.
 */
export const seedPazarListings = () => {
  console.log('🌱 Seeding Pazar listings...');
  const now = Date.now();
  const FOUR_HOURS = 4 * 60 * 60 * 1000;
  const currentHour = new Date().getHours();
  const freshness: 'morning' | 'midday' | 'afternoon' = 
    currentHour < 10 ? 'morning' : currentHour < 14 ? 'midday' : 'afternoon';

  const mockListings: PazarListing[] = [
    {
      id: uuidv4(),
      vendor: 'Ribarna Matejuška',
      items: [{ name: 'Brancin', category: 'fish', price: 18, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Ribarna Matejuška',
      items: [{ name: 'Škampi', category: 'fish', price: 25, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Kaštela',
      items: [{ name: 'Blitva', category: 'vegetable', price: 2.5, unit: '€/bunch' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Uljara Brač',
      items: [{ name: 'Maslinovo ulje', category: 'olive_oil', price: 12, unit: '€/L' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Mljekara Pag',
      items: [{ name: 'Sir paški', category: 'cheese', price: 30, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Solin',
      items: [{ name: 'Rajčice', category: 'vegetable', price: 3, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Kaštela',
      items: [{ name: 'Tikvice', category: 'vegetable', price: 2, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Voćarna Split',
      items: [{ name: 'Smokve', category: 'fruit', price: 8, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    }
  ];

  mockListings.forEach(l => store.addListing(l));
  console.log(`✅ Seeded ${mockListings.length} Pazar listings.`);
};
