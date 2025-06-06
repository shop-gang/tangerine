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

## Current Progress Summary (June 6, 2025)

### Completed:
1. Frontend Implementation ✅
   - Implemented prompt input UI with state management
   - Added loading states and error handling
   - Created draft preview area
   - Set up API integration structure
   - Added PDF export functionality

2. Type Definitions ✅
   - Created shared types for prompt requests/responses
   - Defined eBook draft structure

3. Project Setup ✅
   - Updated to ISC license with proper attribution
   - Set up project structure and configuration
   - Added required documentation

4. Backend Implementation ✅
   - Created `/api/draft` endpoint
   - Implemented mock data generation
   - Set up basic AI orchestration structure

### Pending:
1. Integration Testing
   - Test end-to-end flow: prompt → backend → preview → PDF
   - Add basic error handling for API failures

2. AI Orchestration
   - Implement Content Agent
   - Implement Image Agent
   - Implement Assembly Agent

### Next Immediate Steps:
1. **Testing:**
   - [ ] Test end-to-end flow
   - [ ] Add error handling for API failures
   - [ ] Verify PDF generation across different content types

2. **AI Integration:**
   - [ ] Expand AI Orchestrator functionality
   - [ ] Implement specialized agents
   - [ ] Add content generation capabilities
