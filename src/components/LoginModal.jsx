import React, { useState } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import { setAuthToken, setAuthUser } from '../utils/auth';

export default function LoginModal({ show, onHide, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await quizApi.login({ username, password });
      const { access, refresh, user } = res.data;

      setAuthToken(access);
      setAuthUser(user);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      onHide();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await quizApi.register({ username, password, name: username });
      const { access, refresh, user } = res.data;

      setAuthToken(access);
      setAuthUser(user);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      onHide();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    setError('');
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Body className="glass-panel p-4">
        <div className="text-center mb-4">
          <h3 className="text-white fw-bold mb-2 font-heading">
            {isLogin ? 'Login Required' : 'Create Account'}
          </h3>
          <p className="text-white-50 small">
            {isLogin 
              ? 'You need to login before creating a quiz' 
              : 'Create an account to start making quizzes'}
          </p>
        </div>

        {error && (
          <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-3 py-2">
            {error}
          </Alert>
        )}

        <Form onSubmit={isLogin ? handleLogin : handleRegister}>
          <div className="mb-3">
            <label className="form-label text-white fw-bold small">Username</label>
            <input
              type="text"
              className="social-input"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus={isLogin}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white fw-bold small">Password</label>
            <input
              type="password"
              className="social-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            {!isLogin && (
              <div className="text-white-50 small mt-1">
                Minimum 6 characters
              </div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn-social-secondary flex-grow-1 py-2"
              onClick={onHide}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-social-primary flex-grow-1 py-2"
              disabled={loading}
            >
              {loading 
                ? (isLogin ? 'Logging in...' : 'Creating account...') 
                : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </div>
        </Form>

        <div className="text-center mt-3 pt-3 border-top border-secondary border-opacity-25">
          <button
            type="button"
            className="btn btn-link text-white-50 small text-decoration-none"
            onClick={handleSwitchMode}
            disabled={loading}
          >
            {isLogin 
              ? "Don't have an account? Create one" 
              : 'Already have an account? Login'}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
