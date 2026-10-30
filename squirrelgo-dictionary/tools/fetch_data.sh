#!/usr/bin/env bash
# Download the latest jmdict-simplified release and rebuild www/data/.
# Usage: tools/fetch_data.sh [release-tag]   (default: latest)
set -euo pipefail
cd "$(dirname "$0")/.."
REPO=scriptin/jmdict-simplified
# releases/latest redirects to releases/tag/<tag>; no API token needed.
TAG=${1:-$(curl -fsSIL -o /dev/null -w '%{url_effective}' "https://github.com/$REPO/releases/latest" | sed 's#.*/tag/##')}
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
for name in jmdict-examples-eng kanjidic2-en radkfile kradfile; do
  echo "Downloading $name $TAG"
  curl -fsSL -o "$WORK/$name.tgz" "https://github.com/$REPO/releases/download/$TAG/$name-$TAG.json.tgz"
  tar -xzf "$WORK/$name.tgz" -C "$WORK"
done
python3 -I tools/build_data.py "$WORK"/jmdict-examples-eng-*.json "$WORK"/kanjidic2-en-*.json \
  "$WORK"/radkfile-*.json "$WORK"/kradfile-*.json www/data
