import React from 'react';

export default function QuizTabs({ tabs = [], activeTabId, onSelectTab }) {
  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2 px-1">
        <span className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '0.06em' }}>
          Select Quiz Tab ({tabs.length}/10)
        </span>
        <span className="badge bg-dark text-white-50 border border-secondary border-opacity-25">
          1 Active Tab Only
        </span>
      </div>

      <div className="quiz-tabs-container">
        {tabs.slice(0, 10).map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`quiz-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
              id={`tab-btn-${tab.id}`}
            >
              <span>{tab.category_icon || '✨'}</span>
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
