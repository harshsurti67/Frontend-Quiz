import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { quizApi } from '../services/api';
import AnimalCharacter from '../components/AnimalCharacter';
import LoadingScreen from '../components/LoadingScreen';

export default function ChatPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  useEffect(() => {
    loadConversation();
    startPolling();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await quizApi.getConversation(conversationId);
      setConversation(res.data.conversation);
      setMessages(res.data.messages);
    } catch (err) {
      setError(err.message || 'Failed to load conversation. Please try again.');
      setConversation(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    // Poll for new messages every 5 seconds
    pollingRef.current = setInterval(() => {
      loadConversation();
    }, 5000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    setError('');
    try {
      const res = await quizApi.sendMessage(conversationId, newMessage.trim());
      setMessages([...messages, res.data]);
      setNewMessage('');
      // Reload conversation to update timestamp
      loadConversation();
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFullTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={9} lg={8}>
          <div className="glass-panel p-4 p-md-5">
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <button
                className="btn btn-link text-white p-0"
                onClick={() => navigate('/messages')}
              >
                <i className="bi bi-arrow-left fs-4"></i>
              </button>
              <div className="flex-grow-1">
                <h1 className="fs-2 fw-bold text-white mb-1 font-heading">
                  {conversation?.other_participant?.name || conversation?.other_participant?.username}
                </h1>
                <p className="text-white-50 small mb-0">
                  @{conversation?.other_participant?.username}
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="danger" className="bg-danger bg-opacity-25 text-white border-danger mb-4">
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <LoadingScreen message="Loading conversation..." />
              </div>
            )}

            {/* Messages */}
            {!loading && (
              <>
                <div
                  className="messages-container mb-4"
                  style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-5">
                      <AnimalCharacter animal="koala" expression="idle" size="lg" />
                      <p className="text-white-50 mt-3">
                        No messages yet. Say hello!
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`d-flex ${message.is_me ? 'justify-content-end' : 'justify-content-start'}`}
                      >
                        <div
                          className={`p-3 rounded-3 ${
                            message.is_me
                              ? 'bg-primary bg-opacity-25 text-white'
                              : 'glass-panel text-white'
                          }`}
                          style={{
                            maxWidth: '70%',
                          }}
                        >
                          <div className="small mb-1">
                            {message.is_me ? 'You' : conversation?.other_participant?.name}
                          </div>
                          <div>{message.text}</div>
                          <div className="text-white-50 small mt-1" title={formatFullTime(message.created_at)}>
                            {formatTime(message.created_at)}
                            {message.read_at && message.is_me && ' ✓'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      className="social-input"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={sending}
                      maxLength={5000}
                    />
                    <button
                      type="submit"
                      className="btn-social-primary px-4"
                      disabled={sending || !newMessage.trim()}
                    >
                      {sending ? (
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                      ) : (
                        <i className="bi bi-send-fill"></i>
                      )}
                    </button>
                  </div>
                </Form>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
