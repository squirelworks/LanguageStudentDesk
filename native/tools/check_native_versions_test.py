#!/usr/bin/env python3
"""Path coverage for the release version check. No git history required."""

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = Path(__file__).with_name("check_native_versions.py")


def load():
    spec = importlib.util.spec_from_file_location("check_native_versions", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class Result:
    def __init__(self, stdout):
        self.stdout = stdout


def diff_of(changed):
    def run(args):
        paths = args[args.index("--") + 1 :]
        hits = [name for name in changed if any(name == path or name.startswith(path + "/") for path in paths)]
        return Result("\n".join(hits))

    return run


def main():
    mod = load()
    kana = set(mod.source_paths("kana"))
    bopo = set(mod.source_paths("bopomofo"))
    alpha = set(mod.source_paths("alphabets"))
    kokugo = set(mod.source_paths("japanese-dictionary"))
    multi = set(mod.source_paths("multilingual-dictionary"))
    shared = {
        "native/gradle",
        "native/build.gradle.kts",
        "native/settings.gradle.kts",
        "native/gradle.properties",
        "native/tools",
        "native/buildSrc",
    }
    for paths in (kana, bopo, alpha, kokugo, multi):
        missing = shared - paths
        if missing:
            raise SystemExit(f"shared paths missing: {missing}")
    kana_data = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/data"
    kana_audio = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/audio"
    bopo_data = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-bopomofo/www/data"
    if kana_data not in kana or kana_audio not in kana:
        raise SystemExit(f"kana generator inputs missing: {sorted(kana)}")
    suite = "SquirrelGo-Apps/shared/suite.js"
    alpha_data = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/data"
    alpha_audio = "SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/audio"
    if alpha_data not in alpha or alpha_audio not in alpha:
        raise SystemExit(f"alphabets generator inputs missing: {sorted(alpha)}")
    if suite not in alpha:
        raise SystemExit("alphabets is not watching the suite file")
    if kana_data in alpha or bopo_data in alpha:
        raise SystemExit("alphabets is watching another app's WebView files")
    if suite not in kana or suite not in bopo:
        raise SystemExit(f"a character app is not watching the suite file: kana={suite in kana} bopomofo={suite in bopo}")
    if suite in kokugo:
        raise SystemExit("the suite file marked an app that does not generate it")
    if bopo_data not in bopo:
        raise SystemExit(f"bopomofo generator inputs missing: {sorted(bopo)}")
    if any(path.endswith("www/audio") for path in bopo):
        raise SystemExit("bopomofo has no recordings for the generator to read")
    if kana_audio in bopo or kana_data in bopo:
        raise SystemExit("bopomofo is watching Kana's WebView files")
    if "languages" not in kokugo or "languages" not in multi:
        raise SystemExit("dictionaries are not watching language metadata")
    if any("squirrelgo-kana" in path for path in kokugo):
        raise SystemExit("the dictionary is watching Kana's WebView files")
    if "native/ui/kana" not in kana or "native/core" not in kana:
        raise SystemExit("kana is not watching its modules")
    if "native/ui/dictionary" not in kokugo:
        raise SystemExit("the dictionary is not watching its ui module")

    gradle = diff_of(["native/gradle/libs.versions.toml"])
    tools = diff_of(["native/tools/kana_catalog.py"])
    audio = diff_of([kana_audio + "/hiragana/clip.mp3"])
    data = diff_of([bopo_data + "/bopomofo.js"])
    langs = diff_of(["languages/japanese/meta.json"])
    for stem in ("kana", "bopomofo", "alphabets", "japanese-dictionary", "multilingual-dictionary"):
        if not mod.app_changed("tag", stem, gradle):
            raise SystemExit(f"{stem} ignored a Gradle version catalog change")
        if not mod.app_changed("tag", stem, tools):
            raise SystemExit(f"{stem} ignored a native tool change")
    if not mod.app_changed("tag", "kana", audio):
        raise SystemExit("kana ignored a recording change")
    if mod.app_changed("tag", "bopomofo", audio) or mod.app_changed("tag", "japanese-dictionary", audio):
        raise SystemExit("a Kana recording marked another app")
    if not mod.app_changed("tag", "bopomofo", data):
        raise SystemExit("bopomofo ignored its lesson file")
    if mod.app_changed("tag", "kana", data):
        raise SystemExit("a Bopomofo lesson marked Kana")
    if not mod.app_changed("tag", "japanese-dictionary", langs) or not mod.app_changed("tag", "multilingual-dictionary", langs):
        raise SystemExit("a language metadata change did not mark the dictionaries")
    if mod.app_changed("tag", "kana", langs):
        raise SystemExit("language metadata marked Kana")
    lesson = diff_of([alpha_data + "/latin.js"])
    if not mod.app_changed("tag", "alphabets", lesson):
        raise SystemExit("alphabets ignored its lesson file")
    if mod.app_changed("tag", "kana", lesson) or mod.app_changed("tag", "bopomofo", lesson):
        raise SystemExit("an Alphabets lesson marked another app")
    print("ok")


if __name__ == "__main__":
    main()
