#!/bin/bash

# Determine the feature spec file by looking for the most recently created spec
FEATURE_SPEC=$(find specs -name "spec.md" -type f -exec stat -c "%Y %n" {} \; | sort -nr | head -1 | cut -d" " -f2)

# Set the implementation plan path based on the feature spec path
if [[ -n "$FEATURE_SPEC" ]]; then
    IMPL_PLAN="${FEATURE_SPEC%/*}/plan.md"
    SPECS_DIR="specs"
    BRANCH=$(basename $(dirname "$FEATURE_SPEC"))

    echo "{\"FEATURE_SPEC\": \"$FEATURE_SPEC\", \"IMPL_PLAN\": \"$IMPL_PLAN\", \"SPECS_DIR\": \"$SPECS_DIR\", \"BRANCH\": \"$BRANCH\"}"
else
    echo "{\"FEATURE_SPEC\": \"\", \"IMPL_PLAN\": \"\", \"SPECS_DIR\": \"\", \"BRANCH\": \"\"}" >&2
    exit 1
fi