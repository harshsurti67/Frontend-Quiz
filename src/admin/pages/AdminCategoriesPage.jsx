import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', icon: '✨', description: '', slug: '' });

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.get('/admin/categories/');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Unable to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/admin/categories/', formData);
      setShowCreateModal(false);
      setFormData({ name: '', icon: '✨', description: '', slug: '' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to create category:', err);
      alert('Failed to create category. Please try again.');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.patch(`/admin/categories/${editingCategory.id}/`, formData);
      setEditingCategory(null);
      setFormData({ name: '', icon: '✨', description: '', slug: '' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to update category:', err);
      alert('Failed to update category. Please try again.');
    }
  };

  const handleToggleActive = async (category) => {
    try {
      await adminApi.patch(`/admin/categories/${category.id}/`, { active: !category.active });
      fetchCategories();
    } catch (err) {
      console.error('Failed to toggle category:', err);
      alert('Failed to update category. Please try again.');
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      description: category.description,
      slug: category.slug
    });
    setShowCreateModal(true);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-pink mb-3" role="status"></div>
        <div className="text-white-50">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="text-danger mb-3">
          <i className="bi bi-exclamation-triangle fs-1"></i>
        </div>
        <h5 className="text-white mb-3">{error}</h5>
        <button className="btn btn-primary" onClick={() => fetchCategories()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white font-heading fw-bold">Categories</h2>
        <button
          className="btn btn-primary"
          onClick={() => { setEditingCategory(null); setFormData({ name: '', icon: '✨', description: '', slug: '' }); setShowCreateModal(true); }}
        >
          <i className="bi bi-plus-lg me-2"></i>Create Category
        </button>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Questions</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="fs-4">{cat.icon}</td>
                  <td className="fw-bold">{cat.name}</td>
                  <td className="font-monospace small">{cat.slug}</td>
                  <td>{cat.questions_count || 0}</td>
                  <td>
                    <span className={`badge ${cat.active ? 'bg-success' : 'bg-secondary'}`}>
                      {cat.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(cat.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => openEditModal(cat)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleToggleActive(cat)}
                      >
                        <i className="bi bi-power"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-panel text-white">
              <div className="modal-header border-secondary border-opacity-25">
                <h5 className="modal-title">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editingCategory ? handleEdit : handleCreate}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Icon</label>
                    <input
                      type="text"
                      className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control bg-transparent border-secondary border-opacity-25 text-white"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingCategory ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
