import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AuthPage.css';

export default function AuthPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo-icon">
            <span className="material-symbols-rounded">bolt</span>
          </div>
          <h1 className="auth-title">SplitAI</h1>
          <p className="auth-subtitle">{t('welcome')}</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            {t('auth.login')}
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            {t('auth.register')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">person</span>
                <input type="text" placeholder={t('hr.fullName', { defaultValue: 'Full Name' })} required />
              </div>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">badge</span>
                <input type="text" placeholder={t('hr.oib', { defaultValue: 'OIB (11 digits)' })} required pattern="\d{11}" />
              </div>
            </>
          )}

          <div className="auth-input-group">
            <span className="material-symbols-rounded auth-input-icon">mail</span>
            <input type="email" placeholder={t('auth.email')} required />
          </div>

          {activeTab === 'register' && (
            <>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">phone</span>
                <input type="tel" placeholder={t('hr.phone', { defaultValue: 'Phone Number' })} required />
              </div>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">location_on</span>
                <input type="text" placeholder={t('hr.address', { defaultValue: 'Address (optional)' })} />
              </div>
            </>
          )}

          <div className="auth-input-group">
            <span className="material-symbols-rounded auth-input-icon">lock</span>
            <input type="password" placeholder={t('auth.password')} required />
          </div>

          <button type="submit" className="auth-submit-btn">
            {activeTab === 'login' ? t('auth.login') : t('auth.register')} <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        </form>
      </div>

      <div className="auth-footer">
        SplitAI &copy; 2026
      </div>
    </div>
  );
}
