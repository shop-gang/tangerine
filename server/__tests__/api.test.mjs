import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../index.js";

describe("API Endpoints", () => {
  describe("POST /api/draft", () => {
    it("should return 400 when prompt is missing", async () => {
      const response = await request(app).post("/api/draft").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Invalid request. Please provide a prompt string."
      );
    });

    it("should generate a draft when given a valid prompt", async () => {
      const testPrompt = "Test prompt for book generation";
      const response = await request(app)
        .post("/api/draft")
        .send({ prompt: testPrompt });

      expect(response.status).toBe(200);
      expect(response.body.draft).toHaveProperty("title");
      expect(response.body.draft).toHaveProperty("author");
      expect(response.body.draft).toHaveProperty("sections");
      expect(Array.isArray(response.body.draft.sections)).toBe(true);
    });
  });
});
