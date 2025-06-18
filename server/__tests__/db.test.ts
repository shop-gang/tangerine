import { describe, test, expect, beforeEach } from "vitest";
import { mockDb, mockDbSuccess, resetDbMocks } from "../__mocks__/dbMock";

describe("Database Operations", () => {
  beforeEach(() => {
    resetDbMocks();
  });

  test("successfully queries data", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    mockDbSuccess(mockData);

    const result = await mockDb.query("SELECT * FROM test");
    expect(result).toEqual(mockData);
    expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM test");
  });
});
