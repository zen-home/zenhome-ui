#!/bin/bash

# Get the current Git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Run standard-version in dry-run mode to get the new version
output=$(npx standard-version --dry-run)

# Parse the new version from the output
version=$(echo "$output" | grep -o 'bumping version in package.json from [0-9.]* to [0-9.]*' | awk '{print $8}')

# Create and switch to the new release branch
release_branch="release/$version"
git checkout "$release_branch" 2>/dev/null || git checkout -b "$release_branch"
echo "Switched to new branch '$release_branch'"
echo "Running tests and build"

# Run the actual standard-version to update files and make a commit
npx standard-version

# Push the new release branch
# git push --set-upstream origin "$release_branch"
