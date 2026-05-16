import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../store.js';
import {
  APIResponse,
  PazarAnalyzeRequest,
  PazarAnalyzeResponse,
  PazarSubmitRequest,
  PazarSubmitResponse,
  PazarListing,
  PazarListingClassification,
  PazarItem,
  ProduceCategory,
} from '../../types/index.js';

const pazarRouter = Router();

/**
 * Determine Pazar freshness tier based on current hour.
 */
function getFreshness(): 'morning' | 'midday' | 'afternoon' {
  const hour = new Date().getHours();
  if (hour < 10) return 'morning';
  if (hour < 14) return 'midday';
  return 'afternoon';
}

/**
 * Mark expired listings as inactive and return all listings.
 * Side-effect: mutates isActive on expired items in-place.
 */
function sweepExpired(): PazarListing[] {
  const now = new Date();
  const listings = store.getAllListings();
  listings.forEach((l) => {
    if (l.isActive && new Date(l.expiresAt) <= now) {
      l.isActive = false;
    }
  });
  return listings;
}

// ---------------------------------------------------------------------------
// POST /api/pazar/analyze
// Returns a mock Dalmatian produce classification for a vendor stall photo.
// ---------------------------------------------------------------------------
pazarRouter.post('/analyze', (req: Request, res: Response) => {
  void (req.body as PazarAnalyzeRequest); // image accepted but classification is mocked

  // image is expected but we mock the classification regardless
  const freshness = getFreshness();

  const classification: PazarListingClassification = {
    freshness,
    confidence: 0.94,
    items: (
      [
        { name: 'Brancin',        category: 'fish'      as ProduceCategory, price: 18,   unit: '€/kg',    quantity: 'limited' },
        { name: 'Škampi',         category: 'fish'      as ProduceCategory, price: 25,   unit: '€/kg',    quantity: 'abundant' },
        { name: 'Blitva',         category: 'vegetable' as ProduceCategory, price: 2.5,  unit: '€/bunch', quantity: 'abundant' },
        { name: 'Rajčice',        category: 'vegetable' as ProduceCategory, price: 3,    unit: '€/kg',    quantity: 'abundant' },
        { name: 'Sir paški',      category: 'cheese'    as ProduceCategory, price: 30,   unit: '€/kg',    quantity: 'limited' },
        { name: 'Maslinovo ulje', category: 'olive_oil' as ProduceCategory, price: 12,   unit: '€/L',     quantity: 'limited' },
        { name: 'Smokve',         category: 'fruit'     as ProduceCategory, price: 8,    unit: '€/kg',    quantity: 'abundant' },
      ] as PazarItem[]
    ).sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3)),
  };

  const response: APIResponse<PazarAnalyzeResponse> = {
    success: true,
    data: { classification },
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
});

// ---------------------------------------------------------------------------
// POST /api/pazar/submit
// Creates a new Pazar listing with a 4-hour expiry window.
// ---------------------------------------------------------------------------
pazarRouter.post('/submit', (req: Request, res: Response) => {
  const body = req.body as PazarSubmitRequest;

  if (!body.vendor || !body.classification) {
    const response: APIResponse<never> = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request must include `vendor` and `classification` fields.',
      },
      timestamp: new Date().toISOString(),
    };
    res.status(400).json(response);
    return;
  }

  const now = Date.now();
  const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
  const listingId = `PZ-${uuidv4().slice(0, 4).toUpperCase()}`;

  const listing: PazarListing = {
    id: uuidv4(),
    vendor: body.vendor,
    items: body.classification.items,
    imageUrl: body.imageUrl,
    freshness: body.classification.freshness,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + FOUR_HOURS_MS).toISOString(),
    isActive: true,
  };

  store.addListing(listing);

  const response: APIResponse<PazarSubmitResponse> = {
    success: true,
    data: {
      listingId,
      expiresAt: listing.expiresAt,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(201).json(response);
});

// ---------------------------------------------------------------------------
// GET /api/pazar/feed
// Returns Pazar listings. Sweeps expired ones first.
// Query params:
//   ?active=true  — return only active (non-expired) listings
// ---------------------------------------------------------------------------
pazarRouter.get('/feed', (req: Request, res: Response) => {
  const activeOnly = req.query.active === 'true';

  // Sweep and update isActive flags
  let listings = sweepExpired();

  if (activeOnly) {
    listings = listings.filter((l) => l.isActive);
  }

  // Sort by createdAt descending (freshest first)
  listings = [...listings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const response: APIResponse<PazarListing[]> = {
    success: true,
    data: listings,
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
});

export default pazarRouter;
