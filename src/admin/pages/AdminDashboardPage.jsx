import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.getDashboard();
      setData(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError('Unable to load admin dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50 small">Loading Admin Dashboard Overview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-5 text-center my-4">
        <div className="text-danger fs-1 mb-2"><i className="bi bi-exclamation-circle"></i></div>
        <h4 className="text-white fw-bold mb-2">Unable to Load Data</h4>
        <p className="text-white-50 mb-4">{error}</p>
        <button type="button" className="btn-social-primary py-2 px-4" onClick={fetchDashboard}>
          <i className="bi bi-arrow-clockwise me-2"></i>Try Again
        </button>
      </div>
    );
  }

  const { stats, recent_quizzes, recent_attempts } = data || {};

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-extrabold text-white mb-1 font-heading">
            Admin Dashboard
          </h2>
          <p className="text-white-50 small mb-0">
            Welcome back, System Admin 👋 Here is your site-wide overview.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-light btn-sm rounded-3 py-2 px-3"
          onClick={fetchDashboard}
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {/* 6 Modern Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Creators</span>
              <div className="stat-icon stat-icon-purple"><i className="bi bi-people-fill"></i></div>
            </div>
            <div className="stat-value">{stats?.total_creators || 0}</div>
            <div className="small text-white-50 mt-1">Registered account owners</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Total Quizzes</span>
              <div className="stat-icon stat-icon-pink"><i className="bi bi-journal-text"></i></div>
            </div>
            <div className="stat-value">{stats?.total_quizzes || 0}</div>
            <div className="small text-white-50 mt-1">
              <span className="text-success fw-bold me-1">{stats?.published_quizzes || 0} Published</span> • {stats?.draft_quizzes || 0} Drafts
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Total Attempts</span>
              <div className="stat-icon stat-icon-cyan"><i className="bi bi-controller"></i></div>
            </div>
            <div className="stat-value">{stats?.total_attempts || 0}</div>
            <div className="small text-white-50 mt-1">{stats?.completed_attempts || 0} Completed sessions</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Average Score</span>
              <div className="stat-icon stat-icon-emerald"><i className="bi bi-award-fill"></i></div>
            </div>
            <div className="stat-value">{stats?.average_score || 0} / 10</div>
            <div className="small text-white-50 mt-1">Overall quiz performance</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Published Quizzes</span>
              <div className="stat-icon stat-icon-emerald"><i className="bi bi-check-circle-fill"></i></div>
            </div>
            <div className="stat-value">{stats?.published_quizzes || 0}</div>
            <div className="small text-white-50 mt-1">Active private quizzes</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-white-50 small font-heading fw-bold uppercase">Drafts / Disabled</span>
              <div className="stat-icon stat-icon-amber"><i className="bi bi-slash-circle-fill"></i></div>
            </div>
            <div className="stat-value">{(stats?.draft_quizzes || 0) + (stats?.disabled_quizzes || 0)}</div>
            <div className="small text-white-50 mt-1">{stats?.disabled_quizzes || 0} Disabled quizzes</div>
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Quizzes & Recent Attempts */}
      <div className="row g-4">
        {/* Recent Quizzes */}
        <div className="col-12 col-xl-6">
          <div className="admin-table-container p-3 p-md-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-white mb-0 font-heading">
                Recent Quizzes
              </h5>
              <Link to="/admin/quizzes" className="small text-pink text-decoration-none fw-bold">
                View All →
              </Link>
            </div>

            {recent_quizzes?.length === 0 ? (
              <div className="text-center text-white-50 py-4 small">No quizzes created yet.</div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Creator</th>
                      <th>Quiz Title</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_quizzes?.map((q) => (
                      <tr key={q.id}>
                        <td className="fw-bold">{q.creator_name || 'Anonymous'}</td>
                        <td>
                          <Link to={`/admin/quizzes/${q.id}`} className="text-white text-decoration-none font-heading hover-pink">
                            {q.title}
                          </Link>
                        </td>
                        <td>
                          <span className={`badge ${
                            q.status === 'published' ? 'bg-success' : q.status === 'draft' ? 'bg-secondary' : 'bg-danger'
                          }`}>
                            {q.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/quizzes/${q.id}`} className="btn btn-sm btn-outline-light rounded-2 py-1 px-2">
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="col-12 col-xl-6">
          <div className="admin-table-container p-3 p-md-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold text-white mb-0 font-heading">
                Recent Quiz Attempts
              </h5>
              <Link to="/admin/attempts" className="small text-cyan text-decoration-none fw-bold">
                View All →
              </Link>
            </div>

            {recent_attempts?.length === 0 ? (
              <div className="text-center text-white-50 py-4 small">No quiz attempts yet.</div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Quiz Title</th>
                      <th>Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent_attempts?.map((a) => (
                      <tr key={a.id}>
                        <td className="fw-bold">{a.participant_name}</td>
                        <td className="text-white-50 small">{a.quiz_title}</td>
                        <td>
                          <span className="badge bg-purple px-2 py-1">
                            {a.score} / {a.total_questions}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/attempts/${a.public_id}`} className="btn btn-sm btn-outline-light rounded-2 py-1 px-2">
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
