// Grammar Learner: lessons with examples and explained drills. Lesson data
// lives in data/<lang>.js; progress in localStorage under lsd-grammar-v1 as
// { <lang>: { <lessonId>: { best, total, done, date } } }.
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const mark = (s) => esc(s).replace(/\{([^}]*)\}/g, "<mark>$1</mark>");
  const plain = (s) => s.replace(/[{}]/g, "");
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

  const FILES = { japanese: "data/japanese.js", klingon: "data/klingon.js" };
  const PASS = 0.8;

  const store = LSD.store("lsd-grammar-v1", {});
  const progress = store.load();
  const prefs = LSD.store("lsd-grammar-prefs", { piqad: true });
  const pref = prefs.load();

  let meta = null;
  let course = null;
  let lessonId = null;

  async function init() {
    const metas = await LSD.all();
    LSD.picker($("langSelect"), metas, null, open, "Choose…");
    $("langGrid").innerHTML = metas
      .map((m) => {
        const has = FILES[m.id];
        const big = m.font === "pIqaD" ? '<span class="piqad">' + LSD.piqad("tlhIngan Hol") + "</span>" : esc(m.nativeName || m.name);
        return '<button class="tile" data-lang="' + esc(m.id) + '"' + (has ? "" : " disabled") + '><span class="big target">' + big + "</span><b>" + esc(m.name) + '</b><br><span class="sub">' + (has ? lessonCount(m.id) : "Lessons coming later") + "</span></button>";
      })
      .join("");
    $("langGrid").querySelectorAll("[data-lang]").forEach((b) => (b.onclick = () => {
      LSD.setParam(b.dataset.lang);
      open(b.dataset.lang);
    }));
    $("piqad").checked = pref.piqad;
    $("piqad").onchange = () => {
      pref.piqad = $("piqad").checked;
      prefs.save(pref);
      renderLesson();
    };
    open(LSD.param());
  }

  function lessonCount(id) {
    const done = Object.values(progress[id] || {}).filter((p) => p.done).length;
    return done ? done + " lesson" + (done === 1 ? "" : "s") + " passed" : "Particles and patterns, step by step";
  }

  async function open(id) {
    meta = id ? await LSD.get(id) : null;
    $("langSelect").value = meta ? meta.id : "";
    course = null;
    if (meta && FILES[meta.id]) {
      try {
        await LSD.loadScript(FILES[meta.id]);
        course = window.GRAMMAR[meta.id];
      } catch (e) {
        course = null;
      }
    }
    $("home").hidden = !!course;
    $("course").hidden = !course;
    $("piqadOpt").hidden = !(meta && meta.font === "pIqaD");
    document.body.className = meta ? "lang-" + meta.id : "";
    $("vocabLink").href = LSD.toolUrl("vocabulary-learner/index.html", meta && meta.id);
    if (!course) {
      $("title").textContent = "Grammar Learner";
      $("subtitle").textContent = meta ? "No grammar lessons for " + meta.name + " yet. Japanese and Klingon are ready." : id ? "No language called “" + id + "” in languages/." : "Short lessons with examples, then a drill that explains every answer.";
      document.title = "Grammar Learner — Language Student Desk";
      return;
    }
    $("title").innerHTML = "Grammar Learner <small>" + esc(meta.name) + (meta.nativeName ? " · " + esc(meta.nativeName) : "") + "</small>";
    $("subtitle").textContent = course.title;
    document.title = "Grammar · " + meta.name + " — Language Student Desk";
    const saved = progress[meta.id] || {};
    // Start at the first lesson not yet passed.
    lessonId = (course.lessons.find((l) => !(saved[l.id] && saved[l.id].done)) || course.lessons[0]).id;
    if (location.hash.slice(1) && course.lessons.some((l) => l.id === location.hash.slice(1))) lessonId = location.hash.slice(1);
    renderList();
    renderLesson();
  }

  function renderList() {
    const saved = progress[meta.id] || {};
    const anyDone = course.lessons.some((l) => saved[l.id]);
    $("lessonList").innerHTML =
      '<button data-id="intro"' + (lessonId === "intro" ? ' class="active"' : "") + '><span class="tick">ℹ</span><span class="lt">About this course</span></button><hr>' +
      course.lessons
        .map((l, i) => {
          const p = saved[l.id];
          return '<button data-id="' + l.id + '"' + (l.id === lessonId ? ' class="active"' : "") + '><span class="tick">' + (p && p.done ? "✓" : i + 1) + '</span><span class="lt">' + esc(l.title) + "</span>" + (p ? '<span class="score">' + p.best + "/" + p.total + "</span>" : "") + "</button>";
        })
        .join("") +
      '<hr><button data-id="mixed"' + (lessonId === "mixed" ? ' class="active"' : "") + (anyDone ? "" : " disabled") + '><span class="tick">↻</span><span class="lt">Mixed review</span></button>';
    $("lessonList").querySelectorAll("[data-id]").forEach((b) => (b.onclick = () => {
      lessonId = b.dataset.id;
      history.replaceState(null, "", "#" + lessonId);
      renderList();
      renderLesson();
      window.scrollTo(0, 0);
    }));
  }

  // ---------- lesson pages ----------

  function piqadOn() {
    return meta.font === "pIqaD" && pref.piqad;
  }

  function example(ex) {
    const pq = piqadOn() ? '<div class="pq">' + esc(LSD.piqad(plain(ex[0]))) + "</div>" : "";
    return '<div class="ex">' + pq + '<div class="t">' + mark(ex[0]) + '</div><div class="r">' + esc(ex[1]) + '</div><div class="e">' + esc(ex[2]) + "</div></div>";
  }

  function renderLesson() {
    if (!course) return;
    const box = $("lesson");
    if (lessonId === "intro") {
      box.innerHTML = '<div class="card lesson"><h2>' + esc(course.title) + "</h2><p>" + esc(course.intro) + '</p><p class="muted">Pass a lesson by getting ' + PASS * 100 + "% of its drill right. Your best scores are saved in this browser, and the Language Learner uses them to track your path.</p></div>";
      return;
    }
    if (lessonId === "mixed") return startDrill(mixedDrills(), "Mixed review", null);
    const l = course.lessons.find((x) => x.id === lessonId);
    let html = '<div class="card lesson"><h2>' + esc(l.title) + '</h2><p class="sum">' + esc(l.summary) + "</p>";
    for (const s of l.sections) {
      if (s.h) html += "<h3>" + esc(s.h) + "</h3>";
      if (s.p) html += "<p>" + s.p.replace(/\{([^}]*)\}/g, "<mark>$1</mark>") + "</p>"; // lesson text is trusted, written in data/*.js
      (s.examples || []).forEach((ex) => (html += example(ex)));
    }
    if (l.table) html += gridTable(l.table);
    html += "</div>";
    box.innerHTML = html + '<div class="card practice" id="practice"></div>';
    startDrill(drillsFor(l), "Practice", l);
  }

  // The Klingon prefix grid, or one column of it.
  function gridTable(which) {
    const G = window.KLINGON_GRID;
    if (!G) return "";
    if (which === "imperative") {
      const rows = Object.entries(G.IMPERATIVES).map(([o, p]) => "<tr><th>" + (o === "none" ? "(no object)" : "→ " + o) + "</th><td>" + p[0] + "-</td><td>" + p[1] + "-</td></tr>").join("");
      return '<div class="gridtable"><table><tr><th></th><th>to one person</th><th>to several</th></tr>' + rows + "</table></div>";
    }
    const objs = which === "none" ? ["none"] : G.OBJECTS;
    const head = "<tr><th>subject ↓ object →</th>" + objs.map((o) => "<th>" + (o === "none" ? "(none)" : o) + "</th>").join("") + "</tr>";
    const rows = G.SUBJECTS.map((s) => "<tr><th>" + s + "</th>" + objs.map((o) => {
      const p = G.PREFIXES[s][o];
      return p === undefined ? '<td class="no">—</td>' : p === "" ? '<td class="empty">none</td>' : "<td>" + p + "-</td>";
    }).join("") + "</tr>").join("");
    return '<div class="gridtable"><table>' + head + rows + '</table><p class="small muted">none = the bare verb, no prefix · — = not possible with a prefix (use -\'egh “oneself”)</p></div>';
  }

  // ---------- drills ----------

  function drillsFor(lesson) {
    if (lesson.generate) return klingonDrills(lesson.generate.kind, lesson.generate.count).concat(lesson.drills || []);
    return shuffle(lesson.drills.slice());
  }

  function mixedDrills() {
    const saved = progress[meta.id] || {};
    const pool = course.lessons.filter((l) => saved[l.id]).flatMap((l) => drillsFor(l).map((d) => Object.assign({ from: l.title }, d)));
    return shuffle(pool).slice(0, 12);
  }

  let drill = null;

  function startDrill(items, label, lesson) {
    drill = { items, i: 0, right: 0, label, lesson, answered: false };
    if (lessonId === "mixed") $("lesson").innerHTML = '<div class="card"><h2>Mixed review</h2><p class="muted">Questions from every lesson you have practised.</p></div><div class="card practice" id="practice"></div>';
    drawDrill();
  }

  function drawDrill() {
    const box = $("practice");
    if (!box) return;
    const d = drill.items[drill.i];
    if (!d) return finishDrill();
    const opts = d.shuffled || (d.shuffled = d.keepOrder ? d.options.slice() : shuffle(d.options.slice()));
    const pq = piqadOn() && d.kl ? '<span class="pq">' + esc(LSD.piqad(d.kl)) + "</span>" : "";
    box.innerHTML =
      '<div class="scorebar"><span>' + esc(drill.label) + (d.from ? " · " + esc(d.from) : "") + "</span><span>" + (drill.i + 1) + " / " + drill.items.length + " · " + drill.right + " right</span></div>" +
      '<div class="progress"><span style="width:' + (100 * drill.i) / drill.items.length + '%"></span></div>' +
      '<div class="drill-q">' + pq + mark(d.q).replace(/＿/g, '<mark>＿＿</mark>') + "</div>" +
      (d.en ? '<div class="drill-en">' + esc(d.en) + "</div>" : '<div class="drill-en"></div>') +
      '<div class="opts">' + opts.map((o, i) => '<button data-o="' + i + '">' + esc(o) + "</button>").join("") + "</div>" +
      '<div id="why"></div>';
    drill.answered = false;
    box.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => answer(opts[+b.dataset.o], b)));
  }

  function answer(choice, btn) {
    if (drill.answered) return;
    drill.answered = true;
    const d = drill.items[drill.i];
    const ok = choice === d.answer;
    if (ok) drill.right++;
    $("practice").querySelectorAll("[data-o]").forEach((b) => {
      b.disabled = true;
      if (b.textContent === d.answer) b.classList.add("right");
    });
    if (!ok) btn.classList.add("wrongpick");
    $("why").innerHTML = '<div class="why ' + (ok ? "ok" : "bad") + '"><b>' + (ok ? "Right." : "Not quite — it's " + esc(d.answer) + ".") + "</b> " + esc(d.why || "") + '</div><div class="row" style="margin-top:0.7rem"><button class="primary" id="nextQ">' + (drill.i + 1 < drill.items.length ? "Next" : "See score") + "</button><span class=\"small muted\"><kbd>Enter</kbd></span></div>";
    $("nextQ").onclick = nextQ;
    $("nextQ").focus();
  }

  function nextQ() {
    drill.i++;
    drawDrill();
  }

  function finishDrill() {
    const total = drill.items.length;
    const passed = drill.right / total >= PASS;
    let msg = "";
    if (drill.lesson) {
      const all = (progress[meta.id] = progress[meta.id] || {});
      const prev = all[drill.lesson.id];
      const best = Math.max(drill.right, prev ? Math.round((prev.best / prev.total) * total) : 0);
      all[drill.lesson.id] = { best, total, done: !!(passed || (prev && prev.done)), date: new Date().toLocaleDateString("sv") };
      store.save(progress);
      renderList();
      msg = passed ? "Lesson passed." : "Get " + Math.ceil(PASS * total) + " right to pass this lesson.";
    }
    const idx = drill.lesson ? course.lessons.indexOf(drill.lesson) : -1;
    const next = idx >= 0 ? course.lessons[idx + 1] : null;
    $("practice").innerHTML =
      '<h2>' + drill.right + " / " + total + "</h2><p>" + esc(msg) + "</p>" +
      '<div class="row"><button id="again">Try again</button>' + (next && passed ? '<button class="primary" id="nextL">Next: ' + esc(next.title) + "</button>" : "") + "</div>";
    $("again").onclick = () => (lessonId === "mixed" ? startDrill(mixedDrills(), "Mixed review", null) : startDrill(drillsFor(drill.lesson), "Practice", drill.lesson));
    if ($("nextL")) $("nextL").onclick = () => {
      lessonId = next.id;
      history.replaceState(null, "", "#" + lessonId);
      renderList();
      renderLesson();
      window.scrollTo(0, 0);
    };
  }

  document.addEventListener("keydown", (e) => {
    if (!drill || e.target.matches("input, select, textarea")) return;
    if (e.key === "Enter" && drill.answered && $("nextQ") && document.activeElement !== $("nextQ")) nextQ();
    else if (!drill.answered && /^[1-9]$/.test(e.key)) {
      const b = $("practice") && $("practice").querySelector('[data-o="' + (+e.key - 1) + '"]');
      if (b) b.click();
    }
  });

  // ---------- Klingon prefix drills, generated from the grid ----------

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function english(s, o, v) {
    const subj = s === "he/she" ? "He/she" : cap(s);
    const verb = s === "he/she" ? v[2] : v[1];
    return subj + " " + verb + (o === "none" ? "" : " " + o) + ".";
  }

  // Every reading of prefix + verb, as one answer string.
  function meanings(prefix, v, withObject) {
    const G = window.KLINGON_GRID;
    const out = [];
    for (const s of G.SUBJECTS) for (const o of G.OBJECTS) {
      if (G.PREFIXES[s][o] !== prefix) continue;
      if (withObject === (o === "none")) continue;
      out.push(english(s, o, v));
    }
    return out.join(" / ");
  }

  function klingonDrills(kind, count) {
    const G = window.KLINGON_GRID;
    const items = [];
    const seen = new Set();
    let guard = 0;
    while (items.length < count && guard++ < 500) {
      const d = kind === "imperative" ? imperativeDrill(G) : prefixDrill(G, kind);
      if (d && !seen.has(d.q)) {
        seen.add(d.q);
        items.push(d);
      }
    }
    return items;
  }

  function prefixDrill(G, kind) {
    const s = pickOne(G.SUBJECTS);
    let o;
    if (kind === "none") o = "none";
    else if (kind === "object") o = pickOne(G.OBJECTS.slice(1));
    else o = pickOne(G.OBJECTS);
    const p = G.PREFIXES[s][o];
    if (p === undefined || (kind === "object" && p === "")) return null;
    const v = pickOne(o === "none" ? G.INTRANSITIVE : G.TRANSITIVE);
    const cells = (filter) => {
      const set = new Set();
      for (const s2 of G.SUBJECTS) for (const o2 of G.OBJECTS) {
        const p2 = G.PREFIXES[s2][o2];
        if (p2 !== undefined && filter(o2)) set.add(p2);
      }
      return [...set];
    };
    const pool = cells((o2) => (o === "none" ? o2 === "none" : o2 !== "none")).filter((x) => x !== p);
    const wrong = shuffle(pool).slice(0, 3);
    const label = (x) => (x === "" ? "(no prefix) " : x + "-") + v[0];
    if (Math.random() < 0.5) {
      // English → Klingon
      return {
        q: "Say it in Klingon: “" + english(s, o, v) + "”",
        en: v[0] + " = " + v[1],
        options: [p, ...wrong].map((x) => x + v[0]),
        answer: p + v[0],
        why: label(p) + ": " + (p === "" ? "no prefix for he/she/they with no object or a him/her/them object." : meanings(p, v, o !== "none")),
      };
    }
    // Klingon → English
    const right = meanings(p, v, o !== "none");
    const others = wrong.map((x) => meanings(x, v, o !== "none")).filter((m) => m && m !== right);
    return {
      q: "What does {" + p + "}" + v[0] + " mean?",
      kl: p + v[0],
      en: v[0] + " = " + v[1],
      options: [right, ...others],
      answer: right,
      why: (p ? p + "- covers: " : "No prefix covers: ") + right,
    };
  }

  function imperativeDrill(G) {
    const objs = Object.keys(G.IMPERATIVES);
    const o = pickOne(objs);
    const many = o === "none" && Math.random() < 0.5;
    const p = G.IMPERATIVES[o][many ? 1 : 0];
    const v = pickOne(o === "none" ? G.INTRANSITIVE : G.TRANSITIVE);
    const eng = cap(v[1]) + (o === "none" ? "" : " " + (o === "him/her" ? "him/her" : o)) + (many ? ", all of you" : "") + "!";
    const all = ["yI", "pe", "HI", "gho", "tI"].filter((x) => x !== p);
    return {
      q: "Command: “" + eng + "”",
      en: v[0] + " = " + v[1],
      options: [p, ...shuffle(all).slice(0, 3)].map((x) => x + v[0] + "!"),
      answer: p + v[0] + "!",
      why: p + "- is the command prefix " + (o === "none" ? "with no object, speaking to " + (many ? "several people." : "one person.") : "for an object of “" + o + "”."),
    };
  }

  init();
})();
