import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import AnimatedAvatar from '../components/AnimatedAvatar';
import LoadingScreen from '../components/LoadingScreen';
import ErrorMessage from '../components/ErrorMessage';

export default function PublicQuizPage() {
  const { publicId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadQuizData() {
      setLoading(true);
      setError('');
      try {
        const res = await quizApi.getQuiz(publicId);
        setQuiz(res.data);
      } catch (err) {
        setError(err.message || 'This quiz is not available right now.');
      } finally {
        setLoading(false);
      }
    }

    if (publicId) {
      loadQuizData();
    }
  }, [publicId]);

  const handleStartQuiz = async (e) => {
    e.preventDefault();
    setError('');

    if (!participantName.trim()) {
      setError('Please enter your name to start the quiz.');
      return;
    }

    setStarting(true);
    try {
      const payload = {
        participant_name: participantName.trim(),
      };

      const res = await quizApi.startAttempt(publicId, payload);
      const attemptId = res.data.attempt_id;
      navigate(`/q/${publicId}/quiz/${attemptId}`);
    } catch (err) {
      setError(err.message || 'Failed to start quiz session.');
      setStarting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading quiz overview..." />;
  }

  if (error && !quiz) {
    return (
      <ErrorMessage
        title="Quiz Unavailable"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const creatorName = quiz?.creator_name || 'Friend';
  const avatarId = quiz?.avatar_id || 'cool_boy';

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={9} lg={7}>
          <div className="glass-panel p-3 p-sm-4 p-md-5 text-center neon-glow">
            {/* Animated Avatar Mascot */}
            <div className="mb-3">
              <AnimatedAvatar avatarId={avatarId} size="xl" state="waving" />
            </div>

            {/* Creator & Quiz Title */}
            <div className="mb-3">
              <span className="glass-pill fs-6 px-3 py-1 mb-2">
                👤 {creatorName}'s Quiz
              </span>
              <h1 className="fs-2 fs-sm-3 fw-bold text-white mb-2 font-heading">
                How well do you know <span className="gradient-text">{creatorName}</span>? 👀
              </h1>
              <p className="text-white-50 small mb-0 px-md-4">
                {quiz?.description || `${creatorName} created this quiz just for his friends. Let's see how well you really know him! 👀`}
              </p>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
              <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-secondary border-opacity-25">
                10 Questions
              </span>
              <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-secondary border-opacity-25">
                4 Options Each
              </span>
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
                {error}
              </Alert>
            )}

            {/* Name Prompt Form */}
            <form onSubmit={handleStartQuiz} className="pt-3 border-top border-secondary border-opacity-25 text-start">
              <div className="mb-4">
                <label className="form-label text-white fw-bold fs-5 mb-2 font-heading" htmlFor="participant-name-input">
                  What's your name? 👋
                </label>
                <input
                  type="text"
                  id="participant-name-input"
                  className="social-input"
                  placeholder="Enter your name or nickname..."
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  maxLength={50}
                  required
                  autoFocus
                />
                <div className="text-white-50 small mt-1">
                  Your score will be sent directly to {creatorName}'s quiz dashboard!
                </div>
              </div>

              <button
                type="submit"
                className="btn-social-primary w-100 py-3 fs-5"
                disabled={starting || !participantName.trim()}
                id="start-quiz-btn"
              >
                {starting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Preparing {creatorName}'s 10 questions...
                  </>
                ) : (
                  <>
                    <i className="bi bi-play-fill fs-4"></i>
                    <span>Start Quiz (10 Questions)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
