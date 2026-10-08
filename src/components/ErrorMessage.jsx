import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Unable to load quiz details.',
  onRetry,
}) {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="glass-panel p-5 text-center" style={{ maxWidth: '480px', width: '100%' }}>
        <div className="fs-1 mb-3">⚠️</div>
        <h2 className="fs-4 fw-bold text-white mb-2 font-heading">
          {title}
        </h2>
        <p className="text-white-50 mb-4 small">
          {message}
        </p>

        <div className="d-flex justify-content-center gap-3">
          {onRetry && (
            <button
              type="button"
              className="btn-social-primary py-2 px-4"
              onClick={onRetry}
            >
              <i className="bi bi-arrow-repeat"></i>
              <span>Try Again</span>
            </button>
          )}
          <Link to="/" className="btn-social-secondary py-2 px-4 text-decoration-none">
            <i className="bi bi-house"></i>
            <span>Home</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
