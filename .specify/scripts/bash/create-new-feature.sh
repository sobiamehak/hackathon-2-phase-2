#!/bin/bash

NUMBER=${2:-1}
SHORT_NAME=${3:-"feature"}
FEATURE_DIR="specs/$NUMBER-$SHORT_NAME"
CHECKLIST_DIR="$FEATURE_DIR/checklists"
SPEC_FILE="$FEATURE_DIR/spec.md"

# Create directories
mkdir -p "$CHECKLIST_DIR"

# Output the branch name and spec file path
BRANCH_NAME="$NUMBER-$SHORT_NAME"
echo "{\"BRANCH_NAME\": \"$BRANCH_NAME\", \"SPEC_FILE\": \"$SPEC_FILE\"}"

# Create the directory if it doesn't exist
mkdir -p "$FEATURE_DIR"