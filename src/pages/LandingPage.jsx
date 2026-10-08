import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimatedAvatar from '../components/AnimatedAvatar';

export default function LandingPage() {

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 text-center position-relative">
        <Container className="py-md-4">
          <Row className="justify-content-center">
            <Col lg={9} xl={8}>
              {/* Animated Mascot Hero Header */}
              <div className="mb-4">
                <AnimatedAvatar avatarId="cool_boy" size="xl" state="waving" />
              </div>

              <h1 className="display-4 display-md-3 fw-bold text-white mb-3 font-heading lh-sm">
                How well do your friends really know you? <span className="gradient-text">👀</span>
              </h1>

              <p className="fs-5 text-white-50 mb-4 px-md-4">
                Create a 10-question quiz about yourself. Send your private link to friends on WhatsApp. Find out who really knows you best!
              </p>

              <div className="d-flex justify-content-center mb-5">
                <Link
                  to="/create"
                  className="btn-social-primary py-3 px-4 fs-5"
                  id="hero-create-quiz-btn"
                >
                  <i className="bi bi-plus-circle-fill"></i>
                  <span>Create Your Quiz</span>
                </Link>
              </div>

              {/* Live Platform Highlights */}
              <Row className="g-3 justify-content-center">
                <Col xs={4} md={3}>
                  <div className="stat-box">
                    <div className="stat-value gradient-text">10</div>
                    <div className="stat-label">Questions/Quiz</div>
                  </div>
                </Col>
                <Col xs={4} md={3}>
                  <div className="stat-box">
                    <div className="stat-value gradient-text-cyan">4</div>
                    <div className="stat-label">Options/Q</div>
                  </div>
                </Col>
                <Col xs={4} md={3}>
                  <div className="stat-box">
                    <div className="stat-value gradient-text-gold">100%</div>
                    <div className="stat-label">Private & Isolated</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works (Person-to-Person Flow) */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fs-2 fw-bold text-white mb-2 font-heading">
              How Person-to-Person <span className="gradient-text">Quizzes Work</span> 🚀
            </h2>
            <p className="text-white-50">
              Each quiz is privately owned by its creator. Responses remain tied strictly to that creator's quiz!
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="glass-panel p-4 h-100 text-center">
                <div className="mb-3">
                  <AnimatedAvatar avatarId="cool_boy" size="md" state="idle" />
                </div>
                <h3 className="fs-5 fw-bold text-white mb-2">1. Prem Creates His Quiz</h3>
                <p className="text-white-50 small mb-0">
                  Prem picks his avatar, configures 10 questions about himself, previews them, and publishes his private quiz.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="glass-panel p-4 h-100 text-center">
                <div className="fs-1 mb-3">📲</div>
                <h3 className="fs-5 fw-bold text-white mb-2">2. Sends Link to Harsh</h3>
                <p className="text-white-50 small mb-0">
                  Prem copies his private link (e.g. <code>/q/WQme30Q</code>) and sends it directly to Harsh on WhatsApp.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="glass-panel p-4 h-100 text-center">
                <div className="mb-3">
                  <AnimatedAvatar avatarId="cute_boy" size="md" state="celebrating" />
                </div>
                <h3 className="fs-5 fw-bold text-white mb-2">3. Harsh Scores 8/10</h3>
                <p className="text-white-50 small mb-0">
                  Harsh answers Prem's 10 questions. Harsh gets 8/10, stored under Prem's Quiz! Harsh can then make his own separate quiz.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
