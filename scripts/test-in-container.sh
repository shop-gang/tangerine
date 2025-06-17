#!/bin/zsh
# test-in-container.sh: Run all tests inside the devcontainer context

set -e  # Exit on error

# Function to check if npm dependencies are installed
check_dependencies() {
    if [ ! -d "node_modules" ]; then
        echo "[INFO] Installing dependencies in $PWD..."
        npm install
    fi
}

# Navigate to project root
cd "$(dirname "$0")/.."

# Check if we're inside the devcontainer (Codespaces or VS Code Dev Container)
if [ -f "/.devcontainer_marker" ] || [ "$CODESPACES" = "true" ]; then
    echo "[INFO] Running tests inside the devcontainer..."
    
    # Set up test environment
    chmod +x scripts/setup-test-env.sh
    ./scripts/setup-test-env.sh devcontainer
    
    # Frontend tests
    echo "[INFO] Running frontend tests..."
    cd client
    check_dependencies
    npm run test:coverage
    FRONTEND_EXIT=$?

    # Backend tests
    echo "[INFO] Running backend tests..."
    cd ../server
    check_dependencies
    npm run test:coverage
    BACKEND_EXIT=$?

    # Print report locations
    echo "[INFO] Frontend coverage report: client/coverage/lcov-report/index.html"
    echo "[INFO] Backend coverage report: server/coverage/index.html"

    # Exit with error if any test suite failed
    if [ $FRONTEND_EXIT -ne 0 ] || [ $BACKEND_EXIT -ne 0 ]; then
        echo "[ERROR] One or more test suites failed"
        exit 1
    fi

    echo "[SUCCESS] All tests completed successfully"
    exit 0
else
    echo "[ERROR] This script must be run inside the VS Code Dev Container or GitHub Codespace."
    echo "Open the project in a devcontainer and re-run this script."
    exit 1
fi
