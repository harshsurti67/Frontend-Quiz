import React from 'react';
import { Container } from 'react-bootstrap';

export default function LoadingScreen({ message = 'Loading...', subtext = null }) {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="glass-panel p-5 text-center" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="mb-4 position-relative d-inline-block">
          <div
            className="spinner-grow text-primary"
            style={{ width: '3.5rem', height: '3.5rem', opacity: 0.8 }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div
            className="spinner-border text-danger position-absolute top-0 start-0"
            style={{ width: '3.5rem', height: '3.5rem', borderWidth: '3px' }}
            role="status"
          />
        </div>
        <h3 className="fs-5 fw-bold text-white mb-2 font-heading">
          {message}
        </h3>
        {subtext && (
          <p className="text-white-50 small mb-0">
            {subtext}
          </p>
        )}
      </div>
    </Container>
  );
}
