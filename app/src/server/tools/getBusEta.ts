import { TransitInfo } from '../../types/index.js';

/**
 * Mock data for Split Promet bus lines.
 * Mirrored from app/src/server/routes/transit.ts
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
 * Tool handler for 'get_bus_eta'.
 * Returns mock transit info for a specific bus line in Split.
 * 
 * @param args - { lineNumber: string, stopName?: string }
 * @returns Promise<Record<string, unknown>>
 */
export async function getBusEta(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  const { lineNumber } = args;

  if (!lineNumber || typeof lineNumber !== 'string') {
    return { error: "Missing required argument: 'lineNumber' (string)." };
  }

  const data = transitData[lineNumber];

  if (!data) {
    return { error: `Bus line '${lineNumber}' not found in Promet Split schedule. Available lines: ${Object.keys(transitData).join(', ')}` };
  }

  // Add a slight randomization to ETA if requested for the same line
  const dynamicEta = Math.max(1, data.eta + (Math.floor(Math.random() * 5) - 2));

  return {
    ...data,
    eta: dynamicEta,
    timestamp: new Date().toISOString()
  } as unknown as Record<string, unknown>;
}
