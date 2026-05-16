import { v4 as uuidv4 } from 'uuid';
import { store } from '../store.js';
import { 
  CivicReport, 
  IssueCategory, 
  Department, 
  CityZone,
  SeverityLevel
} from '../../types/index.js';

/**
 * Tool handler for 'submit_gradsko_oko_report'.
 * Creates a new civic report in the in-memory store.
 * 
 * @param args - { category, severity, location, description, imageUrl, userNote }
 * @returns Promise<Record<string, unknown>>
 */
export async function submitReport(args: Record<string, unknown>): Promise<Record<string, unknown>> {
  try {
    const { 
      category, 
      severity, 
      location, 
      description, 
      imageUrl, 
      userNote 
    } = args;

    // 1. Validation
    if (!category || typeof category !== 'string') {
      return { error: "Missing required argument: 'category' (string)." };
    }
    if (!description || typeof description !== 'string') {
      return { error: "Missing required argument: 'description' (string)." };
    }

    // 2. Mapping & Defaults
    const ticketId = `GR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const departments: Record<IssueCategory, Department> = {
      pothole: 'promet',
      graffiti: 'komunalni_redari',
      illegal_parking: 'promet',
      waste_overflow: 'cistoca',
      damaged_infrastructure: 'komunalni_redari',
      noise_complaint: 'komunalni_redari',
      illegal_construction: 'urbanizam',
      vandalism: 'komunalni_redari',
      abandoned_vehicle: 'promet',
      public_safety: 'policija',
      other: 'komunalni_redari'
    };

    const validatedCategory = category as IssueCategory;
    const validatedSeverity = (Number(severity) || 5) as SeverityLevel;
    const validatedZone = (args.zone as CityZone) || 'zona_a';

    // 3. Build Report
    const newReport: CivicReport = {
      id: uuidv4(),
      ticketId,
      classification: {
        category: validatedCategory,
        severity: validatedSeverity,
        zone: validatedZone,
        department: departments[validatedCategory] || 'komunalni_redari',
        description: description,
        suggestedAction: 'Triage via AI Tool Call',
        confidence: 1.0
      },
      imageUrl: (imageUrl as string) || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b',
      location: location as any,
      userNote: (userNote as string) || '',
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 4. Store
    store.addReport(newReport);

    return {
      ticketId,
      status: 'submitted',
      eta: '2-3 business days',
      id: newReport.id
    };
  } catch (error: any) {
    return { error: `Failed to submit report: ${error.message}` };
  }
}
