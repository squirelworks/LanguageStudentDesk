// SquirrelGo suite: the desk launcher's ideas, on the phone. One shared file
// gives every app a "SquirrelGo apps" sheet (open or install the sibling
// apps), cross-app lookups (Kanji -> Dictionary, Dictionary -> Kanji, ...),
// and the per-language notes and resource lists from the desktop
// reference-learner and resource-learner.
//
// Source of truth: SquirrelGo-Apps/shared/suite.js. Each app keeps a copy in
// www/js/suite.js; run SquirrelGo-Apps/tools/sync-shared.sh after editing.
//
// Usage in an app:
//   <script src="js/suite.js" data-app="kana"></script>
//   <button data-suite="open">...</button>                      opens the sheet
//   <button data-suite="lookup" data-app="dictionary" data-q="食">  opens another app on a query
//   SquirrelGoSuite.onQuery((q) => ...)                          receives a query sent here
//
// On Android the SquirrelGo bridge in MainActivity launches the other app
// (or its download page when it isn't installed). In a browser the sibling
// app's www/index.html is opened with ?q=.
(() => {
  const RELEASES = "https://github.com/squirelworks/LanguageStudentDesk/releases/download/";
  const APPS = [
    { id: "kana", name: "SquirrelGo Kana", icon: "あ", blurb: "Hiragana and katakana: lessons, charts, quizzes, writing pad.",
      pkg: "com.squirelworks.squirrelgokana", tag: "squirrelgo-kana-latest", apk: "SquirrelGoKana-debug.apk",
      web: "squirrelgo-characters/squirrelgo-kana/www/index.html", langs: ["japanese"] },
    { id: "kanji", name: "SquirrelGo Kanji", icon: "漢", blurb: "Kanji lessons, topic and JLPT quizzes, on-yomi groups, stroke order.",
      pkg: "com.squirelworks.squirrelgokanji", tag: "squirrelgo-kanji-latest", apk: "SquirrelGoKanji-debug.apk",
      web: "squirrelgo-characters/squirrelgo-kanji/www/index.html", langs: ["japanese"] },
    { id: "dictionary", name: "SquirrelGo Dictionary", icon: "辞", blurb: "Offline Japanese–English dictionary: words, kanji, radicals.",
      pkg: "com.squirelworks.squirrelgodictionary", tag: "squirrelgo-dictionary-latest", apk: "SquirrelGoDictionary.apk",
      web: "squirrelgo-dictionary/www/index.html", langs: ["japanese"] },
    { id: "phrasebook", name: "SquirrelGo Phrasebook", icon: "話", blurb: "Japanese phrases with audio, favorites and flashcards.",
      pkg: "com.squirelworks.squirrelgophrasebook", tag: "squirrelgo-phrasebook-latest", apk: "SquirrelGoPhrasebook-debug.apk",
      web: "squirrelgo-phrasebook/www/index.html", langs: ["japanese"] },
    { id: "alphabets", name: "SquirrelGo Alphabets", icon: "한", blurb: "The world's alphabets: Latin, Greek, Cyrillic, Armenian, Georgian, Hangul, Devanagari, Bengali, Gurmukhi, Gujarati, Odia, Meetei Mayek, Tamil, Telugu, Kannada, Malayalam, Sinhala, Arabic, Hebrew, Ethiopic, Tifinagh, Cherokee, Inuktitut syllabics, Mongolian, Burmese, Thai, Lao, Khmer, Tibetan.",
      pkg: "com.squirelworks.squirrelgoalphabets", tag: "squirrelgo-alphabets-latest", apk: "SquirrelGoAlphabets-debug.apk",
      web: "squirrelgo-characters/squirrelgo-alphabets/www/index.html", langs: ["korean", "russian", "hindi", "arabic"] },
    { id: "klingon", name: "SquirrelGo Klingon", icon: "tlh", blurb: "The pIqaD script: letters, writing practice, quizzes.",
      pkg: "com.squirelworks.squirrelgoklingon", tag: "squirrelgo-klingon-latest", apk: "SquirrelGoKlingon-debug.apk",
      web: "squirrelgo-characters/squirrelgo-klingon/www/index.html", langs: ["klingon"] },
    { id: "orthodox-bible", name: "SquirrelGo Orthodox Bible", icon: "☦", blurb: "Septuagint-canon study Bible with parallel languages and commentary.",
      pkg: "com.squirelworks.squirrelgoorthodoxbible", tag: "squirrelgo-orthodox-bible-latest", apk: "SquirrelGoOrthodoxBible-debug.apk",
      web: "squirrelgo-orthodox-bible/www/index.html", langs: [] },
  ];

  const LANG_NAMES = { japanese: "Japanese", korean: "Korean", russian: "Russian", hindi: "Hindi", arabic: "Arabic", klingon: "Klingon" };

  // Quick facts, from the desk's reference-learner plus a few per alphabet.
  const NOTES = {
    japanese: [
      ["Particles wa / ga", "は (wa) marks the topic. が (ga) marks the subject. The topic is broader; the subject is the doer of the verb."],
      ["On-yomi vs kun-yomi", "On-yomi is the Chinese-derived reading, used mostly in compounds. Kun-yomi is the native Japanese reading, used alone or with okurigana."],
      ["Hiragana vs katakana", "Hiragana for native words and grammar. Katakana for foreign words, names and emphasis."],
      ["Okurigana", "Kana written after a kanji stem carry the inflection: 食べる is 食 + べる, and 食べた changes only the kana."],
    ],
    korean: [
      ["Syllable blocks", "Hangul letters stack into blocks: an initial consonant, a vowel, and an optional final consonant. 한 = ㅎ + ㅏ + ㄴ."],
      ["Silent ㅇ", "ㅇ is silent at the start of a block (아 = a) and sounds like “ng” at the end (앙 = ang)."],
    ],
    russian: [
      ["Look-alike letters", "Some Cyrillic letters look Latin but sound different: В = v, Н = n, Р = r, С = s, У = u, Х = kh."],
      ["Unmarked stress", "Stress is not written in normal text, and it changes vowels: unstressed о sounds close to a."],
    ],
    hindi: [
      ["Inherent vowel", "Every Devanagari consonant carries a short “a”. A vowel sign (matra) replaces it, and the virama ् removes it."],
      ["The headline", "The horizontal line on top (shirorekha) joins the letters of one word together."],
    ],
    arabic: [
      ["Letter forms", "Letters change shape by position: isolated, initial, medial, final. Six letters (ا د ذ ر ز و) never join to the letter after them."],
      ["Short vowels", "Arabic runs right to left, and short vowels are usually left unwritten. Vowel marks (harakat) appear in the Qur’an, children’s books and dictionaries."],
    ],
    klingon: [
      ["Word order", "Klingon is object–verb–subject (OVS). tlhIngan jIH = “I am a Klingon” (literally Klingon am-I)."],
      ["pIqaD", "The Klingon script. Fonts place it in the ConScript private-use range U+F8D0–U+F8FF, so it needs a pIqaD font to display."],
    ],
  };

  // From the desk's resource-learner. General tools are shown in every app.
  const RESOURCES = {
    general: [
      ["Anki", "Spaced-repetition flashcards. Dictionary tags and Phrasebook favorites export as CSV, which Anki can import.", "https://apps.ankiweb.net"],
    ],
    japanese: [
      ["Tanos", "JLPT kanji, vocabulary and grammar lists.", "https://www.tanos.co.uk"],
      ["Japanese From Zero!", "Structured beginner series (books and videos)."],
    ],
    korean: [["Talk To Me In Korean", "Podcasts, lessons and textbooks.", "https://talktomeinkorean.com"]],
    arabic: [["Alif Baa / Al-Kitaab", "The standard university textbook series, starting with the script."]],
    klingon: [["Klingon Language Institute", "Canonical reference materials and the community around them.", "https://www.kli.org"]],
  };

  const me = document.currentScript;
  const selfId = (me && me.dataset.app) || "";
  const self = APPS.find((a) => a.id === selfId);
  const bridge = window.SquirrelGo;
  const onAndroid = !!(bridge && bridge.open);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (id) => APPS.find((a) => a.id === id);

  // Path from this app's www/index.html back up to SquirrelGo-Apps/.
  const webRoot = self ? "../".repeat(self.web.split("/").length - 1) : "../";

  function installedSet() {
    if (!onAndroid) return null;
    try {
      return new Set(String(bridge.installed(APPS.map((a) => a.pkg).join(","))).split(",").filter(Boolean));
    } catch {
      return new Set();
    }
  }

  function openUrl(url) {
    if (onAndroid && bridge.openUrl) bridge.openUrl(url);
    else window.open(url, "_blank", "noopener");
  }

  // Open another app, optionally on a query. Returns false when the app isn't
  // installed and its download page was opened instead.
  function open(id, q) {
    const a = byId(id);
    if (!a) return false;
    if (onAndroid) {
      if (bridge.open(a.pkg, q || "")) return true;
      notice(`${a.name} isn't installed yet. Opening its download page.`);
      openUrl(RELEASES + a.tag + "/" + a.apk);
      return false;
    }
    location.href = webRoot + a.web + (q ? "?q=" + encodeURIComponent(q) : "");
    return true;
  }

  // ---- receiving a query from another app ----
  let handler = null;
  let pending = new URLSearchParams(location.search).get("q");
  if (pending && history.replaceState) history.replaceState(null, "", location.pathname);
  function poll() {
    if (onAndroid && bridge.takeQuery) {
      const q = bridge.takeQuery();
      if (q) pending = q;
    }
    if (pending && handler) {
      const q = pending;
      pending = null;
      close();
      handler(q);
    }
  }
  function onQuery(fn) {
    handler = fn;
    poll();
  }

  // ---- the sheet ----
  let sheet = null;
  function notice(msg) {
    let el = document.getElementById("sg-suite-notice");
    if (!el) {
      el = document.createElement("div");
      el.id = "sg-suite-notice";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(notice.t);
    notice.t = setTimeout(() => el.classList.remove("show"), 3000);
  }

  function sheetHtml() {
    const inst = installedSet();
    const langs = self ? self.langs : [];
    const others = APPS.filter((a) => a.id !== selfId);
    // Apps for the same languages first, the rest after.
    others.sort((a, b) => (b.langs.some((l) => langs.includes(l)) ? 1 : 0) - (a.langs.some((l) => langs.includes(l)) ? 1 : 0));
    const appRows = others
      .map((a) => {
        const have = inst ? inst.has(a.pkg) : true;
        return `<li class="sg-app">
          <span class="sg-icon">${esc(a.icon)}</span>
          <span class="sg-text"><b>${esc(a.name)}</b><span>${esc(a.blurb)}</span></span>
          <button class="sg-btn ${have ? "" : "get"}" data-suite="lookup" data-app="${a.id}">${have ? "Open" : "Get"}</button>
        </li>`;
      })
      .join("");
    const notes = langs
      .filter((l) => NOTES[l])
      .map((l) => `<h3>${esc(LANG_NAMES[l])}</h3>` + NOTES[l].map(([t, b]) => `<div class="sg-note"><b>${esc(t)}</b><p>${esc(b)}</p></div>`).join(""))
      .join("");
    const res = ["general", ...langs]
      .filter((l) => RESOURCES[l])
      .flatMap((l) => RESOURCES[l])
      .map(([t, b, url]) => `<li class="sg-res">${url ? `<a href="#" data-suite="url" data-url="${esc(url)}">${esc(t)}</a>` : `<b>${esc(t)}</b>`}<span>${esc(b)}</span></li>`)
      .join("");
    return `<div class="sg-panel" role="dialog" aria-label="SquirrelGo apps">
      <header class="sg-head"><h2>SquirrelGo</h2><button class="sg-close" data-suite="close" aria-label="Close">✕</button></header>
      <div class="sg-body">
        <h2>Apps</h2>
        <ul class="sg-list">${appRows}</ul>
        ${notes ? `<h2>Notes</h2>${notes}` : ""}
        ${res ? `<h2>Resources</h2><ul class="sg-list">${res}</ul>` : ""}
        <p class="sg-foot">Part of LanguageStudentDesk. Each app keeps its own progress on this device.</p>
      </div>
    </div>`;
  }

  function show() {
    if (!sheet) {
      sheet = document.createElement("div");
      sheet.id = "sg-suite";
      document.body.appendChild(sheet);
    }
    sheet.innerHTML = sheetHtml();
    sheet.classList.add("open");
  }
  function close() {
    if (!sheet || !sheet.classList.contains("open")) return false;
    sheet.classList.remove("open");
    return true;
  }
  // Android's Back key closes the sheet before the app handles it.
  const back = () => close();

  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest && e.target.closest("[data-suite]");
      if (!el) {
        if (sheet && e.target === sheet) close();
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const act = el.dataset.suite;
      if (act === "open") show();
      else if (act === "close") close();
      else if (act === "url") openUrl(el.dataset.url);
      else if (act === "lookup") {
        close();
        open(el.dataset.app, el.dataset.q || "");
      }
    },
    true
  );

  const style = document.createElement("style");
  style.textContent = `
#sg-suite{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);display:none;align-items:flex-end;justify-content:center}
#sg-suite.open{display:flex}
#sg-suite .sg-panel{background:#fff;color:#1d1d1f;width:100%;max-width:640px;max-height:92vh;border-radius:16px 16px 0 0;display:flex;flex-direction:column;font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 -4px 24px rgba(0,0,0,.25)}
#sg-suite .sg-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--sg-accent,#1f6f5c);color:#fff;border-radius:16px 16px 0 0}
#sg-suite .sg-head h2{margin:0;font-size:18px;color:#fff;text-transform:none;letter-spacing:0;font-weight:700}
#sg-suite .sg-close{background:none;border:0;color:#fff;font-size:20px;padding:4px 8px;cursor:pointer}
#sg-suite .sg-body{overflow-y:auto;padding:4px 16px 24px}
#sg-suite .sg-body h2{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#6b6b70;margin:18px 0 6px}
#sg-suite .sg-body h3{font-size:15px;margin:12px 0 4px}
#sg-suite .sg-list{list-style:none;margin:0;padding:0}
#sg-suite .sg-app,#sg-suite .sg-res{display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #e6e6ea}
#sg-suite .sg-res{flex-direction:column;align-items:flex-start;gap:2px}
#sg-suite .sg-icon{flex:none;width:42px;height:42px;border-radius:10px;background:#eef3f1;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600}
#sg-suite .sg-text{flex:1;display:flex;flex-direction:column;min-width:0}
#sg-suite .sg-text span,#sg-suite .sg-res span{color:#6b6b70;font-size:13px}
#sg-suite .sg-btn{flex:none;border:0;border-radius:18px;padding:7px 16px;background:var(--sg-accent,#1f6f5c);color:#fff;font:inherit;font-weight:600;cursor:pointer}
#sg-suite .sg-btn.get{background:#e6e6ea;color:#1d1d1f}
#sg-suite .sg-note{padding:6px 0}
#sg-suite .sg-note p{margin:2px 0 0;color:#3a3a3f}
#sg-suite a{color:var(--sg-accent,#1f6f5c);font-weight:600}
#sg-suite .sg-foot{color:#8e8e93;font-size:12px;margin-top:20px}
#sg-suite-notice{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#333;color:#fff;padding:10px 16px;border-radius:8px;z-index:1001;opacity:0;transition:opacity .2s;pointer-events:none;max-width:90vw;font:14px system-ui,sans-serif}
#sg-suite-notice.show{opacity:1}`;
  document.head.appendChild(style);
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) document.documentElement.style.setProperty("--sg-accent", theme.content);

  window.SquirrelGoSuite = { apps: APPS, open, show, close, back, onQuery, poll, has: (id) => !!byId(id) };
})();
