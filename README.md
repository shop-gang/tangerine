# AetherPress (Original /tangerine)

AetherPress is the magic wand for creating visually stunning, graphically rich eBooks powered by intelligent AI. Whether you're a writer, poet, educator, marketer, or an indie publisher, AetherPress transforms your simple prompt into a polished eBook draft in minutes—no deep design skills required.

---

## Vision

AetherPress is built on the idea of marrying rapid AI-driven generation with intuitive control. We make it effortless to create professional-grade eBooks by:

- Delivering eye-catching, benchmark-quality drafts at lightning speed.
- Empowering users with modular, precise control over every aspect of their eBook.
- Acting as your creative partner—the AI handles the heavy lifting, leaving you free to perfect your vision.

The project is split into two main parts:

- [`client/`](./client): Frontend (React/Next.js) – user experience, design, and GenAI-powered creative features.
- [`server/`](./server): Backend (Node.js/Express) – API orchestration, persistence, and integration with AI services.

For detailed technical and product documentation, see the respective `README.md` files in each subdirectory.

> **Directory Structure**
>
> - `.devcontainer/` – Only for dev environment setup
> - `client/` – See above
> - `docs/` – For all product, technical, and process documentation
> - `shared/` – For reusable assets across client and server (e.g., types, utilities)
> - `scripts/` – For automation scripts (setup, lint, test, deploy, etc.)
> - `server/` – See above
> - `.github/` – GitHub Actions workflows

---

## Key Features

- **Prompt Engine ("The Magic Wand"):**  
  Uses natural language processing to interpret your creative prompt, ensuring that your ideas—no matter how abstract—are understood and transformed into content.

- **AI Orchestrator ("The Conductor"):**  
  Seamlessly manages the AI Content Agent, Image Agent, Layout Engine, and Assembly Engine to balance creativity with consistency.

- **Modular Dashboard ("The Control Panel"):**  
  Provides distinct modules for content, images, layout, and settings, allowing for targeted tweaks without disrupting your entire project.

- **Dynamic Live Preview & Export:**  
  See changes in near real-time and export a high-fidelity PDF that mirrors the live preview down to the pixel.

---

## Technology Vibe

- **Frontend:** Modern, component-based JS framework (React/Next.js). Focus on a clean, responsive UI.
- **Backend:** Scalable platform (Node.js/Express). Ready to orchestrate multiple API calls.
- **Database:** For a balance of structure and flexibility (PostgreSQL/JSONB).
- **AI:**
  - **Default:** Use Google's Gemini for both text and image generation.
  - Leverage best-in-class third-party APIs for core GenAI (image generation, possibly LLM for assistant). Build custom logic for agent orchestration and workflow, not foundational models.
  - Support use of [GitHub Models](https://github.com/features/models) to find and experiment with AI models for free; see Google AI Edge Gallery for locally run LLMs.
- **PDF Generation:** Use a proven, robust library (implementing both, but for v0.1 the focus is on pdf-lib; puppeteer for HTML-to-PDF is to be an addition for V1.0 -- make it work).
- **Persistence:** Standard database for user accounts, projects, preferences, asset metadata.

---

## Secrets & Sensitive Data

- All sensitive configuration (API keys, credentials, etc.) must be managed using [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) only. **Do not commit secrets to the repository or use alternative secret management systems.**

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 14+ recommended) installed, or an equivalent runtime if using a different tech stack.
- Package managers such as **npm** (or yarn), and a modern browser for testing the web app.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/aetherpress.git
cd aetherpress
npm install
npm start
```

### Configuration

Set up your environment variables:

- Secrets (e.g., database credentials) are managed via Codespace secrets or GitHub repository secrets for CI/CD and deployment workflows.

### Usage

To create your eBook:

1. **Craft Your Prompt:**  
   Describe your eBook idea, including genre, tone, and any specific elements you want.

2. **Refine with the Dashboard:**  
   Use the Modular Dashboard to tweak content, adjust layouts, and insert images.

3. **Preview and Export:**  
   Continuously preview your eBook and export the final version as a PDF.

---

## Contributing

We welcome contributions to AetherPress! To get involved:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear messages.
4. Push your branch and submit a pull request.

Please ensure your code adheres to our coding standards and includes relevant tests.

---

## License

AetherPress is [ISC Licensed](LICENSE). By using AetherPress, you agree to abide by the terms of this license.

---

## Support

For support, please open an issue on GitHub or contact our support team at support@aetherpress.com.

---

## Acknowledgments

AetherPress is powered by cutting-edge technology and a passionate community. Special thanks to all contributors and early adopters who believed in our vision.

---

## Roadmap

Future enhancements for AetherPress include:

- Expanded AI capabilities for even richer content generation.
- Enhanced collaboration features for teams and organizations.
- More export options and integrations with publishing platforms.

Stay tuned for updates!

---

## Development Setup

For contributors:

- The project uses a Dev Container setup (see `.devcontainer/`) for a consistent development environment. This includes pre-installed VS Code extensions for Node.js, linting, formatting, Docker, Prisma, PostgreSQL, REST client, Tailwind CSS, and GitHub Copilot.

---
