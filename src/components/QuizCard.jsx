import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  if (!quiz) return null;

  return (
    <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
      <div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="glass-pill text-truncate" style={{ maxWidth: '140px' }}>
            👤 {quiz.creator_name}
          </span>
          <span className="badge bg-secondary bg-opacity-25 text-white-50 border border-secondary border-opacity-25">
            {quiz.total_attempts || 0} Plays
          </span>
        </div>

        <h3 className="fs-5 fw-bold text-white mb-2">
          {quiz.title}
        </h3>

        <p className="text-white-50 small mb-3 line-clamp-2">
          {quiz.description || `Take this 10-question quiz to see how well you know ${quiz.creator_name}!`}
        </p>

        {quiz.tabs && quiz.tabs.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-4">
            {quiz.tabs.slice(0, 4).map((tab) => (
              <span key={tab.id} className="badge bg-dark text-white-50 border border-secondary border-opacity-25">
                {tab.category_icon || '✨'} {tab.title}
              </span>
            ))}
            {quiz.tabs.length > 4 && (
              <span className="badge bg-dark text-white-50 border border-secondary border-opacity-25">
                +{quiz.tabs.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="d-flex gap-2 pt-2">
        <Link
          to={`/q/${quiz.public_id}`}
          className="btn-social-primary flex-grow-1 py-2 text-center text-decoration-none"
          id={`play-quiz-${quiz.public_id}`}
        >
          <i className="bi bi-play-fill"></i>
          <span>Take Quiz</span>
        </Link>
        <Link
          to={`/dashboard?quiz=${quiz.public_id}`}
          className="btn-social-secondary px-3 py-2 text-decoration-none"
          title="View Statistics"
        >
          <i className="bi bi-bar-chart-fill"></i>
        </Link>
      </div>
    </div>
  );
}
