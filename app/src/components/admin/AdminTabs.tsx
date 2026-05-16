import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminTabs.css';

const AdminTabs: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="admin-tabs">
      <Link 
        to="/admin/dashboard" 
        className={`admin-tab ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined">dashboard</span>
        Dashboard
      </Link>
      <Link 
        to="/admin/reports" 
        className={`admin-tab ${location.pathname === '/admin/reports' ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined">list_alt</span>
        All Reports
      </Link>
    </div>
  );
};

export default AdminTabs;
