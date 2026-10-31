# SquirrelGo Phrasebook

Offline Japanese phrasebook for modern Android (and desktop browsers), part of LanguageStudentDesk.

This is a **new open implementation** meant to replace the aging Japanese phrasebook apps on Google Play whose package ids end in `.ja.ac`, `.ja.bc`, `.ja.ca`, `.ja.md`, `.ja.nv` and `.ja.pa` (Air Crew, Basic, Civil Affairs, Medical, Naval and Public Affairs). Instead of six separate apps it is one app with packs: the six topics those apps covered, plus Force Protection, Military Police, Cordon & Search and Weapons, the other four modules of the Defense Language Institute survival-kit series those topics come from, and two more for service members in Japan (Logistics and Joint Training with the Self-Defense Forces). Six everyday packs for travelers and office workers (Travel, Restaurant, Shopping, Directions, Emergencies, Workplace) and five for living and studying in Japan (Small Talk, Daily Life, Classroom, Culture & Etiquette, Health & Pharmacy) round it out, along with Business for dealing with Japanese companies and Kids for children and families. All phrases, notes and translations here are original; nothing was copied from those apps. Not affiliated with their developers.

## Packs

| Pack | Old app suffix | Covers |
| --- | --- | --- |
| Basic 基本 | `bc` | Greetings, understanding, numbers & time, directions, food, emergencies, weather |
| Air Crew 航空 | `ac` | Cabin instructions, evacuation commands, ground ops, weather, cargo |
| Civil Affairs 民生支援 | `ca` | Officials, disaster relief, utilities, public services, follow-up |
| Medical 医療 | `md` | Registration, symptoms, exam commands, medication, procedures, body parts, children & pregnancy, medical history, emergency room, tests & imaging, hospital stay, mental health, discharge |
| Naval 海事 | `nv` | Port entry & mooring, ship visits, deck commands, supplies, emergencies, rescue at sea |
| Public Affairs 広報 | `pa` | Phone queries, media escort, interviews, press conferences, crisis statements |
| Force Protection 警備 | new | Gate and checkpoint control, vehicle inspection, bag screening, security alerts |
| Military Police 憲兵 | new | Traffic stops, statements and reports, detention, working with Japanese police |
| Cordon & Search 捜索 | new | Instructions to residents, entry and search, property and wrap-up |
| Weapons 武器 | new | Weapon safety, range commands, permits and storage, basic terms |
| Logistics 兵站 | new | Supplies, fuel and vehicles, convoys and road movement, billeting and meals, maintenance |
| Joint Training 共同訓練 | new | JSDF forces and ranks, briefings, radio, field safety, review and thanks |
| Travel 旅行 | new | Airports, trains and subways, buses and taxis, hotels, sightseeing |
| Restaurant 食事 | new | Getting a table, ordering, dietary needs, table manners, paying, cafés |
| Shopping 買い物 | new | Looking around, prices, clothes and sizes, paying and tax-free, returns, convenience stores |
| Directions 道案内 | new | Asking the way, understanding the answer, landmarks, getting lost |
| Emergencies 緊急 | new | Calling for help, police, lost items, getting sick, earthquakes and tsunami |
| Workplace 職場 | new | Office greetings, introductions, meetings, phone and email, deadlines, asking for help |
| Business 商談 | new | Receiving visitors, presentations, negotiating, contracts and orders, business dinners, trade shows |
| Small Talk 会話 | new | Getting to know people, hobbies, weather and seasons, reactions, invitations, keeping in touch |
| Daily Life 生活 | new | City hall, bank and post office, phones, housing, trash and recycling, neighbors |
| Classroom 教室 | new | Asking the teacher, classroom instructions, homework and tests, grammar words |
| Culture & Etiquette 文化 | new | Shrines and temples, hot springs, visiting a home, gifts, festivals, manners |
| Health & Pharmacy 健康 | new | Pharmacies, everyday ailments, clinics, dentists, staying fit |
| Kids 子ども | new | Playing, school day, feelings, at home, out with children |

## Features

- Each phrase in English, Japanese (kanji + kana), kana reading and romaji (each can be hidden)
- A recorded clip for every phrase, normal and slow, that plays offline with no Japanese voice installed; turn it off in Settings to use the device's Japanese text-to-speech voice instead
- Search across all packs by English, romaji, kana or kanji
- Favorites and flashcards (by category, pack, favorites or everything; EN→JA or JA→EN) with learned progress
- Export every phrase as an Anki-ready CSV
- Fully offline, no account

The device voice is only needed with recorded voice turned off. To install one on Android: Settings › Accessibility (or System) › Text-to-speech › install Japanese voice data for Google Speech Services. On desktop, most browsers use the OS voices.

## Web / desktop

Open `www/index.html` in a browser (no build step). The top-level `index.html` redirects there so the Desk launcher lists the app.

## Install the APK

Download [`SquirrelGoPhrasebook-debug.apk`](https://github.com/squirelworks/LanguageStudentDesk/releases/download/squirrelgo-phrasebook-latest/SquirrelGoPhrasebook-debug.apk) from the **SquirrelGo Phrasebook (latest build)** pre-release ([release page](https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-phrasebook-latest)) and sideload it. The `SquirrelGo Phrasebook APK` GitHub Actions workflow rebuilds and republishes it on every push to `main` that touches this folder; builds on other branches are only uploaded as run artifacts.

- Package id: `com.squirelworks.squirrelgophrasebook.debug`
- Min Android: 7.0 (API 24)

## Rebuild Android APK locally

```bash
export ANDROID_HOME=$HOME/android-sdk   # or your SDK path
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
rm -rf android/app/src/main/assets/www
cp -a www android/app/src/main/assets/www
cd android
./gradlew assembleDebug
# output: app/build/outputs/apk/debug/app-debug.apk
```

## Adding phrases

Edit `www/data/packs.js`. Each phrase is `[English, Japanese, kana reading, optional note]`. Write the kana reading with spaces between words and particles as separate words (`わたし は スミス です。`) so the romaji comes out right; romaji is generated by `www/js/romaji.js`.

Then record the new phrases:

```bash
pip install pyopenjtalk          # also needs ffmpeg and node
python3 tools/phrasebook_audio.py
```

It records only what changed into `www/audio/` and rewrites `www/data/audio.js`. Each phrase is read from its Japanese text when Open JTalk reads it the way the kana reading says, and from the kana reading otherwise, so a wrong kanji reading never ends up in a clip. `python3 tools/phrasebook_audio.py --check` lists phrases without a clip; the APK workflow runs it and fails if any phrase is silent.

The recordings use the HTS voice Mei, © 2009-2013 Nagoya Institute of Technology, licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## Layout

- `www/` — offline web UI (also packaged into the APK); `www/audio/` holds the phrase recordings
- `tools/` — `phrasebook_audio.py`, which records and checks the clips
- `android/` — WebView shell targeting API 34, with a native text-to-speech bridge
