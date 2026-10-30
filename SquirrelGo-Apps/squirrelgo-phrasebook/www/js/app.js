(() => {
  const PACKS = window.PHRASEBOOK_PACKS;
  const { romanize, toHiragana } = window.Romaji;
  const STORE_KEY = "squirrelgo-phrasebook";

  // Flatten phrases once, with derived fields used for display and search.
  const ALL = [];
  PACKS.forEach((pack) => {
    pack.categories.forEach((cat, ci) => {
      cat.id = String(ci);
      cat.items = cat.phrases.map(([en, ja, kana, note]) => {
        const item = {
          key: `${pack.id}|${ja}`,
          pack,
          cat,
          en,
          ja,
          reading: kana.replace(/\s+/g, "").replace(/([、])/g, "$1"),
          spoken: kana,
          romaji: romanize(kana),
          note: note || "",
        };
        item.search = [
          en.toLowerCase(),
          item.romaji.toLowerCase().replace(/['\s]/g, ""),
          ja,
          toHiragana(item.reading),
        ].join("\n");
        ALL.push(item);
        return item;
      });
    });
  });
  const byKey = new Map(ALL.map((p) => [p.key, p]));

  // ---- persistence ----
  const defaults = {
    showKanji: true,
    showKana: true,
    showRomaji: true,
    rate: 1,
    flashDir: "en-ja",
    flashAutoplay: true,
    favorites: [],
    learned: {},
  };
  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
    } catch {
      return Object.assign({}, defaults);
    }
  }
  const store = load();
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {}
  }
  const isFav = (key) => store.favorites.includes(key);
  function toggleFav(key) {
    if (isFav(key)) store.favorites = store.favorites.filter((k) => k !== key);
    else store.favorites.push(key);
    save();
  }

  // ---- navigation ----
  const state = { view: "home", stack: [], pack: null, cat: null, query: "", flash: null };
  function navigate(view, patch = {}) {
    state.stack.push({ view: state.view, pack: state.pack, cat: state.cat });
    Object.assign(state, patch, { view });
    render();
    window.scrollTo(0, 0);
  }
  function goBack() {
    const prev = state.stack.pop();
    if (!prev) return;
    Speech.stop();
    Object.assign(state, prev);
    render();
  }

  // ---- helpers ----
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const app = document.getElementById("app");
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function play(item, slow) {
    const ok = Speech.speak(item.spoken, (slow ? 0.6 : 1) * store.rate);
    if (!ok) toast("No Japanese voice found. Install a Japanese text-to-speech voice in your system settings.");
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const learnedCount = (items) => items.filter((p) => store.learned[p.key]).length;
  const packItems = (pack) => ALL.filter((p) => p.pack === pack);

  function topbar(title, sub) {
    return `<header class="topbar">
      <button id="backBtn" class="back-btn ${state.stack.length ? "" : "hidden"}" aria-label="Back">‹</button>
      <h1>${esc(title)}${sub ? `<span class="sub">${esc(sub)}</span>` : ""}</h1>
      <button class="icon-btn" data-suite="open" aria-label="SquirrelGo apps">▦</button>
      <button class="icon-btn" data-act="settings" aria-label="Settings">⚙</button>
    </header>`;
  }

  function phraseRow(p, { showPack = false } = {}) {
    const showReading = store.showKana && p.reading !== p.ja;
    return `<li class="phrase" data-key="${esc(p.key)}">
      <div class="ph-text">
        ${showPack ? `<div class="ph-tag">${esc(p.pack.title)} · ${esc(p.cat.title)}</div>` : ""}
        <div class="en">${esc(p.en)}</div>
        ${store.showKanji ? `<div class="ja" lang="ja">${esc(p.ja)}</div>` : ""}
        ${showReading || (!store.showKanji && store.showKana) ? `<div class="kana" lang="ja">${esc(p.reading)}</div>` : ""}
        ${store.showRomaji ? `<div class="romaji">${esc(p.romaji)}</div>` : ""}
        ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
      </div>
      <div class="ph-actions">
        <button class="round play" data-act="play" aria-label="Play">▶</button>
        <button class="round slow" data-act="slow" aria-label="Play slowly" title="Slow">½</button>
        <button class="round star ${isFav(p.key) ? "on" : ""}" data-act="fav" aria-label="Favorite">${isFav(p.key) ? "★" : "☆"}</button>
      </div>
    </li>`;
  }

  // ---- views ----
  function viewHome() {
    const q = state.query.trim();
    let body;
    if (q) {
      const needle = q.toLowerCase().replace(/['\s]/g, "");
      const kanaNeedle = toHiragana(q);
      const hits = ALL.filter((p) => p.search.includes(needle) || p.search.includes(kanaNeedle));
      body = hits.length
        ? `<p class="muted">${hits.length} match${hits.length === 1 ? "" : "es"}</p><ul class="phrases">${hits
            .slice(0, 150)
            .map((p) => phraseRow(p, { showPack: true }))
            .join("")}</ul>`
        : `<p class="empty">No phrases match “${esc(q)}”.</p>`;
    } else {
      body = `<div class="packs">${PACKS.map((pack) => {
        const items = packItems(pack);
        const pct = Math.round((learnedCount(items) / items.length) * 100);
        return `<button class="pack" data-pack="${pack.id}">
          <span class="pack-ja" lang="ja">${esc(pack.jaTitle)}</span>
          <span class="pack-title">${esc(pack.title)}</span>
          <span class="pack-desc">${esc(pack.desc)}</span>
          <span class="pack-meta">${items.length} phrases · ${pct}% learned</span>
          <span class="bar"><span style="width:${pct}%"></span></span>
        </button>`;
      }).join("")}</div>
      <div class="row-actions">
        <button class="btn" data-act="favorites">★ Favorites (${store.favorites.length})</button>
        <button class="btn" data-act="flash-all">Flashcards: all packs</button>
      </div>`;
    }
    return `${topbar("SquirrelGo Phrasebook", "Japanese · 日本語")}
      <main>
        <input id="search" class="search" type="search" placeholder="Search English, romaji, kana or kanji" value="${esc(state.query)}" autocomplete="off">
        ${body}
      </main>`;
  }

  function viewPack() {
    const pack = state.pack;
    const items = packItems(pack);
    return `${topbar(pack.title, `${pack.jaTitle} · ${items.length} phrases`)}
      <main>
        <p class="muted">${esc(pack.desc)}</p>
        <div class="row-actions">
          <button class="btn primary" data-act="flash-pack">Flashcards</button>
        </div>
        <ul class="cats">${pack.categories
          .map(
            (c) => `<li><button class="cat" data-cat="${c.id}">
              <span>${esc(c.title)}</span>
              <span class="muted">${learnedCount(c.items)}/${c.items.length}</span>
            </button></li>`
          )
          .join("")}</ul>
      </main>`;
  }

  function viewCategory() {
    const { pack, cat } = state;
    return `${topbar(cat.title, pack.title)}
      <main>
        <div class="row-actions">
          <button class="btn primary" data-act="flash-cat">Flashcards</button>
        </div>
        <ul class="phrases">${cat.items.map((p) => phraseRow(p)).join("")}</ul>
      </main>`;
  }

  function viewFavorites() {
    const items = store.favorites.map((k) => byKey.get(k)).filter(Boolean);
    return `${topbar("Favorites", `${items.length} saved`)}
      <main>
        ${
          items.length
            ? `<div class="row-actions"><button class="btn primary" data-act="flash-fav">Flashcards</button></div>
               <ul class="phrases">${items.map((p) => phraseRow(p, { showPack: true })).join("")}</ul>`
            : `<p class="empty">Tap ☆ on any phrase to save it here.</p>`
        }
      </main>`;
  }

  function startFlash(title, items) {
    if (!items.length) return toast("No phrases to study.");
    state.flash = { title, queue: shuffle(items), total: items.length, done: 0, revealed: false };
    navigate("flash");
  }

  function viewFlash() {
    const f = state.flash;
    const card = f.queue[0];
    if (!card) {
      return `${topbar(f.title, "Flashcards")}
        <main class="center">
          <p class="big">お疲れさまでした！</p>
          <p class="muted">Otsukaresama deshita! You went through all ${f.total} cards.</p>
          <button class="btn primary" data-act="back">Done</button>
        </main>`;
    }
    const jaSide = `<div class="ja big" lang="ja">${esc(card.ja)}</div>
      ${card.reading !== card.ja ? `<div class="kana" lang="ja">${esc(card.reading)}</div>` : ""}
      <div class="romaji">${esc(card.romaji)}</div>`;
    const enSide = `<div class="en big">${esc(card.en)}</div>`;
    const front = store.flashDir === "en-ja" ? enSide : jaSide;
    const back = store.flashDir === "en-ja" ? jaSide : enSide;
    return `${topbar(f.title, `${f.done}/${f.total} done`)}
      <main>
        <div class="bar wide"><span style="width:${Math.round((f.done / f.total) * 100)}%"></span></div>
        <div class="card" data-key="${esc(card.key)}">
          <div class="ph-tag">${esc(card.pack.title)} · ${esc(card.cat.title)}</div>
          <div class="face">${front}</div>
          ${f.revealed ? `<hr><div class="face">${back}</div>${card.note ? `<div class="note">${esc(card.note)}</div>` : ""}` : ""}
          <div class="card-tools">
            <button class="round play" data-act="play" aria-label="Play">▶</button>
            <button class="round slow" data-act="slow" aria-label="Play slowly">½</button>
          </div>
        </div>
        ${
          f.revealed
            ? `<div class="grade"><button class="btn again" data-act="again">Again</button><button class="btn good" data-act="good">Got it</button></div>`
            : `<button class="btn primary block" data-act="reveal">Show answer</button>`
        }
        <p class="muted center-text">Direction: ${store.flashDir === "en-ja" ? "English → Japanese" : "Japanese → English"} (change in ⚙)</p>
      </main>`;
  }

  function viewSettings() {
    const toggle = (key, label) =>
      `<label class="setting"><span>${label}</span><input type="checkbox" data-set="${key}" ${store[key] ? "checked" : ""}></label>`;
    return `${topbar("Settings")}
      <main>
        <h2>Show</h2>
        ${toggle("showKanji", "Japanese (kanji & kana)")}
        ${toggle("showKana", "Kana reading")}
        ${toggle("showRomaji", "Romaji")}
        <h2>Audio</h2>
        <label class="setting"><span>Speech speed</span>
          <select data-set="rate">
            ${[0.7, 0.85, 1, 1.15].map((r) => `<option value="${r}" ${store.rate == r ? "selected" : ""}>${r}×</option>`).join("")}
          </select></label>
        <p class="muted">Voice: ${Speech.available() ? "Japanese voice ready" : "no Japanese voice detected yet — install one in your system's text-to-speech settings"}</p>
        <button class="btn" data-act="test-voice">Test voice</button>
        <h2>Flashcards</h2>
        <label class="setting"><span>Direction</span>
          <select data-set="flashDir">
            <option value="en-ja" ${store.flashDir === "en-ja" ? "selected" : ""}>English → Japanese</option>
            <option value="ja-en" ${store.flashDir === "ja-en" ? "selected" : ""}>Japanese → English</option>
          </select></label>
        ${toggle("flashAutoplay", "Speak Japanese when shown")}
        <h2>Data</h2>
        <button class="btn" data-act="export">Export all phrases (Anki CSV)</button>
        <button class="btn" data-act="reset">Reset learned progress</button>
        <h2>About</h2>
        <p class="muted">SquirrelGo Phrasebook is part of LanguageStudentDesk. ${ALL.length} original phrases in six packs: ${PACKS.map((p) => esc(p.title)).join(", ")}. Works offline. Audio uses your device's Japanese text-to-speech voice.</p>
      </main>`;
  }

  function render() {
    const views = { home: viewHome, pack: viewPack, cat: viewCategory, favorites: viewFavorites, flash: viewFlash, settings: viewSettings };
    app.innerHTML = views[state.view]();
    // Speak the Japanese side the moment it first appears on a flashcard.
    if (state.view === "flash" && store.flashAutoplay) {
      const f = state.flash;
      const card = f.queue[0];
      const jaJustShown = store.flashDir === "ja-en" ? !f.revealed : f.revealed;
      if (card && jaJustShown) play(card);
    }
  }

  // ---- export ----
  function exportCsv() {
    const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = ALL.map((p) =>
      [q(p.ja), q(`${p.reading}<br>${p.romaji}<br>${p.en}${p.note ? `<br><i>${p.note}</i>` : ""}`), q(`${p.pack.id} ${p.pack.id}::${p.cat.title.replace(/\W+/g, "_")}`)].join(",")
    );
    const csv = "#separator:comma\n#html:true\n#tags column:3\n" + lines.join("\n") + "\n";
    if (window.AndroidTTS?.saveFile) {
      window.AndroidTTS.saveFile("squirrelgo-phrasebook.csv", csv);
      return;
    }
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "squirrelgo-phrasebook.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---- events ----
  app.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.id === "backBtn") return goBack();
    if (t.dataset.pack) return navigate("pack", { pack: PACKS.find((p) => p.id === t.dataset.pack) });
    if (t.dataset.cat) return navigate("cat", { cat: state.pack.categories[+t.dataset.cat] });
    const act = t.dataset.act;
    const keyEl = t.closest("[data-key]");
    const item = keyEl && byKey.get(keyEl.dataset.key);
    switch (act) {
      case "settings":
        if (state.view !== "settings") navigate("settings");
        break;
      case "favorites":
        navigate("favorites");
        break;
      case "play":
        play(item);
        break;
      case "slow":
        play(item, true);
        break;
      case "fav":
        toggleFav(item.key);
        t.classList.toggle("on", isFav(item.key));
        t.textContent = isFav(item.key) ? "★" : "☆";
        if (state.view === "favorites") render();
        break;
      case "flash-all":
        startFlash("All packs", ALL);
        break;
      case "flash-pack":
        startFlash(state.pack.title, packItems(state.pack));
        break;
      case "flash-cat":
        startFlash(state.cat.title, state.cat.items);
        break;
      case "flash-fav":
        startFlash("Favorites", store.favorites.map((k) => byKey.get(k)).filter(Boolean));
        break;
      case "reveal":
        state.flash.revealed = true;
        render();
        break;
      case "good": {
        const f = state.flash;
        const card = f.queue.shift();
        store.learned[card.key] = Date.now();
        save();
        f.done++;
        f.revealed = false;
        render();
        break;
      }
      case "again": {
        const f = state.flash;
        const card = f.queue.shift();
        f.queue.splice(Math.min(f.queue.length, 3 + Math.floor(Math.random() * 3)), 0, card);
        f.revealed = false;
        render();
        break;
      }
      case "back":
        goBack();
        break;
      case "test-voice":
        play({ spoken: "こんにちは。 にほんご の れんしゅう を しましょう。" });
        break;
      case "export":
        exportCsv();
        break;
      case "reset":
        if (confirm("Clear all learned progress? Favorites are kept.")) {
          store.learned = {};
          save();
          toast("Progress cleared.");
        }
        break;
    }
  });

  app.addEventListener("input", (e) => {
    if (e.target.id === "search") {
      state.query = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const s = document.getElementById("search");
      s.focus();
      s.setSelectionRange(pos, pos);
    }
  });

  app.addEventListener("change", (e) => {
    const key = e.target.dataset.set;
    if (!key) return;
    if (e.target.type === "checkbox") store[key] = e.target.checked;
    else store[key] = key === "rate" ? parseFloat(e.target.value) : e.target.value;
    save();
  });

  // Android back button hook (see MainActivity) and browser keyboard shortcut.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.stack.length) goBack();
  });

  render();

  // Another SquirrelGo app (the Dictionary) sent a word: show phrases using it.
  SquirrelGoSuite.onQuery((q) => {
    Object.assign(state, { view: "home", stack: [], query: q });
    render();
    window.scrollTo(0, 0);
  });
})();
