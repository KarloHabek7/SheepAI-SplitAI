import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);

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
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
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
            <span>{t('nav.map', 'Map')}</span>
          </Link>
          <Link to="/chat" className={`nav-pill ${location.pathname === '/chat' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">chat_bubble</span>
            <span>{t('nav.assistant', 'Assistant')}</span>
          </Link>
          <Link to="/pazar" className={`nav-pill ${location.pathname === '/pazar' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">storefront</span>
            <span>{t('nav.pazar', 'Pazar')}</span>
          </Link>
          <Link to="/report" className={`nav-pill ${location.pathname === '/report' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">add_photo_alternate</span>
            <span>{t('nav.report', 'Report')}</span>
          </Link>
          <Link to="/emergency" className={`nav-pill ${location.pathname === '/emergency' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">info</span>
            <span>{t('nav.info', 'Info')}</span>
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
