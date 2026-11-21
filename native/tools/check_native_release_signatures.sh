#!/usr/bin/env bash
# Native release APKs must stay on the committed debug key even when UPLOAD_*
# is set and their Play bundles are built in the same Gradle run.
# Kana, Bopomofo, Alphabets and Kanji.
set -euo pipefail
cd "$(dirname "$0")/.."
DEBUG_SHA256="CDEC9F5CD92ED1608C0C9457699A25AD2101BD1E52ACCD11197BEAF672DDB369"
if [ -n "${ANDROID_HOME:-}" ] && [ ! -f local.properties ]; then
  echo "sdk.dir=$ANDROID_HOME" > local.properties
fi
DIR=$(mktemp -d)
trap 'rm -rf "$DIR"' EXIT
KEY="$DIR/upload.p12"
keytool -genkeypair -keystore "$KEY" -storetype PKCS12 -storepass throwaway -keypass throwaway \
  -alias upload -dname "CN=Throwaway" -keyalg RSA -keysize 2048 -validity 1 >/dev/null
UPLOAD_SHA256=$(keytool -list -v -keystore "$KEY" -storepass throwaway -alias upload \
  | awk -F': ' '/SHA256:/{print $2; exit}' | tr -d ':' )
export UPLOAD_STORE_FILE="$KEY"
export UPLOAD_STORE_PASSWORD=throwaway
export UPLOAD_KEY_ALIAS=upload
export UPLOAD_KEY_PASSWORD=throwaway
chmod +x gradlew
./gradlew --no-daemon \
  :android:kana:assembleRelease :android:kana:bundlePlay \
  :android:bopomofo:assembleRelease :android:bopomofo:bundlePlay \
  :android:alphabets:assembleRelease :android:alphabets:bundlePlay \
  :android:kanji:assembleRelease :android:kanji:bundlePlay
sdk_dir() {
  if [ -n "${ANDROID_HOME:-}" ]; then
    echo "$ANDROID_HOME"
    return
  fi
  if [ -f local.properties ]; then
    sed -n 's/^sdk.dir=//p' local.properties | head -1
  fi
}
cert() {
  local file="$1"
  local sdk signer
  sdk=$(sdk_dir)
  if [ -n "$sdk" ]; then
    signer=$(ls -d "$sdk"/build-tools/*/apksigner 2>/dev/null | sort -V | tail -1 || true)
  fi
  if [ -n "${signer:-}" ] && "$signer" verify --print-certs "$file" 2>/dev/null; then
    return
  fi
  keytool -printcert -jarfile "$file"
}
sha256_of() {
  cert "$1" | awk '
    /SHA-256 digest:/{gsub(/.*SHA-256 digest: */, ""); gsub(/:/, ""); print toupper($0); exit}
    /SHA256:/{gsub(/.*SHA256: */, ""); gsub(/:/, ""); print toupper($0); exit}
  '
}
check_pair() {
  local name="$1" apk="$2" aab="$3"
  test -f "$apk"
  test -f "$aab"
  local apk_sha aab_sha
  apk_sha=$(sha256_of "$apk")
  aab_sha=$(sha256_of "$aab")
  if [ "$apk_sha" != "$DEBUG_SHA256" ]; then
    echo "$name release APK signed $apk_sha, expected the debug key $DEBUG_SHA256" >&2
    exit 1
  fi
  if [ "$aab_sha" != "$UPLOAD_SHA256" ]; then
    echo "$name play bundle signed $aab_sha, expected the upload key $UPLOAD_SHA256" >&2
    exit 1
  fi
  echo "$name release APK is the debug key; play bundle is the upload key"
}
check_pair Kana android/kana/build/outputs/apk/release/*.apk android/kana/build/outputs/bundle/play/*.aab
check_pair Bopomofo android/bopomofo/build/outputs/apk/release/*.apk android/bopomofo/build/outputs/bundle/play/*.aab
check_pair Alphabets android/alphabets/build/outputs/apk/release/*.apk android/alphabets/build/outputs/bundle/play/*.aab
check_pair Kanji android/kanji/build/outputs/apk/release/*.apk android/kanji/build/outputs/bundle/play/*.aab
