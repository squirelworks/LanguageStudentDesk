#!/usr/bin/env bash
# Download the Noto fonts the stroke drafts are traced from (SIL Open Font
# License, via the @fontsource npm packages) into fonts/ as TrueType files.
# The fonts are only build inputs and are not committed.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p fonts/.pkg
for pkg in "$@"; do
  [ -d "fonts/.pkg/$pkg" ] && continue
  (cd fonts/.pkg && npm pack "@fontsource/$pkg" --silent >/dev/null && mkdir -p "$pkg" && tar xzf fontsource-"$pkg"-*.tgz -C "$pkg" && rm fontsource-"$pkg"-*.tgz)
done
for f in fonts/.pkg/*/package/files/*-400-normal.woff; do
  out="fonts/$(basename "${f%.woff}").ttf"
  [ -f "$out" ] || python3 -c 'import sys; from fontTools.ttLib import TTFont; t=TTFont(sys.argv[1]); t.flavor=None; t.save(sys.argv[2])' "$f" "$out"
done
ls fonts/*.ttf
