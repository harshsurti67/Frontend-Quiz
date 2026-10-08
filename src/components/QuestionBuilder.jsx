import React, { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { OPTION_LETTERS } from '../data/constants';

const GENERATED_PERSONAL_QUESTIONS_BANK = [
  {
    text: "What is {name}'s all-time favorite food?",
    options: ["Pizza", "Spicy Biryani", "Cheeseburger", "Pasta"],
    correctIndex: 1,
  },
  {
    text: "Where is {name}'s dream vacation destination?",
    options: ["Tokyo, Japan", "Swiss Alps", "Iceland Lights", "Bali Beach"],
    correctIndex: 0,
  },
  {
    text: "Which movie could {name} rewatch 10 times?",
    options: ["Interstellar", "The Dark Knight", "Inception", "Avengers Endgame"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s biggest pet peeve?",
    options: ["Chronic lateness", "Dishonesty & fake vibes", "Loud chewing", "People texting while talking"],
    correctIndex: 1,
  },
  {
    text: "How does {name} take caffeine in the morning?",
    options: ["Black Espresso", "Sweet Iced Latte", "Hot Masala Chai", "Matcha Green Tea"],
    correctIndex: 1,
  },
  {
    text: "What time of the day is {name}'s peak energy state?",
    options: ["Late Night Owl (12-3 AM)", "Early Sunrise (6 AM)", "Golden Hour Sunset (5 PM)", "High Noon Lunchtime (12 PM)"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s primary personality vibe?",
    options: ["Chill & Ambivert", "Wild Extrovert", "Quiet Introvert", "Workaholic Thinker"],
    correctIndex: 0,
  },
  {
    text: "What is {name}'s most used emoji in chat?",
    options: ["💀 Skull", "😂 Laughing Crying", "👀 Side Eyes", "🔥 Fire"],
    correctIndex: 0,
  },
  {
    text: "How many alarms does {name} set to wake up?",
    options: ["1 Alarm", "5+ Alarms", "No Alarm", "10 Alarms"],
    correctIndex: 1,
  },
  {
    text: "What is the best way to cheer {name} up when down?",
    options: ["Bring good food & snacks", "Long drive with great music", "Sit together in quiet comfort", "Go outside and party"],
    correctIndex: 0,
  },
];

export default function QuestionBuilder({
  questions = [],
  onUpdateQuestion,
  onProceedToPreview,
  creatorName = 'Prem',
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [validationError, setValidationError] = useState('');

  const currentQ = questions[currentIdx] || {
    order: currentIdx + 1,
    text: '',
    options: [
      { text: '', is_correct: true, order: 0 },
      { text: '', is_correct: false, order: 1 },
      { text: '', is_correct: false, order: 2 },
      { text: '', is_correct: false, order: 3 },
    ],
  };

  const handleTextChange = (text) => {
    onUpdateQuestion(currentIdx, { ...currentQ, text });
  };

  const handleOptionChange = (optIdx, text) => {
    const newOptions = [...currentQ.options];
    newOptions[optIdx] = { ...newOptions[optIdx], text };
    onUpdateQuestion(currentIdx, { ...currentQ, options: newOptions });
  };

  const handleSetCorrect = (optIdx) => {
    const newOptions = currentQ.options.map((opt, i) => ({
      ...opt,
      is_correct: i === optIdx,
    }));
    onUpdateQuestion(currentIdx, { ...currentQ, options: newOptions });
  };

  // Generate / Auto-fill content FOR THE CURRENT QUESTION
  // Does NOT jump to next question automatically - creator remains on current question!
  const handleAutoFillCurrentQuestion = () => {
    setValidationError('');
    const template = GENERATED_PERSONAL_QUESTIONS_BANK[currentIdx % GENERATED_PERSONAL_QUESTIONS_BANK.length];
    const personalizedText = template.text.replace(/{name}/g, creatorName || 'Prem');
    const newOptions = template.options.map((optText, i) => ({
      text: optText,
      is_correct: i === template.correctIndex,
      order: i,
    }));

    onUpdateQuestion(currentIdx, {
      order: currentIdx + 1,
      text: personalizedText,
      options: newOptions,
    });
  };

  const validateQuestionIdx = (idx) => {
    const q = questions[idx] || (idx === currentIdx ? currentQ : null);
    if (!q || !q.text?.trim()) return `Please enter a question for Question ${idx + 1}.`;
    for (let i = 0; i < 4; i++) {
      if (!q.options[i]?.text?.trim()) {
        return `Please fill in Option ${OPTION_LETTERS[i]} for Question ${idx + 1}.`;
      }
    }
    if (!q.options.some((o) => o.is_correct)) {
      return `Please select the correct answer for Question ${idx + 1}.`;
    }
    return null;
  };

  // Save & Next Action - advances to next question only when clicked!
  const handleSaveAndNext = () => {
    setValidationError('');
    const error = validateQuestionIdx(currentIdx);
    if (error) {
      setValidationError(error);
      return;
    }

    if (currentIdx < 9) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      for (let i = 0; i < 10; i++) {
        const err = validateQuestionIdx(i);
        if (err) {
          setValidationError(err);
          setCurrentIdx(i);
          return;
        }
      }
      onProceedToPreview();
    }
  };

  const isQuestionComplete = (idx) => {
    const q = questions[idx];
    if (!q || !q.text?.trim()) return false;
    if (!q.options || q.options.length !== 4) return false;
    return q.options.every((o) => o.text?.trim()) && q.options.some((o) => o.is_correct);
  };

  const completedCount = questions.filter((_, i) => isQuestionComplete(i)).length;
  const allCompleted = questions.length === 10 && completedCount === 10;

  return (
    <div className="glass-panel p-3 p-sm-4 p-md-5">
      {/* Header & Stepper (1 to 10) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span className="text-white-50 small fw-bold text-uppercase" style={{ letterSpacing: '0.06em' }}>
            QUESTION {currentIdx + 1} OF 10
          </span>
          <span className="badge bg-secondary bg-opacity-25 text-white-50 fs-6 px-3 py-1">
            {completedCount}/10 Completed
          </span>
        </div>

        {/* Stepper Buttons: 1 ✓  2 ✓  3 ✓ ... 10 */}
        <div className="d-flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const isCompleted = isQuestionComplete(i);
            const isCurrent = currentIdx === i;
            return (
              <button
                key={i}
                type="button"
                className={`stepper-pill ${isCurrent ? 'stepper-current' : isCompleted ? 'stepper-complete' : 'stepper-pending'}`}
                onClick={() => {
                  setValidationError('');
                  setCurrentIdx(i);
                }}
                id={`stepper-q-${i + 1}`}
              >
                <span>{i + 1}</span>
                {isCompleted && <i className="bi bi-check-lg ms-1"></i>}
              </button>
            );
          })}
        </div>
      </div>

      {validationError && (
        <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4 py-2">
          {validationError}
        </Alert>
      )}

      {/* Question Text Input Header with [+ Add Question] Auto-Fill Button positioned ABOVE (Top Right) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <label className="text-white fw-bold fs-5 mb-0 font-heading">
            Question Text <span className="text-danger">*</span>
          </label>

          {/* Button ABOVE Question Text (Top Right) to auto-fill current question */}
          <button
            type="button"
            className="btn-social-primary py-2 px-3 fs-6"
            onClick={handleAutoFillCurrentQuestion}
            id="autofill-current-q-btn"
            title="Auto-fill this question with a sample question & options"
          >
            <i className="bi bi-magic me-1"></i>
            <span>+ Add Question</span>
          </button>
        </div>

        <input
          type="text"
          className="social-input"
          placeholder={`e.g. What is ${creatorName}'s favorite food?`}
          value={currentQ.text}
          onChange={(e) => handleTextChange(e.target.value)}
          id="builder-question-text"
          autoFocus
        />
      </div>

      {/* 4 Options & Correct Answer Selector */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <label className="text-white fw-bold mb-0 font-heading fs-6">
            Options & Correct Answer <span className="text-danger">*</span>
          </label>
          <span className="text-white-50 small">
            Click [ Mark Correct ] on the correct option
          </span>
        </div>

        <Row className="g-2">
          {currentQ.options.map((opt, optIdx) => {
            const letter = OPTION_LETTERS[optIdx];
            return (
              <Col xs={12} key={optIdx}>
                <div className={`builder-option-row ${opt.is_correct ? 'builder-option-correct' : ''}`}>
                  <div className="builder-option-badge">
                    {letter}
                  </div>

                  <input
                    type="text"
                    className="social-input builder-option-input"
                    placeholder={`Option ${letter} text`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    id={`builder-opt-${optIdx}`}
                  />

                  <button
                    type="button"
                    className={`builder-correct-radio-btn ${opt.is_correct ? 'active' : ''}`}
                    onClick={() => handleSetCorrect(optIdx)}
                    id={`builder-set-correct-${optIdx}`}
                  >
                    <i className={`bi ${opt.is_correct ? 'bi-check-circle-fill text-success fs-5' : 'bi-circle text-muted fs-5'}`}></i>
                    <span className="small">
                      {opt.is_correct ? 'Correct Answer' : 'Mark Correct'}
                    </span>
                  </button>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      {/* Navigation Footer - Clean Previous / Save & Next */}
      <div className="d-flex align-items-center justify-content-between gap-3 pt-3 border-top border-secondary border-opacity-25 flex-wrap">
        <button
          type="button"
          className="btn-social-secondary py-2 px-4"
          onClick={() => {
            setValidationError('');
            setCurrentIdx((prev) => Math.max(0, prev - 1));
          }}
          disabled={currentIdx === 0}
        >
          <i className="bi bi-arrow-left me-1"></i>
          <span>Previous</span>
        </button>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* Save & Next / Preview Button */}
          {allCompleted ? (
            <button
              type="button"
              className="btn btn-outline-light py-2 px-3 fw-bold rounded-3"
              onClick={onProceedToPreview}
            >
              <i className="bi bi-eye me-1"></i>
              <span>Preview Quiz (10/10)</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-social-primary py-2 px-4 fs-5"
              onClick={handleSaveAndNext}
              id="builder-next-btn"
            >
              {currentIdx === 9 ? (
                <>
                  <span>Preview All 10 Questions</span>
                  <i className="bi bi-check2-all ms-1"></i>
                </>
              ) : (
                <>
                  <span>Save & Next</span>
                  <i className="bi bi-arrow-right ms-1"></i>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
