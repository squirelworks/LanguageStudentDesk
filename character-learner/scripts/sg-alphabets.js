// Scripts shared with SquirrelGo Alphabets. index.html loads that app's own
// data/<script>.js files (window.SG_SCRIPTS) and stroke files
// (window.SG_STROKES); this file turns them into Character Learner scripts
// without copying any of the data. Scripts the Desk already defines in
// scripts/*.js keep their own character list and only borrow the strokes.
if (typeof SCRIPTS === 'undefined') SCRIPTS = {};
(() => {
  const SG_BASE = '../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/';

  // Hangul double-consonant finals the Alphabets app does not draw: put the
  // two component jamo side by side, each squeezed into half the box.
  const HANGUL_PAIRS = {
    'ㄳ': 'ㄱㅅ', 'ㄵ': 'ㄴㅈ', 'ㄶ': 'ㄴㅎ', 'ㄺ': 'ㄹㄱ', 'ㄻ': 'ㄹㅁ', 'ㄼ': 'ㄹㅂ',
    'ㄽ': 'ㄹㅅ', 'ㄾ': 'ㄹㅌ', 'ㄿ': 'ㄹㅍ', 'ㅀ': 'ㄹㅎ', 'ㅄ': 'ㅂㅅ'
  };
  function squeeze(d, dx) {
    let n = 0;
    return d.replace(/-?[\d.]+/g, (v) => {
      const x = n++ % 2 === 0;
      const out = x ? dx + Number(v) * 0.46 : 12 + Number(v) * 0.76;
      return String(Math.round(out * 10) / 10);
    });
  }
  const hangul = (window.SG_STROKES || {}).hangul;
  if (hangul) {
    for (const [pair, parts] of Object.entries(HANGUL_PAIRS)) {
      const [a, b] = [...parts];
      if (hangul[pair] || !hangul[a] || !hangul[b]) continue;
      hangul[pair] = [...hangul[a].map((d) => squeeze(d, 3)), ...hangul[b].map((d) => squeeze(d, 51))];
    }
  }

  const SG_INFO = {};
  for (const s of window.SG_SCRIPTS || []) {
    SG_INFO[s.id] = { lang: s.lang, dir: s.dir || '', audio: SG_BASE + 'audio/' + s.id + '/' };
    if (SCRIPTS[s.id]) continue;
    const chars = [];
    const seen = new Set();
    for (const lesson of s.lessons) {
      for (const cell of lesson.chars || []) {
        if (!cell) continue;
        const [g, r, hint, ex, exR, exM, say] = cell;
        if (seen.has(g)) continue;
        seen.add(g);
        const example = ex ? `${ex}${exR ? ` (${exR})` : ''}${exM ? ` ${exM}` : ''}` : '';
        chars.push({ char: g, roman: r, info: hint || '', example, say: say || g, section: lesson.group || lesson.title });
      }
    }
    SCRIPTS[s.id] = { name: s.title, chars, sg: true };
  }

  window.SG_SCRIPT_INFO = SG_INFO;
})();
