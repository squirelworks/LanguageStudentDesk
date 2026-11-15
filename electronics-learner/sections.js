// How the Electronics Learner lays out its courses (by subject section or A–Z).
(function () {
  var GROUPS = [
    { id: "foundations", title: "Foundations", sub: "Charge, current, voltage and the rules that hold a circuit together." },
    { id: "components", title: "Components", sub: "Parts you put on a board and what each one does." },
    { id: "circuits", title: "Circuits", sub: "Connecting parts: analysis, filters and reading schematics." },
    { id: "digital", title: "Digital", sub: "Logic, clocks and talking to microcontrollers." },
    { id: "practical", title: "Practical build", sub: "Soldering, assembly and PCB design." },
    { id: "advanced", title: "Systems and advanced", sub: "Power, noise, grounding and whole products." },
  ];
  var KEY = "lsd-electronics-view-v1";

  function byName(a, b) {
    return String(a.name).localeCompare(String(b.name), "en", { sensitivity: "base" }) ||
      String(a.id).localeCompare(String(b.id));
  }

  function groupOf(entry) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === entry.group) return entry.group;
    return "foundations";
  }

  function tags(catalog) {
    var seen = {};
    catalog.forEach(function (c) { (c.tags || []).forEach(function (t) { seen[t] = true; }); });
    return Object.keys(seen).sort(function (a, b) { return a.localeCompare(b, "en", { sensitivity: "base" }); });
  }

  function arrange(catalog, opts) {
    opts = opts || {};
    var list = catalog.filter(function (c) {
      if (opts.tag && (c.tags || []).indexOf(opts.tag) < 0) return false;
      return true;
    }).sort(byName);
    if (opts.view === "az") return list.length ? [{ id: "az", title: "All courses, A–Z", sub: "", items: list }] : [];
    var out = [];
    GROUPS.forEach(function (g) {
      var items = list.filter(function (c) { return groupOf(c) === g.id; });
      if (items.length) out.push({ id: g.id, title: g.title, sub: g.sub, items: items });
    });
    return out;
  }

  function shown() { return {}; }
  function renderSwitches(container) { if (container) container.innerHTML = ""; }
  function onSwitch() {}
  function load() {
    try { return Object.assign({ view: "sections", tag: "" }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { view: "sections", tag: "" }; }
  }
  function save(layout) { localStorage.setItem(KEY, JSON.stringify({ view: layout.view, tag: layout.tag || "" })); }

  window.ELECTRONICS_SECTIONS = { GROUPS: GROUPS, byName: byName, tags: tags, arrange: arrange, shown: shown, renderSwitches: renderSwitches, onSwitch: onSwitch, load: load, save: save };
})();
