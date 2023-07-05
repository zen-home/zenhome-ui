#!/bin/bash

# Get the current Git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Run standard-version in dry-run mode to get the new version
output=$(yarn standard-version --dry-run)

# Parse the new version from the output
version=$(echo "$output" | grep -o 'new version.*' | awk '{print $3}')

# Create and switch to new release branch
git checkout -b "release/$version"

# Run the actual standard-version to update files and make a commit
yarn standard-version

echo "Switched to new branch 'release/$version' and made a release commit"
