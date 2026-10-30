// Resource Learner: curated links per language. The language list comes from
// languages/ (registry.js + lsd-lang.js); the lists themselves from
// resources.js. ?lang= opens one language; older ids still work.
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const DATA = window.LSD_RESOURCES || {};
  const ALIASES = { korean: "hangul", russian: "cyrillic", devanagari: "hindi" };

  let metas = [];

  async function init() {
    metas = (await LSD.all()).filter((m) => DATA[m.id] && DATA[m.id].length);
    LSD.picker($("langSelect"), metas, null, show, "All languages");
    const p = LSD.param();
    show(p ? ALIASES[p] || p : null);
  }

  function show(id) {
    const meta = metas.find((m) => m.id === id) || null;
    LSD.setParam(meta ? meta.id : id || null);
    $("langSelect").value = meta ? meta.id : "";
    document.title = (meta ? "Resources · " + meta.name : "Resource Learner") + " — Language Student Desk";
    $("title").innerHTML = "Resource Learner" + (meta ? " <small>" + esc(meta.name) + (meta.nativeName && meta.nativeName !== meta.name && meta.font !== "pIqaD" ? " · " + esc(meta.nativeName) : "") + "</small>" : "");
    $("subtitle").textContent = meta
      ? "The best places to keep learning " + meta.name + ", plus tools for every language."
      : id ? "No resource list for “" + id + "” yet. Here is everything else." : "Courses, dictionaries and tools worth your time, for every language on the Desk.";
    $("refLink").href = LSD.toolUrl("reference-learner/index.html", meta && meta.id);

    const nat = (m) => (m.nativeName && m.nativeName !== m.name && m.font !== "pIqaD" ? m.nativeName : "");
    $("side").innerHTML =
      '<button data-id=""' + (meta ? "" : ' class="active"') + '><span class="nm">All</span></button><hr>' +
      metas.map((m) => '<button data-id="' + esc(m.id) + '"' + (meta === m ? ' class="active"' : "") + '><span class="nm">' + esc(m.name) + (nat(m) ? ' <span class="nat">' + esc(nat(m)) + "</span>" : "") + "</span></button>").join("");
    $("side").querySelectorAll("button").forEach((b) => (b.onclick = () => show(b.dataset.id || null)));

    const shown = meta ? [meta] : metas;
    $("lists").innerHTML = shown.map((m) => list(m.name, nat(m), DATA[m.id], m.id)).join("") + list("General", "", DATA.general || [], null);
  }

  function list(name, nat, items, id) {
    const desk = id
      ? '<div class="desk"><a href="' + esc(LSD.toolUrl("language-learner/index.html", id)) + '">Language Learner path →</a><a href="' + esc(LSD.toolUrl("reference-learner/index.html", id)) + '">Reference cards →</a></div>'
      : '<p class="muted small">Useful whatever language you study.</p>';
    return '<section class="card list"><h2>' + esc(name) + (nat ? "<small>" + esc(nat) + "</small>" : "") + "</h2>" + desk +
      items.map((r) => {
        const external = r.url && !r.url.startsWith("../");
        const title = r.url ? '<a href="' + esc(r.url) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + esc(r.title) + "</a>" : esc(r.title);
        return '<div class="resource"><div><h3>' + title + '</h3><div class="meta">' + esc(r.meta) + "</div>" +
          (r.tags && r.tags.length ? '<div class="tags">' + r.tags.map((t) => '<span class="pill">' + esc(t) + "</span>").join("") + "</div>" : "") + "</div>" +
          (r.stars ? '<div class="stars" title="' + r.stars + ' of 5">' + "★".repeat(r.stars) + "☆".repeat(5 - r.stars) + "</div>" : "") + "</div>";
      }).join("") + "</section>";
  }

  init();
})();
