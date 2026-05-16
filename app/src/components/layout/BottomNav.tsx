import { NavLink } from 'react-router-dom';
import { Map, MessageSquare, Camera, ShoppingBag } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Map size={24} />
        <span>Map</span>
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <MessageSquare size={24} />
        <span>Chat</span>
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="report-fab">
          <Camera size={28} color="white" />
        </div>
        <span>Report</span>
      </NavLink>
      <NavLink to="/pazar" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <ShoppingBag size={24} />
        <span>Pazar</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
