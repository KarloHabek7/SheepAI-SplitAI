#!/bin/bash

echo "============================================="
echo "   Antigravity Local Environment Initializer   "
echo "============================================="

# 1. Touch all .agents files to force immediate indexing by the IDE
echo "Touching agent rules and workflows to trigger IDE indexing..."
find .agents/ -type f -exec touch {} + 2>/dev/null

# 2. Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

echo "Successfully initialized local environment!"
echo "Please open this root folder in Google Antigravity IDE and run /setup in the agent chat."
