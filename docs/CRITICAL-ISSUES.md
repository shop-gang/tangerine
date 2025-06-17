# CRITICAL-ISSUES: Testing Infrastructure Achievables

This checklist tracks the achievables required to realize the goals in the CRITICAL document. Mark each item as completed when done.

## Achievables Checklist

- [x] **Framework & Tooling Setup**

  - [x] Install and configure Jest for client-side unit tests
  - [x] Install and configure Vitest for server-side unit/integration tests
  - [x] Set up Playwright for end-to-end and integration testing
  - [x] Ensure all test runners and scripts (`test.sh`, `test-in-container.sh`) are functional

- [ ] **Environment Consistency**

  - [ ] Create/update scripts for isolated test environments (local, CI, dev containers)
  - [ ] Provide configuration for mocking/stubbing APIs, services, and databases

- [x] **Quality & Coverage**

  - [x] Integrate ESLint and Prettier into the workflow (ESLint config now robust, Playwright/Jest separation handled)
  - [ ] Set up code coverage tools and enforce minimum thresholds in CI

- [ ] **CI/CD Integration**

  - [ ] Update CI pipelines to run all tests and block merges on failure
  - [ ] Automate artifact upload (logs, coverage reports) for test runs

- [ ] **Documentation & Onboarding**

  - [ ] Write documentation on how to write, run, and debug tests
  - [ ] Provide sample tests for unit, integration, and e2e

- [ ] **Maintenance & Scalability**
  - [ ] Organize test directories for clarity and scalability
  - [ ] Document process for updating and maintaining test dependencies

---

Update this checklist as progress is made. Each item should be checked off only when fully complete.
