import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Badge } from 'react-bootstrap';
import { getAuthUser, logoutUser } from '../utils/auth';
import { quizApi } from '../services/api';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadUnreadCount();
      // Poll for unread count every 30 seconds
      const interval = setInterval(loadUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadUnreadCount = async () => {
    try {
      const res = await quizApi.getUnreadCount();
      setUnreadCount(res.data.unread_count);
    } catch (err) {
      console.error('Failed to load unread count:', err);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="app-navbar">
      <Container className="d-flex align-items-center justify-content-between">
        <Link to="/" className="brand-logo text-decoration-none">
          <span className="fs-3">👀</span>
          <span>
            <span className="gradient-text">Know</span>Me?
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap d-none d-md-flex">
          <Link to="/" className="text-white-50 text-decoration-none fw-semibold">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/find-friends" className="text-white-50 text-decoration-none fw-semibold">
                <i className="bi bi-search me-1"></i>
                Find Friends
              </Link>
              <Link to="/messages" className="text-white-50 text-decoration-none fw-semibold position-relative">
                <i className="bi bi-chat-dots-fill me-1"></i>
                Messages
                {unreadCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ transform: 'translate(-50%, -50%)' }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Link>
              <Link to="/dashboard" className="text-white-50 text-decoration-none fw-semibold">
                <i className="bi bi-bar-chart-fill me-1"></i>
                Dashboard
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary text-white-50 border-0"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white-50 text-decoration-none fw-semibold">
              Creator Login
            </Link>
          )}

          <Link to="/create" className="btn-social-primary py-2 px-3 fs-6">
            <i className="bi bi-plus-circle-fill"></i>
            <span>Create Quiz</span>
          </Link>
        </div>

        {/* Mobile Navigation - Single Profile Icon */}
        <div className="d-flex d-md-none">
          {user ? (
            <ProfileDropdown />
          ) : (
            <Link
              to="/login"
              className="btn btn-link text-white p-0 d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <i className="bi bi-person-fill fs-5"></i>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}
