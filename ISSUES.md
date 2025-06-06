# ISSUES: Core MVP Features (Phase 1)

This document tracks the implementation progress for Task 5: Core MVP Features (Phase 1). Check off items as they are completed. This list should be kept in sync with `NEXT_STEPS.md`.

---

## Task: 5. Core MVP Features (Phase 1) — Way Forward

### 1. Implement prompt input UI in the frontend

- [ ] Add a prompt input component to `client/src/app/page.tsx` (or a new component).
- [ ] UI: Simple text input + submit button.
- [ ] State: Store prompt in React state.

### 2. Set up backend API endpoint to receive prompt and return a mock eBook draft

- [ ] In `server/index.js`, add a POST `/api/draft` endpoint.
- [ ] Accepts `{ prompt: string }` in the body.
- [ ] Returns a mock eBook draft (JSON with title, content, etc.).

### 3. Integrate live preview in the frontend

- [ ] After submitting a prompt, call the backend endpoint.
- [ ] Display the returned draft in a preview area (could be a new component).

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

## Next Steps (Action Plan)

1. **Frontend:**

   - [ ] Create a prompt input form and preview component.
   - [ ] Add API call logic to submit prompt and display results.
   - [ ] Add a stub "Export as PDF" button.

2. **Backend:**

   - [ ] Implement `/api/draft` POST endpoint.
   - [ ] Add stub AI Orchestrator and agent modules.
   - [ ] Return mock eBook draft data.

3. **Shared:**

   - [ ] Define TypeScript types for eBook draft in `shared/types/index.ts` for use in both frontend and backend.

4. **Test:**
   - [ ] Manually test the flow: prompt → backend → preview → export.
