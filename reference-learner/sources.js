// Card sets the Reference Learner builds from SquirrelGo app data, so the
// letter charts and articles stay single-sourced in the apps. Every source
// returns sets of { key, meta?, entries } in the languages/<id>/reference.json
// entry shape; an entry may also carry "html" (sanitized article markup) and
// "link" ({ href, label }).
//   key   a languages/ id: the cards join that language
//   meta  given when no language owns the script: the set gets its own
//         sidebar entry (ids double as the Character Learner's ?lang=)
// The app data files are plain scripts that set globals, so they load over
// file:// as well as from the Desk's local server.
(() => {
  const APPS = "../SquirrelGo-Apps/";
  const ALPHA_WWW = APPS + "squirrelgo-characters/squirrelgo-alphabets/www/";
  const ALPHA = ALPHA_WWW + "data/";
  const KANA = APPS + "squirrelgo-characters/squirrelgo-kana/www/data/kana.js";
  const KLINGON = APPS + "squirrelgo-characters/squirrelgo-klingon/www/data/klingon.js";
  const PHRASES = APPS + "squirrelgo-phrasebook/www/data/packs.js";
  const ROMAJI = APPS + "squirrelgo-phrasebook/www/js/romaji.js";
  // The Alphabets' own script order, used where its index.html can't be read (file://).
  const ALPHA_FILES = ["latin", "greek", "cyrillic", "armenian", "georgian", "hangul", "devanagari", "bengali", "gurmukhi", "gujarati", "tamil", "telugu", "kannada", "malayalam", "sinhala", "arabic", "hebrew", "ethiopic", "cherokee", "syllabics", "mongolian", "thai", "lao", "khmer", "tibetan"];

  const slug = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";

  // Data files write window.SG_SCRIPTS; load them one at a time into a fresh
  // array so each file's scripts are kept apart.
  let queue = Promise.resolve();
  function sgScripts(src) {
    return (queue = queue.catch(() => {}).then(async () => {
      window.SG_SCRIPTS = [];
      await LSD.loadScript(src);
      const got = window.SG_SCRIPTS;
      window.SG_SCRIPTS = [];
      return got;
    }));
  }

  // Script files listed in the Alphabets' index.html, so a new script shows up
  // here as soon as the app has it.
  async function alphabetFiles() {
    if (location.protocol !== "file:") {
      try {
        const r = await fetch(ALPHA_WWW + "index.html", { cache: "no-cache" });
        if (r.ok) {
          const names = [...(await r.text()).matchAll(/src="data\/([a-z0-9_-]+)\.js"/g)].map((m) => m[1]).filter((n) => n !== "app");
          if (names.length) return names;
        }
      } catch (e) {}
    }
    return ALPHA_FILES;
  }

  // Article HTML -> markup with only the tags a card needs.
  const KEEP = new Set(["P", "UL", "OL", "LI", "TABLE", "TBODY", "THEAD", "TR", "TD", "TH", "B", "I", "SPAN", "BR"]);
  const escText = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  function clean(node) {
    let out = "";
    node.childNodes.forEach((n) => {
      if (n.nodeType === 3) out += escText(n.textContent);
      else if (n.nodeType !== 1) return;
      else if (!KEEP.has(n.tagName)) out += clean(n);
      else {
        const t = n.tagName.toLowerCase();
        const lang = n.getAttribute("lang");
        const attrs = (lang && /^[A-Za-z-]+$/.test(lang) ? ' lang="' + lang + '"' : "") + (t === "td" || t === "th" ? ' dir="auto"' : "");
        out += t === "br" ? "<br>" : "<" + t + attrs + ">" + clean(n) + "</" + t + ">";
      }
    });
    return out;
  }
  function article(html) {
    const doc = new DOMParser().parseFromString("<body>" + html + "</body>", "text/html");
    return { html: clean(doc.body), text: doc.body.textContent.replace(/\s+/g, " ").trim() };
  }

  const SOUNDS = /sound|vowel|tone|pronunc|stress|accent|say|silent/i;

  // A SquirrelGo script ({ id, title, lessons, articles, ... }) as cards.
  // own: the set has no language of its own, so the first article is its overview.
  function scriptCards(s, own, link) {
    const name = s.title;
    const entries = [];
    const ids = new Set();
    const add = (e) => {
      let id = e.id;
      for (let n = 2; ids.has(id); n++) id = e.id + "-" + n;
      ids.add(id);
      entries.push(Object.assign(e, { id, link }));
    };
    (s.lessons || []).forEach((l) => {
      const rows = (l.chars || []).filter((c) => c && c[0]).map((c) => {
        const ex = c[3] ? [c[3], c[4], c[5]].filter(Boolean).join(" · ") : "";
        return ["{" + c[0] + "}", c[1] || "", c[2] || "", ex];
      });
      if (!rows.length) return;
      add({
        id: slug(s.id + "-" + (l.group && l.group !== l.title ? l.group + "-" : "") + l.title),
        topic: "script",
        title: name + ": " + l.title,
        body: l.note || [],
        table: { head: s.head || ["Letter", "Romanization", "Sounds like", "Example"], rows },
        tags: [s.id].concat(l.group ? [l.group.toLowerCase()] : []),
      });
    });
    (s.articles || []).forEach((a, i) => {
      const { html, text } = article(a.body || "");
      const overview = own && i === 0;
      add({
        id: slug(s.id + "-" + a.title),
        topic: overview ? "overview" : SOUNDS.test(a.title) ? "sounds" : "script",
        title: a.title,
        body: overview ? [s.blurb, s.writeTip].filter(Boolean) : [],
        html,
        text,
        tags: [s.id],
      });
    });
    return entries;
  }

  // The language that owns a script: one listing it in characterKeys, else the
  // only one listing it in writingSystems. Latin (English and Latin) has none.
  function owner(metas, id) {
    const byKey = metas.find((m) => (m.characterKeys || []).includes(id));
    if (byKey) return byKey.id;
    const bySys = metas.filter((m) => (m.writingSystems || []).includes(id));
    return bySys.length === 1 ? bySys[0].id : null;
  }

  function charLink(id) {
    return { href: LSD.toolUrl("character-learner/index.html", id), label: "Practise in the Character Learner" };
  }

  async function alphabets(metas) {
    const files = await alphabetFiles();
    const scripts = (await Promise.all(files.map((f) => sgScripts(ALPHA + f + ".js").catch(() => [])))).flat();
    return scripts.map((s) => {
      const key = owner(metas, s.id);
      if (key) return { key, entries: scriptCards(s, false, charLink(s.id)) };
      const id = metas.some((m) => m.id === s.id) ? s.id + "-script" : s.id;
      const meta = {
        id,
        name: s.title,
        nativeName: s.native,
        speech: s.lang,
        direction: s.dir,
        writingSystems: [s.id],
        script: s.id,
        language: s.langName,
      };
      return { key: id, meta, entries: scriptCards(s, true, charLink(s.id)) };
    });
  }

  async function kana(metas) {
    const scripts = await sgScripts(KANA);
    return scripts.map((s) => ({ key: owner(metas, s.id), entries: scriptCards(s, false, charLink(s.id)) })).filter((x) => x.key);
  }

  // SquirrelGo Klingon keeps its letters in SG_KLINGON:
  // [romanization, code point, how to say it, sounds like, example, meaning].
  async function klingon(metas) {
    const key = owner(metas, "klingon");
    if (!key) return [];
    await LSD.loadScript(KLINGON);
    const k = window.SG_KLINGON;
    if (!k) return [];
    const script = {
      id: "klingon",
      title: "pIqaD",
      head: ["Letter", "Sounds like", "How to say it", "Example"],
      articles: k.articles,
      lessons: (k.lessons || []).filter((l) => !l.numerals).map((l) => ({
        title: l.title,
        note: l.note,
        chars: (l.chars || []).map((c) => [c[0], c[3], c[2], c[4], "", c[5]]),
      })),
    };
    return [{ key, entries: scriptCards(script, false, charLink("klingon")) }];
  }

  // Phrasebook packs as phrase cards for Japanese, one per category.
  // Each phrase is [English, Japanese, kana reading, note?].
  async function phrasebook(metas) {
    const key = metas.some((m) => m.id === "japanese") ? "japanese" : null;
    if (!key) return [];
    await LSD.loadScript(ROMAJI);
    await LSD.loadScript(PHRASES);
    const link = { href: APPS + "squirrelgo-phrasebook/www/index.html", label: "Open the SquirrelGo Phrasebook" };
    const entries = (window.PHRASEBOOK_PACKS || []).flatMap((pack) =>
      (pack.categories || []).map((cat) => ({
        id: slug("phrasebook-" + pack.id + "-" + cat.title),
        topic: "phrases",
        title: pack.title + ": " + cat.title.charAt(0).toLowerCase() + cat.title.slice(1),
        body: [],
        examples: cat.phrases.map((p) => ({
          t: p[1],
          r: window.Romaji ? window.Romaji.romanize(p[2]) : p[2],
          e: p[0] + (p[3] ? " — " + p[3] : ""),
        })),
        tags: ["phrasebook", pack.title.toLowerCase()],
        link,
      }))
    );
    return [{ key, entries }];
  }

  // Every set from every source. A source that fails to load is skipped.
  window.LSD_REFERENCE_SOURCES = async function (metas) {
    const lists = await Promise.all([alphabets, kana, klingon, phrasebook].map((fn) => fn(metas).catch(() => [])));
    return lists.flat().filter((x) => x.entries.length);
  };
})();
