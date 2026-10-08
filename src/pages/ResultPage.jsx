import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { quizApi } from '../services/api';
import ResultCard from '../components/ResultCard';
import LoadingScreen from '../components/LoadingScreen';
import ErrorMessage from '../components/ErrorMessage';

export default function ResultPage() {
  const { publicId, attemptId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadResult() {
      setLoading(true);
      setError('');
      try {
        const res = await quizApi.getAttemptResult(attemptId);
        setResult(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load quiz results.');
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) {
      loadResult();
    }
  }, [attemptId]);

  if (loading) {
    return <LoadingScreen message="Calculating your score..." />;
  }

  if (error || !result) {
    return (
      <ErrorMessage
        title="Result Not Found"
        message={error || 'Unable to retrieve your score.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={9} lg={7}>
          <ResultCard
            result={result}
            onTryAgain={() => navigate(`/q/${publicId}`)}
          />
        </Col>
      </Row>
    </Container>
  );
}
