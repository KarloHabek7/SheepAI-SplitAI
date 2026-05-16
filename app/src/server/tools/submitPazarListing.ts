import { v4 as uuidv4 } from 'uuid';
import { store } from '../store.js';
import { 
  PazarListing, 
  PazarItem, 
  ProduceCategory 
} from '../../types/index.js';

/**
 * Tool handler for 'submit_pazar_listing'.
 * Creates a new Pazar market listing in the in-memory store.
 * 
 * @param args - { vendor, items, prices, imageUrl }
 * @returns Promise<Record<string, unknown>>
 */
export async function submitPazarListing(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  try {
    const { 
      vendor, 
      items, 
      prices, 
      imageUrl 
    } = args;

    // 1. Validation
    if (!vendor || typeof vendor !== 'string') {
      return { error: "Missing required argument: 'vendor' (string)." };
    }
    if (!items || !Array.isArray(items)) {
      return { error: "Missing required argument: 'items' (string array)." };
    }

    // 2. Build Items Array
    const pazarItems: PazarItem[] = items.map((name, index) => {
      const price = Array.isArray(prices) ? Number(prices[index]) || 2.5 : 2.5;
      return {
        name: name as string,
        category: 'other' as ProduceCategory, // Simplified for mock tool
        price,
        unit: '€/kg',
        quantity: 'abundant'
      };
    });

    // 3. Derive Freshness
    const hour = new Date().getHours();
    let freshness: 'morning' | 'midday' | 'afternoon' = 'morning';
    if (hour >= 10 && hour < 14) freshness = 'midday';
    else if (hour >= 14) freshness = 'afternoon';

    // 4. Build Listing
    const expiresAt = new Date(Date.now() + 4 * 3600000).toISOString();
    const newListing: PazarListing = {
      id: uuidv4(),
      vendor: vendor,
      items: pazarItems,
      imageUrl: (imageUrl as string) || '',
      freshness,
      createdAt: new Date().toISOString(),
      expiresAt,
      isActive: true
    };

    // 5. Store
    store.addListing(newListing);

    return {
      listingId: newListing.id,
      expiresAt,
      itemCount: pazarItems.length
    };
  } catch (error: any) {
    return { error: `Failed to submit pazar listing: ${error.message}` };
  }
}
