import { CivicReport, ChatMessage, PazarListing } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

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

  // --- Listing Helpers ---
  addListing(listing: PazarListing) {
    this.listings.push(listing);
  }

  getAllListings() {
    return this.listings;
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
  console.log(`✅ Seeded ${mockReports.length} reports.`);
};
