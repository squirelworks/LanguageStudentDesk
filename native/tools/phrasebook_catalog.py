#!/usr/bin/env python3
"""Turn the SquirrelGo Phrasebook WebView files into JSON and clips the native app reads.

The packs, readings, and recordings stay in the WebView tree. Romaji and the
search text are produced by the same scripts the page uses. This does not
keep a second copy of them.
"""

import json
import pathlib
import re
import shutil
import subprocess
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from kana_catalog import suite_settings

_EVAL = r"""
const fs = require("fs");
const vm = require("vm");
const [packs, audio, romaji, css] = process.argv.slice(1);
const sandbox = { window: {} };
function run(file) {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
}
run(romaji);
run(packs);
run(audio);
let accent = "";
const text = fs.readFileSync(css, "utf8");
const match = text.match(/--accent:\s*(#[0-9a-fA-F]{3,8})/);
if (match) accent = match[1];
const { romanize, toHiragana } = sandbox.window.Romaji;
const clips = sandbox.window.PHRASEBOOK_AUDIO || {};
const data = sandbox.window.PHRASEBOOK_PACKS;
if (!data || !romanize || !toHiragana) {
  console.error("Phrasebook packs or romaji are missing");
  process.exit(1);
}
const out = data.map((pack) => ({
  id: pack.id,
  title: pack.title,
  jaTitle: pack.jaTitle,
  desc: pack.desc,
  categories: pack.categories.map((cat, index) => ({
    id: String(index),
    title: cat.title,
    phrases: cat.phrases.map((row) => {
      const en = row[0];
      const ja = row[1];
      const kana = row[2];
      const note = row[3] || "";
      const reading = kana.replace(/\s+/g, "");
      const rom = romanize(kana);
      const search = [
        en.toLowerCase(),
        rom.toLowerCase().replace(/['\s]/g, ""),
        ja,
        toHiragana(reading),
      ].join("\n");
      return {
        key: pack.id + "|" + ja,
        en, ja, reading, spoken: kana, romaji: rom, note, search,
        clip: clips[kana] || "",
      };
    }),
  })),
}));
process.stdout.write(JSON.stringify({ packs: out, accent }));
"""


def load(paths):
    try:
        result = subprocess.run(["node", "-e", _EVAL, *paths], check=False, capture_output=True)
    except FileNotFoundError:
        raise SystemExit("node is required to read the Phrasebook WebView files and was not found")
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or b"").decode("utf-8", "replace").strip()
        raise SystemExit(f"Could not read the Phrasebook WebView files:\n{detail}")
    return json.loads(result.stdout)


def progress_key(app_js):
    match = re.search(r'STORE_KEY\s*=\s*"([^"]+)"', app_js.read_text(encoding="utf-8"))
    if not match:
        raise SystemExit(f"Phrasebook progress key missing from {app_js}")
    return match.group(1)


def main():
    www = pathlib.Path(sys.argv[1])
    dest = pathlib.Path(sys.argv[2])
    loaded = load([
        str(www / "data" / "packs.js"),
        str(www / "data" / "audio.js"),
        str(www / "js" / "romaji.js"),
        str(www / "css" / "app.css"),
    ])
    audio = www / "audio"
    missing = []
    names = []
    for pack in loaded["packs"]:
        for cat in pack["categories"]:
            for phrase in cat["phrases"]:
                clip = phrase["clip"]
                if not clip or not (audio / clip).is_file():
                    missing.append(phrase["spoken"])
                else:
                    names.append(clip)
    if missing:
        raise SystemExit("Phrasebook recordings are missing:\n" + "\n".join(missing[:20]))
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    clips = dest / "clips"
    clips.mkdir()
    for name in sorted(set(names)):
        shutil.copy2(audio / name, clips / name)
    payload = {
        "accent": loaded.get("accent") or "",
        "store": progress_key(www / "js" / "app.js"),
        "packs": loaded["packs"],
    }
    (dest / "phrasebook.json").write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    suite = www.parent.parent / "shared" / "suite.js"
    if not suite.is_file():
        suite = pathlib.Path(__file__).resolve().parents[2] / "SquirrelGo-Apps" / "shared" / "suite.js"
    (dest / "suite.json").write_text(json.dumps(suite_settings(suite), ensure_ascii=False), encoding="utf-8")
    phrases = sum(len(cat["phrases"]) for pack in loaded["packs"] for cat in pack["categories"])
    print(f"phrasebook packs {len(loaded['packs'])} phrases {phrases} clips {len(set(names))}")


if __name__ == "__main__":
    main()
