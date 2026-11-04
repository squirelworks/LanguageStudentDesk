// How the Programming Learner lays out its languages, shared by the Desk page
// and the Programming Student Desk menu so both show the same list.
//
// Every catalog entry has a group (modern, older or joke, or tracks for a
// topic taught across several languages) and, for languages outside the joke
// group, one or more category tags. The default view lists the groups in
// order, each sorted by name, with nothing pinned. The A–Z view is one list of
// everything. A tag filter keeps only the languages with that tag.
//
// The view and tag choice are remembered in localStorage under
// lsd-programming-view-v1 as { view: "sections" | "az", tag: "<tag>" | "" }.
(function () {
  var GROUPS = [
    { id: "modern", title: "Modern and popular", sub: "Current languages in wide use today." },
    { id: "older", title: "Older and legacy", sub: "Earlier versions and long-lived languages, many still running real systems." },
    { id: "joke", title: "Joke and esoteric", sub: "Languages made for fun, puzzles and curiosity." },
    { id: "tracks", title: "Cross-language tracks", sub: "Advanced topics worked through side by side in several languages." },
  ];
  var KEY = "lsd-programming-view-v1";

  function byName(a, b) {
    return String(a.name).localeCompare(String(b.name), "en", { sensitivity: "base" }) ||
      String(a.id).localeCompare(String(b.id));
  }

  function groupOf(entry) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === entry.group) return entry.group;
    return "modern";
  }

  // Every tag used in the catalog, sorted.
  function tags(catalog) {
    var seen = {};
    catalog.forEach(function (c) { (c.tags || []).forEach(function (t) { seen[t] = true; }); });
    return Object.keys(seen).sort(function (a, b) { return a.localeCompare(b, "en", { sensitivity: "base" }); });
  }

  // Lays out the catalog. opts: { view: "sections" | "az", tag: "", show: { older: bool, joke: bool } }.
  // Returns [{ id, title, sub, items }]; the A–Z view is a single block with id "az".
  function arrange(catalog, opts) {
    opts = opts || {};
    var show = opts.show || {};
    var list = catalog.filter(function (c) {
      var g = groupOf(c);
      if (g !== "modern" && show[g] === false) return false;
      if (opts.tag && (c.tags || []).indexOf(opts.tag) < 0) return false;
      return true;
    }).sort(byName);
    if (opts.view === "az") return list.length ? [{ id: "az", title: "All languages, A–Z", sub: "", items: list }] : [];
    var out = [];
    GROUPS.forEach(function (g) {
      var items = list.filter(function (c) { return groupOf(c) === g.id; });
      if (items.length) out.push({ id: g.id, title: g.title, sub: g.sub, items: items });
    });
    return out;
  }

  function load() {
    var v = null;
    try { v = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    v = v && typeof v === "object" ? v : {};
    return { view: v.view === "az" ? "az" : "sections", tag: typeof v.tag === "string" ? v.tag : "" };
  }

  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ view: v.view, tag: v.tag || "" })); } catch (e) {}
  }

  window.PROGRAMMING_SECTIONS = { GROUPS: GROUPS, arrange: arrange, tags: tags, byName: byName, load: load, save: save };
})();
