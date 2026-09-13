// src/lib/api.js
// Centralized fetch wrapper for HaatBazaar API calls

const BASE_URL = '/api';

export async function apiRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach seller JWT token if present in localStorage
  const sellerToken = localStorage.getItem('haatbazaar_seller_token');
  if (sellerToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${sellerToken}`;
  }

  // Attach admin session token if present
  const adminToken = localStorage.getItem('haatbazaar_admin_token');
  if (adminToken && !headers['X-Admin-Token']) {
    headers['X-Admin-Token'] = adminToken;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.error || data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }
    throw err;
  }
}

export const api = {
  get: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'POST', body }),
  patch: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};
