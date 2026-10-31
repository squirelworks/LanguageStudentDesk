# SquirrelGo shared files

Code every SquirrelGo app uses. Edit it here, then copy it into the apps:

```bash
SquirrelGo-Apps/tools/sync-shared.sh          # copy into each app's www/js/
SquirrelGo-Apps/tools/sync-shared.sh --check  # what CI runs: fail if a copy is stale
```

Each app keeps a committed copy so its `www/` folder still runs on its own, in a browser or packed into the APK.

| File | Copied into | What it is |
|---|---|---|
| `suite.js` | every app | The SquirrelGo apps sheet, cross-app lookups, notes and resources (below) |
| `strokes.js` | Kana, Alphabets, Klingon | Stroke geometry: SVG drawing, stroke-order animation, matching a drawn stroke to the model. Keys are `"<script>\|<char>"`; Klingon's single flat table uses the bare letter |
| `writepad.js` | Kana, Alphabets, Klingon | The writing pad that checks each stroke, drawn in the page's `--accent` color |
| `pad.js` | Kana, Alphabets | The freehand pad |
| `speech.js` | Kana, Alphabets, Kanji | Recorded sounds with a browser-voice fallback |

The desk's own twins load these straight from the apps (Character Learner from Alphabets, the Desk Klingon page from SquirrelGo Klingon), so they follow without a copy. `sync-shared.sh` also runs `tools/desk_twins.py`, which:

- rewrites the Alphabets `<script>` list in `character-learner/index.html` from the Alphabets app's `index.html`, so a new script reaches the Desk in the same sync;
- checks every `../SquirrelGo-Apps/` file the desk twins load exists;
- checks every app in `suite.js` has a `TOOLS` entry in `LanguageStudentDesk.py` under *SquirrelGo apps* with the same release tag and APK, and that an APK workflow publishes it;
- checks the launcher still opens at 88% of the screen with font-sized rows.

## suite.js

The phone version of the desk launcher. It brings three things from the desktop LanguageStudentDesk to every app:

- **SquirrelGo apps sheet** (the ▦ button, or *Menu › SquirrelGo apps* in the Dictionary). Lists the other apps with *Open* when installed and *Get* (the rolling release APK) when not.
- **Cross-app lookups**, like the desk's language-scoped `?lang=` launch:
  - Kanji detail › *Words in Dictionary*
  - Dictionary kanji page › *Stroke order and quizzes in SquirrelGo Kanji*
  - Dictionary entry › *Find in the Phrasebook*
  - Dictionary kana table › *SquirrelGo Kana*
  - Kana example word › *Look up in the Dictionary*
- **Notes and resources** for the app's languages, from the desk's `reference-learner` and `resource-learner`.

On Android, each `MainActivity` exposes a `SquirrelGo` JavaScript bridge (`installed`, `open`, `openUrl`, `takeQuery`). `open` starts the other app's launcher activity with the `com.squirelworks.squirrelgo.QUERY` extra; activities are `singleTask` so a running app gets the query through `onNewIntent`. Each manifest lists the sibling packages under `<queries>` so Android 11+ lets the app see them.

In a browser, links go to the sibling app's `www/index.html?q=…` inside this repo.

To add an app to the suite: add it to `APPS` in `suite.js`, add its package (and `.debug`) to the `<queries>` in each manifest, list its folder in `tools/sync-shared.sh`, give its `MainActivity` the same `SuiteBridge`, and add it to `TOOLS` in `LanguageStudentDesk.py` (the check fails until you do).
