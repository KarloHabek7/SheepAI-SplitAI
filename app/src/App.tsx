import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from '@/components/layout/AppShell';
import Spinner from '@/components/ui/Spinner';
import './App.css';

// Lazy load pages
const MapPage = lazy(() => import('@/pages/MapPage'));
const ChatPage = lazy(() => import('@/pages/ChatPage'));
const ReportPage = lazy(() => import('@/pages/ReportPage'));
const PazarFeedPage = lazy(() => import('@/pages/PazarFeedPage'));
const PazarSubmitPage = lazy(() => import('@/pages/PazarSubmitPage'));
const EmergencyPage = lazy(() => import('@/pages/EmergencyPage'));
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
const AdminReportsPage = lazy(() => import('@/pages/AdminReportsPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<MapPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="pazar" element={<PazarFeedPage />} />
            <Route path="pazar/submit" element={<PazarSubmitPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/reports" element={<AdminReportsPage />} />
            
            {/* 404 Fallback */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
