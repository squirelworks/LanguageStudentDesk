// SquirrelGo Klingon: lessons, chart, stroke-order animation, checked writing
// practice, quizzes, flashcards and a pIqaD transliterator, from data/klingon.js.
(() => {
  const APP = window.SG_APP;
  const K = window.SG_KLINGON;

  // Flatten lessons into items once.
  const ALL = [];
  K.lessons.forEach((l, li) => {
    l.id = String(li);
    l.items = l.chars.map(([r, cp, hint, like, ex, exM]) => {
      const it = { key: r, r, ch: String.fromCharCode(cp), hint, like, ex, exM, lesson: l, numeral: !!l.numerals };
      ALL.push(it);
      return it;
    });
  });
  const LETTERS = ALL.filter((it) => !it.numeral);
  const NUMERALS = ALL.filter((it) => it.numeral);
  const itemByKey = new Map(ALL.map((it) => [it.key, it]));
  // Alphabet order follows the code points.
  const ALPHA = LETTERS.slice().sort((a, b) => a.ch.charCodeAt(0) - b.ch.charCodeAt(0));

  // ---- romanization to pIqaD ----
  const MULTI = ["tlh", "ch", "gh", "ng"];
  const PUNCT = { ",": "", ".": "" };
  // Fold what people actually type: curly apostrophes, and lower-case d, h, i, s
  // (which only exist as capitals). q and Q are different letters, so they keep their case.
  function normalize(text) {
    return text
      .replace(/[‘’ʼ`´]/g, "'")
      .replace(/[dhis]/g, (c) => c.toUpperCase())
      .replace(/[ABCEGJLMNOPRTUVWY]/g, (c) => c.toLowerCase());
  }
  // Split romanized text into pIqaD letters. Unknown characters pass through.
  function transliterate(text) {
    const s = normalize(text);
    const parts = [];
    for (let i = 0; i < s.length; ) {
      const m = MULTI.find((x) => s.startsWith(x, i));
      const tok = m || s[i];
      const it = itemByKey.get(tok);
      if (it) parts.push({ r: tok, ch: it.ch, ok: true });
      else if (PUNCT[tok]) parts.push({ r: tok, ch: PUNCT[tok], ok: true });
      else parts.push({ r: tok, ch: tok, ok: /[\s!?;:"()-]/.test(tok) });
      i += tok.length;
    }
    return { text: parts.map((p) => p.ch).join(""), parts };
  }
  const piqad = (roman) => transliterate(roman).text;

  // ---- persistence ----
  const defaults = { showRoman: true, flashDir: "glyph", guide: true, check: true, font: "hand", speed: 90, stats: {}, written: {} };
  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(APP.store) || "{}"));
    } catch {
      return Object.assign({}, defaults);
    }
  }
  const store = load();
  function save() {
    try {
      localStorage.setItem(APP.store, JSON.stringify(store));
    } catch {}
  }
  // A character counts as mastered after three correct quiz answers in a row.
  const stat = (it) => store.stats[it.key] || { c: 0, w: 0, s: 0 };
  const mastered = (it) => stat(it).s >= 3;
  const weak = (it) => stat(it).w > 0 && !mastered(it);
  const written = (it) => store.written[it.key] || 0;
  function record(it, ok) {
    const st = Object.assign({ c: 0, w: 0, s: 0 }, store.stats[it.key]);
    if (ok) {
      st.c++;
      st.s++;
    } else {
      st.w++;
      st.s = 0;
    }
    store.stats[it.key] = st;
    save();
  }
  function applyFont() {
    document.body.classList.toggle("font-classic", store.font === "classic");
  }

  // ---- navigation ----
  const state = { view: "home", stack: [] };
  const NAV_KEYS = ["view", "lesson", "item", "list", "mode", "article", "quiz", "flash", "write"];
  function snapshot() {
    const o = {};
    NAV_KEYS.forEach((k) => (o[k] = state[k]));
    return o;
  }
  function navigate(view, patch = {}) {
    state.stack.push(snapshot());
    Object.assign(state, patch, { view });
    render();
    window.scrollTo(0, 0);
  }
  function goBack() {
    const prev = state.stack.pop();
    if (!prev) return;
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
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const g = (text, cls = "") => `<span class="pq ${cls}">${esc(text)}</span>`;
  const countMastered = (items) => items.filter(mastered).length;
  const bar = (n, total, cls = "") =>
    `<span class="bar ${cls}"><span style="width:${total ? Math.round((100 * n) / total) : 0}%"></span></span>`;
  const label = (it) => (it.numeral ? `${it.r} · ${it.hint}` : it.r);

  function topbar(title, sub) {
    return `<header class="topbar">
      <button id="backBtn" class="back-btn ${state.stack.length ? "" : "hidden"}" aria-label="Back">‹</button>
      <h1>${esc(title)}${sub ? `<span class="sub">${esc(sub)}</span>` : ""}</h1>
      <button class="icon-btn" data-act="settings" aria-label="Settings">⚙</button>
    </header>`;
  }

  function tile(it, act = "detail") {
    const done = mastered(it) ? "done" : weak(it) ? "weak" : "";
    return `<button class="tile ${done}" data-act="${act}" data-key="${esc(it.key)}">
      ${g(it.ch)}
      ${store.showRoman ? `<span class="tile-r">${esc(it.r)}</span>` : ""}
    </button>`;
  }

  // ---- views ----
  function viewHome() {
    const lessons = K.lessons
      .map((l) => {
        const m = countMastered(l.items);
        return `<li><button class="lesson" data-act="lesson" data-id="${l.id}">
          <span class="lesson-preview">${g(l.items.slice(0, 6).map((it) => it.ch).join(" "))}</span>
          <span class="lesson-title">${esc(l.title)}</span>
          ${l.note ? `<span class="lesson-note">${esc(l.note)}</span>` : ""}
          ${bar(m, l.items.length)}
        </button></li>`;
      })
      .join("");
    const articles = K.articles
      .map((a, i) => `<li><button class="cat" data-act="article" data-id="${i}">${esc(a.title)}<span>›</span></button></li>`)
      .join("");
    const m = countMastered(ALL);
    const w = ALL.filter((it) => written(it) > 0).length;
    return `${topbar(APP.name, APP.tagline)}
      <main>
        <div class="hero">
          <div class="hero-g">${g(piqad("tlhIngan Hol"))}</div>
          <div class="muted">tlhIngan Hol · the Klingon language</div>
        </div>
        <div class="summary">${m} of ${ALL.length} characters mastered in quizzes · ${w} written ${bar(m, ALL.length, "wide")}</div>
        <h2>Practice</h2>
        <div class="practice">
          <button class="btn primary" data-act="choose" data-mode="write">Writing</button>
          <button class="btn" data-act="choose" data-mode="quiz">Quiz</button>
          <button class="btn" data-act="choose" data-mode="flash">Flashcards</button>
          <button class="btn" data-act="chart">Chart</button>
        </div>
        <h2>Lessons</h2>
        <ul class="cats">${lessons}</ul>
        <h2>Tools</h2>
        <ul class="cats"><li><button class="cat" data-act="words">Write words in pIqaD<span>›</span></button></li></ul>
        <h2>Read about pIqaD</h2>
        <ul class="cats">${articles}</ul>
      </main>`;
  }

  function viewLesson(l) {
    return `${topbar(l.title, "Lesson")}
      <main>
        ${l.note ? `<p class="muted">${esc(l.note)}</p>` : ""}
        <div class="tiles">${l.items.map((it) => tile(it)).join("")}</div>
        <div class="row-actions">
          <button class="btn primary" data-act="start-lesson" data-mode="write">Write these</button>
          <button class="btn" data-act="start-lesson" data-mode="quiz">Quiz this lesson</button>
          <button class="btn" data-act="start-lesson" data-mode="flash">Flashcards</button>
        </div>
      </main>`;
  }

  function exampleBlock(it) {
    if (!it.ex || it.numeral) return "";
    return `<div class="example">
      <div class="ex-label">Example</div>
      <div class="ex-word">${g(piqad(it.ex))}</div>
      <div class="muted">${esc(it.ex)}${it.exM ? ` · ${esc(it.exM)}` : ""}</div>
    </div>`;
  }

  // Stroke-order panel: the animated letter, with replay.
  function strokePanel(it, numbers = true) {
    const n = Strokes.count(it.key);
    return `<div class="stroke-panel">
      ${Strokes.svg(it.key, { numbers, cls: "anim" })}
      <div class="stroke-meta">
        <span class="muted">${n} stroke${n === 1 ? "" : "s"}</span>
        <button class="btn small" data-act="replay">▶ Watch</button>
      </div>
    </div>`;
  }

  function viewDetail() {
    const it = state.item;
    const list = state.list || it.lesson.items;
    const idx = list.indexOf(it);
    const st = stat(it);
    return `${topbar(label(it), it.lesson.title)}
      <main>
        <div class="card detail">
          <div class="detail-pair">
            <div class="big-glyph">${g(it.ch)}</div>
            ${strokePanel(it)}
          </div>
          <div class="detail-r">${esc(it.r)}</div>
          ${it.numeral ? `<p class="hint">Said <b>${esc(it.hint)}</b></p>` : `<p class="hint">${esc(it.hint)}</p><p class="muted">Sounds like: <b>${esc(it.like)}</b></p>`}
          ${exampleBlock(it)}
          <p class="muted record">Quiz record: ${st.c} right, ${st.w} wrong${mastered(it) ? " · mastered" : ""} · written ${written(it)} time${written(it) === 1 ? "" : "s"}</p>
        </div>
        <div class="pager">
          <button class="btn" data-act="step" data-d="-1" ${idx <= 0 ? "disabled" : ""}>‹ Prev</button>
          <button class="btn primary" data-act="write-one">Write it</button>
          <button class="btn" data-act="step" data-d="1" ${idx >= list.length - 1 ? "disabled" : ""}>Next ›</button>
        </div>
      </main>`;
  }

  function viewChart() {
    const letters = ALPHA.map((it) => tile(it)).join("");
    const nums = NUMERALS.map((it) => tile(it)).join("");
    const punct = [
      ["", "comma"],
      ["", "full stop"],
      ["", "emblem"],
    ]
      .map(([c, n]) => `<span class="tile static">${g(c)}<span class="tile-r">${n}</span></span>`)
      .join("");
    return `${topbar("Chart", "pIqaD in alphabet order")}
      <main>
        <p class="muted">Tap a character for its sound and stroke order. Green means mastered in quizzes, orange means it needs review.</p>
        <h2>Letters</h2>
        <div class="chart">${letters}</div>
        <h2>Numerals</h2>
        <div class="chart">${nums}</div>
        <h2>Punctuation</h2>
        <div class="chart">${punct}</div>
      </main>`;
  }

  function viewChoose() {
    const mode = state.mode;
    const picked = (state.sel ||= new Set([K.lessons[0].id]));
    const weakItems = ALL.filter(weak);
    const titles = { quiz: "Quiz", flash: "Flashcards", write: "Writing practice" };
    const lessons = K.lessons
      .map(
        (l) => `<label class="setting check">
          <span><span class="lesson-preview small">${g(l.items.slice(0, 5).map((it) => it.ch).join(" "))}</span> ${esc(l.title)}</span>
          <input type="checkbox" data-act="pick" data-id="${l.id}" ${picked.has(l.id) ? "checked" : ""}>
        </label>`
      )
      .join("");
    let opts = "";
    if (mode === "quiz")
      opts = `<h2>Question type</h2>
        <label class="setting"><span>Question</span>
          <select data-act="qkind">
            <option value="read">See the letter, pick the sound</option>
            <option value="pick">See the sound, pick the letter</option>
            <option value="word">Read a whole word</option>
            <option value="mix">Mixed</option>
          </select>
        </label>
        <label class="setting"><span>Questions</span>
          <select data-act="qcount">
            <option value="10">10</option><option value="20">20</option><option value="0">All selected</option>
          </select>
        </label>`;
    if (mode === "write")
      opts = `<h2>How</h2>
        <label class="setting"><span>Practice</span>
          <select data-act="wkind">
            <option value="trace">Trace over the guide</option>
            <option value="memory">From memory (sound only)</option>
          </select>
        </label>`;
    return `${topbar(titles[mode], APP.name)}
      <main>
        <h2>Characters</h2>
        <div class="row-actions">
          <button class="btn" data-act="pick-all">All</button>
          <button class="btn" data-act="pick-none">None</button>
          ${weakItems.length ? `<button class="btn" data-act="start-weak">Only the ${weakItems.length} to review</button>` : ""}
        </div>
        ${lessons}
        ${opts}
        <button class="btn primary block" data-act="start">Start</button>
      </main>`;
  }

  const pool = () => K.lessons.filter((l) => state.sel.has(l.id)).flatMap((l) => l.items);

  // ---- quiz ----
  function startQuiz(items, kind = "read", count = 10) {
    const qs = shuffle(items).slice(0, count || items.length);
    state.quiz = { qs, i: 0, right: 0, missed: [], kind, answered: null, q: null, items };
    nextQuestion();
  }
  // A word question uses a word made only of letters from the quiz pool when
  // there is one, so beginners are not asked to read letters they have not met.
  function wordFor(it, items) {
    const known = new Set(items.map((x) => x.key));
    const fits = (w) => transliterate(w).parts.every((p) => !itemByKey.has(p.r) || known.has(p.r));
    const cands = K.words.filter(([w]) => fits(w) && transliterate(w).parts.some((p) => p.r === it.key));
    return cands.length ? cands[Math.floor(Math.random() * cands.length)] : K.words[Math.floor(Math.random() * K.words.length)];
  }
  function nextQuestion() {
    const qz = state.quiz;
    if (qz.i >= qz.qs.length) {
      qz.q = null;
      return;
    }
    const it = qz.qs[qz.i];
    let kind = qz.kind;
    if (kind === "mix") kind = ["read", "pick", "word"][Math.floor(Math.random() * 3)];
    if (kind === "word" && it.numeral) kind = "read";
    if (kind === "word") {
      const w = wordFor(it, qz.items);
      const others = shuffle(K.words.filter((x) => x[0] !== w[0])).slice(0, 3);
      qz.q = { it, kind, word: w, opts: shuffle([w, ...others]) };
    } else {
      // Distractors come from the same kind (letter or numeral) and never share the answer.
      const near = ALL.filter((x) => x.numeral === it.numeral && x !== it);
      const opts = [it, ...shuffle(near).slice(0, 3)];
      qz.q = { it, kind, opts: shuffle(opts) };
    }
    qz.answered = null;
  }

  function viewQuiz() {
    const qz = state.quiz;
    if (!qz.q) {
      const pct = Math.round((100 * qz.right) / qz.qs.length);
      const missed = [...new Set(qz.missed)];
      return `${topbar("Quiz results", APP.name)}
        <main class="center-text">
          <div class="card">
            <div class="score">${qz.right} / ${qz.qs.length}</div>
            <div class="muted">${pct}% correct</div>
          </div>
          ${missed.length ? `<h2>Missed</h2><div class="tiles">${missed.map((it) => tile(it)).join("")}</div>` : `<p>Perfect round. Qapla'!</p>`}
          <div class="row-actions center">
            ${missed.length ? `<button class="btn primary" data-act="retry-missed">Retry missed</button>` : ""}
            <button class="btn" data-act="retry-all">Go again</button>
          </div>
        </main>`;
    }
    const { it, kind, opts, word } = qz.q;
    const ans = qz.answered;
    let prompt;
    let buttons;
    let feedback = "";
    if (kind === "word") {
      prompt = `<div class="q-word">${g(piqad(word[0]))}</div><div class="muted">Which word is this?</div>`;
      buttons = opts
        .map((o) => {
          const cls = ans ? (o === word ? "right" : o === ans ? "wrong" : "") : "";
          return `<button class="opt ${cls}" data-act="answer-word" data-w="${esc(o[0])}" ${ans ? "disabled" : ""}><span class="opt-r">${esc(o[0])}</span></button>`;
        })
        .join("");
      if (ans) {
        const spelled = transliterate(word[0])
          .parts.filter((p) => itemByKey.has(p.r))
          .map((p) => p.r)
          .join(" · ");
        feedback = `<div class="feedback ${ans === word ? "ok" : "no"}">
          <div>${ans === word ? "Correct." : "Not quite."} It is <b>${esc(word[0])}</b> (${esc(word[1])}).<br>Letters: ${esc(spelled)}</div>`;
      }
    } else {
      if (kind === "read") prompt = `<div class="q-glyph">${g(it.ch)}</div><div class="muted">${it.numeral ? "Which number is this?" : "What sound is this?"}</div>`;
      else prompt = `<div class="q-sound">${esc(label(it))}</div><div class="muted">Which ${it.numeral ? "numeral" : "letter"} is this?</div>`;
      buttons = opts
        .map((o) => {
          const cls = ans ? (o === it ? "right" : o === ans ? "wrong" : "") : "";
          const lab = kind === "read" ? `<span class="opt-r">${esc(label(o))}</span>` : g(o.ch);
          return `<button class="opt ${cls}" data-act="answer" data-key="${esc(o.key)}" ${ans ? "disabled" : ""}>${lab}</button>`;
        })
        .join("");
      if (ans)
        feedback = `<div class="feedback ${ans === it ? "ok" : "no"}">
          <div>${ans === it ? "Correct." : "Not quite."} ${g(it.ch)} is <b>${esc(label(it))}</b>${it.numeral ? "" : `: ${esc(it.hint)}`}</div>`;
    }
    if (ans) feedback += `<button class="btn primary block" data-act="next-q">${qz.i + 1 < qz.qs.length ? "Next" : "See results"}</button></div>`;
    return `${topbar(`Question ${qz.i + 1} of ${qz.qs.length}`, `${qz.right} right`)}
      <main>
        ${bar(qz.i, qz.qs.length, "wide")}
        <div class="card q-card">${prompt}</div>
        <div class="opts ${kind === "pick" ? "glyph-opts" : ""}">${buttons}</div>
        ${feedback}
      </main>`;
  }

  // ---- flashcards ----
  function startFlash(items) {
    state.flash = { items, deck: shuffle(items), shown: false, done: 0, total: items.length };
  }
  function viewFlash() {
    const f = state.flash;
    if (!f.deck.length) {
      return `${topbar("Flashcards", APP.name)}
        <main class="center-text">
          <div class="card"><div class="score">Done</div><div class="muted">You went through all ${f.total} cards.</div></div>
          <button class="btn primary block" data-act="flash-again">Shuffle and go again</button>
        </main>`;
    }
    const it = f.deck[0];
    const glyphFront = store.flashDir === "glyph";
    const front = glyphFront ? `<div class="big-glyph">${g(it.ch)}</div>` : `<div class="q-sound">${esc(label(it))}</div>`;
    const back = f.shown
      ? `<hr>
        ${glyphFront ? `<div class="detail-r">${esc(label(it))}</div>` : `<div class="detail-pair"><div class="big-glyph">${g(it.ch)}</div>${strokePanel(it)}</div>`}
        ${it.numeral ? "" : `<p class="hint">${esc(it.hint)}</p>`}
        ${exampleBlock(it)}`
      : "";
    return `${topbar(`${f.done + 1} of ${f.total}`, "Flashcards")}
      <main>
        ${bar(f.done, f.total, "wide")}
        <div class="card flash" data-act="${f.shown ? "" : "flip"}">
          ${front}
          ${back}
        </div>
        ${
          f.shown
            ? `<div class="grade">
                <button class="btn again" data-act="flash-again-card">Again</button>
                <button class="btn good" data-act="flash-good">Got it</button>
              </div>`
            : `<button class="btn primary block" data-act="flip">Show answer</button>`
        }
      </main>`;
  }

  // ---- writing ----
  let pad = null;
  let stopAnim = null;
  function viewWrite() {
    const w = state.write;
    const it = w.items[w.i];
    const memory = w.kind === "memory" && !w.revealed;
    const n = Strokes.count(it.key);
    const head = memory
      ? `<div class="write-head">
          <span class="q-sound">${esc(label(it))}</span>
          <span class="muted">${it.numeral ? "Write this numeral" : esc(it.hint)}. Write it from memory.</span>
        </div>`
      : `<div class="write-head">
          ${Strokes.svg(it.key, { numbers: true, cls: "anim mini" })}
          <span><b>${esc(label(it))}</b> · ${n} stroke${n === 1 ? "" : "s"}<br><span class="muted">${it.numeral ? "" : esc(it.hint)}</span></span>
        </div>`;
    return `${topbar(`Write ${label(it)}`, `${w.i + 1} of ${w.items.length}`)}
      <main>
        ${head}
        <canvas id="pad" class="pad"></canvas>
        <div id="padMsg" class="pad-msg muted">${store.check ? `Stroke 1 of ${n}` : "Free drawing: strokes are not checked"}</div>
        <div class="pad-tools">
          ${memory ? `<button class="btn" data-act="reveal">Show me</button>` : `<button class="btn" data-act="replay">▶ Watch</button>`}
          <button class="btn" data-act="pad-hint">Hint</button>
          <button class="btn" data-act="pad-undo">Undo</button>
          <button class="btn" data-act="pad-clear">Clear</button>
        </div>
        <div class="pad-tools">
          <label class="toggle"><input type="checkbox" data-act="pad-guide" ${w.kind !== "memory" && store.guide ? "checked" : ""} ${memory ? "disabled" : ""}> Guide</label>
          <label class="toggle"><input type="checkbox" data-act="pad-check" ${store.check ? "checked" : ""}> Check my strokes</label>
        </div>
        <div class="pager">
          <button class="btn" data-act="write-step" data-d="-1" ${w.i <= 0 ? "disabled" : ""}>‹ Prev</button>
          <button class="btn ${w.finished ? "primary" : ""}" data-act="write-step" data-d="1" ${w.i >= w.items.length - 1 ? "disabled" : ""}>Next ›</button>
        </div>
      </main>`;
  }
  function mountPad() {
    const el = document.getElementById("pad");
    if (!el) return;
    const w = state.write;
    const it = w.items[w.i];
    const msg = document.getElementById("padMsg");
    const guide = w.kind === "memory" ? !!w.revealed && store.guide : store.guide;
    pad = WritePad.mount(el, {
      key: it.key,
      guide,
      check: store.check,
      onStroke(result, i, total) {
        if (result === "ok") msg.textContent = i + 1 < total ? `Good. Stroke ${i + 2} of ${total}` : "";
        else if (result === "reversed") msg.textContent = `Right shape, wrong direction. Start stroke ${i + 1} from the numbered end.`;
        else msg.textContent = `That doesn't match stroke ${i + 1}. Tap Hint to see where it goes.`;
        msg.className = `pad-msg ${result === "ok" ? "good" : "bad"}`;
      },
      onDone() {
        store.written[it.key] = written(it) + 1;
        save();
        w.finished = true;
        msg.textContent = w.i + 1 < w.items.length ? "Well written! On to the next one." : "Well written! That's the whole set.";
        msg.className = "pad-msg good";
        const next = app.querySelector('[data-act="write-step"][data-d="1"]');
        next?.classList.add("primary");
        if (w.i + 1 < w.items.length) setTimeout(() => state.write === w && w.i === w.items.indexOf(it) && step(1), 1100);
      },
    });
  }
  function step(d) {
    const w = state.write;
    w.i += d;
    w.revealed = false;
    w.finished = false;
    render();
  }

  // ---- words ----
  function viewWords() {
    const text = state.wordsText ?? "Qapla'";
    const list = K.words
      .map(([w, m]) => `<button class="word-row" data-act="use-word" data-w="${esc(w)}">${g(piqad(w))}<span><b>${esc(w)}</b> <span class="muted">${esc(m)}</span></span></button>`)
      .join("");
    return `${topbar("Write words", "Romanization to pIqaD")}
      <main>
        <p class="muted">Type Klingon in the usual romanization. Capitals matter: q and Q are different letters. Lower-case d, h, i and s are read as D, H, I and S.</p>
        <textarea id="romanIn" class="roman-in" rows="2" spellcheck="false" autocapitalize="off" autocomplete="off">${esc(text)}</textarea>
        <div class="card out-card">
          <div id="piqadOut" class="piqad-out">${g(piqad(text))}</div>
          <div id="spellOut" class="muted spell">${spellOut(text)}</div>
        </div>
        <div class="row-actions">
          <button class="btn" data-act="copy-piqad">Copy pIqaD text</button>
          <button class="btn" data-act="write-word">Write these letters</button>
        </div>
        <p class="muted">Copied text uses the ConScript code points; it shows as pIqaD only where a pIqaD font is installed.</p>
        <h2>Words to try</h2>
        <div class="word-list">${list}</div>
      </main>`;
  }
  function spellOut(text) {
    const parts = transliterate(text).parts;
    const bad = [...new Set(parts.filter((p) => !p.ok).map((p) => p.r))];
    const letters = parts.filter((p) => itemByKey.has(p.r) || PUNCT[p.r]).map((p) => esc(p.r));
    let s = letters.length ? `${letters.length} character${letters.length === 1 ? "" : "s"}: ${letters.join(" · ")}` : "";
    if (bad.length) s += `<br><span class="warn">Not Klingon letters: ${bad.map(esc).join(" ")}</span>`;
    return s;
  }
  const wordItems = (text) =>
    [...new Set(transliterate(text).parts.filter((p) => itemByKey.has(p.r)).map((p) => p.r))].map((k) => itemByKey.get(k));

  // ---- reference ----
  function viewArticle() {
    const a = K.articles[state.article];
    return `${topbar(a.title, "About pIqaD")}
      <main><article class="article">${a.body}</article></main>`;
  }

  function viewSettings() {
    const opt = (v, cur, text) => `<option value="${v}" ${String(cur) === String(v) ? "selected" : ""}>${text}</option>`;
    return `${topbar("Settings", APP.name)}
      <main>
        <label class="setting"><span>pIqaD style</span>
          <select data-act="set-font">${opt("hand", store.font, "Handwriting")}${opt("classic", store.font, "Classic (blade)")}</select>
        </label>
        <div class="font-demo">${g(piqad("Qapla'"))}</div>
        <label class="setting"><span>Stroke animation speed</span>
          <select data-act="set-speed">${opt(55, store.speed, "Slow")}${opt(90, store.speed, "Normal")}${opt(150, store.speed, "Fast")}</select>
        </label>
        <label class="setting"><span>Check strokes when writing</span><input type="checkbox" data-act="set-check" ${store.check ? "checked" : ""}></label>
        <label class="setting"><span>Show romanization on tiles</span><input type="checkbox" data-act="set-roman" ${store.showRoman ? "checked" : ""}></label>
        <label class="setting"><span>Flashcard front</span>
          <select data-act="set-flash">${opt("glyph", store.flashDir, "pIqaD")}${opt("sound", store.flashDir, "Sound")}</select>
        </label>
        <h2>Progress</h2>
        <div class="row-actions"><button class="btn" data-act="reset">Reset progress</button></div>
        <h2>About</h2>
        <p class="muted">${esc(APP.about)}</p>
      </main>`;
  }

  // Start the stroke animation in every animated panel on the page.
  function playAll() {
    stopAnim?.();
    const stops = [...app.querySelectorAll("svg.anim")].map((el) => Strokes.animate(el, store.speed));
    stopAnim = () => stops.forEach((f) => f());
  }

  function render() {
    pad = null;
    stopAnim?.();
    stopAnim = null;
    const views = {
      home: viewHome,
      lesson: () => viewLesson(state.lesson),
      detail: viewDetail,
      chart: viewChart,
      choose: viewChoose,
      quiz: viewQuiz,
      flash: viewFlash,
      write: viewWrite,
      words: viewWords,
      article: viewArticle,
      settings: viewSettings,
    };
    app.innerHTML = (views[state.view] || viewHome)();
    if (state.view === "write") mountPad();
    if (app.querySelector("svg.anim")) playAll();
  }

  function begin(mode, items, extra = {}) {
    if (!items.length) return toast("Pick at least one lesson.");
    if (mode === "quiz") {
      startQuiz(items, extra.kind, extra.count);
      navigate("quiz");
    } else if (mode === "flash") {
      startFlash(items);
      navigate("flash");
    } else {
      navigate("write", { write: { items, i: 0, kind: extra.wkind || "trace" } });
    }
  }

  // ---- events ----
  app.addEventListener("click", (e) => {
    if (e.target.id === "backBtn") return goBack();
    const el = e.target.closest("[data-act]");
    if (!el || el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA") return;
    const act = el.dataset.act;
    switch (act) {
      case "settings":
        if (state.view !== "settings") navigate("settings");
        break;
      case "lesson":
        navigate("lesson", { lesson: K.lessons[el.dataset.id] });
        break;
      case "detail": {
        const it = itemByKey.get(el.dataset.key);
        const list = state.view === "lesson" ? state.lesson.items : state.view === "chart" ? (it.numeral ? NUMERALS : ALPHA) : it.lesson.items;
        navigate("detail", { item: it, list });
        break;
      }
      case "step": {
        const list = state.list;
        const i = list.indexOf(state.item) + Number(el.dataset.d);
        if (list[i]) {
          state.item = list[i];
          render();
        }
        break;
      }
      case "replay":
        playAll();
        break;
      case "chart":
        navigate("chart");
        break;
      case "words":
        navigate("words");
        break;
      case "article":
        navigate("article", { article: Number(el.dataset.id) });
        break;
      case "choose":
        navigate("choose", { mode: el.dataset.mode });
        break;
      case "pick-all":
        state.sel = new Set(K.lessons.map((l) => l.id));
        render();
        break;
      case "pick-none":
        state.sel = new Set();
        render();
        break;
      case "start": {
        const kind = app.querySelector('[data-act="qkind"]')?.value;
        const count = Number(app.querySelector('[data-act="qcount"]')?.value || 10);
        const wkind = app.querySelector('[data-act="wkind"]')?.value;
        begin(state.mode, pool(), { kind, count, wkind });
        break;
      }
      case "start-weak":
        begin(state.mode, ALL.filter(weak), {
          kind: app.querySelector('[data-act="qkind"]')?.value,
          count: 0,
          wkind: app.querySelector('[data-act="wkind"]')?.value,
        });
        break;
      case "start-lesson":
        begin(el.dataset.mode, state.lesson.items, { kind: "mix", count: 0 });
        break;
      case "write-one":
        navigate("write", { write: { items: state.list, i: state.list.indexOf(state.item), kind: "trace" } });
        break;
      case "answer": {
        const qz = state.quiz;
        if (qz.answered) break;
        const choice = itemByKey.get(el.dataset.key);
        const ok = choice === qz.q.it;
        qz.answered = choice;
        record(qz.q.it, ok);
        if (ok) qz.right++;
        else qz.missed.push(qz.q.it);
        render();
        break;
      }
      case "answer-word": {
        const qz = state.quiz;
        if (qz.answered) break;
        const choice = qz.q.opts.find((o) => o[0] === el.dataset.w);
        const ok = choice === qz.q.word;
        qz.answered = choice;
        record(qz.q.it, ok);
        if (ok) qz.right++;
        else qz.missed.push(qz.q.it);
        render();
        break;
      }
      case "next-q":
        state.quiz.i++;
        nextQuestion();
        render();
        window.scrollTo(0, 0);
        break;
      case "retry-missed":
        startQuiz([...new Set(state.quiz.missed)], state.quiz.kind, 0);
        render();
        break;
      case "retry-all":
        startQuiz(state.quiz.qs, state.quiz.kind, 0);
        render();
        break;
      case "flip":
        state.flash.shown = true;
        render();
        break;
      case "flash-good":
        state.flash.deck.shift();
        state.flash.done++;
        state.flash.shown = false;
        render();
        break;
      case "flash-again-card": {
        const d = state.flash.deck;
        const card = d.shift();
        d.splice(Math.min(d.length, 3 + Math.floor(Math.random() * 3)), 0, card);
        state.flash.shown = false;
        render();
        break;
      }
      case "flash-again":
        startFlash(state.flash.items);
        render();
        break;
      case "reveal":
        state.write.revealed = true;
        render();
        break;
      case "pad-hint":
        pad?.hint();
        break;
      case "pad-undo":
        pad?.undo();
        break;
      case "pad-clear":
        pad?.clear();
        break;
      case "write-step":
        step(Number(el.dataset.d));
        break;
      case "use-word":
        state.wordsText = el.dataset.w;
        render();
        break;
      case "copy-piqad": {
        const text = piqad(state.wordsText ?? "Qapla'");
        (navigator.clipboard?.writeText(text) || Promise.reject())
          .then(() => toast("Copied pIqaD text."))
          .catch(() => toast("Copy is not available here."));
        break;
      }
      case "write-word": {
        const items = wordItems(state.wordsText ?? "Qapla'");
        if (!items.length) return toast("Type some Klingon first.");
        navigate("write", { write: { items, i: 0, kind: "trace" } });
        break;
      }
      case "reset":
        if (confirm("Clear all quiz and writing progress?")) {
          store.stats = {};
          store.written = {};
          save();
          toast("Progress cleared.");
        }
        break;
    }
  });

  app.addEventListener("input", (e) => {
    if (e.target.id !== "romanIn") return;
    state.wordsText = e.target.value;
    document.getElementById("piqadOut").innerHTML = g(piqad(state.wordsText));
    document.getElementById("spellOut").innerHTML = spellOut(state.wordsText);
  });

  app.addEventListener("change", (e) => {
    const el = e.target;
    switch (el.dataset.act) {
      case "pick":
        if (el.checked) state.sel.add(el.dataset.id);
        else state.sel.delete(el.dataset.id);
        break;
      case "pad-guide":
        store.guide = el.checked;
        save();
        pad?.setGuide(store.guide);
        break;
      case "pad-check":
        store.check = el.checked;
        save();
        render();
        break;
      case "set-font":
        store.font = el.value;
        save();
        applyFont();
        break;
      case "set-speed":
        store.speed = Number(el.value);
        save();
        break;
      case "set-check":
        store.check = el.checked;
        save();
        break;
      case "set-roman":
        store.showRoman = el.checked;
        save();
        break;
      case "set-flash":
        store.flashDir = el.value;
        save();
        break;
    }
  });

  applyFont();
  render();
})();
