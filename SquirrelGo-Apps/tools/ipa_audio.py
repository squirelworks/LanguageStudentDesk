#!/usr/bin/env python3
"""Turn IPA transcriptions into small MP3 clips with eSpeak NG, for apps whose
language has no text-to-speech voice (Klingon, or single sounds of any script).

Input is a JSON list of clips:
    [{"file": "l-f8d0.mp3", "ipa": "ɑ"}, {"file": "w-hol.mp3", "ipa": "xol", "voice": "hi"}]

The IPA is mapped to eSpeak phoneme mnemonics and spoken with the given voice
(default "hi": its phoneme table has retroflex, uvular, lateral and glottal
sounds). Spaces separate words, which eSpeak reads with a short pause between.
Output is mono MP3, about 4-8 KB a clip.

Needs espeak-ng and ffmpeg (apt install espeak-ng ffmpeg). Clips are generated
once and committed; the app build does not run this.

    python3 ipa_audio.py clips.json out_dir/
"""
import json
import os
import subprocess
import sys
import tempfile

# IPA symbol -> eSpeak mnemonic. Longest match wins, so affricates and
# aspirated stops come before their parts. Checked against the "hi" voice
# with `espeak-ng -v hi --ipa "[[...]]"`.
IPA = {
    "t͡ɬ": "tl#", "tɬ": "tl#", "q͡χ": "qX", "qχ": "qX",
    "t͡ʃ": "tS", "tʃ": "tS", "d͡ʒ": "dZ", "dʒ": "dZ", "tɕʰ": "tS#", "tsʰ": "ts#",
    "t͡ɕ": "tS", "tɕ": "tS", "t͡s": "ts", "ts": "ts",
    "pʰ": "p#", "tʰ": "t#", "kʰ": "k#", "qʰ": "q#", "cʰ": "c#",
    "aː": "a:", "oː": "o:", "uː": "u:", "iː": "i:", "eː": "e:",
    "a": "a", "ɑ": "a", "ɛ": "E", "e": "e", "ɪ": "I", "i": "i", "o": "o", "ɔ": "O",
    "u": "u", "ʊ": "U", "ə": "@", "ʌ": "V",
    # Vowels the "hi" table lacks, said with the nearest one it has (Lao, Khmer, Tibetan).
    "ɯ": "I", "ɨ": "I", "ɤ": "@", "ø": "e",
    "p": "p", "b": "b", "ɓ": "b", "t": "t", "d": "d", "ɗ": "d", "ɖ": "d.", "c": "c",
    "k": "k", "g": "g", "ɡ": "g", "q": "q", "ʔ": "?",
    "f": "f", "v": "v", "ʋ": "v", "s": "s", "z": "z", "ʃ": "S", "ɕ": "S", "ʒ": "Z", "ʂ": "s.",
    "x": "x", "ɣ": "Q", "χ": "X", "ʁ": "R", "h": "h", "ɬ": "l#",
    "m": "m", "n": "n", "ɲ": "n^", "ŋ": "N", "l": "l", "r": "r", "ɾ": "r", "w": "w", "j": "j",
    "ˈ": "'", "ˌ": ",", "ː": ":", " ": " ",
}
KEYS = sorted(IPA, key=len, reverse=True)


def to_espeak(ipa):
    out, i = [], 0
    while i < len(ipa):
        k = next((k for k in KEYS if ipa.startswith(k, i)), None)
        if k is None:
            raise ValueError(f"no eSpeak phoneme for {ipa[i]!r} in {ipa!r}")
        out.append(IPA[k])
        i += len(k)
    return "".join(out)


def render(ipa, path, voice="hi", speed=115):
    with tempfile.NamedTemporaryFile(suffix=".wav") as wav:
        subprocess.run(["espeak-ng", "-v", voice, "-s", str(speed), "-w", wav.name, f"[[{to_espeak(ipa)}]]"], check=True)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", wav.name,
             # Trim leading/trailing silence, then encode small.
             "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.08",
             "-ac", "1", "-ar", "22050", "-b:a", "40k", path],
            check=True,
        )


def main():
    clips = json.load(open(sys.argv[1], encoding="utf-8"))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    for c in clips:
        render(c["ipa"], os.path.join(out, c["file"]), c.get("voice", "hi"), c.get("speed", 115))
    print(f"{len(clips)} clips written to {out}")


if __name__ == "__main__":
    main()
