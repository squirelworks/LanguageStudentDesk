// Lists the audio clips SquirrelGo Klingon needs, as input for
// SquirrelGo-Apps/tools/ipa_audio.py. Regenerate the audio after changing
// letters, IPA or words:
//   node tools/clips.js > /tmp/clips.json
//   python3 ../../tools/ipa_audio.py /tmp/clips.json www/audio
global.window = {};
require("../www/data/klingon.js");
require("../www/js/klingon-audio.js");
const K = window.SG_KLINGON;
const A = window.KlingonAudio;

// Sounds you can hold are said alone and then before a vowel; stops and
// affricates only exist next to a vowel, so they are said before and after one.
const HOLD = new Set(["l", "m", "n", "ng", "v", "w", "y", "r", "H", "gh", "S"]);
const clips = [];
for (const l of K.lessons) {
  if (l.numerals) continue;
  for (const [r, cp] of l.chars) {
    const c = K.ipa[r];
    let ipa;
    if ("aeIou".includes(r)) ipa = `ˈ${c}ː`;
    else if (r === "'") ipa = "ɑʔɑ ɑʔ";
    else if (HOLD.has(r)) ipa = `${c} ${c}ɑ`;
    else ipa = `${c}ɑ ɑ${c}`;
    clips.push({ file: A.letterFile(cp), ipa });
  }
}
const words = new Set(K.words.map(([w]) => w));
for (const l of K.lessons) for (const a of l.chars) words.add(a[4]);
for (const w of words) clips.push({ file: A.wordFile(w), ipa: A.ipa(w) });
process.stdout.write(JSON.stringify(clips, null, 1));
