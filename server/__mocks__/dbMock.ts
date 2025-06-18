import { vi } from "vitest";

// Mock database connection and queries
export const mockDb = {
  query: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  transaction: vi.fn(),
};

// Reset database mocks between tests
export const resetDbMocks = () => {
  Object.values(mockDb).forEach((mock) => mock.mockReset());
};

// Helper to mock successful query results
export const mockDbSuccess = (data: unknown) => {
  mockDb.query.mockResolvedValueOnce(data);
};

// Helper to mock database errors
export const mockDbError = (error: Error) => {
  mockDb.query.mockRejectedValueOnce(error);
};
