#!/usr/bin/env bash
yarn version --new-version $1 && \
    git push && \
    git push --tags