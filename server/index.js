// server/index.js
import express from "express";
import cors from "cors";
import { AIOrchestrator } from "./aiAgents.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace mock aiOrchestrator with class-based orchestrator
const aiOrchestrator = new AIOrchestrator();

app.get("/", (req, res) => {
  res.send("AetherPress backend is running!");
});

// Draft generation endpoint
app.post("/api/draft", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Invalid request. Please provide a prompt string.",
      });
    }

    // Use orchestrator to generate draft
    const draft = aiOrchestrator.generateDraft(prompt);
    return res.json({ draft });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate draft." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
