# Client (Frontend)

This folder contains the React/Next.js frontend for AetherPress.

## Overview

AetherPress is the magic wand for creating visually stunning, graphically rich eBooks powered by intelligent AI.  
The frontend implements the user interface, including the prompt input, modular dashboard, live preview, and export functionality.  
It communicates with the backend server for AI-driven content and image generation.

## Key Features

- Clean, intuitive UI for entering prompts and editing eBooks.
- Modular dashboard for content, images, layout, and settings.
- Dynamic live preview and PDF export.
- **Prompt Engine:** Uses natural language processing to interpret creative prompts.
- **Modular Dashboard:** Distinct modules for content, images, layout, and settings.
- **Dynamic Live Preview & Export:** See changes in real time and export high-fidelity PDFs.

## Technology

- **Frontend:** React/Next.js (component-based, responsive UI)
- **Styling:** Tailwind CSS
- **TypeScript:** For type safety and shared types with backend

## Development

- Run `npm install` and `npm run dev` inside this folder to start the frontend in development mode.

See the main project [README.md](../README.md) for setup instructions and prerequisites.

## Secrets & Sensitive Data

- All sensitive configuration (API keys, credentials, etc.) must be managed using [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) only. **Do not commit secrets to the repository.**

## Notes

- For CI/CD and deployment, required secrets should be managed via GitHub repository secrets.

## Technical Specification (Dev Environment)

- **Containerization:** Uses a Docker-based dev environment for consistency and reproducibility.
- **Services:**
  - `app` (main dev environment, mounts repo, exposes ports 3000 (frontend), 5000 (backend), 5432 (Postgres))
  - `db` (PostgreSQL 15, persistent volume, healthcheck, secrets for credentials)
- **Features:** Node.js (LTS), GitHub CLI, Zsh, common utilities.
- **VS Code Extensions:** Pre-installed for Node.js, linting, formatting, Docker, Prisma, PostgreSQL, REST client, Tailwind CSS, GitHub Copilot.
- **Environment:** All secrets (DB, API keys) are injected via environment variables, never hardcoded.
- **Usage:** Open in VS Code and use "Reopen in Container" or Codespaces for a ready-to-code environment.
