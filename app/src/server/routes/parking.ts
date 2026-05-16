import { Router, Request, Response } from 'express';
import { 
  ParkingInfo, 
  CityZone, 
  APIResponse 
} from '../../types/index.js';

const router = Router();

/**
 * Mock data for Split parking zones and garages
 */
const parkingData: Record<CityZone, ParkingInfo> = {
  zona_a: {
    zone: 'zona_a',
    available: true,
    totalSpots: 450,
    freeSpots: 180,
    pricePerHour: 2.50,
    currency: '€',
    nearestGarage: 'Lora',
    garageDistance: '400m'
  },
  zona_b: {
    zone: 'zona_b',
    available: true,
    totalSpots: 600,
    freeSpots: 360,
    pricePerHour: 1.50,
    currency: '€',
    nearestGarage: 'HNK',
    garageDistance: '250m'
  },
  zona_c: {
    zone: 'zona_c',
    available: true,
    totalSpots: 800,
    freeSpots: 640,
    pricePerHour: 1.00,
    currency: '€'
  },
  zona_d: {
    zone: 'zona_d',
    available: true,
    totalSpots: 1200,
    freeSpots: 1100,
    pricePerHour: 0.50,
    currency: '€'
  },
  unesco_core: {
    zone: 'unesco_core',
    available: false,
    totalSpots: 0,
    freeSpots: 0,
    pricePerHour: 0,
    currency: '€',
    nearestGarage: 'Lora',
    garageDistance: '150m'
  },
  unesco_buffer: {
    zone: 'unesco_buffer',
    available: true,
    totalSpots: 100,
    freeSpots: 5,
    pricePerHour: 3.50,
    currency: '€',
    nearestGarage: 'HNK',
    garageDistance: '300m'
  },
  marjan_park: {
    zone: 'marjan_park',
    available: true,
    totalSpots: 50,
    freeSpots: 45,
    pricePerHour: 0,
    currency: '€'
  },
  port_area: {
    zone: 'port_area',
    available: true,
    totalSpots: 300,
    freeSpots: 12,
    pricePerHour: 4.00,
    currency: '€',
    nearestGarage: 'Port Terminal',
    garageDistance: '100m'
  }
};

/**
 * GET /api/parking/:zone
 * Returns mock parking availability for a specific zone
 */
router.get('/:zone', (req: Request, res: Response) => {
  try {
    const { zone } = req.params;
    const data = parkingData[zone as CityZone];

    if (!data) {
      const errorResponse: APIResponse<never> = {
        success: false,
        error: {
          code: 'ZONE_NOT_FOUND',
          message: `Parking zone '${zone}' not found in Split municipal system.`
        },
        timestamp: new Date().toISOString()
      };
      return res.status(404).json(errorResponse);
    }

    const response: APIResponse<ParkingInfo> = {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const errorResponse: APIResponse<never> = {
      success: false,
      error: {
        code: 'PARKING_FETCH_FAILED',
        message: 'An unexpected error occurred while fetching parking data.'
      },
      timestamp: new Date().toISOString()
    };
    res.status(500).json(errorResponse);
  }
});

export default router;
