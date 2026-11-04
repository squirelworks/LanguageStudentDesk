// Programming Learner: lessons with worked examples and a practice round that
// explains every answer. data/catalog.js lists the languages and sections.js
// lays them out (sections or A–Z, tag filter); each course lives
// in data/<id>.js (schema at the top of data/python.js). Progress is kept in
// localStorage under lsd-programming-v1 as
// { <lang>: { <lessonId>: { best, total, done, date } } }.
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const SECTIONS = window.PROGRAMMING_SECTIONS;
  const CATALOG = window.PROGRAMMING_CATALOG.slice().sort(SECTIONS.byName);
  const TAGS = SECTIONS.tags(CATALOG);
  const layout = SECTIONS.load();
  if (layout.tag && !TAGS.includes(layout.tag)) layout.tag = "";
  // Which groups are shown: the older and joke switches (also in Settings).
  let show = SECTIONS.shown();
  const PASS = 0.8;
  const store = LSD.store("lsd-programming-v1", {});
  const progress = store.load();

  let entry = null;
  let pack = null;
  let lessonId = null;
  let quiz = null;

  // ---------- syntax colouring ----------
  // One pass over the code: comments, strings, numbers and words, so a # inside
  // a string or a keyword inside a comment is never coloured twice.
  function highlight(code, p) {
    if (!p || !p.keywords) return esc(code);
    const kw = new Set(p.keywords);
    const bi = new Set(p.builtins || []);
    const ci = !!p.caseInsensitive;
    const norm = (w) => (ci ? w.toUpperCase() : w);
    const cm = p.comment ? p.comment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*" : "(?!)";
    const str = /[rRbBfF]{0,2}(?:"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/.source;
    const re = new RegExp("(" + cm + ")|(" + (p.noStrings ? "(?!)" : str) + ")|(\\b\\d[0-9A-Fa-f]*[hH]\\b|\\b[01]+[bB]\\b|\\b\\d+(?:\\.\\d+)?\\b)|([A-Za-z_$][A-Za-z0-9_$]*)", "g");
    let out = "";
    let last = 0;
    code.replace(re, (m, c, s, n, w, at) => {
      out += esc(code.slice(last, at));
      last = at + m.length;
      if (c) out += '<span class="c">' + esc(m) + "</span>";
      else if (s) out += '<span class="s">' + esc(m) + "</span>";
      else if (n) out += '<span class="n">' + esc(m) + "</span>";
      else if (kw.has(norm(w))) out += '<span class="k">' + esc(m) + "</span>";
      else if (bi.has(norm(w))) out += '<span class="b">' + esc(m) + "</span>";
      else out += esc(m);
      return m;
    });
    return out + esc(code.slice(last));
  }

  // A track (one topic in several languages) tags each example with its
  // language; pack.langs holds that language's name and colouring words.
  function langOf(id) {
    return id && pack.langs && pack.langs[id] ? pack.langs[id] : null;
  }

  function codeBlock(code, out, lang) {
    const l = langOf(lang);
    return (
      '<div class="code">' + (l ? '<span class="lang">' + esc(l.name) + "</span>" : "") + '<button class="copy" title="Copy code">Copy</button><pre><code>' + highlight(code, l || pack) + "</code></pre>" +
      ((l || pack).preview
        ? '<div class="out"><span class="lbl">Result</span><iframe class="preview" sandbox="" title="Result" srcdoc="' + esc(code) + '"></iframe></div>'
        : out != null ? '<div class="out"><span class="lbl">Output</span><pre>' + esc(out) + "</pre></div>" : "") +
      "</div>"
    );
  }

  function wireCopy(root) {
    root.querySelectorAll(".copy").forEach((b) => (b.onclick = () => {
      const text = b.nextElementSibling.textContent;
      const done = () => {
        b.textContent = "Copied";
        setTimeout(() => (b.textContent = "Copy"), 1200);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
    }));
  }

  // ---------- home ----------
  function passed(id) {
    return Object.values(progress[id] || {}).filter((p) => p.done).length;
  }

  function tile(c) {
    const n = passed(c.id);
    return '<button class="tile" data-lang="' + esc(c.id) + '"><span class="big">' + esc(c.name) + '</span><span class="era">' + esc(c.era) + '</span><span class="sub">' + esc(c.blurb) + "</span>" +
      (c.tags && c.tags.length ? '<span class="tags">' + c.tags.map(esc).join(" · ") + "</span>" : "") +
      (n ? '<span class="pill good">' + n + " lesson" + (n === 1 ? "" : "s") + " passed</span>" : "") + "</button>";
  }

  function renderControls() {
    const seg = (v, label) => '<button data-view="' + v + '"' + (layout.view === v ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + ">" + label + "</button>";
    const chip = (t, label) => '<button data-tag="' + esc(t) + '"' + (layout.tag === t ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + ">" + esc(label) + "</button>";
    $("homeControls").innerHTML =
      '<div class="seg" role="group" aria-label="View">' + seg("sections", "By section") + seg("az", "A–Z") + "</div>" +
      (TAGS.length ? '<div class="chips" role="group" aria-label="Category">' + chip("", "All") + TAGS.map((t) => chip(t, t)).join("") + "</div>" : "");
    $("homeControls").querySelectorAll("[data-view]").forEach((b) => (b.onclick = () => {
      layout.view = b.dataset.view;
      SECTIONS.save(layout);
      renderHome();
      fillSelect();
    }));
    $("homeControls").querySelectorAll("[data-tag]").forEach((b) => (b.onclick = () => {
      layout.tag = b.dataset.tag;
      SECTIONS.save(layout);
      renderHome();
    }));
  }

  function renderHome() {
    renderControls();
    SECTIONS.renderSwitches($("homeSwitches"));
    const blocks = SECTIONS.arrange(CATALOG, { view: layout.view, tag: layout.tag, show });
    $("langGrid").innerHTML = blocks.length
      ? blocks.map((b) =>
          '<section class="group">' + (layout.view === "az" ? "" : "<h3>" + esc(b.title) + '</h3><p class="small muted">' + esc(b.sub) + "</p>") +
          '<div class="grid">' + b.items.map(tile).join("") + "</div></section>"
        ).join("")
      : '<p class="muted">No languages match this filter.</p>';
    $("langGrid").querySelectorAll("[data-lang]").forEach((b) => (b.onclick = () => {
      LSD.setParam(b.dataset.lang);
      open(b.dataset.lang);
    }));
  }

  // ---------- course ----------
  async function open(id) {
    entry = CATALOG.find((c) => c.id === id) || null;
    $("langSelect").value = entry ? entry.id : "";
    pack = null;
    if (entry) {
      try {
        await LSD.loadScript("data/" + entry.id + ".js");
        pack = window.PROGRAMMING[entry.id] || null;
      } catch (e) {
        pack = null;
      }
    }
    $("home").hidden = !!pack;
    $("course").hidden = !pack;
    $("courseNote").hidden = true;
    if (!pack) {
      $("title").textContent = "Programming Learner";
      $("subtitle").textContent = id && !entry ? "No course called “" + id + "” here yet. Pick one below." : "Short lessons with worked examples, then practice that explains every answer.";
      document.title = "Programming Learner — Language Student Desk";
      renderHome();
      return;
    }
    $("title").innerHTML = "Programming Learner <small>" + esc(pack.name) + "</small>";
    $("courseNote").hidden = !pack.note;
    $("courseNote").innerHTML = pack.note || "";
    $("subtitle").textContent = pack.title;
    document.title = "Programming · " + pack.name + " — Language Student Desk";
    const saved = progress[pack.id] || {};
    lessonId = (pack.lessons.find((l) => !(saved[l.id] && saved[l.id].done)) || pack.lessons[0]).id;
    if (Object.keys(saved).length === 0) lessonId = "intro";
    const h = location.hash.slice(1);
    if (h === "intro" || pack.lessons.some((l) => l.id === h)) lessonId = h;
    renderList();
    renderLesson();
  }

  function renderList() {
    const saved = progress[pack.id] || {};
    const anyDone = pack.lessons.some((l) => saved[l.id]);
    const btn = (id, tick, label, extra, disabled) =>
      '<button data-id="' + id + '"' + (id === lessonId ? ' class="active"' : "") + (disabled ? " disabled" : "") + '><span class="tick">' + tick + '</span><span class="lt">' + esc(label) + "</span>" + (extra || "") + "</button>";
    $("lessonList").innerHTML =
      btn("intro", "ℹ", "About this course") + "<hr>" +
      pack.lessons.map((l, i) => {
        const p = saved[l.id];
        return btn(l.id, p && p.done ? "✓" : i + 1, l.title, p ? '<span class="score">' + p.best + "/" + p.total + "</span>" : "");
      }).join("") +
      (pack.lessons.length > 1 ? "<hr>" + btn("mixed", "↻", "Mixed review", "", !anyDone) : "");
    $("lessonList").querySelectorAll("[data-id]").forEach((b) => (b.onclick = () => go(b.dataset.id)));
  }

  function go(id) {
    lessonId = id;
    history.replaceState(null, "", location.search + "#" + id);
    renderList();
    renderLesson();
    window.scrollTo(0, 0);
  }

  function renderLesson() {
    quiz = null;
    const el = $("lesson");
    if (lessonId === "intro") {
      const saved = progress[pack.id] || {};
      const done = pack.lessons.filter((l) => saved[l.id] && saved[l.id].done).length;
      el.innerHTML =
        '<div class="card lesson"><h2>' + esc(pack.title) + "</h2><p>" + pack.intro + "</p>" +
        '<div class="progress"><span style="width:' + Math.round((100 * done) / pack.lessons.length) + '%"></span></div>' +
        '<p class="small muted">' + done + " of " + pack.lessons.length + " lessons passed. Pass a lesson by getting " + Math.round(PASS * 100) + "% of its practice right.</p>" +
        "<h3>Lessons</h3><ol>" + pack.lessons.map((l) => '<li><button class="link" data-go="' + l.id + '">' + esc(l.title) + "</button> <span class=\"muted\">— " + esc(l.summary) + "</span></li>").join("") + "</ol>" +
        '<button class="primary" data-go="' + pack.lessons[0].id + '">Start with lesson 1</button></div>';
      el.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
      return;
    }
    if (lessonId === "mixed") {
      const saved = progress[pack.id] || {};
      const pool = pack.lessons.filter((l) => saved[l.id]).flatMap((l) => l.practice);
      el.innerHTML = '<div class="card practice" id="practice"></div>';
      startQuiz(shuffle(pool.slice()).slice(0, 10), null, "Mixed review");
      return;
    }
    const idx = pack.lessons.findIndex((l) => l.id === lessonId);
    const l = pack.lessons[idx];
    el.innerHTML =
      '<div class="card lesson"><h2>' + (idx + 1) + ". " + esc(l.title) + '</h2><p class="sum">' + esc(l.summary) + "</p>" +
      l.sections.map((s) => (s.h ? "<h3>" + esc(s.h) + "</h3>" : "") + (s.p ? "<p>" + s.p + "</p>" : "") + (s.code != null ? codeBlock(s.code, s.out, s.lang) : "")).join("") +
      "</div>" +
      (l.practice && l.practice.length ? '<div class="card practice" id="practice"></div>' : "") +
      '<div class="row nav">' +
      (idx > 0 ? '<button data-go="' + pack.lessons[idx - 1].id + '">← ' + esc(pack.lessons[idx - 1].title) + "</button>" : "") +
      '<span class="grow"></span>' +
      (idx < pack.lessons.length - 1 ? '<button data-go="' + pack.lessons[idx + 1].id + '">' + esc(pack.lessons[idx + 1].title) + " →</button>" : "") +
      "</div>";
    wireCopy(el);
    el.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
    if (l.practice && l.practice.length) startQuiz(shuffle(l.practice.slice()), l, "Practice");
  }

  // ---------- practice ----------
  function startQuiz(items, lesson, label) {
    quiz = { items, lesson, label, i: 0, right: 0, answered: false };
    renderQuestion();
  }

  function renderQuestion() {
    const box = $("practice");
    if (!box || !quiz) return;
    if (quiz.i >= quiz.items.length) return renderResult();
    const q = quiz.items[quiz.i];
    const multi = q.options.some((o) => o.includes("\n"));
    box.innerHTML =
      '<div class="scorebar"><span>' + esc(quiz.label) + " · question " + (quiz.i + 1) + " of " + quiz.items.length + "</span><span>" + quiz.right + " right</span></div>" +
      '<p class="q">' + esc(q.q) + "</p>" +
      (q.code ? '<div class="code">' + (langOf(q.lang) ? '<span class="lang">' + esc(langOf(q.lang).name) + "</span>" : "") + "<pre><code>" + highlight(q.code, langOf(q.lang) || pack) + "</code></pre></div>" : "") +
      '<div class="opts' + (multi ? " tall" : "") + '">' + shuffle(q.options.slice()).map((o) => '<button data-o="' + esc(o) + '"><pre>' + esc(o) + "</pre></button>").join("") + "</div>" +
      '<div id="why"></div>';
    box.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => answer(b)));
  }

  function answer(b) {
    if (quiz.answered) return;
    quiz.answered = true;
    const q = quiz.items[quiz.i];
    const ok = b.dataset.o === q.answer;
    if (ok) quiz.right++;
    $("practice").querySelectorAll("[data-o]").forEach((x) => {
      x.disabled = true;
      if (x.dataset.o === q.answer) x.classList.add("right");
    });
    if (!ok) b.classList.add("wrongpick");
    $("why").innerHTML =
      '<div class="why ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? "Right." : "Not quite.") + "</b> " + esc(q.why) + "</div>" +
      '<div class="row" style="margin-top:0.7rem"><button class="primary" id="next">' + (quiz.i + 1 < quiz.items.length ? "Next question" : "See result") + "</button></div>";
    $("next").onclick = () => {
      quiz.i++;
      quiz.answered = false;
      renderQuestion();
    };
    $("next").focus();
  }

  function renderResult() {
    const { right, items, lesson } = quiz;
    const total = items.length;
    const ok = right / total >= PASS;
    if (lesson) {
      const all = (progress[pack.id] = progress[pack.id] || {});
      const prev = all[lesson.id];
      all[lesson.id] = {
        best: Math.max(right, prev ? prev.best : 0),
        total,
        done: ok || !!(prev && prev.done),
        date: new Date().toISOString().slice(0, 10),
      };
      store.save(progress);
      renderList();
    }
    const idx = lesson ? pack.lessons.indexOf(lesson) : -1;
    const next = idx >= 0 && idx < pack.lessons.length - 1 ? pack.lessons[idx + 1] : null;
    $("practice").innerHTML =
      "<h3>" + right + " / " + total + (ok ? " — passed" : "") + "</h3>" +
      "<p>" + (ok ? (lesson ? "Nicely done. This lesson is marked as passed." : "Nicely done.") : "Read back over the examples, then try again. " + Math.ceil(PASS * total) + " right passes.") + "</p>" +
      '<div class="row"><button id="again">Try again</button>' + (ok && next ? '<button class="primary" data-go="' + next.id + '">Next: ' + esc(next.title) + "</button>" : "") + "</div>";
    $("again").onclick = () => (lesson ? startQuiz(shuffle(lesson.practice.slice()), lesson, "Practice") : renderLesson());
    $("practice").querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
  }

  // ---------- start ----------
  const sel = $("langSelect");
  // The header menu follows the same layout as the home page: grouped by
  // section, or one A–Z list. The tag filter only narrows the home page.
  function fillSelect() {
    const current = sel.value;
    sel.innerHTML = "";
    sel.add(new Option("All languages", ""));
    SECTIONS.arrange(CATALOG, { view: layout.view, show }).forEach((b) => {
      const parent = layout.view === "az" ? sel : sel.appendChild(Object.assign(document.createElement("optgroup"), { label: b.title }));
      b.items.forEach((c) => parent.appendChild(new Option(c.name, c.id)));
    });
    sel.value = current;
  }
  fillSelect();
  SECTIONS.onSwitch(() => {
    show = SECTIONS.shown();
    fillSelect();
    if (!pack) renderHome();
  });
  sel.onchange = () => {
    LSD.setParam(sel.value || null);
    history.replaceState(null, "", location.search);
    open(sel.value || null);
  };
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1);
    if (pack && h !== lessonId && (h === "intro" || pack.lessons.some((l) => l.id === h))) go(h);
  });
  open(LSD.param());
})();
