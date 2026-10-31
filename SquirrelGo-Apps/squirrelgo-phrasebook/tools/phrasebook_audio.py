#!/usr/bin/env python3
"""Record a clip for every phrase in SquirrelGo Phrasebook with Open JTalk, so
each phrase plays offline without a Japanese voice on the device.

Each phrase is read from its Japanese text when Open JTalk's reading of it
matches the phrase's kana reading, and from the kana reading otherwise (Open
JTalk misreads some kanji: 方 as hō, 一尉 as ichijō). The Japanese text gives
better pitch accent; the kana reading is always right. The kana reading is
spoken as katakana, which Open JTalk reads letter for letter, with the
particles は, へ and を written as they sound, since all-hiragana text gets
split into the wrong words (ではいれます as de wa iremasu).

Clips go to www/audio/ and a map from kana reading to file goes to
www/data/audio.js, which the app plays before falling back to text-to-speech.
Each clip is named after a hash of its voice and text, so a rerun only records
what changed, and clips no phrase uses any more are deleted.

    pip install pyopenjtalk            (plus ffmpeg and node)
    python3 tools/phrasebook_audio.py           record what is missing
    python3 tools/phrasebook_audio.py --check   report phrases without a clip

--check needs only node; CI runs it so no phrase ships silent.
"""
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
WWW = os.path.join(HERE, "..", "www")
AUDIO = os.path.join(WWW, "audio")
MAP = os.path.join(WWW, "data", "audio.js")
VOICE = "openjtalk-mei"


def load(path, name):
    js = (
        "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});"
        "console.log(JSON.stringify(w[process.argv[2]]))"
    )
    return json.loads(subprocess.check_output(["node", "-e", js, path, name]))


def phrases():
    """(pack id, Japanese, kana reading) for every phrase."""
    for pack in load(os.path.join(WWW, "data", "packs.js"), "PHRASEBOOK_PACKS"):
        for cat in pack["categories"]:
            for p in cat["phrases"]:
                yield pack["id"], p[1], p[2]


def current_map():
    return load(MAP, "PHRASEBOOK_AUDIO") if os.path.exists(MAP) else {}


def check():
    clips = current_map()
    missing = [(pid, kana) for pid, _, kana in phrases() if not clips.get(kana) or not os.path.exists(os.path.join(AUDIO, clips[kana]))]
    used = set(clips.values())
    stray = sorted(f for f in os.listdir(AUDIO) if f not in used) if os.path.isdir(AUDIO) else []
    for pid, kana in missing:
        print(f"no clip: {pid}: {kana}")
    for f in stray:
        print(f"unused clip: audio/{f}")
    total = sum(1 for _ in phrases())
    print(f"{total - len(missing)}/{total} phrases have a clip")
    if missing or stray:
        print("Run: python3 tools/phrasebook_audio.py")
        return 1
    return 0


PARTICLES = {"は": "ワ", "へ": "エ", "を": "ヲ"}
WHOLE_WORDS = {"こんにちは": "コンニチワ", "こんばんは": "コンバンワ"}


def spoken_katakana(kana):
    """The kana reading as katakana Open JTalk reads as written."""
    out = []
    for word in kana.split():
        bare = re.sub(r"[、。？！]", "", word)
        fixed = PARTICLES.get(bare) or WHOLE_WORDS.get(bare)
        if fixed:
            out.append(fixed + word[len(bare):])
        else:
            out.append(re.sub(r"[ぁ-ゖ]", lambda m: chr(ord(m.group()) + 0x60), word))
    return "".join(out)


def sounds(text):
    """Open JTalk's phonemes for text, with long vowels folded together so
    おう and オー compare equal."""
    import pyopenjtalk

    p = pyopenjtalk.g2p(text).replace(" ", "").replace("pau", "").replace("cl", "Q").lower()
    p = p.replace("ou", "oo").replace("ei", "ee")
    return re.sub(r"([aiueo])\1", r"\1", p)


def source(ja, kana):
    kata = spoken_katakana(kana)
    return ja if sounds(ja) == sounds(kata) else kata


def render(text, path):
    import numpy as np
    import pyopenjtalk

    x, sr = pyopenjtalk.tts(text)
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        with wave.open(tmp.name, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(sr)
            w.writeframes(np.clip(x, -32768, 32767).astype(np.int16).tobytes())
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name,
             "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.1",
             "-ac", "1", "-ar", "22050", "-b:a", "32k", path],
            check=True,
        )


def record():
    os.makedirs(AUDIO, exist_ok=True)
    clips, fallbacks = {}, []
    for pid, ja, kana in phrases():
        if kana in clips:
            continue
        text = source(ja, kana)
        if text != ja:
            fallbacks.append(f"{pid}: {ja} → {text}")
        name = hashlib.sha1(f"{VOICE}|{text}".encode()).hexdigest()[:10] + ".mp3"
        path = os.path.join(AUDIO, name)
        if not os.path.exists(path):
            render(text, path)
            print("recorded", name, text)
        clips[kana] = name
    for f in os.listdir(AUDIO):
        if f not in set(clips.values()):
            os.remove(os.path.join(AUDIO, f))
            print("removed", f)
    with open(MAP, "w", encoding="utf-8") as out:
        out.write("// Recorded phrases: kana reading -> clip in audio/.\n")
        out.write("// Generated by tools/phrasebook_audio.py with Open JTalk (HTS voice Mei, CC BY 3.0).\n")
        out.write("window.PHRASEBOOK_AUDIO = {\n")
        for kana in sorted(clips):
            out.write(f"{json.dumps(kana, ensure_ascii=False)}: {json.dumps(clips[kana])},\n")
        out.write("};\n")
    print(f"{len(clips)} clips; read from kana where Open JTalk misreads the Japanese:")
    for line in fallbacks:
        print("  " + line)


if __name__ == "__main__":
    sys.exit(check() if "--check" in sys.argv else record())
