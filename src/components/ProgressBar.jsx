import React from 'react';

export default function ProgressBar({ current = 1, total = 10, categoryName, categoryIcon }) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2 text-white-50 small">
        <div className="d-flex align-items-center gap-2">
          {categoryIcon && <span>{categoryIcon}</span>}
          <span className="fw-bold text-white text-uppercase" style={{ letterSpacing: '0.05em' }}>
            {categoryName || 'Quiz in Progress'}
          </span>
        </div>
        <div className="fw-bold text-white">
          <span>Question {current}</span>
          <span className="text-white-50"> of {total}</span>
          <span className="ms-2 badge bg-dark border border-secondary border-opacity-25">{percentage}%</span>
        </div>
      </div>

      <div className="social-progress-track">
        <div
          className="social-progress-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}
