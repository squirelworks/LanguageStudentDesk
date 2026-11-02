#!/usr/bin/env bash
set -euo pipefail
ROOT=/workspace
SDK="${ANDROID_HOME:-$HOME/android-sdk}"
export ANDROID_HOME="$SDK"
export UPLOAD_STORE_FILE="${UPLOAD_STORE_FILE:-/home/ubuntu/squirelworks-upload.keystore}"
export UPLOAD_STORE_PASSWORD="${UPLOAD_STORE_PASSWORD:-$(grep UPLOAD_STORE_PASSWORD /home/ubuntu/squirelworks-upload.password | cut -d= -f2)}"
export UPLOAD_KEY_ALIAS="${UPLOAD_KEY_ALIAS:-squirelworks-upload}"
export UPLOAD_KEY_PASSWORD="${UPLOAD_KEY_PASSWORD:-$UPLOAD_STORE_PASSWORD}"
OUT_AAB="$ROOT/aabs"
OUT_ART="/opt/cursor/artifacts/aabs"
mkdir -p "$OUT_AAB" "$OUT_ART"

verify_bundle() {
  local aab="$1" apk="$2" name="$3" asset_subpath="${4:-assets/www/index.html}"
  python3 - "$aab" "$apk" "$name" "$asset_subpath" <<'PY'
import sys, zipfile
aab, apk, name, needle = sys.argv[1:5]
def find(path):
    with zipfile.ZipFile(path) as z:
        for n in z.namelist():
            if needle in n:
                return n
    return None
pa = find(aab)
pp = find(apk)
if not pa or not pp:
    print(f"FAIL {name}: need *{needle}* in aab/apk; got aab={pa} apk={pp}", file=sys.stderr)
    sys.exit(1)
print(f"OK {name}: {pa} | {pp}")
PY
}

build_app() {
  local dir="$1" aab_name="$2" apk_name="$3" asset_path="${4:-assets/www/index.html}"
  echo "======== BUILD $aab_name ========"
  cd "$dir/android"
  ./gradlew bundleRelease assembleRelease --no-daemon -q
  local aab="app/build/outputs/bundle/release/app-release.aab"
  local apk="app/build/outputs/apk/release/app-release.apk"
  verify_bundle "$aab" "$apk" "$aab_name" "$asset_path"
  cp "$aab" "$OUT_AAB/${aab_name}.aab"
  cp "$apk" "$OUT_AAB/${apk_name}.apk"
  cp "$apk" "$OUT_ART/${apk_name}.apk"
}

build_app "$ROOT/SquirrelGo-Apps/programming-student-desk" ProgrammingStudentDesk ProgrammingStudentDesk "SquirrelGo-Apps/programming-student-desk/www/index.html"
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-phrasebook" SquirrelGoPhrasebook SquirrelGoPhrasebook
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-orthodox-bible" SquirrelGoOrthodoxBible SquirrelGoOrthodoxBible
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-klingon" SquirrelGoKlingon SquirrelGoKlingon
# kana already built but rebuild for consistency
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana" SquirrelGoKana SquirrelGoKana
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kanji" SquirrelGoKanji SquirrelGoKanji
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-dictionary" SquirrelGoJapaneseDictionary SquirrelGoJapaneseDictionary
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets" SquirrelGoAlphabets SquirrelGoAlphabets
build_app "$ROOT/SquirrelGo-Apps/lsd-suite" LanguageStudentDesk LanguageStudentDesk "SquirrelGo-Apps/lsd-suite/www/index.html"
build_app "$ROOT/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo" SquirrelGoBopomofo SquirrelGoBopomofo

echo "All builds finished."
