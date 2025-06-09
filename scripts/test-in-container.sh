#!/bin/zsh
# test-in-container.sh: Run all tests inside the devcontainer context, inheriting all environment variables

# Ensure this script is run from the project root
cd "$(dirname "$0")/.."

# Check if we're inside the devcontainer (Codespaces or VS Code Dev Container)
if [ -f "/.devcontainer_marker" ] || [ "$CODESPACES" = "true" ]; then
  echo "[INFO] Running tests inside the devcontainer..."
  cd client && npm test
  cd ../server && npm test

  # Start frontend server in background for E2E tests
  cd ../client
  npm run build
  npm run start &
  NEXT_PID=$!
  echo "[INFO] Started frontend server with PID $NEXT_PID"
  sleep 5 # Wait for server to be ready

  npx playwright test
  TEST_EXIT_CODE=$?

  kill $NEXT_PID
  wait $NEXT_PID 2>/dev/null
  exit $TEST_EXIT_CODE
else
  echo "[ERROR] This script must be run inside the VS Code Dev Container or GitHub Codespace."
  echo "Open the project in a devcontainer and re-run this script."
  exit 1
fi
