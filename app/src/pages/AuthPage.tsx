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
  const [twoFactor, setTwoFactor] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading, error, isAuthenticated, clearError } = useAuthStore();

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
      await register({ email, password, fullName, oib, phone, address });
    }
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
                  placeholder="OIB (11 znamenki)" 
                  value={oib}
                  onChange={(e) => setOib(e.target.value)}
                  required 
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

          <div className="auth-input-group full-width special-2fa">
            <span className="material-symbols-rounded auth-input-icon">bolt</span>
            <input 
              type="text" 
              placeholder="2FA Google Auth Kod (6 znamenki)" 
              value={twoFactor}
              onChange={(e) => setTwoFactor(e.target.value)}
              required 
              pattern="\d{6}"
            />
          </div>

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
        </form>
      </div>

      <div className="auth-footer">
        SplitAI &copy; 2026
      </div>
    </div>
  );
}
