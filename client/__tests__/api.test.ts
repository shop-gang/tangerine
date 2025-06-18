import { describe, test, expect, beforeEach } from "vitest";
import { mockApi, mockApiResponse, resetApiMocks } from "../__mocks__/apiMock";
import { fetchData } from "../services/api";

describe("API Service", () => {
  beforeEach(() => {
    resetApiMocks();
  });

  test("successfully fetches data", async () => {
    const mockData = { id: 1, name: "Test" };
    mockApi.get.mockResolvedValueOnce(mockApiResponse(200, mockData));

    const result = await fetchData("/test");
    expect(result).toEqual(mockData);
    expect(mockApi.get).toHaveBeenCalledWith("/test");
  });
});
