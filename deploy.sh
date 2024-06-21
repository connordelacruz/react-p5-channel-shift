#!/usr/bin/env bash

if [[ $# > 0 ]]; then
    npm run deploy -- -m "$@"
else
    echo 'Please provide text explaining the changes'
fi
