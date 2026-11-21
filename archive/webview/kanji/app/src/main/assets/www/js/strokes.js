// Stroke-order animation and step diagram for the kanji detail view.
// Stroke data comes from data/strokes.js (KanjiVG, CC BY-SA 3.0).
(() => {
  // Pending animation timers, per SVG, so the header animation and the
  // Strokes tab can run side by side.
  const timers = new Map();

  function clearTimers(svg) {
    for (const [key, list] of timers) {
      if (svg && key !== svg) continue;
      list.forEach(clearTimeout);
      timers.delete(key);
    }
  }
  function later(svg, fn, ms) {
    if (!timers.has(svg)) timers.set(svg, []);
    timers.get(svg).push(setTimeout(fn, ms));
  }

  function has(ch) {
    return !!(window.KANJI_STROKES && window.KANJI_STROKES[ch]);
  }

  function grid() {
    return `<path class="so-grid" d="M54.5,0v109M0,54.5h109"/>`;
  }

  // One small box per stroke, each showing the strokes so far with the
  // newest one highlighted, like a textbook stroke-order chart.
  function steps(paths) {
    return paths
      .map((_, i) => {
        const done = paths.slice(0, i).map((d) => `<path d="${d}"/>`).join("");
        return `<svg class="so-step" viewBox="0 0 109 109" aria-hidden="true">${grid()}
          <g class="so-done">${done}</g><path class="so-new" d="${paths[i]}"/></svg>`;
      })
      .join("");
  }

  function html(ch) {
    if (!has(ch)) return `<p class="muted">No stroke-order data for this character.</p>`;
    const [paths, nums] = window.KANJI_STROKES[ch];
    const labels = (nums || []).map(([x, y], i) => `<text x="${x}" y="${y}">${i + 1}</text>`).join("");
    return `
      <div class="so-wrap">
        <svg id="soMain" class="so-main" viewBox="0 0 109 109" role="img" aria-label="Stroke order for ${ch}">
          ${grid()}
          <g class="so-ghost">${paths.map((d) => `<path d="${d}"/>`).join("")}</g>
          <g class="so-ink">${paths.map((d) => `<path d="${d}"/>`).join("")}</g>
          <g class="so-nums hidden">${labels}</g>
        </svg>
        <div class="actions so-actions">
          <button class="secondary" type="button" data-so="play">Play</button>
          <button class="secondary" type="button" data-so="step">Next stroke</button>
          <button class="secondary" type="button" data-so="nums">Numbers</button>
        </div>
        <p class="muted so-count">${paths.length} stroke${paths.length === 1 ? "" : "s"}</p>
      </div>
      <div class="so-steps">${steps(paths)}</div>
      <p class="muted so-credit">Stroke data: <a href="https://kanjivg.tagaini.net" target="_blank" rel="noopener">KanjiVG</a> (CC BY-SA 3.0).</p>`;
  }

  function strokes(svg) {
    return [...svg.querySelectorAll(".so-ink path")];
  }

  function hideAll(svg) {
    strokes(svg).forEach((p) => {
      const len = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = String(len);
    });
  }

  function draw(p, ms) {
    const len = p.getTotalLength();
    p.getBoundingClientRect(); // flush the reset before animating
    p.style.transition = `stroke-dashoffset ${ms}ms ease-in-out`;
    p.style.strokeDashoffset = "0";
    return len;
  }

  function play(svg) {
    clearTimers(svg);
    hideAll(svg);
    svg.dataset.next = "0";
    let t = 250;
    strokes(svg).forEach((p, i) => {
      // Longer strokes take a little longer, as they would with a brush.
      const ms = Math.min(900, 280 + p.getTotalLength() * 6);
      later(
        svg,
        () => {
          draw(p, ms);
          svg.dataset.next = String(i + 1);
        },
        t
      );
      t += ms + 180;
    });
  }

  function step(svg) {
    clearTimers(svg);
    const list = strokes(svg);
    let next = Number(svg.dataset.next || list.length);
    if (next >= list.length) {
      hideAll(svg);
      next = 0;
    }
    draw(list[next], 450);
    svg.dataset.next = String(next + 1);
  }

  // Called after the detail body is in the DOM.
  function mount(root) {
    const svg = root.querySelector("#soMain");
    if (!svg) return;
    root.querySelectorAll("[data-so]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = btn.getAttribute("data-so");
        if (act === "play") play(svg);
        else if (act === "step") step(svg);
        else svg.querySelector(".so-nums").classList.toggle("hidden");
      });
    });
    play(svg);
  }

  // Compact animated character for the top of the detail view.
  function hero(ch) {
    const [paths] = window.KANJI_STROKES[ch];
    return `<svg class="so-hero" viewBox="0 0 109 109" aria-hidden="true">
      <g class="so-ghost">${paths.map((d) => `<path d="${d}"/>`).join("")}</g>
      <g class="so-ink">${paths.map((d) => `<path d="${d}"/>`).join("")}</g>
    </svg>`;
  }

  function mountHero(btn) {
    if (!btn) return;
    const svg = btn.querySelector("svg");
    btn.addEventListener("click", () => play(svg));
    play(svg);
  }

  window.StrokeOrder = { has, html, mount, hero, mountHero, stop: () => clearTimers() };
})();
