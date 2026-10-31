// Reference Learner: short reference cards per language. Cards live in
// languages/<id>/reference.json (bundled into languages/reference.js for
// file://), for programming in programming.js, and sources.js adds sets built
// from the SquirrelGo apps' data. ?lang= scopes the view; #<lang>/<entry>
// links to one card.
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const mark = (s) => esc(s).replace(/\{([^}]*)\}/g, "<mark>$1</mark>");
  const plain = (s) => String(s == null ? "" : s).replace(/[{}]/g, "");
  const paras = (b) => (b == null ? [] : Array.isArray(b) ? b : [b]);

  const TOPICS = [
    ["overview", "Overview"],
    ["script", "Script"],
    ["sounds", "Sounds"],
    ["grammar", "Grammar"],
    ["verbs", "Verbs"],
    ["numbers", "Numbers"],
    ["phrases", "Phrases"],
    ["culture", "Culture"],
  ];
  const TOPIC_NAME = Object.fromEntries(TOPICS);
  const PROG = window.LSD_REFERENCE_PROGRAMMING;
  const CJK = ["japanese", "chinese", "hangul"]; // use the CJK font stack

  const prefs = LSD.store("lsd-reference-prefs", { piqad: true });
  const pref = prefs.load();

  let metas = [];      // languages with reference cards, registry order
  let scripts = [];    // writing systems no language owns yet, Alphabets order
  const refs = {};     // id -> { meta, entries }
  let scope = null;    // language id, "programming", or null for all
  let topic = null;
  let query = "";
  let notice = "";     // shown when ?lang= names a language with no cards

  // reference.json over http://, the generated bundle otherwise.
  async function fetchRef(id) {
    if (location.protocol === "file:") return null;
    try {
      const r = await fetch(new URL(id + "/reference.json", LSD.BASE), { cache: "no-cache" });
      return r.ok ? await r.json() : null;
    } catch (e) {
      return null;
    }
  }
  async function bundled(id) {
    if (!window.LSD_REFERENCE) {
      try {
        await LSD.loadScript(new URL("reference.js", LSD.BASE).href);
      } catch (e) {
        return null;
      }
    }
    return (window.LSD_REFERENCE || {})[id] || null;
  }

  async function init() {
    const all = await LSD.all();
    const loaded = await Promise.all(all.map(async (m) => [m, (await fetchRef(m.id)) || (await bundled(m.id))]));
    loaded.forEach(([m, r]) => {
      if (r && r.entries && r.entries.length) refs[m.id] = { meta: m, entries: r.entries };
    });
    const sets = window.LSD_REFERENCE_SOURCES ? await window.LSD_REFERENCE_SOURCES(all) : [];
    sets.forEach((x) => {
      const m = x.meta || all.find((l) => l.id === x.key);
      if (!m) return;
      if (!refs[x.key]) refs[x.key] = { meta: m, entries: [] };
      refs[x.key].entries.push(...x.entries);
      if (x.meta && !scripts.includes(m)) scripts.push(m);
    });
    metas = all.filter((m) => refs[m.id]);
    if (PROG) refs.programming = { meta: { id: "programming", name: PROG.name }, entries: PROG.entries };

    LSD.picker($("langSelect"), metas, null, (id) => go(id), "All languages");
    scripts.forEach((m) => $("langSelect").add(new Option(m.name + " script" + (m.nativeName ? " · " + m.nativeName : ""), m.id)));
    if (PROG) $("langSelect").add(new Option(PROG.name, "programming"));
    $("search").oninput = () => {
      query = $("search").value.trim().toLowerCase();
      render();
    };
    $("piqad").checked = pref.piqad;
    $("piqad").onchange = () => {
      pref.piqad = $("piqad").checked;
      prefs.save(pref);
      render();
    };
    if ("speechSynthesis" in window) speechSynthesis.addEventListener("voiceschanged", () => render(), { once: true });

    const hash = decodeURIComponent(location.hash.slice(1)).split("/");
    const start = LSD.param() || (refs[hash[0]] ? hash[0] : null);
    go(start, hash[1] && hash[0] === start ? hash[1] : null);
  }

  function go(id, entryId) {
    scope = id && refs[id] ? id : null;
    notice = id && !scope ? "No reference cards for “" + id + "” yet. " : "";
    if ($("langSelect").value !== (scope || "")) {
      $("langSelect").value = scope || "";
      LSD.setParam(scope);
    }
    topic = null;
    renderSide();
    render();
    if (entryId) {
      const el = document.getElementById("e-" + scope + "-" + entryId);
      if (el) {
        el.scrollIntoView({ block: "start" });
        el.classList.add("flash");
      }
    }
  }

  function renderSide() {
    const btn = (id, name, nat, n) =>
      '<button data-id="' + esc(id) + '"' + ((scope || "") === id ? ' class="active"' : "") + '><span class="nm">' + esc(name) + (nat ? ' <span class="nat">' + esc(nat) + "</span>" : "") + '</span><span class="count">' + n + "</span></button>";
    const total = Object.values(refs).reduce((s, r) => s + r.entries.length, 0);
    $("side").innerHTML =
      btn("", "All", "", total) + "<hr>" +
      metas.map((m) => btn(m.id, m.name, m.font === "pIqaD" ? "" : m.nativeName !== m.name ? m.nativeName : "", refs[m.id].entries.length)).join("") +
      (scripts.length ? '<hr><div class="sec">Scripts</div>' + scripts.map((m) => btn(m.id, m.name, m.nativeName !== m.name ? m.nativeName : "", refs[m.id].entries.length)).join("") : "") +
      (PROG ? "<hr>" + btn("programming", PROG.name, "", PROG.entries.length) : "");
    $("side").querySelectorAll("button").forEach((b) => (b.onclick = () => {
      history.replaceState(null, "", location.pathname + location.search);
      go(b.dataset.id || null);
    }));
  }

  function matches(e) {
    if (topic && e.topic !== topic) return false;
    if (!query) return true;
    const hay = [e.title, ...paras(e.body), ...(e.tags || []), e.code || "", e.lang || "", e.text || ""]
      .concat((e.examples || []).flatMap((x) => [x.t, x.r, x.e]))
      .concat(e.table ? e.table.head.concat(e.table.rows.flat()) : [])
      .map(plain).join("\n").toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  }

  function render() {
    const ids = scope ? [scope] : metas.concat(scripts).map((m) => m.id).concat(PROG ? ["programming"] : []);
    const meta = scope && scope !== "programming" ? refs[scope].meta : null;
    document.body.className = meta ? "lang-" + meta.id : "";
    $("piqadOpt").hidden = !ids.some((id) => refs[id].meta.font === "pIqaD");
    $("grammarLink").href = LSD.toolUrl("grammar-learner/index.html", meta && meta.id);
    $("langLink").href = LSD.toolUrl("language-learner/index.html", meta && meta.id);

    if (scope) {
      const name = refs[scope].meta.name;
      $("title").innerHTML = "Reference Learner <small>" + esc(name) + (meta && meta.nativeName && meta.nativeName !== name ? " · " + esc(meta.nativeName) : "") + "</small>";
      document.title = "Reference · " + name + " — Language Student Desk";
    } else {
      $("title").textContent = "Reference Learner";
      document.title = "Reference Learner — Language Student Desk";
    }
    $("intro").innerHTML = meta ? intro(meta) : "";

    // Topic chips: only topics present in the current scope.
    const present = new Set(ids.flatMap((id) => refs[id].entries.map((e) => e.topic)));
    $("topics").innerHTML = '<button data-t=""' + (topic ? "" : ' class="active"') + ">All topics</button>" +
      TOPICS.filter(([t]) => present.has(t)).map(([t, n]) => '<button data-t="' + t + '"' + (topic === t ? ' class="active"' : "") + ">" + n + "</button>").join("");
    $("topics").querySelectorAll("button").forEach((b) => (b.onclick = () => {
      topic = b.dataset.t || null;
      render();
    }));

    let html = "";
    let shown = 0;
    ids.forEach((id) => {
      const r = refs[id];
      const list = r.entries.filter(matches);
      if (!list.length) return;
      shown += list.length;
      if (scope) {
        // Within one language, group by topic.
        TOPICS.forEach(([t, n]) => {
          const group = list.filter((e) => e.topic === t);
          if (group.length) html += '<h2 class="group-h">' + n + "</h2>" + group.map((e) => card(e, r.meta)).join("");
        });
      } else {
        html += '<h2 class="group-h">' + esc(r.meta.name) + (r.meta.nativeName && r.meta.nativeName !== r.meta.name && r.meta.font !== "pIqaD" ? "<small>" + esc(r.meta.nativeName) + "</small>" : "") + "</h2>" + list.map((e) => card(e, r.meta)).join("");
      }
    });
    $("results").innerHTML = shown ? html : '<p class="empty">No cards match' + (query ? " “" + esc(query) + "”" : "") + (topic ? " in " + TOPIC_NAME[topic] : "") + ".</p>";
    if (!scope) $("subtitle").textContent = notice + shown + " cards across " + metas.length + " languages and " + scripts.length + " more scripts. Pick one on the left, or search them all.";
    else $("subtitle").textContent = shown + " card" + (shown === 1 ? "" : "s") + (query || topic ? " match" : "") + ".";

    $("results").querySelectorAll("[data-tag]").forEach((t) => (t.onclick = () => {
      $("search").value = t.dataset.tag;
      query = t.dataset.tag.toLowerCase();
      render();
    }));
    $("results").querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => LSD.speak(b.dataset.say, refs[b.dataset.lang].meta)));
  }

  function intro(m) {
    if (m.script) {
      return '<div class="card intro"><h2>' + esc(m.name) + (m.nativeName && m.nativeName !== m.name ? '<span class="nat" lang="' + esc(m.speech || "") + '">' + esc(m.nativeName) + "</span>" : "") + "</h2>" +
        '<div class="muted small">' + "Writing system" + (m.language ? " · examples in " + esc(m.language) : "") + "</div>" +
        '<div class="links"><a href="' + esc(LSD.toolUrl("character-learner/index.html", m.script)) + '">Characters →</a>' +
        '<a href="../SquirrelGo-Apps/squirrelgo-characters/squirrelgo-alphabets/www/index.html">SquirrelGo Alphabets →</a></div></div>';
    }
    const links = [["Language Learner path", "language-learner/index.html"]];
    if (m.characterKeys && m.characterKeys.length) links.push(["Characters", "character-learner/index.html"]);
    links.push(["Vocabulary", "vocabulary-learner/index.html"], ["Grammar", "grammar-learner/index.html"], ["Resources", "resource-learner/index.html"]);
    const nat = m.font === "pIqaD" ? '<span class="nat piqad">' + LSD.piqad("tlhIngan Hol") + "</span>" : m.nativeName && m.nativeName !== m.name ? '<span class="nat">' + esc(m.nativeName) + "</span>" : "";
    return '<div class="card intro"><h2>' + esc(m.name) + nat + "</h2>" +
      '<div class="muted small">Writing: ' + esc((m.writingSystems || []).join(", ")) + "</div>" +
      '<div class="links">' + links.map(([label, path]) => '<a href="' + esc(LSD.toolUrl(path, m.id)) + '">' + esc(label) + " →</a>").join("") + "</div></div>";
  }

  function card(e, m) {
    const isProg = m.id === "programming";
    const rtl = m.direction === "rtl";
    const speak = !isProg && LSD.canSpeak(m);
    const pq = m.font === "pIqaD" && pref.piqad;
    let h = '<article class="card entry lang-' + esc(m.id) + (CJK.includes(m.id) ? " cjk" : "") + '" id="e-' + esc(m.id + "-" + e.id) + '"><h3><a href="#' + esc(m.id + "/" + e.id) + '">' + esc(e.title) + "</a>" +
      '<span class="pill">' + esc(TOPIC_NAME[e.topic] || e.topic) + "</span>" + (!scope ? '<span class="pill">' + esc(m.name) + "</span>" : "") + "</h3>";
    h += paras(e.body).map((p) => "<p>" + mark(p) + "</p>").join("");
    if (e.table) {
      h += '<div class="tbl"><table><thead><tr>' + e.table.head.map((c) => "<th>" + esc(c) + "</th>").join("") + "</tr></thead><tbody>" +
        e.table.rows.map((r) => "<tr>" + r.map((c) => '<td dir="auto">' + mark(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
    }
    (e.examples || []).forEach((x) => {
      h += '<div class="ex"><div class="body"><div class="t"' + (rtl ? ' dir="rtl"' : "") + ">" + mark(x.t) + "</div>" +
        (pq ? '<div class="pq">' + esc(LSD.piqad(plain(x.t))) + "</div>" : "") +
        (x.r ? '<div class="r">' + esc(x.r) + "</div>" : "") +
        (x.e ? '<div class="e">' + esc(x.e) + "</div>" : "") + "</div>" +
        (speak ? '<button class="say" title="Listen" data-lang="' + esc(m.id) + '" data-say="' + esc(plain(x.t)) + '">🔊</button>' : "") + "</div>";
    });
    if (e.html) h += '<div class="html">' + e.html + "</div>";
    if (e.code) h += "<pre><code>" + esc(e.code) + "</code></pre>";
    if (isProg && e.lang) h += '<p class="small"><a href="' + esc(LSD.toolUrl("programming-learner/index.html", e.lang)) + '">Open in the Programming Learner →</a></p>';
    if (e.link) h += '<p class="small"><a href="' + esc(e.link.href) + '">' + esc(e.link.label) + " →</a></p>";
    if (e.tags && e.tags.length) h += '<div class="tags">' + e.tags.map((t) => '<span class="pill" data-tag="' + esc(t) + '">' + esc(t) + "</span>").join("") + "</div>";
    return h + "</article>";
  }

  init();
})();
