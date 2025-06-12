import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index.js";

// Mock delay to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Error Handling Integration Tests", () => {
  beforeEach(() => {
    global._failFirstCalled = false;
  });

  describe("API Error Scenarios", () => {
    it("should handle invalid input with proper error response", async () => {
      const response = await request(app)
        .post("/api/draft")
        .send({ prompt: "" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/invalid|empty/i);
    });

    it("should handle malformed JSON with proper error response", async () => {
      const response = await request(app)
        .post("/api/draft")
        .set("Content-Type", "application/json")
        .send("malformed json{");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should timeout for slow responses", async () => {
      const response = await request(app)
        .post("/api/draft")
        .send({ prompt: "timeout_test", simulateTimeout: true })
        .timeout(9000); // Increase timeout for this test

      expect(response.status).toBe(408);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/timeout/i);
    }, 10000); // 10s timeout for this test
  });

  describe("Content Generation Error Handling", () => {
    it("should handle AI service errors gracefully", async () => {
      const response = await request(app)
        .post("/api/draft")
        .send({ prompt: "trigger_ai_error" });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/content generation/i);
    });

    it("should handle image generation failures", async () => {
      const response = await request(app)
        .post("/api/draft")
        .send({ prompt: "trigger_image_error" });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/image generation/i);
    });
  });

  describe("PDF Export Error Handling", () => {
    it("should handle PDF generation errors", async () => {
      const response = await request(app)
        .post("/api/export/pdf")
        .send({ draft: { title: "Test", content: "trigger_pdf_error" } });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/pdf generation/i);
    });

    it("should handle invalid draft structure", async () => {
      const response = await request(app)
        .post("/api/export/pdf")
        .send({ draft: { invalid: "structure" } });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/invalid draft/i);
    });
  });

  describe("Recovery and Retry Scenarios", () => {
    it("should succeed after retrying on temporary failure", async () => {
      const testId = Date.now().toString();
      // First request fails
      await request(app)
        .post("/api/draft")
        .set("x-test-id", testId)
        .send({ prompt: "retry_test", failFirst: true });
      // Second request should succeed
      const response = await request(app)
        .post("/api/draft")
        .set("x-test-id", testId)
        .send({ prompt: "retry_test", failFirst: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("draft");
    });

    it("should handle concurrent requests properly", async () => {
      const requests = Array(5)
        .fill()
        .map(() =>
          request(app).post("/api/draft").send({ prompt: "concurrent_test" })
        );

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("draft");
      });
    });
  });
});
