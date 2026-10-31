#!/usr/bin/env bash
# Copy the shared SquirrelGo files into every app that uses them, and keep the
# desk's twins (Character Learner, Klingon, the launcher) in step with the apps.
# Usage: tools/sync-shared.sh          copy
#        tools/sync-shared.sh --check  fail if any copy is out of date (CI)
set -euo pipefail
cd "$(dirname "$0")/.."

C=squirrelgo-characters

# shared file and the apps that ship a copy of it in www/js/
# (plain lists, so this also runs on the bash 3.2 that macOS ships)
users() {
  case "$1" in
    suite.js) echo "$C/squirrelgo-kana $C/squirrelgo-alphabets $C/squirrelgo-kanji $C/squirrelgo-klingon squirrelgo-dictionary squirrelgo-phrasebook squirrelgo-orthodox-bible" ;;
    # Stroke player and checked writing pad. Kanji has its own KanjiVG player.
    strokes.js | writepad.js) echo "$C/squirrelgo-kana $C/squirrelgo-alphabets $C/squirrelgo-klingon" ;;
    pad.js) echo "$C/squirrelgo-kana $C/squirrelgo-alphabets" ;;
    speech.js) echo "$C/squirrelgo-kana $C/squirrelgo-alphabets $C/squirrelgo-kanji" ;;
  esac
}

check=0
[[ "${1:-}" == "--check" ]] && check=1

stale=0
for file in suite.js strokes.js writepad.js pad.js speech.js; do
  for app in $(users "$file"); do
    dest="$app/www/js/$file"
    if (( check )); then
      if ! cmp -s "shared/$file" "$dest"; then
        echo "out of date: $dest (run SquirrelGo-Apps/tools/sync-shared.sh)"
        stale=1
      fi
    else
      cp "shared/$file" "$dest"
      echo "synced $dest"
    fi
  done
done

# The desk side: Character Learner's list of Alphabets scripts, and the
# launcher's TOOLS against suite.js and the APK workflows.
if (( check )); then
  python3 tools/desk_twins.py --check || stale=1
else
  python3 tools/desk_twins.py
fi
exit "$stale"
