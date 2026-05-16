import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">map</span>
        <span className="nav-label">Map</span>
      </NavLink>
      
      <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">chat</span>
        <span className="nav-label">Assistant</span>
      </NavLink>
      
      <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="fab-container">
          <span className="material-symbols-outlined fab-icon">add_a_photo</span>
        </div>
        <span className="nav-label">Report</span>
      </NavLink>
      
      <NavLink to="/pazar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">shopping_basket</span>
        <span className="nav-label">Pazar</span>
      </NavLink>
      
      <NavLink to="/emergency" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="material-symbols-outlined">emergency</span>
        <span className="nav-label">Info</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
