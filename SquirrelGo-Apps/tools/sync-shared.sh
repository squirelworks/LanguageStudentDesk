#!/usr/bin/env bash
# Copy the shared SquirrelGo files into every app that uses them.
# Usage: tools/sync-shared.sh          copy
#        tools/sync-shared.sh --check  fail if any copy is out of date (CI)
set -euo pipefail
cd "$(dirname "$0")/.."

APPS=(
  squirrelgo-characters/squirrelgo-kana
  squirrelgo-characters/squirrelgo-alphabets
  squirrelgo-characters/squirrelgo-kanji
  squirrelgo-dictionary
  squirrelgo-phrasebook
)

stale=0
for app in "${APPS[@]}"; do
  dest="$app/www/js/suite.js"
  if [[ "${1:-}" == "--check" ]]; then
    if ! cmp -s shared/suite.js "$dest"; then
      echo "out of date: $dest (run SquirrelGo-Apps/tools/sync-shared.sh)"
      stale=1
    fi
  else
    cp shared/suite.js "$dest"
    echo "synced $dest"
  fi
done
exit "$stale"
