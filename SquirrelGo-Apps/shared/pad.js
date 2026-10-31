// Finger/mouse writing pad with an optional faint guide character.
(() => {
  function mount(canvas, opts) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.touchAction = "none";

    const strokes = [];
    let cur = null;

    function guideFont() {
      let px = size * 0.72;
      ctx.font = `${px}px ${opts.font}`;
      const w = ctx.measureText(opts.glyph).width;
      if (w > size * 0.86) px *= (size * 0.86) / w;
      return `${Math.floor(px)}px ${opts.font}`;
    }

    function line(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = "#e1dacd";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      line(size / 2, 0, size / 2, size);
      line(0, size / 2, size, size / 2);
      ctx.setLineDash([]);
      if (opts.guide) {
        ctx.fillStyle = "rgba(0,0,0,.13)";
        ctx.font = guideFont();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.direction = opts.rtl ? "rtl" : "ltr";
        ctx.fillText(opts.glyph, size / 2, size / 2 + size * 0.03);
      }
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = Math.max(4, size / 30);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const s of cur ? strokes.concat([cur]) : strokes) {
        ctx.beginPath();
        ctx.moveTo(s[0][0], s[0][1]);
        if (s.length === 1) ctx.lineTo(s[0][0] + 0.1, s[0][1]);
        for (let i = 1; i < s.length; i++) ctx.lineTo(s[i][0], s[i][1]);
        ctx.stroke();
      }
    }

    function point(e) {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    canvas.addEventListener("pointerdown", (e) => {
      canvas.setPointerCapture(e.pointerId);
      cur = [point(e)];
      draw();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!cur) return;
      cur.push(point(e));
      draw();
    });
    const end = () => {
      if (!cur) return;
      strokes.push(cur);
      cur = null;
      draw();
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    draw();
    return {
      clear() {
        strokes.length = 0;
        draw();
      },
      undo() {
        strokes.pop();
        draw();
      },
      setGuide(v) {
        opts.guide = v;
        draw();
      },
    };
  }

  window.Pad = { mount };
})();
