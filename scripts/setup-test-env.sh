#!/bin/zsh
# setup-test-env.sh: Configure isolated test environments for different contexts

set -e  # Exit on error

# Function to set up environment variables
setup_env_vars() {
    local env=$1
    echo "Setting up environment variables for $env environment..."
    
    case $env in
        "local")
            export TEST_DB_HOST="localhost"
            export TEST_DB_PORT="5432"
            ;;
        "ci")
            export TEST_DB_HOST="test-db"
            export TEST_DB_PORT="5432"
            ;;
        "devcontainer")
            export TEST_DB_HOST="localhost"
            export TEST_DB_PORT="5432"
            ;;
        *)
            echo "Unknown environment: $env"
            exit 1
            ;;
    esac

    # Common test environment variables
    export NODE_ENV="test"
    export TEST_DB_NAME="aether_test"
    export TEST_DB_USER="test_user"
    export TEST_DB_PASSWORD="test_password"
    export API_URL="http://localhost:3000"
}

# Function to wait for database to be ready
wait_for_db() {
    echo "Waiting for database to be ready..."
    "$(dirname "$0")/devcontainer_db_health_check.sh"
}

# Function to reset test database
reset_test_db() {
    echo "Resetting test database..."
    # Add database reset logic here
    # This is a placeholder - implement based on your DB setup
}

# Function to load test fixtures
load_test_fixtures() {
    echo "Loading test fixtures..."
    # Add fixture loading logic here
    # This is a placeholder - implement based on your data needs
}

# Main setup function
setup_test_environment() {
    local env=$1

    echo "Setting up test environment for: $env"

    # 1. Set up environment variables
    setup_env_vars "$env"

    # 2. Wait for database if in container environment
    if [ "$env" = "devcontainer" ] || [ "$env" = "ci" ]; then
        wait_for_db
    fi

    # 3. Reset test database
    reset_test_db

    # 4. Load test fixtures
    load_test_fixtures

    # 5. Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi

    echo "Test environment setup complete for: $env"
}

# Check command line arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <environment>"
    echo "Environments: local, ci, devcontainer"
    exit 1
fi

# Main execution
setup_test_environment "$1"
