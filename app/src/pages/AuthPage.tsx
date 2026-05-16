import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/useAuthStore';
import './AuthPage.css';

export default function AuthPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [oib, setOib] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo, register, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await login(email, password);
    } else {
      await register({ 
        email, 
        password, 
        fullName: fullName || 'Demo User', 
        oib: oib || '12345678901', 
        phone: phone || '+3850000000', 
        address: address || 'Split' 
      });
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'citizen') => {
    console.log(`[AuthPage] Demo login initiated for role: ${role}`);
    loginDemo(role === 'admin' ? 'admin' : 'user');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo-icon">
            <span className="material-symbols-rounded">bolt</span>
          </div>
          <h1 className="auth-title">Split.ai</h1>
          <p className="auth-subtitle">Sustav za pametno upravljanje gradom</p>
        </div>

        {error && (
          <div className="auth-error" onClick={clearError}>
            <span className="material-symbols-rounded">error</span>
            {error}
          </div>
        )}

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              clearError();
            }}
          >
            {t('auth.login')}
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              clearError();
            }}
          >
            {t('auth.register')}
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="auth-form-row">
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">person</span>
                <input 
                  type="text" 
                  placeholder="Ime i Prezime" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">badge</span>
                <input 
                  type="text" 
                  placeholder="OIB (opcionalno)" 
                  value={oib}
                  onChange={(e) => setOib(e.target.value)}
                  pattern="\d{11}" 
                />
              </div>
            </div>
          )}

          <div className="auth-input-group full-width">
            <span className="material-symbols-rounded auth-input-icon">mail</span>
            <input 
              type="email" 
              placeholder="Email adresa" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {activeTab === 'register' && (
            <div className="auth-form-row">
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">call</span>
                <input 
                  type="tel" 
                  placeholder="Broj mobitela" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
              <div className="auth-input-group">
                <span className="material-symbols-rounded auth-input-icon">location_on</span>
                <input 
                  type="text" 
                  placeholder="Adresa (opcionalno)" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="auth-input-group full-width">
            <span className="material-symbols-rounded auth-input-icon">lock</span>
            <input 
              type="password" 
              placeholder="Lozinka" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* 2FA removed for pitch simplicity */}

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="material-symbols-rounded animate-spin">sync</span>
            ) : (
              <>
                {activeTab === 'login' ? 'Prijava' : 'Završi registraciju'} 
                <span className="material-symbols-rounded">arrow_forward</span>
              </>
            )}
          </button>

          {activeTab === 'login' && (
            <div className="demo-login-section">
              <div className="demo-divider">
                <span>Ili brzi pristup za pitch</span>
              </div>
              <div className="demo-buttons">
                <button 
                  type="button" 
                  className="demo-btn admin"
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isLoading}
                >
                  <span className="material-symbols-rounded">admin_panel_settings</span>
                  Admin Demo
                </button>
                <button 
                  type="button" 
                  className="demo-btn citizen"
                  onClick={() => handleDemoLogin('citizen')}
                  disabled={isLoading}
                >
                  <span className="material-symbols-rounded">person</span>
                  Građanin Demo
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="auth-footer">
        SplitAI &copy; 2026
      </div>
    </div>
  );
}
