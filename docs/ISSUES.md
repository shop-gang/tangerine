# ISSUES: Core MVP Features (Phase 1)

This document tracks the implementation progress for Task 5: Core MVP Features (Phase 1). Check off items as they are completed. This list should be kept in sync with `NEXT_STEPS.md`.

---

## Task: 5. Core MVP Features (Phase 1) — Way Forward

### 1. Implement prompt input UI in the frontend ✅

- [x] Add a prompt input component to `client/src/app/page.tsx` (or a new component).
- [x] UI: Simple text input + submit button.
- [x] State: Store prompt in React state.

### 2. Set up backend API endpoint to receive prompt and return a mock eBook draft ✅

- [x] In `server/index.js`, add a POST `/api/draft` endpoint.
- [x] Accepts `{ prompt: string }` in the body.
- [x] Returns a mock eBook draft (JSON with title, content, etc.).

### 3. Integrate live preview in the frontend ✅

- [x] After submitting a prompt, call the backend endpoint.
- [x] Display the returned draft in a preview area (could be a new component).

### 4. Add PDF export functionality (can be stubbed initially) ✅

- [x] Add a button in the frontend to "Export as PDF".
- [x] Implement basic PDF generation with title, content, and image placeholders.

### 5. Set up the basic AI Orchestrator and stub Content/Image/Assembly agents

- [ ] In the backend, create stub functions/classes for:
  - [ ] AI Orchestrator
  - [ ] Content Agent
  - [ ] Image Agent
  - [ ] Assembly Agent
- [ ] For now, these can just return mock data, but structure them for future expansion.

---

## Current Progress Summary (June 9, 2025 - EOD)

### Completed:

1. Frontend Implementation ✅

   - Implemented prompt input UI with state management
   - Added loading states and error handling
   - Created draft preview area with PDF export
   - Set up API integration with retry logic
   - Added robust PDF export functionality
   - Verified end-to-end integration
   - Implemented comprehensive error handling

2. Type Definitions ✅

   - Created shared types for prompt requests/responses
   - Defined eBook draft structure
   - Validated types across frontend and backend

3. Project Setup ✅

   - Updated to ISC license with proper attribution
   - Set up project structure and configuration
   - Added required documentation
   - Configured correct API endpoints

4. Backend Implementation ✅
   - Created `/api/draft` endpoint
   - Implemented mock data generation
   - Set up basic AI orchestration structure
   - Verified CORS and API connectivity

### Testing Status (June 9, 2025):

1. End-to-End Flow ✅

   - API connectivity verified
   - Draft generation tested
   - Preview rendering confirmed
   - PDF export functionality working
   - Loading states functioning

2. Error Cases to Test:
   - [x] Network failures (tested: server down scenario) ✅
   - [x] Invalid prompt handling (added user-friendly messages) ✅
   - [x] PDF generation errors (implemented with retry logic) ✅
   - [x] Server timeout scenarios (implemented with AbortSignal) ✅

### Pending:

1. ⚠️ Testing Infrastructure (IN PROGRESS)

   - [x] Frontend test setup ✅
     - [x] Configure Jest and React Testing Library
     - [x] Add `client/__tests__/` directory
     - [x] Set up component test examples (ErrorBoundary)
     - [x] Add E2E test configuration (Playwright, robust Jest/Playwright separation, and test-in-container script improvements)
   - [x] Backend test setup ✅
     - [x] Configure Vitest
     - [x] Add `server/__tests__/` directory
     - [x] Set up API test examples
     - [x] Add integration test framework (supertest)
   - [x] Test scripts and CI
     - [x] Update `scripts/test.sh` and `scripts/test-in-container.sh` to run all test types and handle E2E server startup
     - [x] Configure test coverage reporting (See Test Covearage Reporting To-Do below)

2. Error Handling Improvements

   - [x] Improve error messages for users ✅
   - [x] Implement Error Boundary component ✅
   - [x] Add network error retry logic ✅
   - [x] Add timeout handling ✅

3. AI Orchestration
   - Implement Content Agent
   - Implement Image Agent
   - Implement Assembly Agent

### Next Immediate Steps:

1. **Error Handling:** ✅

   - [x] Add Error Boundary component ✅
   - [x] Implement network error retries ✅
   - [x] Add timeout handling ✅
   - [x] Improve user-facing error messages ✅

2. **AI Integration:**
   - [ ] Expand AI Orchestrator functionality
   - [ ] Implement specialized agents
   - [ ] Add content generation capabilities

---

## Test Coverage Reporting To-Do (as of June 10, 2025)

- [x] Frontend: Ensure Jest is configured to collect coverage and run with `npm run test:coverage`.
- [x] Backend: Ensure Vitest is configured to collect coverage and run with `npm run test:coverage`.
- [x] Integrate coverage reporting into `scripts/test.sh` and `scripts/test-in-container.sh` for both frontend and backend.
- [ ] Add CI workflow steps to run coverage and (optionally) upload to Codecov or Coveralls.
- [ ] Optionally set minimum coverage thresholds in Jest and Vitest configs.
- [ ] Document how to view and interpret coverage reports in CONTRIBUTING.md or relevant docs.

> **Note:**
> If you see messages like `Jest: "global" coverage threshold for statements (80%) not met: 5.14%`, this means your current test suite does not cover enough of the codebase to meet the configured thresholds. These messages are a prompt to add more tests. As you increase test coverage, these warnings will disappear once thresholds are met.

---

## Next Immediate Steps (Storage Cleanup):

1. **Free Up Workspace Storage:**
   - [ ] Delete old coverage reports and test results in `client/coverage/`, `server/coverage/`, and `client/test-results/`.
   - [ ] Run `npm prune` in all `package.json` directories to remove extraneous packages.
   - [ ] Remove unused files in `docs/archive/` and other documentation folders.
   - [ ] Run `npm cache clean --force` and clear other package manager caches if used.
   - [ ] (Optional) Prune unused Docker images/containers if using Docker: `docker system prune -a`.
   - [ ] (Optional) Prune devcontainer layers: `docker image prune` or use VS Code Dev Containers command.
   - [ ] Move large, infrequently used files to external or cloud storage if possible.

---

#### Documentation updated June 9, 2025: E2E and integration test setup, robust Jest/Playwright separation, and test-in-container script improvements complete.
