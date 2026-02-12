import { config } from './config';

export const resolveImageUrl = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  const baseWithApi = config.urls.apiServiceUrl || '';
  // Drop trailing /api if present so static files resolve correctly
  const base = baseWithApi.replace(/\/?api\/?$/, '').replace(/\/$/, '');
  const path = src.startsWith('/') ? src : `/${src}`;
  return `${base}${path}`;
};
