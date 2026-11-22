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
            if n == needle or n.endswith("/" + needle):
                return n
    return None
pa = find(aab)
pp = find(apk)
if not pa or not pp:
    print(f"FAIL {name}: need {needle} in aab/apk; got aab={pa} apk={pp}", file=sys.stderr)
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
  cp "$apk" "$OUT_ART/${apk_name}.apk"
}

echo "======== BUILD ProgrammingStudentDesk (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:programming:assembleRelease --no-daemon -q
  cp android/programming/build/outputs/apk/release/*.apk "$OUT_ART/ProgrammingStudentDesk.apk"
)
echo "======== BUILD MathsEduTrainingHelper (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:math:assembleRelease --no-daemon -q
  cp android/math/build/outputs/apk/release/*.apk "$OUT_ART/MathsEduTrainingHelper.apk"
)
echo "======== BUILD ElectronicsStudentDesk (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:electronics:assembleRelease --no-daemon -q
  cp android/electronics/build/outputs/apk/release/*.apk "$OUT_ART/ElectronicsStudentDesk.apk"
)
echo "======== BUILD SquirrelGoPhrasebook (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:phrasebook:assembleRelease :android:phrasebook:bundlePlay --no-daemon -q
  cp android/phrasebook/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoPhrasebook.apk"
  cp android/phrasebook/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoPhrasebook.aab"
)
echo "======== BUILD SquirrelGoOrthodoxBible (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:orthodox-bible:assembleRelease :android:orthodox-bible:bundlePlay --no-daemon -q
  cp android/orthodox-bible/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoOrthodoxBible.apk"
  cp android/orthodox-bible/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoOrthodoxBible.aab"
)
echo "======== BUILD SquirrelGoKlingon (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:klingon:assembleRelease :android:klingon:bundlePlay --no-daemon -q
  cp android/klingon/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoKlingon.apk"
  cp android/klingon/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoKlingon.aab"
)
echo "======== BUILD SquirrelGoKanji (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:kanji:assembleRelease :android:kanji:bundlePlay --no-daemon -q
  cp android/kanji/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoKanji.apk"
  cp android/kanji/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoKanji.aab"
)
echo "======== BUILD SquirrelGoKana (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:kana:assembleRelease :android:kana:bundlePlay --no-daemon -q
  cp android/kana/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoKana.apk"
  cp android/kana/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoKana.aab"
)
echo "======== BUILD SquirrelGoJapaneseDictionary (native) ========"
(
  cd "$ROOT/SquirrelGo-Apps/squirrelgo-dictionary"
  tools/fetch_data.sh
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:dictionary:assembleRelease :android:dictionary:bundlePlay --no-daemon -q
  cp android/dictionary/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoJapaneseDictionary.apk"
  cp android/dictionary/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoJapaneseDictionary.aab"
)
echo "======== BUILD SquirrelGoAlphabets (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:alphabets:assembleRelease :android:alphabets:bundlePlay --no-daemon -q
  cp android/alphabets/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoAlphabets.apk"
  cp android/alphabets/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoAlphabets.aab"
)
echo "======== BUILD LanguageStudentDesk (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:lsd:assembleRelease --no-daemon -q
  cp android/lsd/build/outputs/apk/release/*.apk "$OUT_ART/LanguageStudentDesk.apk"
)
echo "======== BUILD SquirrelGoBopomofo (native) ========"
(
  cd "$ROOT/native"
  echo "sdk.dir=$SDK" > local.properties
  chmod +x gradlew
  # release stays on the debug key even though UPLOAD_* is exported above.
  ./gradlew :android:bopomofo:assembleRelease :android:bopomofo:bundlePlay --no-daemon -q
  cp android/bopomofo/build/outputs/apk/release/*.apk "$OUT_ART/SquirrelGoBopomofo.apk"
  cp android/bopomofo/build/outputs/bundle/play/*.aab "$OUT_AAB/SquirrelGoBopomofo.aab"
)

echo "All builds finished."
