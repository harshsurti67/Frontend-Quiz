import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import AnimalCharacter from '../../components/AnimalCharacter';

export default function AdminQuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await adminApi.get(`/admin/quizzes/${id}/`);
        setQuiz(res.data);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
        setError('Unable to load quiz details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleStatusToggle = async (newStatus) => {
    try {
      await adminApi.patch(`/admin/quizzes/${id}/status/`, { status: newStatus });
      setQuiz({ ...quiz, status: newStatus });
    } catch (err) {
      console.error('Failed to update quiz status:', err);
      alert('Failed to update quiz status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading quiz details...</div>
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

  if (!quiz) {
    return (
      <div className="text-center py-5">
        <h5 className="text-white mb-3">Quiz not found</h5>
        <Link to="/admin/quizzes" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>Back to Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/admin/quizzes" className="text-white-50 text-decoration-none mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-2"></i>Back to Quizzes
          </Link>
          <h2 className="text-white font-heading fw-bold mb-0">{quiz.title}</h2>
        </div>
        <div className="btn-group">
          <button
            className={`btn ${quiz.status === 'published' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => handleStatusToggle('published')}
          >
            Publish
          </button>
          <button
            className={`btn ${quiz.status === 'draft' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => handleStatusToggle('draft')}
          >
            Draft
          </button>
          <button
            className={`btn ${quiz.status === 'disabled' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => handleStatusToggle('disabled')}
          >
            Disable
          </button>
        </div>
      </div>

      {/* Quiz Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Status</div>
            <div className={`badge ${
              quiz.status === 'published' ? 'bg-success' :
              quiz.status === 'draft' ? 'bg-warning' : 'bg-danger'
            } fs-6`}>
              {quiz.status}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Questions</div>
            <div className="text-white fs-5 fw-bold">{quiz.questions?.length || 0}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Attempts</div>
            <div className="text-white fs-5 fw-bold">{quiz.attempts_count || 0}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Avg Score</div>
            <div className="text-white fs-5 fw-bold">{quiz.avg_score || 0}</div>
          </div>
        </div>
      </div>

      {/* Quiz Details */}
      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Quiz Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Creator</div>
            <div className="text-white">{quiz.creator_name}</div>
            <div className="text-white-50 small">{quiz.creator_email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Character</div>
            <div className="d-flex align-items-center gap-2">
              {quiz.avatar_id && <AnimalCharacter animal={quiz.avatar_id} expression="idle" size="sm" />}
              <div className="text-white" style={{ textTransform: 'capitalize' }}>{quiz.avatar_id || 'cat'}</div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Public ID</div>
            <div className="text-white font-monospace">{quiz.public_id}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Created</div>
            <div className="text-white">{new Date(quiz.created_at).toLocaleString()}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Updated</div>
            <div className="text-white">{new Date(quiz.updated_at).toLocaleString()}</div>
          </div>
          <div className="col-12">
            <div className="text-white-50 small">Description</div>
            <div className="text-white">{quiz.description || 'No description'}</div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="glass-panel p-4 rounded-3">
        <h5 className="text-white mb-3">Questions ({quiz.questions?.length || 0})</h5>
        {quiz.questions && quiz.questions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {quiz.questions.map((q, idx) => (
                  <tr key={q.id}>
                    <td>{q.order}</td>
                    <td>{q.text}</td>
                    <td>{q.category_name || '-'}</td>
                    <td>
                      {q.options?.find(opt => opt.is_correct)?.text || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-white-50 py-3">No questions found</div>
        )}
      </div>
    </div>
  );
}
