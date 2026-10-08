import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { quizApi } from '../services/api';
import { setAuthToken, setAuthUser } from '../utils/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Please enter your username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await quizApi.login({ username: username.trim(), password });
      setAuthToken(res.data.access);
      setAuthUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={7} lg={5}>
          <div className="glass-panel p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="glass-pill mb-2">🔐 Creator Access</span>
              <h1 className="fs-2 fw-bold text-white font-heading">
                Welcome <span className="gradient-text">Back</span>
              </h1>
              <p className="text-white-50 small">
                Sign in to manage your private personal quizzes and view friend scores.
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white fw-bold">Username or Email</label>
                <input
                  type="text"
                  className="social-input"
                  placeholder="e.g. prem or prem@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  id="login-username-input"
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-white fw-bold">Password</label>
                <input
                  type="password"
                  className="social-input"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="login-password-input"
                />
              </div>

              <button
                type="submit"
                className="btn-social-primary w-100 py-3 fs-5"
                disabled={loading}
                id="login-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </Form>

            <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
              <p className="text-white-50 small mb-0">
                Don't have a creator account?{' '}
                <Link to="/register" className="text-info text-decoration-none fw-bold">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
