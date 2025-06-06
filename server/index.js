// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data generator for eBook drafts
function generateMockDraft(prompt) {
  return {
    title: `Generated Book: ${prompt.slice(0, 30)}...`,
    author: "AetherPress AI",
    sections: [
      {
        heading: "Chapter 1",
        content: `Here's a draft based on your prompt: "${prompt}"`,
        imageUrl: "https://picsum.photos/800/400", // Placeholder image
      },
      {
        heading: "Chapter 2",
        content: "This is a mock chapter to demonstrate the structure.",
        imageUrl: "https://picsum.photos/800/400?random=2",
      },
    ],
  };
}

// Basic AI orchestration structure
const aiOrchestrator = {
  async processDraft(prompt) {
    // TODO: Implement actual AI processing
    return generateMockDraft(prompt);
  },
};

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

    const draft = await aiOrchestrator.processDraft(prompt);
    res.json({ draft });
  } catch (error) {
    console.error("Error generating draft:", error);
    res.status(500).json({
      error: "Failed to generate draft. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
