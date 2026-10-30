# SquirrelGo Dictionary

Offline Japanese–English dictionary for Android (and desktop browsers), built as a modern replacement for **JED** (umibouzu.com), whose data server is gone.

JED was closed-source freeware that downloaded its dictionary from `www.umibouzu.com/jed` on first launch; that domain no longer resolves, so the app can't install its data. This is a new, independent implementation on the same open data sources, bundled into the APK so it never needs a server.

## Install

Download `SquirrelGoDictionary.apk` from the **SquirrelGo Dictionary (latest build)** pre-release on the repo's Releases page (rebuilt by GitHub Actions on every change), or from the workflow run's artifacts.

- Package id: `com.squirelworks.squirrelgodictionary`
- Min Android: 7.0 (API 24)
- Signed with the repo's fixed debug key, so new builds install over old ones and keep your lists.

## Features

The interface follows the original JED layout: grey gradient title bar with Menu / search field / Options, black list screens, a sectioned menu (Search · Dictionary · Kanji and Kana), long-press context menus, tag screens and a notepad drawer.


- ~219,000 JMdict entries, searched as you type by English, rōmaji, kana or kanji
- Conjugated verbs/adjectives traced to the dictionary form (食べました → 食べる)
- `*` / `?` wildcards (`*語`), JED's Search Options (Both / Read / Mean, Common, allowed characters), word categories (verbs, non-suru verbs, nouns, adjectives, adverbs, counters, onomatopoeia), up to 1,000 results in pages
- Entry pages with parts of speech, usage notes, other forms, cross-references and Tatoeba example sentences
- Kanji pages from KANJIDIC2 (on/kun/nanori, strokes, grade, JLPT, frequency, components, words)
- Kanji lookup by radicals (RADKFILE/KRADFILE) with live narrowing
- Hiragana/katakana chart with audio, text-to-speech on words and examples
- Tags (vocabulary lists: tick several and Show to search them merged, rename, delete, export to CSV for Anki), history, notepad, copy kanji / reading / meaning

## Data

`www/data/` is generated, not committed (~45 MB). Fetch the latest [jmdict-simplified](https://github.com/scriptin/jmdict-simplified) release and convert it:

```bash
cd SquirrelGo-Apps/squirrelgo-dictionary
tools/fetch_data.sh            # or: tools/fetch_data.sh <release-tag>
```

Then open `www/index.html` in a browser (no build step).

## Rebuild Android APK locally

```bash
tools/fetch_data.sh
export ANDROID_HOME=$HOME/android-sdk
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
rm -rf android/app/src/main/assets/www
cp -a www android/app/src/main/assets/www
cd android && ./gradlew assembleRelease
# output: app/build/outputs/apk/release/app-release.apk
```

## Licenses

JMdict, KANJIDIC2, RADKFILE and KRADFILE are the property of the [Electronic Dictionaries Research and Development Group](https://www.edrdg.org/) and are used in conformance with the Group's [licence](https://www.edrdg.org/edrdg/licence.html) (CC BY-SA 4.0). Example sentences are from [Tatoeba](https://tatoeba.org) (CC BY 2.0 FR). Not affiliated with umibouzu or the original JED.
