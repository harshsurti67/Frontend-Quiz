import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getAuthToken, getAuthUser } from '../utils/auth';
import { quizApi } from '../services/api';

export default function AdminGuard({ children }) {
  const token = getAuthToken();
  const cachedUser = getAuthUser();
  const [user, setUser] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    if (token) {
      quizApi.getMe()
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="small text-white-50">Verifying Admin Permissions...</div>
      </div>
    );
  }

  // Check backend enforced admin permission
  const isAdmin = user?.is_staff || user?.is_superuser;

  if (!isAdmin) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white p-4">
        <div className="glass-panel p-5 text-center max-w-md" style={{ maxWidth: '500px' }}>
          <div className="display-1 text-danger mb-3">
            <i className="bi bi-shield-x"></i>
          </div>
          <h2 className="fw-extrabold text-white mb-2 font-heading">Access Denied</h2>
          <p className="text-white-50 mb-4">
            You do not have administrator privileges to access the KnowMe? Admin Panel.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/dashboard" className="btn-social-primary py-2 px-4">
              <i className="bi bi-speedometer2 me-2"></i>
              Creator Dashboard
            </Link>
            <Link to="/admin/login" className="btn-social-secondary py-2 px-4">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
