import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import './AppShell.css';

const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default AppShell;
