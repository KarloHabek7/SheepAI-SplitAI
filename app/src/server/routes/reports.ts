import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { visionService } from '../../services/ai/visionService.js';
import type { GetReportsResponse } from '../../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Setup for image uploads (moved from index.ts to avoid circular dependencies)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = Router();

// Endpoint: POST /api/report
router.post('/report', upload.single('image'), async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const imageBuffer = fs.readFileSync(file.path);
    const report = await visionService.classifyIssue(imageBuffer);
    
    // Add the public image URL to the report
    report.imageUrl = `/uploads/${file.filename}`;

    res.json(report);
  } catch (error) {
    console.error('Vision service error:', error);
    res.status(500).json({ error: 'Failed to process report' });
  }
});

// Endpoint: GET /api/reports
router.get('/reports', (_req, res) => {
  const reportsList: GetReportsResponse = {
    reports: [
      {
        id: 'REP-1001',
        category: 'Bulk Waste',
        severity: 'Medium',
        description: 'Old mattress left on the sidewalk near Marjan.',
        location: { lat: 43.5081, lng: 16.4402 },
        status: 'Pending',
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: 'REP-1002',
        category: 'Graffiti',
        severity: 'Low',
        description: "Graffiti on the wall of Diocletian's Palace.",
        location: { lat: 43.5083, lng: 16.4401 },
        status: 'Triaged',
        createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: 'REP-1003',
        category: 'Infrastructure',
        severity: 'High',
        description: 'Deep pothole on Vukovarska street.',
        location: { lat: 43.5115, lng: 16.4520 },
        status: 'Resolved',
        createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ]
  };

  res.json(reportsList);
});

export default router;
