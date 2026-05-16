import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication.
 * Redirects to /auth if the user is not logged in.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // Redirect to home if admin is required but user is not admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
