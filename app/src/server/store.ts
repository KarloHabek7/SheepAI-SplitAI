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
    },
    // --- New Reports for Pitch ---
    {
      id: uuidv4(),
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
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1017',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1596431792973-774f4b23829f?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5082, lng: 16.4395, address: 'Old Town, Dominisova ul.' },
      classification: {
        category: 'waste_overflow',
        severity: 8,
        zone: 'zona_a',
        department: 'cistoca',
        description: 'Garbage bags piled up in a narrow alleyway.',
        suggestedAction: 'Manual pickup required due to vehicle access limits.',
        confidence: 0.97
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1018',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5088, lng: 16.4358, address: 'Marmontova ul.' },
      classification: {
        category: 'vandalism',
        severity: 5,
        zone: 'zona_a',
        department: 'komunalni_redari',
        description: 'Sticker bombing and small tags on public benches.',
        suggestedAction: 'Cleaning and surface restoration.',
        confidence: 0.89
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1019',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1579441113917-8490a6f87d3a?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5075, lng: 16.4335, address: 'Matejuška' },
      classification: {
        category: 'noise_complaint',
        severity: 7,
        zone: 'zona_a',
        department: 'komunalni_redari',
        description: 'Large group with portable speaker after midnight.',
        suggestedAction: 'Warning and dispersal.',
        confidence: 0.91
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1020',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1611097551399-c8c7603c4f2e?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5112, lng: 16.4421, address: 'Zvonimirova ul.' },
      classification: {
        category: 'damaged_infrastructure',
        severity: 6,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Traffic signal at intersection partially non-functional.',
        suggestedAction: 'Technician dispatch for relay check.',
        confidence: 0.95
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1021',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5185, lng: 16.4562, address: 'Pujanke, Gotovčeva ul.' },
      classification: {
        category: 'abandoned_vehicle',
        severity: 5,
        zone: 'zona_c',
        department: 'promet',
        description: 'Old vehicle with broken windows occupying parking space.',
        suggestedAction: 'Issue tow notice.',
        confidence: 0.98
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1022',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1541888941259-79974dfb9602?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5095, lng: 16.4285, address: 'Marjan, Forest Trail 2' },
      classification: {
        category: 'waste_overflow',
        severity: 7,
        zone: 'marjan_park',
        department: 'zastita_okolisa',
        description: 'Illegal dumping of construction debris in protected forest.',
        suggestedAction: 'Immediate removal and camera check.',
        confidence: 0.96
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1023',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5035, lng: 16.4521, address: 'Firule Beach' },
      classification: {
        category: 'public_safety',
        severity: 4,
        zone: 'zona_b',
        department: 'policija',
        description: 'Stray dogs acting aggressively near the promenade.',
        suggestedAction: 'Animal control patrol.',
        confidence: 0.88
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1024',
      status: 'resolved',
      createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5215, lng: 16.4632, address: 'Mejaši, Vukovarska ul.' },
      classification: {
        category: 'pothole',
        severity: 8,
        zone: 'zona_c',
        department: 'promet',
        description: 'Large pothole on a major transit route.',
        suggestedAction: 'Full resurfacing.',
        confidence: 0.93
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1025',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1579441113917-8490a6f87d3a?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5065, lng: 16.4325, address: 'Riva Promenade' },
      classification: {
        category: 'waste_overflow',
        severity: 9,
        zone: 'zona_a',
        department: 'cistoca',
        description: 'Public bins completely full during tourist peak hour.',
        suggestedAction: 'Emergency emptying.',
        confidence: 0.99
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1026',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5125, lng: 16.4255, address: 'Spinut, Marjanska ul.' },
      classification: {
        category: 'illegal_parking',
        severity: 6,
        zone: 'zona_c',
        department: 'promet',
        description: 'Cars parked in Marjan forest entrance zone.',
        suggestedAction: 'Tow away.',
        confidence: 0.94
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1027',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5152, lng: 16.4425, address: 'Gripe, Glagoljaška ul.' },
      classification: {
        category: 'damaged_infrastructure',
        severity: 5,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Damaged stone stairs leading to Gripe fortress.',
        suggestedAction: 'Stone masonry repair.',
        confidence: 0.92
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1028',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1605600611284-19561ad7ddf0?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5225, lng: 16.4715, address: 'Žnjan, Put Žnjana' },
      classification: {
        category: 'waste_overflow',
        severity: 7,
        zone: 'zona_c',
        department: 'cistoca',
        description: 'Container for plastic waste overflowing onto road.',
        suggestedAction: 'Schedule extra pickup.',
        confidence: 0.96
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1029',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5085, lng: 16.4382, address: 'Diocletian\'s Palace, Peristil North' },
      classification: {
        category: 'graffiti',
        severity: 10,
        zone: 'unesco_core',
        department: 'komunalni_redari',
        description: 'Fresh graffiti on UNESCO protected stone column.',
        suggestedAction: 'Urgent expert restoration.',
        confidence: 0.99
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1030',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 0.2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 0.2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1495556650867-99590cea3657?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5078, lng: 16.4375, address: 'Old Town, Pjaca' },
      classification: {
        category: 'noise_complaint',
        severity: 8,
        zone: 'zona_a',
        department: 'komunalni_redari',
        description: 'Illegal street performer with loud PA system.',
        suggestedAction: 'Confiscate equipment and fine.',
        confidence: 0.93
      }
    }
  ];

  mockReports.forEach(r => store.addReport(r));

  // Add more diversity to neighborhoods
  const neighborReports: CivicReport[] = [
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1031',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      imageUrl: '',
      location: { lat: 43.5255, lng: 16.4821, address: 'Stobreč, Put Svetog Lovre' },
      classification: {
        category: 'pothole',
        severity: 4,
        zone: 'zona_d',
        department: 'promet',
        description: 'Small pothole forming near the entrance to the camp.',
        suggestedAction: 'Cold patch repair.',
        confidence: 0.87
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1032',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 15).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 15).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1541888941259-79974dfb9602?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5185, lng: 16.4185, address: 'Spinut, Lučica' },
      classification: {
        category: 'abandoned_vehicle',
        severity: 3,
        zone: 'zona_c',
        department: 'promet',
        description: 'Abandoned boat trailer blocking bike path.',
        suggestedAction: 'Remove to impound lot.',
        confidence: 0.94
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1033',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5115, lng: 16.4485, address: 'Bačvice, Pojišanska ul.' },
      classification: {
        category: 'damaged_infrastructure',
        severity: 4,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Damaged street sign at intersection.',
        suggestedAction: 'Replace sign post.',
        confidence: 0.91
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1034',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5285, lng: 16.4521, address: 'Brda, Hercegovačka ul.' },
      classification: {
        category: 'illegal_parking',
        severity: 5,
        zone: 'zona_c',
        department: 'promet',
        description: 'Heavy truck parked overnight in residential zone.',
        suggestedAction: 'Issue penalty.',
        confidence: 0.96
      }
    },
    {
      id: uuidv4(),
      ticketId: 'GR-2026-1035',
      status: 'submitted',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?q=80&w=2070&auto=format&fit=crop',
      location: { lat: 43.5155, lng: 16.4385, address: 'Bol, Vukovarska ul.' },
      classification: {
        category: 'vandalism',
        severity: 6,
        zone: 'zona_b',
        department: 'komunalni_redari',
        description: 'Smashed glass at bus stop shelter.',
        suggestedAction: 'Replace tempered glass panels.',
        confidence: 0.97
      }
    }
  ];

  neighborReports.forEach(r => store.addReport(r));
  console.log(`✅ Seeded ${mockReports.length + neighborReports.length} reports.`);
};

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
      vendor: 'OPG Vrgorac',
      items: [{ name: 'Jagode', category: 'fruit', price: 4, unit: '€/mjera' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Neretva',
      items: [{ name: 'Mandarine', category: 'fruit', price: 2.5, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Baka Marija',
      items: [{ name: 'Lavanda', category: 'herbs', price: 5, unit: '€/vrećica' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Mesnica Škokić',
      items: [{ name: 'Pršut', category: 'meat', price: 35, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Med',
      items: [{ name: 'Dalmatinski med', category: 'other', price: 15, unit: '€/jar' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Peškarija Ante',
      items: [{ name: 'Srdele', category: 'fish', price: 6, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'OPG Brač',
      items: [{ name: 'Kozji sir', category: 'cheese', price: 22, unit: '€/kg' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Dalmatia Spice',
      items: [{ name: 'Ružmarin', category: 'herbs', price: 2, unit: '€/bunch' }],
      freshness,
      isActive: true,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + FOUR_HOURS).toISOString()
    },
    {
      id: uuidv4(),
      vendor: 'Pčelar Split',
      items: [{ name: 'Propolis', category: 'other', price: 8, unit: '€/bottle' }],
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
