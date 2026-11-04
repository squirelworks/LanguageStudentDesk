// Grammar web for the Reference Learner: every grammar point of one language
// as a node, in one column per level, linked into a web. Needs lsd-levels.js.
//
// Points come from three places:
//   * the grammar course's lessons (written: opens the lesson)
//   * the course's "plan", points planned but not written yet:
//       plan: [{ id, title, level, topic?, after? }]
//     A plan entry whose id matches a lesson counts as written.
//   * the language's reference cards on the "grammar" topic (opens the card)
// Links: a point's "after" ids (the points it builds on), points that share a
// "topic", a reference card and the lesson whose pattern its title names, and
// otherwise the course order, which is the path the lessons take.
//
// LSD_GRAMMAR_WEB.points(course, cards) -> { nodes, edges }
// LSD_GRAMMAR_WEB.render(el, { meta, course, cards, level, onCard })
(() => {
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const plain = (s) => String(s == null ? "" : s).replace(/[{}]/g, "");
  const NONE = "any";
  const bandOf = (x) => LSD.levels.of(x)[0] || NONE;

  function points(course, cards) {
    const nodes = [];
    const byId = {};
    const add = (n) => {
      nodes.push(n);
      byId[n.key] = n;
    };
    const lessons = (course && course.lessons) || [];
    lessons.forEach((l, i) => add({ key: "l:" + l.id, id: l.id, kind: "lesson", title: l.title, summary: l.summary || "", level: bandOf(l), label: LSD.levels.label(l), topic: l.topic || null, after: l.after || [], order: i, particle: l.particle || "" }));
    ((course && course.plan) || []).forEach((p, i) => {
      if (byId["l:" + p.id]) {
        const n = byId["l:" + p.id];
        if (!n.topic && p.topic) n.topic = p.topic;
        if (!n.after.length && p.after) n.after = p.after;
        return;
      }
      add({ key: "l:" + p.id, id: p.id, kind: "planned", title: p.title, summary: p.summary || "", level: bandOf(p), label: LSD.levels.label(p), topic: p.topic || null, after: p.after || [], order: lessons.length + i, particle: "" });
    });
    (cards || []).filter((c) => c.topic === "grammar").forEach((c, i) =>
      add({ key: "r:" + c.id, id: c.id, kind: "card", title: c.title, summary: plain([].concat(c.body || [])[0] || ""), level: bandOf(c), label: LSD.levels.label(c), topic: null, after: [], order: 1e6 + i, particle: "" }));

    const edges = [];
    const seen = new Set();
    const link = (a, b, why) => {
      if (!a || !b || a === b) return;
      const k = [a.key, b.key].sort().join("|");
      if (seen.has(k)) return;
      seen.add(k);
      edges.push({ a, b, why });
    };
    const steps = nodes.filter((n) => n.kind !== "card");
    steps.forEach((n) => n.after.forEach((id) => link(byId["l:" + id], n, "after")));
    const topics = {};
    steps.forEach((n) => n.topic && (topics[n.topic] = topics[n.topic] || []).push(n));
    Object.values(topics).forEach((list) => list.forEach((n, i) => i && link(list[i - 1], n, "topic")));
    // Without explicit links, follow the course from one point to the next.
    if (!edges.length) steps.forEach((n, i) => i && link(steps[i - 1], n, "path"));
    // A card titled "The linking particle 的" belongs with the 的 lesson.
    nodes.filter((n) => n.kind === "card").forEach((c) => {
      const t = c.title.toLowerCase();
      steps.filter((s) => s.particle && (/[^\x00-\x7f]/.test(s.particle) || s.particle.length > 2) && t.includes(s.particle.toLowerCase()))
        .forEach((s) => link(s, c, "card"));
    });
    return { nodes, edges };
  }

  function render(el, opts) {
    const { meta, course, cards, level, onCard } = opts;
    const { nodes, edges } = points(course, cards);
    if (!nodes.length) {
      el.innerHTML = '<p class="empty">There are no grammar points for ' + esc(meta.name) + " yet.</p>";
      return;
    }
    const cols = LSD.levels.BANDS.map((b) => ({ id: b.id, name: b.name }))
      .concat([{ id: NONE, name: "Every level" }])
      .map((c) => Object.assign(c, { nodes: nodes.filter((n) => n.level === c.id) }))
      .filter((c) => c.nodes.length);
    const written = nodes.filter((n) => n.kind === "lesson").length;
    const planned = nodes.filter((n) => n.kind === "planned").length;
    const cardsN = nodes.filter((n) => n.kind === "card").length;

    const node = (n) => {
      const dim = level && n.level !== level && n.level !== NONE ? " dim" : "";
      const tip = esc(n.summary) + (n.label ? " (" + esc(n.label) + ")" : "");
      if (n.kind === "lesson") {
        return '<a class="gw-node lesson' + dim + '" data-key="' + esc(n.key) + '" title="' + tip + '" href="' + esc(LSD.toolUrl("grammar-learner/index.html", meta.id)) + "#" + encodeURIComponent(n.id) + '">' + esc(n.title) + "</a>";
      }
      if (n.kind === "card") {
        return '<button class="gw-node card' + dim + '" data-key="' + esc(n.key) + '" data-card="' + esc(n.id) + '" title="' + tip + '">' + esc(n.title) + "</button>";
      }
      return '<span class="gw-node planned' + dim + '" data-key="' + esc(n.key) + '" tabindex="0" title="' + tip + '">' + esc(n.title) + '<small>Not written yet</small></span>';
    };

    el.innerHTML =
      '<div class="gw-head"><p class="small muted">' +
      written + " lesson" + (written === 1 ? "" : "s") + " written" +
      (planned ? " · " + planned + " not written yet" : "") +
      (cardsN ? " · " + cardsN + " reference card" + (cardsN === 1 ? "" : "s") : "") +
      '. Pick a point to open it.</p><div class="gw-key small"><span class="gw-node lesson">Lesson</span><span class="gw-node card">Reference card</span><span class="gw-node planned">Not written yet</span></div></div>' +
      '<div class="gw"><svg class="gw-lines" aria-hidden="true"></svg>' +
      cols.map((c) => {
        const done = c.nodes.filter((n) => n.kind !== "planned").length;
        return '<section class="gw-col' + (level && c.id !== level && c.id !== NONE ? " dim" : "") + '"><h3>' + esc(c.name) + "<small>" + done + " of " + c.nodes.length + "</small></h3>" + c.nodes.map(node).join("") + "</section>";
      }).join("") + "</div>";

    el.querySelectorAll("[data-card]").forEach((b) => (b.onclick = () => onCard && onCard(b.dataset.card)));

    const web = el.querySelector(".gw");
    const svg = el.querySelector(".gw-lines");
    const draw = () => {
      const box = web.getBoundingClientRect();
      svg.setAttribute("width", web.scrollWidth);
      svg.setAttribute("height", web.scrollHeight);
      const at = (n) => {
        const e = web.querySelector('[data-key="' + CSS.escape(n.key) + '"]');
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { l: r.left - box.left + web.scrollLeft, r: r.right - box.left + web.scrollLeft, y: r.top - box.top + web.scrollTop + r.height / 2, t: r.top - box.top + web.scrollTop, b: r.bottom - box.top + web.scrollTop, x: r.left - box.left + web.scrollLeft + r.width / 2 };
      };
      svg.innerHTML = edges.map(({ a, b, why }) => {
        const p = at(a);
        const q = at(b);
        if (!p || !q) return "";
        let d;
        if (q.l > p.r) {
          const m = (p.r + q.l) / 2;
          d = "M" + p.r + " " + p.y + " C" + m + " " + p.y + " " + m + " " + q.y + " " + q.l + " " + q.y;
        } else if (p.l > q.r) {
          const m = (q.r + p.l) / 2;
          d = "M" + p.l + " " + p.y + " C" + m + " " + p.y + " " + m + " " + q.y + " " + q.r + " " + q.y;
        } else {
          // Same column (or stacked on a phone): a short line down the side.
          const [u, v] = p.y < q.y ? [p, q] : [q, p];
          const x = Math.min(u.l, v.l) + 6;
          d = "M" + x + " " + u.b + " L" + x + " " + v.t;
        }
        const dim = level && ![a.level, b.level].includes(level) ? " dim" : "";
        return '<path class="' + why + dim + '" d="' + d + '"/>';
      }).join("");
    };
    draw();
    if (window.ResizeObserver) {
      if (el._gwObserver) el._gwObserver.disconnect();
      el._gwObserver = new ResizeObserver(() => draw());
      el._gwObserver.observe(web);
    }
  }

  window.LSD_GRAMMAR_WEB = { points, render };
})();
