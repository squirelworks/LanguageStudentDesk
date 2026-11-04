#!/usr/bin/env python3
"""Upload one AAB to a Google Play track and commit the edit.

Used by .github/workflows/squirrelgo-play.yml. The service account's JSON key
comes from the PLAY_SERVICE_ACCOUNT_JSON environment variable (a GitHub
secret); it is never written to the repo or printed.

    play_upload.py --package com.squirelworks.squirrelgokana \
        --aab app-release.aab --track alpha --status completed \
        --name squirrelgo-v0.1.0 --notes-file notes.txt
"""
import argparse
import json
import os
import sys

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

SCOPE = "https://www.googleapis.com/auth/androidpublisher"


def check(packages):
    """Open and discard an edit for each package: proves access, changes nothing."""
    api = connect()
    bad = 0
    for pkg in packages:
        try:
            eid = api.edits().insert(packageName=pkg, body={}).execute()["id"]
            tracks = api.edits().tracks().list(packageName=pkg, editId=eid).execute().get("tracks", [])
            api.edits().delete(packageName=pkg, editId=eid).execute()
            names = ", ".join(t["track"] for t in tracks)
            print(f"OK   {pkg}  tracks: {names}")
        except HttpError as e:
            bad += 1
            print(f"FAIL {pkg}  {e.resp.status} {e.reason}")
    if bad:
        sys.exit(f"{bad} app(s) not reachable; see docs/PLAY.md")


def connect():
    raw = os.environ.get("PLAY_SERVICE_ACCOUNT_JSON", "")
    if not raw.strip():
        sys.exit("PLAY_SERVICE_ACCOUNT_JSON is not set; see docs/PLAY.md")
    creds = service_account.Credentials.from_service_account_info(json.loads(raw), scopes=[SCOPE])
    return build("androidpublisher", "v3", credentials=creds, cache_discovery=False)


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--check":
        check(sys.argv[2:])
        return
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--package", required=True)
    ap.add_argument("--aab", required=True)
    ap.add_argument("--track", default="alpha",
                    help="'alpha' is the default closed testing track; a custom closed track uses its own name")
    ap.add_argument("--status", default="completed", choices=["completed", "draft"],
                    help="'completed' rolls out to the track's testers; use 'draft' for an app that has never been published")
    ap.add_argument("--name", required=True, help="release name shown in Play Console")
    ap.add_argument("--notes-file", help="plain text 'What's new' (en-US), at most 500 characters")
    args = ap.parse_args()

    api = connect()
    edits = api.edits()

    try:
        edit = edits.insert(packageName=args.package, body={}).execute()
        eid = edit["id"]
        media = MediaFileUpload(args.aab, mimetype="application/octet-stream", resumable=True)
        bundle = edits.bundles().upload(packageName=args.package, editId=eid, media_body=media).execute()
        code = bundle["versionCode"]
        release = {"name": args.name, "versionCodes": [str(code)], "status": args.status}
        if args.notes_file and os.path.exists(args.notes_file):
            text = open(args.notes_file, encoding="utf-8").read().strip()[:500]
            if text:
                release["releaseNotes"] = [{"language": "en-US", "text": text}]
        edits.tracks().update(packageName=args.package, editId=eid, track=args.track,
                              body={"track": args.track, "releases": [release]}).execute()
        edits.commit(packageName=args.package, editId=eid).execute()
    except HttpError as e:
        msg = e.reason or str(e)
        hint = ""
        if "APK signature" in msg or "signed with the wrong key" in msg or "upload key" in msg.lower():
            hint = " (the AAB isn't signed with this app's registered upload key; see docs/PLAY.md)"
        elif "Package not found" in msg or e.resp.status == 404:
            hint = " (the app doesn't exist in Play Console yet, or the service account has no access to it)"
        elif "draft app" in msg.lower():
            hint = " (the app has never been published; run again with status 'draft')"
        elif "versionCode" in msg or "Version code" in msg:
            hint = " (raise versionCode in build.gradle; Play needs a higher one than any upload so far)"
        sys.exit(f"{args.package}: Play refused the upload: {msg}{hint}")

    print(f"{args.package}: versionCode {code} sent to the '{args.track}' track as {args.status}")


if __name__ == "__main__":
    main()
