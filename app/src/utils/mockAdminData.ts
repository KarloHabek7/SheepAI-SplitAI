import { CivicReport, IssueCategory, Department, CityZone, ReportStatus, SeverityLevel } from '@/types';

const categories: IssueCategory[] = ['pothole', 'graffiti', 'illegal_parking', 'noise_complaint', 'waste_overflow', 'damaged_infrastructure', 'illegal_construction', 'vandalism', 'public_safety'];
const departments: Department[] = ['komunalni_redari', 'cistoca', 'promet', 'urbanizam', 'vatrogasci'];
const zones: CityZone[] = ['zona_a', 'zona_b', 'zona_c', 'unesco_core', 'marjan_park'];
const statuses: ReportStatus[] = ['submitted', 'in_progress', 'resolved', 'rejected'];

export const generateMockReports = (count: number): CivicReport[] => {
  return Array.from({ length: count }).map((_) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const severity = (Math.floor(Math.random() * 10) + 1) as SeverityLevel;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    return {
      id: `report-${Math.random().toString(36).substr(2, 9)}`,
      status,
      createdAt: date.toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=2070&auto=format&fit=crop',
      classification: {
        category,
        severity,
        zone,
        department,
        description: `Mock description for ${category} in ${zone}. AI detected high probability of ${category}.`,
        suggestedAction: `Deploy ${department} to inspect and resolve within 48h.`,
        confidence: 0.85 + Math.random() * 0.1
      },
      location: {
        lat: 43.5081 + (Math.random() - 0.5) * 0.01,
        lng: 16.4402 + (Math.random() - 0.5) * 0.01,
        address: 'Mock Address, Split'
      }
    };
  });
};

export const mockReports = generateMockReports(30);

export const getDashboardStats = (reports: CivicReport[]) => {
  const stats = {
    totalReports: reports.length,
    openReports: reports.filter(r => r.status === 'submitted' || r.status === 'in_progress').length,
    resolvedToday: reports.filter(r => r.status === 'resolved' && new Date(r.updatedAt).toDateString() === new Date().toDateString()).length || 5, // fallback for demo
    averageResolutionHours: 14.5,
    reportsByCategory: {} as Record<IssueCategory, number>,
    reportsBySeverity: {
      'Low': 0,
      'Medium': 0,
      'High': 0,
      'Critical': 0
    } as Record<string, number>,
    reportsByDepartment: {} as Record<Department, number>
  };

  reports.forEach(r => {
    // Category
    stats.reportsByCategory[r.classification.category] = (stats.reportsByCategory[r.classification.category] || 0) + 1;
    
    // Severity
    const s = r.classification.severity;
    if (s <= 3) stats.reportsBySeverity['Low']++;
    else if (s <= 6) stats.reportsBySeverity['Medium']++;
    else if (s <= 8) stats.reportsBySeverity['High']++;
    else stats.reportsBySeverity['Critical']++;

    // Department
    stats.reportsByDepartment[r.classification.department] = (stats.reportsByDepartment[r.classification.department] || 0) + 1;
  });

  return stats;
};
