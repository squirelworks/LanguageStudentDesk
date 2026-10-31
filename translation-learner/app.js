// Translation Learner: translate sentences from the meaning matrix, checking
// that every meaning is carried over and nothing is added (tokens.js).
(() => {
  const T = window.MeaningTokens;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // Languages with a column in the matrix. Names and ?lang= ids come from the
  // shared registry in languages/.
  const COLUMNS = ["japanese", "hangul", "chinese", "cyrillic", "hindi", "arabic", "klingon"];
  const ROMAJI = "../SquirrelGo-Apps/squirrelgo-phrasebook/www/js/romaji.js";
  // Vocabulary Learner decks widen the word list for breaking down sentences.
  // Rows are [word, reading, English, note], or [word, English, note] for Klingon.
  const DECKS = { hangul: true, chinese: true, cyrillic: true, hindi: true, arabic: true, klingon: false };

  // Languages with a word bank (data/wordbank/<id>.js, built by tools/build_network.py).
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
      await LSD.loadScript("../vocabulary-learner/decks/" + id + ".js");
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
    state.meta = await LSD.get(id);
    document.body.className = "lang-" + id;
    const name = state.meta ? state.meta.name : id;
    $("langHome").hidden = !!id && COLUMNS.includes(id);
    if (!id || !COLUMNS.includes(id)) {
      $("tabs").hidden = true;
      ["toEnglish", "toTarget", "breakdown", "matrix", "words"].forEach((s) => ($(s).hidden = true));
      $("title").textContent = "Translation Learner";
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
    $("title").innerHTML = "Translation Learner <small>" + esc(name) + (state.meta && state.meta.nativeName ? " · " + esc(state.meta.nativeName) : "") + "</small>";
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
    else if (r.honest) html += "Every meaning carried over, nothing added.";
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
    if (r.close) html += '<p class="small muted">A close word means nearly the same thing, by what the meaning network learned, but not exactly: ' + r.units.filter((u) => u.status === "close").map((u) => "“" + esc(u.matched[0]) + "” for " + esc(u.meaning.label)).join(", ") + ".</p>";
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

  async function showMatrix() {
    const cols = [];
    for (const id of COLUMNS) {
      try {
        const col = await loadColumn(id);
        const m = metas.find((x) => x.id === id);
        cols.push({ id, name: m ? m.name : id, col, built: T.build(matrix(), col).sentences });
      } catch (e) {
        /* a missing column is left out */
      }
    }
    const rows = window.TL_SENTENCES.filter((s) => !state.pack || s.pack === state.pack);
    let html = '<table class="matrix"><thead><tr><th>Meaning</th>' + cols.map((c) => "<th" + (c.id === state.lang ? ' class="here"' : "") + ">" + esc(c.name) + "</th>").join("") + "</tr></thead><tbody>";
    for (const row of rows) {
      html += "<tr><td><b>" + esc(row.en) + '</b><br><span class="small muted">' + row.m.map((m) => esc(T.meaning(m, window.TL_MEANINGS).label)).join(" · ") + "</span></td>";
      for (const c of cols) {
        const s = c.built.find((x) => x.id === row.id);
        if (!s) {
          html += '<td class="gap' + (c.id === state.lang ? " here" : "") + '"></td>';
          continue;
        }
        const tip = s.tokens.map((t) => T.bare(t.text) + " = " + t.units.map(unitLabel).join(" + ")).concat(s.implied.map((u) => "(" + u.label + ": implied)")).join("\n");
        const rtl = c.id === "arabic" ? ' dir="rtl"' : "";
        const face = ["japanese", "chinese", "hangul"].includes(c.id) ? "target" : "target plain";
        html += '<td class="' + face + (c.id === state.lang ? " here" : "") + '" title="' + esc(tip) + '"' + rtl + ">" + esc(T.join(s.tokens, s.sep, s.end)) + "</td>";
      }
      html += "</tr>";
    }
    html += "</tbody><tfoot><tr><td class='small muted'>" + rows.length + " sentences</td>" + cols.map((c) => "<td class='small muted'>" + c.built.filter((s) => rows.some((r) => r.id === s.id)).length + "</td>").join("") + "</tr></tfoot></table>";
    $("matrixTable").innerHTML = html;
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

  function drawBank() {
    const filter = $("wbFilter").value;
    const q = $("wbSearch").value.trim().toLowerCase();
    const list = $("wbList");
    list.innerHTML = "";
    list.dir = state.meta && state.meta.direction === "rtl" ? "rtl" : "ltr";
    for (const w of state.bank) {
      if (filter === "known" && !w.english) continue;
      if (filter === "unknown" && w.english) continue;
      if (q && !w.word.includes(q) && !w.english.toLowerCase().includes(q)) continue;
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
    if (said.some((x) => want.has(x.stem))) {
      verdict = "ok";
      text = "Right.";
    } else if (state.net) {
      const key = state.lang + ":" + (state.net.has(state.lang + ":" + w.word) ? w.word : w.base);
      const best = Math.max(...said.map((x) => {
        const n = state.net.english(x.word);
        const s = n == null ? null : state.net.sim(n, key);
        return s == null ? -1 : s;
      }));
      if (best >= state.net.close) {
        verdict = "close";
        text = "Close: the meaning network puts your word next to it.";
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

  // ---- Tabs ----

  function next(tab) {
    if (tab === "toEnglish") {
      const s = draw("e");
      if (s) showEnglish(s);
    } else if (tab === "toTarget") {
      const s = draw("t");
      if (s) showTarget(s);
    } else if (tab === "matrix") showMatrix();
    else if (tab === "words") showWords();
    stats();
  }

  function showTab(tab, redraw) {
    state.tab = tab;
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    ["toEnglish", "toTarget", "breakdown", "matrix", "words"].forEach((id) => ($(id).hidden = id !== tab));
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
  $("wbFilter").onchange = drawBank;
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
