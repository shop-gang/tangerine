#!/bin/zsh
# test.sh: Run all coverage tests from the project root

cd "$(dirname "$0")/.."

# Frontend coverage
cd ./client && npm run test:coverage

# Backend coverage
cd ../server && npm run test:coverage

# Print report locations
cd ../client && echo "[INFO] Frontend coverage report: client/coverage/lcov-report/index.html"
cd ../server && echo "[INFO] Backend coverage report: server/coverage/index.html"
