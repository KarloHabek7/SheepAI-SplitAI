import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="bottom-nav-container">
      <div className="bottom-nav-pill">
        <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined nav-icon">map</span>
          <span className="nav-label">{t('nav.map')}</span>
        </NavLink>
        
        <NavLink to="/chat" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined nav-icon">chat_bubble</span>
          <span className="nav-label">{t('nav.assistant')}</span>
        </NavLink>
        
        <NavLink to="/report" className={({ isActive }) => `bottom-nav-item report-item ${isActive ? 'active' : ''}`}>
          <div className="fab-wrapper">
            <div className="fab-button">
              <span className="material-symbols-outlined fab-icon">add_photo_alternate</span>
            </div>
          </div>
          <span className="nav-label report-label">{t('nav.report')}</span>
        </NavLink>
        
        <NavLink to="/pazar" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined nav-icon">storefront</span>
          <span className="nav-label">{t('nav.pazar')}</span>
        </NavLink>
        
        <NavLink to="/emergency" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined nav-icon">campaign</span>
          <span className="nav-label">{t('nav.emergency')}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
