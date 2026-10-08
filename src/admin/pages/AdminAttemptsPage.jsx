import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminAttemptsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });

  const fetchAttempts = async (url = null) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const endpoint = url ? `${url}&${params.toString()}` : `/admin/attempts/?${params.toString()}`;
      const res = await adminApi.get(endpoint);
      setAttempts(res.data.results || res.data);
      setPagination({
        count: res.data.count || res.data.length,
        next: res.data.next,
        previous: res.data.previous
      });
    } catch (err) {
      console.error('Failed to fetch attempts:', err);
      setError('Unable to load attempts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, [statusFilter, searchQuery]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading attempts...</div>
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
        <button className="btn btn-primary" onClick={() => fetchAttempts()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Retry
        </button>
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3">
          <i className="bi bi-inbox fs-1"></i>
        </div>
        <h5 className="text-white mb-3">No attempts found</h5>
        <p className="text-white-50">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white font-heading fw-bold">Quiz Attempts</h2>
      </div>

      {/* Filters */}
      <div className="glass-panel p-3 mb-4 rounded-3">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              placeholder="Search attempts..."
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
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
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
                <th>Participant</th>
                <th>Quiz</th>
                <th>Creator</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Started</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id}>
                  <td className="fw-bold">{attempt.participant_name}</td>
                  <td>
                    <div>{attempt.quiz_title}</div>
                    <div className="small text-white-50">{attempt.quiz_public_id}</div>
                  </td>
                  <td>{attempt.creator_name}</td>
                  <td className="fw-bold">{attempt.score}/{attempt.total_questions}</td>
                  <td>
                    <span className={`badge ${
                      attempt.percentage >= 70 ? 'bg-success' :
                      attempt.percentage >= 40 ? 'bg-warning' : 'bg-danger'
                    }`}>
                      {attempt.percentage}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      attempt.status === 'completed' ? 'bg-success' : 'bg-warning'
                    }`}>
                      {attempt.status}
                    </span>
                  </td>
                  <td>{new Date(attempt.started_at).toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/attempts/${attempt.public_id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i> Review
                    </Link>
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
          <span className="text-white-50 small">Showing {attempts.length} of {pagination.count}</span>
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.previous}
              onClick={() => fetchAttempts(pagination.previous)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.next}
              onClick={() => fetchAttempts(pagination.next)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
