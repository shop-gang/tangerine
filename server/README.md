# Server (Backend)

This folder contains the Node.js/Express backend for AetherPress.

## Overview

AetherPress is the magic wand for creating visually stunning, graphically rich eBooks powered by intelligent AI.  
The backend handles API requests from the frontend for prompt processing, AI orchestration, content/image generation, and PDF export.  
It integrates with AI services and manages the core logic for assembling eBook drafts.

## Key Features

- **Prompt Engine:** Parses user input for themes, content types, and design cues.
- **AI Orchestrator:** Delegates tasks to Content, Image, Layout, and Assembly agents.
- **Content/Image Agents:** Generate text and images using AI services.
- **Layout & Assembly Engines:** Combine all elements into a cohesive draft.
- Endpoints for draft generation, live preview, and export.

## Technology

- **Backend:** Node.js/Express
- **Database:** PostgreSQL (see root README for details)
- **AI:** Integrates with external AI APIs (e.g., Gemini for text/image generation)
- **PDF Generation:** Uses robust libraries for PDF export
- **TypeScript:** For type safety and shared types with frontend

## Development

- Run `npm install` and `npm start` inside this folder to start the backend server.
- Tests can be run with `npm test` (uses Vitest).

See the main project [README.md](../README.md) for setup instructions and prerequisites.

## Secrets & Sensitive Data

- All sensitive configuration (API keys, credentials, etc.) must be managed using [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) only. **Do not commit secrets to the repository.**

## Deployment & Notes

- For CI/CD and deployment, required secrets should be managed via GitHub repository secrets.
- Refer to the root README for database setup and environment configuration.

## Technical Specification (Dev Environment)

- **Containerization:** Uses a Docker-based dev environment for consistency and reproducibility.
- **Services:**
  - `app` (main dev environment, mounts repo, exposes ports 3000 (frontend), 5000 (backend), 5432 (Postgres))
  - `db` (PostgreSQL 15, persistent volume, healthcheck, secrets for credentials)
- **Features:** Node.js (LTS), GitHub CLI, Zsh, common utilities.
- **VS Code Extensions:** Pre-installed for Node.js, linting, formatting, Docker, Prisma, PostgreSQL, REST client, Tailwind CSS, GitHub Copilot.
- **Environment:** All secrets (DB, API keys) are injected via environment variables, never hardcoded.
- **Usage:** Open in VS Code and use "Reopen in Container" or Codespaces for a ready-to-code environment.
