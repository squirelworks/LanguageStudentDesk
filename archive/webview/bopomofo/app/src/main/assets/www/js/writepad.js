// Finger/mouse writing pad for one character with stroke data. With checking on, each stroke
// is compared to the next model stroke: a good one snaps to the clean shape,
// a wrong one is wiped and reported through onStroke.
(() => {
  function mount(canvas, opts) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.touchAction = "none";
    const u = size / 100;
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim() || "#8a1c1c";

    const model = Strokes.of(opts.key).map((d) => Strokes.points(d));
    const done = []; // accepted model stroke indexes (checking) or raw strokes (free)
    const raw = [];
    let cur = null;
    let flash = null; // { pts, color, until }
    let hintIdx = -1;

    function path(pts) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * u, pts[0][1] * u);
      if (pts.length === 1) ctx.lineTo(pts[0][0] * u + 0.1, pts[0][1] * u);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] * u, pts[i][1] * u);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#e1dacd";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      path([[50, 0], [50, 100]]);
      path([[0, 50], [100, 50]]);
      ctx.setLineDash([]);
      if (opts.guide) {
        ctx.strokeStyle = "rgba(0,0,0,.1)";
        ctx.lineWidth = 9 * u;
        model.forEach(path);
      }
      if (hintIdx >= 0 && model[hintIdx]) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 9 * u;
        path(model[hintIdx]);
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(4, 6.5 * u);
      if (opts.check) done.forEach((i) => path(model[i]));
      else raw.forEach(path);
      if (flash) {
        ctx.strokeStyle = flash.color;
        path(flash.pts);
      }
      if (cur) {
        ctx.strokeStyle = opts.check ? accent : "#1a1a1a";
        path(cur);
      }
    }

    function point(e) {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
    }
    canvas.addEventListener("pointerdown", (e) => {
      if (opts.check && done.length >= model.length) return;
      canvas.setPointerCapture(e.pointerId);
      cur = [point(e)];
      flash = null;
      draw();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!cur) return;
      cur.push(point(e));
      draw();
    });
    const end = () => {
      if (!cur) return;
      const s = cur;
      cur = null;
      if (!opts.check) {
        raw.push(s);
        draw();
        return;
      }
      const i = done.length;
      const result = Strokes.judge(s, Strokes.of(opts.key)[i]);
      if (result === "ok") {
        done.push(i);
        hintIdx = -1;
      } else {
        flash = { pts: s, color: "#b3261e" };
        setTimeout(() => {
          flash = null;
          draw();
        }, 600);
      }
      draw();
      opts.onStroke?.(result, i, model.length);
      if (done.length === model.length) opts.onDone?.();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    draw();
    return {
      clear() {
        done.length = 0;
        raw.length = 0;
        hintIdx = -1;
        draw();
      },
      undo() {
        if (opts.check) done.pop();
        else raw.pop();
        draw();
      },
      setGuide(v) {
        opts.guide = v;
        draw();
      },
      // Show where the next stroke goes for a moment.
      hint() {
        hintIdx = opts.check ? done.length : 0;
        draw();
        setTimeout(() => {
          hintIdx = -1;
          draw();
        }, 1400);
      },
      next: () => done.length,
      total: () => model.length,
    };
  }

  window.WritePad = { mount };
})();
