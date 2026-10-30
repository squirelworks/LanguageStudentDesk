// Stroke geometry for the pIqaD letters in data/strokes.js: sampling, drawing
// as SVG, stroke-order animation and matching a hand-drawn stroke to a model one.
(() => {
  const STROKES = window.SG_STROKES;

  // Sample an M/L/Q path into points, 12 per curve.
  function points(d) {
    const toks = d.match(/[MLQ]|-?[\d.]+/g);
    const out = [];
    let cmd = null;
    let cur = null;
    for (let i = 0; i < toks.length; ) {
      if ("MLQ".includes(toks[i])) cmd = toks[i++];
      const n = (k) => Number(toks[i + k]);
      if (cmd === "Q") {
        const [cx, cy, x, y] = [n(0), n(1), n(2), n(3)];
        const [x0, y0] = cur;
        for (let s = 1; s <= 12; s++) {
          const t = s / 12;
          const a = (1 - t) * (1 - t);
          const b = 2 * (1 - t) * t;
          const c = t * t;
          out.push([a * x0 + b * cx + c * x, a * y0 + b * cy + c * y]);
        }
        cur = [x, y];
        i += 4;
      } else {
        cur = [n(0), n(1)];
        out.push(cur);
        i += 2;
      }
    }
    return out;
  }

  function length(pts) {
    let len = 0;
    for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return len;
  }

  // n points spaced evenly along the polyline.
  function resample(pts, n) {
    if (pts.length === 1) return Array(n).fill(pts[0]);
    const total = length(pts) || 1;
    const step = total / (n - 1);
    const out = [pts[0]];
    let need = step;
    let acc = 0;
    for (let i = 1; i < pts.length && out.length < n; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const seg = Math.hypot(x1 - x0, y1 - y0);
      while (seg > 0 && acc + seg >= need && out.length < n) {
        const t = (need - acc) / seg;
        out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
        need += step;
      }
      acc += seg;
    }
    while (out.length < n) out.push(pts[pts.length - 1]);
    return out;
  }

  const meanDist = (a, b) => a.reduce((s, p, i) => s + Math.hypot(p[0] - b[i][0], p[1] - b[i][1]), 0) / a.length;

  // How far a drawn stroke (in 0-100 box units) is from a model stroke,
  // drawn the right way round and reversed.
  function compare(drawn, d) {
    const N = 24;
    const model = resample(points(d), N);
    const user = resample(drawn, N);
    return { fwd: meanDist(user, model), rev: meanDist(user.slice().reverse(), model) };
  }

  // A drawn stroke matches when it lies close to the model all along its
  // length. Short strokes get a little more room since a fingertip is wide.
  function judge(drawn, d) {
    const { fwd, rev } = compare(drawn, d);
    const limit = Math.max(11, Math.min(16, length(points(d)) / 5));
    if (fwd <= limit) return "ok";
    if (rev <= limit) return "reversed";
    return "miss";
  }

  // The letter as an SVG: a faint full shape underneath and one path per stroke.
  // With numbers on, each stroke's start is marked with its place in the order.
  function svg(key, opts = {}) {
    const list = STROKES[key] || [];
    const paths = list.map((d, i) => `<path class="stroke s${i}" d="${d}" data-i="${i}"/>`).join("");
    const nums = opts.numbers
      ? list
          .map((d, i) => {
            const [x, y] = points(d)[0];
            return `<g class="num" data-i="${i}"><circle cx="${x}" cy="${y}" r="4.6"/><text x="${x}" y="${y + 2.1}">${i + 1}</text></g>`;
          })
          .join("")
      : "";
    return `<svg class="strokes ${opts.cls || ""}" viewBox="0 0 100 100" aria-hidden="true">
      <g class="ghost">${list.map((d) => `<path d="${d}"/>`).join("")}</g>
      <g class="ink">${paths}</g>${nums}
    </svg>`;
  }

  // Draw the strokes one after another, like a pen. speed is box units per second.
  function animate(el, speed = 90, onDone) {
    const paths = [...el.querySelectorAll(".ink path")];
    const nums = [...el.querySelectorAll(".num")];
    const lens = paths.map((p) => length(points(p.getAttribute("d"))) + 1);
    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${lens[i]} ${lens[i]}`;
      p.style.strokeDashoffset = lens[i];
      p.classList.remove("now");
    });
    nums.forEach((n) => n.classList.remove("shown"));
    let i = 0;
    let start = null;
    let raf = 0;
    let pause = 0;
    function frame(t) {
      if (i >= paths.length) {
        onDone?.();
        return;
      }
      if (start === null) {
        start = t;
        paths[i].classList.add("now");
        nums[i]?.classList.add("shown");
      }
      const dur = (lens[i] / speed) * 1000;
      const k = Math.min(1, (t - start) / dur);
      paths[i].style.strokeDashoffset = lens[i] * (1 - k);
      if (k >= 1) {
        if (!pause) pause = t;
        if (t - pause > 220) {
          paths[i].classList.remove("now");
          i++;
          start = null;
          pause = 0;
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }

  // Show the letter fully drawn, with no animation.
  function reveal(el) {
    el.querySelectorAll(".ink path").forEach((p) => {
      p.style.strokeDasharray = "";
      p.style.strokeDashoffset = "";
      p.classList.remove("now");
    });
    el.querySelectorAll(".num").forEach((n) => n.classList.add("shown"));
  }

  window.Strokes = { points, resample, judge, svg, animate, reveal, has: (k) => !!STROKES[k], count: (k) => (STROKES[k] || []).length, of: (k) => STROKES[k] || [] };
})();
