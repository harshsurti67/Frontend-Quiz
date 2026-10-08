import React from 'react';

export default function AdminSettingsPage() {
  return (
    <div>
      <h2 className="text-white font-heading fw-bold mb-4">Settings</h2>

      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Site Settings</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-white-50">Site Name</label>
            <input
              type="text"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              defaultValue="KnowMe?"
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white-50">Site Status</label>
            <select
              className="form-select bg-transparent border-secondary border-opacity-25 text-white"
              defaultValue="active"
              disabled
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Quiz Settings</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-white-50">Maximum Questions per Quiz</label>
            <input
              type="number"
              className="form-control bg-transparent border-secondary border-opacity-25 text-white"
              defaultValue="10"
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-white-50">Public Quiz Availability</label>
            <select
              className="form-select bg-transparent border-secondary border-opacity-25 text-white"
              defaultValue="published"
              disabled
            >
              <option value="published">Published Only</option>
              <option value="all">All Quizzes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-3 mb-4">
        <h5 className="text-white mb-3">Security Settings</h5>
        <div className="alert alert-info border-info bg-info bg-opacity-10">
          <i className="bi bi-info-circle me-2"></i>
          Security settings are managed at the server level. Contact your administrator for changes.
        </div>
      </div>

      <div className="glass-panel p-4 rounded-3">
        <h5 className="text-white mb-3">Coming Soon</h5>
        <ul className="text-white-50">
          <li>Email configuration</li>
          <li>Notification settings</li>
          <li>Theme customization</li>
          <li>API rate limiting</li>
          <li>Backup settings</li>
        </ul>
      </div>
    </div>
  );
}
