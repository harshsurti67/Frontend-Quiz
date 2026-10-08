import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { OPTION_LETTERS } from '../data/constants';
import AnimatedAvatar from './AnimatedAvatar';

export default function QuestionPreviewList({
  creatorName = 'Prem',
  title = 'How Well Do You Know Prem?',
  avatarId = 'cool_boy',
  questions = [],
  onEditQuestions,
  onPublish,
  isPublishing = false,
}) {
  return (
    <div className="glass-panel p-4 p-md-5">
      {/* Header */}
      <div className="text-center mb-4 pb-3 border-bottom border-secondary border-opacity-25">
        <div className="mb-3">
          <AnimatedAvatar avatarId={avatarId} size="lg" state="waving" />
        </div>
        <span className="glass-pill mb-2">📋 Quiz Preview (Draft)</span>
        <h2 className="fs-2 fw-bold text-white mb-1 font-heading">
          {title}
        </h2>
        <p className="text-white-50 small mb-0">
          Created by <strong>{creatorName}</strong> • Exactly 10 Questions
        </p>
      </div>

      {/* 10 Questions Summary */}
      <div className="d-flex flex-column gap-4 mb-4">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="glass-panel p-3 p-md-4 bg-black bg-opacity-30 border border-secondary border-opacity-20">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 rounded-pill">
                Question {qIdx + 1} of 10
              </span>
              <button
                type="button"
                className="btn btn-sm btn-link text-white-50 text-decoration-none p-0"
                onClick={() => onEditQuestions(qIdx)}
              >
                <i className="bi bi-pencil-square me-1"></i>Edit
              </button>
            </div>

            <h3 className="fs-5 fw-bold text-white mb-3">
              {q.text}
            </h3>

            <Row className="g-2">
              {q.options.map((opt, optIdx) => {
                const letter = OPTION_LETTERS[optIdx];
                return (
                  <Col xs={12} sm={6} key={optIdx}>
                    <div className={`p-2 rounded-3 d-flex align-items-center gap-2 border ${opt.is_correct ? 'bg-success bg-opacity-20 border-success text-white' : 'bg-dark bg-opacity-40 border-secondary border-opacity-20 text-white-50'}`}>
                      <span className={`badge ${opt.is_correct ? 'bg-success text-white' : 'bg-secondary text-white-50'} rounded-2`}>
                        {letter}
                      </span>
                      <span className="small fw-semibold text-truncate flex-grow-1">
                        {opt.text}
                      </span>
                      {opt.is_correct && (
                        <span className="badge bg-success text-white small" style={{ fontSize: '0.7rem' }}>
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 pt-3 border-top border-secondary border-opacity-25">
        <button
          type="button"
          className="btn-social-secondary flex-grow-1 py-3"
          onClick={() => onEditQuestions(0)}
          disabled={isPublishing}
        >
          <i className="bi bi-pencil"></i>
          <span>Edit Questions</span>
        </button>

        <button
          type="button"
          className="btn-social-primary flex-grow-1 py-3 fs-5"
          onClick={onPublish}
          disabled={isPublishing}
          id="publish-quiz-btn"
        >
          {isPublishing ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Publishing Quiz...
            </>
          ) : (
            <>
              <i className="bi bi-rocket-takeoff-fill"></i>
              <span>Publish Quiz & Get Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
