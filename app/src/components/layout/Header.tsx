import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-text">Split<span className="logo-accent">AI</span></span>
        </Link>
        
        <nav className="desktop-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Map</Link>
          <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>Assistant</Link>
          <Link to="/pazar" className={location.pathname.startsWith('/pazar') ? 'active' : ''}>Pazar</Link>
          <Link to="/report" className={location.pathname === '/report' ? 'active' : ''}>Report</Link>
          <Link to="/admin/dashboard" className={location.pathname.startsWith('/admin') ? 'active' : ''}>Admin</Link>
        </nav>
        
        <div className="header-actions">
          <button className="icon-button" aria-label="Switch Language">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button className="icon-button" aria-label="Toggle Theme">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          <button className="icon-button mobile-menu" aria-label="Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
