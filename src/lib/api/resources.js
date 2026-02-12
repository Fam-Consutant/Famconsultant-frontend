import { apiClient } from './client';

const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);

export const createCrudService = (resourceBasePath) => {
  const basePath = normalizePath(resourceBasePath);

  return {
    list: (params) => apiClient.get(basePath, { params }),
    get: (id, params) => apiClient.get(`${basePath}/${id}`, { params }),
    create: (payload) => apiClient.post(basePath, payload),
    update: (id, payload) => apiClient.put(`${basePath}/${id}`, payload),
    remove: (id) => apiClient.delete(`${basePath}/${id}`),
  };
};

export default createCrudService;
