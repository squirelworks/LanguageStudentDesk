// Spaced review scheduling, a simplified SM-2 (the family Anki uses).
// A card's state: { due (ms), ivl (days, 0 while learning), ease, step, reps, lapses }.
// New and lapsed cards go through short learning steps before they get an
// interval in days; after that each Good multiplies the interval by the ease.
(() => {
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;
  const STEPS = [1 * MIN, 10 * MIN]; // learning steps
  const RELEARN = 10 * MIN;

  function fresh() {
    return { due: 0, ivl: 0, ease: 2.5, step: 0, reps: 0, lapses: 0 };
  }

  // Next state for a rating: 1 Again, 2 Hard, 3 Good, 4 Easy.
  function answer(state, rating, now = Date.now()) {
    const s = Object.assign(fresh(), state);
    s.reps++;
    s.last = now;
    if (s.ivl === 0) {
      // Learning (new, or relearning after a lapse).
      if (rating === 1) {
        s.step = 0;
        s.due = now + STEPS[0];
      } else if (rating === 2) {
        s.due = now + (STEPS[s.step] + (STEPS[s.step + 1] || STEPS[s.step])) / 2;
      } else if (rating === 3 && s.step + 1 < STEPS.length) {
        s.step++;
        s.due = now + STEPS[s.step];
      } else {
        s.ivl = rating === 4 ? 4 : s.lapses ? Math.max(1, s.prevIvl || 1) : 1;
        s.step = 0;
        s.due = now + s.ivl * DAY;
      }
      return s;
    }
    // Review.
    if (rating === 1) {
      s.lapses++;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.prevIvl = Math.max(1, Math.round(s.ivl * 0.3));
      s.ivl = 0;
      s.step = 0;
      s.due = now + RELEARN;
      return s;
    }
    if (rating === 2) {
      s.ease = Math.max(1.3, s.ease - 0.15);
      s.ivl = Math.max(s.ivl + 1, Math.round(s.ivl * 1.2));
    } else if (rating === 3) {
      s.ivl = Math.max(s.ivl + 1, Math.round(s.ivl * s.ease));
    } else {
      s.ease += 0.15;
      s.ivl = Math.max(s.ivl + 2, Math.round(s.ivl * s.ease * 1.3));
    }
    s.ivl = Math.min(s.ivl, 3650);
    s.due = now + s.ivl * DAY;
    return s;
  }

  // "1m", "10m", "3d", "2mo" for the rating buttons.
  function describe(ms) {
    if (ms < 60 * MIN) return Math.max(1, Math.round(ms / MIN)) + "m";
    if (ms < DAY) return Math.round(ms / (60 * MIN)) + "h";
    const d = ms / DAY;
    if (d < 30) return Math.round(d) + "d";
    if (d < 365) return Math.round(d / 30) + "mo";
    return (d / 365).toFixed(1) + "y";
  }

  function preview(state, rating, now = Date.now()) {
    return describe(answer(state, rating, now).due - now);
  }

  // A card counts as learned once it has an interval of three weeks or more.
  const MATURE = 21;

  window.SRS = { fresh, answer, preview, describe, MIN, DAY, MATURE };
})();
