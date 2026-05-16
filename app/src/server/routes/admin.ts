import { Router, Request, Response } from 'express';
import {
  AdminDashboardData,
  DashboardHotspot,
  CivicReport,
  APIResponse,
  IssueCategory,
  Department,
  ReportStatus
} from '../../types/index.js';
import { store } from '../store.js';

const router = Router();

/** All IssueCategory values — used to initialize zero-count maps */
const ALL_CATEGORIES: IssueCategory[] = [
  'pothole',
  'graffiti',
  'illegal_parking',
  'noise_complaint',
  'waste_overflow',
  'damaged_infrastructure',
  'illegal_construction',
  'vandalism',
  'abandoned_vehicle',
  'public_safety',
  'other'
];

/** All Department values — used to initialize zero-count maps */
const ALL_DEPARTMENTS: Department[] = [
  'komunalni_redari',
  'cistoca',
  'promet',
  'urbanizam',
  'zastita_okolisa',
  'turisticka_inspekcija',
  'vatrogasci',
  'hitna_pomoc',
  'policija'
];

/** Statuses that count as "open" */
const OPEN_STATUSES: ReportStatus[] = ['analyzing', 'classified', 'submitted', 'in_progress'];

/**
 * Round a coordinate to a grid key for hotspot clustering.
 * Precision of 0.005 (~500m at Split's latitude).
 */
const roundCoord = (value: number, precision: number): number =>
  Math.round(value / precision) * precision;

/**
 * GET /dashboard
 * Compute aggregate statistics from all reports in the store.
 */
router.get('/dashboard', (_req: Request, res: Response) => {
  try {
    const reports = store.getAllReports();

    // --- Core counts ---
    const totalReports = reports.length;

    const openReports = reports.filter(r => OPEN_STATUSES.includes(r.status)).length;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayISO = todayStart.getTime();

    const resolvedToday = reports.filter(
      r => r.status === 'resolved' && new Date(r.updatedAt).getTime() >= todayISO
    ).length;

    // --- Average resolution hours (resolved reports only) ---
    const resolvedReports = reports.filter(r => r.status === 'resolved');
    let averageResolutionHours = 0;
    if (resolvedReports.length > 0) {
      const totalHours = resolvedReports.reduce((sum, r) => {
        const created = new Date(r.createdAt).getTime();
        const updated = new Date(r.updatedAt).getTime();
        return sum + (updated - created) / (1000 * 60 * 60);
      }, 0);
      averageResolutionHours = Math.round((totalHours / resolvedReports.length) * 100) / 100;
    }

    // --- Reports by category (all keys present) ---
    const reportsByCategory = {} as Record<IssueCategory, number>;
    ALL_CATEGORIES.forEach(cat => { reportsByCategory[cat] = 0; });
    reports.forEach(r => { reportsByCategory[r.classification.category]++; });

    // --- Reports by severity (keys "1" through "10") ---
    const reportsBySeverity: Record<string, number> = {};
    for (let s = 1; s <= 10; s++) { reportsBySeverity[String(s)] = 0; }
    reports.forEach(r => { reportsBySeverity[String(r.classification.severity)]++; });

    // --- Reports by department (all keys present) ---
    const reportsByDepartment = {} as Record<Department, number>;
    ALL_DEPARTMENTS.forEach(dep => { reportsByDepartment[dep] = 0; });
    reports.forEach(r => { reportsByDepartment[r.classification.department]++; });

    // --- Recent reports (last 10, sorted by createdAt desc) ---
    const recentReports = [...reports]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    // --- Hotspots (top 5 clusters by rounded location) ---
    const hotspots = computeHotspots(reports);

    const dashboardData: AdminDashboardData = {
      totalReports,
      openReports,
      resolvedToday,
      averageResolutionHours,
      reportsByCategory,
      reportsBySeverity,
      reportsByDepartment,
      recentReports,
      hotspots
    };

    const response: APIResponse<AdminDashboardData> = {
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'DASHBOARD_FAILED', message: 'Failed to compute dashboard statistics' },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * PATCH /reports/:id
 * Update a report's status and/or assignment.
 */
router.patch('/reports/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, assignedTo } = req.body as { status?: ReportStatus; assignedTo?: string };

    const report = store.getReportById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Report not found' },
        timestamp: new Date().toISOString()
      });
    }

    // Update fields if provided
    if (status) {
      report.status = status;
    }

    if (assignedTo !== undefined) {
      report.assignedTo = assignedTo;
    }

    report.updatedAt = new Date().toISOString();

    const response: APIResponse<CivicReport> = {
      success: true,
      data: report,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { code: 'PATCH_FAILED', message: 'Failed to update report' },
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Group reports by rounded location and return the top 5 clusters.
 */
function computeHotspots(reports: CivicReport[]): DashboardHotspot[] {
  const PRECISION = 0.005;

  // Only reports with locations
  const geoReports = reports.filter(r => r.location);

  // Group by grid key
  const clusters = new Map<string, CivicReport[]>();
  for (const r of geoReports) {
    const lat = roundCoord(r.location!.lat, PRECISION);
    const lng = roundCoord(r.location!.lng, PRECISION);
    const key = `${lat},${lng}`;
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key)!.push(r);
  }

  // Convert to hotspots and pick top 5 by count
  const hotspotList: DashboardHotspot[] = [];
  for (const [, group] of clusters) {
    const avgLat = group.reduce((s, r) => s + r.location!.lat, 0) / group.length;
    const avgLng = group.reduce((s, r) => s + r.location!.lng, 0) / group.length;
    const avgSeverity =
      group.reduce((s, r) => s + r.classification.severity, 0) / group.length;

    // Dominant category = mode
    const catCounts: Partial<Record<IssueCategory, number>> = {};
    for (const r of group) {
      const cat = r.classification.category;
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
    const dominantCategory = (Object.entries(catCounts) as [IssueCategory, number][])
      .sort((a, b) => b[1] - a[1])[0][0];

    hotspotList.push({
      location: { lat: avgLat, lng: avgLng },
      reportCount: group.length,
      dominantCategory,
      averageSeverity: Math.round(avgSeverity * 100) / 100
    });
  }

  return hotspotList
    .sort((a, b) => b.reportCount - a.reportCount)
    .slice(0, 5);
}

export default router;
