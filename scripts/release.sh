#!/usr/bin/env bash

echo "Enter the version type you want to publish (major, minor, patch):"
read versionType

# validate versionType
if [ "$versionType" != "major" ] && [ "$versionType" != "minor" ] && [ "$versionType" != "patch" ]; then
  echo "Invalid version type. Must be 'major', 'minor', or 'patch'."
  exit 1
fi

# Optional: add more questions here as needed for your workflow

# Check current branch
branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" != "main" ]; then
  echo "You can't create a new version outside the main branch"
  exit 1
fi

# Create a new version
yarn version $versionType
