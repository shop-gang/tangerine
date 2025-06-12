import express from "express";
import cors from "cors";
import { AIOrchestrator } from "./aiAgents.js";

// Initialize express app
const createApp = () => {
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());

  // Add JSON parsing error handling
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    next(err);
  });

  // Custom error types
  class AIServiceError extends Error {
    constructor(message) {
      super(message);
      this.name = "AIServiceError";
    }
  }

  class ImageGenerationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ImageGenerationError";
    }
  }

  class PDFGenerationError extends Error {
    constructor(message) {
      super(message);
      this.name = "PDFGenerationError";
    }
  }

  // Replace mock aiOrchestrator with class-based orchestrator
  const aiOrchestrator = new AIOrchestrator();

  // Request timeout middleware
  const timeout = (ms) => (req, res, next) => {
    const timeoutId = setTimeout(() => {
      res.status(408).json({ error: "Request timeout" });
    }, ms);

    res.on("finish", () => {
      clearTimeout(timeoutId);
    });

    next();
  };

  app.get("/", (req, res) => {
    res.send("AetherPress backend is running!");
  });

  // In-memory map to track failFirst per test/request
  const failFirstMap = new Map();

  // Draft generation endpoint
  app.post("/api/draft", timeout(7000), async (req, res) => {
    try {
      const { prompt, simulateTimeout, failFirst } = req.body;
      const testId = req.headers["x-test-id"] || "default";

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({
          error: "Invalid request. Please provide a prompt string.",
        });
      }

      // Simulate timeout for testing
      if (simulateTimeout) {
        await new Promise((resolve) => setTimeout(resolve, 8000));
        // The timeout middleware will handle the response
        return;
      }

      // Simulate retry logic for testing
      if (failFirst) {
        if (!failFirstMap.get(testId)) {
          failFirstMap.set(testId, true);
          return res
            .status(500)
            .json({ error: "Temporary failure, please retry" });
        }
        // On retry, succeed and clear the flag
        failFirstMap.delete(testId);
      }

      // Test scenarios
      if (prompt === "trigger_ai_error") {
        throw new AIServiceError("Content generation failed");
      }

      if (prompt === "trigger_image_error") {
        throw new ImageGenerationError("Image generation failed");
      }

      // Use orchestrator to generate draft
      const draft = aiOrchestrator.generateDraft(prompt);
      return res.json({ draft });
    } catch (err) {
      if (err instanceof AIServiceError) {
        return res.status(500).json({ error: "Content generation failed" });
      }
      if (err instanceof ImageGenerationError) {
        return res.status(500).json({ error: "Image generation failed" });
      }
      return res.status(500).json({ error: "Failed to generate draft." });
    }
  });

  // PDF export endpoint
  app.post("/api/export/pdf", async (req, res) => {
    try {
      const { draft } = req.body;

      if (!draft || !draft.title) {
        return res.status(400).json({ error: "Invalid draft structure" });
      }

      if (draft.content === "trigger_pdf_error") {
        throw new PDFGenerationError("PDF generation failed");
      }

      // Mock PDF generation (implement actual PDF generation later)
      return res.json({ url: "https://example.com/generated.pdf" });
    } catch (err) {
      if (err instanceof PDFGenerationError) {
        return res.status(500).json({ error: "PDF generation failed" });
      }
      return res.status(500).json({ error: "Failed to export PDF." });
    }
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app;
};

// Create and export the app instance
const app = createApp();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app, createApp };
