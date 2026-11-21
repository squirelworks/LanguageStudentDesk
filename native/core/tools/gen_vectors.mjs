// Replay the dictionary's kana.js and deinflect.js and write the vectors the
// Kotlin tests assert against. Run from the repo root:
//   node native/core/tools/gen_vectors.mjs
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");
const jsDir = path.join(root, "SquirrelGo-Apps/squirrelgo-dictionary/www/js");
const sandbox = { window: {} };
for (const name of ["kana.js", "deinflect.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(jsDir, name), "utf8"), sandbox, { filename: name });
}
const Kana = sandbox.window.Kana;
const Deinflect = sandbox.window.Deinflect;

function reading(raw) {
  const q = raw.trim().replace(/\s+/g, " ");
  if (!q) return null;
  if (Kana.hasJapanese(q) || /[*?＊？]/.test(q) && !/[a-z]/i.test(q)) return Kana.kataToHira(q);
  const converted = Kana.romajiToHiragana(q.toLowerCase().replace(/\s/g, ""));
  if (/^[\u3040-\u309fー*?]+$/.test(converted)) return converted;
  return null;
}

const romajiKeys = Object.keys(evalRomajiKeys());
const romajiInputs = [
  "", "a", "KA", "konnichiha", "konnichiwa", "nn", "n", "n'", "nna", "nnn", "nyan",
  "shi", "si", "chi", "ti", "tsu", "tu", "fu", "hu", "ji", "zi", "wo", "o",
  "kka", "tta", "tcha", "ccha", "shimbun", "shinbun", "mba", "mma", "kkya",
  "hello", "a1b", "xtu", "xtsu", "xwa", "va", "vu", "fa", "thi", "dwu", "-",
  "nani", "desu", "  nani",
  ...romajiKeys,
];

function evalRomajiKeys() {
  const text = fs.readFileSync(path.join(jsDir, "kana.js"), "utf8");
  const body = text.slice(text.indexOf("const ROMAJI = {") + "const ROMAJI = ".length);
  const obj = body.slice(0, body.indexOf(";\n"));
  return vm.runInNewContext("(" + obj + ")");
}

const cases = (fn, inputs) => inputs.map((input) => ({ in: input, out: fn(input) }));
const uniq = (xs) => [...new Set(xs)];

const toRomajiInputs = uniq([
  "", "あ", "ア", "こんにちは", "コンニチハ", "っ", "っか", "っちゃ", "ー", "ああ",
  "ん", "んあ", "んか", "んや", "んし", "を", "ヲ", "しゃ", "じゅ", "てぃ", "ゔ",
  "ヵ", "ヶ", "食べ", "ッ", "カー", "とうきょう", "トウキョウ",
]);

const kanaFlags = ["", "あ", "ア", "あー", "あa", "ー", "食", "っ", "ン"];
const japaneseFlags = ["", "a", "あ", "食", "々", "〆", "A", "カタカナ", "hello"];
const kanjiFlags = ["", "食", "々", "〆", "あ", "a", "食a", "カ"];

const words = [
  "", "た", "食べる", "食べた", "食べて", "食べている", "食べていた", "食べたい",
  "食べたくない", "食べません", "食べろ", "食べよう", "食べられる", "食べれば",
  "行った", "行って", "いった", "いって", "行く", "いく",
  "した", "しない", "できる", "させる", "勉強する", "勉強した", "する",
  "来る", "来た", "こない", "きて", "こよう", "くれば",
  "高い", "高くない", "高かった", "高くて", "高さ", "高すぎる",
  "読んだ", "読んで", "読んでいる", "買った", "買って", "泳いだ", "泳いで",
  "話した", "話します", "話そう", "死んだ", "死んで", "待った", "待って",
  "書いた", "書いて", "急いだ", "急いで",
];

const lookupInputs = [
  "", "  ", "taberu", "ta beru", "TABERU", "食べる", "カタカナ", "eat",
  "konnichiha", "tabe*", "*べる", "行った", "たべたくない",
];

const vectors = {
  romajiToHiragana: cases(Kana.romajiToHiragana, uniq(romajiInputs)),
  kataToHira: cases(Kana.kataToHira, uniq(["", "ア", "カナ", "あア", "ヵヶ", "ー", "食"])),
  hiraToKata: cases(Kana.hiraToKata, uniq(["", "あ", "かな", "アあ", "ぁゖ"])),
  toRomaji: cases(Kana.toRomaji, toRomajiInputs),
  isKana: cases(Kana.isKana, kanaFlags),
  hasJapanese: cases(Kana.hasJapanese, japaneseFlags),
  isKanji: cases(Kana.isKanji, kanjiFlags),
  deinflect: words.map((input) => ({ in: input, out: Deinflect.deinflect(input) })),
  lookup: lookupInputs.map((input) => {
    const kana = reading(input);
    return { in: input, kana, out: kana && kana.length > 1 ? Deinflect.deinflect(kana) : [] };
  }),
};

const out = path.join(here, "../src/jvmTest/resources/kana-deinflect-vectors.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(vectors));
console.log(out);
