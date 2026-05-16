import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { 
  ReportAnalyzeRequest, 
  ReportAnalyzeResponse, 
  ReportSubmitRequest, 
  ReportSubmitResponse,
  CivicReport,
  APIResponse,
  IssueCategory,
  Department,
  CityZone
} from '../../types/index.js';
import { store } from '../store.js';

const router = Router();

/**
 * POST /api/report/analyze
 * Mock classification of a civic issue photo
 */
router.post('/analyze', (req: Request<{}, {}, ReportAnalyzeRequest>, res: Response) => {
  try {
    const { image: _image, location: _location } = req.body;

    // Mock logic to randomize classification
    const categories: IssueCategory[] = ['pothole', 'graffiti', 'illegal_parking', 'waste_overflow', 'damaged_infrastructure'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
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

    const zones: CityZone[] = ['zona_a', 'zona_b', 'zona_c', 'unesco_core'];
    const zone = zones[Math.floor(Math.random() * zones.length)];

    const response: APIResponse<ReportAnalyzeResponse> = {
      success: true,
      data: {
        classification: {
          category,
          severity: (Math.floor(Math.random() * 10) + 1) as any,
          zone,
          department: departments[category] || 'komunalni_redari',
          description: `Automatically detected ${category.replace('_', ' ')} in ${zone}.`,
          suggestedAction: 'Triaging for immediate response.',
          confidence: 0.85 + (Math.random() * 0.1)
        }
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'ANALYSIS_FAILED', message: 'Failed to analyze image' },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/report/submit
 * Create a new civic report ticket
 */
router.post('/submit', (req: Request<{}, {}, ReportSubmitRequest>, res: Response) => {
  try {
    const { classification, imageUrl, location, userNote } = req.body;

    const ticketId = `GR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newReport: CivicReport = {
      id: uuidv4(),
      ticketId,
      classification,
      imageUrl,
      location,
      userNote,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.addReport(newReport);

    const response: APIResponse<ReportSubmitResponse> = {
      success: true,
      data: {
        ticketId,
        status: 'submitted',
        estimatedResolution: '2-3 business days'
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'SUBMISSION_FAILED', message: 'Failed to submit report' },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/reports
 * List all reports with advanced filtering including spatial bbox
 */
router.get('/', (req: Request, res: Response) => {
  try {
    let reports = store.getAllReports();

    // Query filtering
    const { status, category, department, severity, severity_min, bbox } = req.query;
    
    if (status) reports = reports.filter(r => r.status === status);
    if (category) reports = reports.filter(r => r.classification.category === category);
    if (department) reports = reports.filter(r => r.classification.department === department);
    if (severity) reports = reports.filter(r => r.classification.severity === parseInt(severity as string, 10));
    if (severity_min) reports = reports.filter(r => r.classification.severity >= parseInt(severity_min as string, 10));

    // Spatial bounding box filtering
    if (bbox) {
      // bbox format: west,south,east,north
      const parts = (bbox as string).split(',').map(Number);
      if (parts.length === 4 && parts.every(n => !isNaN(n))) {
        const [west, south, east, north] = parts;
        reports = reports.filter(r => {
          if (!r.location) return false;
          const { lat, lng } = r.location;
          return lng >= west && lng <= east && lat >= south && lat <= north;
        });
      }
    }

    const response: APIResponse<CivicReport[]> = {
      success: true,
      data: reports,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_FAILED', message: 'Failed to fetch reports' },
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
