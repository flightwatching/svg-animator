#!/bin/bash
set -e
echo "machine github.com" >> ~/.netrc
echo "login lightplay8@gmail.com" >> ~/.netrc
echo "password $GITHUB_TOKEN" >> ~/.netrc
