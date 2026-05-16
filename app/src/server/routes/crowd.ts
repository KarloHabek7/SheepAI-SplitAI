import { Router, Request, Response } from 'express';
import { 
  CrowdInfo, 
  APIResponse 
} from '../../types/index.js';

const router = Router();

/**
 * Mock data for Split crowd levels (Đir Index)
 */
const crowdData: Record<string, CrowdInfo> = {
  'diocletians_palace': {
    area: 'diocletians_palace',
    crowdLevel: 'very_high',
    crowdPercentage: 85,
    suggestion: 'Visit Marjan park instead to avoid heavy tourist traffic.',
    alternateRoutes: [
      { name: 'Marjan Park', crowdLevel: 'low', estimatedWalkMinutes: 15, description: 'Quiet forest trails with panoramic views.' },
      { name: 'Bačvice Beach', crowdLevel: 'moderate', estimatedWalkMinutes: 10, description: 'Popular sandy beach, currently less crowded than the center.' }
    ],
    lastUpdated: new Date().toISOString()
  },
  'riva': {
    area: 'riva',
    crowdLevel: 'high',
    crowdPercentage: 70,
    suggestion: 'Try the west end near ACI marina for a more peaceful walk.',
    alternateRoutes: [
      { name: 'ACI Marina', crowdLevel: 'low', estimatedWalkMinutes: 8, description: 'Modern marina with several quiet cafes.' },
      { name: 'Matejuška', crowdLevel: 'low', estimatedWalkMinutes: 5, description: 'Traditional fishing port area, great for sunset.' }
    ],
    lastUpdated: new Date().toISOString()
  },
  'bacvice': {
    area: 'bacvice',
    crowdLevel: 'moderate',
    crowdPercentage: 45,
    suggestion: 'Best time is early morning if you want a prime spot.',
    alternateRoutes: [
      { name: 'Trstenik Beach', crowdLevel: 'low', estimatedWalkMinutes: 12, description: 'Pebble beach with crystal clear water.' },
      { name: 'Žnjan Beach', crowdLevel: 'low', estimatedWalkMinutes: 20, description: 'Large plateau with multiple beach bars and space.' }
    ],
    lastUpdated: new Date().toISOString()
  },
  'marjan': {
    area: 'marjan',
    crowdLevel: 'low',
    crowdPercentage: 20,
    suggestion: 'Ideal for walking, trails are currently uncrowded.',
    alternateRoutes: [],
    lastUpdated: new Date().toISOString()
  },
  'znjan': {
    area: 'znjan',
    crowdLevel: 'low',
    crowdPercentage: 15,
    suggestion: 'Spacious beach area, good for families and groups.',
    alternateRoutes: [],
    lastUpdated: new Date().toISOString()
  }
};

/**
 * GET /api/crowd/:area
 * Returns mock crowd level (Đir Index) for a specific area
 */
router.get('/:area', (req: Request, res: Response) => {
  try {
    const area = req.params.area as string;
    const data = crowdData[area];

    if (!data) {
      const errorResponse: APIResponse<never> = {
        success: false,
        error: {
          code: 'AREA_NOT_FOUND',
          message: `Area '${area}' not found in the Đir Index system.`
        },
        timestamp: new Date().toISOString()
      };
      return res.status(404).json(errorResponse);
    }

    // Update timestamp for realism
    const response: APIResponse<CrowdInfo> = {
      success: true,
      data: {
        ...data,
        lastUpdated: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const errorResponse: APIResponse<never> = {
      success: false,
      error: {
        code: 'CROWD_FETCH_FAILED',
        message: 'An unexpected error occurred while fetching crowd data.'
      },
      timestamp: new Date().toISOString()
    };
    res.status(500).json(errorResponse);
  }
});

export default router;
