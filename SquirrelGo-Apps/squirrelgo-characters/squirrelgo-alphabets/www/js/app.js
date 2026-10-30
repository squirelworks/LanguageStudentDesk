// SquirrelGo script trainer: lessons, chart, quizzes, flashcards and a
// writing pad for one or more writing systems described in data/*.js.
(() => {
  const APP = window.SG_APP;
  const SCRIPTS = window.SG_SCRIPTS;
  const ZWJ = "‍";

  // Flatten lessons into items once. A null in a lesson's chars is an empty
  // chart cell (e.g. the gaps in the kana や row) and is skipped elsewhere.
  SCRIPTS.forEach((s) => {
    s.all = [];
    s.lessons.forEach((l, li) => {
      l.id = String(li);
      l.script = s;
      l.cells = l.chars.map((a) => {
        if (!a) return null;
        const [g, r, hint, ex, exR, exM, speak] = a;
        const item = {
          key: `${s.id}|${g}`,
          g,
          r,
          hint: hint || "",
          ex: ex || "",
          exR: exR || "",
          exM: exM || "",
          speak: speak || g,
          lesson: l,
          script: s,
        };
        s.all.push(item);
        return item;
      });
      l.items = l.cells.filter(Boolean);
    });
  });
  const scriptById = new Map(SCRIPTS.map((s) => [s.id, s]));
  const itemByKey = new Map(SCRIPTS.flatMap((s) => s.all.map((it) => [it.key, it])));

  // ---- persistence ----
  const defaults = { voice: true, rate: 1, showRoman: true, flashDir: "glyph", guide: true, stats: {} };
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

  // ---- navigation ----
  const state = { view: "home", stack: [], script: SCRIPTS.length === 1 ? SCRIPTS[0] : null };
  const NAV_KEYS = ["view", "script", "lesson", "item", "list", "mode", "article", "quiz", "flash", "write"];
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
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }
  function say(s, text, slow) {
    if (!store.voice) return;
    const ok = Speech.speak(text, (slow ? 0.6 : 1) * store.rate, s.lang);
    if (!ok) toast(`No ${s.langName} voice found. Install a ${s.langName} text-to-speech voice in your system settings.`);
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const g = (s, text, cls = "") => `<span class="glyph ${cls}" lang="${s.lang}" dir="${s.dir || "ltr"}">${esc(text)}</span>`;
  const countMastered = (items) => items.filter(mastered).length;
  const bar = (n, total, cls = "") =>
    `<span class="bar ${cls}"><span style="width:${total ? Math.round((100 * n) / total) : 0}%"></span></span>`;

  function arabicForms(s, it) {
    const nj = (s.nonJoining || "").includes(it.g);
    return {
      isolated: it.g,
      final: ZWJ + it.g,
      medial: nj ? ZWJ + it.g : ZWJ + it.g + ZWJ,
      initial: nj ? it.g : it.g + ZWJ,
    };
  }

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
      ${g(it.script, it.g)}
      ${store.showRoman ? `<span class="tile-r">${esc(it.r)}</span>` : ""}
    </button>`;
  }

  // ---- views ----
  function viewHome() {
    if (SCRIPTS.length === 1) return viewScript(SCRIPTS[0], true);
    const cards = SCRIPTS.map((s) => {
      const m = countMastered(s.all);
      return `<button class="pack" data-act="script" data-id="${s.id}">
        <span class="pack-native">${g(s, s.native)}</span>
        <span class="pack-title">${esc(s.title)}</span>
        <span class="pack-desc">${esc(s.blurb)}</span>
        <span class="pack-meta">${s.all.length} characters · ${m} mastered</span>
        ${bar(m, s.all.length)}
      </button>`;
    }).join("");
    return `${topbar(APP.name, APP.tagline)}
      <main>
        <p class="muted">${esc(APP.intro)}</p>
        <div class="packs">${cards}</div>
      </main>`;
  }

  function viewScript(s, isHome) {
    const lessons = s.lessons
      .map((l) => {
        const m = countMastered(l.items);
        return `<li><button class="lesson" data-act="lesson" data-id="${l.id}">
          <span class="lesson-preview">${g(s, l.items.slice(0, 5).map((it) => it.g).join(" "))}</span>
          <span class="lesson-title">${esc(l.title)}</span>
          ${l.note ? `<span class="lesson-note">${esc(l.note)}</span>` : ""}
          ${bar(m, l.items.length)}
        </button></li>`;
      })
      .join("");
    const articles = (s.articles || [])
      .map((a, i) => `<li><button class="cat" data-act="article" data-id="${i}">${esc(a.title)}<span>›</span></button></li>`)
      .join("");
    const extras = [];
    if (s.builder) extras.push(`<li><button class="cat" data-act="builder">${esc(s.builder.title)}<span>›</span></button></li>`);
    if (s.nonJoining !== undefined) extras.push(`<li><button class="cat" data-act="forms">Letter forms table<span>›</span></button></li>`);
    const m = countMastered(s.all);
    return `${topbar(isHome ? APP.name : s.title, isHome ? APP.tagline : s.native)}
      <main>
        ${isHome ? "" : `<p class="muted">${esc(s.blurb)}</p>`}
        <div class="summary">${m} of ${s.all.length} characters mastered ${bar(m, s.all.length, "wide")}</div>
        <h2>Practice</h2>
        <div class="practice">
          <button class="btn primary" data-act="choose" data-mode="quiz">Quiz</button>
          <button class="btn" data-act="choose" data-mode="flash">Flashcards</button>
          <button class="btn" data-act="choose" data-mode="write">Writing</button>
          <button class="btn" data-act="chart">Chart</button>
        </div>
        <h2>Lessons</h2>
        <ul class="cats">${lessons}</ul>
        ${extras.length ? `<h2>Tools</h2><ul class="cats">${extras.join("")}</ul>` : ""}
        ${articles ? `<h2>Read about ${esc(s.title)}</h2><ul class="cats">${articles}</ul>` : ""}
      </main>`;
  }

  function viewLesson(l) {
    const s = l.script;
    return `${topbar(l.title, s.title)}
      <main>
        ${l.note ? `<p class="muted">${esc(l.note)}</p>` : ""}
        <div class="tiles">${l.items.map((it) => tile(it)).join("")}</div>
        <div class="row-actions">
          <button class="btn primary" data-act="start-lesson" data-mode="quiz">Quiz this lesson</button>
          <button class="btn" data-act="start-lesson" data-mode="flash">Flashcards</button>
          <button class="btn" data-act="start-lesson" data-mode="write">Writing</button>
        </div>
      </main>`;
  }

  function exampleBlock(it) {
    if (!it.ex) return "";
    const s = it.script;
    return `<div class="example">
      <div class="ex-label">Example</div>
      <div class="ex-row">
        <div>
          <div class="ex-word">${g(s, it.ex)}</div>
          <div class="muted">${esc(it.exR)}${it.exM ? ` · ${esc(it.exM)}` : ""}</div>
        </div>
        <button class="round play" data-act="say" data-text="${esc(it.ex)}" aria-label="Play example">▶</button>
      </div>
    </div>`;
  }

  function viewDetail() {
    const it = state.item;
    const s = it.script;
    const list = state.list || it.lesson.items;
    const idx = list.indexOf(it);
    const st = stat(it);
    let forms = "";
    if (s.nonJoining !== undefined && it.lesson.forms !== false) {
      const f = arabicForms(s, it);
      forms = `<div class="forms" dir="rtl">
        ${["isolated", "initial", "medial", "final"].map((k) => `<div><div class="form-g">${g(s, f[k])}</div><div class="muted">${k}</div></div>`).join("")}
      </div>`;
    }
    return `${topbar(it.r, `${s.title} · ${it.lesson.title}`)}
      <main>
        <div class="card detail">
          <div class="big-glyph">${g(s, it.g)}</div>
          <div class="detail-r">${esc(it.r)}</div>
          ${it.hint ? `<p class="hint">${esc(it.hint)}</p>` : ""}
          <div class="card-tools">
            <button class="round play" data-act="say" data-text="${esc(it.speak)}" aria-label="Play">▶</button>
            <button class="round slow" data-act="say-slow" data-text="${esc(it.speak)}" aria-label="Play slowly">½</button>
          </div>
          ${forms}
          ${exampleBlock(it)}
          <p class="muted record">Quiz record: ${st.c} right, ${st.w} wrong${mastered(it) ? " · mastered" : ""}</p>
        </div>
        <div class="pager">
          <button class="btn" data-act="step" data-d="-1" ${idx <= 0 ? "disabled" : ""}>‹ Prev</button>
          <button class="btn" data-act="write-one">Write it</button>
          <button class="btn" data-act="step" data-d="1" ${idx >= list.length - 1 ? "disabled" : ""}>Next ›</button>
        </div>
      </main>`;
  }

  function viewChart(s) {
    const groups = [];
    s.lessons.forEach((l) => {
      const name = l.group || "Characters";
      let grp = groups.find((x) => x.name === name);
      if (!grp) groups.push((grp = { name, cols: l.cols || 5, lessons: [] }));
      grp.lessons.push(l);
    });
    const body = groups
      .map((grp) => {
        const cells = grp.lessons
          .map((l) => {
            // Scripts with chartFlow run lessons together; otherwise each
            // lesson starts a new chart row (the kana rows rely on this).
            const pad = s.chartFlow ? 0 : (grp.cols - (l.cells.length % grp.cols)) % grp.cols;
            return l.cells
              .concat(Array(pad).fill(null))
              .map((it) => (it ? tile(it) : `<span class="tile empty"></span>`))
              .join("");
          })
          .join("");
        return `<h2>${esc(grp.name)}</h2>
          <div class="chart" dir="${s.dir || "ltr"}" style="grid-template-columns:repeat(${grp.cols},1fr)">${cells}</div>`;
      })
      .join("");
    return `${topbar("Chart", s.title)}
      <main>
        <p class="muted">Tap a character for details. Green means mastered in quizzes, orange means it needs review.</p>
        ${body}
      </main>`;
  }

  function viewChoose() {
    const s = state.script;
    const mode = state.mode;
    const sel = (state.sel ||= {});
    const picked = (sel[s.id] ||= new Set([s.lessons[0].id]));
    const weakItems = s.all.filter(weak);
    const titles = { quiz: "Quiz", flash: "Flashcards", write: "Writing practice" };
    const lessons = s.lessons
      .map(
        (l) => `<label class="setting check">
          <span><span class="lesson-preview small">${g(s, l.items.slice(0, 5).map((it) => it.g).join(" "))}</span> ${esc(l.title)}</span>
          <input type="checkbox" data-act="pick" data-id="${l.id}" ${picked.has(l.id) ? "checked" : ""}>
        </label>`
      )
      .join("");
    const voiceOk = store.voice && Speech.available(s.lang);
    const quizOpts =
      mode === "quiz"
        ? `<h2>Question type</h2>
          <label class="setting"><span>Question</span>
            <select data-act="qkind">
              <option value="read">See the character, pick the sound</option>
              <option value="pick">See the sound, pick the character</option>
              ${voiceOk ? `<option value="listen">Hear it, pick the character</option>` : ""}
              <option value="mix">Mixed</option>
            </select>
          </label>
          <label class="setting"><span>Questions</span>
            <select data-act="qcount">
              <option value="10">10</option><option value="20">20</option><option value="0">All selected</option>
            </select>
          </label>`
        : "";
    return `${topbar(titles[mode], s.title)}
      <main>
        <h2>Characters</h2>
        <div class="row-actions">
          <button class="btn" data-act="pick-all">All</button>
          <button class="btn" data-act="pick-none">None</button>
          ${weakItems.length ? `<button class="btn" data-act="start-weak">Only the ${weakItems.length} to review</button>` : ""}
        </div>
        ${lessons}
        ${quizOpts}
        <button class="btn primary block" data-act="start">Start</button>
      </main>`;
  }

  function pool() {
    const s = state.script;
    const picked = state.sel[s.id];
    return s.lessons.filter((l) => picked.has(l.id)).flatMap((l) => l.items);
  }

  // ---- quiz ----
  function startQuiz(items, kind = "read", count = 10) {
    const s = items[0].script;
    const qs = shuffle(items).slice(0, count || items.length);
    state.quiz = { s, qs, i: 0, right: 0, missed: [], kind, answered: null, q: null };
    nextQuestion();
  }
  function nextQuestion() {
    const qz = state.quiz;
    if (qz.i >= qz.qs.length) {
      qz.q = null;
      return;
    }
    const it = qz.qs[qz.i];
    let kind = qz.kind;
    if (kind === "mix") {
      const kinds = ["read", "pick"];
      if (store.voice && Speech.available(qz.s.lang)) kinds.push("listen");
      kind = kinds[Math.floor(Math.random() * kinds.length)];
    }
    // Distractors come from the same lesson group when possible and never
    // share the answer's sound, so every question has one right answer.
    const near = qz.s.all.filter((x) => (x.lesson.group || "") === (it.lesson.group || ""));
    const opts = [it];
    for (const x of shuffle(near).concat(shuffle(qz.s.all))) {
      if (opts.length >= 4) break;
      if (opts.some((o) => o.r === x.r || o.g === x.g)) continue;
      opts.push(x);
    }
    qz.q = { it, kind, opts: shuffle(opts) };
    qz.answered = null;
    if (kind === "listen") setTimeout(() => say(qz.s, it.speak), 150);
  }

  function viewQuiz() {
    const qz = state.quiz;
    const s = qz.s;
    if (!qz.q) {
      const pct = Math.round((100 * qz.right) / qz.qs.length);
      const missed = [...new Set(qz.missed)];
      return `${topbar("Quiz results", s.title)}
        <main class="center-text">
          <div class="card">
            <div class="score">${qz.right} / ${qz.qs.length}</div>
            <div class="muted">${pct}% correct</div>
          </div>
          ${missed.length ? `<h2>Missed</h2><div class="tiles">${missed.map((it) => tile(it)).join("")}</div>` : `<p>Perfect round.</p>`}
          <div class="row-actions center">
            ${missed.length ? `<button class="btn primary" data-act="retry-missed">Retry missed</button>` : ""}
            <button class="btn" data-act="retry-all">Go again</button>
          </div>
        </main>`;
    }
    const { it, kind, opts } = qz.q;
    let prompt;
    if (kind === "read") prompt = `<div class="q-glyph">${g(s, it.g)}</div><div class="muted">What sound is this?</div>`;
    else if (kind === "pick") prompt = `<div class="q-sound">${esc(it.r)}</div><div class="muted">Which character makes this sound?</div>`;
    else
      prompt = `<button class="round play huge" data-act="say" data-text="${esc(it.speak)}" aria-label="Play again">▶</button>
        <div class="muted">Which character did you hear?</div>`;
    const ans = qz.answered;
    const buttons = opts
      .map((o) => {
        let cls = "";
        if (ans) {
          if (o === it) cls = "right";
          else if (o === ans) cls = "wrong";
        }
        const label = kind === "read" ? `<span class="opt-r">${esc(o.r)}</span>` : g(s, o.g);
        return `<button class="opt ${cls}" data-act="answer" data-key="${esc(o.key)}" ${ans ? "disabled" : ""}>${label}</button>`;
      })
      .join("");
    const feedback = ans
      ? `<div class="feedback ${ans === it ? "ok" : "no"}">
          <div>${ans === it ? "Correct." : "Not quite."} ${g(s, it.g)} is <b>${esc(it.r)}</b>${it.hint ? `: ${esc(it.hint)}` : ""}</div>
          <button class="btn primary block" data-act="next-q">${qz.i + 1 < qz.qs.length ? "Next" : "See results"}</button>
        </div>`
      : "";
    return `${topbar(`Question ${qz.i + 1} of ${qz.qs.length}`, `${s.title} · ${qz.right} right`)}
      <main>
        ${bar(qz.i, qz.qs.length, "wide")}
        <div class="card q-card">${prompt}</div>
        <div class="opts ${kind === "read" ? "" : "glyph-opts"}">${buttons}</div>
        ${feedback}
      </main>`;
  }

  // ---- flashcards ----
  function startFlash(items) {
    state.flash = { s: items[0].script, items, deck: shuffle(items), shown: false, done: 0, total: items.length };
  }
  function viewFlash() {
    const f = state.flash;
    const s = f.s;
    if (!f.deck.length) {
      return `${topbar("Flashcards", s.title)}
        <main class="center-text">
          <div class="card"><div class="score">Done</div><div class="muted">You went through all ${f.total} cards.</div></div>
          <button class="btn primary block" data-act="flash-again">Shuffle and go again</button>
        </main>`;
    }
    const it = f.deck[0];
    const glyphFront = store.flashDir === "glyph";
    const front = glyphFront ? `<div class="big-glyph">${g(s, it.g)}</div>` : `<div class="q-sound">${esc(it.r)}</div>`;
    const back = f.shown
      ? `<hr>
        ${glyphFront ? `<div class="detail-r">${esc(it.r)}</div>` : `<div class="big-glyph">${g(s, it.g)}</div>`}
        ${it.hint ? `<p class="hint">${esc(it.hint)}</p>` : ""}
        ${exampleBlock(it)}`
      : "";
    return `${topbar(`${f.done + 1} of ${f.total}`, `${s.title} · flashcards`)}
      <main>
        ${bar(f.done, f.total, "wide")}
        <div class="card flash" data-act="${f.shown ? "" : "flip"}">
          ${front}
          ${back}
          <div class="card-tools">
            <button class="round play" data-act="say" data-text="${esc(it.speak)}" aria-label="Play">▶</button>
          </div>
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
  function viewWrite() {
    const w = state.write;
    const it = w.items[w.i];
    const s = it.script;
    return `${topbar(`Write ${it.r}`, `${s.title} · ${w.i + 1} of ${w.items.length}`)}
      <main>
        <div class="write-head">
          <span class="write-model">${g(s, it.g)}</span>
          <span class="muted">${esc(it.hint)}</span>
        </div>
        <canvas id="pad" class="pad"></canvas>
        <div class="pad-tools">
          <button class="btn" data-act="pad-undo">Undo</button>
          <button class="btn" data-act="pad-clear">Clear</button>
          <button class="btn" data-act="pad-guide">${store.guide ? "Hide" : "Show"} guide</button>
          <button class="round play" data-act="say" data-text="${esc(it.speak)}" aria-label="Play">▶</button>
        </div>
        <div class="pager">
          <button class="btn" data-act="write-step" data-d="-1" ${w.i <= 0 ? "disabled" : ""}>‹ Prev</button>
          <button class="btn" data-act="write-step" data-d="1" ${w.i >= w.items.length - 1 ? "disabled" : ""}>Next ›</button>
        </div>
        ${s.writeTip ? `<p class="muted">${esc(s.writeTip)}</p>` : ""}
      </main>`;
  }
  function mountPad() {
    const el = document.getElementById("pad");
    if (!el) return;
    const it = state.write.items[state.write.i];
    const s = it.script;
    pad = Pad.mount(el, { glyph: it.g, font: s.font, rtl: s.dir === "rtl", guide: store.guide });
  }

  // ---- reference ----
  function viewArticle() {
    const s = state.script;
    const a = s.articles[state.article];
    return `${topbar(a.title, s.title)}
      <main><article class="article" lang="en">${a.body}</article></main>`;
  }

  function viewForms() {
    const s = state.script;
    const rows = s.lessons
      .filter((l) => l.forms !== false)
      .flatMap((l) => l.items)
      .map((it) => {
        const f = arabicForms(s, it);
        return `<tr data-act="detail" data-key="${esc(it.key)}">
          <td class="fr">${esc(it.r)}</td>
          ${["isolated", "initial", "medial", "final"].map((k) => `<td>${g(s, f[k])}</td>`).join("")}
        </tr>`;
      })
      .join("");
    return `${topbar("Letter forms", s.title)}
      <main>
        <p class="muted">Each letter takes a different shape depending on whether it joins the letter before it, the letter after it, both, or neither. Columns read right to left in the order you meet them in a word.</p>
        <table class="forms-table">
          <thead><tr><th>Sound</th><th>Alone</th><th>Start</th><th>Middle</th><th>End</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </main>`;
  }

  // Hangul syllable builder. Unicode lays out precomposed syllables as
  // 0xAC00 + (initial * 21 + vowel) * 28 + final.
  function viewBuilder() {
    const s = state.script;
    const b = s.builder;
    const pick = (state.build ||= { i: 0, m: 0, f: 0 });
    const ch = String.fromCharCode(0xac00 + (pick.i * 21 + pick.m) * 28 + pick.f);
    const roman = b.initials[pick.i][1] + b.medials[pick.m][1] + b.finals[pick.f][1];
    const row = (name, list, part) =>
      `<h2>${name}</h2><div class="chips">${list
        .map(
          ([j, r], i) =>
            `<button class="chip ${pick[part] === i ? "on" : ""}" data-act="build" data-part="${part}" data-i="${i}">${j ? g(s, j) : "none"}<small>${esc(r || "–")}</small></button>`
        )
        .join("")}</div>`;
    return `${topbar(b.title, s.title)}
      <main>
        <div class="card detail">
          <div class="big-glyph">${g(s, ch)}</div>
          <div class="detail-r">${esc(roman)}</div>
          <p class="hint">${esc(b.initials[pick.i][0] || "")} + ${esc(b.medials[pick.m][0])}${pick.f ? ` + ${esc(b.finals[pick.f][0])}` : ""}</p>
          <div class="card-tools"><button class="round play" data-act="say" data-text="${ch}" aria-label="Play">▶</button></div>
        </div>
        <p class="muted">${esc(b.note)}</p>
        ${row("First consonant", b.initials, "i")}
        ${row("Vowel", b.medials, "m")}
        ${row("Final consonant (batchim)", b.finals, "f")}
      </main>`;
  }

  function viewSettings() {
    const opt = (v, cur, label) => `<option value="${v}" ${String(cur) === String(v) ? "selected" : ""}>${label}</option>`;
    const resets = SCRIPTS.map((s) => `<button class="btn" data-act="reset" data-id="${s.id}">Reset ${esc(s.title)}</button>`).join("");
    return `${topbar("Settings", APP.name)}
      <main>
        <label class="setting"><span>Audio</span><input type="checkbox" data-act="set-voice" ${store.voice ? "checked" : ""}></label>
        <label class="setting"><span>Speech speed</span>
          <select data-act="set-rate">${opt(0.7, store.rate, "Slower")}${opt(1, store.rate, "Normal")}${opt(1.2, store.rate, "Faster")}</select>
        </label>
        <label class="setting"><span>Show romanization on tiles</span><input type="checkbox" data-act="set-roman" ${store.showRoman ? "checked" : ""}></label>
        <label class="setting"><span>Flashcard front</span>
          <select data-act="set-flash">${opt("glyph", store.flashDir, "Character")}${opt("sound", store.flashDir, "Sound")}</select>
        </label>
        <p class="muted">Audio uses your device's text-to-speech voices. On Android: Settings › Accessibility or System › Text-to-speech, then install the voice data for each language you study.</p>
        <h2>Progress</h2>
        <div class="row-actions">${resets}</div>
        <h2>About</h2>
        <p class="muted">${APP.about}</p>
      </main>`;
  }

  function render() {
    pad = null;
    const s = state.script;
    let html;
    switch (state.view) {
      case "home":
        html = viewHome();
        break;
      case "script":
        html = viewScript(s);
        break;
      case "lesson":
        html = viewLesson(state.lesson);
        break;
      case "detail":
        html = viewDetail();
        break;
      case "chart":
        html = viewChart(s);
        break;
      case "choose":
        html = viewChoose();
        break;
      case "quiz":
        html = viewQuiz();
        break;
      case "flash":
        html = viewFlash();
        break;
      case "write":
        html = viewWrite();
        break;
      case "article":
        html = viewArticle();
        break;
      case "forms":
        html = viewForms();
        break;
      case "builder":
        html = viewBuilder();
        break;
      case "settings":
        html = viewSettings();
        break;
      default:
        html = viewHome();
    }
    app.innerHTML = html;
    if (state.view === "write") mountPad();
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
      navigate("write", { write: { items, i: 0 } });
    }
  }

  // ---- events ----
  app.addEventListener("click", (e) => {
    if (e.target.id === "backBtn") return goBack();
    const el = e.target.closest("[data-act]");
    if (!el || el.tagName === "INPUT" || el.tagName === "SELECT") return;
    const act = el.dataset.act;
    const s = state.script;
    switch (act) {
      case "settings":
        if (state.view !== "settings") navigate("settings");
        break;
      case "script":
        navigate("script", { script: scriptById.get(el.dataset.id) });
        break;
      case "lesson":
        navigate("lesson", { lesson: s.lessons[el.dataset.id] });
        break;
      case "detail": {
        const it = itemByKey.get(el.dataset.key);
        const list = state.view === "lesson" ? state.lesson.items : state.view === "chart" ? s.all : it.lesson.items;
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
      case "say":
        say(s || state.quiz.s, el.dataset.text);
        break;
      case "say-slow":
        say(s, el.dataset.text, true);
        break;
      case "chart":
        navigate("chart");
        break;
      case "article":
        navigate("article", { article: Number(el.dataset.id) });
        break;
      case "forms":
        navigate("forms");
        break;
      case "builder":
        navigate("builder");
        break;
      case "build":
        state.build[el.dataset.part] = Number(el.dataset.i);
        render();
        break;
      case "choose":
        navigate("choose", { mode: el.dataset.mode });
        break;
      case "pick-all":
        state.sel[s.id] = new Set(s.lessons.map((l) => l.id));
        render();
        break;
      case "pick-none":
        state.sel[s.id] = new Set();
        render();
        break;
      case "start": {
        const kind = app.querySelector('[data-act="qkind"]')?.value;
        const count = Number(app.querySelector('[data-act="qcount"]')?.value || 10);
        begin(state.mode, pool(), { kind, count });
        break;
      }
      case "start-weak":
        begin(state.mode, s.all.filter(weak), { kind: app.querySelector('[data-act="qkind"]')?.value, count: 0 });
        break;
      case "start-lesson":
        begin(el.dataset.mode, state.lesson.items, { kind: "mix", count: 0 });
        break;
      case "write-one":
        navigate("write", { write: { items: state.list, i: state.list.indexOf(state.item) } });
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
      case "pad-undo":
        pad?.undo();
        break;
      case "pad-clear":
        pad?.clear();
        break;
      case "pad-guide":
        store.guide = !store.guide;
        save();
        pad?.setGuide(store.guide);
        el.textContent = `${store.guide ? "Hide" : "Show"} guide`;
        break;
      case "write-step":
        state.write.i += Number(el.dataset.d);
        render();
        break;
      case "reset": {
        const rs = scriptById.get(el.dataset.id);
        if (confirm(`Clear quiz progress for ${rs.title}?`)) {
          rs.all.forEach((it) => delete store.stats[it.key]);
          save();
          toast(`${rs.title} progress cleared.`);
        }
        break;
      }
    }
  });

  app.addEventListener("change", (e) => {
    const el = e.target;
    switch (el.dataset.act) {
      case "pick": {
        const set = state.sel[state.script.id];
        if (el.checked) set.add(el.dataset.id);
        else set.delete(el.dataset.id);
        break;
      }
      case "set-voice":
        store.voice = el.checked;
        save();
        break;
      case "set-rate":
        store.rate = Number(el.value);
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

  render();
})();
