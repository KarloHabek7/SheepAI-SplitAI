import { Router, Request, Response } from 'express';
import { 
  TransitInfo, 
  APIResponse 
} from '../../types/index.js';

const router = Router();

/**
 * Mock data for Split Promet bus lines
 */
const transitData: Record<string, TransitInfo> = {
  '2': {
    lineNumber: '2',
    stopName: 'Sukoišan',
    eta: 8,
    nextBuses: [
      { lineNumber: '2', destination: 'Žnjan', arrivalMinutes: 8, isDelayed: false },
      { lineNumber: '2', destination: 'Žnjan', arrivalMinutes: 23, isDelayed: true }
    ],
    alerts: ['Roadworks near Poljička cesta may cause minor delays.']
  },
  '6': {
    lineNumber: '6',
    stopName: 'Trajektna Luka',
    eta: 12,
    nextBuses: [
      { lineNumber: '6', destination: 'Bračka', arrivalMinutes: 12, isDelayed: false },
      { lineNumber: '6', destination: 'Bračka', arrivalMinutes: 27, isDelayed: false }
    ]
  },
  '11': {
    lineNumber: '11',
    stopName: 'Grad',
    eta: 15,
    nextBuses: [
      { lineNumber: '11', destination: 'Stobreč', arrivalMinutes: 15, isDelayed: false },
      { lineNumber: '11', destination: 'Stobreč', arrivalMinutes: 45, isDelayed: false }
    ],
    alerts: ['Reduced frequency due to holiday schedule.']
  },
  '15': {
    lineNumber: '15',
    stopName: 'Trstenik',
    eta: 20,
    nextBuses: [
      { lineNumber: '15', destination: 'Duilovo', arrivalMinutes: 20, isDelayed: true },
      { lineNumber: '15', destination: 'Duilovo', arrivalMinutes: 50, isDelayed: false }
    ]
  }
};

/**
 * GET /api/transit/:line
 * Returns mock transit info for a specific bus line
 */
router.get('/:line', (req: Request, res: Response) => {
  try {
    const line = req.params.line as string;
    const data = transitData[line];

    if (!data) {
      const errorResponse: APIResponse<never> = {
        success: false,
        error: {
          code: 'LINE_NOT_FOUND',
          message: `Bus line '${line}' not found in Promet Split schedule.`
        },
        timestamp: new Date().toISOString()
      };
      return res.status(404).json(errorResponse);
    }

    const response: APIResponse<TransitInfo> = {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    const errorResponse: APIResponse<never> = {
      success: false,
      error: {
        code: 'TRANSIT_FETCH_FAILED',
        message: 'An unexpected error occurred while fetching transit data.'
      },
      timestamp: new Date().toISOString()
    };
    res.status(500).json(errorResponse);
  }
});

export default router;
