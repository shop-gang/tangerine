#!/bin/zsh

# Lint frontend
cd "$(dirname "$0")/../client" || exit 1
npm run lint
cd - > /dev/null

# Lint backend
cd "$(dirname "$0")/../server" || exit 1
npm run lint
cd - > /dev/null
