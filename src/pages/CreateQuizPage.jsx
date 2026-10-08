import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { quizApi } from '../services/api';
import AnimatedAvatar, { AVATAR_LIST } from '../components/AnimatedAvatar';
import QuestionBuilder from '../components/QuestionBuilder';
import QuestionPreviewList from '../components/QuestionPreviewList';
import ShareButton from '../components/ShareButton';

const INITIAL_10_QUESTIONS = Array.from({ length: 10 }).map((_, idx) => ({
  order: idx + 1,
  text: '',
  options: [
    { text: '', is_correct: true, order: 0 },
    { text: '', is_correct: false, order: 1 },
    { text: '', is_correct: false, order: 2 },
    { text: '', is_correct: false, order: 3 },
  ],
}));

export default function CreateQuizPage() {
  const [step, setStep] = useState(1); // 1: Info & Avatar, 2: 10 Questions, 3: Preview, 4: Published Share Screen

  const [creatorName, setCreatorName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [avatarId, setAvatarId] = useState('cool_boy');

  const [questions, setQuestions] = useState(INITIAL_10_QUESTIONS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [publishedQuiz, setPublishedQuiz] = useState(null);

  const handleCreatorNameChange = (e) => {
    const val = e.target.value;
    setCreatorName(val);
    if (!title || title.startsWith('How Well Do You Know')) {
      setTitle(val ? `How Well Do You Know ${val}? 👀` : '');
    }
  };

  const handleUpdateQuestion = (idx, updatedQ) => {
    const newQs = [...questions];
    newQs[idx] = updatedQ;
    setQuestions(newQs);
  };

  const handleProceedToBuilder = (e) => {
    e.preventDefault();
    setError('');

    if (!creatorName.trim()) {
      setError('Please enter your name as creator.');
      return;
    }
    setStep(2);
  };

  const handleProceedToPreview = () => {
    setStep(3);
  };

  const handlePublishQuiz = async () => {
    setError('');
    setLoading(true);

    try {
      // Validate all 10 questions before submitting
      for (let i = 0; i < 10; i++) {
        const q = questions[i];
        if (!q || !q.text.trim()) {
          throw new Error(`Question ${i + 1} text is empty.`);
        }
        if (q.options.some((o) => !o.text.trim())) {
          throw new Error(`Question ${i + 1} has an empty option.`);
        }
        if (!q.options.some((o) => o.is_correct)) {
          throw new Error(`Question ${i + 1} does not have a correct answer selected.`);
        }
      }

      const payload = {
        creator_name: creatorName.trim(),
        title: title.trim() || `How Well Do You Know ${creatorName.trim()}? 👀`,
        description: description.trim() || `Take this 10-question quiz to test how well you really know ${creatorName.trim()}!`,
        avatar_id: avatarId,
        questions: questions.map((q, idx) => ({
          order: idx + 1,
          text: q.text.trim(),
          options: q.options.map((opt, optIdx) => ({
            text: opt.text.trim(),
            is_correct: opt.is_correct,
            order: optIdx,
          })),
        })),
        publish: true,
      };

      const res = await quizApi.createQuiz(payload);
      setPublishedQuiz(res.data);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to publish quiz.');
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Success Published Share Screen
  if (step === 4 && publishedQuiz) {
    return (
      <Container className="py-4 py-md-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="glass-panel p-4 p-md-5 text-center neon-glow">
              <div className="mb-3">
                <AnimatedAvatar avatarId={publishedQuiz.avatar_id} size="xl" state="celebrating" />
              </div>
              <h1 className="fs-2 fw-bold text-white mb-2 font-heading">
                🎉 Your Private Quiz is Ready!
              </h1>
              <p className="text-white-50 mb-4">
                Send this private link to your friends on WhatsApp to see who really knows you best!
              </p>

              <div className="glass-panel p-3 mb-4 bg-black bg-opacity-40 border border-info border-opacity-30">
                <div className="text-muted small mb-1">YOUR PRIVATE QUIZ LINK</div>
                <div className="fw-bold text-info fs-5 text-break">
                  {window.location.origin}/q/{publishedQuiz.public_id}
                </div>
              </div>

              <div className="mb-4">
                <ShareButton
                  creatorName={publishedQuiz.creator_name}
                  quizTitle={publishedQuiz.title}
                  publicId={publishedQuiz.public_id}
                  variant="invite"
                />
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
                <Link
                  to={`/q/${publishedQuiz.public_id}`}
                  className="btn-social-primary flex-grow-1 py-3 text-center"
                >
                  <i className="bi bi-play-circle-fill"></i>
                  <span>Test Your Quiz</span>
                </Link>

                <Link
                  to={`/dashboard?quiz=${publishedQuiz.public_id}`}
                  className="btn-social-secondary flex-grow-1 py-3 text-center"
                >
                  <i className="bi bi-bar-chart-fill"></i>
                  <span>Creator Dashboard</span>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={10} lg={8}>
          {error && (
            <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4">
              {error}
            </Alert>
          )}

          {/* STEP 1: Quiz Info & Mascot Avatar Selection */}
          {step === 1 && (
            <div className="glass-panel p-4 p-md-5">
              <div className="text-center mb-4">
                <span className="glass-pill mb-2">✨ Step 1 of 3: Quiz Setup</span>
                <h1 className="fs-2 fw-bold text-white mb-2 font-heading">
                  Create Your <span className="gradient-text">Personal Quiz</span>
                </h1>
                <p className="text-white-50 small">
                  Set your name, pick an avatar, and customize your quiz title.
                </p>
              </div>

              <Form onSubmit={handleProceedToBuilder}>
                {/* Creator Name */}
                <div className="mb-4">
                  <label className="form-label text-white fw-bold">
                    Your Name (Creator) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="social-input"
                    placeholder="e.g. Prem, Harsh, Sarah..."
                    value={creatorName}
                    onChange={handleCreatorNameChange}
                    required
                    maxLength={50}
                    id="creator-name-input"
                  />
                  <div className="text-white-50 small mt-1">
                    Participants will see "{creatorName || 'Your Name'}'s Quiz" when opening your link.
                  </div>
                </div>

                {/* Quiz Title */}
                <div className="mb-4">
                  <label className="form-label text-white fw-bold">Quiz Title</label>
                  <input
                    type="text"
                    className="social-input"
                    placeholder="e.g. How Well Do You Know Prem?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={150}
                    id="creator-title-input"
                  />
                </div>

                {/* Avatar Mascot Selector */}
                <div className="mb-4">
                  <label className="form-label text-white fw-bold mb-2">
                    Choose Your Animated Avatar Mascot <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex flex-wrap justify-content-center gap-3 p-3 glass-panel bg-black bg-opacity-30">
                    {AVATAR_LIST.map((avatar) => (
                      <div
                        key={avatar.id}
                        className="text-center p-2 rounded-3 cursor-pointer"
                        style={{
                          background: avatarId === avatar.id ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                          border: avatarId === avatar.id ? '1px solid #ec4899' : '1px solid transparent',
                        }}
                        onClick={() => setAvatarId(avatar.id)}
                      >
                        <AnimatedAvatar
                          avatarId={avatar.id}
                          size="md"
                          interactive={true}
                          selected={avatarId === avatar.id}
                          onSelect={(id) => setAvatarId(id)}
                        />
                        <div className="text-white small fw-bold mt-2" style={{ fontSize: '0.8rem' }}>
                          {avatar.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label text-white fw-bold">Short Description (Optional)</label>
                  <textarea
                    className="social-input"
                    rows={2}
                    placeholder="e.g. Prem created this quiz just for his friends. Let's see how well you really know him! 👀"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={250}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-social-primary w-100 py-3 fs-5"
                  disabled={!creatorName.trim()}
                  id="proceed-to-questions-btn"
                >
                  <span>Continue to 10 Questions Builder</span>
                  <i className="bi bi-arrow-right fs-4"></i>
                </button>
              </Form>
            </div>
          )}

          {/* STEP 2: 10 Questions Builder */}
          {step === 2 && (
            <QuestionBuilder
              questions={questions}
              onUpdateQuestion={handleUpdateQuestion}
              onProceedToPreview={handleProceedToPreview}
              creatorName={creatorName}
            />
          )}

          {/* STEP 3: Quiz Preview List */}
          {step === 3 && (
            <QuestionPreviewList
              creatorName={creatorName}
              title={title || `How Well Do You Know ${creatorName}? 👀`}
              avatarId={avatarId}
              questions={questions}
              onEditQuestions={(targetQIdx) => {
                setStep(2);
              }}
              onPublish={handlePublishQuiz}
              isPublishing={loading}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
