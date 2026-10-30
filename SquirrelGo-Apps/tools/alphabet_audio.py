#!/usr/bin/env python3
"""Record the letter and example-word sounds for SquirrelGo Alphabets with
eSpeak NG, so every character plays offline without a phone voice.

For each character in www/data/<script>.js:
  - the letter clip says the character's sound: the letter with the script's
    vowel a after it when its IPA is a bare consonant (б → ба, ბ → ბა), or
    the letter itself for vowels and syllables. A "speak" text that is not
    the letter itself is read as written (Hangul uses 가 for ㄱ).
  - the example clip says the example word, in the example's language when
    the character gives one (Latin), otherwise the script's.

Clips go to www/audio/<script>/ and a map from spoken text to file goes to
www/data/audio/<script>.js, which the app checks before falling back to
text-to-speech. Each clip is named after a hash of its voice and text, so a
rerun only records what changed.

A script with audio: "ipa" is recorded from IPA instead, through
tools/ipa_audio.py: the character's IPA for the letter, and a tenth field,
the example's IPA, for the word. Use it where eSpeak reads the script badly
(pointed Hebrew); a script eSpeak has no voice for (Lao, Khmer,
Tibetan) is recorded this way too, with the "hi" voice. Tone marks are
dropped. For either, set "voice" to pick the eSpeak voice.

Needs espeak-ng, ffmpeg and node. Clips are committed; CI does not run this.

    python3 alphabet_audio.py latin greek ...     (no names: every script)
"""
import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unicodedata

import ipa_audio

HERE = os.path.dirname(os.path.abspath(__file__))
WWW = os.path.join(HERE, "..", "squirrelgo-characters", "squirrelgo-alphabets", "www")

# Script language (BCP 47) -> eSpeak voice, and the letter for the vowel a
# that turns a bare consonant into a syllable.
VOICES = {
    "es": "es", "it": "it", "en": "en-us", "fr": "fr-fr", "de": "de", "pt": "pt", "tr": "tr",
    "pl": "pl", "cs": "cs", "sv": "sv", "nb": "nb", "da": "da", "hr": "hr", "hu": "hu", "is": "is",
    "ru": "ru", "el": "el", "hy": "hy", "ka": "ka", "ko": "ko", "hi": "hi", "ar": "ar",
    "he": "he", "am": "am", "bn": "bn", "ta": "ta", "te": "te", "gu": "gu", "pa": "pa", "kn": "kn",
    "ml": "ml", "si": "si", "th": "th", "my": "my", "or": "or", "chr": "chr-US-Qaaa-x-west",
}
VOWEL_A = {"hi": "", "ko": "", "ru": "а", "el": "α", "hy": "ա", "ka": "ა", "ar": "َ", "he": "ָ"}
IPA_VOWELS = set("aeiouyɑɐæɛɜəɘɪɨʉʊɔœøɒʌɯɤãẽĩõũ")

# Many voices read a lone letter by its name (ε is "epsilon", é is "e accent
# aigu"), so vowels are spoken from eSpeak phoneme codes instead. These codes
# are shared by the voices used here; a voice that lacks one falls back to
# reading the letter.
PHONEMES = {
    "a": "a", "ɑ": "a", "ɐ": "a", "æ": "a", "e": "e", "ɛ": "E", "i": "i", "ɪ": "I",
    "o": "o", "ɔ": "O", "u": "u", "ʊ": "U", "y": "y", "ø": "Y", "œ": "W", "ə": "@",
    "ɨ": "y", "ɯ": "@", "ʌ": "V", "ː": ":", "\u0303": "~", "j": "j", "w": "w",
}
READ_LETTERS = {"hi", "ko"}  # voices that read lone letters by their sound

# Characters a voice still gets wrong either way, spoken from phoneme codes.
FIXES = {
    ("arabic", "ت"): "[[ta]]",
    ("arabic", "بْ"): "[[ab]]",
    ("latin", "X x"): "[[ksa]]",
    ("latin", "Ã ã"): "[[&~]]",
    ("latin", "Č č"): "[[tSa]]",
    ("latin", "Ğ ğ"): "[[a:]]",
    ("greek", "ΓΓ γγ"): "[[aNga]]",
    ("devanagari", "ङ"): "[[N@]]",
    ("devanagari", "ण"): "[[n.@]]",
}


def speaks(voice, text):
    """Whether eSpeak says a vowel for text (a missing phoneme is dropped)."""
    out = subprocess.run(["espeak-ng", "-v", voice, "-q", "--ipa", text], capture_output=True, text=True).stdout
    return any(c in IPA_VOWELS for c in unicodedata.normalize("NFD", out))


def phonemes(ipa):
    ipa = unicodedata.normalize("NFD", ipa)
    if not any(c in IPA_VOWELS for c in ipa) or not all(c in PHONEMES for c in ipa):
        return None
    return "".join(PHONEMES[c] for c in ipa)


def voice_for(lang):
    return VOICES.get((lang or "").split("-")[0])


def load(script):
    js = (
        "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});"
        "console.log(JSON.stringify(w.SG_SCRIPTS))"
    )
    return json.loads(subprocess.check_output(["node", "-e", js, os.path.join(WWW, "data", script + ".js")]))[0]


def letter_text(s, ch, ipa, lang, voice):
    """What eSpeak should read for the character's own sound."""
    first = ch.split(" ")[-1]  # the small letter of a pair
    sound = (ipa or "").split("~")[0].strip()
    if (s["id"], ch) in FIXES:
        return FIXES[(s["id"], ch)]
    code = phonemes(sound)
    if code and lang.split("-")[0] not in READ_LETTERS:
        for c in (code, code + ":"):
            if speaks(voice, f"[[{c}]]"):
                return f"[[{c}]]"
    bare = sound and not any(c in IPA_VOWELS for c in sound)
    if bare:
        base = lang.split("-")[0]
        return first + VOWEL_A.get(base, "a")
    return first


def plain_ipa(ipa):
    """IPA without tone marks or alternatives, for ipa_audio."""
    ipa = unicodedata.normalize("NFD", (ipa or "").split("~")[0].strip())
    return unicodedata.normalize("NFC", "".join(c for c in ipa if unicodedata.category(c) != "Mn"))


def render(text, voice, path, speed=140):
    with tempfile.NamedTemporaryFile(suffix=".wav") as wav:
        if text.startswith("ipa:"):
            text = f"[[{ipa_audio.to_espeak(text[4:])}]]"
        subprocess.run(["espeak-ng", "-v", voice, "-s", str(speed), "-w", wav.name, text], check=True)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", wav.name,
             "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.08",
             "-ac", "1", "-ar", "22050", "-b:a", "32k", path],
            check=True,
        )


def run(script):
    s = load(script)
    base_voice = s.get("voice") or voice_for(s["lang"])
    by_ipa = s.get("audio") == "ipa" or not base_voice
    if not base_voice:
        base_voice = "hi"  # ipa_audio's phoneme table
    out_dir = os.path.join(WWW, "audio", script)
    os.makedirs(out_dir, exist_ok=True)
    clips = {}  # text the app passes -> (voice, text eSpeak reads)
    for lesson in s["lessons"]:
        for c in lesson["chars"]:
            if not c:
                continue
            c = c + [""] * (10 - len(c))
            g, _, _, ex, _, _, speak, ipa, ex_lang, ex_ipa = c[:10]
            key = speak or g
            voice = voice_for(ex_lang) or base_voice
            if by_ipa:
                sound = plain_ipa(ipa)
                if sound and not any(ch in IPA_VOWELS for ch in sound):
                    sound += "a"
                if sound and key not in clips:
                    clips[key] = (voice, "ipa:" + sound)
                if ex and ex_ipa and ex not in clips:
                    clips[ex] = (voice, "ipa:" + plain_ipa(ex_ipa))
                continue
            if voice and key not in clips:
                # A speak text that is not one of the letters themselves is a
                # syllable or word chosen by hand (가 for ㄱ, мать for ь).
                said = speak if (speak and speak not in g.split(" ")) else letter_text(s, g, ipa, ex_lang or s["lang"], voice)
                clips[key] = (voice, said)
            if ex and voice and ex not in clips:
                clips[ex] = (voice, ex)
    if not clips:
        print(f"{script}: no eSpeak voice for {s['lang']}, skipped")
        return
    manifest = {}
    keep = set()
    for key, (voice, said) in clips.items():
        name = hashlib.sha1(f"{voice}|{said}".encode()).hexdigest()[:10] + ".mp3"
        keep.add(name)
        path = os.path.join(out_dir, name)
        if not os.path.exists(path):
            render(said, voice, path)
        manifest[key] = name
    for f in os.listdir(out_dir):
        if f not in keep:
            os.remove(os.path.join(out_dir, f))
    os.makedirs(os.path.join(WWW, "data", "audio"), exist_ok=True)
    with open(os.path.join(WWW, "data", "audio", script + ".js"), "w") as f:
        f.write(f"// Recorded sounds for {s['title']}: spoken text -> clip in audio/{script}/.\n")
        f.write("// Generated by SquirrelGo-Apps/tools/alphabet_audio.py with eSpeak NG.\n")
        f.write("window.SG_AUDIO = window.SG_AUDIO || {};\n")
        f.write(f"window.SG_AUDIO[{json.dumps(script)}] = {json.dumps(manifest, ensure_ascii=False, indent=0)};\n")
    size = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
    print(f"{script}: {len(manifest)} clips, {size // 1024} KB")


if __name__ == "__main__":
    names = sys.argv[1:] or sorted(f[:-3] for f in os.listdir(os.path.join(WWW, "data")) if f.endswith(".js") and f != "app.js")
    for n in names:
        run(n)
