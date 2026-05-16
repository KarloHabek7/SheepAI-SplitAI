import React, { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DashboardMetric from '@/components/admin/DashboardMetric';
import SeverityChart from '@/components/admin/SeverityChart';
import CategoryBreakdown from '@/components/admin/CategoryBreakdown';
import ReportTable from '@/components/admin/ReportTable';
import AdminTabs from '@/components/admin/AdminTabs';
import { mockReports, getDashboardStats } from '@/utils/mockAdminData';
import { CivicReport, ReportStatus } from '@/types';
import './AdminDashboardPage.css';

const AdminDashboardPage: React.FC = () => {
  const [reports, setReports] = useState<CivicReport[]>(mockReports);
  
  const stats = useMemo(() => getDashboardStats(reports), [reports]);
  const recentReports = useMemo(() => [...reports].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5), [reports]);

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r));
  };

  const handleViewDetails = (report: CivicReport) => {
    console.log('Viewing details for:', report.id);
    // In real app, this would open a modal or navigate
  };

  return (
    <div className="admin-page-root">
      <PageContainer>
        <AdminTabs />
        <div className="admin-header">
          <div>
            <h1 className="admin-title">City Triage Overview</h1>
            <p className="admin-subtitle">Real-time civic monitoring & AI pre-classification</p>
          </div>
          <div className="admin-actions">
            <button className="export-btn">
              <span className="material-symbols-outlined">download</span>
              Export Report
            </button>
          </div>
        </div>

        <div className="metrics-grid">
          <DashboardMetric 
            label="Total Reports" 
            value={stats.totalReports} 
            icon="assessment" 
            trend={{ value: 12, isUp: true }}
          />
          <DashboardMetric 
            label="Open Issues" 
            value={stats.openReports} 
            icon="pending_actions" 
            color="warning"
          />
          <DashboardMetric 
            label="Resolved Today" 
            value={stats.resolvedToday} 
            icon="check_circle" 
            color="success"
            trend={{ value: 8, isUp: true }}
          />
          <DashboardMetric 
            label="Avg. Resolution" 
            value={`${stats.averageResolutionHours}h`} 
            icon="schedule" 
            color="primary"
          />
        </div>

        <div className="charts-grid">
          <SeverityChart data={stats.reportsBySeverity} />
          <CategoryBreakdown data={stats.reportsByCategory} />
        </div>

        <div className="recent-reports-section">
          <div className="section-header">
            <h2 className="section-title">Recent Triaged Reports</h2>
            <a href="/admin/reports" className="view-all-link">View all reports</a>
          </div>
          <ReportTable 
            reports={recentReports} 
            onStatusChange={handleStatusChange} 
            onViewDetails={handleViewDetails}
          />
        </div>
      </PageContainer>
    </div>
  );
};

export default AdminDashboardPage;
