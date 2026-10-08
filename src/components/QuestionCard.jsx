import React from 'react';
import AnswerOption from './AnswerOption';

export default function QuestionCard({
  question,
  questionNumber = 1,
  totalQuestions = 10,
  selectedOptionId = null,
  onSelectOption,
  onNext,
  isLastQuestion = false,
  isSubmitting = false,
  onExpressionChange,
}) {
  if (!question) return null;

  return (
    <div className="glass-panel p-3 p-sm-4 p-md-5">
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <span className="glass-pill">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="badge bg-secondary bg-opacity-25 text-white-50">
          Pick 1 Option
        </span>
      </div>

      <h2 className="fs-4 fs-sm-5 fw-bold text-white mb-4 lh-sm">
        {question.text}
      </h2>

      {/* 4 Compact Options */}
      <div className="d-flex flex-column gap-2 mb-4">
        {question.options && question.options.map((opt, idx) => (
          <AnswerOption
            key={opt.id}
            option={opt}
            index={idx}
            isSelected={selectedOptionId === opt.id}
            onSelect={(optionId) => {
              onSelectOption(optionId);
              if (onExpressionChange) {
                onExpressionChange('happy');
              }
            }}
            disabled={isSubmitting}
          />
        ))}
      </div>

      <div className="d-flex justify-content-end pt-2">
        <button
          type="button"
          className="btn-social-primary w-100 py-3 fs-5"
          onClick={onNext}
          disabled={!selectedOptionId || isSubmitting}
          id="quiz-next-btn"
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Calculating your score...
            </>
          ) : isLastQuestion ? (
            <>
              <span>Submit & Reveal Score</span>
              <span>🔥</span>
            </>
          ) : (
            <>
              <span>Next Question</span>
              <i className="bi bi-arrow-right"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
