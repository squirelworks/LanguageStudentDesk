# Signed builds (owner action required)

**P4 from the handoff.** Release-signed Android APKs and signed Desk desktop builds need the owner's private keystore / certificates as **GitHub Actions repository secrets**. Agents must **not** generate keys, commit keystores, or upload secrets. This note describes what is needed; stop here until the owner adds them.

Today everything that CI publishes is **unsigned or debug**:

| Artifact | Workflow | What ships today |
|---|---|---|
| SquirrelGo APKs (7 apps) | `.github/workflows/squirrelgo-*-apk.yml` | `assembleDebug` → rolling `*-latest` pre-releases (`*-debug.apk`) |
| Desk Linux / Windows / macOS | `.github/workflows/desk-desktop-builds.yml` + `.github/scripts/build_desk.py` | Unsigned PyInstaller archives on non-prerelease tags |

Local debug APK rebuilds are documented in each app's README (`Rebuild Android APK`). Desktop unsigned builds are described in the root `README.md` under **Desktop builds**.

---

## Android (release-signed APKs)

To move from debug to release-signed APKs, the owner would add a **single shared** upload keystore (or one per app) as repo secrets, then a later PR can wire `assembleRelease` into the existing APK workflows. Suggested secret names (adjust if preferred):

| Secret | Purpose |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded `.jks` / `.keystore` file |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | Key alias inside the keystore |
| `ANDROID_KEY_PASSWORD` | Key password |

Do **not** commit the keystore, put passwords in workflow files, or regenerate a new key if Play Store / sideload updates already use one — keep the existing upload key.

Until those secrets exist and a follow-up PR switches the workflows, keep using the rolling debug APKs from the `squirrelgo-*-latest` pre-releases.

---

## Desk desktop (signed builds)

Unsigned builds already attach to published non-prerelease tags via `desk-desktop-builds.yml`. Platform signing (optional, owner-only) typically needs:

| Platform | What the owner supplies | Typical secrets / setup |
|---|---|---|
| **Windows** | Authenticode code-signing certificate (`.pfx` / similar) + password | e.g. `WINDOWS_CERT_BASE64`, `WINDOWS_CERT_PASSWORD` — then sign `LanguageStudentDesk.exe` before zipping |
| **macOS** | Apple Developer ID Application certificate + notarization credentials | e.g. `MACOS_CERTIFICATE_BASE64`, `MACOS_CERTIFICATE_PASSWORD`, `MACOS_API_KEY` / App Store Connect API issuer+key, or equivalent — codesign the app bundle, notarize, staple |
| **Linux** | Optional GPG / distro packaging signature | Only if the owner wants signed tarballs or packages; not required for current `.tar.gz` distribution |

macOS also needs the signing identity and team ID configured for the Runner that builds on `macos-latest`. Windows SmartScreen reputation still takes time after first Authenticode use.

Until those secrets and a follow-up workflow change exist, keep distributing the unsigned archives; the root README already documents the Windows "Run anyway" and macOS `xattr -dr com.apple.quarantine` workarounds.

---

## Agent rules

1. **Do not** generate, invent, or commit signing keys, keystores, certificates, or passwords.
2. **Do not** create releases or tags to "test" signing.
3. **Do not** add fake / placeholder secrets to workflows.
4. Leave this note in place. When the owner has added real secrets, a separate small PR can wire release signing into the APK and desktop workflows (one seam per PR).
