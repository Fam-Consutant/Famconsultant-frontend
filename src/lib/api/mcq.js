import { apiClient } from './client';

const BASE = '/api/mcq';

export const mcqApi = {
  // Registration
  register: (payload) => apiClient.post(`${BASE}/register`, payload),
  getSession: (testSessionId) => apiClient.get(`${BASE}/register/${testSessionId}`),

  // Questions & Test
  getTestQuestions: () => apiClient.get(`${BASE}/test-questions`),
  submitTest: (payload) => apiClient.post(`${BASE}/submit-test`, payload),
  getResult: (testSessionId) => apiClient.get(`${BASE}/results/${testSessionId}`),

  // Coupon
  validateCoupon: (couponCode) => apiClient.get(`${BASE}/coupons/${couponCode}`),
  useCoupon: (couponCode, payload) => apiClient.post(`${BASE}/coupons/${couponCode}/use`, payload),
};

export default mcqApi;
