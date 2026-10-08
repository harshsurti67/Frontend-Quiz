import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { quizApi } from '../services/api';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';
import ErrorMessage from '../components/ErrorMessage';

export default function ActiveQuizPage() {
  const { publicId, attemptId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionId }
  const [expression, setExpression] = useState('thinking');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch or restore attempt state
  useEffect(() => {
    async function loadAttemptState() {
      setLoading(true);
      setError('');
      try {
        const res = await quizApi.getAttempt(attemptId);
        const data = res.data;

        if (data.status === 'COMPLETED') {
          // If already completed, redirect directly to results
          navigate(`/q/${publicId}/result/${attemptId}`, { replace: true });
          return;
        }

        setAttempt(data);
        const qList = data.questions || [];
        setQuestions(qList);

        // Prepopulate already answered questions
        const existingAnswers = {};
        let firstUnansweredIdx = 0;
        let foundUnanswered = false;

        qList.forEach((q, idx) => {
          if (q.selected_option_id) {
            existingAnswers[q.id] = q.selected_option_id;
          } else if (!foundUnanswered) {
            firstUnansweredIdx = idx;
            foundUnanswered = true;
          }
        });

        setSelectedAnswers(existingAnswers);
        setCurrentIndex(firstUnansweredIdx);
        setExpression('thinking');
      } catch (err) {
        setError(err.message || 'Unable to load quiz session.');
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) {
      loadAttemptState();
    }
  }, [attemptId, publicId, navigate]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const currentSelectedOptionId = currentQuestion ? selectedAnswers[currentQuestion.id] || null : null;

  const handleSelectOption = async (optionId) => {
    if (!currentQuestion) return;

    // Optimistically update selected answer
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    // Send answer to backend
    try {
      await quizApi.submitAnswer(attemptId, {
        question_id: currentQuestion.id,
        option_id: optionId,
      });
    } catch (err) {
      console.warn('Backend answer sync note:', err.message);
    }
  };

  const handleNext = async () => {
    if (!currentSelectedOptionId) return;

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setExpression('thinking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finalize and submit quiz
      setSubmitting(true);
      try {
        await quizApi.finalizeAttempt(attemptId);
        navigate(`/q/${publicId}/result/${attemptId}`);
      } catch (err) {
        setError(err.message || 'Failed to calculate score. Please try submitting again.');
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <LoadingScreen message="Preparing your questions..." />;
  }

  if (error && !questions.length) {
    return (
      <ErrorMessage
        title="Quiz Session Error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!questions.length) {
    return (
      <ErrorMessage
        title="No Questions Found"
        message="This quiz session has no eligible questions."
        onRetry={() => navigate(`/q/${publicId}`)}
      />
    );
  }

  const avatarId = attempt?.quiz?.avatar_id || 'cat';

  return (
    <Container className="py-3 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={9} lg={7}>
          {/* Animal Character with expression */}
          <div className="text-center mb-3">
            <AnimalCharacter animal={avatarId} expression={expression} size="lg" />
          </div>

          {/* Progress Bar (RULE 1: Exactly 10 questions) */}
          <ProgressBar
            current={currentIndex + 1}
            total={questions.length}
            categoryName={currentQuestion?.category_name}
            categoryIcon={currentQuestion?.category_icon}
          />

          {/* Active Question Card (RULE 2: 4 options, RULE 3: 1 answer) */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedOptionId={currentSelectedOptionId}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            isLastQuestion={isLastQuestion}
            isSubmitting={submitting}
            onExpressionChange={setExpression}
          />
        </Col>
      </Row>
    </Container>
  );
}
