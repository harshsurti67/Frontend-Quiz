import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateQuizPage from './pages/CreateQuizPage';
import PublicQuizPage from './pages/PublicQuizPage';
import ActiveQuizPage from './pages/ActiveQuizPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './admin/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminCreatorsPage from './admin/pages/AdminCreatorsPage';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add('admin-page');
    } else {
      document.body.classList.remove('admin-page');
    }
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="creators" element={<AdminCreatorsPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/q/:publicId" element={<PublicQuizPage />} />
          <Route path="/q/:publicId/start" element={<PublicQuizPage />} />
          <Route path="/q/:publicId/quiz/:attemptId" element={<ActiveQuizPage />} />
          <Route path="/q/:publicId/result/:attemptId" element={<ResultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
