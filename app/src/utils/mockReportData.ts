import { CivicReportClassification } from '@/types';

/** Mock classification result for the photo report demo */
export const MOCK_CLASSIFICATION: CivicReportClassification = {
  category: 'waste_overflow',
  severity: 8,
  zone: 'unesco_buffer',
  department: 'cistoca',
  description: "Large quantity of household waste overflowed near a public container. Obstructing pedestrian path.",
  suggestedAction: "Immediate pickup required.",
  confidence: 0.94
};

/** Generate a mock ticket ID */
export const generateTicketId = (): string => {
  return `GR-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
};
