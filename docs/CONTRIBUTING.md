# Contributing to AetherPress AI

Thank you for your interest in contributing! This guide explains our workflow, coding standards, and how to get started.

## Project Structure

- `.devcontainer/` – Only for dev environment setup
- `client/` – React/Next.js frontend
- `docs/` – Project documentation (including this file)
- `shared/` – For reusable assets across client and server (e.g., types, utilities)
- `scripts/` – For automation scripts (setup, lint, test, deploy, etc.)
- `server/` – Node.js/Express backend
- `.github/` – GitHub Actions workflows

## Branching Strategy

- `main`: Stable, production-ready code
- `dev`: Ongoing development and integration
- `feature/*`: Feature branches (merge to `dev` via PR)
- `hotfix/*`: Urgent fixes (merge to `main` and `dev`)

## Pull Requests & Code Review

- Open PRs against the `dev` branch
- Ensure all checks (lint, test, CI) pass before requesting review
- Use clear, descriptive PR titles and link related issues
- At least one approval required before merging

## Local Development

- The project uses a Dev Container setup (see `.devcontainer/`) for a consistent environment, including pre-installed VS Code extensions for Node.js, linting, formatting, Docker, Prisma, PostgreSQL, REST client, Tailwind CSS, and GitHub Copilot.
- Secrets (e.g., database credentials) are managed via Codespace secrets
- For local dev, copy `.env.example` to `.env` and fill in required values. For CI/CD and deployment, secrets are managed via GitHub repository secrets.

## Running Tests

- **Backend:**
  - `cd server && npm test` (runs Vitest)
- **Frontend:**
  - `cd client && npm test` (runs React Testing Library)
- Add/expand tests for new features and bugfixes

## Linting & Formatting

- **Backend:** `cd server && npm run lint`
- **Frontend:** `cd client && npm run lint`
- Code should be formatted with Prettier (auto-format on save is recommended)

## CI/CD

- All PRs run backend CI (lint + test) via GitHub Actions
- Additional workflows for frontend and deploys are planned

## Documentation

- Update or add docs in the `docs/` directory as needed
- API documentation is generated via Swagger/OpenAPI (see `/server/docs` endpoint when available)

## Issues & Feature Requests

- Use GitHub Issues to report bugs or request features
- Please search for existing issues before opening a new one

## Viewing and Interpreting Coverage Reports

- **Frontend (Jest):**

  - Run `cd client && npm run test:coverage` to generate a coverage report.
  - Open `client/coverage/lcov-report/index.html` in your browser for a detailed, navigable report.
  - Minimum global coverage thresholds are enforced (80% for branches, functions, lines, statements). If not met, CI will fail.

- **Backend (Vitest):**

  - Run `cd server && npm run test:coverage` to generate a coverage report.
  - Open `server/coverage/index.html` in your browser for a detailed, navigable report.
  - Minimum global coverage thresholds are enforced (80% for branches, functions, lines, statements). If not met, CI will fail.

- **CI Integration:**
  - Coverage is automatically run and uploaded to Codecov on every PR and push to `main` or `dev`.
  - You can view coverage status and details directly in the Codecov UI (see PR checks for links).

> If you see a coverage threshold error in CI, add or improve tests to increase coverage.

---

Thank you for helping make AetherPress AI better!
