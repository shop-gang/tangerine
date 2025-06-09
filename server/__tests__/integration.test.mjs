// Integration test example for backend
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../index.js";

describe("Integration: Draft API and PDF Export", () => {
  it("should generate a draft and allow for PDF export (mocked)", async () => {
    const prompt = "Integration test prompt";
    const draftRes = await request(app).post("/api/draft").send({ prompt });
    expect(draftRes.status).toBe(200);
    expect(draftRes.body.draft).toHaveProperty("title");
    // Simulate PDF export endpoint if exists, or just check draft structure
    // (Extend this as PDF export API is implemented)
  });
});
