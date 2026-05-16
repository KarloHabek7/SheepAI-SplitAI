import { CrowdInfo } from '../../types/index.js';

/**
 * Mock data for Split crowd levels (Đir Index).
 * Mirrored from app/src/server/routes/crowd.ts
 */
const crowdData: Record<string, CrowdInfo> = {
  diocletians_palace: {
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
  riva: {
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
  bacvice: {
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
  marjan: {
    area: 'marjan',
    crowdLevel: 'low',
    crowdPercentage: 20,
    suggestion: 'Ideal for walking, trails are currently uncrowded.',
    alternateRoutes: [],
    lastUpdated: new Date().toISOString()
  },
  znjan: {
    area: 'znjan',
    crowdLevel: 'low',
    crowdPercentage: 15,
    suggestion: 'Spacious beach area, good for families and groups.',
    alternateRoutes: [],
    lastUpdated: new Date().toISOString()
  }
};

/**
 * Tool handler for 'get_dir_index'.
 * Returns mock crowd level (Đir Index) for a specific area in Split.
 * 
 * @param args - { area: string }
 * @returns Promise<Record<string, unknown>>
 */
export async function getDirIndex(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  const { area } = args;

  if (!area || typeof area !== 'string') {
    return { error: "Missing required argument: 'area' (string)." };
  }

  // Handle both snake_case and kebab-case/hyphenated inputs
  const areaKey = area.toLowerCase().replace(/[\s-]/g, '_');
  const data = crowdData[areaKey];

  if (!data) {
    return { error: `Area '${area}' not found in the Đir Index system. Available areas: ${Object.keys(crowdData).join(', ')}` };
  }

  return {
    ...data,
    lastUpdated: new Date().toISOString()
  } as unknown as Record<string, unknown>;
}
