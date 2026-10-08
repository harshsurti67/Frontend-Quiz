import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for friendly error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';
    if (error.response) {
      const data = error.response.data;
      if (data && typeof data === 'object') {
        if (data.error) message = data.error;
        else if (data.detail) message = data.detail;
        else if (data.participant_name) message = `Name error: ${data.participant_name}`;
        else {
          const firstKey = Object.keys(data)[0];
          if (firstKey && data[firstKey]) {
            message = Array.isArray(data[firstKey]) ? data[firstKey][0] : String(data[firstKey]);
          }
        }
      }
    } else if (error.request) {
      message = 'Cannot connect to quiz server. Please check your internet connection or backend server.';
    }
    return Promise.reject(new Error(message));
  }
);

export const quizApi = {
  // Auth
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  getMe: () => api.get('/auth/me/'),

  // Creator Quiz Management
  createQuiz: (data) => api.post('/quizzes/create/', data),
  publishQuiz: (quizId) => api.post(`/quizzes/${quizId}/publish/`),
  getMyQuizzes: () => api.get('/my/quizzes/'),

  // Public Quizzes (Person-to-Person)
  getQuiz: (publicId) => api.get(`/quizzes/${publicId}/`),
  getQuizTabs: (publicId) => api.get(`/quizzes/${publicId}/tabs/`),
  getQuizStats: (publicId) => api.get(`/quizzes/${publicId}/stats/`),

  // Categories
  getCategories: () => api.get('/categories/'),

  // Participant Attempts
  startAttempt: (publicId, data) => api.post(`/quizzes/${publicId}/attempts/`, data),
  getAttempt: (attemptId) => api.get(`/attempts/${attemptId}/`),
  submitAnswer: (attemptId, data) => api.post(`/attempts/${attemptId}/answers/`, data),
  finalizeAttempt: (attemptId) => api.post(`/attempts/${attemptId}/submit/`),
  getAttemptResult: (attemptId) => api.get(`/attempts/${attemptId}/result/`),
};

export const adminApi = {
  adminLogin: (data) => api.post('/admin/login/', data),
  getDashboard: () => api.get('/admin/dashboard/'),
  getCreators: (params) => api.get('/admin/creators/', { params }),
  getCreatorDetail: (id) => api.get(`/admin/creators/${id}/`),
  toggleCreatorStatus: (id, is_active) => api.patch(`/admin/creators/${id}/status/`, { is_active }),
  getQuizzes: (params) => api.get('/admin/quizzes/', { params }),
  getQuizDetail: (id) => api.get(`/admin/quizzes/${id}/`),
  toggleQuizStatus: (id, status) => api.patch(`/admin/quizzes/${id}/status/`, { status }),
  getQuestions: (params) => api.get('/admin/questions/', { params }),
  getCategories: () => api.get('/admin/categories/'),
  createCategory: (data) => api.post('/admin/categories/', data),
  updateCategory: (id, data) => api.patch(`/admin/categories/${id}/`, data),
  getAttempts: (params) => api.get('/admin/attempts/', { params }),
  getAttemptDetail: (id) => api.get(`/admin/attempts/${id}/`),
  getAnalytics: () => api.get('/admin/analytics/'),
  globalSearch: (q) => api.get('/admin/search/', { params: { q } }),
};

export default api;
