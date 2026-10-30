(() => {
  const BOOKS = window.SGO_BOOKS;
  const CATALOG = window.SGO_CATALOG || { bibles: [], commentary: [] };
  const VERS = window.SGO_VERSIFICATION || {};
  const STORE_KEY = "squirrelgo-orthodox-bible";
  const bookById = new Map(BOOKS.map((b) => [b.id, b]));
  const bookIndex = new Map(BOOKS.map((b, i) => [b.id, i]));
  const catBible = new Map(CATALOG.bibles.map((b) => [b.id, b]));
  const LANG_NAMES = {
    en: "English", ru: "Russian", cu: "Church Slavonic", grc: "Greek (Koine)", el: "Greek",
    sr: "Serbian", uk: "Ukrainian", ro: "Romanian", bg: "Bulgarian", ka: "Georgian",
    ar: "Arabic", hy: "Armenian", sq: "Albanian", syr: "Syriac", cop: "Coptic", la: "Latin",
    fr: "French", de: "German", es: "Spanish", fi: "Finnish", ja: "Japanese",
  };
  const langName = (code) => LANG_NAMES[code] || LANG_NAMES[String(code).split("-")[0]] || code;
  const HL_COLORS = ["gold", "green", "blue", "rose"];
  const TRADITIONS = [["east", "Eastern Fathers"], ["early", "Early Church"], ["west", "Western Fathers (before the schism)"]];

  // ---- persistence ----
  const firstBible = CATALOG.bibles[0]?.id || "";
  const defaults = {
    primary: firstBible,
    parallel: CATALOG.bibles.filter((b) => b.lang !== CATALOG.bibles[0]?.lang).slice(0, 1).map((b) => b.id),
    layout: "stack",
    textSize: 1.05,
    theme: "auto",
    hiddenCommentary: [],
    last: { book: "JHN", chapter: 1 },
    bookmarks: [],
    notes: {},
    highlights: {},
  };
  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
    } catch {
      return Object.assign({}, defaults);
    }
  }
  const store = load();
  if (!catBible.has(store.primary)) store.primary = firstBible;
  store.parallel = store.parallel.filter((id) => catBible.has(id) && id !== store.primary);
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {}
  }

  // ---- data loading ----
  // Data files are plain scripts that push onto a global, so they work from
  // file:// in a desktop browser and inside the Android WebView.
  const BIBLES = new Map();
  const COMMENTARY = new Map();
  const pending = new Map();
  window.SGO_BIBLES.forEach((b) => BIBLES.set(b.id, b));
  window.SGO_BIBLES = { push: (b) => BIBLES.set(b.id, b) };
  window.SGO_COMMENTARY.forEach((c) => addCommentary(c));
  window.SGO_COMMENTARY = { push: (c) => addCommentary(c) };

  function loadScript(src) {
    if (pending.has(src)) return pending.get(src);
    const p = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => {
        pending.delete(src);
        reject(new Error(`Could not load ${src}`));
      };
      document.head.appendChild(s);
    });
    pending.set(src, p);
    return p;
  }
  async function ensureBible(id) {
    if (BIBLES.has(id) || !catBible.has(id)) return BIBLES.get(id);
    await loadScript(`data/bibles/${id}.js`);
    return BIBLES.get(id);
  }
  // Commentary files are large, so load only those covering the given books
  // (KJV book ids). An entry without a books list is loaded for every book.
  async function ensureCommentary(books) {
    const want = CATALOG.commentary.filter((c) => !c.books || c.books.some((b) => books.includes(b)));
    await Promise.all(want.map((c) => loadScript(`data/commentary/${c.id}.js`).catch(() => {})));
  }

  // ---- references and versification ----
  // A ref is "BOOK.CHAPTER.VERSE" in some translation's own numbering. To line
  // translations up we map each ref to KJV numbering and back again.
  const parseRef = (ref) => {
    const [book, c, v] = ref.split(".");
    return { book, chapter: +c, verse: +v };
  };
  const inverse = {};
  function toKjv(scheme, ref) {
    const map = VERS[scheme];
    if (!map || !(ref in map)) return ref;
    return map[ref];
  }
  function fromKjv(scheme, kref) {
    const map = VERS[scheme];
    if (!map || kref == null) return kref;
    if (!inverse[scheme]) {
      inverse[scheme] = {};
      for (const [k, v] of Object.entries(map)) if (v && !(v in inverse[scheme])) inverse[scheme][v] = k;
    }
    if (kref in inverse[scheme]) return inverse[scheme][kref];
    // Identity, unless that ref already means something else in this scheme.
    return kref in map ? null : kref;
  }
  function verseText(bible, ref) {
    if (!bible || !ref) return null;
    const { book, chapter, verse } = parseRef(ref);
    return bible.books?.[book]?.[chapter - 1]?.[verse - 1] ?? null;
  }
  // Text of the verse in `bible` matching `ref` from `fromBible`.
  function parallelText(bible, fromBible, ref) {
    const kref = toKjv(fromBible.versification, ref);
    return verseText(bible, fromKjv(bible.versification, kref));
  }
  function refLabel(ref, bible) {
    const { book, chapter, verse } = parseRef(ref);
    const b = bookById.get(book);
    const name = b ? b.en : book;
    return `${name} ${chapter}:${verse}`;
  }
  const kjvKey = (bible, ref) => toKjv(bible.versification, ref);

  // ---- commentary ----
  // Each entry is indexed under every KJV ref its key covers.
  const commentaryIndex = new Map();
  function addCommentary(c) {
    COMMENTARY.set(c.id, c);
    for (const [key, texts] of Object.entries(c.notes || {})) {
      const m = key.match(/^([0-9A-Z]{3})\.(\d+)\.(\d+)(?:-(\d+))?$/);
      if (!m) continue;
      const [, book, ch, v1, v2] = m;
      for (let v = +v1; v <= +(v2 || v1); v++) {
        const kref = toKjv(c.versification || "kjv", `${book}.${ch}.${v}`);
        if (!kref) continue;
        if (!commentaryIndex.has(kref)) commentaryIndex.set(kref, []);
        commentaryIndex.get(kref).push({ source: c, key, texts });
      }
    }
  }
  const commentaryFor = (kref) =>
    (commentaryIndex.get(kref) || []).filter((e) => !store.hiddenCommentary.includes(e.source.id));

  // ---- helpers ----
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fold = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function chapterCount(bookId) {
    let n = 0;
    for (const b of BIBLES.values()) n = Math.max(n, b.books?.[bookId]?.length || 0);
    return n;
  }
  const hasChapter = (bible, book, ch) => !!bible?.books?.[book]?.[ch - 1];
  function applyLook() {
    document.documentElement.style.setProperty("--text-size", `${store.textSize}rem`);
    if (store.theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", store.theme);
  }

  // ---- routing ----
  // #/read/JHN/1[/5]  #/books  #/books/JHN  #/verse/JHN.1.1  #/search  #/saved  #/translations  #/about
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
    return { view: parts[0] || "read", args: parts.slice(1) };
  }
  const go = (hash) => {
    location.hash = hash;
  };
  window.addEventListener("hashchange", () => render());

  const app = document.getElementById("app");
  function shell(title, { back = true, sub = "", titleAction = null, actions = "", wide = false } = {}) {
    const head = titleAction
      ? `<button class="title-btn" id="titleBtn">${esc(title)}</button>`
      : `<h1>${esc(title)}${sub ? `<span class="sub">${esc(sub)}</span>` : ""}</h1>`;
    app.innerHTML = `
      <header class="topbar">
        <button class="back-btn ${back ? "" : "hidden"}" id="backBtn" aria-label="Back">‹</button>
        ${head}
        ${actions}
      </header>
      <main class="${wide ? "wide" : ""}"></main>`;
    document.getElementById("backBtn").onclick = () => {
      Speech.stop();
      if (history.length > 1) history.back();
      else go("#/read");
    };
    if (titleAction) document.getElementById("titleBtn").onclick = titleAction;
    app.querySelectorAll("[data-go]").forEach((el) => (el.onclick = () => go(el.dataset.go)));
    return app.querySelector("main");
  }
  const readerActions = `
    <button class="icon-btn" data-go="#/translations" aria-label="Translations" title="Translations">🌐</button>
    <button class="icon-btn" data-go="#/search" aria-label="Search" title="Search">⌕</button>
    <button class="icon-btn" data-go="#/saved" aria-label="Saved verses" title="Bookmarks and notes">★</button>`;

  async function render() {
    const { view, args } = route();
    Speech.stop();
    applyLook();
    if (!CATALOG.bibles.length) {
      shell("SquirrelGo Orthodox Bible", { back: false }).innerHTML =
        `<p class="empty">No Bible texts are installed yet. Add files to <code>www/data/bibles/</code> and list them in <code>www/data/catalog.js</code>.</p>`;
      return;
    }
    try {
      if (view === "books") return await renderBooks(args[0]);
      if (view === "verse") return await renderVerse(args[0]);
      if (view === "search") return await renderSearch();
      if (view === "saved") return await renderSaved();
      if (view === "translations") return renderTranslations();
      if (view === "about") return renderAbout();
      return await renderReader(args);
    } catch (err) {
      shell("Something went wrong").innerHTML = `<p class="empty">${esc(err.message)}</p>`;
    }
  }

  // ---- reader ----
  async function renderReader(args) {
    let book = args[0] || store.last.book;
    let chapter = +(args[1] || (args[0] ? 1 : store.last.chapter)) || 1;
    const focus = +args[2] || 0;
    if (!bookById.has(book)) book = "JHN";
    const ids = [store.primary, ...store.parallel];
    const main = shell("…", { back: false, actions: readerActions, wide: store.layout === "columns" });
    main.innerHTML = `<p class="empty">Loading…</p>`;
    const [primary, ...parallels] = await Promise.all(ids.map((id) => ensureBible(id).catch(() => null)));
    // A chapter can map into other KJV books (Synodal Daniel 3 holds the Song of the Three).
    const kjvBooks = new Set([book]);
    (primary?.books?.[book]?.[chapter - 1] || []).forEach((_, i) => {
      const k = primary && toKjv(primary.versification, `${book}.${chapter}.${i + 1}`);
      if (k) kjvBooks.add(parseRef(k).book);
    });
    ensureCommentary([...kjvBooks]).then(() => {
      if (route().view === "read") markCommentary();
    });
    const shown = parallels.filter(Boolean);
    store.last = { book, chapter };
    save();

    const b = bookById.get(book);
    document.getElementById("titleBtn")?.remove();
    const title = document.createElement("button");
    title.className = "title-btn";
    title.id = "titleBtn";
    title.textContent = `${b.en} ${chapter}`;
    title.onclick = () => go(`#/books/${book}`);
    app.querySelector(".topbar h1").replaceWith(title);

    const chips = [
      `<button class="chip primary" data-go="#/translations">${esc(catBible.get(store.primary)?.name || store.primary)}</button>`,
      ...shown.map((p) => `<button class="chip" data-go="#/translations">${esc(langName(p.lang))}</button>`),
      `<button class="chip add" data-go="#/translations">＋ language</button>`,
    ].join("");

    const verses = primary?.books?.[book]?.[chapter - 1];
    let body;
    if (!verses) {
      const others = CATALOG.bibles.filter((c) => c.id !== store.primary && hasChapter(BIBLES.get(c.id), book, chapter));
      body = `<p class="empty">${esc(primary?.name || store.primary)} does not include ${esc(b.en)} ${chapter}${primary?.sample ? " in its sample data" : ""}.</p>
        ${others.length ? `<p class="center muted">Available in: ${others.map((o) => `<a href="#" data-primary="${o.id}">${esc(o.name)}</a>`).join(", ")}</p>` : ""}`;
    } else {
      const cols = 1 + shown.length;
      const heads = `<div class="col-heads"><span></span><div>${[primary, ...shown].map((x) => `<span>${esc(x.name)}</span>`).join("")}</div></div>`;
      const rows = verses
        .map((text, i) => {
          if (text == null) return "";
          const ref = `${book}.${chapter}.${i + 1}`;
          const kref = kjvKey(primary, ref) || ref;
          const pars = shown
            .map((p) => {
              const t = parallelText(p, primary, ref);
              return `<div class="vtext par" lang="${esc(p.lang)}" dir="${esc(p.dir || "ltr")}"><span class="tag">${esc(p.lang)}</span>${t == null ? `<span class="missing">—</span>` : esc(t)}</div>`;
            })
            .join("");
          const hl = store.highlights[kref];
          return `<li class="verse ${hl ? "hl-" + hl : ""} ${focus === i + 1 ? "focus" : ""}" data-ref="${ref}" data-kref="${kref}" id="v${i + 1}">
            <span class="vnum">${i + 1}<span class="marks">${marks(kref)}</span></span>
            <div class="vcols"><div class="vtext" lang="${esc(primary.lang)}" dir="${esc(primary.dir || "ltr")}">${esc(text)}</div>${pars}</div>
          </li>`;
        })
        .join("");
      body = `${heads}<ol class="verses" style="--cols:${cols}">${rows}</ol>`;
    }

    const prev = neighbour(book, chapter, -1);
    const next = neighbour(book, chapter, +1);
    main.className = `${store.layout === "columns" ? "wide layout-columns" : ""}`;
    main.style.setProperty("--cols", 1 + shown.length);
    main.innerHTML = `
      <div class="chips">${chips}</div>
      ${primary?.sample ? `<div class="notice">Sample data: only a few chapters are installed until the full texts arrive.</div>` : ""}
      <h2 class="chapter-head">${esc(b.en)} ${chapter}</h2>
      ${body}
      <div class="pager">
        <button class="btn" ${prev ? `data-go="#/read/${prev.book}/${prev.chapter}"` : "disabled"}>‹ ${prev ? esc(bookById.get(prev.book).en + " " + prev.chapter) : ""}</button>
        <button class="btn" ${next ? `data-go="#/read/${next.book}/${next.chapter}"` : "disabled"}>${next ? esc(bookById.get(next.book).en + " " + next.chapter) : ""} ›</button>
      </div>`;
    main.querySelectorAll("[data-go]").forEach((el) => (el.onclick = () => go(el.dataset.go)));
    main.querySelectorAll("[data-primary]").forEach((el) => (el.onclick = (e) => {
      e.preventDefault();
      setPrimary(el.dataset.primary);
      render();
    }));
    main.querySelectorAll(".verse").forEach((el) => (el.onclick = () => go(`#/verse/${el.dataset.ref}`)));
    markCommentary();
    if (focus) document.getElementById(`v${focus}`)?.scrollIntoView({ block: "center" });
    else window.scrollTo(0, 0);
  }
  function marks(kref) {
    return (store.bookmarks.includes(kref) ? "★" : "") + (store.notes[kref] ? "✎" : "") + (commentaryFor(kref).length ? "☩" : "");
  }
  function markCommentary() {
    document.querySelectorAll(".verse").forEach((el) => {
      el.querySelector(".marks").textContent = marks(el.dataset.kref);
    });
  }
  // Previous or next chapter, skipping books the primary Bible lacks.
  function neighbour(book, chapter, dir) {
    const primary = BIBLES.get(store.primary);
    const count = (id) => primary?.books?.[id]?.length || 0;
    let i = bookIndex.get(book);
    let c = chapter + dir;
    for (let guard = 0; guard < BOOKS.length * 2; guard++) {
      const id = BOOKS[i].id;
      if (c >= 1 && c <= count(id)) {
        if (hasChapter(primary, id, c)) return { book: id, chapter: c };
        c += dir;
        continue;
      }
      i += dir;
      if (i < 0 || i >= BOOKS.length) return null;
      c = dir > 0 ? 1 : count(BOOKS[i].id);
    }
    return null;
  }

  // ---- book and chapter picker ----
  const GROUPS = [
    ["law", "Law"], ["history", "History"], ["wisdom", "Wisdom"], ["prophets", "Prophets"],
    ["appendix", "Appendix"], ["gospels", "Gospels"], ["acts", "Acts"], ["epistles", "Epistles"], ["revelation", "Revelation"],
  ];
  async function renderBooks(bookId) {
    await ensureBible(store.primary).catch(() => null);
    const primary = BIBLES.get(store.primary);
    if (bookId && bookById.has(bookId)) {
      const b = bookById.get(bookId);
      const main = shell(b.en, { sub: b.alt || "" });
      const n = chapterCount(bookId);
      main.innerHTML = n
        ? `<div class="grid chapters">${Array.from({ length: n }, (_, i) => {
            const ok = hasChapter(primary, bookId, i + 1);
            const cur = store.last.book === bookId && store.last.chapter === i + 1;
            return `<button class="tile ${ok ? "" : "unavailable"} ${cur ? "current" : ""}" data-ch="${i + 1}">${i + 1}</button>`;
          }).join("")}</div>`
        : `<p class="empty">No installed translation includes ${esc(b.en)} yet.</p>`;
      main.querySelectorAll("[data-ch]").forEach((el) => (el.onclick = () => history.replaceState(null, "", `#/read/${bookId}/${el.dataset.ch}`) || render()));
      return;
    }
    const main = shell("Books", { sub: primary?.name || "" });
    const tile = (b) => {
      const ok = !!primary?.books?.[b.id]?.some(Boolean);
      return `<button class="tile ${ok ? "" : "unavailable"} ${store.last.book === b.id ? "current" : ""}" data-book="${b.id}">${esc(b.en)}${b.dc ? `<span class="dc" title="Read in the Church, outside the Hebrew canon">◆</span>` : ""}${b.alt ? `<span class="alt">${esc(b.alt)}</span>` : ""}</button>`;
    };
    const section = (label, list) => (list.length ? `<h2>${label}</h2><div class="grid">${list.map(tile).join("")}</div>` : "");
    main.innerHTML =
      `<p class="muted">Old Testament in the order of the Septuagint. ◆ marks the books the Church reads that are outside the Hebrew canon. Faded books are not in ${esc(primary?.name || "this translation")}.</p>` +
      `<h2 style="color:var(--accent)">Old Testament</h2>` +
      GROUPS.slice(0, 5).map(([g, label]) => section(label, BOOKS.filter((b) => b.group === g))).join("") +
      `<h2 style="color:var(--accent)">New Testament</h2>` +
      GROUPS.slice(5).map(([g, label]) => section(label, BOOKS.filter((b) => b.group === g))).join("");
    main.querySelectorAll("[data-book]").forEach((el) => (el.onclick = () => go(`#/books/${el.dataset.book}`)));
  }

  // ---- one verse in every language, with commentary and notes ----
  async function renderVerse(ref) {
    if (!/^[0-9A-Z]{3}\.\d+\.\d+$/.test(ref || "")) return go("#/read");
    const primary = await ensureBible(store.primary);
    const kref = kjvKey(primary, ref);
    const { book, chapter, verse } = parseRef(ref);
    const main = shell(refLabel(ref), { sub: primary.name });
    const draw = () => {
      const loaded = CATALOG.bibles.filter((c) => BIBLES.has(c.id));
      const unloaded = CATALOG.bibles.filter((c) => !BIBLES.has(c.id));
      const versions = loaded
        .map((c) => {
          const bible = BIBLES.get(c.id);
          const own = c.id === primary.id ? ref : fromKjv(bible.versification, kref);
          const t = verseText(bible, own);
          const renum = !own || own === ref ? "" : ` · ${esc(parseRef(own).book === book ? refLabel(own).replace(/^.* /, "") : refLabel(own))}`;
          return `<li class="card">
            <div class="label"><span><b>${esc(langName(c.lang))}</b> · ${esc(c.name)}${renum}</span>
              ${t && Speech.supported() ? `<button class="mini" data-say="${c.id}" aria-label="Read aloud">▶</button>` : ""}</div>
            <div class="body" lang="${esc(c.lang)}" dir="${esc(c.dir || "ltr")}">${t == null ? `<span class="muted">${bible.books?.[book] || bible.sample ? `Not in this translation${bible.sample ? "'s sample data" : ""}.` : `This translation does not include ${esc(bookById.get(book).en)}.`}</span>` : esc(t)}</div>
          </li>`;
        })
        .join("");
      const fathers = kref ? commentaryFor(kref) : [];
      const fatherCard = ({ source, key, texts }) => `<li class="card father">
            <div class="label"><span><b>${esc(source.author)}</b>${source.work ? ` · ${esc(source.work)}` : ""}</span><span>${esc(key.replace(/^[0-9A-Z]{3}\./, "").replace(".", ":"))}</span></div>
            ${texts.map((t) => `<div class="body">${esc(t)}</div>`).join("")}
            <div class="src">${esc([source.translator && `Tr. ${source.translator}`, source.license].filter(Boolean).join(" · "))}</div>
          </li>`;
      const fatherCards = TRADITIONS.map(([t, label]) => {
        const list = fathers.filter((f) => (f.source.tradition || "east") === t);
        return list.length ? `<h3 class="trad">${label}</h3><ul class="cards">${list.map(fatherCard).join("")}</ul>` : "";
      }).join("");
      const hl = store.highlights[kref];
      const marked = store.bookmarks.includes(kref);
      main.innerHTML = `
        <div class="row-actions">
          <button class="btn small" data-go="#/read/${book}/${chapter}/${verse}">Open in chapter</button>
          <button class="btn small" id="bmBtn">${marked ? "★ Bookmarked" : "☆ Bookmark"}</button>
          <button class="btn small" id="copyBtn">Copy</button>
        </div>
        <div class="swatches" aria-label="Highlight">
          <button class="swatch none ${hl ? "" : "on"}" data-hl="" title="No highlight">✕</button>
          ${HL_COLORS.map((c) => `<button class="swatch ${hl === c ? "on" : ""}" style="background:var(--hl-${c})" data-hl="${c}" title="${c}"></button>`).join("")}
        </div>
        <h2>In every language</h2>
        <ul class="cards">${versions}</ul>
        ${unloaded.length ? `<div class="row-actions">${unloaded.map((c) => `<button class="btn small" data-load="${c.id}">＋ ${esc(langName(c.lang))}: ${esc(c.name)}</button>`).join("")}
          ${unloaded.length > 1 ? `<button class="btn small primary" id="loadAll">Show all</button>` : ""}</div>` : ""}
        <h2>The Fathers on this verse</h2>
        ${fatherCards ? fatherCards : `<p class="muted">${CATALOG.commentary.length ? "No patristic commentary on this verse in the installed sources." : "No patristic commentary is installed yet."}</p>`}
        <h2>My note</h2>
        <textarea id="note" placeholder="Write a note on this verse…">${esc(store.notes[kref] || "")}</textarea>`;
      main.querySelectorAll("[data-go]").forEach((el) => (el.onclick = () => go(el.dataset.go)));
      main.querySelectorAll("[data-say]").forEach((el) => (el.onclick = () => {
        const bible = BIBLES.get(el.dataset.say);
        const own = bible.id === primary.id ? ref : fromKjv(bible.versification, kref);
        if (!Speech.speak(verseText(bible, own), bible.lang)) toast(`No ${langName(bible.lang)} voice on this device`);
      }));
      main.querySelectorAll("[data-load]").forEach((el) => (el.onclick = async () => {
        el.disabled = true;
        await ensureBible(el.dataset.load).catch(() => toast("Could not load that translation"));
        draw();
      }));
      const all = main.querySelector("#loadAll");
      if (all) all.onclick = async () => {
        all.disabled = true;
        await Promise.all(unloaded.map((c) => ensureBible(c.id).catch(() => null)));
        draw();
      };
      main.querySelectorAll("[data-hl]").forEach((el) => (el.onclick = () => {
        if (!kref) return toast("This verse has no standard number to save against");
        if (el.dataset.hl) store.highlights[kref] = el.dataset.hl;
        else delete store.highlights[kref];
        save();
        draw();
      }));
      main.querySelector("#bmBtn").onclick = () => {
        if (!kref) return toast("This verse has no standard number to save against");
        store.bookmarks = marked ? store.bookmarks.filter((k) => k !== kref) : [kref, ...store.bookmarks];
        save();
        draw();
      };
      main.querySelector("#copyBtn").onclick = () => {
        const lines = loaded
          .map((c) => {
            const bible = BIBLES.get(c.id);
            const t = verseText(bible, c.id === primary.id ? ref : fromKjv(bible.versification, kref));
            return t ? `${t} (${c.name})` : null;
          })
          .filter(Boolean);
        const text = `${refLabel(ref)}\n${lines.join("\n")}`;
        navigator.clipboard?.writeText(text).then(() => toast("Copied"), () => toast("Copy is not available here"));
      };
      const note = main.querySelector("#note");
      note.oninput = () => {
        if (!kref) return;
        const v = note.value.trim();
        if (v) store.notes[kref] = note.value;
        else delete store.notes[kref];
        save();
      };
    };
    main.innerHTML = `<p class="empty">Loading…</p>`;
    await Promise.all([...store.parallel.map((id) => ensureBible(id).catch(() => null)), ensureCommentary([book, kref && parseRef(kref).book].filter(Boolean))]);
    draw();
  }

  // ---- search ----
  let lastQuery = "";
  async function renderSearch() {
    const main = shell("Search");
    const opts = CATALOG.bibles.map((c) => `<option value="${c.id}" ${c.id === store.primary ? "selected" : ""}>${esc(c.name)}</option>`).join("");
    main.innerHTML = `
      <input class="search" id="q" type="search" placeholder="Words or a reference like John 3:16" value="${esc(lastQuery)}" autocomplete="off">
      <div class="setting"><span class="what">Search in</span><select id="in">${opts}</select></div>
      <ul class="results" id="results"></ul>`;
    const q = main.querySelector("#q");
    const sel = main.querySelector("#in");
    const out = main.querySelector("#results");
    let timer;
    const run = async () => {
      lastQuery = q.value;
      const query = q.value.trim();
      if (!query) return (out.innerHTML = "");
      const jump = parseTypedRef(query);
      const bible = await ensureBible(sel.value).catch(() => null);
      if (!bible) return (out.innerHTML = `<p class="empty">Could not load that translation.</p>`);
      const needle = fold(query);
      const hits = [];
      outer: for (const b of BOOKS) {
        const chapters = bible.books?.[b.id];
        if (!chapters) continue;
        for (let c = 0; c < chapters.length; c++) {
          const vs = chapters[c];
          if (!vs) continue;
          for (let v = 0; v < vs.length; v++) {
            if (vs[v] && fold(vs[v]).includes(needle)) {
              hits.push({ ref: `${b.id}.${c + 1}.${v + 1}`, text: vs[v] });
              if (hits.length >= 300) break outer;
            }
          }
        }
      }
      const jumpHtml = jump ? `<li class="result" data-ref="${jump}"><b>Go to ${esc(refLabel(jump))}</b></li>` : "";
      out.innerHTML =
        jumpHtml +
        (hits.length
          ? `<p class="muted">${hits.length >= 300 ? "First 300" : hits.length} verse${hits.length === 1 ? "" : "s"}</p>` +
            hits.map((h) => `<li class="result" data-ref="${h.ref}"><b>${esc(refLabel(h.ref))}</b><div class="t" lang="${esc(bible.lang)}">${highlight(h.text, needle)}</div></li>`).join("")
          : jump ? "" : `<p class="empty">No verses found.</p>`);
      out.querySelectorAll("[data-ref]").forEach((el) => (el.onclick = () => {
        if (sel.value !== store.primary) setPrimary(sel.value);
        const { book, chapter, verse } = parseRef(el.dataset.ref);
        go(`#/read/${book}/${chapter}/${verse}`);
      }));
    };
    q.oninput = () => {
      clearTimeout(timer);
      timer = setTimeout(run, 250);
    };
    sel.onchange = run;
    q.focus();
    if (lastQuery) run();
  }
  // "John 3:16", "jn 3 16", "Ps 50" -> BOOK.C.V
  function parseTypedRef(s) {
    const m = s.trim().match(/^(\d?\s*[^\d:]+?)\s*(\d+)(?:\s*[:.\s]\s*(\d+))?$/);
    if (!m) return null;
    const name = fold(m[1]).replace(/\s+/g, "");
    if (name.length < 2) return null;
    const b = BOOKS.find((x) => [x.en, x.alt, x.id].filter(Boolean).some((n) => fold(n).replace(/\s+/g, "").startsWith(name)));
    return b ? `${b.id}.${m[2]}.${m[3] || 1}` : null;
  }
  function highlight(text, needle) {
    const f = fold(text);
    const i = f.indexOf(needle);
    // Folding can change length (decomposed accents), so only mark when it lines up.
    if (i < 0 || f.length !== text.length) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + needle.length)) + "</mark>" + esc(text.slice(i + needle.length));
  }

  // ---- bookmarks, notes, highlights ----
  async function renderSaved() {
    const main = shell("Bookmarks & notes");
    const primary = await ensureBible(store.primary).catch(() => null);
    const krefs = [...new Set([...store.bookmarks, ...Object.keys(store.notes), ...Object.keys(store.highlights)])];
    const order = (k) => {
      const { book, chapter, verse } = parseRef(k);
      return (bookIndex.get(book) ?? 999) * 1e6 + chapter * 1e3 + verse;
    };
    krefs.sort((a, b) => order(a) - order(b));
    if (!krefs.length) {
      main.innerHTML = `<p class="empty">Tap any verse to bookmark it, highlight it or write a note.</p>`;
      return;
    }
    const own = (k) => (primary ? fromKjv(primary.versification, k) : k) || k;
    main.innerHTML = `
      <div class="row-actions"><button class="btn small" id="export">Export notes</button></div>
      <ul class="results">${krefs
        .map((k) => {
          const ref = own(k);
          const t = verseText(primary, ref);
          const hl = store.highlights[k];
          return `<li class="result" data-ref="${ref}" ${hl ? `style="border-left:6px solid var(--hl-${hl})"` : ""}>
            <b>${store.bookmarks.includes(k) ? "★ " : ""}${esc(refLabel(ref))}</b>
            ${t ? `<div class="t">${esc(t)}</div>` : ""}
            ${store.notes[k] ? `<div class="muted">✎ ${esc(store.notes[k])}</div>` : ""}
          </li>`;
        })
        .join("")}</ul>`;
    main.querySelectorAll("[data-ref]").forEach((el) => (el.onclick = () => go(`#/verse/${el.dataset.ref}`)));
    main.querySelector("#export").onclick = () => {
      const text = krefs
        .map((k) => {
          const ref = own(k);
          const t = verseText(primary, ref);
          return [`${refLabel(ref)}${store.bookmarks.includes(k) ? " ★" : ""}`, t, store.notes[k] && `Note: ${store.notes[k]}`].filter(Boolean).join("\n");
        })
        .join("\n\n");
      if (window.AndroidTTS?.saveFile) return window.AndroidTTS.saveFile("bible-notes.txt", text);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
      a.download = "bible-notes.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
  }

  // ---- translations and settings ----
  function setPrimary(id) {
    store.parallel = store.parallel.filter((p) => p !== id);
    store.primary = id;
    save();
  }
  function renderTranslations() {
    const main = shell("Translations & settings");
    const byLang = new Map();
    CATALOG.bibles.forEach((c) => {
      if (!byLang.has(c.lang)) byLang.set(c.lang, []);
      byLang.get(c.lang).push(c);
    });
    const rows = [...byLang.entries()]
      .map(([lang, list]) => `<h2>${esc(langName(lang))}</h2>` + list
        .map((c) => `<div class="setting">
            <span class="what">${esc(c.name)}<small>${esc([c.testaments, c.license].filter(Boolean).join(" · "))}</small></span>
            <span class="pick">
              <label>Main<input type="radio" name="primary" value="${c.id}" ${c.id === store.primary ? "checked" : ""}></label>
              <label>Beside<input type="checkbox" data-par="${c.id}" ${store.parallel.includes(c.id) ? "checked" : ""} ${c.id === store.primary ? "disabled" : ""}></label>
            </span>
          </div>`).join(""))
      .join("");
    // One switch per Father, even when his commentary is split over several files.
    const authors = new Map();
    CATALOG.commentary.forEach((c) => {
      if (!authors.has(c.author)) authors.set(c.author, []);
      authors.get(c.author).push(c);
    });
    const comm = TRADITIONS.map(([t, label]) => {
      const list = [...authors.values()].filter((cs) => (cs[0].tradition || "east") === t);
      return list.length ? `<h3 class="trad">${label}</h3>` + list
        .map((cs) => `<label class="setting"><span class="what">${esc(cs[0].author)}<small>${esc([...new Set(cs.map((c) => c.license).filter(Boolean))].join(" · "))}</small></span>
          <input type="checkbox" data-comm="${cs.map((c) => c.id).join(" ")}" ${cs.every((c) => store.hiddenCommentary.includes(c.id)) ? "" : "checked"}></label>`)
        .join("") : "";
    }).join("");
    main.innerHTML = `
      <p class="muted">Pick the main text, then tick any others to read beside it, verse by verse.</p>
      ${rows}
      <h2>Reading</h2>
      <label class="setting"><span class="what">Layout<small>Columns need a wide screen; phones always stack.</small></span>
        <select id="layout"><option value="stack">Stacked under each verse</option><option value="columns">Side-by-side columns</option></select></label>
      <label class="setting"><span class="what">Text size</span>
        <select id="size">${[0.9, 1, 1.05, 1.15, 1.3, 1.5].map((s) => `<option value="${s}" ${s === store.textSize ? "selected" : ""}>${Math.round(s * 100)}%</option>`).join("")}</select></label>
      <label class="setting"><span class="what">Theme</span>
        <select id="theme"><option value="auto">Match device</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
      ${comm ? `<h2>Patristic commentary</h2>${comm}` : ""}
      <div class="row-actions"><button class="btn" data-go="#/about">About & sources</button></div>`;
    main.querySelectorAll("[data-go]").forEach((el) => (el.onclick = () => go(el.dataset.go)));
    main.querySelector("#layout").value = store.layout;
    main.querySelector("#theme").value = store.theme;
    main.querySelectorAll("input[name=primary]").forEach((el) => (el.onchange = () => {
      setPrimary(el.value);
      renderTranslations();
    }));
    main.querySelectorAll("[data-par]").forEach((el) => (el.onchange = () => {
      const id = el.dataset.par;
      store.parallel = el.checked ? [...store.parallel, id] : store.parallel.filter((p) => p !== id);
      save();
    }));
    main.querySelectorAll("[data-comm]").forEach((el) => (el.onchange = () => {
      const ids = el.dataset.comm.split(" ");
      store.hiddenCommentary = store.hiddenCommentary.filter((c) => !ids.includes(c));
      if (!el.checked) store.hiddenCommentary.push(...ids);
      save();
    }));
    main.querySelector("#layout").onchange = (e) => {
      store.layout = e.target.value;
      save();
    };
    main.querySelector("#size").onchange = (e) => {
      store.textSize = +e.target.value;
      save();
      applyLook();
    };
    main.querySelector("#theme").onchange = (e) => {
      store.theme = e.target.value;
      save();
      applyLook();
    };
  }

  function renderAbout() {
    const main = shell("About & sources");
    const list = (items, fmt) => items.map((c) => `<li>${fmt(c)}${c.source ? ` · <a href="${esc(c.source.match(/https?:\/\/\S+/)?.[0] || "")}" target="_blank" rel="noopener">source</a>` : ""}</li>`).join("");
    main.innerHTML = `
      <p>SquirrelGo Orthodox Bible is an offline Bible reader for Orthodox study: the Septuagint canon and book order, any verse side by side in other languages, and commentary from the Church Fathers verse by verse.</p>
      <p class="muted">It uses only public-domain and openly licensed texts. It is not the Orthodox Study Bible and contains none of its text or notes, and it is not affiliated with Thomas Nelson, Ancient Faith, or the Catena app.</p>
      <h2>Bible texts</h2>
      <ul>${list(CATALOG.bibles, (c) => `<b>${esc(c.name)}</b> (${esc(langName(c.lang))}) · ${esc(c.license || "")}`)}</ul>
      <h2>Commentary</h2>
      ${CATALOG.commentary.length ? `<ul>${list(CATALOG.commentary, (c) => `<b>${esc(c.author)}</b>${c.work ? `, ${esc(c.work)}` : ""} · ${esc(c.license || "")}`)}</ul>` : `<p class="muted">None installed yet.</p>`}`;
  }

  render();
})();
