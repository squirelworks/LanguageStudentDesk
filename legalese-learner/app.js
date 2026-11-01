// Legalese Learner: short lessons on how legal sentences work, then practice
// that explains every answer. Progress is kept in localStorage under
// lsd-legalese-v1. This is reading practice, not legal advice.
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

  const COURSE = window.LEGALESE;
  const PASS = 0.8;
  const store = LSD.store("lsd-legalese-v1", {});
  const progress = store.load();
  let lessonId = null;

  function passed(id) {
    return !!(progress[id] && progress[id].done);
  }

  function renderHome() {
    lessonId = null;
    $("home").hidden = false;
    $("course").hidden = true;
    $("title").textContent = "Legalese Learner";
    $("subtitle").textContent = "How the heavy words in a contract actually work.";
    document.title = "Legalese Learner — Language Student Desk";
    history.replaceState(null, "", location.pathname + location.search);
    const n = COURSE.lessons.filter((l) => passed(l.id)).length;
    $("homeProgress").textContent = n ? n + " of " + COURSE.lessons.length + " lessons passed" : "Six short lessons. Each one ends in practice.";
    $("lessonGrid").innerHTML = COURSE.lessons.map((l, i) =>
      '<button class="tile" data-go="' + esc(l.id) + '"><span class="big">' + (i + 1) + '</span><b>' + esc(l.title) + '</b><br><span class="sub">' + esc(l.summary) + "</span>" +
      (passed(l.id) ? '<span class="pill good">Passed</span>' : "") + "</button>"
    ).join("");
    $("lessonGrid").querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
  }

  function renderLesson(lesson) {
    lessonId = lesson.id;
    $("home").hidden = true;
    $("course").hidden = false;
    $("title").textContent = lesson.title;
    $("subtitle").textContent = lesson.summary;
    document.title = lesson.title + " — Legalese Learner";
    history.replaceState(null, "", "#" + lesson.id);
    $("lessonList").innerHTML = '<button type="button" id="backHome">All lessons</button><hr>' +
      COURSE.lessons.map((l) =>
        '<button type="button" data-go="' + esc(l.id) + '"' + (l.id === lesson.id ? ' class="active"' : "") + ">" +
        '<span class="tick">' + (passed(l.id) ? "✓" : "") + '</span><span class="lt">' + esc(l.title) + "</span></button>"
      ).join("");
    $("backHome").onclick = renderHome;
    $("lessonList").querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));

    const body = lesson.sections.map((s) =>
      (s.h ? "<h3>" + esc(s.h) + "</h3>" : "") +
      "<p>" + s.p + "</p>" +
      (s.example ? '<blockquote class="clause">' + esc(s.example) + "</blockquote>" : "")
    ).join("");
    const prev = progress[lesson.id];
    $("lesson").innerHTML =
      '<article class="card lesson"><h2>' + esc(lesson.title) + "</h2><p class=\"sum\">" + esc(lesson.summary) + "</p>" +
      body +
      '<div class="row nav"><span class="grow"></span><button class="primary" id="practise">' +
      (prev && prev.done ? "Practise again" : "Practise") + "</button></div></article>" +
      '<div id="practice"></div>';
    $("practise").onclick = () => startQuiz(shuffle(lesson.practice.slice()), lesson);
  }

  function startQuiz(questions, lesson) {
    const total = questions.length;
    let index = 0;
    let right = 0;
    const ask = () => {
      const q = questions[index];
      const opts = shuffle(q.options.slice());
      $("practice").innerHTML =
        '<article class="card practice"><div class="scorebar"><span>Question ' + (index + 1) + " of " + total + "</span><span>" + right + " right</span></div>" +
        '<p class="q">' + esc(q.q) + "</p>" +
        '<div class="opts">' + opts.map((o) => '<button type="button" data-pick="' + esc(o) + '">' + esc(o) + "</button>").join("") + "</div>" +
        '<div id="why"></div></article>';
      $("practice").querySelectorAll("[data-pick]").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.pick === q.answer;
        if (ok) right++;
        $("practice").querySelectorAll("[data-pick]").forEach((x) => {
          x.disabled = true;
          if (x.dataset.pick === q.answer) x.classList.add("right");
          else if (x === b) x.classList.add("wrongpick");
        });
        $("why").innerHTML = '<p class="why ' + (ok ? "ok" : "bad") + '">' + (ok ? "Yes. " : "Not quite. ") + q.why + "</p>" +
          '<div class="row"><button class="primary" id="next">' + (index + 1 < total ? "Next" : "See result") + "</button></div>";
        $("next").onclick = () => {
          index++;
          if (index < total) ask();
          else finish();
        };
      }));
    };
    const finish = () => {
      const ok = right / total >= PASS;
      progress[lesson.id] = {
        best: Math.max(right, (progress[lesson.id] && progress[lesson.id].best) || 0),
        total,
        done: ok || !!(progress[lesson.id] && progress[lesson.id].done),
        date: new Date().toISOString().slice(0, 10),
      };
      store.save(progress);
      const next = COURSE.lessons[COURSE.lessons.indexOf(lesson) + 1];
      renderLesson(lesson);
      $("practice").innerHTML =
        '<article class="card practice"><h3>' + right + " / " + total + (ok ? " — passed" : "") + "</h3>" +
        "<p>" + (ok ? "That is enough to mark the lesson passed." : "Read the lesson again, then retry. " + Math.ceil(PASS * total) + " right passes.") + "</p>" +
        '<div class="row"><button id="again">Try again</button>' +
        (ok && next ? '<button class="primary" id="goNext">Next: ' + esc(next.title) + "</button>" : "") +
        "</div></article>";
      $("again").onclick = () => startQuiz(shuffle(lesson.practice.slice()), lesson);
      if ($("goNext")) $("goNext").onclick = () => go(next.id);
    };
    ask();
  }

  function go(id) {
    const lesson = COURSE.lessons.find((l) => l.id === id);
    if (!lesson) renderHome();
    else {
      renderLesson(lesson);
      const box = $("practice");
      if (box) box.innerHTML = "";
    }
  }

  const hash = location.hash.slice(1);
  if (hash && COURSE.lessons.some((l) => l.id === hash)) go(hash);
  else renderHome();
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1);
    if (h !== lessonId) go(h);
  });
})();
