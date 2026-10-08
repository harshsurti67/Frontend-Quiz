import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="py-5 text-center" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel p-5" style={{ maxWidth: '500px' }}>
        <div className="display-1 mb-2">👀</div>
        <h1 className="fs-2 fw-bold text-white mb-2 font-heading">
          Page Not Found
        </h1>
        <p className="text-white-50 mb-4">
          The quiz link or page you are looking for does not exist or has expired.
        </p>
        <Link to="/" className="btn-social-primary py-3 px-4">
          <i className="bi bi-house-door-fill"></i>
          <span>Back to Home</span>
        </Link>
      </div>
    </Container>
  );
}
