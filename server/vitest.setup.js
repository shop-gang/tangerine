import { vi } from "vitest";
import { mockDb } from "./__mocks__/dbMock";

// Mock environment variables
process.env.NODE_ENV = "test";

// Mock database module
vi.mock("./db", () => ({
  default: mockDb,
}));

// Reset all mocks before each test
beforeEach(() => {
  vi.resetAllMocks();
});
