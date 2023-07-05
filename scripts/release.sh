#!/bin/bash

# Get the current Git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Run standard-version
yarn standard-version --commit false

# Get the new version number
version=$(node -p -e "require('./package.json').version")

# Create and switch to new release branch
git checkout -b "release/$version"

echo "Switched to new branch 'release/$version'"
