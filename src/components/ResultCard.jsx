import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import AnimatedAvatar from './AnimatedAvatar';
import { SCORE_BADGES } from '../data/constants';

export default function ResultCard({
  result,
  onTryAgain,
}) {
  const {
    participant_name = 'Friend',
    creator_name = 'Prem',
    avatar_id = 'cool_boy',
    score = 8,
    total = 10,
    percentage = 80,
    result_message = 'You know Prem really well!',
    quiz_public_id = 'WQme30Q',
  } = result || {};

  useEffect(() => {
    try {
      const count = 200;
      const defaults = { origin: { y: 0.7 }, zIndex: 9999 };
      function fire(particleRatio, opts) {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
      }
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // Ignore if canvas not supported
    }
  }, []);

  const badgeTier = score === 10 ? 10 : score >= 8 ? 8 : score >= 6 ? 6 : score >= 4 ? 4 : 0;
  const badge = SCORE_BADGES[badgeTier] || SCORE_BADGES[0];

  return (
    <div className="glass-panel p-4 p-md-5 text-center neon-glow">
      {/* Celebrating Animated Mascot Avatar */}
      <div className="mb-3">
        <AnimatedAvatar avatarId={avatar_id} size="xl" state="celebrating" />
      </div>

      <div className="mb-3">
        <span className="glass-pill fs-6 px-3 py-1">
          <span>{badge.emoji}</span>
          <span>{badge.label}</span>
        </span>
      </div>

      <div className="score-circle-wrapper">
        <div className="text-center">
          <div className="score-number">{score}</div>
          <div className="score-total">/ {total} Correct</div>
        </div>
      </div>

      <div className="mb-4">
        <span className="badge bg-secondary bg-opacity-25 text-white fs-5 px-3 py-2 border border-secondary border-opacity-25 rounded-pill">
          Score: {percentage}%
        </span>
      </div>

      <h2 className="fs-3 fw-bold text-white mb-2 font-heading">
        {participant_name}'s Result
      </h2>

      <p className="fs-5 text-light mb-4 px-md-4 fw-medium" style={{ color: '#e2e8f0' }}>
        "{result_message}"
      </p>

      {/* Share Section */}
      <div className="my-4 pt-3 border-top border-secondary border-opacity-25">
        <h3 className="fs-6 text-uppercase text-white-50 fw-bold mb-3" style={{ letterSpacing: '0.05em' }}>
          Challenge Your Friends on WhatsApp
        </h3>
        <ShareButton
          creatorName={creator_name}
          score={score}
          total={total}
          publicId={quiz_public_id}
          variant="result"
        />
      </div>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 mt-4 pt-3 border-top border-secondary border-opacity-25">
        <button
          type="button"
          className="btn-social-secondary flex-grow-1 py-3"
          onClick={onTryAgain}
          id="try-again-btn"
        >
          <i className="bi bi-arrow-repeat"></i>
          <span>Try Again</span>
        </button>

        <Link
          to="/create"
          className="btn-social-primary flex-grow-1 py-3 text-center"
          id="create-own-quiz-btn"
        >
          <i className="bi bi-magic"></i>
          <span>Create Your Own Quiz</span>
        </Link>
      </div>
    </div>
  );
}
