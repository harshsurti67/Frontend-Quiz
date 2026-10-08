import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { quizApi } from '../services/api';
import { setAuthToken, setAuthUser } from '../utils/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !username.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await quizApi.register({
        name: name.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password,
      });
      setAuthToken(res.data.access);
      setAuthUser(res.data.user);
      navigate('/create');
    } catch (err) {
      setError(err.message || 'Registration failed. Username or email may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={5}>
          <div className="glass-panel p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="glass-pill mb-2">✨ Register Creator Account</span>
              <h1 className="fs-2 fw-bold text-white font-heading">
                Create Account <span className="gradient-text">🚀</span>
              </h1>
              <p className="text-white-50 small">
                Sign up to create personal friendship quizzes and track your private attempt leaderboards!
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white fw-bold">Your Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="social-input"
                  placeholder="e.g. Prem, Harsh, Sarah..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  id="register-name-input"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white fw-bold">Username <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="social-input"
                  placeholder="e.g. prem123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  id="register-username-input"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-white fw-bold">Email Address (Optional)</label>
                <input
                  type="email"
                  className="social-input"
                  placeholder="e.g. prem@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="register-email-input"
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-white fw-bold">Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  className="social-input"
                  placeholder="At least 6 characters..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  id="register-password-input"
                />
              </div>

              <button
                type="submit"
                className="btn-social-primary w-100 py-3 fs-5"
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus-fill"></i>
                    <span>Register Account</span>
                  </>
                )}
              </button>
            </Form>

            <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
              <p className="text-white-50 small mb-0">
                Already have an account?{' '}
                <Link to="/login" className="text-info text-decoration-none fw-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
