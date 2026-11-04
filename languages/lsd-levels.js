// Shared learner levels for the Desk learners. Load after lsd-lang.js:
//   <script src="../languages/lsd-levels.js"></script>
// Adds LSD.levels:
//   BANDS            the six bands every course uses, easiest first (the same
//                    ids as the grammar lessons' "level")
//   of(item)         band ids an item is tagged with ([] when untagged)
//   label(item)      a short label for the item's "level" ("JLPT N5", "Beginner"),
//                    or "" when it has none
//   tabs(el, items, lang, onPick)
//                    draws a level tab bar into el for the bands present in
//                    items, remembers the pick per language, and returns the
//                    picked band id or null for "All levels". The bar is hidden
//                    when no item has a level.
//   fits(item, band) true when the item suits that band (untagged items suit
//                    every band)
//
// An item's level can be written three ways:
//   "level": "beginner"                         one band
//   "level": ["beginner", "intermediate"]       a range of bands
//   "level": { "jlpt": "N5" }                   an exam level, mapped below
// Items without "level" may still carry a band name as a tag ("beginner").
(() => {
  if (!window.LSD) return;

  const BANDS = [
    { id: "absolute-beginner", name: "Absolute beginner" },
    { id: "beginner", name: "Beginner" },
    { id: "beginner-intermediate", name: "Beginner–intermediate" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced-intermediate", name: "Advanced–intermediate" },
    { id: "advanced", name: "Advanced" },
  ];
  const ORDER = Object.fromEntries(BANDS.map((b, i) => [b.id, i]));
  const NAME = Object.fromEntries(BANDS.map((b) => [b.id, b.name]));

  // Exam levels to bands. Six-step exams map one to one from Beginner up;
  // CEFR's Pre-A1 is the absolute-beginner band.
  const SIX = ["beginner", "beginner-intermediate", "intermediate", "advanced-intermediate", "advanced", "advanced"];
  const EXAMS = {
    cefr: { name: "CEFR", map: { "pre-a1": "absolute-beginner", a1: SIX[0], a2: SIX[1], b1: SIX[2], b2: SIX[3], c1: SIX[4], c2: SIX[5] } },
    jlpt: { name: "JLPT", map: { n5: SIX[0], n4: SIX[1], n3: SIX[2], n2: SIX[3], n1: SIX[4] } },
    hsk: { name: "HSK", map: { 1: SIX[0], 2: SIX[0], 3: SIX[1], 4: SIX[2], 5: SIX[3], 6: SIX[4], 7: SIX[5], 8: SIX[5], 9: SIX[5] } },
    tocfl: { name: "TOCFL", map: { novice: "absolute-beginner", 1: SIX[0], 2: SIX[1], 3: SIX[2], 4: SIX[3], 5: SIX[4], 6: SIX[5] } },
    topik: { name: "TOPIK", map: { 1: SIX[0], 2: SIX[1], 3: SIX[2], 4: SIX[3], 5: SIX[4], 6: SIX[5] } },
  };
  const examBand = (sys, v) => {
    const x = EXAMS[String(sys).toLowerCase()];
    return x ? x.map[String(v).toLowerCase().replace(/^(level|band)\s*/, "")] || null : null;
  };

  function of(item) {
    const lv = item && item.level;
    let out = [];
    if (typeof lv === "string") out = [lv];
    else if (Array.isArray(lv)) out = lv.slice();
    else if (lv && typeof lv === "object") out = Object.entries(lv).map(([k, v]) => examBand(k, v));
    else if (item && Array.isArray(item.tags)) out = item.tags.map((t) => String(t).toLowerCase());
    out = out.filter((b) => b in ORDER);
    // A two-band array is a range: fill the bands between.
    if (Array.isArray(lv) && out.length === 2) {
      const [a, z] = out.map((b) => ORDER[b]).sort((p, q) => p - q);
      out = BANDS.slice(a, z + 1).map((b) => b.id);
    }
    return [...new Set(out)].sort((a, b) => ORDER[a] - ORDER[b]);
  }

  function label(item) {
    const lv = item && item.level;
    if (lv && typeof lv === "object" && !Array.isArray(lv)) {
      return Object.entries(lv).map(([k, v]) => ((EXAMS[k.toLowerCase()] || {}).name || k.toUpperCase()) + " " + v).join(" · ");
    }
    const bands = lv ? of(item) : []; // a level tag already shows as a tag
    if (!bands.length) return "";
    return bands.length === 1 ? NAME[bands[0]] : NAME[bands[0]] + " to " + NAME[bands[bands.length - 1]].toLowerCase();
  }

  const fits = (item, band) => {
    if (!band) return true;
    const b = of(item);
    return !b.length || b.includes(band);
  };

  // One remembered pick per language ("" for the all-languages view).
  const picks = LSD.store("lsd-level-picks", {});
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function tabs(el, items, lang, onPick) {
    const present = new Set(items.flatMap(of));
    const bands = BANDS.filter((b) => present.has(b.id));
    const saved = picks.load();
    let pick = saved[lang || ""] || null;
    if (pick && !present.has(pick)) pick = null;
    el.hidden = !bands.length;
    if (!bands.length) return null;
    const btn = (id, name) =>
      '<button role="tab" data-level="' + esc(id) + '" aria-selected="' + ((pick || "") === id) + '"' + ((pick || "") === id ? ' class="active"' : "") + ">" + esc(name) + "</button>";
    el.innerHTML = btn("", "All levels") + bands.map((b) => btn(b.id, b.name)).join("");
    el.querySelectorAll("button").forEach((b) => (b.onclick = () => {
      const all = picks.load();
      all[lang || ""] = b.dataset.level || null;
      picks.save(all);
      onPick(b.dataset.level || null);
    }));
    const active = el.querySelector(".active");
    if (active) el.scrollLeft = Math.max(0, active.offsetLeft - el.offsetLeft - 8);
    return pick;
  }

  LSD.levels = { BANDS, of, label, fits, tabs };
})();
