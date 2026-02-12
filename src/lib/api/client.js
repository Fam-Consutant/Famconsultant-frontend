import { loadingManager } from '../loadingManager';

const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const buildUrl = (path, params) => {
  const normalizedPath = path.startsWith('http')
    ? path
    : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  const url = new URL(normalizedPath);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

const request = async (path, { method = 'GET', data, params, headers, cache = 'no-store' } = {}) => {
  const url = buildUrl(path, params);
  const options = {
    method,
    headers: { ...defaultHeaders, ...headers },
    cache,
  };

  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const stop = loadingManager.start();

  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } finally {
    stop();
  }
};

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, data, options) => request(path, { ...options, method: 'POST', data }),
  put: (path, data, options) => request(path, { ...options, method: 'PUT', data }),
  patch: (path, data, options) => request(path, { ...options, method: 'PATCH', data }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export default apiClient;
