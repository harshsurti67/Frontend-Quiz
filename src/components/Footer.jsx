import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <Container>
        <Row className="gy-4 align-items-center">
          <Col md={6} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <span className="fs-4">👀</span>
              <span className="fw-bold text-white fs-5 font-heading">
                <span className="gradient-text">Know</span>Me?
              </span>
            </div>
            <p className="text-muted mb-0 small">
              The ultimate social friendship quiz. Create a 10-question quiz, send it on WhatsApp, and find out who your real ones are!
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <Link to="/create" className="text-white-50 text-decoration-none small">Create a Quiz</Link>
              <span className="text-muted">•</span>
              <Link to="/q/WQme30Q" className="text-white-50 text-decoration-none small">Prem's Quiz</Link>
              <span className="text-muted">•</span>
              <Link to="/" className="text-white-50 text-decoration-none small">Home</Link>
            </div>
            <p className="text-muted small mb-0">
              Built with Django REST Framework & React. Fully responsive & secure.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
