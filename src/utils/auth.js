// Simple auth helper for storing JWT tokens and creator user state in localStorage

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('knowme_access_token', token);
  } else {
    localStorage.removeItem('knowme_access_token');
  }
}

export function getAuthToken() {
  return localStorage.getItem('knowme_access_token');
}

export function setAuthUser(user) {
  if (user) {
    localStorage.setItem('knowme_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('knowme_user');
  }
}

export function getAuthUser() {
  const data = localStorage.getItem('knowme_user');
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('knowme_access_token');
  localStorage.removeItem('knowme_user');
}
