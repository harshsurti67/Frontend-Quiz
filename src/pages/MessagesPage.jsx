import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Alert, Badge } from 'react-bootstrap';
import { quizApi } from '../services/api';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    loadConversations();
    loadUnreadCount();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await quizApi.getConversations();
      setConversations(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load conversations. Please try again.');
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const res = await quizApi.getUnreadCount();
      setUnreadCount(res.data.unread_count);
    } catch (err) {
      console.error('Failed to load unread count:', err);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    setSearchLoading(true);
    setError('');
    try {
      const res = await quizApi.searchUsers(query);
      setSearchResults(res.data);
      setShowSearch(true);
    } catch (err) {
      setError(err.message || 'Failed to search users. Please try again.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleStartChat = async (userId) => {
    try {
      const res = await quizApi.createConversation(userId);
      navigate(`/messages/${res.data.conversation.id}`);
    } catch (err) {
      setError(err.message || 'Failed to start conversation. Please try again.');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={9} lg={8}>
          <div className="glass-panel p-4 p-md-5">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="fs-2 fw-bold text-white mb-1 font-heading">
                  Messages
                </h1>
                <p className="text-white-50 small mb-0">
                  {unreadCount > 0 && (
                    <Badge bg="danger" className="me-2">
                      {unreadCount} unread
                    </Badge>
                  )}
                  Chat with your friends
                </p>
              </div>
              <button
                className="btn btn-link text-white p-0"
                onClick={() => setShowSearch(!showSearch)}
              >
                <i className="bi bi-search fs-4"></i>
              </button>
            </div>

            {/* Search */}
            {showSearch && (
              <div className="mb-4">
                <Form.Control
                  type="text"
                  className="social-input"
                  placeholder="Search friends to message..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4">
                {error}
              </Alert>
            )}

            {/* Search Results */}
            {showSearch && searchQuery && (
              <>
                {searchLoading && (
                  <div className="text-center py-4">
                    <LoadingScreen message="Searching..." />
                  </div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  <div className="d-flex flex-column gap-3 mb-4">
                    <div className="text-white-50 small fw-semibold">SEARCH RESULTS</div>
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
                        </div>
                        <div className="flex-shrink-0">
                          {user.is_following ? (
                            <button
                              className="btn-social-primary py-2 px-3 fs-6"
                              onClick={() => handleStartChat(user.id)}
                            >
                              <i className="bi bi-chat-dots me-1"></i>
                              Message
                            </button>
                          ) : (
                            <span className="text-white-50 small">
                              Add friend to message
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!searchLoading && searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-4 mb-4">
                    <p className="text-white-50">No users found</p>
                  </div>
                )}
              </>
            )}

            {/* Loading State */}
            {loading && !showSearch && (
              <div className="text-center py-4">
                <LoadingScreen message="Loading conversations..." />
              </div>
            )}

            {/* Empty State */}
            {!loading && !showSearch && conversations.length === 0 && (
              <div className="text-center py-5">
                <AnimalCharacter animal="rabbit" expression="idle" size="lg" />
                <p className="text-white-50 mt-3">
                  No conversations yet. Search for friends to start chatting!
                </p>
              </div>
            )}

            {/* Conversations List */}
            {!loading && !showSearch && conversations.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="glass-panel p-3 d-flex align-items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/messages/${conversation.id}`)}
                    style={{ cursor: 'pointer' }}
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
                      <div className="d-flex align-items-center gap-2">
                        <div className="fw-bold text-white text-truncate">
                          {conversation.other_participant?.name || conversation.other_participant?.username}
                        </div>
                        {conversation.unread_count > 0 && (
                          <Badge bg="danger" className="mb-0">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                      <div className="text-white-50 small text-truncate">
                        {conversation.last_message?.text || 'No messages yet'}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-white-50 small">
                      {formatTime(conversation.last_message?.created_at)}
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
