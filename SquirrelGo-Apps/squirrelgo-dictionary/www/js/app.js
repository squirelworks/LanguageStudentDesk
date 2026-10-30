// SquirrelGo Dictionary UI, laid out after the original JED app: grey
// gradient title bar with a search field, black list screens, a sectioned
// menu, search options popup, long-press context menus, tag lists and a
// notepad drawer. Plain DOM, no framework.
(() => {
  const app = document.getElementById("app");
  const STORE_KEY = "squirrelgo-dictionary.v1";
  const PAGE = 50;
  const stack = [];
  const overlays = []; // open dialogs / drawers, closed first by Back

  // ---------- storage ----------
  const state = (() => {
    let s = {};
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { s = {}; }
    s.lists = s.lists || { Favorites: [] };
    s.history = s.history || [];
    s.notepad = s.notepad || "";
    s.textScale = s.textScale || 1;
    s.romaji = s.romaji === true;
    s.options = Object.assign({ field: "both", common: false, chars: { hira: true, kata: true, kanji: true, latin: true } }, s.options);
    delete s.filters;
    return s;
  })();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage full or blocked */ }
  }

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const frag = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content;
  };
  const tagName = (t) => (Data.meta && Data.meta.tags[t]) || t;
  const head = (row) => row.kanji[0] || row.kana[0];
  const num = (n) => Number(n).toLocaleString();
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function toast(msg) {
    const el = frag(`<div class="toast">${esc(msg)}</div>`).firstChild;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
  function copy(text) {
    const done = () => toast("Copied to clipboard");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text));
    else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Copied to clipboard"); } catch (e) { toast("Copy failed"); }
    ta.remove();
  }
  function speak(text) {
    if (!Speech.speak(text)) toast("No Japanese voice installed");
  }

  // Long press (and right click) → handler(ev); a plain tap still clicks.
  function onLongPress(el, handler) {
    let timer = 0;
    let fired = false;
    const clear = () => clearTimeout(timer);
    el.addEventListener("pointerdown", (ev) => {
      fired = false;
      timer = setTimeout(() => { fired = true; handler(ev); }, 550);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((t) => el.addEventListener(t, clear));
    window.addEventListener("scroll", clear, { passive: true });
    el.addEventListener("click", (ev) => { if (fired) { ev.stopPropagation(); ev.preventDefault(); fired = false; } }, true);
    el.addEventListener("contextmenu", (ev) => { ev.preventDefault(); clear(); handler(ev); });
  }

  // ---------- dialogs (Android 2.x style) ----------
  function dialog({ title, body = "", items, buttons = [], onOpen }) {
    const el = frag(`<div class="dlg-bg"><div class="dlg" role="dialog">
      ${title ? `<div class="dlg-title">${title}</div>` : ""}
      ${items ? `<ul class="dlg-items">${items.map((it, i) => `<li data-i="${i}">${esc(it.label)}</li>`).join("")}</ul>` : ""}
      ${body ? `<div class="dlg-body">${body}</div>` : ""}
      ${buttons.length ? `<div class="dlg-buttons">${buttons.map((b, i) => `<button class="btn" data-b="${i}">${esc(b.label)}</button>`).join("")}</div>` : ""}
    </div></div>`).firstChild;
    const close = () => {
      el.remove();
      const i = overlays.indexOf(close);
      if (i >= 0) overlays.splice(i, 1);
      syncBack();
    };
    el.addEventListener("click", (ev) => {
      if (ev.target === el) return close();
      const li = ev.target.closest("[data-i]");
      if (li) { close(); items[+li.dataset.i].action(); return; }
      const b = ev.target.closest("[data-b]");
      if (b) {
        const btn = buttons[+b.dataset.b];
        if (!btn.action || btn.action(el) !== false) close();
      }
    });
    document.body.appendChild(el);
    overlays.push(close);
    syncBack();
    if (onOpen) onOpen(el);
    return close;
  }
  function ask(title, value, done) {
    dialog({
      title: esc(title),
      body: `<input class="edit" id="askInput" value="${esc(value || "")}">`,
      buttons: [{ label: "Ok", action: (el) => done($("#askInput", el).value.trim()) }, { label: "Cancel" }],
      onOpen: (el) => { const i = $("#askInput", el); i.focus(); i.select(); },
    });
  }
  function confirmDlg(text, yes) {
    dialog({ title: "Are you sure?", body: esc(text), buttons: [{ label: "Yes", action: yes }, { label: "No" }] });
  }

  // ---------- navigation ----------
  function go(view, arg, replace) {
    if (replace) stack.pop();
    stack.push({ view, arg, scroll: 0, query: "" });
    render();
  }
  function back() {
    if (overlays.length) return overlays[overlays.length - 1]();
    if (stack.length > 1) {
      stack.pop();
      render(true);
    }
  }
  const cur = () => stack[stack.length - 1];

  // MainActivity's Back key clicks #backBtn when it is not hidden.
  function syncBack() {
    const b = document.getElementById("backBtn");
    if (b) b.classList.toggle("hidden", !(overlays.length || stack.length > 1));
  }

  // Title bar: [left button] [search field] [right button], as in JED.
  function shell(opts, body) {
    const isRoot = stack.length === 1;
    overlays.length = 0;
    app.innerHTML = "";
    app.appendChild(frag(`
      <header class="titlebar">
        <button class="btn tb-left" id="leftBtn">${isRoot ? "Menu" : "Back"}</button>
        <div class="tb-field">
          <input id="q" class="edit search" type="search" lang="ja" enterkeyhint="search" autocomplete="off"
            placeholder="${esc(opts.hint || "Search for...")}" value="${esc(opts.query || "")}">
          <span class="spinner ${Data.ready ? "hidden" : ""}" id="spinner"></span>
        </div>
        ${opts.right ? `<button class="btn tb-right" id="rightBtn">${esc(opts.right)}</button>` : ""}
      </header>
      <button id="backBtn" class="hidden" aria-hidden="true" tabindex="-1"></button>
      <main id="content">${body}</main>
      ${opts.notepad ? notepadHtml() : ""}`));
    $("#leftBtn").onclick = () => (isRoot ? go("menu") : back());
    $("#backBtn").onclick = back;
    if (opts.right) $("#rightBtn").onclick = opts.onRight;
    const input = $("#q");
    if (opts.onInput) {
      let timer = 0;
      input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => opts.onInput(input.value), 200); });
    }
    input.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter") return;
      ev.preventDefault();
      input.blur();
      if (opts.onInput) opts.onInput(input.value);
      else searchAll(input.value);
    });
    if (opts.notepad) wireNotepad();
    syncBack();
  }

  function searchAll(q) {
    stack.length = 1;
    stack[0].query = q;
    render();
  }

  function render(restore) {
    const c = cur();
    document.documentElement.style.fontSize = 16 * state.textScale + "px";
    c.refresh = null;
    VIEWS[c.view](c.arg, c);
    window.scrollTo(0, restore ? c.scroll : 0);
  }
  window.addEventListener("scroll", () => { if (stack.length) cur().scroll = window.scrollY; }, { passive: true });

  // ---------- notepad drawer ----------
  function notepadHtml() {
    return `<div class="drawer" id="drawer">
      <div class="drawer-handle" id="drawerHandle">Notepad</div>
      <textarea class="lined" id="pad" lang="ja" spellcheck="false">${esc(state.notepad)}</textarea>
    </div>`;
  }
  function wireNotepad() {
    const drawer = $("#drawer");
    const pad = $("#pad");
    const close = () => {
      drawer.classList.remove("open");
      const i = overlays.indexOf(close);
      if (i >= 0) overlays.splice(i, 1);
      syncBack();
    };
    $("#drawerHandle").onclick = () => {
      if (drawer.classList.toggle("open")) {
        overlays.push(close);
        syncBack();
      } else close();
    };
    pad.addEventListener("input", () => { state.notepad = pad.value; save(); });
    onLongPress(pad, () => {
      const sel = pad.value.slice(pad.selectionStart, pad.selectionEnd).trim();
      dialog({
        title: "Notepad",
        items: [
          ...(sel ? [{ label: `Search “${sel}”`, action: () => { close(); searchAll(sel); } }] : []),
          { label: "Copy all", action: () => copy(pad.value) },
          { label: "Clear", action: () => { pad.value = ""; state.notepad = ""; save(); } },
        ],
      });
    });
  }

  // ---------- list rows ----------
  function resultRow(pos, note) {
    const r = Data.row(pos);
    const hw = head(r);
    const reading = r.kanji.length ? r.kana[0] : "";
    const gloss = r.senses.map((s, i) => (r.senses.length > 1 ? `(${i + 1}) ` : "") + s).join(" ");
    const tags = Object.keys(state.lists).filter((n) => state.lists[n].some((w) => w.id === r.id));
    const pills = (r.common ? ["common"] : []).concat(tags);
    return `<li class="row result" data-pos="${pos}"${note ? ` data-note="${esc(note)}"` : ""}>
      <div class="r-top"><span class="r-kanji" lang="ja">${esc(hw)}</span>
        ${reading ? `<span class="r-kana" lang="ja">[${esc(reading)}]</span>` : ""}
        ${state.romaji ? `<span class="r-romaji">${esc(Kana.toRomaji(r.kana[0]))}</span>` : ""}</div>
      <div class="r-gloss">${note ? `<span class="r-note">${esc(note)}</span> ` : ""}${esc(gloss)}</div>
      ${pills.length ? `<div class="r-pills">${pills.map((p) => `<span class="pill">${esc(p)}</span>`).join("")}</div>` : ""}
    </li>`;
  }

  function wireResults(root) {
    $$(".result:not([data-wired])", root).forEach((li) => {
      li.dataset.wired = "1";
      li.onclick = () => go("details", { pos: +li.dataset.pos, note: li.dataset.note });
      onLongPress(li, () => entryMenu(+li.dataset.pos));
    });
  }

  function entryMenu(pos) {
    const r = Data.row(pos);
    const hw = head(r);
    const items = [
      { label: "Copy kanji", action: () => copy(hw) },
      { label: "Copy reading", action: () => copy(r.kana.join(", ")) },
      { label: "Copy meaning", action: () => copy(r.senses.join("; ")) },
      { label: "Tag", action: async () => tagEntry(await Data.entry(pos)) },
      { label: "Listen", action: () => speak(r.kana[0]) },
    ];
    if (cur().arg && cur().arg.scope === "history") items.push({ label: "Clear history", action: clearHistory });
    dialog({ title: `<span lang="ja">${esc(hw)}</span>`, items });
  }

  function kanjiRow(ch, k) {
    return `<li class="row kanji-row" data-kanji="${esc(ch)}">
      <span class="k-big" lang="ja">${esc(ch)}</span>
      <div class="k-info">
        <div class="k-reads" lang="ja"><span>${esc((k.on || []).join("、"))}</span><span>${esc((k.kun || []).join("、"))}</span></div>
        <div class="k-mean">${esc((k.m || []).join(", "))}</div>
      </div>
      <span class="arrow">›</span>
    </li>`;
  }
  function wireKanjiRows(root) {
    $$(".kanji-row:not([data-wired])", root).forEach((li) => {
      li.dataset.wired = "1";
      li.onclick = () => go("kanji", li.dataset.kanji);
      onLongPress(li, () => {
        const ch = li.dataset.kanji;
        dialog({ title: `<span lang="ja">${esc(ch)}</span>`, items: [
          { label: "Copy kanji", action: () => copy(ch) },
          { label: "Search words with this kanji", action: () => searchAll("*" + ch + "*") },
        ] });
      });
    });
  }

  const sep = (label) => `<li class="sep">${esc(label)}</li>`;
  const nameValue = (name, value) => `<li class="row nv"><span class="nv-name">${esc(name)}</span><span class="nv-value">${value}</span></li>`;

  // Pages of 50 rows with a "More" row, up to the search limit.
  function pagedList(list, results, rowFn, wire) {
    let shown = 0;
    const more = () => {
      const old = $("#moreRow", list);
      if (old) old.remove();
      list.insertAdjacentHTML("beforeend", results.slice(shown, shown + PAGE).map(rowFn).join(""));
      wire(list);
      shown = Math.min(results.length, shown + PAGE);
      if (shown < results.length) {
        list.insertAdjacentHTML("beforeend", `<li class="row more" id="moreRow">More results (${shown} of ${results.length})</li>`);
        $("#moreRow", list).onclick = more;
      }
    };
    more();
  }

  // ---------- scopes ----------
  const CATEGORIES = {
    verb: "Verbs", nonsuru: "Non suru verbs", noun: "Nouns", adj: "Adjectives", adv: "Adverbs", ctr: "Counters", ono: "Onomatopeia",
  };
  function scopeFilter(scope) {
    const o = state.options;
    const f = { field: o.field, common: o.common, chars: o.chars };
    if (o.chars.hira && o.chars.kata && o.chars.kanji && o.chars.latin) f.chars = null;
    if (!scope || scope.scope === "all") return f;
    if (scope.scope === "category") f.type = scope.type;
    if (scope.scope === "history" || scope.scope === "tags") {
      const ids = scope.scope === "history" ? state.history.map((w) => w.id)
        : (scope.tags || Object.keys(state.lists)).flatMap((n) => (state.lists[n] || []).map((w) => w.id));
      f.only = new Set(ids.map((id) => Data.posOfId(id)).filter((p) => p !== undefined));
    }
    return f;
  }
  function scopeHint(scope) {
    if (!scope || scope.scope === "all") return "Search all";
    if (scope.scope === "history") return "Search history";
    if (scope.scope === "tags") return "Search tags" + (scope.tags ? ": " + scope.tags.join(", ") : "");
    if (scope.scope === "category") return "Search " + CATEGORIES[scope.type].toLowerCase();
    return "Search for...";
  }

  // ---------- views ----------
  const VIEWS = {
    // Search list for any scope (all, tags, history, a word category).
    search(scope, c) {
      shell({
        hint: scopeHint(scope),
        query: c.query,
        right: "Options",
        onRight: searchOptions,
        onInput: (q) => { c.query = q; run(); },
        notepad: true,
      }, `<div class="status hidden" id="status"></div><ul class="list" id="results"></ul>`);
      const showStatus = (msg) => {
        const status = $("#status");
        status.textContent = msg;
        status.classList.toggle("hidden", !msg);
      };
      const run = () => {
        const out = $("#results");
        out.innerHTML = "";
        if (loadError) return showStatus(loadError);
        const q = c.query || "";
        const f = scopeFilter(scope);
        if (!q.trim() && !f.only && !f.type) {
          showStatus(Data.ready ? "" : "Loading dictionary…");
          if (Data.ready) out.innerHTML = welcome();
          wireResults(out);
          return;
        }
        const { results, total } = Search.search(q, f);
        if (!results.length) return showStatus("No result(s)");
        showStatus("");
        out.insertAdjacentHTML("beforeend", `<li class="count">${num(total)} result(s)${total > results.length ? `, showing the first ${results.length}` : ""}${Data.ready ? "" : " (still loading)"}</li>`);
        pagedList(out, results, (r) => resultRow(r.pos, r.note), wireResults);
      };
      c.refresh = run;
      run();
    },

    menu() {
      const m = Data.meta || {};
      const item = (to, title, desc, arg) => `<li class="row menu-item" data-go="${to}"${arg ? ` data-arg='${esc(JSON.stringify(arg))}'` : ""}>
        <div class="mi-title">${esc(title)}</div><div class="mi-desc">${esc(desc)}</div></li>`;
      const tagged = new Set(Object.values(state.lists).flat().map((w) => w.id)).size;
      shell({ hint: "Menu" }, `<ul class="list">
        ${sep("Search")}
        ${item("search", "All", `Search among all entries (${num(m.words || 0)})`, { scope: "all" })}
        ${item("tags", "Tags", `Search among your tagged entries (${num(tagged)})`)}
        ${item("search", "History", `Search recently displayed entries (${num(state.history.length)})`, { scope: "history" })}
        ${sep("Dictionary")}
        ${item("search", "All Words/Expresions", `Search among words and expressions (${num(m.words || 0)})`, { scope: "all" })}
        ${item("categories", "Words by category", "Choose the category to search from")}
        ${sep("Kanji and Kana")}
        ${item("kanjiList", "All Kanji", `Search in all kanji (${num(m.kanjiCount || 0)})`)}
        ${item("radicals", "Kanji by radicals", "Search kanji by its radical(s)")}
        ${item("kana", "Hiragana and Katakana", "Simple kana table")}
        ${sep("Application")}
        ${item("settings", "Settings", "Text size and display")}
        ${item("about", "About", "Version, data and acknowledgements")}
      </ul>`);
      wireMenu();
    },

    categories() {
      const counts = categoryCounts();
      const item = (type) => `<li class="row menu-item" data-go="search" data-arg='${esc(JSON.stringify({ scope: "category", type }))}'>
        <div class="mi-title">${CATEGORIES[type]}</div><div class="mi-desc">Search ${CATEGORIES[type].toLowerCase()} (${num(counts[type] || 0)})</div></li>`;
      shell({ hint: "Categories" }, `<ul class="list">
        ${sep("Parts of speech")}${["verb", "nonsuru", "noun", "adj", "adv"].map(item).join("")}
        ${sep("Others")}${["ctr", "ono"].map(item).join("")}
      </ul>`);
      wireMenu();
    },

    async details(arg) {
      shell({ hint: "Entry", right: "Tag", onRight: () => {}, notepad: true }, `<div class="status">Loading…</div>`);
      const e = await Data.entry(arg.pos);
      const kanjiAll = await Data.loadKanji();
      if (cur().arg !== arg) return;
      addHistory(e);
      const hw = head(e);
      const ktags = e.kt || {};
      const rtags = e.rt || {};
      $("#rightBtn").onclick = () => tagEntry(e);
      let lastPos = "";
      const senses = e.s.map((s, i) => {
        const pos = (s.p || []).map(tagName).join(", ");
        const posLine = pos && pos !== lastPos ? `<div class="s-pos">${esc(pos)}</div>` : "";
        if (pos) lastPos = pos;
        const extra = [].concat(s.m || [], s.f || [], s.d || []).map(tagName);
        const limits = [].concat(s.sk || [], s.sr || []);
        const xref = (label, list) => list ? `<div class="s-extra">${label}: ${list.map((r) => `<a class="xref" data-q="${esc(r.split("・")[0])}" lang="ja">${esc(r)}</a>`).join(", ")}</div>` : "";
        return `<li class="row sense">${posLine}<div class="s-gloss"><span class="s-num">${i + 1}.</span> ${esc(s.g.join("; "))}</div>
          ${extra.length ? `<div class="s-extra">${esc(extra.join(", "))}</div>` : ""}
          ${limits.length ? `<div class="s-extra">only for <span lang="ja">${esc(limits.join(", "))}</span></div>` : ""}
          ${s.i ? `<div class="s-extra">${esc(s.i.join("; "))}</div>` : ""}
          ${s.l ? `<div class="s-extra">From ${esc(s.l.join(", "))}</div>` : ""}
          ${xref("See also", s.r)}${xref("Antonym", s.a)}</li>`;
      }).join("");
      const tagChips = (list) => (list || []).map((t) => `<span class="alt-tag">${esc(tagName(t))}</span>`).join("");
      const alts = [];
      e.kanji.forEach((k, i) => {
        if (i === 0) return;
        const reads = e.kana.filter((r) => !e.ra || !e.ra[r] || e.ra[r].includes(k));
        alts.push(`<li class="row alt"><span class="alt-word" lang="ja">${esc(k)}</span><span class="alt-read" lang="ja">[${esc(reads.join(", "))}]</span>${tagChips(ktags[k])}</li>`);
      });
      e.kana.slice(e.kanji.length ? 1 : 1).forEach((r) => alts.push(`<li class="row alt"><span class="alt-word" lang="ja">${esc(r)}</span>${tagChips(rtags[r])}</li>`));
      const shownKanji = e.kanji.filter((k) => !(ktags[k] || []).includes("sK"));
      const chars = [...new Set([...shownKanji.join("")].filter((ch) => kanjiAll[ch]))];
      const examples = (e.x || []).map(([jp, en]) => `<li class="row sentence" data-speak="${esc(jp)}"><div class="se-jp" lang="ja">${esc(jp)}</div><div class="se-en">${esc(en)}</div></li>`).join("");
      const tags = Object.keys(state.lists).filter((n) => state.lists[n].some((w) => w.id === e.id));
      $("#content").innerHTML = `<ul class="list details">
        <li class="furigana" data-speak="${esc(e.kana[0])}">
          ${e.kanji.length ? `<ruby lang="ja">${esc(hw)}<rt>${esc(e.kana[0])}</rt></ruby>` : `<span lang="ja">${esc(hw)}</span>`}
          ${state.romaji ? `<div class="f-romaji">${esc(Kana.toRomaji(e.kana[0]))}</div>` : ""}
        </li>
        ${arg.note ? nameValue("Root form", `<span lang="ja">${esc(hw)}</span> <span class="dim">(${esc(arg.note)})</span>`) : ""}
        ${e.kanji.length ? nameValue("Reading", `<span lang="ja">${esc(e.kana[0])}</span>`) : ""}
        ${(e.c || []).length ? nameValue("Common", "Yes") : ""}
        ${tags.length ? nameValue("Tags", tags.map((t) => `<span class="pill">${esc(t)}</span>`).join(" ")) : ""}
        ${sep("Meanings")}${senses}
        ${alts.length ? sep("Alternatives") + alts.join("") : ""}
        ${chars.length ? sep("Kanji") + chars.map((ch) => kanjiRow(ch, kanjiAll[ch])).join("") : ""}
        ${examples ? sep("Sentences") + examples : ""}
        <li class="foot">JMdict ${esc(e.id)}${examples ? " · sentences from Tatoeba" : ""}</li>
      </ul>`;
      wireKanjiRows($("#content"));
      $$(".xref").forEach((a) => a.onclick = (ev) => { ev.stopPropagation(); searchAll(a.dataset.q); });
      $$("[data-speak]", $("#content")).forEach((el) => el.onclick = () => speak(el.dataset.speak));
      onLongPress($(".furigana"), () => entryMenu(arg.pos));
    },

    // "All Kanji": search KANJIDIC by character, reading or meaning.
    async kanjiList(arg, c) {
      shell({ hint: "Search kanji", query: c.query, onInput: (q) => { c.query = q; run(); }, notepad: true },
        `<div class="status">Loading…</div>`);
      const all = await Data.loadKanji();
      const run = () => {
        const list = Search.kanji(c.query || "", all);
        $("#content").innerHTML = list.length ? `<ul class="list" id="klist"><li class="count">${num(list.length)} kanji</li></ul>` : `<div class="status">No result(s)</div>`;
        if (list.length) pagedList($("#klist"), list, (ch) => kanjiRow(ch, all[ch]), wireKanjiRows);
      };
      run();
    },

    async kanji(ch) {
      shell({ hint: "Kanji", notepad: true }, `<div class="status">Loading…</div>`);
      const all = await Data.loadKanji();
      if (cur().arg !== ch) return;
      const k = all[ch];
      if (!k) {
        $("#content").innerHTML = `<div class="status">No result(s)</div>`;
        return;
      }
      const words = Search.wordsWithKanji(ch, 40);
      const parts = k.p ? [...k.p].map((p) => `<span class="part" data-part="${esc(p)}" lang="ja">${esc(p)}</span>`).join("") : "";
      $("#content").innerHTML = `<ul class="list">
        <li class="row kanji-head">
          <span class="k-huge" lang="ja">${esc(ch)}</span>
          <div class="k-info">
            <div class="k-reads" lang="ja"><span>${esc((k.on || []).join("、"))}</span></div>
            <div class="k-reads" lang="ja"><span>${esc((k.kun || []).join("、"))}</span></div>
            <div class="k-mean">${esc((k.m || []).join(", "))}</div>
          </div>
        </li>
        ${nameValue("Strokes", k.s)}
        ${k.r ? nameValue("Radical", "#" + k.r) : ""}
        ${parts ? nameValue("Parts", parts) : ""}
        ${k.g ? nameValue("Grade", k.g <= 6 ? "Kyōiku " + k.g : k.g === 8 ? "Jōyō" : "Jinmeiyō") : ""}
        ${k.j ? nameValue("JLPT", "N" + k.j) : ""}
        ${k.f ? nameValue("Frequency", k.f + " / 2500") : ""}
        ${k.n ? nameValue("Nanori", `<span lang="ja">${esc(k.n.join("、"))}</span>`) : ""}
        ${k.sk ? nameValue("SKIP", esc(k.sk)) : ""}
        ${k.h ? nameValue("Heisig", esc(k.h)) : ""}
        ${sep("Words")}
        ${words.map((p) => resultRow(p)).join("")}
        <li class="row more" id="allWords">Search all words with ${esc(ch)}</li>
      </ul>`;
      wireResults($("#content"));
      $$(".part").forEach((p) => p.onclick = () => go("radicals", p.dataset.part));
      $("#allWords").onclick = () => searchAll("*" + ch + "*");
    },

    async radicals(preset) {
      let picked = null;
      let draw = () => {};
      shell({ hint: "Search radicals", right: "Reset", onRight: () => { if (picked) { picked.clear(); draw(); } } }, `<div class="status">Loading…</div>`);
      const rads = await Data.loadRadicals();
      const kanji = Data.kanji;
      picked = new Set(preset && rads.some((r) => r[0] === preset) ? [preset] : []);
      draw = () => {
        let matches = null;
        for (const r of picked) {
          const set = new Set(rads.find((x) => x[0] === r)[2]);
          matches = matches ? new Set([...matches].filter((ch) => set.has(ch))) : set;
        }
        const list = matches ? [...matches].sort((a, b) => ((kanji[a] || {}).s || 99) - ((kanji[b] || {}).s || 99)) : [];
        const possible = matches ? new Set(rads.filter((r) => !picked.has(r[0]) && list.some((ch) => r[2].includes(ch))).map((r) => r[0])) : null;
        let last = 0;
        const grid = rads.map(([r, s]) => {
          const label = s !== last ? `<span class="rad-stroke">${(last = s)}</span>` : "";
          const cls = picked.has(r) ? "on" : possible && !possible.has(r) ? "off" : "";
          return `${label}<span class="rad ${cls}" data-rad="${esc(r)}" lang="ja">${esc(r)}</span>`;
        }).join("");
        $("#content").innerHTML = `
          <div class="rad-head">Number of kanji: ${picked.size ? list.length : "-"}</div>
          ${picked.size ? `<div class="rad-results">${list.slice(0, 200).map((ch) => `<span class="rad-kanji" data-kanji="${esc(ch)}" lang="ja">${esc(ch)}</span>`).join("")}${list.length > 200 ? `<span class="dim">+${list.length - 200}</span>` : ""}</div>` : ""}
          <div class="rad-grid">${grid}</div>`;
        $$("[data-rad]").forEach((b) => b.onclick = () => {
          const r = b.dataset.rad;
          if (picked.has(r)) picked.delete(r);
          else if (!b.classList.contains("off")) picked.add(r);
          draw();
        });
        $$(".rad-kanji").forEach((b) => b.onclick = () => go("kanji", b.dataset.kanji));
      };
      draw();
    },

    kana(arg, c) {
      const kata = !!c.kata;
      const cols = ["A", "I", "U", "E", "O"];
      const seion = [["-", "あいうえお"], ["K", "かきくけこ"], ["S", "さしすせそ"], ["T", "たちつてと"], ["N", "なにぬねの"], ["H", "はひふへほ"], ["M", "まみむめも"], ["Y", "や_ゆ_よ"], ["R", "らりるれろ"], ["W", "わ___を"], ["N", "ん____"]];
      const daku = [["G", "がぎぐげご"], ["Z", "ざじずぜぞ"], ["D", "だぢづでど"], ["B", "ばびぶべぼ"]];
      const handaku = [["P", "ぱぴぷぺぽ"]];
      const yoon = [["Ky", "き"], ["Sh", "し"], ["Ch", "ち"], ["Ny", "に"], ["Hy", "ひ"], ["My", "み"], ["Ry", "り"], ["Gy", "ぎ"], ["J", "じ"], ["By", "び"], ["Py", "ぴ"]];
      const cell = (k) => !k ? `<td></td>` : `<td class="kana-cell" data-speak="${k}"><span lang="ja">${kata ? Kana.hiraToKata(k) : k}</span><small>${Kana.toRomaji(k)}</small></td>`;
      const rows = (list) => list.map(([label, s]) => `<tr><th>${label}</th>${[...s].map((ch) => cell(ch === "_" ? "" : ch)).join("")}</tr>`).join("");
      const yrows = yoon.map(([label, base]) => `<tr><th>${label}</th>${cell(base + "ゃ")}<td></td>${cell(base + "ゅ")}<td></td>${cell(base + "ょ")}</tr>`).join("");
      shell({ hint: kata ? "Katakana" : "Hiragana", right: "Switch", onRight: () => { c.kata = !kata; render(); } }, `
        <table class="kana-table"><thead><tr><th></th>${cols.map((x) => `<th>${x}</th>`).join("")}</tr></thead>
          <tbody>
            <tr class="kana-sec"><td colspan="6">Seion</td></tr>${rows(seion)}
            <tr class="kana-sec"><td colspan="6">Dakuon</td></tr>${rows(daku)}
            <tr class="kana-sec"><td colspan="6">HanDakuon</td></tr>${rows(handaku)}
            <tr class="kana-sec"><td colspan="6">Yoon</td></tr>${yrows}
          </tbody></table>`);
      $$("[data-speak]").forEach((el) => el.onclick = () => speak(el.dataset.speak));
    },

    // Tag list: tick tags, then Show (search them, merged) or Export.
    tags(arg, c) {
      const assign = arg && arg.assign; // entry being tagged
      const names = Object.keys(state.lists);
      c.checked = c.checked || new Set(assign ? names.filter((n) => state.lists[n].some((w) => w.id === assign.id)) : []);
      shell({ hint: assign ? "Tag: " + head(assign) : "Tags" }, `
        <ul class="list" id="tagList">${names.length ? names.map((n) => `<li class="row tag-row" data-name="${esc(n)}">
          <label><input type="checkbox" ${c.checked.has(n) ? "checked" : ""}> <span>${esc(n)}</span> <span class="dim">(${state.lists[n].length})</span></label></li>`).join("")
          : `<li class="status">No tag(s)</li>`}</ul>
        <div class="bottombar">${assign
          ? `<button class="btn" id="tCancel">Cancel</button><button class="btn" id="tAdd">Add</button><button class="btn" id="tSave">Save</button>`
          : `<button class="btn" id="tExport">Export</button><button class="btn" id="tAdd">Add</button><button class="btn" id="tShow">Show</button>`}</div>`);
      $$(".tag-row").forEach((li) => {
        const name = li.dataset.name;
        $("input", li).onchange = (ev) => { if (ev.target.checked) c.checked.add(name); else c.checked.delete(name); };
        onLongPress(li, () => dialog({ title: "Tag menu", items: [
          { label: "Rename tag", action: () => ask("Rename tag", name, (to) => {
            if (!to || to === name || state.lists[to]) return;
            const renamed = {};
            for (const [n, l] of Object.entries(state.lists)) renamed[n === name ? to : n] = l;
            state.lists = renamed;
            if (c.checked.delete(name)) c.checked.add(to);
            save();
            render();
          }) },
          { label: "Delete tag", action: () => confirmDlg(`Delete the tag “${name}”?`, () => { delete state.lists[name]; c.checked.delete(name); save(); render(); }) },
        ] }));
      });
      $("#tAdd").onclick = () => ask("Please enter a tag name...", "", (name) => {
        if (!name || state.lists[name]) return;
        state.lists[name] = [];
        c.checked.add(name);
        save();
        render();
      });
      if (assign) {
        $("#tCancel").onclick = back;
        $("#tSave").onclick = () => {
          for (const n of Object.keys(state.lists)) {
            const has = state.lists[n].some((w) => w.id === assign.id);
            if (c.checked.has(n) && !has) state.lists[n].unshift(snapshot(assign));
            if (!c.checked.has(n) && has) state.lists[n] = state.lists[n].filter((w) => w.id !== assign.id);
          }
          save();
          toast("Saved");
          back();
        };
      } else {
        $("#tShow").onclick = () => go("search", { scope: "tags", tags: c.checked.size ? [...c.checked] : null });
        $("#tExport").onclick = () => {
          const chosen = c.checked.size ? [...c.checked] : names;
          if (!chosen.length) return toast("No tag(s)");
          dialog({ title: "Export tag(s) to", items: [{ label: "Anki file (CSV)", action: () => exportCsv(chosen) }] });
        };
      }
    },

    settings() {
      shell({ hint: "Settings" }, `<ul class="list">
        ${sep("Display")}
        <li class="row setting"><div class="mi-title">Text size</div>
          <div class="seg">${[0.9, 1, 1.15, 1.3].map((s) => `<button class="btn ${state.textScale === s ? "pressed" : ""}" data-scale="${s}">${Math.round(s * 100)}%</button>`).join("")}</div></li>
        <li class="row setting"><label><input type="checkbox" id="romaji" ${state.romaji ? "checked" : ""}> <span class="mi-title">Show rōmaji</span></label>
          <div class="mi-desc">Show rōmaji next to readings</div></li>
        ${sep("Data")}
        <li class="row setting"><div class="mi-title">Clear history</div><div class="mi-desc">${state.history.length} entries</div><button class="btn" id="clearHist">Clear</button></li>
      </ul>`);
      $$("[data-scale]").forEach((b) => b.onclick = () => { state.textScale = +b.dataset.scale; save(); render(); });
      $("#romaji").onchange = (e) => { state.romaji = e.target.checked; save(); };
      $("#clearHist").onclick = () => clearHistory();
    },

    about() {
      const m = Data.meta || {};
      shell({ hint: "About" }, `<div class="about">
        <h3>SquirrelGo Dictionary</h3>
        <p>Offline Japanese–English dictionary, laid out after JED. Everything is on the device; no download or server is needed.</p>
        <p>Search with kanji, hiragana, katakana, rōmaji or English. Conjugated verbs and adjectives (食べた, 高くない) are traced back to their dictionary form. Use <b>*</b> and <b>?</b> as wildcards. Long-press any entry for copy and tag options.</p>
        <p class="dim">JMdict ${esc(m.jmdictDate || "?")} · ${num(m.words || 0)} entries<br>KANJIDIC2 ${esc(m.kanjidicDate || "?")} · ${num(m.kanjiCount || 0)} kanji<br>jmdict-simplified ${esc(m.version || "")}</p>
        <h3>Acknowledgements</h3>
        <p>This software uses the JMdict, KANJIDIC2, RADKFILE and KRADFILE dictionary files. These files are the property of the Electronic Dictionaries Research and Development Group, and are used in conformance with the Group's licence (CC BY-SA 4.0). See edrdg.org.</p>
        <p>Example sentences come from the Tatoeba project (formerly the Tanaka Corpus), CC BY 2.0 FR.</p>
        <p>JSON conversion by jmdict-simplified.</p>
        <p class="dim">Not affiliated with umibouzu.com or the original JED; this is an independent implementation.</p>
      </div>`);
    },
  };

  function wireMenu() {
    $$("[data-go]").forEach((li) => li.onclick = () => {
      const arg = li.dataset.arg ? JSON.parse(li.dataset.arg) : undefined;
      if (li.dataset.go === "search" && arg && arg.scope === "all") return searchAll(stack[0].query || "");
      go(li.dataset.go, arg);
    });
  }

  let catCounts = null;
  function categoryCounts() {
    if (catCounts) return catCounts;
    const counts = {};
    const map = { V: "verb", N: "noun", A: "adj", D: "adv", C: "ctr", O: "ono" };
    for (let pos = 0; pos < Data.size; pos++) {
      const cls = Data.row(pos).cls;
      for (const c of cls) if (map[c]) counts[map[c]] = (counts[map[c]] || 0) + 1;
      if (cls.includes("V") && !cls.some((c) => c.startsWith("vs"))) counts.nonsuru = (counts.nonsuru || 0) + 1;
    }
    if (Data.ready) catCounts = counts;
    return counts;
  }

  function welcome() {
    const recent = state.history.slice(0, 10);
    return `<li class="hint">Type kanji, kana, rōmaji or English above. Long-press a result for more options.</li>
      ${recent.length ? sep("History") + recent.map((w) => {
        const pos = Data.posOfId(w.id);
        return pos === undefined ? "" : resultRow(pos);
      }).join("") : ""}`;
  }

  function searchOptions() {
    const o = state.options;
    dialog({
      title: "Search Options",
      body: `<div class="opt-row"><label>Search
          <select id="oField">${[["both", "Both"], ["read", "Read"], ["mean", "Mean"]].map(([v, l]) => `<option value="${v}" ${o.field === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <label><input type="checkbox" id="oCommon" ${o.common ? "checked" : ""}> Common</label></div>
        <div class="opt-label">Allowed Characters</div>
        <div class="opt-row chars">${[["hira", "あ"], ["kata", "ア"], ["kanji", "漢字"], ["latin", "latin"]].map(([k, l]) =>
          `<label><input type="checkbox" data-ch="${k}" ${o.chars[k] ? "checked" : ""}> <span lang="ja">${l}</span></label>`).join("")}</div>`,
      buttons: [
        { label: "Ok", action: (el) => {
          o.field = $("#oField", el).value;
          o.common = $("#oCommon", el).checked;
          $$("[data-ch]", el).forEach((cb) => (o.chars[cb.dataset.ch] = cb.checked));
          save();
          if (cur().refresh) cur().refresh();
        } },
        { label: "Cancel" },
      ],
    });
  }

  function snapshot(e) {
    return { id: e.id, head: head(e), kana: e.kana[0], gloss: e.s.slice(0, 3).map((s) => s.g.join("; ")).join(" / ") };
  }
  function addHistory(e) {
    state.history = [snapshot(e)].concat(state.history.filter((w) => w.id !== e.id)).slice(0, 200);
    save();
  }
  function clearHistory() {
    confirmDlg("Clear history?", () => {
      state.history = [];
      save();
      toast("Clearing history!");
      render();
    });
  }
  function tagEntry(e) {
    go("tags", { assign: e });
  }

  function exportCsv(names) {
    const cell = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const seen = new Set();
    const rows = [];
    for (const n of names) for (const w of state.lists[n] || []) {
      if (seen.has(w.id)) continue;
      seen.add(w.id);
      rows.push([w.head, w.kana, w.gloss, n].map(cell).join(","));
    }
    const csv = rows.join("\n") + "\n";
    const file = (names.length === 1 ? names[0] : "jed-tags").replace(/[^\w-]+/g, "_") + ".csv";
    if (window.AndroidTTS && window.AndroidTTS.saveFile) {
      window.AndroidTTS.saveFile(file, csv);
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = file;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("Data successfully exported");
  }

  // ---------- start ----------
  let loadError = null;
  stack.push({ view: "search", arg: { scope: "all" }, scroll: 0, query: "" });
  render();
  const spin = (on) => { const s = $("#spinner"); if (s) s.classList.toggle("hidden", !on); };
  Data.init((loaded, total) => {
    spin(loaded < total);
    const c = cur();
    if (c.view === "search" && c.refresh && (loaded === 1 || loaded === total)) c.refresh();
  }).catch(() => {
    loadError = "Cannot load data. Run tools/fetch_data.sh (see README).";
    spin(false);
    if (cur().refresh) cur().refresh();
  });

  window.SquirrelDict = { back };
})();
