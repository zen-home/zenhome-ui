#!/bin/bash

# Get the current Git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Check if the current branch starts with "release/"
if [[ $current_branch != release/* ]]; then
    echo "Releases can only be made from a release branch. Please switch to a release branch and try again."
    exit 1
fi

# Run standard-version
yarn standard-version
