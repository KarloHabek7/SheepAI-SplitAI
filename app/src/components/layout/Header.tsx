import { NavLink } from 'react-router-dom';
import { Map, MessageSquare, ShoppingBag, ShieldAlert, Languages, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          <span className="logo-text">Split</span>
          <span className="logo-accent">AI</span>
        </NavLink>

        <nav className="desktop-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Map size={20} />
            <span>Map</span>
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <MessageSquare size={20} />
            <span>Chat</span>
          </NavLink>
          <NavLink to="/pazar" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ShoppingBag size={20} />
            <span>Pazar</span>
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ShieldAlert size={20} />
            <span>Emergency</span>
          </NavLink>
        </nav>

        <div className="header-actions">
          <button onClick={toggleLanguage} className="action-btn" aria-label="Toggle Language">
            <Languages size={20} />
            <span className="lang-code">{i18n.language.toUpperCase()}</span>
          </button>
          <button className="action-btn" aria-label="Toggle Theme">
            <Sun className="sun-icon" size={20} />
            <Moon className="moon-icon" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
