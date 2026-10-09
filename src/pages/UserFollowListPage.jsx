import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import FollowButton from '../components/FollowButton';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';

export default function UserFollowListPage() {
  const { userId, type } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageTitle = type === 'followers' ? 'Followers' : 'Following';
  const pageSubtitle = type === 'followers' 
    ? 'People who follow this user' 
    : 'People this user follows';

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        let res;
        if (type === 'followers') {
          res = await quizApi.getUserFollowers(userId);
        } else {
          res = await quizApi.getUserFollowing(userId);
        }
        setUsers(res.data);
      } catch (err) {
        setError(err.message || `Failed to load ${type.toLowerCase()}. Please try again.`);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId, type]);

  const handleFollowChange = (userId, newIsFollowing) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
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
                {pageTitle}
              </h1>
              <p className="text-white-50 small">
                {pageSubtitle}
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4">
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <LoadingScreen message={`Loading ${type.toLowerCase()}...`} />
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && users.length === 0 && (
              <div className="text-center py-5">
                <AnimalCharacter animal="fox" expression="idle" size="lg" />
                <p className="text-white-50 mt-3">
                  No {type.toLowerCase()} yet
                </p>
              </div>
            )}

            {/* User List */}
            {!loading && users.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {users.map((user) => (
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
