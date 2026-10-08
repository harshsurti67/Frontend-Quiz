import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser, getAuthUser } from '../utils/auth';

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const user = getAuthUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: 'bi-grid-1x2-fill' },
    { label: 'Creators', path: '/admin/creators', icon: 'bi-people-fill' },
    { label: 'Quizzes', path: '/admin/quizzes', icon: 'bi-card-checklist' },
    { label: 'Questions', path: '/admin/questions', icon: 'bi-question-circle-fill' },
    { label: 'Categories', path: '/admin/categories', icon: 'bi-tags-fill' },
    { label: 'Attempts', path: '/admin/attempts', icon: 'bi-journal-check' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'bi-bar-chart-line-fill' },
    { label: 'Settings', path: '/admin/settings', icon: 'bi-gear-fill' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="admin-sidebar-backdrop d-lg-none"
          onClick={onClose}
        ></div>
      )}

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="d-flex align-items-center gap-2">
            <span className="brand-logo fs-4">
              KnowMe<span className="text-pink">?</span>
            </span>
            <span className="badge bg-danger text-uppercase font-heading px-2 py-1 small">
              Admin
            </span>
          </div>
          <button
            type="button"
            className="btn text-white-50 d-lg-none"
            onClick={onClose}
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* User Info Card */}
        <div className="admin-sidebar-user">
          <div className="admin-user-avatar">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <div className="overflow-hidden">
            <div className="fw-bold text-white text-truncate">
              {user?.name || user?.username || 'System Admin'}
            </div>
            <div className="small text-white-50 text-truncate">
              {user?.email || 'admin@knowme.com'}
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="admin-sidebar-nav flex-grow-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <i className={`bi ${item.icon} me-2 fs-5`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-top border-secondary border-opacity-25">
          <button
            type="button"
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 font-heading fw-bold rounded-3"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
