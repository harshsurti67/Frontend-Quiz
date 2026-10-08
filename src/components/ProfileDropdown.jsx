import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthUser, logoutUser } from '../utils/auth';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = getAuthUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-link text-white p-0 d-flex align-items-center justify-content-center"
        onClick={handleMenuClick}
        aria-label="User menu"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <i className="bi bi-person-fill fs-5"></i>
      </button>

      {isOpen && (
        <div
          className="position-absolute end-0 mt-2"
          style={{
            zIndex: 1000,
            minWidth: '220px',
            maxWidth: '280px',
          }}
        >
          <div
            className="glass-panel p-0 overflow-hidden"
            style={{
              borderRadius: '16px',
              background: 'rgba(22, 24, 43, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* User Info Header */}
            <div className="p-3 border-bottom border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  }}
                >
                  <i className="bi bi-person-fill text-white fs-5"></i>
                </div>
                <div className="overflow-hidden">
                  <div className="fw-bold text-white text-truncate" style={{ fontSize: '0.9rem' }}>
                    {user?.name || user?.username || 'User'}
                  </div>
                  <div className="text-white-50 small text-truncate" style={{ fontSize: '0.75rem' }}>
                    {user?.email || ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="py-2">
              <Link
                to="/dashboard"
                className="d-flex align-items-center gap-2 px-3 py-2 text-white text-decoration-none hover-bg-glass"
                onClick={handleOptionClick}
                style={{
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}
              >
                <i className="bi bi-bar-chart-fill text-info"></i>
                <span>Dashboard</span>
              </Link>

              <Link
                to="/create"
                className="d-flex align-items-center gap-2 px-3 py-2 text-white text-decoration-none hover-bg-glass"
                onClick={handleOptionClick}
                style={{
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}
              >
                <i className="bi bi-plus-circle-fill text-success"></i>
                <span>Create Quiz</span>
              </Link>

              <div className="d-flex align-items-center gap-2 px-3 py-2 text-white-50 cursor-default">
                <i className="bi bi-person"></i>
                <span style={{ fontSize: '0.9rem' }}>Profile</span>
              </div>

              <div className="border-top border-secondary border-opacity-25 my-2"></div>

              <button
                type="button"
                className="d-flex align-items-center gap-2 w-100 px-3 py-2 text-danger text-decoration-none bg-transparent border-0 cursor-pointer hover-bg-glass"
                onClick={handleLogout}
                style={{
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
