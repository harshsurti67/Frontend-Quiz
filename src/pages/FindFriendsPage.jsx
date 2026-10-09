import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import FollowButton from '../components/FollowButton';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';

export default function FindFriendsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search users when debounced query changes
  useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const res = await quizApi.searchUsers(debouncedQuery);
        setSearchResults(res.data);
      } catch (err) {
        setError(err.message || 'Failed to search users. Please try again.');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [debouncedQuery]);

  const handleFollowChange = (userId, newIsFollowing) => {
    setSearchResults(prevResults =>
      prevResults.map(user =>
        user.id === userId ? { ...user, is_following: newIsFollowing } : user
      )
    );
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={9} lg={8}>
          <div className="glass-panel p-4 p-md-5">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="fs-2 fw-bold text-white mb-2 font-heading">
                Find Friends
              </h1>
              <p className="text-white-50 small">
                Search for people by username or name to connect
              </p>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <Form.Control
                type="text"
                className="social-input"
                placeholder="Search by username or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4">
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <LoadingScreen message="Searching..." />
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-5">
                <AnimalCharacter animal="cat" expression="idle" size="lg" />
                <p className="text-white-50 mt-3">
                  No users found for "{searchQuery}"
                </p>
              </div>
            )}

            {/* Initial State */}
            {!loading && !error && !searchQuery && (
              <div className="text-center py-5">
                <AnimalCharacter animal="panda" expression="idle" size="lg" />
                <p className="text-white-50 mt-3">
                  Start typing to search for friends
                </p>
              </div>
            )}

            {/* Search Results */}
            {!loading && searchResults.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="glass-panel p-3 d-flex align-items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '2px solid rgba(139, 92, 246, 0.5)',
                        }}
                      >
                        <span className="fs-4">👤</span>
                      </div>
                    </div>

                    <div className="flex-grow-1 min-w-0">
                      <div className="fw-bold text-white text-truncate">
                        {user.name || user.username}
                      </div>
                      <div className="text-white-50 small text-truncate">
                        @{user.username}
                      </div>
                      <div className="text-white-50 small mt-1">
                        <span className="me-2">
                          <i className="bi bi-people-fill"></i> {user.followers_count} followers
                        </span>
                        <span>
                          <i className="bi bi-person-heart-fill"></i> {user.following_count} following
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <FollowButton
                        userId={user.id}
                        isFollowing={user.is_following}
                        onFollowChange={(newIsFollowing) => handleFollowChange(user.id, newIsFollowing)}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
