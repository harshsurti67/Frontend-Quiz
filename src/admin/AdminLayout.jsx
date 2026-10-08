import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminGuard from './AdminGuard';
import { adminApi } from '../services/api';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length >= 2) {
      setIsSearching(true);
      setShowSearchDropdown(true);
      try {
        const res = await adminApi.globalSearch(val.trim());
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults(null);
      setShowSearchDropdown(false);
    }
  };

  return (
    <AdminGuard>
      <div className="admin-wrapper d-flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="admin-main flex-grow-1 d-flex flex-column min-vh-100">
          {/* Top Admin Header */}
          <header className="admin-header d-flex align-items-center justify-content-between px-3 px-md-4 py-3 sticky-top">
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary text-white border-secondary border-opacity-50 d-lg-none py-1 px-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle Sidebar"
              >
                <i className="bi bi-list fs-4"></i>
              </button>

              {/* Global Search Bar */}
              <div className="position-relative admin-search-bar" style={{ maxWidth: '380px', width: '100%' }}>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-secondary border-opacity-25 text-white-50">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-secondary border-opacity-25 text-white placeholder-muted shadow-none"
                    placeholder="Search creators, quizzes, attempts..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="btn bg-transparent border-secondary border-opacity-25 text-white-50"
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchDropdown(false);
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                </div>

                {/* Real Database Global Search Dropdown */}
                {showSearchDropdown && searchResults && (
                  <div
                    className="position-absolute top-100 start-0 end-0 bg-dark border border-secondary rounded-3 shadow-lg p-3 mt-2 z-3 overflow-y-auto"
                    style={{ maxHeight: '350px' }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-white-50 fw-bold uppercase">Search Results</span>
                      <button
                        type="button"
                        className="btn-close btn-close-white btn-sm"
                        onClick={() => setShowSearchDropdown(false)}
                      ></button>
                    </div>

                    {isSearching ? (
                      <div className="text-center py-3 text-white-50 small">Searching database...</div>
                    ) : (
                      <>
                        {/* Creators */}
                        {searchResults.creators?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-pink small fw-bold mb-1">Creators</div>
                            {searchResults.creators.map((c) => (
                              <Link
                                key={c.id}
                                to={`/admin/creators/${c.id}`}
                                className="d-block text-white text-decoration-none p-2 rounded hover-bg-glass small"
                                onClick={() => setShowSearchDropdown(false)}
                              >
                                👤 <span className="fw-bold">{c.name || c.username}</span> ({c.email})
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Quizzes */}
                        {searchResults.quizzes?.length > 0 && (
                          <div className="mb-3">
                            <div className="text-cyan small fw-bold mb-1">Quizzes</div>
                            {searchResults.quizzes.map((q) => (
                              <Link
                                key={q.id}
                                to={`/admin/quizzes/${q.id}`}
                                className="d-block text-white text-decoration-none p-2 rounded hover-bg-glass small"
                                onClick={() => setShowSearchDropdown(false)}
                              >
                                📝 <span className="fw-bold">{q.title}</span> — by {q.creator_name} ({q.public_id})
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Attempts */}
                        {searchResults.attempts?.length > 0 && (
                          <div>
                            <div className="text-warning small fw-bold mb-1">Attempts</div>
                            {searchResults.attempts.map((a) => (
                              <Link
                                key={a.id}
                                to={`/admin/attempts/${a.public_id}`}
                                className="d-block text-white text-decoration-none p-2 rounded hover-bg-glass small"
                                onClick={() => setShowSearchDropdown(false)}
                              >
                                🎯 <span className="fw-bold">{a.participant_name}</span> on {a.quiz_title} ({a.score}/{a.total_questions})
                              </Link>
                            ))}
                          </div>
                        )}

                        {searchResults.creators?.length === 0 &&
                          searchResults.quizzes?.length === 0 &&
                          searchResults.attempts?.length === 0 && (
                            <div className="text-center text-white-50 py-2 small">
                              No matching records found.
                            </div>
                          )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Admin Header Actions */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/dashboard" className="btn btn-outline-light btn-sm rounded-3 d-none d-md-inline-flex align-items-center gap-1">
                <i className="bi bi-box-arrow-up-right"></i>
                <span>Creator View</span>
              </Link>
              <div className="d-flex align-items-center gap-2">
                <div className="avatar-circle-sm bg-danger text-white fw-bold d-flex align-items-center justify-content-center rounded-circle" style={{ width: 36, height: 36 }}>
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-grow-1 p-3 p-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
