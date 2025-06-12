#!/bin/zsh

# Install frontend dependencies
cd "$(dirname "$0")/../client" || exit 1
npm install
cd - > /dev/null

# Install backend dependencies
cd "$(dirname "$0")/../server" || exit 1
npm install
cd - > /dev/null
