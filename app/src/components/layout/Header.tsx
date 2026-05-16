import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('hr') ? 'en' : 'hr';
    i18n.changeLanguage(nextLang);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Split<span className="logo-accent">AI</span></span>
        </Link>
        
        <nav className="desktop-nav">
          <Link to="/" className={`nav-pill ${location.pathname === '/' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">map</span>
            <span>{t('nav.map')}</span>
          </Link>
          <Link to="/chat" className={`nav-pill ${location.pathname === '/chat' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">chat_bubble</span>
            <span>{t('nav.assistant')}</span>
          </Link>
          <Link to="/pazar" className={`nav-pill ${location.pathname.startsWith('/pazar') ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">storefront</span>
            <span>{t('nav.pazar')}</span>
          </Link>
          <Link to="/report" className={`nav-pill ${location.pathname === '/report' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">add_photo_alternate</span>
            <span>{t('nav.report')}</span>
          </Link>
          <Link to="/admin" className={`nav-pill ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">admin_panel_settings</span>
            <span>{t('nav.admin')}</span>
          </Link>
          <Link to="/emergency" className={`nav-pill ${location.pathname === '/emergency' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">campaign</span>
            <span>{t('nav.emergency')}</span>
          </Link>
        </nav>
        
        <div className="header-actions">
          <button className="pill-btn lang-btn" onClick={toggleLanguage} aria-label="Switch Language" title="Switch Language">
            <span className="material-symbols-outlined">language</span>
            <span className="lang-code">{i18n.language.slice(0, 2).toUpperCase()}</span>
          </button>
          <button className="pill-btn theme-btn" onClick={toggleTheme} aria-label="Toggle Theme" title="Toggle Theme">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
