#!/usr/bin/env python3
"""Convert jmdict-simplified JSON releases into the app's offline data files.

Inputs (from https://github.com/scriptin/jmdict-simplified/releases):
  jmdict-examples-eng-*.json  (JMdict English + Tatoeba example sentences)
  kanjidic2-en-*.json
  radkfile-*.json
  kradfile-*.json

Usage:
  python3 tools/build_data.py JMDICT KANJIDIC RADKFILE KRADFILE OUT_DIR

Output (all plain <script>-loadable JS so the app works from file:// URLs):
  index-NN.js    search index shards, one line per entry:
                 "id<TAB>kanji;kanji<TAB>kana;kana<TAB>common<TAB>classes<TAB>gloss; gloss|gloss"
                 classes: conjugation classes (v5k, adj-i…) and word types N V A D E C (counter) O (onomatopoeia)
  entries-NN.js  full entries for the same shard (senses, tags, examples)
  kanji.js       KANJIDIC2 subset
  radicals.js    RADKFILE radicals and KRADFILE decompositions
  meta.js        shard count, dictionary dates, tag descriptions
"""
import json
import sys
from pathlib import Path

SHARD = 4096
MAX_EXAMPLES = 3


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def js(name, *args):
    return "%s(%s);\n" % (name, ",".join(json.dumps(a, ensure_ascii=False, separators=(",", ":")) for a in args))


def clean(s):
    return s.replace("\t", " ").replace("\n", " ").replace("|", "/").replace(";", ",")


def build_words(jm):
    words = jm["words"]
    # Common words first, so shard 0 (loaded first) already covers most lookups.
    words.sort(key=lambda w: (not any(k["common"] for k in w["kanji"] + w["kana"]), int(w["id"])))
    index, entries = [], []
    for w in words:
        kanji = [k["text"] for k in w["kanji"]]
        kana = [k["text"] for k in w["kana"]]
        common = any(k["common"] for k in w["kanji"] + w["kana"])
        glosses = "|".join("; ".join(clean(g["text"]) for g in s["gloss"]) for s in w["sense"])
        # Conjugation classes, so the deinflector can check its guesses.
        pos = {p for s in w["sense"] for p in s["partOfSpeech"] if p.startswith(("v1", "v5", "vk", "vs", "vz", "adj-i"))}
        # Plus coarse word-type letters for the search filters.
        for p in (p for s in w["sense"] for p in s["partOfSpeech"]):
            cat = "N" if p.startswith("n") else "V" if p.startswith("v") else "A" if p.startswith("adj") else "D" if p.startswith("adv") else "E" if p == "exp" else "C" if p == "ctr" else None
            if cat: pos.add(cat)
        if any("on-mim" in s["misc"] for s in w["sense"]):
            pos.add("O")
        pos = sorted(pos)
        index.append("\t".join([w["id"], ";".join(kanji), ";".join(kana), "1" if common else "0", ",".join(pos), glosses]))

        e = {"s": []}
        ktags = {k["text"]: k["tags"] for k in w["kanji"] if k["tags"]}
        rtags = {k["text"]: k["tags"] for k in w["kana"] if k["tags"]}
        rapp = {k["text"]: k["appliesToKanji"] for k in w["kana"] if k["appliesToKanji"] != ["*"]}
        if ktags: e["kt"] = ktags
        if rtags: e["rt"] = rtags
        if rapp: e["ra"] = rapp
        kc = [k["text"] for k in w["kanji"] if k["common"]]
        rc = [k["text"] for k in w["kana"] if k["common"]]
        if kc or rc: e["c"] = kc + rc
        examples = []
        for s in w["sense"]:
            sense = {"g": [g["text"] for g in s["gloss"]]}
            for key, out in (("partOfSpeech", "p"), ("misc", "m"), ("field", "f"), ("dialect", "d"), ("info", "i")):
                if s[key]: sense[out] = s[key]
            gt = sorted({g["type"] for g in s["gloss"] if g["type"]})
            if gt: sense["gt"] = gt
            if s["related"]: sense["r"] = ["・".join(str(x) for x in r) for r in s["related"]]
            if s["antonym"]: sense["a"] = ["・".join(str(x) for x in r) for r in s["antonym"]]
            if s["appliesToKanji"] != ["*"]: sense["sk"] = s["appliesToKanji"]
            if s["appliesToKana"] != ["*"]: sense["sr"] = s["appliesToKana"]
            ls = [(l["lang"] + (":" + l["text"] if l["text"] else "")) for l in s["languageSource"]]
            if ls: sense["l"] = ls
            e["s"].append(sense)
            for ex in s.get("examples", []):
                jp = next((x["text"] for x in ex["sentences"] if x["lang"] == "jpn"), None)
                en = next((x["text"] for x in ex["sentences"] if x["lang"] == "eng"), None)
                if jp and en and len(examples) < MAX_EXAMPLES:
                    examples.append([jp, en])
        if examples: e["x"] = examples
        entries.append(e)
    return index, entries


def build_kanji(kd, krad):
    out = {}
    for c in kd["characters"]:
        m = c["misc"]
        rm = c.get("readingMeaning") or {}
        on, kun, mean = [], [], []
        for g in rm.get("groups", []):
            for r in g["readings"]:
                if r["type"] == "ja_on": on.append(r["value"])
                elif r["type"] == "ja_kun": kun.append(r["value"])
            mean += [x["value"] for x in g["meanings"] if x["lang"] == "en"]
        rad = next((r["value"] for r in c["radicals"] if r["type"] == "classical"), None)
        heisig = next((r["value"] for r in c["dictionaryReferences"] if r["type"] == "heisig6"), None)
        skip = next((q["value"] for q in c["queryCodes"] if q["type"] == "skip"), None)
        k = {"s": m["strokeCounts"][0] if m["strokeCounts"] else 0}
        if on: k["on"] = on
        if kun: k["kun"] = kun
        if rm.get("nanori"): k["n"] = rm["nanori"]
        if mean: k["m"] = mean
        if m.get("grade"): k["g"] = m["grade"]
        if m.get("jlptLevel"): k["j"] = m["jlptLevel"]
        if m.get("frequency"): k["f"] = m["frequency"]
        if rad: k["r"] = rad
        if heisig: k["h"] = heisig
        if skip: k["sk"] = skip
        if c["literal"] in krad: k["p"] = "".join(krad[c["literal"]])
        out[c["literal"]] = k
    return out


def main():
    if len(sys.argv) != 6:
        sys.exit(__doc__)
    jm, kd, radk, krad = (load(p) for p in sys.argv[1:5])
    out = Path(sys.argv[5])
    out.mkdir(parents=True, exist_ok=True)
    for old in list(out.glob("index-*.js")) + list(out.glob("entries-*.js")):
        old.unlink()

    index, entries = build_words(jm)
    shards = (len(index) + SHARD - 1) // SHARD
    for n in range(shards):
        lo, hi = n * SHARD, (n + 1) * SHARD
        (out / ("index-%02d.js" % n)).write_text(js("JEDData.index", n, "\n".join(index[lo:hi])), encoding="utf-8")
        (out / ("entries-%02d.js" % n)).write_text(js("JEDData.entries", n, entries[lo:hi]), encoding="utf-8")

    kanji = build_kanji(kd, krad["kanji"])
    (out / "kanji.js").write_text(js("JEDData.kanji", kanji), encoding="utf-8")

    rads = [[r, v["strokeCount"], "".join(v["kanji"])] for r, v in radk["radicals"].items()]
    rads.sort(key=lambda r: (r[1], r[0]))
    (out / "radicals.js").write_text(js("JEDData.radicals", rads), encoding="utf-8")

    meta = {
        "shard": SHARD,
        "shards": shards,
        "words": len(index),
        "jmdictDate": jm["dictDate"],
        "kanjidicDate": kd["dictDate"],
        "version": jm["version"],
        "kanjiCount": len(kanji),
        "tags": jm["tags"],
    }
    (out / "meta.js").write_text(js("JEDData.meta", meta), encoding="utf-8")
    print("%d words in %d shards, %d kanji, %d radicals" % (len(index), shards, len(kanji), len(rads)))


if __name__ == "__main__":
    main()
