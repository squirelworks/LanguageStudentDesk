// SquirrelGo Dictionary UI: search, entry details, kanji, radical lookup,
// kana chart, word lists, history and notepad. Plain DOM, no framework.
(() => {
  const app = document.getElementById("app");
  const STORE_KEY = "squirrelgo-dictionary.v1";
  const stack = [];
  const PAGE = 50;
  let lastQuery = "";
  let loadState = { loaded: 0, total: 0, error: null };

  // ---------- storage ----------
  const state = (() => {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { s = {}; }
    s.lists = s.lists || { Favorites: [] };
    s.history = s.history || [];
    s.notepad = s.notepad || "";
    s.textScale = s.textScale || 1;
    s.romaji = s.romaji !== false;
    s.filters = s.filters || { common: false, type: "" };
    return s;
  })();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content;
  };
  const tagName = (t) => (Data.meta && Data.meta.tags[t]) || t;
  const head = (row) => row.kanji[0] || row.kana[0];
  function toast(msg) {
    const el = h(`<div class="toast">${esc(msg)}</div>`).firstChild;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
  function copy(text) {
    const done = () => toast("Copied");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text));
    else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Copied"); } catch (e) { toast("Copy failed"); }
    ta.remove();
  }
  function speakBtn(text) {
    return `<button class="speak" data-speak="${esc(text)}" title="Listen" aria-label="Listen">🔊</button>`;
  }

  // ---------- navigation ----------
  function go(view, arg, replace) {
    if (replace) stack.pop();
    stack.push({ view, arg, scroll: 0 });
    render();
  }
  function back() {
    if (stack.length > 1) {
      stack.pop();
      render(true);
    }
  }

  function shell(title, sub, body, opts = {}) {
    const top = stack.length > 1;
    app.innerHTML = "";
    app.appendChild(h(`
      <header class="topbar">
        <button id="backBtn" class="back-btn ${top ? "" : "hidden"}" aria-label="Back">‹</button>
        <h1>${title}${sub ? `<span class="sub">${sub}</span>` : ""}</h1>
        ${opts.action || ""}
      </header>
      <main>${body}</main>`));
    document.getElementById("backBtn").onclick = back;
  }

  function render(restore) {
    const cur = stack[stack.length - 1];
    document.documentElement.style.fontSize = 16 * state.textScale + "px";
    VIEWS[cur.view](cur.arg);
    window.scrollTo(0, restore ? cur.scroll : 0);
  }
  window.addEventListener("scroll", () => {
    if (stack.length) stack[stack.length - 1].scroll = window.scrollY;
  }, { passive: true });

  // Delegated clicks for links rendered as data attributes.
  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-speak],[data-entry],[data-kanji],[data-go],[data-q]");
    if (!t) return;
    if (t.dataset.speak) {
      if (!Speech.speak(t.dataset.speak)) toast("No Japanese voice available");
    } else if (t.dataset.entry) go("entry", +t.dataset.entry);
    else if (t.dataset.kanji) go("kanji", t.dataset.kanji);
    else if (t.dataset.go) go(t.dataset.go, t.dataset.arg);
    else if (t.dataset.q !== undefined) {
      lastQuery = t.dataset.q;
      stack.length = 1;
      render();
    }
  });

  // ---------- result list ----------
  function resultItem(pos, note) {
    const r = Data.row(pos);
    const hw = head(r);
    const reading = r.kanji.length ? r.kana[0] : "";
    const gloss = r.senses.slice(0, 3).map((s, i) => (r.senses.length > 1 ? `<b>${i + 1}</b> ` : "") + esc(s)).join(" ");
    return `<li class="result" data-entry="${pos}">
      <div class="hw"><span lang="ja" class="word">${esc(hw)}</span>
        ${reading ? `<span lang="ja" class="reading">${esc(reading)}</span>` : ""}
        ${state.romaji ? `<span class="romaji">${esc(Kana.toRomaji(r.kana[0]))}</span>` : ""}
        ${r.common ? `<span class="badge">common</span>` : ""}</div>
      ${note ? `<div class="note">${esc(note)}</div>` : ""}
      <div class="gloss">${gloss}</div>
    </li>`;
  }

  // ---------- views ----------
  const VIEWS = {
    home() {
      const m = Data.meta;
      const loading = !Data.ready;
      const sub = loadState.error ? "Data missing" : loading ? `Loading dictionary… ${loadState.total ? Math.round(loadState.loaded * 100 / loadState.total) : 0}%` : `${m.words.toLocaleString()} words · JMdict ${m.jmdictDate}`;
      shell("SquirrelGo Dictionary", sub, `
        <form class="searchbar" autocomplete="off">
          <input id="q" class="search" type="search" lang="ja" enterkeyhint="search"
            placeholder="English, rōmaji, かな or 漢字" value="${esc(lastQuery)}">
          <button type="button" id="clearQ" class="clear" aria-label="Clear">×</button>
        </form>
        <div class="filters">
          <button type="button" class="fchip ${state.filters.common ? "on" : ""}" id="fCommon">Common only</button>
          <select id="fType" class="fchip ${state.filters.type ? "on" : ""}" aria-label="Word type">
            ${[["", "All types"], ["noun", "Nouns"], ["verb", "Verbs"], ["adj", "Adjectives"], ["adv", "Adverbs"], ["exp", "Expressions"]]
              .map(([v, l]) => `<option value="${v}" ${state.filters.type === v ? "selected" : ""}>${l}</option>`).join("")}
          </select>
        </div>
        <div id="results"></div>`, {
        action: `<button class="icon-btn" data-go="menu" aria-label="Menu">☰</button>`,
      });
      const input = document.getElementById("q");
      const out = document.getElementById("results");
      let timer = 0;
      const run = () => {
        lastQuery = input.value;
        if (loadState.error) {
          out.innerHTML = `<div class="empty">${esc(loadState.error)}</div>`;
          return;
        }
        if (!lastQuery.trim()) {
          out.innerHTML = homeLinks();
          return;
        }
        const { results, kana, total } = Search.search(lastQuery, state.filters);
        const partial = Data.ready ? "" : `<p class="muted">Still loading — results so far.</p>`;
        const filtered = state.filters.common || state.filters.type;
        out.innerHTML = partial + (kana ? `<p class="muted">Also searched <span lang="ja">${esc(kana)}</span></p>` : "") +
          (results.length ? `<p class="muted count">${total.toLocaleString()} match${total === 1 ? "" : "es"}${total > results.length ? `, showing the best ${results.length}` : ""}</p><ul class="results" id="resultList"></ul>`
            : `<div class="empty">No matches for “${esc(lastQuery)}”${filtered ? " with these filters" : ""}.</div>`);
        // Pages of 50, up to the 1000 the search returns.
        let shown = 0;
        const list = document.getElementById("resultList");
        const more = () => {
          list.insertAdjacentHTML("beforeend", results.slice(shown, shown + PAGE).map((r) => resultItem(r.pos, r.note)).join(""));
          shown = Math.min(results.length, shown + PAGE);
          const btn = document.getElementById("moreBtn");
          if (btn) btn.remove();
          if (shown < results.length) {
            list.insertAdjacentHTML("afterend", `<button class="btn wide" id="moreBtn">Show more (${shown} of ${results.length})</button>`);
            document.getElementById("moreBtn").onclick = more;
          }
        };
        if (list) more();
      };
      document.getElementById("fCommon").onclick = (e) => {
        state.filters.common = !state.filters.common;
        e.target.classList.toggle("on", state.filters.common);
        save();
        run();
      };
      document.getElementById("fType").onchange = (e) => {
        state.filters.type = e.target.value;
        e.target.classList.toggle("on", !!e.target.value);
        save();
        run();
      };
      input.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(run, 220);
      });
      input.form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearTimeout(timer);
        run();
        input.blur();
      });
      document.getElementById("clearQ").onclick = () => {
        input.value = "";
        run();
        input.focus();
      };
      run();
      VIEWS.home.refresh = run;
    },

    menu() {
      shell("Menu", "", `
        <ul class="menu">
          <li data-go="radicals">部 <span>Kanji by radicals</span></li>
          <li data-go="kana">あ <span>Kana chart</span></li>
          <li data-go="lists">★ <span>Word lists</span></li>
          <li data-go="history">↺ <span>History</span></li>
          <li data-go="notepad">✎ <span>Notepad</span></li>
          <li data-go="settings">⚙ <span>Settings</span></li>
          <li data-go="about">ⓘ <span>About &amp; licenses</span></li>
        </ul>`);
    },

    async entry(pos) {
      shell("Entry", "", `<div class="empty">Loading…</div>`);
      const e = await Data.entry(pos);
      if (stack[stack.length - 1].arg !== pos) return;
      addHistory(e);
      const hw = head(e);
      const ktags = e.kt || {}, rtags = e.rt || {};
      const common = new Set(e.c || []);
      const tagChips = (list) => (list || []).map((t) => `<span class="tag" title="${esc(tagName(t))}">${esc(tagName(t))}</span>`).join("");
      const kanjiForms = e.kanji.map((k) => `<span lang="ja" class="form ${common.has(k) ? "common" : ""}">${esc(k)}${tagChips(ktags[k])}</span>`).join("");
      const kanaForms = e.kana.map((k) => `<span lang="ja" class="form ${common.has(k) ? "common" : ""}">${esc(k)}${e.ra && e.ra[k] ? `<span class="tag">only ${esc(e.ra[k].join(", "))}</span>` : ""}${tagChips(rtags[k])}</span>`).join("");
      let lastPos = "";
      const senses = e.s.map((s, i) => {
        const pos = (s.p || []).map(tagName).join("; ");
        const posLine = pos && pos !== lastPos ? `<div class="pos">${esc(pos)}</div>` : "";
        if (pos) lastPos = pos;
        const extra = [].concat(s.m || [], s.f || [], s.d || []).map(tagName);
        const limits = [].concat(s.sk || [], s.sr || []);
        const xref = (label, list) => list ? `<div class="xref">${label} ${list.map((r) => `<a data-q="${esc(r.split("・")[0])}" lang="ja">${esc(r)}</a>`).join(", ")}</div>` : "";
        return `${posLine}<li><span class="gl">${esc(s.g.join("; "))}</span>
          ${extra.length ? `<span class="meta">${esc(extra.join(", "))}</span>` : ""}
          ${limits.length ? `<span class="meta">only for <span lang="ja">${esc(limits.join(", "))}</span></span>` : ""}
          ${s.i ? `<div class="info">${esc(s.i.join("; "))}</div>` : ""}
          ${s.l ? `<div class="info">From ${esc(s.l.join(", "))}</div>` : ""}
          ${xref("See also", s.r)}${xref("Antonym", s.a)}</li>`;
      }).join("");
      const shownKanji = e.kanji.filter((k) => !(ktags[k] || []).includes("sK"));
      const kanjiChars = [...new Set([...shownKanji.join("")].filter(Kana.isKanji))];
      const examples = (e.x || []).map(([jp, en]) => `<li><div lang="ja" class="jp">${esc(jp)} ${speakBtn(jp)}</div><div class="en">${esc(en)}</div></li>`).join("");
      const inLists = Object.keys(state.lists).filter((n) => state.lists[n].some((w) => w.id === e.id));
      shell(esc(hw), e.kanji.length ? `<span lang="ja">${esc(e.kana[0])}</span>` : "", `
        <section class="card entry">
          <div class="big"><span lang="ja">${esc(hw)}</span> ${speakBtn(e.kana[0])}</div>
          ${e.kanji.length ? `<div class="reading-big" lang="ja">${esc(e.kana.join("、"))}</div>` : ""}
          ${state.romaji ? `<div class="romaji">${esc(e.kana.map(Kana.toRomaji).join(", "))}</div>` : ""}
          <div class="actions">
            <button id="star" class="btn ${inLists.length ? "on" : ""}">${inLists.length ? "★ In " + esc(inLists.join(", ")) : "☆ Add to list"}</button>
            <button id="copy" class="btn">Copy</button>
          </div>
        </section>
        <h2>Meanings</h2>
        <ol class="senses card">${senses}</ol>
        ${e.kanji.length > 1 || e.kana.length > 1 ? `<h2>Other forms</h2><div class="card forms">${kanjiForms}${kanaForms}</div>` : ""}
        ${kanjiChars.length ? `<h2>Kanji</h2><div class="kanji-chips">${kanjiChars.map((k) => `<button class="kchip" data-kanji="${esc(k)}" lang="ja">${esc(k)}</button>`).join("")}</div>` : ""}
        ${examples ? `<h2>Examples</h2><ul class="card examples">${examples}</ul><p class="muted small">Example sentences from the Tatoeba project.</p>` : ""}
        <p class="muted small">JMdict entry ${esc(e.id)}</p>`);
      document.getElementById("copy").onclick = () => copy(`${hw}${e.kanji.length ? " [" + e.kana[0] + "]" : ""} — ${e.s.map((s) => s.g.join("; ")).join(" / ")}`);
      document.getElementById("star").onclick = () => pickList(e);
    },

    async kanji(ch) {
      shell(esc(ch), "Kanji", `<div class="empty">Loading…</div>`);
      const all = await Data.loadKanji();
      if (stack[stack.length - 1].arg !== ch) return;
      const k = all[ch];
      const words = Search.wordsWithKanji(ch, 30);
      if (!k) {
        shell(esc(ch), "Kanji", `<div class="card"><div class="kanji-big" lang="ja">${esc(ch)}</div><p class="muted">Not in KANJIDIC2.</p></div>`);
        return;
      }
      const row = (label, val) => val ? `<tr><th>${label}</th><td>${val}</td></tr>` : "";
      const parts = k.p ? [...k.p].map((p) => `<button class="kchip small" data-go="radicals" data-arg="${esc(p)}" lang="ja">${esc(p)}</button>`).join("") : "";
      shell(esc(ch), (k.m || []).slice(0, 3).join(", "), `
        <section class="card kanji-card">
          <div class="kanji-big" lang="ja">${esc(ch)}</div>
          <div class="meanings">${esc((k.m || []).join(", "))}</div>
        </section>
        <table class="card facts">
          ${row("On", k.on ? `<span lang="ja">${esc(k.on.join("、"))}</span>` : "")}
          ${row("Kun", k.kun ? `<span lang="ja">${esc(k.kun.join("、"))}</span>` : "")}
          ${row("Nanori", k.n ? `<span lang="ja">${esc(k.n.join("、"))}</span>` : "")}
          ${row("Strokes", k.s)}
          ${row("Radical", k.r ? "#" + k.r : "")}
          ${row("Grade", k.g ? (k.g <= 6 ? "Kyōiku " + k.g : k.g === 8 ? "Jōyō (secondary)" : "Jinmeiyō") : "")}
          ${row("JLPT (old)", k.j ? "N" + k.j : "")}
          ${row("Frequency", k.f ? "#" + k.f + " of 2,500" : "")}
          ${row("SKIP", k.sk ? esc(k.sk) : "")}
          ${row("Heisig", k.h ? esc(k.h) : "")}
        </table>
        ${parts ? `<h2>Components</h2><div class="kanji-chips">${parts}</div>` : ""}
        <h2>Words</h2>
        <ul class="results">${words.map((p) => resultItem(p)).join("")}</ul>
        <button class="btn wide" data-q="*${esc(ch)}*">Search all words with ${esc(ch)}</button>`);
    },

    async radicals(preset) {
      shell("Radicals", "Tap parts to find a kanji", `<div class="empty">Loading…</div>`);
      const rads = await Data.loadRadicals();
      const kanji = Data.kanji;
      const picked = new Set(preset && rads.some((r) => r[0] === preset) ? [preset] : []);
      const draw = () => {
        let matches = null;
        for (const r of picked) {
          const set = new Set(rads.find((x) => x[0] === r)[2]);
          matches = matches ? new Set([...matches].filter((c) => set.has(c))) : set;
        }
        const list = matches ? [...matches].sort((a, b) => ((kanji[a] || {}).s || 99) - ((kanji[b] || {}).s || 99)) : [];
        const possible = matches ? new Set(rads.filter((r) => !picked.has(r[0]) && list.some((c) => r[2].includes(c))).map((r) => r[0])) : null;
        let lastStroke = 0;
        const grid = rads.map(([r, s]) => {
          const label = s !== lastStroke ? `<span class="stroke">${(lastStroke = s)}</span>` : "";
          const cls = picked.has(r) ? "on" : possible && !possible.has(r) ? "off" : "";
          return `${label}<button class="rad ${cls}" data-rad="${esc(r)}" lang="ja">${esc(r)}</button>`;
        }).join("");
        let lastK = 0;
        const res = list.slice(0, 300).map((c) => {
          const s = (kanji[c] || {}).s || 0;
          const label = s !== lastK ? `<span class="stroke">${(lastK = s)}</span>` : "";
          return `${label}<button class="kchip" data-kanji="${esc(c)}" lang="ja">${esc(c)}</button>`;
        }).join("");
        const main = document.querySelector("main");
        main.innerHTML = `
          <div class="rad-results card">${picked.size ? (list.length ? res : `<span class="muted">No kanji have all of these parts.</span>`) + (list.length > 300 ? `<span class="muted">+${list.length - 300} more</span>` : "") : `<span class="muted">Pick one or more parts below.</span>`}
            ${picked.size ? `<button class="btn small" id="resetRad">Clear</button>` : ""}</div>
          <div class="rad-grid">${grid}</div>`;
        main.querySelectorAll("[data-rad]").forEach((b) => b.onclick = () => {
          const r = b.dataset.rad;
          if (picked.has(r)) picked.delete(r);
          else if (!b.classList.contains("off")) picked.add(r);
          draw();
        });
        const reset = document.getElementById("resetRad");
        if (reset) reset.onclick = () => { picked.clear(); draw(); };
      };
      draw();
    },

    kana() {
      const rows = ["あいうえお", "かきくけこ", "さしすせそ", "たちつてと", "なにぬねの", "はひふへほ", "まみむめも", "や　ゆ　よ", "らりるれろ", "わ　　　を", "ん　　　　",
        "がぎぐげご", "ざじずぜぞ", "だぢづでど", "ばびぶべぼ", "ぱぴぷぺぽ"];
      const yoon = ["きゃきゅきょ", "しゃしゅしょ", "ちゃちゅちょ", "にゃにゅにょ", "ひゃひゅひょ", "みゃみゅみょ", "りゃりゅりょ", "ぎゃぎゅぎょ", "じゃじゅじょ", "びゃびゅびょ", "ぴゃぴゅぴょ"];
      const table = (kata) => `<div class="kana-grid">${rows.map((r) => [...r].map((c) => c === "　" ? `<span></span>` :
        `<button class="kana" data-speak="${c}"><span lang="ja">${kata ? Kana.hiraToKata(c) : c}</span><small>${Kana.toRomaji(c)}</small></button>`).join("")).join("")}</div>
        <div class="kana-grid three">${yoon.map((r) => r.match(/../g).map((c) =>
        `<button class="kana" data-speak="${c}"><span lang="ja">${kata ? Kana.hiraToKata(c) : c}</span><small>${Kana.toRomaji(c)}</small></button>`).join("")).join("")}</div>`;
      shell("Kana", "Tap to listen", `
        <div class="tabs"><button class="tab on" data-k="0">Hiragana</button><button class="tab" data-k="1">Katakana</button></div>
        <div id="kanaBody">${table(false)}</div>`);
      document.querySelectorAll(".tab").forEach((t) => t.onclick = () => {
        document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x === t));
        document.getElementById("kanaBody").innerHTML = table(t.dataset.k === "1");
      });
    },

    lists() {
      const names = Object.keys(state.lists);
      shell("Word lists", "", `
        <ul class="menu">${names.map((n) => `<li data-go="list" data-arg="${esc(n)}">★ <span>${esc(n)}</span><em>${state.lists[n].length}</em></li>`).join("")}</ul>
        <button class="btn wide" id="newList">+ New list</button>`);
      document.getElementById("newList").onclick = () => {
        const name = (prompt("Name for the new list") || "").trim();
        if (!name || state.lists[name]) return;
        state.lists[name] = [];
        save();
        render();
      };
    },

    list(name) {
      const items = state.lists[name] || [];
      shell("★ " + esc(name), `${items.length} words`, `
        ${items.length ? `<ul class="results">${items.map((w, i) => `<li class="result" data-id="${esc(w.id)}">
          <div class="hw"><span lang="ja" class="word">${esc(w.head)}</span>${w.head !== w.kana ? `<span lang="ja" class="reading">${esc(w.kana)}</span>` : ""}
          <button class="remove" data-i="${i}" aria-label="Remove">✕</button></div>
          <div class="gloss">${esc(w.gloss)}</div></li>`).join("")}</ul>` : `<div class="empty">No words yet. Use “Add to list” on any entry.</div>`}
        <div class="actions">
          ${items.length ? `<button class="btn" id="export">Export CSV (Anki)</button>` : ""}
          ${Object.keys(state.lists).length > 1 ? `<select class="btn" id="mergeFrom"><option value="">Merge in another list…</option>${Object.keys(state.lists).filter((n) => n !== name).map((n) => `<option>${esc(n)}</option>`).join("")}</select>` : ""}
          <button class="btn" id="renameList">Rename</button>
          ${name !== "Favorites" ? `<button class="btn danger" id="delList">Delete list</button>` : ""}
        </div>`);
      document.querySelectorAll(".result[data-id]").forEach((li) => li.onclick = (ev) => {
        if (ev.target.closest(".remove")) {
          items.splice(+ev.target.closest(".remove").dataset.i, 1);
          save();
          render();
          return;
        }
        const pos = Data.posOfId(li.dataset.id);
        if (pos === undefined) toast(Data.ready ? "Word not in this dictionary version" : "Still loading…");
        else go("entry", pos);
      });
      const merge = document.getElementById("mergeFrom");
      if (merge) merge.onchange = () => {
        const from = merge.value;
        if (!from) return;
        const have = new Set(items.map((w) => w.id));
        const added = state.lists[from].filter((w) => !have.has(w.id));
        items.push(...added);
        if (confirm(`Added ${added.length} words from “${from}”. Delete “${from}” now?`)) delete state.lists[from];
        save();
        render();
      };
      document.getElementById("renameList").onclick = () => {
        const to = (prompt("New name", name) || "").trim();
        if (!to || to === name || state.lists[to]) return;
        const renamed = {};
        for (const [n, l] of Object.entries(state.lists)) renamed[n === name ? to : n] = l;
        state.lists = renamed;
        save();
        go("list", to, true);
      };
      const ex = document.getElementById("export");
      if (ex) ex.onclick = () => exportCsv(name, items);
      const del = document.getElementById("delList");
      if (del) del.onclick = () => {
        if (!confirm(`Delete the list “${name}”?`)) return;
        delete state.lists[name];
        save();
        back();
      };
    },

    history() {
      shell("History", `${state.history.length} entries`, state.history.length ? `
        <ul class="results">${state.history.map((w) => `<li class="result" data-id="${esc(w.id)}"><div class="hw"><span lang="ja" class="word">${esc(w.head)}</span>${w.head !== w.kana ? `<span lang="ja" class="reading">${esc(w.kana)}</span>` : ""}</div><div class="gloss">${esc(w.gloss)}</div></li>`).join("")}</ul>
        <button class="btn wide danger" id="clearHist">Clear history</button>` : `<div class="empty">Nothing viewed yet.</div>`);
      document.querySelectorAll(".result[data-id]").forEach((li) => li.onclick = () => {
        const pos = Data.posOfId(li.dataset.id);
        if (pos !== undefined) go("entry", pos);
      });
      const c = document.getElementById("clearHist");
      if (c) c.onclick = () => { state.history = []; save(); render(); };
    },

    notepad() {
      shell("Notepad", "Saved automatically", `
        <textarea id="pad" class="pad" lang="ja" placeholder="Paste Japanese text here, then select a word and tap Look up.">${esc(state.notepad)}</textarea>
        <div class="actions"><button class="btn" id="lookup">Look up selection</button><button class="btn" id="copyPad">Copy all</button></div>`);
      const pad = document.getElementById("pad");
      pad.addEventListener("input", () => { state.notepad = pad.value; save(); });
      document.getElementById("copyPad").onclick = () => copy(pad.value);
      document.getElementById("lookup").onclick = () => {
        const sel = pad.value.slice(pad.selectionStart, pad.selectionEnd).trim();
        if (!sel) { toast("Select some text first"); return; }
        lastQuery = sel;
        stack.length = 1;
        render();
      };
    },

    settings() {
      shell("Settings", "", `
        <div class="card setting"><label>Text size</label>
          <div class="seg">${[0.9, 1, 1.15, 1.3].map((s) => `<button class="btn ${state.textScale === s ? "on" : ""}" data-scale="${s}">${Math.round(s * 100)}%</button>`).join("")}</div></div>
        <div class="card setting"><label><input type="checkbox" id="romaji" ${state.romaji ? "checked" : ""}> Show rōmaji under readings</label></div>`);
      document.querySelectorAll("[data-scale]").forEach((b) => b.onclick = () => { state.textScale = +b.dataset.scale; save(); render(); });
      document.getElementById("romaji").onchange = (e) => { state.romaji = e.target.checked; save(); };
    },

    about() {
      const m = Data.meta || {};
      shell("About", "", `
        <section class="card prose">
          <p><b>SquirrelGo Dictionary</b> is an offline Japanese–English dictionary in the spirit of the old JED app. Everything is on the device; it never needs a server.</p>
          <p>Search by English, rōmaji, kana or kanji. Conjugated verbs and adjectives (食べた, 高くない) are traced back to the dictionary form. Use <code>*</code> and <code>?</code> as wildcards (<span lang="ja">*学</span>).</p>
          <p class="muted">Data: JMdict ${esc(m.jmdictDate || "?")} (${(m.words || 0).toLocaleString()} entries), KANJIDIC2 ${esc(m.kanjidicDate || "?")} (${(m.kanjiCount || 0).toLocaleString()} kanji), converted by jmdict-simplified ${esc(m.version || "")}.</p>
        </section>
        <h2>Acknowledgements</h2>
        <section class="card prose small">
          <p>This software uses the <b>JMdict</b>, <b>KANJIDIC2</b>, <b>RADKFILE</b> and <b>KRADFILE</b> files. These files are the property of the Electronic Dictionaries Research and Development Group, and are used in conformance with the Group's licence (Creative Commons Attribution-ShareAlike 4.0). See edrdg.org/edrdg/licence.html.</p>
          <p>Example sentences come from the <b>Tatoeba</b> project (tatoeba.org), licensed CC BY 2.0 FR.</p>
          <p>JSON conversion by <b>jmdict-simplified</b> (github.com/scriptin/jmdict-simplified).</p>
          <p>Not affiliated with umibouzu or the original JED app; this is a new, independent implementation.</p>
        </section>`);
    },
  };

  function homeLinks() {
    const recent = state.history.slice(0, 8);
    return `
      <div class="quick">
        <button class="qbtn" data-go="radicals"><span lang="ja">部</span>Radicals</button>
        <button class="qbtn" data-go="kana"><span lang="ja">あ</span>Kana</button>
        <button class="qbtn" data-go="lists"><span>★</span>Lists</button>
        <button class="qbtn" data-go="notepad"><span>✎</span>Notepad</button>
      </div>
      ${recent.length ? `<h2>Recently viewed</h2><div class="recent">${recent.map((w) => `<button class="chip" data-id="${esc(w.id)}" lang="ja">${esc(w.head)}</button>`).join("")}</div>` : ""}
      <p class="muted hint">Try <a data-q="neko">neko</a>, <a data-q="食べました">食べました</a>, <a data-q="library">library</a> or <a data-q="*語">*語</a>.</p>`;
  }
  document.addEventListener("click", (ev) => {
    const chip = ev.target.closest(".recent [data-id]");
    if (!chip) return;
    const pos = Data.posOfId(chip.dataset.id);
    if (pos !== undefined) go("entry", pos);
  });

  function snapshot(e) {
    return { id: e.id, head: head(e), kana: e.kana[0], gloss: e.s.slice(0, 3).map((s) => s.g.join("; ")).join(" / ") };
  }

  function addHistory(e) {
    state.history = [snapshot(e)].concat(state.history.filter((w) => w.id !== e.id)).slice(0, 100);
    save();
  }

  function pickList(e) {
    const names = Object.keys(state.lists);
    const overlay = h(`<div class="sheet-bg"><div class="sheet">
      <h3>Add <span lang="ja">${esc(head(e))}</span> to…</h3>
      ${names.map((n) => `<label class="check"><input type="checkbox" value="${esc(n)}" ${state.lists[n].some((w) => w.id === e.id) ? "checked" : ""}> ${esc(n)}</label>`).join("")}
      <div class="actions"><button class="btn" data-new>+ New list</button><button class="btn primary" data-done>Done</button></div>
    </div></div>`).firstChild;
    document.body.appendChild(overlay);
    const close = () => {
      overlay.querySelectorAll("input[type=checkbox]").forEach((c) => {
        const list = state.lists[c.value];
        const has = list.some((w) => w.id === e.id);
        if (c.checked && !has) list.unshift(snapshot(e));
        if (!c.checked && has) state.lists[c.value] = list.filter((w) => w.id !== e.id);
      });
      save();
      overlay.remove();
      render(true);
    };
    overlay.querySelector("[data-done]").onclick = close;
    overlay.addEventListener("click", (ev) => { if (ev.target === overlay) close(); });
    overlay.querySelector("[data-new]").onclick = () => {
      const name = (prompt("Name for the new list") || "").trim();
      if (!name || state.lists[name]) return;
      state.lists[name] = [snapshot(e)];
      save();
      overlay.remove();
      render(true);
    };
  }

  function exportCsv(name, items) {
    const cell = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const csv = items.map((w) => [w.head, w.kana, w.gloss].map(cell).join(",")).join("\n") + "\n";
    const file = name.replace(/[^\w-]+/g, "_") + ".csv";
    if (window.AndroidTTS && window.AndroidTTS.saveFile) {
      window.AndroidTTS.saveFile(file, csv);
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = file;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ---------- start ----------
  stack.push({ view: "home", scroll: 0 });
  render();
  Data.init((loaded, total) => {
    loadState = { loaded, total, error: null };
    const sub = document.querySelector(".topbar .sub");
    const cur = stack[stack.length - 1];
    if (cur.view === "home" && sub) {
      sub.textContent = loaded < total ? `Loading dictionary… ${Math.round(loaded * 100 / total)}%` : `${Data.meta.words.toLocaleString()} words · JMdict ${Data.meta.jmdictDate}`;
      // Re-run a typed query when the first shard (common words) and the last arrive.
      if ((loaded === 1 || loaded === total) && lastQuery.trim() && VIEWS.home.refresh) VIEWS.home.refresh();
    }
  }).catch(() => {
    loadState.error = "Dictionary data is missing. Run tools/fetch_data.sh to download it (see README).";
    if (stack[stack.length - 1].view === "home") render();
  });

  window.SquirrelDict = { back };
})();
