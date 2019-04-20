#!/usr/bin/env bash
set -eu
cd ./extension/public

version=$(node -p "require('./manifest.json').version")

zip -r ../../dist/chrome-${version}.zip .
zip -r ../../dist/firefox-${version}.zip .
