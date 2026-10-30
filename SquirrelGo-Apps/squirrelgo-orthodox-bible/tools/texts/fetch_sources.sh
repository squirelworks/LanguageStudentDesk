#!/usr/bin/env bash
# Download the public-domain sources used by build_*.py into .cache/.
#   ./fetch_sources.sh            GitHub-hosted sources (scrollmapper, byztxt,
#                                 versification files, Fathers commentary)
#   ./fetch_sources.sh ebible     only the eBible.org USFM zips
#                                 (Brenton Greek/English, Arabic Van Dyck)
set -euo pipefail
cd "$(dirname "$0")"
CACHE="${SGO_TEXTS_CACHE:-.cache}"
mkdir -p "$CACHE"

get() { # url dest
  [ -s "$2" ] && return 0
  mkdir -p "$(dirname "$2")"
  curl -fsSL --retry 3 -o "$2.part" "$1" && mv "$2.part" "$2"
}

clone() { # repo dir
  [ -d "$CACHE/$2/.git" ] && return 0
  git clone -q --depth 1 "https://github.com/$1" "$CACHE/$2"
}

if [ "${1:-}" = "ebible" ]; then
  for id in grcbrent eng-Brenton arb-vd; do
    get "https://ebible.org/Scriptures/${id}_usfm.zip" "$CACHE/ebible/${id}_usfm.zip"
  done
  exit 0
fi

SM=https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json
for f in RusSynodal CSlElizabeth SrKDIjekav FreLXXGiguet GreVamvas KJVA; do
  get "$SM/$f.json" "$CACHE/scrollmapper/$f.json"
done

clone byztxt/greektext-antoniades greektext-antoniades
clone byztxt/byzantine-majority-text byzantine-majority-text

# Paratext/SIL standard versification files (as published with the eBible corpus).
VRS=https://raw.githubusercontent.com/BibleNLP/ebible/main/metadata
for f in org lxx rso eng; do
  get "$VRS/$f.vrs" "$CACHE/vrs/$f.vrs"
done

# Patristic commentary keyed to verses (large: about 400 MB).
clone HistoricalChristianFaith/Commentaries-Database commentaries
