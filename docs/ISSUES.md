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

### 4. Add PDF export functionality (can be stubbed initially)

- [ ] Add a button in the frontend to "Export as PDF".
- [ ] For now, clicking it can trigger a download of a static or mock PDF (or just a placeholder message).

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

2. Type Definitions ✅
   - Created shared types for prompt requests/responses
   - Defined eBook draft structure

3. Project Setup ✅
   - Updated to ISC license with proper attribution
   - Set up project structure and configuration
   - Added required documentation

### Pending:
1. Backend Implementation ✅
   - Create `/api/draft` endpoint ✅
   - Implement mock data generation ✅
   - Set up AI orchestration structure ✅

2. PDF Export Feature
   - Add export button
   - Implement basic PDF generation

### Next Immediate Steps:
1. **Backend:** ✅
   - [x] Implement `/api/draft` POST endpoint.
   - [x] Add stub AI Orchestrator and agent modules.
   - [x] Return mock eBook draft data.

2. **Integration:**
   - [ ] Test end-to-end flow: prompt → backend → preview
   - [ ] Add basic error handling for API failures

3. **Export:**
   - [ ] Add PDF export button
   - [ ] Implement basic PDF generation

### Quality Improvements

1. **Testing:**
   - [ ] Add component tests for:
     - [ ] Prompt input form
     - [ ] Loading states
     - [ ] Draft preview
     - [ ] Error states
   - [ ] Add integration tests for API service
   - [ ] Set up test coverage reporting

2. **Error Handling:**
   - [ ] Implement Error Boundary component
   - [ ] Add fallback UI for failed states
   - [ ] Improve error messages for user comprehension

3. **Accessibility:**
   - [ ] Add ARIA labels and roles
   - [ ] Implement keyboard navigation
   - [ ] Test with screen readers
   - [ ] Add loading announcements
   - [ ] Ensure proper focus management
   - [ ] Add skip links if needed

4. **Performance:**
   - [ ] Add loading skeleton for preview
   - [ ] Implement debouncing for API calls
   - [ ] Optimize draft preview rendering

Priority order:
1. Error Boundary (prevents app crashes)
2. Component Tests (ensures stability)
3. Accessibility (makes app usable for all)
4. Performance optimizations (improves UX)
