// Translation Learner: translate sentences from the meaning matrix, checking
// that every meaning is carried over and nothing is added (tokens.js).
(() => {
  const T = window.MeaningTokens;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // Languages with a column in the matrix. Names and ?lang= ids come from the
  // shared registry in languages/.
  const COLUMNS = ["japanese", "hangul", "chinese", "cyrillic", "hindi", "arabic", "greek", "latin", "hebrew", "thai", "bengali", "tamil", "georgian", "armenian", "klingon"];
  // Stays until a language pair passes its translation tests (issue #194).
  const ALPHA = '<span class="alpha">(alpha)</span>';
  const ROMAJI = "../SquirrelGo-Apps/squirrelgo-phrasebook/www/js/romaji.js";
  // Vocabulary Learner decks widen the word list for breaking down sentences.
  // Rows are [word, reading, English, note], or [word, English, note] for Klingon/Latin.
  const DECKS = { hangul: true, chinese: true, cyrillic: true, hindi: true, arabic: true, greek: true, latin: false, hebrew: true, thai: true, bengali: true, tamil: true, georgian: true, armenian: true, klingon: false };

  // Languages with a word bank (data/wordbank/<id>.js, built by tools/build_network.py).
  // Greek joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Greek as el).
  // Latin has no wordfreq list (like Klingon), so it has no Top 1,000 tab.
  // Hebrew joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Hebrew as he).
  // Thai joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Thai as th).
  // Bengali has no wordfreq bank yet (like Klingon), so it has no Top 1,000 tab.
  // Tamil joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Tamil as ta).
  // Georgian joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Georgian as ka).
  // Armenian joins the network via its column and Desk decks; a wordfreq Top 1,000
  // bank can be added later (wordfreq has Armenian as hy).
  const BANKS = ["japanese", "hangul", "chinese", "cyrillic", "hindi", "arabic"];

  const progress = LSD.store("lsd-translation-v1", {});
  const state = { lang: null, meta: null, col: null, sentences: [], lex: null, tab: "toEnglish", pack: "", reading: true };
  let metas = [];

  // ---- Loading ----

  async function loadColumn(id) {
    await LSD.loadScript("data/matrix.js");
    await LSD.loadScript("data/" + id + ".js");
    return window.TL_LANGS[id];
  }

  function matrix() {
    return { meanings: window.TL_MEANINGS, sentences: window.TL_SENTENCES };
  }

  async function deckEntries(id) {
    if (!(id in DECKS)) return [];
    try {
      await LSD.load(id, "vocab");
    } catch (e) {
      return [];
    }
    const out = [];
    for (const d of (window.LSD_DECKS && window.LSD_DECKS[id]) || []) {
      for (const w of d.words) {
        const english = DECKS[id] ? w[2] : w[1];
        const reading = DECKS[id] ? w[1] : "";
        out.push([w[0], reading, english.split(/[;/]/)[0].replace(/\([^)]*\)/g, "").trim()]);
      }
    }
    return out;
  }

  async function openLanguage(id) {
    state.lang = id;
    $("web").hidden = true; // showTab() shows it again when it is the open tab
    state.meta = await LSD.get(id);
    document.body.className = "lang-" + id;
    const name = state.meta ? state.meta.name : id;
    $("langHome").hidden = !!id && COLUMNS.includes(id);
    if (!id || !COLUMNS.includes(id)) {
      $("tabs").hidden = true;
      ["toEnglish", "toTarget", "breakdown", "matrix", "words"].forEach((s) => ($(s).hidden = true));
      $("title").innerHTML = "Translation Learner " + ALPHA;
      $("subtitle").textContent = id
        ? state.meta
          ? "No translation sentences for " + name + " yet. Pick another language."
          : "No language called “" + id + "” in the Desk."
        : "Translate sentence by sentence, one piece of meaning at a time: every piece carried over, nothing added.";
      $("langHome").hidden = false;
      return;
    }
    state.col = await loadColumn(id);
    if (!state.net) {
      try {
        await LSD.loadScript("data/network.js");
        state.net = window.MeaningNet.load(window.TL_NETWORK, T.stem);
      } catch (e) {
        state.net = null; // without the network, close words count as missing
      }
    }
    if (id === "japanese") await LSD.loadScript(ROMAJI);
    const built = T.build(matrix(), state.col);
    built.problems.forEach((p) => console.warn("Translation Learner, " + id + ": " + p));
    state.sentences = built.sentences;
    const lexEntries = state.sentences.flatMap((s) =>
      s.tokens.map((t) => [t.text, t.reading, t.units.map(unitLabel).join(" + ")])
    );
    state.lex = T.lexicon(lexEntries.concat(await deckEntries(id)), {
      byReading: id === "japanese",
      caseSensitive: !!state.col.caseSensitive,
    });
    $("title").innerHTML = "Translation Learner " + ALPHA + " <small>" + esc(name) + (state.meta && state.meta.nativeName ? " · " + esc(state.meta.nativeName) : "") + "</small>";
    $("subtitle").textContent = "Every piece of meaning carried over, nothing added.";
    $("toTargetTab").textContent = "Into " + name;
    $("wordsTab").hidden = !BANKS.includes(id);
    if (state.tab === "words" && !BANKS.includes(id)) state.tab = "toEnglish";
    state.bank = null;
    $("tabs").hidden = false;
    fillPacks();
    const readable = state.sentences.some((s) => s.tokens.some((t) => t.reading));
    document.querySelectorAll(".showReading").forEach((b) => (b.parentElement.hidden = !readable));
    $("bdHelp").textContent =
      "Type or paste " + name + " and see it split into pieces of meaning, using the lesson sentences and the Vocabulary Learner word lists. Pieces with no known meaning are marked.";
    $("bdInput").dir = state.meta && state.meta.direction === "rtl" ? "rtl" : "auto";
    $("bdInput").value = "";
    $("bdResult").innerHTML = "";
    queues = {};
    showTab(state.tab);
  }

  // ---- Shared bits ----

  function unitLabel(u) {
    return u.grammar ? "(" + u.label + ")" : u.label;
  }

  function romaji(kana) {
    return window.Romaji ? window.Romaji.romanize(kana).toLowerCase().replace(/[.?!,]/g, "") : "";
  }

  function tokenReading(t) {
    if (state.lang === "japanese") return t.reading === t.text ? romaji(t.reading) : t.reading + " · " + romaji(t.reading);
    return T.bare(t.reading);
  }

  function sentenceText(s) {
    return T.join(s.tokens, s.sep, s.end);
  }

  function sentenceReading(s) {
    if (state.lang === "japanese") {
      const r = s.tokens.map((t) => romaji(t.reading)).join(" ");
      return s.tokens.map((t) => t.reading).join("") + " · " + r.charAt(0).toUpperCase() + r.slice(1);
    }
    return T.joinReading(s.tokens);
  }

  function dirAttr() {
    return state.meta && state.meta.direction === "rtl" ? ' dir="rtl"' : "";
  }

  // One meaning piece: the written token, its reading, what it means.
  function piece(text, reading, label, cls, note) {
    return (
      '<span class="piece ' + (cls || "") + '">' +
      '<span class="w target">' + esc(text) + "</span>" +
      (state.reading && reading ? '<span class="r">' + esc(reading) + "</span>" : "") +
      '<span class="g">' + esc(label) + "</span>" +
      (note ? '<span class="m">' + esc(note) + "</span>" : "") +
      "</span>"
    );
  }

  function pieces(s) {
    return (
      '<div class="pieces"' + dirAttr() + ">" +
      s.tokens.map((t) => piece(T.bare(t.text), tokenReading(t), t.units.map(unitLabel).join(" + "), t.units.every((u) => u.grammar) ? "grammar" : "")).join("") +
      s.implied.map((u) => piece("—", "", u.label, "grammar", "implied")).join("") +
      "</div>"
    );
  }

  function fillPacks() {
    const tally = (list) => list.reduce((c, s) => ((c[s.pack] = (c[s.pack] || 0) + 1), c), {});
    document.querySelectorAll(".packSelect").forEach((sel) => {
      // The matrix shows every row; practice shows this language's sentences.
      const list = sel.closest("#matrix") ? window.TL_SENTENCES : state.sentences;
      const counts = tally(list);
      sel.innerHTML = "";
      sel.add(new Option("All (" + list.length + ")", ""));
      Object.keys(window.TL_PACK_TITLES)
        .filter((p) => counts[p])
        .forEach((p) => sel.add(new Option(window.TL_PACK_TITLES[p] + " (" + counts[p] + ")", p)));
      sel.value = state.pack;
      sel.onchange = () => {
        state.pack = sel.value;
        document.querySelectorAll(".packSelect").forEach((o) => (o.value = state.pack));
        queues = {};
        next(state.tab);
      };
    });
    document.querySelectorAll(".showReading").forEach((box) => {
      box.checked = state.reading;
      box.onchange = () => {
        state.reading = box.checked;
        document.querySelectorAll(".showReading").forEach((o) => (o.checked = state.reading));
        showTab(state.tab, true);
      };
    });
  }

  // Progress per language and sentence: { e: honest into English, t: into the language }.
  function record(s, key, ok) {
    const all = progress.load();
    const l = (all[state.lang] = all[state.lang] || {});
    const p = (l[s.id] = l[s.id] || {});
    if (ok) p[key] = (p[key] || 0) + 1;
    progress.save(all);
    stats();
  }

  function stats() {
    const l = progress.load()[state.lang] || {};
    const pool = pool_();
    const key = state.tab === "toTarget" ? "t" : "e";
    const done = pool.filter((s) => l[s.id] && l[s.id][key]).length;
    document.querySelectorAll(".stats").forEach((el) => (el.innerHTML = "<b>" + done + "</b> of " + pool.length + " translated honestly"));
  }

  function pool_() {
    return state.sentences.filter((s) => !state.pack || s.pack === state.pack);
  }

  // Sentences not yet translated honestly come first, in random order.
  let queues = {};
  function draw(key) {
    if (!queues[key] || !queues[key].length) {
      const l = progress.load()[state.lang] || {};
      queues[key] = pool_()
        .map((s) => ({ s, k: ((l[s.id] && l[s.id][key]) || 0) + Math.random() }))
        .sort((a, b) => a.k - b.k)
        .map((x) => x.s);
    }
    return queues[key].shift();
  }

  function speakButton(btn, text) {
    const can = LSD.canSpeak(state.meta);
    btn.hidden = !can;
    btn.onclick = () => LSD.speak(text, state.meta);
  }

  // ---- Into English ----

  let cur = {};

  function showEnglish(s) {
    cur.toEnglish = s;
    $("enDeck").textContent = window.TL_PACK_TITLES[s.pack];
    const text = sentenceText(s);
    $("enSay").innerHTML = (state.lang === "klingon" ? '<span class="piqad">' + esc(LSD.piqad(text)) + "</span>" : "") + "<span" + dirAttr() + ">" + esc(text) + "</span>";
    $("enReading").textContent = state.reading ? sentenceReading(s) : "";
    speakButton($("enSpeak"), text);
    $("enInput").value = "";
    $("enInput").disabled = false;
    $("enCheck").disabled = false;
    $("enHintBox").hidden = true;
    $("enResult").hidden = true;
    $("enInput").focus();
  }

  function checkEnglish(override) {
    const s = cur.toEnglish;
    const answer = $("enInput").value.trim();
    if (!answer && !override) return;
    const r = T.checkEnglish(s, answer, state.net);
    const honest = r.honest || override;
    $("enInput").disabled = true;
    $("enCheck").disabled = true;
    $("enHintBox").hidden = true;
    const byToken = s.tokens.map(() => []);
    const implied = [];
    r.units.forEach((u) => (u.token < 0 ? implied : byToken[u.token]).push(u));
    const cls = (units) => {
      if (units.some((u) => u.status === "dropped")) return "dropped";
      if (units.some((u) => u.status === "close")) return "close";
      if (units.some((u) => u.status === "kept")) return "kept";
      if (units.some((u) => u.status === "shown")) return "shown grammar";
      return "grammar";
    };
    const note = (units) =>
      units
        .map((u) => (u.status === "close" ? "≈ “" + u.matched[0] + "”" : u.matched.length ? "“" + u.matched.join(" ") + "”" : u.status === "dropped" ? "missing" : ""))
        .filter(Boolean)
        .join(" ");
    let html = '<div class="verdict ' + (honest ? "ok" : "bad") + '">';
    if (override) html += "Counted as right.";
    else if (r.honest) html += "Every meaning carried over, nothing added." + (r.typos ? " Check the spelling below." : "");
    else {
      const parts = [];
      if (r.dropped) parts.push(r.dropped + (r.dropped === 1 ? " meaning" : " meanings") + " missing");
      if (r.close) parts.push(r.close + (r.close === 1 ? " close word" : " close words"));
      if (r.added.length) parts.push(r.added.length + (r.added.length === 1 ? " word adds" : " words add") + " meaning");
      html += parts.join(", ") + ". Meaning score " + Math.round(r.score * 100) + "%.";
    }
    html += "</div>";
    html += '<div class="pieces"' + dirAttr() + ">";
    s.tokens.forEach((t, i) => {
      const units = byToken[i];
      html += piece(T.bare(t.text), tokenReading(t), t.units.map(unitLabel).join(" + "), cls(units), note(units));
    });
    implied.forEach((u) => (html += piece("—", "", u.meaning.label, u.status === "kept" ? "kept" : "grammar", u.status === "kept" ? "“" + u.matched.join(" ") + "”" : "implied")));
    html += "</div>";
    if (r.typos) html += '<p class="small">Spelling: ' + r.units.filter((u) => u.typo).map((u) => "“" + esc(u.matched[0]) + "” is spelt “" + esc(u.typo) + "”").join(", ") + ".</p>";
    if (r.close) html += '<p class="small muted">A close word means nearly the same thing, by what the meaning network learned, but not exactly: ' + r.units.filter((u) => u.status === "close").map((u) => "“" + esc(u.matched[0]) + "” for " + esc(u.meaning.label) + " (" + Math.round(T.closeCredit(u.sim, state.net.close) * 100) + "% credit)").join(", ") + ".</p>";
    if (r.added.length) html += '<p class="added">Not in the original: ' + r.added.map((w) => "“" + esc(w) + "”").join(", ") + "</p>";
    html += '<p class="model">Model answer: <b>' + esc(s.en) + "</b></p>";
    html += '<div class="legend"><span class="l-kept">carried over</span><span class="l-close">close</span><span class="l-dropped">missing</span><span class="l-grammar">grammar or implied: English may leave it out</span></div>';
    html += '<div class="row" style="margin-top:0.8rem"><button class="primary" id="enNext">Next</button>' + (honest ? "" : '<button id="enOverride">My translation means the same</button>') + "</div>";
    $("enResult").innerHTML = html;
    $("enResult").hidden = false;
    record(s, "e", honest);
    $("enNext").onclick = () => next("toEnglish");
    $("enNext").focus();
    if ($("enOverride")) $("enOverride").onclick = () => checkEnglish(true);
  }

  // ---- Into the language ----

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Pieces from other sentences that carry a meaning this one doesn't.
  function distractors(s, n) {
    const own = new Set(s.tokens.flatMap((t) => t.units.map((u) => u.id)));
    const ownText = new Set(s.tokens.map((t) => t.text));
    const seen = new Set();
    const pool = [];
    for (const o of state.sentences) {
      if (o === s) continue;
      for (const t of o.tokens) {
        if (ownText.has(t.text) || seen.has(t.text) || t.units.some((u) => u.grammar || own.has(u.id))) continue;
        seen.add(t.text);
        pool.push(t);
      }
    }
    return shuffle(pool).slice(0, n);
  }

  function showTarget(s) {
    cur.toTarget = s;
    cur.placed = [];
    cur.bank = shuffle(s.tokens.concat(distractors(s, Math.min(3, Math.max(2, s.tokens.length - 1)))).map((t) => ({ t, used: false })));
    $("tgDeck").textContent = window.TL_PACK_TITLES[s.pack];
    $("tgSay").textContent = s.en;
    $("tgResult").hidden = true;
    $("tgCheck").disabled = false;
    $("tgClear").disabled = false;
    drawTiles();
  }

  function tileButton(t) {
    const r = state.reading ? tokenReading(t) : "";
    return '<span class="target">' + esc(T.bare(t.text)) + "</span>" + (r ? "<small>" + esc(r) + "</small>" : "");
  }

  function drawTiles(locked) {
    const placed = $("tgPlaced");
    const bank = $("tgBank");
    placed.innerHTML = "";
    bank.innerHTML = "";
    placed.dir = bank.dir = state.meta && state.meta.direction === "rtl" ? "rtl" : "ltr";
    cur.placed.forEach((b, i) => {
      const btn = document.createElement("button");
      btn.innerHTML = tileButton(b.t);
      btn.disabled = !!locked;
      btn.onclick = () => {
        b.used = false;
        cur.placed.splice(i, 1);
        drawTiles();
      };
      placed.appendChild(btn);
    });
    cur.bank.forEach((b) => {
      if (b.used) return;
      const btn = document.createElement("button");
      btn.innerHTML = tileButton(b.t);
      btn.disabled = !!locked;
      btn.onclick = () => {
        b.used = true;
        cur.placed.push(b);
        drawTiles();
      };
      bank.appendChild(btn);
    });
  }

  function checkTarget(override) {
    const s = cur.toTarget;
    if (!cur.placed.length && !override) return;
    const r = T.checkTiles(s, cur.placed.map((b) => b.t));
    const honest = r.honest || override;
    drawTiles(true);
    $("tgCheck").disabled = true;
    $("tgClear").disabled = true;
    let html = '<div class="verdict ' + (r.orderOk || override ? "ok" : "bad") + '">';
    if (override) html += "Counted as right.";
    else if (r.orderOk) html += "Every meaning carried over, nothing added.";
    else if (r.honest) html += "All the right pieces, in a different order from the model.";
    else {
      const parts = [];
      const lost = r.missing.filter((t) => t.units.some((u) => !u.grammar)).length;
      const grammar = r.missing.length - lost;
      if (lost) parts.push(lost + (lost === 1 ? " meaning" : " meanings") + " missing");
      if (grammar) parts.push(grammar + (grammar === 1 ? " grammar piece" : " grammar pieces") + " missing");
      if (r.extra.length) parts.push(r.extra.length + (r.extra.length === 1 ? " piece adds" : " pieces add") + " meaning");
      html += parts.join(", ") + ".";
    }
    html += "</div>";
    if (r.missing.length || r.extra.length) {
      html += '<div class="pieces"' + dirAttr() + ">";
      r.missing.forEach((t) => (html += piece(T.bare(t.text), tokenReading(t), t.units.map(unitLabel).join(" + "), "dropped", "missing")));
      r.extra.forEach((t) => (html += piece(T.bare(t.text), tokenReading(t), t.units.map(unitLabel).join(" + "), "extra", "not in the English")));
      html += "</div>";
    }
    html += '<p class="model">Model answer: <span class="say target"' + dirAttr() + ">" + esc(sentenceText(s)) + "</span>" + (state.reading && sentenceReading(s) ? '<br><span class="small muted">' + esc(sentenceReading(s)) + "</span>" : "") + "</p>";
    html += pieces(s);
    html += '<div class="row" style="margin-top:0.8rem"><button class="primary" id="tgNext">Next</button><button class="link small" id="tgSpeak" hidden>Listen</button>' + (r.orderOk || override ? "" : '<button id="tgOverride">My order means the same</button>') + "</div>";
    $("tgResult").innerHTML = html;
    $("tgResult").hidden = false;
    // Only a different word order can be a fair override; missing or added
    // meaning cannot.
    if ($("tgOverride") && !r.honest) $("tgOverride").remove();
    record(s, "t", r.orderOk || override);
    speakButton($("tgSpeak"), sentenceText(s));
    $("tgNext").onclick = () => next("toTarget");
    $("tgNext").focus();
    if ($("tgOverride")) $("tgOverride").onclick = () => checkTarget(true);
  }

  // ---- Break down ----

  function breakDown() {
    const text = $("bdInput").value;
    const parts = T.breakDown(text, state.lex, state.col.sep === " ");
    if (!parts.length) {
      $("bdResult").innerHTML = "";
      return;
    }
    const unknown = parts.filter((p) => !p.gloss).length;
    let html = '<div class="pieces"' + dirAttr() + ">";
    parts.forEach((p) => {
      const reading = p.reading ? (state.lang === "japanese" ? romaji(p.reading) : T.bare(p.reading)) : "";
      html += p.gloss ? piece(p.text, reading, p.gloss, p.gloss.startsWith("(") ? "grammar" : "kept") : piece(p.text, "", "meaning unknown", "unknown");
    });
    html += "</div>";
    html += '<p class="small muted">' + parts.length + (parts.length === 1 ? " piece" : " pieces") + (unknown ? ", " + unknown + " with no known meaning: a word outside the Desk's word lists, or a form of one." : ", all with a known meaning.") + "</p>";
    $("bdResult").innerHTML = html;
  }

  // ---- The matrix ----

  // The learner picks which languages to compare and in what order; the
  // choice is kept per browser. The meaning column stays pinned on the left.
  const compareStore = LSD.store("lsd-translation-compare-v1", null);
  const RTL = ["arabic", "hebrew"];
  const CJK = ["japanese", "chinese", "hangul"];

  function compareList() {
    let list = compareStore.load();
    if (!Array.isArray(list)) list = [];
    list = list.filter((id, i) => COLUMNS.includes(id) && list.indexOf(id) === i);
    if (!list.length) {
      list = [state.lang].concat(COLUMNS.filter((id) => id !== state.lang).slice(0, 2));
    } else if (!list.includes(state.lang)) {
      list = [state.lang].concat(list);
    }
    return list;
  }

  function langName(id) {
    const m = metas.find((x) => x.id === id);
    return m ? m.name : id;
  }

  function drawCompare(list) {
    const box = $("matrixCompare");
    box.innerHTML = "";
    list.forEach((id, i) => {
      const chip = document.createElement("span");
      chip.className = "cmp" + (id === state.lang ? " here" : "");
      const btn = (label, title, fn, off) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.title = title;
        b.setAttribute("aria-label", title);
        b.disabled = !!off;
        b.onclick = fn;
        return b;
      };
      const move = (d) => () => {
        const l = list.slice();
        [l[i], l[i + d]] = [l[i + d], l[i]];
        compareStore.save(l);
        showMatrix();
      };
      chip.append(
        btn("◀", "Move " + langName(id) + " left", move(-1), i === 0),
        Object.assign(document.createElement("b"), { textContent: langName(id) }),
        btn("▶", "Move " + langName(id) + " right", move(1), i === list.length - 1),
        btn("×", "Stop comparing " + langName(id), () => {
          compareStore.save(list.filter((x) => x !== id));
          showMatrix();
        }, list.length < 2)
      );
      box.appendChild(chip);
    });
    const add = document.createElement("select");
    add.setAttribute("aria-label", "Add a language to compare");
    add.add(new Option("Add a language…", ""));
    metas
      .filter((m) => !list.includes(m.id))
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((m) => add.add(new Option(m.name, m.id)));
    add.disabled = add.options.length < 2;
    add.onchange = () => {
      if (!add.value) return;
      compareStore.save(list.concat(add.value));
      showMatrix();
    };
    box.appendChild(add);
  }

  async function showMatrix() {
    const list = compareList();
    drawCompare(list);
    const cols = [];
    for (const id of list) {
      try {
        const col = await loadColumn(id);
        cols.push({ id, name: langName(id), built: T.build(matrix(), col).sentences });
      } catch (e) {
        /* a missing column is left out */
      }
    }
    const rows = window.TL_SENTENCES.filter((s) => !state.pack || s.pack === state.pack);
    const here = (c) => (c.id === state.lang ? " here" : "");
    let html = '<table class="matrix"><thead><tr><th class="mean">Meaning</th>' + cols.map((c) => '<th class="' + here(c).trim() + '">' + esc(c.name) + "</th>").join("") + "</tr></thead><tbody>";
    for (const row of rows) {
      html += '<tr><th class="mean" scope="row"><b>' + esc(row.en) + '</b><span class="small muted">' + row.m.map((m) => esc(T.meaning(m, window.TL_MEANINGS).label)).join(" · ") + "</span></th>";
      for (const c of cols) {
        const s = c.built.find((x) => x.id === row.id);
        if (!s) {
          html += '<td class="gap' + here(c) + '" data-lang="' + esc(c.name) + '"><span class="small muted">Not written yet</span></td>';
          continue;
        }
        const why = s.tokens.map((t) => "<span><b>" + esc(T.bare(t.text)) + "</b> " + esc(t.units.map(unitLabel).join(" + ")) + "</span>").concat(s.implied.map((u) => '<span class="muted">(' + esc(u.label) + ": implied)</span>")).join("");
        const rtl = RTL.includes(c.id) ? ' dir="rtl"' : "";
        const face = CJK.includes(c.id) ? "target" : "target plain";
        html += '<td class="' + face + here(c) + '" data-lang="' + esc(c.name) + '" tabindex="0"><span' + rtl + ">" + esc(T.join(s.tokens, s.sep, s.end)) + '</span><span class="why" hidden>' + why + "</span></td>";
      }
      html += "</tr>";
    }
    html += "</tbody></table>";
    $("matrixTable").innerHTML = html;
    $("matrixCount").textContent = rows.length + (rows.length === 1 ? " sentence" : " sentences");
    $("matrixTable").querySelectorAll("td.target").forEach((td) => {
      const flip = () => (td.querySelector(".why").hidden = !td.querySelector(".why").hidden);
      td.onclick = flip;
      td.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip();
        }
      };
    });
  }

  // ---- Word bank ----

  // Display names for the network's language prefixes.
  function langName(id) {
    const m = metas.find((x) => x.id === id);
    return m ? m.name : id;
  }

  // What the network puts near a word: the same meaning in other languages
  // (the nearest word of each), and nearby English.
  function neighbours(key) {
    if (!state.net || !state.net.has(key)) return "";
    const near = state.net.nearest(key, 400);
    const other = [];
    const seen = new Set([state.lang]);
    for (const n of near) {
      const [lang, word] = [n.key.slice(0, n.key.indexOf(":")), n.key.slice(n.key.indexOf(":") + 1)];
      if (lang === "m" || lang === "en" || seen.has(lang) || n.sim < state.net.close) continue;
      seen.add(lang);
      const face = ["japanese", "chinese", "hangul"].includes(lang) ? ' class="target"' : "";
      other.push("<span" + face + ">" + esc(word) + "<small>" + esc(langName(lang)) + "</small></span>");
    }
    const english = near.filter((n) => n.key.startsWith("en:") && !n.key.includes("'") && n.sim >= state.net.close).slice(0, 6);
    let html = "";
    if (english.length) html += '<div class="small muted">Near it in English</div><div class="near">' + english.map((n) => "<span>" + esc(n.key.slice(3)) + "</span>").join("") + "</div>";
    if (other.length) html += '<div class="small muted">The same meaning in other Desk languages</div><div class="near">' + other.join("") + "</div>";
    return html;
  }

  async function loadBank() {
    if (state.bank) return state.bank;
    await LSD.loadScript("data/wordbank/" + state.lang + ".js");
    const bank = window.TL_WORDBANK[state.lang];
    state.bank = bank.words.map((w, i) => ({ rank: i + 1, word: w[0], english: w[1], base: w[2], guess: !!w[3] }));
    state.bankCredit = bank.credit;
    return state.bank;
  }

  async function showWords() {
    const bank = await loadBank();
    const known = bank.filter((w) => w.english && !w.guess).length;
    const forms = bank.filter((w) => w.guess).length;
    $("wbTitle").textContent = "The " + bank.length.toLocaleString("en") + " most used words in " + langName(state.lang);
    $("wbIntro").textContent =
      "Ranked by how often they appear across subtitles, Wikipedia, news, books and the web. The Desk has a meaning for " + known +
      (forms ? ", and reads " + forms + " more as forms of a word it knows" : "") +
      ".";
    $("wbCredit").textContent = "Word list: " + state.bankCredit + ".";
    $("wbDetail").hidden = true;
    drawBank();
    nextWord();
  }

  // The word bank as the filter and search box show it.
  function shownWords() {
    const filter = $("wbFilter").value;
    const q = $("wbSearch").value.trim().toLowerCase();
    return state.bank.filter((w) => {
      if (filter === "known" && !w.english) return false;
      if (filter === "unknown" && w.english) return false;
      return !q || w.word.includes(q) || w.english.toLowerCase().includes(q);
    });
  }

  function drawBank() {
    const list = $("wbList");
    list.innerHTML = "";
    list.dir = state.meta && state.meta.direction === "rtl" ? "rtl" : "ltr";
    for (const w of shownWords()) {
      const b = document.createElement("button");
      b.className = w.english ? "" : "none";
      b.innerHTML = '<span class="n">' + w.rank + '</span><span class="w target">' + esc(w.word) + '</span><span class="e">' + esc(w.english || "—") + "</span>";
      b.onclick = () => showWord(w);
      list.appendChild(b);
    }
  }

  function showWord(w) {
    const key = state.lang + ":" + (state.net && state.net.has(state.lang + ":" + w.word) ? w.word : w.base || w.word);
    let html = '<div class="row"><span class="say target">' + esc(w.word) + '</span><span class="muted">No. ' + w.rank + "</span>";
    html += '<button class="link small" id="wbSpeak" hidden>Listen</button></div>';
    if (w.base) html += "<p>" + (w.guess ? "Probably a form of" : "A form of") + " <b class=\"target\">" + esc(w.base) + "</b>: " + esc(w.english) + "</p>";
    else if (w.english) html += "<p>" + esc(w.english) + "</p>";
    else html += '<p class="muted">No meaning for this word in the Desk yet.</p>';
    html += neighbours(key);
    $("wbDetail").innerHTML = html;
    $("wbDetail").hidden = false;
    speakButton($("wbSpeak"), w.word);
  }

  // Word practice: higher-ranked words come up more often.
  function nextWord() {
    const pool = state.bank.filter((w) => w.english);
    if (!pool.length) return;
    const w = pool[Math.floor(pool.length * Math.random() ** 2)];
    cur.word = w;
    $("wpRank").textContent = "No. " + w.rank + " of " + state.bank.length;
    $("wpSay").textContent = w.word;
    $("wpSay").dir = state.meta && state.meta.direction === "rtl" ? "rtl" : "auto";
    $("wpInput").value = "";
    $("wpInput").disabled = false;
    $("wpCheck").disabled = false;
    $("wpResult").hidden = true;
  }

  function checkWord() {
    const w = cur.word;
    const answer = $("wpInput").value.trim();
    if (!answer) return;
    const want = new Set(T.englishWords(w.english).map((x) => x.stem));
    const said = T.englishWords(answer);
    let verdict = "bad", text = "Not quite.";
    const typo = !said.some((x) => want.has(x.stem)) && said.find((x) =>
      !(state.net && state.net.has("en:" + x.word)) && T.englishWords(w.english).some((y) => T.misspelt(x.word, y.word)));
    if (said.some((x) => want.has(x.stem))) {
      verdict = "ok";
      text = "Right.";
    } else if (typo) {
      verdict = "ok";
      const right = T.englishWords(w.english).find((y) => T.misspelt(typo.word, y.word));
      text = "Right, but it is spelt “" + esc(right.word) + "”.";
    } else if (state.net) {
      const key = state.lang + ":" + (state.net.has(state.lang + ":" + w.word) ? w.word : w.base);
      let best = -1, bestWord = "";
      said.forEach((x) => {
        const n = state.net.english(x.word);
        const s = n == null ? null : state.net.sim(n, key);
        if (s != null && s > best) (best = s), (bestWord = x.word);
      });
      if (best >= state.net.close) {
        verdict = "close";
        text = "Close: “" + esc(bestWord) + "” is near it in meaning, but not quite it.";
      }
    }
    $("wpInput").disabled = true;
    $("wpCheck").disabled = true;
    let html = '<div class="verdict ' + (verdict === "ok" ? "ok" : "bad") + '">' + text + "</div>";
    html += "<p>" + (w.base ? "A form of <b class=\"target\">" + esc(w.base) + "</b>: " : "") + "<b>" + esc(w.english) + "</b></p>";
    html += neighbours(state.lang + ":" + (state.net && state.net.has(state.lang + ":" + w.word) ? w.word : w.base || w.word));
    html += '<div class="row" style="margin-top:0.6rem"><button class="primary" id="wpNext">Next</button></div>';
    $("wpResult").innerHTML = html;
    $("wpResult").hidden = false;
    $("wpNext").onclick = nextWord;
    $("wpNext").focus();
  }

  // ---- Practice sets ----
  // Tab-separated files that Anki (File > Import) and spreadsheets read. The
  // header lines starting with # are Anki's import settings.

  function download(name, columns, rows) {
    const clean = (v) => String(v == null ? "" : v).replace(/[\t\r\n]+/g, " ");
    const lines = ["#separator:tab", "#html:false", "#columns:" + columns.join("\t")];
    rows.forEach((r) => lines.push(r.map(clean).join("\t")));
    const blob = new Blob([lines.join("\n") + "\n"], { type: "text/tab-separated-values;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function exportWords() {
    const words = shownWords().filter((w) => w.english);
    const credit = "Word list: " + state.bankCredit;
    download(state.lang + "-top-words.tsv", ["Word", "English", "Dictionary form", "Rank", "Source"],
      words.map((w) => [w.word, w.english, w.base, w.rank, credit]));
  }

  function exportSentences() {
    download(state.lang + "-sentences.tsv", ["Sentence", "Reading", "English", "Meanings"],
      state.sentences.map((s) => [sentenceText(s), sentenceReading(s), s.en, s.tokens.map((t) => T.bare(t.text) + " = " + t.units.map(unitLabel).join(" + ")).join("; ")]));
  }

  // ---- Meaning web ----

  // One meaning in the middle, the word for it in every language branching
  // off, and the meanings nearest to it around the edge. Clicking a nearby
  // meaning moves it to the middle; clicking a word lists its sentences.
  const SVGNS = "http://www.w3.org/2000/svg";
  const web = { id: null, cols: null };

  async function webColumns() {
    if (web.cols) return web.cols;
    const cols = [];
    for (const id of COLUMNS) {
      try {
        const col = await loadColumn(id);
        const m = metas.find((x) => x.id === id);
        cols.push({ id, name: m ? m.name : id, caseSensitive: !!col.caseSensitive, built: T.build(matrix(), col).sentences });
      } catch (e) {
        /* a missing column is left out */
      }
    }
    return (web.cols = cols);
  }

  function contentMeanings() {
    return Object.keys(window.TL_MEANINGS)
      .map((id) => T.meaning(id, window.TL_MEANINGS))
      .filter((u) => u && !u.grammar)
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  // The words that carry meaning id in one language, with the sentences they
  // appear in.
  function wordsFor(col, id) {
    const found = new Map();
    for (const s of col.built) {
      for (const t of s.tokens) {
        if (!t.units.some((u) => u.id === id)) continue;
        // "Aquam" opening a sentence is the same word as "aquam".
        const text = T.bare(t.text);
        const key = col.caseSensitive ? text : text.toLowerCase();
        if (!found.has(key)) found.set(key, { text, reading: t.reading, sentences: [] });
        const w = found.get(key);
        if (!col.caseSensitive && text === key) w.text = text;
        w.sentences.push(s);
      }
    }
    return [...found.values()];
  }

  // The meanings nearest to id: by the meaning network when it is loaded,
  // otherwise by how often they share a sentence.
  function nearMeanings(id, k) {
    const shared = {};
    for (const row of window.TL_SENTENCES) {
      if (!row.m.includes(id)) continue;
      row.m.forEach((m) => m !== id && (shared[m] = (shared[m] || 0) + 1));
    }
    const isContent = (m) => {
      const u = T.meaning(m, window.TL_MEANINGS);
      return u && !u.grammar;
    };
    let list = [];
    if (state.net && state.net.has("m:" + id)) {
      list = state.net
        .nearest("m:" + id, k * 3, ["m:"])
        .map((n) => ({ id: n.key.slice(2), sim: n.sim }))
        .filter((n) => isContent(n.id));
    }
    if (list.length < k) {
      Object.keys(shared)
        .filter((m) => isContent(m) && !list.some((n) => n.id === m))
        .sort((a, b) => shared[b] - shared[a])
        .forEach((m) => list.push({ id: m, sim: null }));
    }
    return list.slice(0, k);
  }

  function svg(tag, attrs, text) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (text != null) el.textContent = text;
    return el;
  }

  async function showWeb(id) {
    const cols = await webColumns();
    const all = contentMeanings();
    const sel = $("webMeaning");
    if (!sel.options.length) {
      all.forEach((u) => sel.add(new Option(u.label, u.id)));
      sel.onchange = () => showWeb(sel.value);
    }
    if (id) web.id = id;
    if (!web.id || !all.some((u) => u.id === web.id)) {
      const first = state.sentences.find((s) => s.tokens.some((t) => t.units.some((u) => !u.grammar)));
      web.id = first ? first.tokens.flatMap((t) => t.units).find((u) => !u.grammar).id : all[0].id;
    }
    sel.value = web.id;
    const centre = T.meaning(web.id, window.TL_MEANINGS);
    // The open language goes first, at the top of the web.
    const branches = cols
      .map((c) => ({ col: c, words: wordsFor(c, web.id) }))
      .filter((b) => b.words.length)
      .sort((a, b) => (b.col.id === state.lang) - (a.col.id === state.lang));
    const near = nearMeanings(web.id, 4);
    drawWeb(centre, branches, near);
    $("webWords").innerHTML = "";
    $("webNote").textContent = branches.length
      ? "“" + centre.label + "” in " + branches.length + (branches.length === 1 ? " language" : " languages") + ". Choose a word to see its sentences, or a meaning around the edge to move to it."
      : "No language has a sentence with “" + centre.label + "” yet.";
  }

  function drawWeb(centre, branches, near) {
    const box = $("webGraph");
    const W = Math.max(300, box.clientWidth || 800);
    const narrow = W < 640;
    const n = branches.length;
    // Desk: words on an ellipse round the meaning. Phone: two columns of words
    // either side of it, so the text stays full size.
    let H, cx, cy, at;
    if (!narrow) {
      H = 560;
      cx = W / 2;
      cy = H / 2;
      const rx = Math.min(W / 2 - 110, 360), ry = 190;
      at = (i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(n, 1);
        return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
      };
    } else {
      const rows = Math.ceil(n / 2);
      H = Math.max(260, rows * 62 + 190);
      cx = W / 2;
      cy = H / 2;
      const top = 95 + 31, step = rows > 1 ? (H - 190 - 62) / (rows - 1) : 0;
      at = (i) => [i % 2 ? W * 0.8 : W * 0.2, rows > 1 ? top + Math.floor(i / 2) * step : cy];
    }
    const corners = narrow
      ? [[W * 0.25, 36], [W * 0.75, 36], [W * 0.25, H - 30], [W * 0.75, H - 30]]
      : [[90, 40], [W - 90, 40], [90, H - 34], [W - 90, H - 34]];
    const g = svg("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img", "aria-label": "Meaning web for " + centre.label });
    const lines = svg("g", { class: "lines" });
    const nodes = svg("g", {});
    g.append(lines, nodes);
    // Links between nearby meanings that are also close to each other.
    near.forEach((a, i) =>
      near.forEach((b, j) => {
        if (j <= i || !state.net) return;
        const s = state.net.sim("m:" + a.id, "m:" + b.id);
        if (s != null && s >= state.net.close) lines.append(svg("line", { x1: corners[i][0], y1: corners[i][1], x2: corners[j][0], y2: corners[j][1], class: "near" }));
      })
    );
    near.forEach((m, i) => {
      const [x, y] = corners[i];
      lines.append(svg("line", { x1: cx, y1: cy, x2: x, y2: y, class: "near" }));
      const u = T.meaning(m.id, window.TL_MEANINGS);
      const node = svg("g", { class: "node meaning", tabindex: "0", role: "button", "aria-label": "Move to " + u.label });
      node.append(svg("text", { x, y, "text-anchor": "middle", class: "m" }, u.label));
      if (m.sim != null) node.append(svg("text", { x, y: y + 15, "text-anchor": "middle", class: "sub" }, Math.round(Math.max(0, m.sim) * 100) + "% alike"));
      const go = () => showWeb(m.id);
      node.onclick = go;
      node.onkeydown = (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), go());
      nodes.append(node);
    });
    branches.forEach((b, i) => {
      const [x, y] = at(i);
      lines.append(svg("line", { x1: cx, y1: cy, x2: x, y2: y, class: "word" + (b.col.id === state.lang ? " here" : "") }));
      const w = b.words[0];
      const cjk = ["japanese", "chinese", "hangul"].includes(b.col.id);
      const node = svg("g", { class: "node word" + (b.col.id === state.lang ? " here" : ""), tabindex: "0", role: "button", "aria-label": b.col.name + ": " + b.words.map((x) => x.text).join(", ") });
      node.append(svg("text", { x, y: y - 14, "text-anchor": "middle", class: "lang" }, b.col.name));
      node.append(svg("text", { x, y: y + 6, "text-anchor": "middle", class: "w" + (cjk ? " cjk" : "") }, b.words.map((x) => x.text).slice(0, narrow ? 1 : 2).join(" · ") + (b.words.length > (narrow ? 1 : 2) ? " …" : "")));
      const reading = b.words[0].reading && b.words[0].reading !== w.text ? (b.col.id === "japanese" ? romaji(w.reading) : w.reading) : "";
      if (reading) node.append(svg("text", { x, y: y + 22, "text-anchor": "middle", class: "sub" }, reading));
      const go = () => showWebWords(b);
      node.onclick = go;
      node.onkeydown = (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), go());
      nodes.append(node);
    });
    const c = svg("g", { class: "node centre" });
    const r = Math.max(42, Math.min(80, centre.label.length * 5 + 26));
    c.append(svg("ellipse", { cx, cy, rx: r, ry: 30 }));
    c.append(svg("text", { x: cx, y: cy + 5, "text-anchor": "middle" }, centre.label));
    nodes.append(c);
    box.innerHTML = "";
    box.append(g);
  }

  function showWebWords(b) {
    let html = "<h3>" + esc(b.col.name) + "</h3>";
    for (const w of b.words) {
      html += '<p><b class="' + (["japanese", "chinese", "hangul"].includes(b.col.id) ? "target" : "") + '">' + esc(w.text) + "</b></p><ul>";
      for (const s of w.sentences) {
        const rtl = b.col.id === "arabic" || b.col.id === "hebrew" ? ' dir="rtl"' : "";
        html += "<li><span" + rtl + ">" + esc(T.join(s.tokens, s.sep, s.end)) + '</span> <span class="muted">' + esc(s.en) + "</span></li>";
      }
      html += "</ul>";
    }
    $("webWords").innerHTML = html;
  }

  // ---- Tabs ----

  function next(tab) {
    if (tab === "toEnglish") {
      const s = draw("e");
      if (s) showEnglish(s);
    } else if (tab === "toTarget") {
      const s = draw("t");
      if (s) showTarget(s);
    } else if (tab === "matrix") showMatrix();
    else if (tab === "web") showWeb();
    else if (tab === "words") showWords();
    stats();
  }

  function showTab(tab, redraw) {
    state.tab = tab;
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    ["toEnglish", "toTarget", "breakdown", "matrix", "web", "words"].forEach((id) => ($(id).hidden = id !== tab));
    if (redraw && tab === "toEnglish" && cur.toEnglish && $("enResult").hidden) return showEnglish(cur.toEnglish);
    if (redraw && tab === "toTarget" && cur.toTarget && $("tgResult").hidden) {
      $("tgResult").hidden = true;
      return drawTiles();
    }
    if (redraw && tab === "breakdown") return breakDown();
    if (tab === "breakdown") return;
    next(tab);
  }

  // ---- Wiring ----

  document.querySelectorAll("#tabs button").forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));
  $("enCheck").onclick = () => checkEnglish(false);
  $("enInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkEnglish(false);
  });
  $("enSkip").onclick = () => next("toEnglish");
  $("enHint").onclick = () => {
    $("enHintBox").innerHTML = pieces(cur.toEnglish);
    $("enHintBox").hidden = false;
  };
  $("tgCheck").onclick = () => checkTarget(false);
  $("tgClear").onclick = () => {
    cur.bank.forEach((b) => (b.used = false));
    cur.placed = [];
    drawTiles();
  };
  $("tgSkip").onclick = () => next("toTarget");
  $("bdGo").onclick = breakDown;
  $("webRandom").onclick = () => {
    const all = contentMeanings();
    showWeb(all[Math.floor(Math.random() * all.length)].id);
  };
  let webResize = null;
  window.addEventListener("resize", () => {
    if (state.tab !== "web") return;
    clearTimeout(webResize);
    webResize = setTimeout(() => showWeb(), 150);
  });
  $("wbFilter").onchange = drawBank;
  $("wbExport").onclick = exportWords;
  $("sentExport").onclick = exportSentences;
  $("wbSearch").oninput = drawBank;
  $("wpCheck").onclick = checkWord;
  $("wpInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkWord();
  });
  $("bdInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      breakDown();
    }
  });
  $("bdSample").onclick = () => {
    const s = state.sentences[Math.floor(Math.random() * state.sentences.length)];
    $("bdInput").value = sentenceText(s);
    breakDown();
  };

  (async () => {
    metas = (await LSD.all()).filter((m) => COLUMNS.includes(m.id));
    const start = LSD.param();
    LSD.picker($("langSelect"), metas, start, (id) => openLanguage(id), "Choose…");
    $("langGrid").innerHTML = "";
    for (const m of metas) {
      const col = await loadColumn(m.id).catch(() => null);
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.innerHTML = '<span class="big">' + esc(m.nativeName || m.name) + '</span><b>' + esc(m.name) + '</b><br><span class="sub">' + (col ? Object.keys(col.r).length + " sentences" : "") + "</span>";
      btn.onclick = () => {
        LSD.setParam(m.id);
        $("langSelect").value = m.id;
        openLanguage(m.id);
      };
      $("langGrid").appendChild(btn);
    }
    openLanguage(start);
  })();
})();
