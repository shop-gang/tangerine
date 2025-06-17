#!/bin/zsh
# test.sh: Run all coverage tests from the project root

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

# Frontend tests
echo "[INFO] Running frontend tests..."
cd ./client
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
