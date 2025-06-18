import { vi } from "vitest";

// Helper functions for API mocking
export const mockApiResponse = (status, data, headers = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const mockApiError = (status, message) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Common API mocks
export const mockApi = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
};

// Reset all mocks between tests
export const resetApiMocks = () => {
  Object.values(mockApi).forEach((mock) => mock.mockReset());
};
