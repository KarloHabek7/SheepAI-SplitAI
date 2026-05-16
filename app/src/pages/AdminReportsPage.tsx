import React, { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import ReportTable from '@/components/admin/ReportTable';
import AdminTabs from '@/components/admin/AdminTabs';
import { mockReports } from '@/utils/mockAdminData';
import { CivicReport, ReportStatus, IssueCategory } from '@/types';
import './AdminReportsPage.css';

const AdminReportsPage: React.FC = () => {
  const [reports, setReports] = useState<CivicReport[]>(mockReports);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<IssueCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || r.classification.category === filterCategory;
      const matchesSearch = r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           r.classification.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [reports, filterStatus, filterCategory, searchTerm]);

  const handleStatusChange = (id: string, newStatus: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r));
  };

  const handleViewDetails = (report: CivicReport) => {
    console.log('Viewing details for:', report.id);
  };

  return (
    <div className="admin-page-root">
      <PageContainer>
        <AdminTabs />
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Civic Reports Database</h1>
            <p className="admin-subtitle">Search, filter, and manage all incoming reports</p>
          </div>
        </div>

        <div className="filters-bar">
          <div className="search-box">
            <span className="material-symbols-outlined search-icon">search</span>
            <input 
              type="text" 
              placeholder="Search by ID or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-selects">
            <div className="filter-group">
              <label>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value as any)}>
                <option value="all">All Categories</option>
                <option value="pothole">Potholes</option>
                <option value="graffiti">Graffiti</option>
                <option value="illegal_parking">Illegal Parking</option>
                <option value="waste_overflow">Waste Overflow</option>
                <option value="public_safety">Public Safety</option>
              </select>
            </div>
          </div>
        </div>

        <div className="reports-count">
          Found {filteredReports.length} reports
        </div>

        <ReportTable 
          reports={filteredReports} 
          onStatusChange={handleStatusChange} 
          onViewDetails={handleViewDetails}
        />
      </PageContainer>
    </div>
  );
};

export default AdminReportsPage;
