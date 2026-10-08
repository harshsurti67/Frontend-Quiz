import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await adminApi.get('/admin/analytics/');
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Unable to load analytics. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading analytics...</div>
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

  if (!analytics) {
    return (
      <div className="text-center py-5">
        <h5 className="text-white mb-3">No analytics data available</h5>
      </div>
    );
  }

  const { overview, quiz_status_distribution, top_creators, categories_breakdown } = analytics;

  return (
    <div>
      <h2 className="text-white font-heading fw-bold mb-4">Analytics</h2>

      {/* Overview Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Total Creators</div>
            <div className="text-white fs-4 fw-bold">{overview.total_creators}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Total Quizzes</div>
            <div className="text-white fs-4 fw-bold">{overview.total_quizzes}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Total Attempts</div>
            <div className="text-white fs-4 fw-bold">{overview.total_attempts}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="glass-panel p-3 rounded-3">
            <div className="text-white-50 small mb-1">Average Score</div>
            <div className="text-white fs-4 fw-bold">{overview.average_score}</div>
          </div>
        </div>
      </div>

      {/* Quiz Status Distribution */}
      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Quiz Status Distribution</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="glass-panel p-3 rounded-3 border border-success border-opacity-25">
              <div className="text-success small mb-1">Published</div>
              <div className="text-white fs-3 fw-bold">{quiz_status_distribution.published}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-3 rounded-3 border border-warning border-opacity-25">
              <div className="text-warning small mb-1">Draft</div>
              <div className="text-white fs-3 fw-bold">{quiz_status_distribution.draft}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-3 rounded-3 border border-danger border-opacity-25">
              <div className="text-danger small mb-1">Disabled</div>
              <div className="text-white fs-3 fw-bold">{quiz_status_distribution.disabled}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Creators */}
      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Top Creators</h5>
        {top_creators && top_creators.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th>Creator</th>
                  <th>Email</th>
                  <th>Total Quizzes</th>
                  <th>Total Attempts</th>
                </tr>
              </thead>
              <tbody>
                {top_creators.map((creator, idx) => (
                  <tr key={creator.id}>
                    <td>
                      <div className="fw-bold">{creator.name}</div>
                      <div className="small text-white-50">#{idx + 1}</div>
                    </td>
                    <td>{creator.email}</td>
                    <td>{creator.total_quizzes}</td>
                    <td className="fw-bold">{creator.total_attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-white-50 py-3">No creator data available</div>
        )}
      </div>

      {/* Categories Breakdown */}
      <div className="glass-panel p-4 rounded-3">
        <h5 className="text-white mb-3">Categories Breakdown</h5>
        {categories_breakdown && categories_breakdown.length > 0 ? (
          <div className="row g-3">
            {categories_breakdown.map((cat) => (
              <div key={cat.name} className="col-md-4">
                <div className="glass-panel p-3 rounded-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fs-4">{cat.icon}</span>
                    <div className="text-white fw-bold">{cat.name}</div>
                  </div>
                  <div className="text-white-50 small">{cat.count} questions</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white-50 py-3">No category data available</div>
        )}
      </div>
    </div>
  );
}
