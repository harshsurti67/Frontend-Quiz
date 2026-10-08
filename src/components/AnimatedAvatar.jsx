import React from 'react';

export const AVATAR_LIST = [
  { id: 'cool_boy', name: 'Cool Boy', emoji: '🕶️', bg: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', desc: 'Stylish & confident with cool shades' },
  { id: 'cool_girl', name: 'Cool Girl', emoji: '🎧', bg: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', desc: 'Vibing with headphones and music' },
  { id: 'cute_boy', name: 'Cute Boy', emoji: '🧢', bg: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', desc: 'Friendly smile & bright energy' },
  { id: 'cute_girl', name: 'Cute Girl', emoji: '✨', bg: 'linear-gradient(135deg, #f43f5e 0%, #fbbf24 100%)', desc: 'Sweet, sparkling and cheerful' },
  { id: 'funny_mascot', name: 'Party Animal', emoji: '🥳', bg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', desc: 'Wild comic relief of the group' },
  { id: 'robot', name: 'Cyber Bot', emoji: '🤖', bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', desc: 'Smart, calculated & futuristic' },
  { id: 'ninja', name: 'Stealth Ninja', emoji: '🥷', bg: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)', desc: 'Quiet, loyal and mysterious' },
  { id: 'cat_mascot', name: 'Lucky Kitty', emoji: '🐱', bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', desc: 'Adorable cat energy' },
];

export default function AnimatedAvatar({
  avatarId = 'cool_boy',
  state = 'idle', // 'idle', 'waving', 'watching', 'celebrating'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  interactive = false,
  onSelect = null,
  selected = false,
}) {
  const avatar = AVATAR_LIST.find((a) => a.id === avatarId) || AVATAR_LIST[0];

  const sizeStyles = {
    sm: { width: 50, height: 50, fontSize: '1.6rem' },
    md: { width: 80, height: 80, fontSize: '2.5rem' },
    lg: { width: 110, height: 110, fontSize: '3.5rem' },
    xl: { width: 140, height: 140, fontSize: '4.5rem' },
  }[size] || { width: 80, height: 80, fontSize: '2.5rem' };

  return (
    <div
      className={`animated-avatar-wrapper avatar-state-${state} ${selected ? 'avatar-selected' : ''} ${interactive ? 'avatar-interactive' : ''}`}
      onClick={() => interactive && onSelect && onSelect(avatar.id)}
      style={{
        ...sizeStyles,
        background: avatar.bg,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: selected ? '0 0 25px rgba(236, 72, 153, 0.8), 0 0 0 4px #fff' : '0 8px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <span className="avatar-emoji-icon" role="img" aria-label={avatar.name}>
        {avatar.emoji}
      </span>
      {state === 'celebrating' && (
        <span className="position-absolute top-0 start-100 translate-middle fs-5">
          🎉
        </span>
      )}
      {state === 'waving' && (
        <span className="position-absolute top-0 start-100 translate-middle fs-6">
          👋
        </span>
      )}
    </div>
  );
}
