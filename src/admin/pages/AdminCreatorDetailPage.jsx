import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminCreatorDetailPage() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await adminApi.get(`/admin/creators/${id}/`);
        setCreator(res.data);
      } catch (err) {
        console.error('Failed to fetch creator:', err);
        setError('Unable to load creator details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [id]);

  const handleToggleStatus = async () => {
    try {
      await adminApi.patch(`/admin/creators/${id}/status/`, { is_active: !creator.is_active });
      setCreator({ ...creator, is_active: !creator.is_active });
    } catch (err) {
      console.error('Failed to toggle creator status:', err);
      alert('Failed to update creator status. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    if (!newPassword || newPassword.length < 6) {
      setResetError('Password must be at least 6 characters.');
      return;
    }
    try {
      await adminApi.resetCreatorPassword(id, newPassword);
      setShowResetModal(false);
      setNewPassword('');
      alert('Password reset successfully!');
      // Refresh creator data to get new password hash
      const res = await adminApi.get(`/admin/creators/${id}/`);
      setCreator(res.data);
    } catch (err) {
      console.error('Failed to reset password:', err);
      setResetError(err.message || 'Failed to reset password. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading creator details...</div>
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

  if (!creator) {
    return (
      <div className="text-center py-5">
        <h5 className="text-white mb-3">Creator not found</h5>
        <Link to="/admin/creators" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>Back to Creators
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/admin/creators" className="text-white-50 text-decoration-none mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-2"></i>Back to Creators
          </Link>
          <h2 className="text-white font-heading fw-bold mb-0">{creator.name || creator.username}</h2>
        </div>
        <button
          className={`btn ${creator.is_active ? 'btn-outline-danger' : 'btn-outline-success'}`}
          onClick={handleToggleStatus}
          disabled={creator.is_superuser}
        >
          {creator.is_active ? 'Disable Account' : 'Enable Account'}
        </button>
      </div>

      {/* Creator Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Status</div>
            <div className={`badge ${creator.is_active ? 'bg-success' : 'bg-danger'} fs-6`}>
              {creator.is_active ? 'Active' : 'Disabled'}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Total Quizzes</div>
            <div className="text-white fs-5 fw-bold">{creator.total_quizzes || 0}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Total Attempts</div>
            <div className="text-white fs-5 fw-bold">{creator.total_attempts || 0}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Avg Score</div>
            <div className="text-white fs-5 fw-bold">{creator.avg_score || 0}</div>
          </div>
        </div>
      </div>

      {/* Creator Details */}
      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Creator Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Username</div>
            <div className="text-white">{creator.username}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Email</div>
            <div className="text-white">{creator.email}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Joined</div>
            <div className="text-white">{new Date(creator.date_joined).toLocaleString()}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="text-white-50 small">Role</div>
            <div>
              {creator.is_superuser && <span className="badge bg-danger me-1">Superuser</span>}
              {creator.is_staff && <span className="badge bg-warning">Staff</span>}
              {!creator.is_staff && !creator.is_superuser && <span className="badge bg-secondary">Creator</span>}
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="text-white-50 small">Password</div>
            <div className="text-white font-monospace small text-break">{creator.plain_password || 'Not set'}</div>
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-warning"
            onClick={() => setShowResetModal(true)}
          >
            <i className="bi bi-key me-2"></i>Reset Password
          </button>
        </div>
      </div>

      {/* Creator's Quizzes */}
      <div className="glass-panel p-4 rounded-3">
        <h5 className="text-white mb-3">Creator's Quizzes ({creator.quizzes?.length || 0})</h5>
        {creator.quizzes && creator.quizzes.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Status</th>
                  <th>Questions</th>
                  <th>Attempts</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {creator.quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>
                      <Link to={`/admin/quizzes/${quiz.id}`} className="text-white text-decoration-none fw-bold">
                        {quiz.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge ${
                        quiz.status === 'published' ? 'bg-success' :
                        quiz.status === 'draft' ? 'bg-warning' : 'bg-danger'
                      }`}>
                        {quiz.status}
                      </span>
                    </td>
                    <td>{quiz.questions_count}</td>
                    <td>{quiz.attempts_count}</td>
                    <td>{new Date(quiz.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/admin/quizzes/${quiz.id}`} className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-white-50 py-3">No quizzes created by this user</div>
        )}
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-panel text-white">
              <div className="modal-header border-secondary border-opacity-25">
                <h5 className="modal-title">Reset Password for {creator?.username}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => { setShowResetModal(false); setNewPassword(''); setResetError(''); }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleResetPassword}>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 characters)"
                      required
                      minLength={6}
                    />
                  </div>
                  {resetError && (
                    <div className="alert alert-danger border-danger bg-danger bg-opacity-10">
                      {resetError}
                    </div>
                  )}
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => { setShowResetModal(false); setNewPassword(''); setResetError(''); }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning">
                      <i className="bi bi-key me-2"></i>Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
