#!/bin/zsh
# test-in-container.sh: Run all tests inside the devcontainer context, inheriting all environment variables

# Ensure this script is run from the project root
cd "$(dirname "$0")/.."

# Check if we're inside the devcontainer (Codespaces or VS Code Dev Container)
if [ -f "/.devcontainer_marker" ] || [ "$CODESPACES" = "true" ]; then
  echo "[INFO] Running tests inside the devcontainer..."
  cd client && npm run test:coverage
  cd ../server && npm run test:coverage
  cd ../client && echo "[INFO] Frontend coverage report: client/coverage/lcov-report/index.html"
  cd ../server && echo "[INFO] Backend coverage report: server/coverage/index.html"
else
  echo "[ERROR] This script must be run inside the VS Code Dev Container or GitHub Codespace."
  echo "Open the project in a devcontainer and re-run this script."
  exit 1
fi
