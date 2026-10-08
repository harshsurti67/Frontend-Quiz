import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCreators = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page };
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.is_active = statusFilter;

      const res = await adminApi.getCreators(params);
      if (res.data.results) {
        setCreators(res.data.results);
        setTotalCount(res.data.count);
      } else {
        setCreators(res.data);
        setTotalCount(res.data.length);
      }
    } catch (err) {
      console.error("Creators fetch error:", err);
      setError('Unable to load creators list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCreators();
  };

  const confirmToggleStatus = (creator) => {
    setSelectedCreator(creator);
    setShowModal(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedCreator) return;
    try {
      await adminApi.toggleCreatorStatus(selectedCreator.id, !selectedCreator.is_active);
      setShowModal(false);
      setSelectedCreator(null);
      fetchCreators();
    } catch (err) {
      alert(err.message || 'Failed to update creator status.');
    }
  };

  const totalPages = Math.ceil(totalCount / 20) || 1;

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-extrabold text-white mb-1 font-heading">
            Registered Creators
          </h2>
          <p className="text-white-50 small mb-0">
            Manage all creator accounts, quiz ownership, and access status.
          </p>
        </div>
        <span className="badge bg-secondary bg-opacity-25 text-white fs-6 px-3 py-2 border border-secondary border-opacity-25">
          Total Creators: {totalCount}
        </span>
      </div>

      {/* Search & Filters */}
      <div className="admin-table-container p-3 mb-4">
        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-secondary border-opacity-25 text-white shadow-none"
                placeholder="Search by creator name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn-social-primary py-2 px-3">
                Search
              </button>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <select
              className="form-select bg-dark border-secondary border-opacity-25 text-white shadow-none"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="true">Active Only</option>
              <option value="false">Disabled Only</option>
            </select>
          </div>

          <div className="col-6 col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-light py-2 px-3 rounded-3"
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setPage(1);
                fetchCreators();
              }}
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>

      {/* Creators Data Table */}
      <div className="admin-table-container p-3 p-md-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-pink mb-2"></div>
            <div className="text-white-50 small">Loading Creators...</div>
          </div>
        ) : error ? (
          <div className="text-center text-danger py-4">
            {error} <br />
            <button className="btn btn-sm btn-outline-light mt-2" onClick={fetchCreators}>Try Again</button>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center text-white-50 py-5">
            <i className="bi bi-people fs-1 text-white-50 mb-2 d-block"></i>
            <div>No creators found matching your criteria.</div>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Creator Name</th>
                    <th>Email</th>
                    <th>Quizzes</th>
                    <th>Attempts</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-bold">
                        <Link to={`/admin/creators/${c.id}`} className="text-white text-decoration-none hover-pink">
                          {c.name || c.username}
                        </Link>
                        {c.is_superuser && (
                          <span className="badge bg-danger ms-2 uppercase" style={{ fontSize: '0.65rem' }}>Superadmin</span>
                        )}
                      </td>
                      <td className="text-white-50">{c.email || 'N/A'}</td>
                      <td>
                        <span className="badge bg-purple px-2 py-1">{c.quizzes_count || 0} quizzes</span>
                      </td>
                      <td>
                        <span className="badge bg-cyan text-dark px-2 py-1">{c.attempts_count || 0} attempts</span>
                      </td>
                      <td className="text-white-50 small">
                        {new Date(c.date_joined).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td>
                        <span className={`badge ${c.is_active ? 'bg-success' : 'bg-danger'}`}>
                          {c.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Link to={`/admin/creators/${c.id}`} className="btn btn-sm btn-outline-info rounded-2 py-1 px-2">
                            <i className="bi bi-eye me-1"></i> View
                          </Link>
                          {!c.is_superuser && (
                            <button
                              type="button"
                              className={`btn btn-sm ${c.is_active ? 'btn-outline-danger' : 'btn-outline-success'} rounded-2 py-1 px-2`}
                              onClick={() => confirmToggleStatus(c)}
                            >
                              {c.is_active ? 'Disable' : 'Enable'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary border-opacity-25">
                <span className="small text-white-50">
                  Page {page} of {totalPages} ({totalCount} items)
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-light btn-sm px-3"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ← Previous
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm px-3"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Safe Action Confirmation Modal */}
      {showModal && selectedCreator && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="glass-panel modal-content border-secondary p-3">
              <div className="modal-header border-bottom border-secondary border-opacity-25">
                <h5 className="modal-title text-white fw-bold">
                  Confirm Account Status Change
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-white-50 my-2">
                Are you sure you want to {selectedCreator.is_active ? 'disable' : 'enable'} creator account 
                <strong className="text-white mx-1">{selectedCreator.name || selectedCreator.username}</strong>?
                {selectedCreator.is_active && (
                  <div className="alert alert-warning bg-warning bg-opacity-10 border-warning text-warning mt-3 mb-0 small">
                    <i className="bi bi-exclamation-triangle me-1"></i> Disabling this account will restrict the creator from accessing their dashboard.
                  </div>
                )}
              </div>
              <div className="modal-footer border-top border-secondary border-opacity-25">
                <button type="button" className="btn btn-outline-secondary text-white" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${selectedCreator.is_active ? 'btn-danger' : 'btn-success'} font-heading fw-bold px-4`}
                  onClick={handleToggleStatus}
                >
                  {selectedCreator.is_active ? 'Disable Creator' : 'Enable Creator'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
