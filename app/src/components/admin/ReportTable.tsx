import React from 'react';
import './ReportTable.css';
import { CivicReport, ReportStatus } from '@/types';
import SeverityBadge from './SeverityBadge';

interface ReportTableProps {
  reports: CivicReport[];
  onStatusChange: (id: string, status: ReportStatus) => void;
  onViewDetails: (report: CivicReport) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({ reports, onStatusChange, onViewDetails }) => {
  const getStatusClass = (status: ReportStatus) => {
    switch (status) {
      case 'resolved': return 'status-resolved';
      case 'in_progress': return 'status-progress';
      case 'rejected': return 'status-rejected';
      case 'submitted': return 'status-submitted';
      default: return 'status-analyzing';
    }
  };

  return (
    <div className="report-table-container">
      <table className="report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Zone</th>
            <th>Department</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="col-id">#{report.id.slice(-6).toUpperCase()}</td>
              <td className="col-category">
                <span className="cat-pill">{report.classification.category.replace(/_/g, ' ')}</span>
              </td>
              <td><SeverityBadge level={report.classification.severity} /></td>
              <td className="col-zone">{report.classification.zone.replace(/_/g, ' ')}</td>
              <td className="col-dept">{report.classification.department.replace(/_/g, ' ')}</td>
              <td>
                <select 
                  className={`status-select ${getStatusClass(report.status)}`}
                  value={report.status}
                  onChange={(e) => onStatusChange(report.id, e.target.value as ReportStatus)}
                >
                  <option value="submitted">Submitted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td className="col-date">
                {new Date(report.createdAt).toLocaleDateString('hr-HR')}
              </td>
              <td>
                <button className="view-btn" onClick={() => onViewDetails(report)}>
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reports.length === 0 && (
        <div className="empty-state">
          <span className="material-symbols-outlined empty-icon">inventory_2</span>
          <p>No reports found matching filters.</p>
        </div>
      )}
    </div>
  );
};

export default ReportTable;
