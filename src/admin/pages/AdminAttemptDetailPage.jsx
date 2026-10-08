import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminAttemptDetailPage() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttempt = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await adminApi.get(`/admin/attempts/${id}/`);
        setAttempt(res.data);
      } catch (err) {
        console.error('Failed to fetch attempt:', err);
        setError('Unable to load attempt details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAttempt();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading attempt details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="text-danger mb-3">
          <i className="bi bi-exclamation-triangle fs-1"></i>
        </div>
        <h5 className="text-white mb-3">{error}</h5>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Retry
        </button>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="text-center py-5">
        <h5 className="text-white mb-3">Attempt not found</h5>
        <Link to="/admin/attempts" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>Back to Attempts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/admin/attempts" className="text-white-50 text-decoration-none mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-2"></i>Back to Attempts
          </Link>
          <h2 className="text-white font-heading fw-bold mb-0">Attempt Review</h2>
        </div>
      </div>

      {/* Attempt Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Participant</div>
            <div className="text-white fs-5 fw-bold">{attempt.participant_name}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Score</div>
            <div className="text-white fs-5 fw-bold">{attempt.score}/{attempt.total_questions}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Percentage</div>
            <div className={`text-white fs-5 fw-bold ${
              attempt.percentage >= 70 ? 'text-success' :
              attempt.percentage >= 40 ? 'text-warning' : 'text-danger'
            }`}>
              {attempt.percentage}%
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Status</div>
            <div className={`badge ${
              attempt.status === 'completed' ? 'bg-success' : 'bg-warning'
            } fs-6`}>
              {attempt.status}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Quiz Information</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Quiz Title</div>
            <div className="text-white">{attempt.quiz_title}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Creator</div>
            <div className="text-white">{attempt.creator_name}</div>
            <div className="text-white-50 small">{attempt.creator_email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Started</div>
            <div className="text-white">{new Date(attempt.started_at).toLocaleString()}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Completed</div>
            <div className="text-white">{attempt.completed_at ? new Date(attempt.completed_at).toLocaleString() : 'Not completed'}</div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="glass-panel p-4 rounded-3">
        <h5 className="text-white mb-3">Question-by-Question Review</h5>
        {attempt.answers && attempt.answers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Question</th>
                  <th>Selected Answer</th>
                  <th>Correct Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {attempt.answers.map((answer, idx) => (
                  <tr key={answer.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{answer.question_text}</td>
                    <td>{answer.selected_option_text}</td>
                    <td>{answer.correct_option?.text || '-'}</td>
                    <td>
                      <span className={`badge ${answer.is_correct ? 'bg-success' : 'bg-danger'}`}>
                        {answer.is_correct ? 'Correct' : 'Incorrect'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-white-50 py-3">No answers recorded</div>
        )}
      </div>
    </div>
  );
}
