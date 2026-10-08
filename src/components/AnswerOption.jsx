import React from 'react';
import { OPTION_LETTERS } from '../data/constants';

export default function AnswerOption({
  option,
  index = 0,
  isSelected = false,
  onSelect,
  disabled = false,
}) {
  const letter = OPTION_LETTERS[index] || String.fromCharCode(65 + index);

  return (
    <button
      type="button"
      className={`quiz-compact-option ${isSelected ? 'selected' : ''}`}
      onClick={() => !disabled && onSelect(option.id)}
      disabled={disabled}
      id={`option-btn-${option.id}`}
    >
      <div className="compact-option-badge">
        {letter}
      </div>
      <div className="compact-option-text">
        {option.text}
      </div>
      <div className="compact-radio-circle">
        {isSelected && <div className="compact-radio-dot" />}
      </div>
    </button>
  );
}
