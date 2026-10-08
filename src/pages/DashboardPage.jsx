import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import ShareButton from '../components/ShareButton';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';
import ErrorMessage from '../components/ErrorMessage';
import { getAuthUser, getAuthToken, logoutUser } from '../utils/auth';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizParam = searchParams.get('quiz');
  const token = getAuthToken();
  const user = getAuthUser();

  const [myQuizzes, setMyQuizzes] = useState([]);
  const [activeQuizStats, setActiveQuizStats] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(quizParam || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError('');
      setErrorStatus(null);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch creator's quizzes from /api/my/quizzes/
        const myRes = await quizApi.getMyQuizzes();
        const quizList = myRes.data || [];
        setMyQuizzes(quizList);

        if (quizList.length > 0) {
          const targetPublicId = quizParam || quizList[0].public_id;
          setSelectedQuizId(targetPublicId);

          const statsRes = await quizApi.getQuizStats(targetPublicId);
          setActiveQuizStats(statsRes.data);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
        const status = err.response?.status;
        setErrorStatus(status);

        if (status === 401) {
          logoutUser();
          setError('You need to log in again to view your dashboard.');
        } else if (status === 403) {
          setError("You don't have permission to view these quizzes.");
        } else if (status === 404) {
          setError('No quizzes found.');
        } else if (status >= 500) {
          setError('Something went wrong on the server.');
        } else {
          setError(err.message || 'Unable to connect to the server.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token, quizParam]);

  const handleSelectQuiz = async (publicId) => {
    setSelectedQuizId(publicId);
    setLoading(true);
    setError('');
    try {
      const statsRes = await quizApi.getQuizStats(publicId);
      setActiveQuizStats(statsRes.data);
    } catch (err) {
      console.error('Select quiz stats error:', err);
      setError(err.message || 'Failed to load quiz statistics.');
    } finally {
      setLoading(false);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <LoadingScreen
        message="Loading your quizzes..."
        subtext="Fetching your private quizzes and friend attempts from server..."
      />
    );
  }

  // 2. Unauthenticated State
  if (!token) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel p-5" style={{ maxWidth: '480px', width: '100%' }}>
          <div className="display-3 mb-3">🔐</div>
          <h2 className="fs-3 fw-bold text-white mb-2 font-heading">
            Creator Dashboard Access
          </h2>
          <p className="text-white-50 mb-4 small">
            Sign in to view your created private quizzes, copy share links, and see friend scores.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn-social-primary py-2 px-4">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Sign In</span>
            </Link>
            <Link to="/register" className="btn-social-secondary py-2 px-4">
              <span>Register</span>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  // 3. Error State
  if (error && !myQuizzes.length && !activeQuizStats) {
    return (
      <ErrorMessage
        title="Unable to Load Dashboard"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // 4. Empty Creator Quizzes State
  if (myQuizzes.length === 0 && !activeQuizStats) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel p-5" style={{ maxWidth: '520px', width: '100%' }}>
          <div className="display-3 mb-3">✨</div>
          <h2 className="fs-3 fw-bold text-white mb-2 font-heading">
            You haven't created a quiz yet
          </h2>
          <p className="text-white-50 mb-4 small">
            Create a 10-question private quiz about yourself and send the link to your friends on WhatsApp!
          </p>
          <Link to="/create" className="btn-social-primary py-3 px-4 fs-5">
            <i className="bi bi-plus-circle-fill"></i>
            <span>Create Your First Quiz</span>
          </Link>
        </div>
      </Container>
    );
  }

  const { quiz, total_attempts = 0, average_score = 0, highest_score = 0, lowest_score = 0, recent_attempts = [] } = activeQuizStats || {};

  return (
    <Container className="py-4 py-md-5">
      {/* Top Dashboard Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          {quiz?.avatar_id && (
            <AnimalCharacter animal={quiz.avatar_id} expression="idle" size="md" />
          )}
          <div>
            <span className="glass-pill mb-2">📊 Creator Dashboard</span>
            <h1 className="fs-2 fw-bold text-white mb-1 font-heading">
              {quiz?.title || 'My Private Quizzes'}
            </h1>
            <p className="text-white-50 small mb-0">
              Logged in as <strong>{user?.name || user?.username || 'Creator'}</strong> • Status:{' '}
              <span className={`badge ${quiz?.status === 'published' ? 'bg-success' : 'bg-warning text-dark'} rounded-pill ms-1`}>
                {quiz?.status === 'published' ? '● Published' : 'Draft'}
              </span>
            </p>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          {quiz?.public_id && (
            <Link
              to={`/q/${quiz.public_id}`}
              className="btn-social-primary py-2 px-3 fs-6"
            >
              <i className="bi bi-play-circle-fill"></i>
              <span>Open Quiz Link</span>
            </Link>
          )}
          <Link
            to="/create"
            className="btn-social-secondary py-2 px-3 fs-6"
          >
            <i className="bi bi-plus-circle"></i>
            <span>Create New Quiz</span>
          </Link>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
          {error}
        </Alert>
      )}

      {/* Creator's Quiz Selector (If multiple quizzes exist) */}
      {myQuizzes.length > 0 && (
        <div className="mb-4">
          <label className="text-white-50 small fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.05em' }}>
            MY QUIZZES ({myQuizzes.length})
          </label>
          <div className="d-flex gap-2 overflow-x-auto pb-2">
            {myQuizzes.map((q) => (
              <button
                key={q.public_id}
                type="button"
                className={`btn btn-sm ${selectedQuizId === q.public_id ? 'btn-primary' : 'btn-outline-secondary text-white-50'} rounded-pill px-3 py-2 fw-semibold`}
                onClick={() => handleSelectQuiz(q.public_id)}
                id={`dashboard-quiz-select-${q.public_id}`}
              >
                {q.title} ({q.attempts_count || 0} attempts)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <div className="glass-panel p-3 p-md-4 text-center">
            <div className="fs-2 fs-md-1 mb-1">👥</div>
            <div className="stat-value gradient-text">{total_attempts}</div>
            <div className="stat-label">Total Attempts</div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="glass-panel p-3 p-md-4 text-center">
            <div className="fs-2 fs-md-1 mb-1">🎯</div>
            <div className="stat-value gradient-text-cyan">{average_score ? `${average_score} / 10` : '—'}</div>
            <div className="stat-label">Average Score</div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="glass-panel p-3 p-md-4 text-center">
            <div className="fs-2 fs-md-1 mb-1">🏆</div>
            <div className="stat-value gradient-text-gold">{highest_score ? `${highest_score} / 10` : '—'}</div>
            <div className="stat-label">Highest Score</div>
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="glass-panel p-3 p-md-4 text-center">
            <div className="fs-2 fs-md-1 mb-1">📉</div>
            <div className="stat-value text-white">{lowest_score ? `${lowest_score} / 10` : '—'}</div>
            <div className="stat-label">Lowest Score</div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Friend Attempts Table */}
        <Col xs={12} lg={7}>
          <div className="glass-panel p-3 p-md-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h3 className="fs-5 fw-bold text-white mb-0 font-heading">
                🏆 Friend Attempts & Scores
              </h3>
              <span className="badge bg-secondary bg-opacity-25 text-white-50">
                {recent_attempts.length} Submissions
              </span>
            </div>

            {recent_attempts.length === 0 ? (
              <div className="text-center py-5 text-white-50 small">
                No quiz attempts recorded yet for this quiz. Share your private link on WhatsApp to get responses!
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover table-borderless align-middle mb-0" style={{ background: 'transparent' }}>
                  <thead>
                    <tr className="text-white-50 small border-bottom border-secondary border-opacity-25">
                      <th>Participant</th>
                      <th>Score</th>
                      <th>Percentage</th>
                      <th>Submitted Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_attempts.map((item, idx) => (
                      <tr key={idx} className="border-bottom border-secondary border-opacity-10">
                        <td className="fw-bold text-white">
                          <i className="bi bi-person-circle me-2 text-info"></i>
                          {item.participant_name}
                        </td>
                        <td>
                          <span className="fw-bold text-info fs-6">
                            {item.score} / 10
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${item.percentage >= 80 ? 'bg-success' : item.percentage >= 60 ? 'bg-primary' : 'bg-warning text-dark'} bg-opacity-25 text-white border border-secondary border-opacity-25`}>
                            {item.percentage}%
                          </span>
                        </td>
                        <td className="text-white-50 small">
                          {item.completed_at ? new Date(item.completed_at).toLocaleDateString() : 'Just now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Col>

        {/* Share & Private Link Info */}
        <Col xs={12} lg={5}>
          <div className="glass-panel p-3 p-md-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h3 className="fs-5 fw-bold text-white mb-3 font-heading">
                📲 Share Private Link
              </h3>
              <p className="text-white-50 small mb-4">
                Only friends with this unique link can access your 10-question quiz. Share it on WhatsApp or Instagram!
              </p>

              {quiz?.public_id && (
                <ShareButton
                  creatorName={quiz?.creator_name}
                  quizTitle={quiz?.title}
                  publicId={quiz?.public_id}
                  variant="invite"
                />
              )}
            </div>

            <div className="pt-4 mt-4 border-top border-secondary border-opacity-25">
              <div className="d-flex align-items-center justify-content-between text-white-50 small">
                <span>Quiz Status</span>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">
                  ● Active & Private
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
