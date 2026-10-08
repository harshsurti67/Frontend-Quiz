import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { setAuthToken, setAuthUser } from '../../utils/auth';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminApi.adminLogin({ username: username.trim(), password });
      setAuthToken(res.data.access);
      setAuthUser(res.data.user);
      navigate('/admin');
    } catch (err) {
      console.error("Admin login failure:", err);
      setError(err.message || 'Access Denied. Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white p-3">
      <div className="glass-panel p-3 p-sm-4 p-md-5 w-100" style={{ maxWidth: '440px' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <span className="brand-logo fs-2">
              KnowMe<span className="text-pink">?</span>
            </span>
            <span className="badge bg-danger text-uppercase font-heading px-2 py-1">
              Admin Portal
            </span>
          </div>
          <p className="text-white-50 small mb-0">
            Sign in with administrator privileges to manage KnowMe?
          </p>
        </div>

        {error && (
          <div className="alert alert-danger bg-danger bg-opacity-25 text-white border-danger py-2 small mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white-50 small fw-bold uppercase">
              Email / Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control social-input"
                placeholder="admin@knowme.com or admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-white-50 small fw-bold uppercase">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control social-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-social-primary w-100 py-3 fs-5"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <i className="bi bi-shield-check me-2"></i>
                <span>Admin Login</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
          <a href="/dashboard" className="text-white-50 small text-decoration-none hover-white">
            ← Switch to Creator Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
