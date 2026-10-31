// Vocabulary Learner: review (spaced repetition), flashcards, decks, your own
// words, Anki export. Progress lives in localStorage under lsd-vocab-v1; card
// keys start with "<lang>:" so other Desk tools can count what is due.
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const today = () => new Date().toLocaleDateString("sv"); // YYYY-MM-DD, local time

  const store = LSD.store("lsd-vocab-v1", { cards: {}, settings: {}, enabled: {}, custom: {}, daily: {}, history: {} });
  const db = store.load();
  db.settings = Object.assign({ newPerDay: 15, direction: "recognize", piqad: true }, db.settings);
  const save = () => store.save(db);

  let lang = null; // current language id
  let meta = null; // its meta.json
  let decks = []; // loaded decks, plus "mine"
  let tab = "review";

  // FNV-1a, base 36: short stable ids for cards.
  function hash(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
    return (h >>> 0).toString(36);
  }

  function prepare(deck) {
    deck.cards.forEach((c) => (c.id = lang + ":" + deck.id + "/" + hash(c.front + "\u0001" + c.back)));
    return deck;
  }

  function mineDeck() {
    const words = db.custom[lang] || [];
    return prepare({ id: "mine", title: "My words", group: "Your words", cards: words.map((w) => Object.assign({ speak: w.front }, w)) });
  }

  // ---------- language selection ----------

  async function init() {
    const metas = await LSD.all();
    const withWords = metas.filter((m) => VOCAB_SOURCES[m.id]);
    LSD.picker($("langSelect"), metas, null, (id) => openLang(id), "Choose…");
    const wanted = LSD.param();
    renderHome(withWords, metas);
    await openLang(wanted);
  }

  function renderHome(withWords, metas) {
    const others = metas.filter((m) => !VOCAB_SOURCES[m.id]);
    $("langGrid").innerHTML =
      withWords.map((m) => tile(m, dueCount(m.id))).join("") +
      others.map((m) => tile(m, null)).join("");
    $("langGrid").querySelectorAll("[data-lang]").forEach((b) => (b.onclick = () => {
      LSD.setParam(b.dataset.lang);
      $("langSelect").value = b.dataset.lang;
      openLang(b.dataset.lang);
    }));
  }

  function tile(m, due) {
    const sub = due == null ? "Your own words only, for now" : due ? due + " due for review" : "Nothing due";
    const big = m.font === "pIqaD" ? '<span class="piqad">' + LSD.piqad("tlhIngan Hol") + "</span>" : esc(m.nativeName || m.name);
    return '<button class="tile" data-lang="' + esc(m.id) + '"><span class="big">' + big + "</span><b>" + esc(m.name) + '</b><br><span class="sub">' + sub + "</span></button>";
  }

  function dueCount(id) {
    const now = Date.now();
    let n = 0;
    for (const k in db.cards) if (k.startsWith(id + ":") && db.cards[k].due <= now) n++;
    return n;
  }

  async function openLang(id) {
    meta = id ? await LSD.get(id) : null;
    $("langSelect").value = meta ? meta.id : "";
    const showHome = !meta;
    $("langHome").hidden = !showHome;
    $("tabs").hidden = showHome;
    document.querySelectorAll("[data-view]").forEach((v) => (v.hidden = true));
    if (showHome) {
      lang = null;
      $("title").innerHTML = "Vocabulary Learner";
      $("subtitle").textContent = id ? "No language called “" + id + "” in languages/. Pick one below." : "Flashcards and spaced review with words from the SquirrelGo apps. Export any deck to Anki.";
      document.title = "Vocabulary Learner — Language Student Desk";
      return;
    }
    lang = meta.id;
    document.body.className = "lang-" + lang;
    $("title").innerHTML = "Vocabulary Learner <small>" + esc(meta.name) + (meta.nativeName ? " · " + esc(meta.nativeName) : "") + "</small>";
    $("subtitle").textContent = VOCAB_SOURCES[lang] ? "Spaced review, flashcards and Anki export." : "No built-in words for " + meta.name + " yet. Add your own in the Add words tab.";
    document.title = "Vocabulary · " + meta.name + " — Language Student Desk";
    $("loading").hidden = false;
    const { decks: loaded, errors } = await loadVocabDecks(lang);
    if (lang !== meta.id) return; // switched again while loading
    $("loading").hidden = true;
    decks = loaded.map(prepare);
    decks.push(mineDeck());
    if (!db.enabled[lang]) db.enabled[lang] = defaultEnabled();
    $("sourceErrors").innerHTML = errors.length ? '<p class="notice small">Some word sources did not load: ' + errors.map(esc).join("; ") + "</p>" : "";
    $("piqadOpt").hidden = meta.font !== "pIqaD";
    $("dictCard").hidden = lang !== "japanese";
    showTab(tab);
  }

  // Small groups are switched on whole; big ones start with their first deck.
  function defaultEnabled() {
    const on = ["mine"];
    const groups = {};
    decks.forEach((d) => (groups[d.group] = groups[d.group] || []).push(d));
    Object.values(groups).forEach((list) => {
      const total = list.reduce((n, d) => n + d.cards.length, 0);
      (total <= 200 ? list : list.slice(0, 1)).forEach((d) => on.push(d.id));
    });
    return on;
  }

  // ---------- tabs ----------

  document.querySelectorAll("#tabs button").forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));

  function showTab(name) {
    tab = name;
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll("[data-view]").forEach((v) => (v.hidden = v.dataset.view !== name));
    ({ review: startReview, flash: renderFlash, decks: renderDecks, add: renderAdd, export: renderExport })[name]();
    updateBadge();
  }

  function updateBadge() {
    if (!lang) return;
    const n = dueCount(lang);
    $("dueBadge").hidden = !n;
    $("dueBadge").textContent = n;
  }

  // ---------- card faces ----------

  function wordHtml(card) {
    const long = card.front.length > 12;
    let inner = esc(card.front);
    if (meta.font === "pIqaD" && db.settings.piqad) inner = '<span class="piqad">' + esc(LSD.piqad(card.front)) + "</span>" + inner;
    const dir = meta.direction === "rtl" ? ' dir="rtl"' : "";
    return '<div class="front target' + (long ? " long" : "") + '"' + dir + ">" + inner + "</div>";
  }

  function face(card, deck, askWord, revealed) {
    const word = wordHtml(card);
    const reading = card.reading ? '<div class="reading">' + esc(card.reading) + "</div>" : "";
    const meaning = '<div class="back">' + esc(card.back) + "</div>";
    const note = card.note ? '<div class="note">' + esc(card.note) + "</div>" : "";
    const top = '<div class="deck">' + esc(deck.title) + "</div>";
    if (askWord) return top + word + (revealed ? "<hr>" + reading + meaning + note : "");
    return top + '<div class="front english">' + esc(card.back) + "</div>" + (revealed ? "<hr>" + word + reading + note : "");
  }

  function speakCard(card) {
    if (card && card.speak) LSD.speak(card.speak, meta);
  }

  // ---------- review ----------

  let queue = [];
  let current = null;
  let revealed = false;

  function directions() {
    return db.settings.direction === "both" ? ["", ">"] : db.settings.direction === "produce" ? [">"] : [""];
  }

  function newToday() {
    const d = db.daily[lang];
    return d && d.date === today() ? d.newSeen : 0;
  }

  function startReview() {
    $("newPerDay").value = db.settings.newPerDay;
    $("direction").value = db.settings.direction;
    $("piqad").checked = db.settings.piqad;
    const now = Date.now();
    const on = new Set(db.enabled[lang]);
    const due = [];
    const fresh = [];
    let budget = Math.max(0, db.settings.newPerDay - newToday());
    for (const deck of decks) {
      if (!on.has(deck.id)) continue;
      for (const card of deck.cards) {
        for (const dir of directions()) {
          const key = card.id + dir;
          const st = db.cards[key];
          if (st) {
            if (st.due <= now + 20 * SRS.MIN) due.push({ key, card, deck, dir });
          } else if (budget > 0 && !fresh.some((x) => x.key === key)) {
            fresh.push({ key, card, deck, dir });
            budget--;
          }
        }
      }
    }
    due.sort((a, b) => db.cards[a.key].due - db.cards[b.key].due);
    queue = due.concat(fresh);
    nextCard();
  }

  // Due cards first (earliest first), then new ones; a learning card that
  // isn't due yet is shown early only when nothing else is left.
  function pick() {
    const now = Date.now();
    let best = -1;
    for (let i = 0; i < queue.length; i++) {
      const st = db.cards[queue[i].key];
      if (st && st.due <= now) return i;
      if (!st && best === -1) best = i;
    }
    if (best !== -1) return best;
    let soonest = -1;
    queue.forEach((q, i) => {
      if (soonest === -1 || db.cards[q.key].due < db.cards[queue[soonest].key].due) soonest = i;
    });
    return soonest;
  }

  function nextCard() {
    const i = pick();
    current = i === -1 ? null : queue.splice(i, 1)[0];
    revealed = false;
    renderReview();
  }

  function renderCounts() {
    let n = 0, l = 0, r = 0;
    for (const q of queue.concat(current ? [current] : [])) {
      const st = db.cards[q.key];
      if (!st) n++;
      else if (st.ivl === 0) l++;
      else r++;
    }
    $("counts").innerHTML = '<span class="n">New <b>' + n + '</b></span><span class="l">Learning <b>' + l + '</b></span><span class="r">Review <b>' + r + "</b></span>";
  }

  function renderReview() {
    renderCounts();
    const box = $("reviewCard");
    if (!current) {
      const enabled = (db.enabled[lang] || []).filter((id) => decks.some((d) => d.id === id && d.cards.length));
      box.innerHTML = enabled.length
        ? '<div class="flash"><div class="front english">All done for now 🎉</div><p class="muted">' + reviewSummary() + '</p><div class="row" style="justify-content:center"><button id="moreNew">Learn 10 more new words</button><button id="goFlash">Flashcards</button></div></div>'
        : '<div class="flash"><div class="front english">No decks switched on</div><p class="muted">Tick some decks in the Decks tab' + (lang && !VOCAB_SOURCES[lang] ? ", or add your own words" : "") + '.</p><div class="row" style="justify-content:center"><button id="goDecks" class="primary">Choose decks</button></div></div>';
      const more = $("moreNew");
      if (more) more.onclick = () => {
        db.settings.newPerDay = Math.max(db.settings.newPerDay, newToday() + 10);
        save();
        startReview();
      };
      if ($("goFlash")) $("goFlash").onclick = () => showTab("flash");
      if ($("goDecks")) $("goDecks").onclick = () => showTab("decks");
      updateBadge();
      return;
    }
    const st = db.cards[current.key] || SRS.fresh();
    const askWord = current.dir === "";
    let html = '<div class="flash">' + face(current.card, current.deck, askWord, revealed) + "</div>";
    if (!revealed) {
      html += '<div class="show-row"><button class="primary" id="showBtn">Show answer</button>' + (LSD.canSpeak(meta) && current.card.speak && askWord ? '<button id="speakBtn">🔊</button>' : "") + "</div>";
    } else {
      const labels = [["again", "Again"], ["hard", "Hard"], ["good", "Good"], ["easy", "Easy"]];
      html += '<div class="answer-row">' + labels.map((l, i) => '<button class="' + l[0] + '" data-r="' + (i + 1) + '">' + l[1] + "<small>" + SRS.preview(st, i + 1) + "</small></button>").join("") + "</div>";
      if (LSD.canSpeak(meta) && current.card.speak) html += '<div class="show-row"><button id="speakBtn">🔊 Listen</button></div>';
    }
    box.innerHTML = html;
    if ($("showBtn")) $("showBtn").onclick = reveal;
    if ($("speakBtn")) $("speakBtn").onclick = () => speakCard(current.card);
    box.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => rate(+b.dataset.r)));
  }

  function reviewSummary() {
    const h = (db.history[lang] || {})[today()] || 0;
    const later = Object.entries(db.cards).filter(([k, s]) => k.startsWith(lang + ":") && s.due > Date.now());
    const next = later.length ? Math.min(...later.map(([, s]) => s.due)) : 0;
    return (h ? "You reviewed " + h + " card" + (h === 1 ? "" : "s") + " today. " : "") + (next ? "Next card due in " + SRS.describe(next - Date.now()) + "." : "");
  }

  function reveal() {
    revealed = true;
    renderReview();
    if (current.dir === ">") speakCard(current.card);
  }

  function rate(r) {
    if (!current || !revealed) return;
    const wasNew = !db.cards[current.key];
    const st = SRS.answer(db.cards[current.key], r);
    db.cards[current.key] = st;
    if (wasNew) {
      const d = db.daily[lang];
      db.daily[lang] = { date: today(), newSeen: (d && d.date === today() ? d.newSeen : 0) + 1 };
    }
    const hist = (db.history[lang] = db.history[lang] || {});
    hist[today()] = (hist[today()] || 0) + 1;
    save();
    // Learning cards come back in this session.
    if (st.due <= Date.now() + 20 * SRS.MIN) queue.push(current);
    nextCard();
  }

  $("newPerDay").onchange = () => {
    db.settings.newPerDay = Math.max(0, Math.min(500, parseInt($("newPerDay").value, 10) || 0));
    save();
    startReview();
  };
  $("direction").onchange = () => {
    db.settings.direction = $("direction").value;
    save();
    startReview();
  };
  $("piqad").onchange = () => {
    db.settings.piqad = $("piqad").checked;
    save();
    renderReview();
  };

  // ---------- flashcards ----------

  let flash = { deck: null, order: [], i: 0, flipped: false };

  function renderFlash() {
    const sel = $("flashDeck");
    const usable = decks.filter((d) => d.cards.length);
    sel.innerHTML = usable.map((d) => '<option value="' + esc(d.id) + '">' + esc(d.title) + " (" + d.cards.length + ")</option>").join("");
    if (!usable.length) {
      $("flashCard").innerHTML = '<div class="flash"><div class="front english">No words yet</div><p class="muted">Add some in the Add words tab.</p></div>';
      $("flashPos").textContent = "";
      return;
    }
    if (!flash.deck || !usable.some((d) => d.id === flash.deck.id)) setFlashDeck(usable[0].id);
    sel.value = flash.deck.id;
    drawFlash();
  }

  function setFlashDeck(id, shuffle) {
    const deck = decks.find((d) => d.id === id);
    const order = deck.cards.map((_, i) => i);
    if (shuffle) for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    flash = { deck, order, i: 0, flipped: false };
  }

  function drawFlash() {
    if (!flash.deck) return;
    const card = flash.deck.cards[flash.order[flash.i]];
    const askWord = $("flashSide").value === "word";
    $("flashCard").innerHTML = '<div class="flash" id="flashFace" style="cursor:pointer">' + face(card, flash.deck, askWord, flash.flipped) + "</div>";
    $("flashFace").onclick = flipFlash;
    $("flashPos").textContent = flash.i + 1 + " / " + flash.order.length;
  }

  function moveFlash(d) {
    if (!flash.deck) return;
    flash.i = (flash.i + d + flash.order.length) % flash.order.length;
    flash.flipped = false;
    drawFlash();
  }

  function flipFlash() {
    flash.flipped = !flash.flipped;
    drawFlash();
    if (flash.flipped) speakCard(flash.deck.cards[flash.order[flash.i]]);
  }

  $("flashDeck").onchange = () => { setFlashDeck($("flashDeck").value); drawFlash(); };
  $("flashSide").onchange = () => { flash.flipped = false; drawFlash(); };
  $("flashShuffle").onclick = () => { setFlashDeck(flash.deck.id, true); drawFlash(); };
  $("flashPrev").onclick = () => moveFlash(-1);
  $("flashNext").onclick = () => moveFlash(1);
  $("flashFlip").onclick = flipFlash;

  // ---------- decks ----------

  function deckStats(deck) {
    const now = Date.now();
    const s = { fresh: 0, learning: 0, due: 0, learned: 0 };
    for (const c of deck.cards) for (const dir of directions()) {
      const st = db.cards[c.id + dir];
      if (!st) s.fresh++;
      else {
        if (st.ivl === 0) s.learning++;
        if (st.due <= now) s.due++;
        if (st.ivl >= SRS.MATURE) s.learned++;
      }
    }
    return s;
  }

  function renderDecks() {
    const groups = {};
    decks.forEach((d) => (groups[d.group] = groups[d.group] || []).push(d));
    const on = new Set(db.enabled[lang]);
    let html = "";
    for (const [group, list] of Object.entries(groups)) {
      html += '<div class="deck-group"><h3>' + esc(group) + "</h3>";
      for (const d of list) {
        const s = deckStats(d);
        const total = d.cards.length * directions().length;
        html +=
          '<div class="deck-row"><input type="checkbox" data-on="' + esc(d.id) + '"' + (on.has(d.id) ? " checked" : "") + (d.cards.length ? "" : " disabled") + ">" +
          '<div class="title"><b>' + esc(d.title) + '</b><span class="small muted">' + d.cards.length + " words</span>" +
          '<div class="progress" style="margin-top:0.3rem"><span style="width:' + (total ? Math.round((100 * (total - s.fresh)) / total) : 0) + '%"></span></div></div>' +
          '<span class="pill">' + s.fresh + " new</span>" +
          (s.due ? '<span class="pill due">' + s.due + " due</span>" : "") +
          (s.learned ? '<span class="pill good">' + s.learned + " learned</span>" : "") +
          '<button data-browse="' + esc(d.id) + '"' + (d.cards.length ? "" : " disabled") + ">Browse</button>" +
          '<button data-reset="' + esc(d.id) + '"' + (total - s.fresh ? "" : " disabled") + ">Reset</button></div>" +
          '<div class="deck-browse" id="browse-' + esc(d.id) + '" hidden></div>';
      }
      html += "</div>";
    }
    $("deckList").innerHTML = html;
    $("deckList").querySelectorAll("[data-on]").forEach((c) => (c.onchange = () => {
      const set = new Set(db.enabled[lang]);
      c.checked ? set.add(c.dataset.on) : set.delete(c.dataset.on);
      db.enabled[lang] = [...set];
      save();
    }));
    $("deckList").querySelectorAll("[data-browse]").forEach((b) => (b.onclick = () => browse(b.dataset.browse)));
    $("deckList").querySelectorAll("[data-reset]").forEach((b) => (b.onclick = () => {
      const d = decks.find((x) => x.id === b.dataset.reset);
      if (!confirm("Forget your progress on “" + d.title + "”? Its words become new again.")) return;
      d.cards.forEach((c) => { delete db.cards[c.id]; delete db.cards[c.id + ">"]; });
      save();
      renderDecks();
      updateBadge();
    }));
  }

  function browse(id) {
    const box = $("browse-" + id);
    if (!box.hidden) return (box.hidden = true);
    const d = decks.find((x) => x.id === id);
    const pq = meta.font === "pIqaD";
    box.innerHTML =
      "<table><tr><th>Word</th>" + (pq ? "<th>pIqaD</th>" : "") + "<th>Reading</th><th>Meaning</th><th>Next review</th></tr>" +
      d.cards.map((c) => {
        const st = db.cards[c.id + (db.settings.direction === "produce" ? ">" : "")];
        const when = !st ? "new" : st.due <= Date.now() ? "due" : "in " + SRS.describe(st.due - Date.now());
        return '<tr><td class="target"' + (meta.direction === "rtl" ? ' dir="rtl"' : "") + ">" + esc(c.front) + "</td>" + (pq ? '<td class="piqad">' + esc(LSD.piqad(c.front)) + "</td>" : "") + "<td>" + esc(c.reading) + "</td><td>" + esc(c.back) + '</td><td class="small muted">' + when + "</td></tr>";
      }).join("") + "</table>";
    box.hidden = false;
  }

  // ---------- your own words ----------

  function setMine(words) {
    db.custom[lang] = words;
    save();
    const i = decks.findIndex((d) => d.id === "mine");
    decks[i] = mineDeck();
    if (flash.deck && flash.deck.id === "mine") flash.deck = null;
  }

  function addWord(w) {
    const words = db.custom[lang] || [];
    if (words.some((x) => x.front === w.front && x.back === w.back)) return false;
    words.push(Object.assign({ added: today() }, w));
    setMine(words);
    return true;
  }

  function renderAdd() {
    const words = db.custom[lang] || [];
    $("myWords").innerHTML = words.length
      ? "<table><tr><th>Word</th><th>Reading</th><th>Meaning</th><th>Note</th><th></th></tr>" +
        words.map((w, i) => '<tr><td class="target">' + esc(w.front) + "</td><td>" + esc(w.reading) + "</td><td>" + esc(w.back) + '</td><td class="small muted">' + esc(w.note) + '</td><td><button data-del="' + i + '">Remove</button></td></tr>').join("") +
        "</table>"
      : '<p class="muted">No words yet. Words you add here go in the <b>My words</b> deck, which is on in Review by default.</p>';
    $("myWords").querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => {
      const list = (db.custom[lang] || []).slice();
      list.splice(+b.dataset.del, 1);
      setMine(list);
      renderAdd();
    }));
  }

  $("addBtn").onclick = () => {
    const w = { front: $("addFront").value.trim(), reading: $("addReading").value.trim(), back: $("addBack").value.trim(), note: $("addNote").value.trim() };
    if (!w.front || !w.back) return ($("addMsg").textContent = "A word and its meaning are needed.");
    $("addMsg").textContent = addWord(w) ? "Added “" + w.front + "”." : "That word is already in My words.";
    ["addFront", "addReading", "addBack", "addNote"].forEach((id) => ($(id).value = ""));
    $("addFront").focus();
    renderAdd();
  };

  async function dictSearch() {
    const q = $("dictQuery").value.trim();
    if (!q) return;
    const status = $("dictStatus");
    try {
      if (!VocabDictionary.ready) {
        status.textContent = "Loading the dictionary…";
        await VocabDictionary.load((n, total) => (status.textContent = "Loading the dictionary… " + Math.round((100 * n) / total) + "%"));
      }
    } catch (e) {
      status.innerHTML = 'The dictionary data isn\'t built on this computer yet. Run <code>SquirrelGo-Apps/squirrelgo-dictionary/tools/fetch_data.sh</code> once (it downloads JMdict, about 45 MB), then search again.';
      return;
    }
    const { cards, total } = VocabDictionary.lookup(q);
    status.textContent = total ? (total > cards.length ? "Top " + cards.length + " of " + total + " matches." : total + " match" + (total === 1 ? "" : "es") + ".") : "No matches.";
    const mine = db.custom[lang] || [];
    $("dictResults").innerHTML = cards.length
      ? '<table class="dict-results"><tr><th>Word</th><th>Reading</th><th>Meaning</th><th></th></tr>' +
        cards.map((c, i) => {
          const have = mine.some((w) => w.front === c.front && w.back === c.back);
          return '<tr><td class="target">' + esc(c.front) + "</td><td>" + esc(c.reading) + "</td><td>" + esc(c.back) + (c.note ? '<br><span class="small muted">' + esc(c.note) + "</span>" : "") + '</td><td><button data-add="' + i + '"' + (have ? " disabled" : "") + ">" + (have ? "Added" : "Add") + "</button></td></tr>";
        }).join("") + "</table>"
      : "";
    $("dictResults").querySelectorAll("[data-add]").forEach((b) => (b.onclick = () => {
      const c = cards[+b.dataset.add];
      addWord({ front: c.front, reading: c.reading, back: c.back, note: "JMdict " + c.jmdict });
      b.disabled = true;
      b.textContent = "Added";
      renderAdd();
    }));
  }
  $("dictGo").onclick = dictSearch;
  $("dictQuery").onkeydown = (e) => { if (e.key === "Enter") dictSearch(); };

  // ---------- Anki export and backup ----------

  function renderExport() {
    const on = new Set(db.enabled[lang]);
    $("exportDecks").innerHTML = decks
      .filter((d) => d.cards.length)
      .map((d) => '<label style="display:block"><input type="checkbox" data-exp="' + esc(d.id) + '"' + (on.has(d.id) ? " checked" : "") + "> " + esc(d.title) + ' <span class="muted small">(' + d.cards.length + ")</span></label>")
      .join("");
    $("exportMsg").textContent = "";
  }

  // Anki's text import: one note per line, tab-separated, fields quoted.
  function ankiField(s) {
    return '"' + String(s).replace(/[\t\r\n]+/g, " ").replace(/"/g, '""') + '"';
  }
  const tagify = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");

  function ankiExport() {
    const ids = [...document.querySelectorAll("[data-exp]:checked")].map((c) => c.dataset.exp);
    if (!ids.length) return ($("exportMsg").textContent = "Tick at least one deck.");
    const type = $("exportType").value;
    const out = ["#separator:tab", "#html:true", "#notetype:" + type, "#deck column:3", "#tags column:4"];
    let n = 0;
    for (const d of decks.filter((x) => ids.includes(x.id))) {
      const deckName = "SquirrelGo::" + meta.name + "::" + d.title.replace(/::/g, ":");
      const tags = ["squirrelgo", tagify(meta.name), tagify(d.group), tagify(d.title)].join(" ");
      for (const c of d.cards) {
        let front = esc(c.front);
        if (meta.font === "pIqaD") front += '<br><span style="font-family:pIqaD">' + esc(LSD.piqad(c.front)) + "</span>";
        const back = esc(c.back) + (c.reading ? "<br><i>" + esc(c.reading) + "</i>" : "") + (c.note ? '<br><small>' + esc(c.note) + "</small>" : "");
        out.push([front, back, deckName, tags].map(ankiField).join("\t"));
        n++;
      }
    }
    download("squirrelgo-" + lang + "-anki.txt", out.join("\n") + "\n", "text/plain");
    $("exportMsg").textContent = n + " notes exported. In Anki: File → Import, pick the file, and check the field mapping.";
  }

  function download(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: type + ";charset=utf-8" }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  $("exportBtn").onclick = ankiExport;
  $("backupBtn").onclick = () => download("vocabulary-learner-backup-" + today() + ".json", JSON.stringify(db, null, 1), "application/json");
  $("restoreFile").onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data.cards !== "object") throw new Error("not a backup");
      if (!confirm("Replace your current progress and words with this backup?")) return;
      Object.keys(db).forEach((k) => delete db[k]);
      Object.assign(db, data);
      db.settings = Object.assign({ newPerDay: 15, direction: "recognize", piqad: true }, db.settings);
      save();
      $("backupMsg").textContent = "Restored.";
      openLang(lang);
    } catch (err) {
      $("backupMsg").textContent = "That file isn't a Vocabulary Learner backup.";
    }
    e.target.value = "";
  };

  // ---------- keyboard ----------

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (tab === "review" && current) {
      if ((e.key === " " || e.key === "Enter") && !revealed) { e.preventDefault(); reveal(); }
      else if (revealed && "1234".includes(e.key)) rate(+e.key);
      else if (e.key === "s" || e.key === "S") speakCard(current.card);
    } else if (tab === "flash" && flash.deck) {
      if (e.key === "ArrowRight") moveFlash(1);
      else if (e.key === "ArrowLeft") moveFlash(-1);
      else if (e.key === " ") { e.preventDefault(); flipFlash(); }
      else if (e.key === "s" || e.key === "S") speakCard(flash.deck.cards[flash.order[flash.i]]);
    }
  });

  init();
})();
