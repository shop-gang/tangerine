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
