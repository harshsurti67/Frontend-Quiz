import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });

  const fetchQuestions = async (url = null) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.append('category_id', categoryFilter);
      if (sourceFilter) params.append('source', sourceFilter);
      if (searchQuery) params.append('search', searchQuery);
      
      const endpoint = url ? `${url}&${params.toString()}` : `/admin/questions/?${params.toString()}`;
      const res = await adminApi.get(endpoint);
      setQuestions(res.data.results || res.data);
      setPagination({
        count: res.data.count || res.data.length,
        next: res.data.next,
        previous: res.data.previous
      });
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      setError('Unable to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryFilter, sourceFilter, searchQuery]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading questions...</div>
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
        <button className="btn btn-primary" onClick={() => fetchQuestions()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Retry
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3">
          <i className="bi bi-inbox fs-1"></i>
        </div>
        <h5 className="text-white mb-3">No questions found</h5>
        <p className="text-white-50">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white font-heading fw-bold">Questions</h2>
      </div>

      {/* Filters */}
      <div className="glass-panel p-3 mb-4 rounded-3">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select bg-transparent border-secondary border-opacity-25 text-white"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All Sources</option>
              <option value="global">Global Bank</option>
              <option value="creator">Creator Questions</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              placeholder="Category ID"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn btn-outline-secondary text-white w-100"
              onClick={() => { setCategoryFilter(''); setSourceFilter(''); setSearchQuery(''); }}
            >
              <i className="bi bi-x-circle me-2"></i>Clear
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
                <th>Question</th>
                <th>Category</th>
                <th>Source</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>
                    <div className="text-white">{q.text}</div>
                  </td>
                  <td>{q.category_name || '-'}</td>
                  <td>
                    {q.is_global_bank ? (
                      <span className="badge bg-info">Global Bank</span>
                    ) : (
                      <span className="badge bg-secondary">Creator: {q.creator_name || q.quiz_title}</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${q.active ? 'bg-success' : 'bg-secondary'}`}>
                      {q.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(q.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.count > 20 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-white-50 small">Showing {questions.length} of {pagination.count}</span>
          <div className="btn-group">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.previous}
              onClick={() => fetchQuestions(pagination.previous)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={!pagination.next}
              onClick={() => fetchQuestions(pagination.next)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
