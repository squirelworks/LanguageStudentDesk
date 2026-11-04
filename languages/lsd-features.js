// Feature switches, Settings levels, the "more is available" notice and the
// first-run welcome card, shared by the Desk home, the Desk learners and the
// Language Student Desk phone app.
//
// The switches themselves are defined once in squirrel-lang-data's
// features.json; languages/features.js is the generated copy loaded before this
// file (window.LSD_FEATURES). Settings are kept in localStorage. When the Desk
// launcher serves the page it also loads /desk-settings.js (window.LSD_DESK_SETTINGS),
// so the Desk window and every browser tab share one saved copy, and changes are
// posted back to /desk-settings.
//
//   LSDFeatures.isOn("historical")       is a switch on?
//   LSDFeatures.allows(meta)             may this content show? (its "requires")
//   LSDFeatures.renderNotice(el, open)   the dismissible notice; open() shows Settings
//   LSDFeatures.renderWelcome(el, go)    first-run card; go(languageId)
//   LSDFeatures.renderSettings(el)       levels, Customize and "What's in the app"
//   LSDFeatures.onChange(fn)             called after any change
(function () {
  "use strict";

  const DATA = window.LSD_FEATURES || { levels: [], features: [], featured: [], text: {}, defaultLevel: "simple" };
  const KEY = "lsd-settings";
  const LEVELS = DATA.levels.map((l) => l.id);
  const FEATURES = DATA.features.slice();
  const TEXT = Object.assign(
    { notice: "", welcomeTitle: "Welcome", welcomeBody: "", whatsInApp: "What's in the app", customize: "Customize", custom: "Custom" },
    DATA.text || {}
  );
  const listeners = [];

  function rank(level) {
    const i = LEVELS.indexOf(level);
    return i < 0 ? 0 : i;
  }

  // On at this level: the feature's level is at or below it.
  function onAtLevel(feature, level) {
    return rank(feature.level) <= rank(level);
  }

  function blank() {
    return { level: DATA.defaultLevel || LEVELS[0] || "simple", switches: {}, noticeDismissed: false, welcomeDone: false };
  }

  function clean(s) {
    const out = blank();
    if (s && typeof s === "object") {
      if (s.level === "custom" || LEVELS.includes(s.level)) out.level = s.level;
      if (s.switches && typeof s.switches === "object") {
        for (const f of FEATURES) if (typeof s.switches[f.id] === "boolean") out.switches[f.id] = s.switches[f.id];
      }
      out.noticeDismissed = !!s.noticeDismissed;
      out.welcomeDone = !!s.welcomeDone;
    }
    return out;
  }

  function loadLocal() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  }

  let state = clean(window.LSD_DESK_SETTINGS || loadLocal());

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
    if (window.LSD_DESK_SETTINGS && window.fetch) {
      fetch("/desk-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(state) }).catch(() => {});
    }
    listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (e) {}
    });
  }

  function isOn(id) {
    const f = FEATURES.find((x) => x.id === id);
    if (!f) return false;
    if (state.level === "custom") return state.switches[id] === true;
    return onAtLevel(f, state.level);
  }

  // Content tags the features it needs with "requires" (one id or a list).
  function allows(item) {
    const req = item && item.requires;
    if (!req) return true;
    return (Array.isArray(req) ? req : [req]).every(isOn);
  }

  function level() {
    return state.level;
  }

  function setLevel(id) {
    if (!LEVELS.includes(id)) return;
    state.level = id;
    state.switches = {};
    save();
  }

  // Changing one switch makes the level "Custom", keeping every other switch as it was.
  function set(id, on) {
    const now = {};
    for (const f of FEATURES) now[f.id] = isOn(f.id);
    now[id] = !!on;
    const match = LEVELS.find((l) => FEATURES.every((f) => now[f.id] === onAtLevel(f, l)));
    if (match) {
      state.level = match;
      state.switches = {};
    } else {
      state.level = "custom";
      state.switches = now;
    }
    save();
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  // Featured languages that have shipped, in the order features.json lists them.
  function featured(registry) {
    const reg = registry || window.LSD_LANGUAGE_REGISTRY || {};
    return (DATA.featured || []).map((id) => reg[id]).filter(Boolean);
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "text") node.textContent = v;
      else if (k === "class") node.className = v;
      else if (k.startsWith("on")) node[k] = v;
      else node.setAttribute(k, v);
    }
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  function langLabel(m) {
    return m.name + (m.nativeName ? " · " + m.nativeName : "");
  }

  function renderNotice(container, openSettings) {
    container.innerHTML = "";
    if (state.noticeDismissed || !TEXT.notice) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    container.appendChild(
      el("div", { class: "lsdf-notice", role: "note" }, [
        el("span", { text: TEXT.notice + " " }),
        openSettings ? el("button", { type: "button", class: "lsdf-link", text: "Open Settings", onclick: openSettings }) : null,
        el("button", {
          type: "button",
          class: "lsdf-close",
          "aria-label": "Dismiss",
          text: "×",
          onclick: () => {
            state.noticeDismissed = true;
            save();
            renderNotice(container, openSettings);
          },
        }),
      ])
    );
  }

  function featuredButtons(go, registry) {
    return el(
      "div",
      { class: "lsdf-featured" },
      featured(registry).map((m) => el("button", { type: "button", class: "lsdf-lang", text: langLabel(m), onclick: () => go(m.id) }))
    );
  }

  function renderWelcome(container, go, registry) {
    container.innerHTML = "";
    if (state.welcomeDone || !featured(registry).length) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    const done = () => {
      state.welcomeDone = true;
      save();
      renderWelcome(container, go, registry);
    };
    container.appendChild(
      el("div", { class: "lsdf-welcome", role: "dialog", "aria-label": TEXT.welcomeTitle }, [
        el("h2", { text: TEXT.welcomeTitle }),
        el("p", { text: TEXT.welcomeBody }),
        featuredButtons((id) => {
          done();
          go(id);
        }, registry),
        el("button", { type: "button", class: "lsdf-link", text: "Not now", onclick: done }),
      ])
    );
  }

  // Newest first, then by label, so a new switch shows up at the top of Customize.
  function customizeOrder() {
    return FEATURES.slice().sort((a, b) => String(b.added).localeCompare(String(a.added)) || a.label.localeCompare(b.label));
  }

  function renderSettings(container, go, registry) {
    const draw = () => {
      container.innerHTML = "";
      const levels = el("fieldset", { class: "lsdf-levels" }, [el("legend", { text: "Show" })]);
      DATA.levels.forEach((l) => {
        const input = el("input", { type: "radio", name: "lsdf-level", value: l.id });
        input.checked = state.level === l.id;
        input.onchange = () => setLevel(l.id);
        levels.appendChild(el("label", { class: "lsdf-row" }, [input, el("span", {}, [el("strong", { text: l.label }), el("small", { text: l.description })])]));
      });
      if (state.level === "custom") levels.appendChild(el("p", { class: "lsdf-custom", text: TEXT.custom }));
      container.appendChild(levels);

      const custom = el("fieldset", { class: "lsdf-switches" }, [el("legend", { text: TEXT.customize })]);
      customizeOrder().forEach((f) => {
        const input = el("input", { type: "checkbox" });
        input.checked = isOn(f.id);
        input.onchange = () => set(f.id, input.checked);
        custom.appendChild(el("label", { class: "lsdf-row" }, [input, el("span", {}, [el("strong", { text: f.label }), el("small", { text: f.description })])]));
      });
      container.appendChild(custom);

      container.appendChild(renderWhatsIn(go, registry));
    };
    draw();
    onChange(draw);
  }

  // Everything in the app, with what's turned off and the switch that turns it on.
  function renderWhatsIn(go, registry) {
    const box = el("section", { class: "lsdf-whats" }, [el("h2", { text: TEXT.whatsInApp })]);
    if (go && featured(registry).length) {
      box.appendChild(el("p", { text: TEXT.welcomeBody }));
      box.appendChild(featuredButtons(go, registry));
    }
    const reg = registry || window.LSD_LANGUAGE_REGISTRY || {};
    const hidden = Object.values(reg).filter((m) => !allows(m));
    const list = el("ul", {});
    FEATURES.slice()
      .sort((a, b) => a.label.localeCompare(b.label))
      .forEach((f) => {
        const off = !isOn(f.id);
        const extra = hidden.filter((m) => [].concat(m.requires).includes(f.id)).map(langLabel);
        list.appendChild(
          el("li", {}, [
            el("strong", { text: f.label }),
            el("span", { class: off ? "lsdf-off" : "lsdf-on", text: off ? " (off: turn on " + f.label + " in Customize)" : " (on)" }),
            el("small", { text: f.description + (extra.length ? " " + extra.join(", ") + "." : "") }),
          ])
        );
      });
    box.appendChild(list);
    return box;
  }

  window.LSDFeatures = { data: DATA, isOn, allows, level, setLevel, set, onChange, featured, renderNotice, renderWelcome, renderSettings };
})();
