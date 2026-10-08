import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });

  const fetchQuizzes = async (url = null) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const endpoint = url ? `${url}&${params.toString()}` : `/admin/quizzes/?${params.toString()}`;
      const res = await adminApi.get(endpoint);
      setQuizzes(res.data.results || res.data);
      setPagination({
        count: res.data.count || res.data.length,
        next: res.data.next,
        previous: res.data.previous
      });
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
      setError('Unable to load quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [statusFilter, searchQuery]);

  const handleStatusToggle = async (quizId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'disabled' : 'published';
    try {
      await adminApi.patch(`/admin/quizzes/${quizId}/status/`, { status: newStatus });
      fetchQuizzes();
    } catch (err) {
      console.error('Failed to update quiz status:', err);
      alert('Failed to update quiz status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading quizzes...</div>
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
        <button className="btn btn-primary" onClick={() => fetchQuizzes()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Retry
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3">
          <i className="bi bi-inbox fs-1"></i>
        </div>
        <h5 className="text-white mb-3">No quizzes found</h5>
        <p className="text-white-50">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white font-heading fw-bold">Quizzes</h2>
      </div>

      {/* Filters */}
      <div className="glass-panel p-3 mb-4 rounded-3">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select bg-transparent border-secondary border-opacity-25 text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="col-md-5 text-end">
            <button
              className="btn btn-outline-secondary text-white"
              onClick={() => { setStatusFilter(''); setSearchQuery(''); }}
            >
              <i className="bi bi-x-circle me-2"></i>Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Creator</th>
                <th>Status</th>
                <th>Questions</th>
                <th>Attempts</th>
                <th>Avg Score</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td>
                    <Link to={`/admin/quizzes/${quiz.id}`} className="text-white text-decoration-none fw-bold">
                      {quiz.title}
                    </Link>
                    <div className="small text-white-50">{quiz.public_id}</div>
                  </td>
                  <td>
                    <div>{quiz.creator_name}</div>
                    <div className="small text-white-50">{quiz.creator_username}</div>
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
                  <td>-</td>
                  <td>{new Date(quiz.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/admin/quizzes/${quiz.id}`} className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleStatusToggle(quiz.id, quiz.status)}
                      >
                        <i className="bi bi-power"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.count > 20 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-white-50 small">Showing {quizzes.length} of {pagination.count}</span>
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.previous}
              onClick={() => fetchQuizzes(pagination.previous)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.next}
              onClick={() => fetchQuizzes(pagination.next)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
