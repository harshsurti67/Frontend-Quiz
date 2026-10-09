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
import FindFriendsPage from './pages/FindFriendsPage';
import UserFollowListPage from './pages/UserFollowListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLayout from './admin/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminCreatorsPage from './admin/pages/AdminCreatorsPage';
import AdminCreatorDetailPage from './admin/pages/AdminCreatorDetailPage';
import AdminQuizzesPage from './admin/pages/AdminQuizzesPage';
import AdminQuizDetailPage from './admin/pages/AdminQuizDetailPage';
import AdminQuestionsPage from './admin/pages/AdminQuestionsPage';
import AdminCategoriesPage from './admin/pages/AdminCategoriesPage';
import AdminAttemptsPage from './admin/pages/AdminAttemptsPage';
import AdminAttemptDetailPage from './admin/pages/AdminAttemptDetailPage';
import AdminAnalyticsPage from './admin/pages/AdminAnalyticsPage';
import AdminSettingsPage from './admin/pages/AdminSettingsPage';

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
          <Route path="creators/:id" element={<AdminCreatorDetailPage />} />
          <Route path="quizzes" element={<AdminQuizzesPage />} />
          <Route path="quizzes/:id" element={<AdminQuizDetailPage />} />
          <Route path="questions" element={<AdminQuestionsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="attempts" element={<AdminAttemptsPage />} />
          <Route path="attempts/:id" element={<AdminAttemptDetailPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 pt-3 pt-md-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateQuizPage />} />
          <Route path="/find-friends" element={<FindFriendsPage />} />
          <Route path="/users/:userId/:type" element={<UserFollowListPage />} />
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
