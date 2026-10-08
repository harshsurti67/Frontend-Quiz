import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getAuthUser, logoutUser } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();

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

        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="d-none d-md-inline-block text-white-50 text-decoration-none fw-semibold">
            Home
          </Link>

          {user ? (
            <>
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
            <Link to="/login" className="d-none d-sm-inline-block text-white-50 text-decoration-none fw-semibold">
              Creator Login
            </Link>
          )}

          <Link to="/create" className="btn-social-primary py-2 px-3 fs-6">
            <i className="bi bi-plus-circle-fill"></i>
            <span>Create Quiz</span>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
