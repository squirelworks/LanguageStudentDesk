(() => {
  const state = {
    view: "home",
    stack: [],
    catalog: null,
    byChar: new Map(),
    quiz: null,
    detailChar: null,
    detailTab: "details",
    dictQuery: "",
    dictLevel: "all",
  };

  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function unique(list) {
    return [...new Set(list.filter(Boolean))];
  }

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem("squirrelgo-kanji-progress") || "{}");
    } catch {
      return {};
    }
  }
  function saveProgress(p) {
    localStorage.setItem("squirrelgo-kanji-progress", JSON.stringify(p));
  }
  function markSeen(ch) {
    const p = getProgress();
    p.seen = p.seen || {};
    p.seen[ch] = (p.seen[ch] || 0) + 1;
    saveProgress(p);
  }

  function navigate(view, opts = {}) {
    if (!opts.replace && state.view !== view) state.stack.push(state.view);
    Object.assign(state, opts.state || {});
    state.view = view;
    render();
  }

  function goBack() {
    const prev = state.stack.pop() || "home";
    state.view = prev;
    render();
  }

  function resolveChars(chars) {
    return unique(chars)
      .map((c) => state.byChar.get(c))
      .filter(Boolean);
  }

  function buildQuiz(title, chars, mode) {
    const pool = resolveChars(chars);
    if (pool.length < 4) {
      alert("Need at least 4 kanji in this set to quiz.");
      return;
    }
    const questions = shuffle(pool).slice(0, Math.min(10, pool.length)).map((item) => {
      let prompt, answer, options;
      if (mode === "meaning") {
        prompt = "Choose the meaning of this Kanji:";
        answer = item.info;
        const distractors = shuffle(
          pool.filter((x) => x.char !== item.char).map((x) => x.info)
        ).slice(0, 3);
        options = shuffle([answer, ...distractors]);
      } else if (mode === "kun") {
        prompt = "Choose the kun-yomi for this Kanji:";
        answer = item.kun || "(no common kun)";
        const distractors = shuffle(
          pool.filter((x) => x.char !== item.char && x.kun).map((x) => x.kun)
        ).slice(0, 3);
        while (distractors.length < 3) distractors.push("—");
        options = shuffle([answer, ...distractors.slice(0, 3)]);
      } else {
        prompt = "Choose on-yomi / reading for this Kanji:";
        answer = item.on || item.roman || "(no common on)";
        const distractors = shuffle(
          pool.filter((x) => x.char !== item.char && (x.on || x.roman)).map((x) => x.on || x.roman)
        ).slice(0, 3);
        while (distractors.length < 3) distractors.push("—");
        options = shuffle([answer, ...distractors.slice(0, 3)]);
      }
      return { char: item.char, item, prompt, answer, options, mode };
    });

    state.quiz = {
      title,
      mode,
      chars: pool.map((c) => c.char),
      questions,
      index: 0,
      score: 0,
      answered: false,
      finished: false,
    };
    navigate("quiz");
  }

  function currentQuestion() {
    return state.quiz?.questions[state.quiz.index];
  }

  function answerQuiz(choice) {
    const q = state.quiz;
    if (!q || q.answered || q.finished) return;
    q.answered = true;
    q.lastChoice = choice;
    if (choice === currentQuestion().answer) q.score += 1;
    markSeen(currentQuestion().char);
    render();
  }

  function nextQuiz() {
    const q = state.quiz;
    if (!q) return;
    if (q.index >= q.questions.length - 1) {
      q.finished = true;
    } else {
      q.index += 1;
      q.answered = false;
      q.lastChoice = null;
    }
    render();
  }

  function topbar(title, subtitle) {
    const canBack = state.view !== "home";
    return `
      <div class="topbar">
        <button class="back-btn ${canBack ? "" : "hidden"}" id="backBtn" type="button">← Back</button>
        <h1>${title}${subtitle ? `<span class="sub">${subtitle}</span>` : ""}</h1>
      </div>
    `;
  }

  function renderHome() {
    const seen = Object.keys(getProgress().seen || {}).length;
    return `
      ${topbar("SquirrelGo Kanji", "TenguGo-style trainer · offline")}
      <main>
        <div class="hero">
          <h2>Learn kanji at your own pace</h2>
          <p>Lessons, packet quizzes, flashcard review, on-yomi groups, and a dictionary — built for modern Android. ${seen} characters practiced on this device.</p>
        </div>
        <div class="menu-grid">
          <button class="menu-card" data-nav="lessons"><strong>Lessons</strong><span>Beginning kanji + how-to guide</span></button>
          <button class="menu-card" data-nav="onyomi"><strong>On-yomi Groups</strong><span>Shared readings &amp; phonetic clusters</span></button>
          <button class="menu-card" data-nav="quizzes"><strong>Quizzes</strong><span>By topic or JLPT level</span></button>
          <button class="menu-card" data-nav="dictionary"><strong>Dictionary</strong><span>Search ${state.byChar.size} Jōyō entries</span></button>
        </div>
        <p class="footer-note">Homage to the discontinued TenguGo Kanji workflow. Original lessons · open kanji data · not affiliated with TenguLogi.</p>
      </main>
    `;
  }

  function renderLessons() {
    const items = window.DESK_LESSONS.beginning
      .map(
        (l) =>
          `<button type="button" data-lesson="${l.id}"><span>${l.title}</span><span class="chev">›</span></button>`
      )
      .join("");
    return `
      ${topbar("Lessons")}
      <main>
        <div class="panel">
          <h2>Beginning Kanji</h2>
          <div class="list">
            <button type="button" data-lesson="how_to_use"><span>How to use SquirrelGo Kanji</span><span class="chev">›</span></button>
            ${items}
          </div>
          <h3>N5 themed packets</h3>
          <div class="list" id="beginThemes"></div>
        </div>
      </main>
    `;
  }

  function themeButtons() {
    const themes = state.catalog.beginning || {};
    const labels = {
      numbers: "JLPT 5 · Numbers",
      location: "JLPT 5 · Location / Direction",
      people: "JLPT 5 · People",
      time: "JLPT 5 · Time",
      adjectives: "JLPT 5 · Adjectives",
      verbs: "JLPT 5 · Verbs",
      nature: "JLPT 5 · Nature",
    };
    return Object.keys(themes)
      .map((k) => {
        const n = themes[k].length;
        return `<button type="button" data-theme="${k}"><span>${labels[k] || k} (${n})</span><span class="chev">›</span></button>`;
      })
      .join("");
  }

  function renderLesson(id) {
    let lesson;
    if (id === "how_to_use") lesson = window.DESK_LESSONS.howToUse;
    else lesson = window.DESK_LESSONS.beginning.find((l) => l.id === id);
    if (!lesson) return renderLessons();
    const body = lesson.body.map((p) => `<p>${p}</p>`).join("");
    const chars = (lesson.chars || []).map((c) => state.byChar.get(c)).filter(Boolean);
    const grid = chars.length
      ? `<div class="char-grid" style="margin:1rem 0">${chars
          .map(
            (c) =>
              `<button class="char-tile" type="button" data-char="${c.char}"><span class="glyph">${c.char}</span><span class="meta">${c.info}</span></button>`
          )
          .join("")}</div>`
      : "";
    const quizBtns =
      chars.length >= 4
        ? `<div class="actions">
            <button class="primary" type="button" data-quiz-mode="meaning">Quiz: Meaning</button>
            <button class="secondary" type="button" data-quiz-mode="kun">Quiz: Kun-yomi</button>
            <button class="secondary" type="button" data-quiz-mode="on">Quiz: On-yomi</button>
          </div>`
        : "";
    return `
      ${topbar(lesson.title)}
      <main>
        <div class="panel lesson-body">
          ${body}
          ${grid}
          ${quizBtns}
        </div>
      </main>
    `;
  }

  function renderTheme(themeKey) {
    const chars = state.catalog.beginning[themeKey] || [];
    const titleMap = {
      numbers: "JLPT 5 · Numbers",
      location: "JLPT 5 · Location / Direction",
      people: "JLPT 5 · People",
      time: "JLPT 5 · Time",
      adjectives: "JLPT 5 · Adjectives",
      verbs: "JLPT 5 · Verbs",
      nature: "JLPT 5 · Nature",
    };
    const items = resolveChars(chars);
    return `
      ${topbar(titleMap[themeKey] || themeKey)}
      <main>
        <div class="panel">
          <p class="muted" style="font-family:system-ui">${items.length} characters in this packet.</p>
          <div class="char-grid">${items
            .map(
              (c) =>
                `<button class="char-tile" type="button" data-char="${c.char}"><span class="glyph">${c.char}</span><span class="meta">${c.info}</span></button>`
            )
            .join("")}</div>
          <div class="actions">
            <button class="primary" type="button" data-packet-quiz="meaning">Meaning quiz</button>
            <button class="secondary" type="button" data-packet-quiz="kun">Kun quiz</button>
            <button class="secondary" type="button" data-packet-quiz="on">Complete / On quiz</button>
            <button class="secondary" type="button" data-packet-review="1">Review flashcards</button>
          </div>
        </div>
      </main>
    `;
  }

  function renderQuizzesHub() {
    return `
      ${topbar("Quizzes")}
      <main>
        <div class="panel">
          <div class="list">
            <button type="button" data-nav="quizzes_topic"><span>By topic</span><span class="chev">›</span></button>
            <button type="button" data-nav="quizzes_level"><span>By JLPT level</span><span class="chev">›</span></button>
            <button type="button" data-nav="quizzes_n5_all"><span>JLPT 5 · Complete set</span><span class="chev">›</span></button>
          </div>
        </div>
      </main>
    `;
  }

  function renderTopics() {
    const topics = Object.keys(state.catalog.topics).sort();
    return `
      ${topbar("By topic")}
      <main>
        <div class="panel">
          <div class="list">
            ${topics
              .map((t) => {
                const n = state.catalog.topics[t].length;
                return `<button type="button" data-topic="${t}"><span>${t} (${n})</span><span class="chev">›</span></button>`;
              })
              .join("")}
          </div>
        </div>
      </main>
    `;
  }

  function renderLevels() {
    const order = ["N5", "N4", "N3", "N2", "N1"];
    return `
      ${topbar("By JLPT level")}
      <main>
        <div class="panel">
          <div class="list">
            ${order
              .map((lv) => {
                const n = (state.catalog.levels[lv] || []).length;
                const label =
                  lv === "N5"
                    ? "JLPT level 5 (easiest)"
                    : lv === "N1"
                      ? "JLPT level 1 (hardest)"
                      : `JLPT level ${lv.slice(1)}`;
                return `<button type="button" data-level="${lv}"><span>${label} · ${n}</span><span class="chev">›</span></button>`;
              })
              .join("")}
          </div>
        </div>
      </main>
    `;
  }

  function renderSetChooser(title, chars) {
    state._setChars = chars;
    return `
      ${topbar(title)}
      <main>
        <div class="panel">
          <p class="muted" style="font-family:system-ui">${resolveChars(chars).length} characters available.</p>
          <div class="actions">
            <button class="primary" type="button" data-set-quiz="meaning">Start meaning quiz</button>
            <button class="secondary" type="button" data-set-quiz="kun">Start kun quiz</button>
            <button class="secondary" type="button" data-set-quiz="on">Start on quiz</button>
            <button class="secondary" type="button" data-set-review="1">Review flashcards</button>
          </div>
        </div>
      </main>
    `;
  }

  function renderQuiz() {
    const q = state.quiz;
    if (!q) return renderHome();
    if (q.finished) {
      return `
        ${topbar(q.title)}
        <main>
          <div class="panel">
            <h2>Quiz complete</h2>
            <div class="score-big">${q.score} / ${q.questions.length}</div>
            <div class="actions">
              <button class="primary" type="button" data-quiz-retry="1">Try again</button>
              <button class="secondary" type="button" data-quiz-review="1">Review set</button>
              <button class="secondary" type="button" id="backHome">Home</button>
            </div>
          </div>
        </main>
      `;
    }
    const item = currentQuestion();
    const n = q.index + 1;
    const total = q.questions.length;
    return `
      ${topbar(q.title)}
      <main>
        <div class="panel">
          <div class="quiz-progress">${n} of ${total}</div>
          <p class="quiz-prompt">${item.prompt}</p>
          <div class="quiz-char">${item.char}</div>
          <div>
            ${item.options
              .map((opt) => {
                let cls = "option";
                if (q.answered) {
                  if (opt === item.answer) cls += " correct";
                  else if (opt === q.lastChoice) cls += " wrong";
                }
                return `<button class="${cls}" type="button" data-answer="${encodeURIComponent(opt)}" ${q.answered ? "disabled" : ""}>${opt}</button>`;
              })
              .join("")}
          </div>
          <div class="actions">
            <button class="secondary" type="button" data-show-detail="${item.char}">Review card</button>
            ${q.answered ? `<button class="primary" type="button" id="nextQuiz">Next</button>` : ""}
          </div>
        </div>
      </main>
    `;
  }

  function renderDetail(ch, fromQuiz = false) {
    const item = state.byChar.get(ch);
    if (!item) return renderHome();
    state.detailChar = ch;
    const tab = state.detailTab;
    return `
      ${topbar("Flashcards", item.info)}
      <main>
        <div class="panel">
          <div class="detail-glyph">${item.char}</div>
          <div class="detail-meaning">${item.info}</div>
          <div class="tabs">
            <button type="button" class="${tab === "details" ? "active" : ""}" data-tab="details">Kanji Details</button>
            <button type="button" class="${tab === "readings" ? "active" : ""}" data-tab="readings">Readings</button>
            <button type="button" class="${tab === "meta" ? "active" : ""}" data-tab="meta">Meta</button>
          </div>
          <div id="detailBody"></div>
          <div class="actions">
            <button class="secondary" type="button" data-speak="${item.char}">Speak</button>
            ${fromQuiz ? "" : `<button class="secondary" type="button" id="prevCard">Previous</button>
            <button class="secondary" type="button" id="nextCard">Next</button>`}
          </div>
        </div>
      </main>
    `;
  }

  function detailBody(item) {
    if (state.detailTab === "readings") {
      return `
        <div class="reading-cols">
          <div class="reading-box"><h4>On-yomi</h4><div>${item.on || item.roman || "—"}</div></div>
          <div class="reading-box"><h4>Kun-yomi</h4><div>${item.kun || "—"}</div></div>
        </div>
      `;
    }
    if (state.detailTab === "meta") {
      return `
        <dl class="kv">
          <dt>Strokes</dt><dd>${item.strokes}</dd>
          <dt>Radical</dt><dd>${item.radical}</dd>
          <dt>Frequency</dt><dd># ${item.frequency} (of ~2,500)</dd>
          <dt>Grade</dt><dd>${item.grade}</dd>
          <dt>JLPT</dt><dd>${item.level}</dd>
        </dl>
      `;
    }
    return `
      <div class="reading-cols">
        <div class="reading-box"><h4>On-yomi</h4><div>${item.on || item.roman || "—"}</div></div>
        <div class="reading-box"><h4>Kun-yomi</h4><div>${item.kun || "—"}</div></div>
      </div>
      <dl class="kv">
        <dt>Meaning</dt><dd>${item.info}</dd>
        <dt>Radical</dt><dd>${item.radical}</dd>
        <dt>Strokes</dt><dd>${item.strokes}</dd>
        <dt>JLPT</dt><dd>${item.level}</dd>
      </dl>
    `;
  }

  function renderReviewDeck(chars) {
    state._review = unique(chars);
    state._reviewIndex = state._reviewIndex || 0;
    if (state._reviewIndex >= state._review.length) state._reviewIndex = 0;
    const ch = state._review[state._reviewIndex];
    return renderDetail(ch);
  }

  function renderOnyomi() {
    const groups = (window.SCRIPTS?.kanji?.groups || []).slice().sort((a, b) => (b.chars?.length || 0) - (a.chars?.length || 0));
    return `
      ${topbar("On-yomi Groups")}
      <main>
        <div class="panel">
          <p class="muted" style="font-family:system-ui;margin-top:0">Characters that share a common Sino-Japanese reading. Tap a group to study.</p>
          <div class="list">
            ${groups
              .slice(0, 80)
              .map((g, i) => {
                const n = g.chars?.length || 0;
                return `<button type="button" data-group="${i}"><span>${g.reading} · ${n} chars</span><span class="chev">›</span></button>`;
              })
              .join("")}
          </div>
        </div>
      </main>
    `;
  }

  function renderGroup(index) {
    const groups = window.SCRIPTS?.kanji?.groups || [];
    const g = groups.slice().sort((a, b) => (b.chars?.length || 0) - (a.chars?.length || 0))[index];
    if (!g) return renderOnyomi();
    state._groupIndex = index;
    const chars = g.chars.map((c) => c.char);
    const tiles = g.chars
      .map((c) => {
        const full = state.byChar.get(c.char);
        return `<button class="char-tile" type="button" data-char="${c.char}"><span class="glyph">${c.char}</span><span class="meta">${full?.info || c.roman}</span></button>`;
      })
      .join("");
    return `
      ${topbar(g.reading, g.note || "")}
      <main>
        <div class="panel">
          <div class="char-grid">${tiles}</div>
          <div class="actions">
            <button class="primary" type="button" data-group-quiz="on">Quiz this group</button>
            <button class="secondary" type="button" data-group-review="1">Review</button>
          </div>
        </div>
      </main>
    `;
  }

  function renderDictionary() {
    const q = state.dictQuery.trim().toLowerCase();
    let list = [...state.byChar.values()];
    if (state.dictLevel !== "all") list = list.filter((c) => c.level === state.dictLevel);
    if (q) {
      list = list.filter(
        (c) =>
          c.char.includes(q) ||
          c.info.toLowerCase().includes(q) ||
          (c.on || "").toLowerCase().includes(q) ||
          (c.kun || "").toLowerCase().includes(q) ||
          (c.roman || "").toLowerCase().includes(q)
      );
    }
    list = list.sort((a, b) => a.frequency - b.frequency).slice(0, 120);
    const levels = ["all", "N5", "N4", "N3", "N2", "N1"];
    return `
      ${topbar("Kanji Dictionary")}
      <main>
        <div class="panel">
          <input class="search" id="dictSearch" type="search" placeholder="Search character, meaning, or reading" value="${state.dictQuery.replace(/"/g, "&quot;")}">
          <div class="chip-row">
            ${levels
              .map(
                (lv) =>
                  `<button class="chip ${state.dictLevel === lv ? "active" : ""}" type="button" data-dict-level="${lv}">${lv === "all" ? "All" : lv}</button>`
              )
              .join("")}
          </div>
          <div class="char-grid">
            ${list
              .map(
                (c) =>
                  `<button class="char-tile" type="button" data-char="${c.char}"><span class="glyph">${c.char}</span><span class="meta">${c.info}</span></button>`
              )
              .join("")}
          </div>
        </div>
      </main>
    `;
  }

  function render() {
    let html = "";
    switch (state.view) {
      case "home":
        html = renderHome();
        break;
      case "lessons":
        html = renderLessons();
        break;
      case "lesson":
        html = renderLesson(state.lessonId);
        break;
      case "theme":
        html = renderTheme(state.themeKey);
        break;
      case "quizzes":
        html = renderQuizzesHub();
        break;
      case "quizzes_topic":
        html = renderTopics();
        break;
      case "quizzes_level":
        html = renderLevels();
        break;
      case "set":
        html = renderSetChooser(state.setTitle, state.setChars);
        break;
      case "quiz":
        html = renderQuiz();
        break;
      case "detail":
        html = renderDetail(state.detailChar);
        break;
      case "review":
        html = renderReviewDeck(state._review || []);
        break;
      case "onyomi":
        html = renderOnyomi();
        break;
      case "group":
        html = renderGroup(state._groupIndex || 0);
        break;
      case "dictionary":
        html = renderDictionary();
        break;
      default:
        html = renderHome();
    }
    app.innerHTML = html;

    if (state.view === "lessons") {
      const el = $("#beginThemes");
      if (el) el.innerHTML = themeButtons();
    }
    if (state.view === "detail" || state.view === "review") {
      const item = state.byChar.get(state.detailChar);
      const body = document.createElement("div");
      // inject detail body
      const host = app.querySelector("#detailBody");
      if (host && item) host.innerHTML = detailBody(item);
      if (state.view === "review") {
        const label = document.createElement("div");
        label.className = "quiz-progress";
        label.textContent = `${(state._reviewIndex || 0) + 1} of ${state._review.length}`;
        const panel = app.querySelector(".panel");
        if (panel) panel.insertBefore(label, panel.firstChild);
      }
    }

    wire();
  }

  function wire() {
    $("#backBtn")?.addEventListener("click", goBack);
    $("#backHome")?.addEventListener("click", () => {
      state.stack = [];
      navigate("home", { replace: true });
    });
    $("#nextQuiz")?.addEventListener("click", nextQuiz);

    app.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nav = btn.getAttribute("data-nav");
        if (nav === "quizzes_n5_all") {
          state.setTitle = "JLPT 5 · Complete";
          state.setChars = state.catalog.levels.N5 || [];
          navigate("set");
          return;
        }
        navigate(nav);
      });
    });

    app.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lessonId = btn.getAttribute("data-lesson");
        navigate("lesson");
      });
    });

    app.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.themeKey = btn.getAttribute("data-theme");
        navigate("theme");
      });
    });

    app.querySelectorAll("[data-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const t = btn.getAttribute("data-topic");
        state.setTitle = t;
        state.setChars = state.catalog.topics[t] || [];
        navigate("set");
      });
    });

    app.querySelectorAll("[data-level]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lv = btn.getAttribute("data-level");
        state.setTitle = `JLPT ${lv}`;
        state.setChars = state.catalog.levels[lv] || [];
        navigate("set");
      });
    });

    app.querySelectorAll("[data-quiz-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lesson = window.DESK_LESSONS.beginning.find((l) => l.id === state.lessonId);
        buildQuiz(lesson?.title || "Quiz", lesson?.chars || [], btn.getAttribute("data-quiz-mode"));
      });
    });

    app.querySelectorAll("[data-packet-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chars = state.catalog.beginning[state.themeKey] || [];
        buildQuiz(state.themeKey, chars, btn.getAttribute("data-packet-quiz"));
      });
    });

    app.querySelectorAll("[data-packet-review]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state._review = state.catalog.beginning[state.themeKey] || [];
        state._reviewIndex = 0;
        state.detailTab = "details";
        state.detailChar = state._review[0];
        navigate("review");
      });
    });

    app.querySelectorAll("[data-set-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => {
        buildQuiz(state.setTitle, state.setChars || state._setChars || [], btn.getAttribute("data-set-quiz"));
      });
    });

    app.querySelectorAll("[data-set-review]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state._review = state.setChars || state._setChars || [];
        state._reviewIndex = 0;
        state.detailTab = "details";
        state.detailChar = state._review[0];
        navigate("review");
      });
    });

    app.querySelectorAll("[data-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        answerQuiz(decodeURIComponent(btn.getAttribute("data-answer")));
      });
    });

    app.querySelectorAll("[data-show-detail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.detailChar = btn.getAttribute("data-show-detail");
        state.detailTab = "details";
        navigate("detail");
      });
    });

    app.querySelectorAll("[data-char]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.detailChar = btn.getAttribute("data-char");
        state.detailTab = "details";
        navigate("detail");
      });
    });

    app.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.detailTab = btn.getAttribute("data-tab");
        render();
      });
    });

    app.querySelectorAll("[data-speak]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-speak");
        if (!window.speechSynthesis) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "ja-JP";
        speechSynthesis.speak(u);
      });
    });

    $("#prevCard")?.addEventListener("click", () => {
      if (!state._review?.length) return;
      state._reviewIndex = (state._reviewIndex - 1 + state._review.length) % state._review.length;
      state.detailChar = state._review[state._reviewIndex];
      render();
    });
    $("#nextCard")?.addEventListener("click", () => {
      if (!state._review?.length) return;
      state._reviewIndex = (state._reviewIndex + 1) % state._review.length;
      state.detailChar = state._review[state._reviewIndex];
      render();
    });

    app.querySelectorAll("[data-quiz-retry]").forEach((btn) => {
      btn.addEventListener("click", () => {
        buildQuiz(state.quiz.title, state.quiz.chars, state.quiz.mode);
      });
    });
    app.querySelectorAll("[data-quiz-review]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state._review = state.quiz.chars;
        state._reviewIndex = 0;
        state.detailChar = state._review[0];
        state.detailTab = "details";
        navigate("review");
      });
    });

    app.querySelectorAll("[data-group]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state._groupIndex = Number(btn.getAttribute("data-group"));
        navigate("group");
      });
    });

    app.querySelectorAll("[data-group-quiz]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const groups = window.SCRIPTS?.kanji?.groups || [];
        const sorted = groups.slice().sort((a, b) => (b.chars?.length || 0) - (a.chars?.length || 0));
        const g = sorted[state._groupIndex || 0];
        buildQuiz(g.reading, g.chars.map((c) => c.char), "on");
      });
    });
    app.querySelectorAll("[data-group-review]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const groups = window.SCRIPTS?.kanji?.groups || [];
        const sorted = groups.slice().sort((a, b) => (b.chars?.length || 0) - (a.chars?.length || 0));
        const g = sorted[state._groupIndex || 0];
        state._review = g.chars.map((c) => c.char);
        state._reviewIndex = 0;
        state.detailChar = state._review[0];
        state.detailTab = "details";
        navigate("review");
      });
    });

    const search = $("#dictSearch");
    if (search) {
      search.addEventListener("input", () => {
        state.dictQuery = search.value;
        // debounce light
        clearTimeout(state._dictT);
        state._dictT = setTimeout(() => render(), 120);
      });
    }
    app.querySelectorAll("[data-dict-level]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.dictLevel = btn.getAttribute("data-dict-level");
        render();
      });
    });
  }

  function boot() {
    state.catalog = window.DESK_CATALOG;
    if (!state.catalog) {
      app.innerHTML = "<main class='panel'><p>Missing catalog data.</p></main>";
      return;
    }
    const chars = window.SCRIPTS?.kanji?.chars || [];
    chars.forEach((c) => state.byChar.set(c.char, c));
    render();
  }

  boot();
})();
