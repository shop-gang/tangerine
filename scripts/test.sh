// scripts/test.sh
#!/bin/zsh

# Test frontend
cd ../client && npm test

# Test backend
cd ../server && npm test

# Run E2E tests (from client)
cd ../client && npx playwright test
