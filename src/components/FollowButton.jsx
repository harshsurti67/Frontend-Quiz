import React, { useState } from 'react';
import { quizApi } from '../services/api';

export default function FollowButton({ userId, isFollowing, onFollowChange, size = 'md' }) {
  const [loading, setLoading] = useState(false);
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (localIsFollowing) {
        await quizApi.unfollowUser(userId);
        setLocalIsFollowing(false);
      } else {
        await quizApi.followUser(userId);
        setLocalIsFollowing(true);
      }
      if (onFollowChange) {
        onFollowChange(!localIsFollowing);
      }
    } catch (err) {
      console.error('Follow/unfollow error:', err);
      // Restore previous state on error
      setLocalIsFollowing(localIsFollowing);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'py-1 px-3 fs-6',
    md: 'py-2 px-4 fs-6',
    lg: 'py-2 px-5 fs-5',
  };

  const buttonClass = localIsFollowing
    ? 'btn-social-secondary'
    : 'btn-social-primary';

  return (
    <button
      type="button"
      className={`${buttonClass} ${sizeClasses[size] || sizeClasses.md}`}
      onClick={handleFollowToggle}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          {localIsFollowing ? 'Unfollowing...' : 'Following...'}
        </>
      ) : (
        <>
          {localIsFollowing ? (
            <>
              <i className="bi bi-check-lg me-1"></i>
              Following
            </>
          ) : (
            <>
              <i className="bi bi-person-plus me-1"></i>
              Follow
            </>
          )}
        </>
      )}
    </button>
  );
}
