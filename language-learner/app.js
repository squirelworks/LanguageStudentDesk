// Language Learner: a guided path per language (paths.js). Progress comes
// from the Vocabulary Learner (lsd-vocab-v1) and Grammar Learner
// (lsd-grammar-v1); steps without a check are ticked by hand (lsd-path-v1).
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const day = (d) => d.toLocaleDateString("sv");

  const manualStore = LSD.store("lsd-path-v1", {});
  const manual = manualStore.load();
  let vocab = {};
  let grammar = {};
  let meta = null;

  function reload() {
    vocab = LSD.store("lsd-vocab-v1", { cards: {}, custom: {}, history: {} }).load();
    grammar = LSD.store("lsd-grammar-v1", {}).load();
  }

  // Cards of a deck studied at least once (either direction counts once).
  function studied(lang, deck) {
    const prefix = lang + ":" + deck + "/";
    const ids = new Set();
    for (const k in vocab.cards || {}) if (k.startsWith(prefix)) ids.add(k.replace(/>$/, ""));
    return ids.size;
  }

  // { done, have, need, label } for a step.
  function status(lang, step) {
    const c = step.check;
    if (!c) return { done: !!(manual[lang] || {})[step.id], manual: true };
    if (c.grammar) {
      const g = grammar[lang] || {};
      const have = c.grammar.filter((id) => g[id] && g[id].done).length;
      return { done: have >= c.grammar.length, have, need: c.grammar.length, label: "lessons passed" };
    }
    if (c.vocab) {
      const have = Math.min(studied(lang, c.vocab), c.min);
      return { done: have >= c.min, have, need: c.min, label: "words studied" };
    }
    if (c.mine) {
      const have = Math.min(((vocab.custom || {})[lang] || []).length, c.mine);
      return { done: have >= c.mine, have, need: c.mine, label: "words added" };
    }
    return { done: false };
  }

  function dueCount(lang) {
    const now = Date.now();
    let n = 0;
    for (const k in vocab.cards || {}) if (k.startsWith(lang + ":") && vocab.cards[k].due <= now) n++;
    return n;
  }

  // Days in a row (ending today or yesterday) with at least one review.
  function streak(lang) {
    const h = (vocab.history || {})[lang] || {};
    const d = new Date();
    if (!h[day(d)]) d.setDate(d.getDate() - 1);
    let n = 0;
    while (h[day(d)]) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function toolLink(t, lang) {
    const [label, path, noLang] = t;
    return '<a href="' + esc(LSD.toolUrl(path, noLang ? null : lang)) + '">' + esc(label) + " →</a>";
  }

  async function init() {
    const metas = await LSD.all();
    reload();
    LSD.picker($("langSelect"), metas, null, open, "Choose…");
    $("langGrid").innerHTML = metas
      .map((m) => {
        const path = LANGUAGE_PATHS[m.id];
        const steps = path ? path.flatMap((s) => s.steps) : [];
        const done = steps.filter((s) => status(m.id, s).done).length;
        const big = m.font === "pIqaD" ? '<span class="piqad">' + LSD.piqad("tlhIngan Hol") + "</span>" : esc(m.nativeName || m.name);
        return '<button class="tile" data-lang="' + esc(m.id) + '"' + (path ? "" : " disabled") + '><span class="big">' + big + "</span><b>" + esc(m.name) + '</b><br><span class="sub">' + (path ? done + " of " + steps.length + " steps done" : "No path yet") + '</span>' + (path ? '<div class="progress" style="margin-top:0.4rem"><span style="width:' + (100 * done) / steps.length + '%"></span></div>' : "") + "</button>";
      })
      .join("");
    $("langGrid").querySelectorAll("[data-lang]").forEach((b) => (b.onclick = () => {
      LSD.setParam(b.dataset.lang);
      open(b.dataset.lang);
    }));
    open(LSD.param());
    // Progress made in another tab shows up when you come back.
    window.addEventListener("focus", () => {
      reload();
      if (meta) render();
    });
  }

  async function open(id) {
    meta = id ? await LSD.get(id) : null;
    $("langSelect").value = meta ? meta.id : "";
    const path = meta && LANGUAGE_PATHS[meta.id];
    $("home").hidden = !!path;
    $("course").hidden = !path;
    document.body.className = meta ? "lang-" + meta.id : "";
    if (!path) {
      $("title").textContent = "Language Learner";
      $("subtitle").textContent = meta ? "No guided path for " + meta.name + " yet." : id ? "No language called “" + id + "” in languages/." : "A guided path through the Desk: script, words, grammar, then real use.";
      document.title = "Language Learner — Language Student Desk";
      return;
    }
    $("title").innerHTML = "Language Learner <small>" + esc(meta.name) + (meta.nativeName ? " · " + esc(meta.nativeName) : "") + "</small>";
    $("subtitle").textContent = "Your path through " + meta.name + ", one step at a time.";
    document.title = "Learn " + meta.name + " — Language Student Desk";
    render();
  }

  function render() {
    const lang = meta.id;
    const path = LANGUAGE_PATHS[lang];
    const all = path.flatMap((s) => s.steps);
    const next = all.find((s) => !status(lang, s).done);
    const done = all.filter((s) => status(lang, s).done).length;
    const due = dueCount(lang);
    const st = streak(lang);

    $("today").innerHTML =
      '<div class="stat"><span class="muted small">Due for review</span><b>' + due + "</b>" + '<a href="' + esc(LSD.toolUrl("vocabulary-learner/index.html", lang)) + '">' + (due ? "Review now →" : "Open flashcards →") + "</a></div>" +
      '<div class="stat"><span class="muted small">Path</span><b>' + done + " / " + all.length + '</b><div class="progress"><span style="width:' + (100 * done) / all.length + '%"></span></div></div>' +
      '<div class="stat"><span class="muted small">Review streak</span><b>' + st + " day" + (st === 1 ? "" : "s") + '</b><span class="small muted">' + (st ? "Keep it going." : "Review once today to start one.") + "</span></div>" +
      '<div class="stat"><span class="muted small">Up next</span><div style="margin-top:0.3rem"><b style="font-size:1.05rem;color:var(--text)">' + (next ? esc(next.title) : "Path complete 🎉") + "</b></div>" + (next ? next.tools.slice(0, 1).map((t) => toolLink(t, lang)).join("") : "") + "</div>";

    let n = 0;
    $("stages").innerHTML = path
      .map((stage) => {
        const sd = stage.steps.filter((s) => status(lang, s).done).length;
        return (
          '<div class="stage"><div class="stage-head"><h2>' + esc(stage.title) + '</h2><span class="small muted">' + sd + " / " + stage.steps.length + '</span><div class="progress"><span style="width:' + (100 * sd) / stage.steps.length + '%"></span></div></div>' +
          stage.steps
            .map((s) => {
              n++;
              const r = status(lang, s);
              const cls = r.done ? " done" : s === next ? " next" : "";
              const side = r.manual
                ? '<label class="small"><input type="checkbox" data-step="' + esc(s.id) + '"' + (r.done ? " checked" : "") + "> Done</label>"
                : '<div class="meter">' + r.have + " / " + r.need + " " + r.label + '</div><div class="progress" style="margin-top:0.3rem"><span style="width:' + (100 * r.have) / r.need + '%"></span></div>';
              return '<div class="step' + cls + '"><div class="dot">' + (r.done ? "✓" : n) + "</div><div><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + '</p><div class="tools">' + s.tools.map((t) => toolLink(t, lang)).join("") + '</div></div><div class="side">' + side + "</div></div>";
            })
            .join("") +
          "</div>"
        );
      })
      .join("");
    $("stages").querySelectorAll("[data-step]").forEach((c) => (c.onchange = () => {
      const m = (manual[lang] = manual[lang] || {});
      if (c.checked) m[c.dataset.step] = true;
      else delete m[c.dataset.step];
      manualStore.save(manual);
      render();
    }));
  }

  init();
})();
