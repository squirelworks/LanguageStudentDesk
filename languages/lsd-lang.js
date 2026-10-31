// Shared language layer for the Desk learners (vocabulary, grammar, language).
// LSD.load(id, kind) loads a language's characters, grammar, vocab or
// reference data from languages/<id>/, as listed in its meta.json.
// Load after registry.js:
//   <script src="../languages/registry.js"></script>
//   <script src="../languages/lsd-lang.js"></script>
// Language metadata comes from languages/<id>/meta.json. Over http:// (the
// Desk's local server) each file is fetched fresh; over file://, where browsers
// block fetch(), registry.js (generated from the same files) is used instead.
(() => {
  const BASE = new URL(".", document.currentScript.src); // .../languages/
  const REGISTRY = window.LSD_LANGUAGE_REGISTRY || {};
  const cache = {};

  // The ?lang= value, lowercased, or null.
  function param() {
    const v = new URLSearchParams(location.search).get("lang");
    return v ? v.trim().toLowerCase() : null;
  }

  async function fetchMeta(id) {
    if (location.protocol === "file:") return null;
    try {
      const r = await fetch(new URL(id + "/meta.json", BASE), { cache: "no-cache" });
      return r.ok ? await r.json() : null;
    } catch (e) {
      return null;
    }
  }

  // meta.json for one language, or null when there is no such language.
  async function get(id) {
    if (!id) return null;
    if (!(id in cache)) cache[id] = (await fetchMeta(id)) || REGISTRY[id] || null;
    return cache[id];
  }

  // Every language in the registry, with fresh meta where it can be fetched.
  async function all() {
    const ids = Object.keys(REGISTRY);
    const metas = await Promise.all(ids.map(get));
    return metas.filter(Boolean);
  }

  // Sets ?lang= in the address bar without reloading (null clears it).
  function setParam(id) {
    const u = new URL(location.href);
    if (id) u.searchParams.set("lang", id);
    else u.searchParams.delete("lang");
    history.replaceState(null, "", u);
  }

  // Link to another Desk tool, keeping the language scope.
  function toolUrl(path, id) {
    return "../" + path + (id ? (path.includes("?") ? "&" : "?") + "lang=" + encodeURIComponent(id) : "");
  }

  // A <select> of languages. ids limits it to languages the tool has content
  // for; onChange(id) runs after ?lang= is updated.
  function picker(select, metas, current, onChange, allLabel) {
    select.innerHTML = "";
    if (allLabel) select.add(new Option(allLabel, ""));
    metas.forEach((m) => select.add(new Option(m.name + (m.nativeName ? " · " + m.nativeName : ""), m.id)));
    select.value = current || "";
    select.onchange = () => {
      setParam(select.value || null);
      onChange(select.value || null);
    };
  }

  // localStorage wrapper that never throws (private windows, blocked storage).
  function store(key, fallback) {
    return {
      load() {
        try {
          const v = JSON.parse(localStorage.getItem(key));
          return v == null ? structuredClone(fallback) : v;
        } catch (e) {
          return structuredClone(fallback);
        }
      },
      save(v) {
        try {
          localStorage.setItem(key, JSON.stringify(v));
        } catch (e) {}
      },
    };
  }

  // Text to speech in the language's voice, if the browser has one.
  function canSpeak(meta) {
    if (!meta || !meta.speech || !("speechSynthesis" in window)) return false;
    const pre = meta.speech.split("-")[0];
    return speechSynthesis.getVoices().some((v) => v.lang.replace("_", "-").startsWith(pre));
  }
  function speak(text, meta) {
    if (!canSpeak(meta)) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = meta.speech;
    const pre = meta.speech.split("-")[0];
    const voices = speechSynthesis.getVoices();
    u.voice = voices.find((v) => v.lang.replace("_", "-") === meta.speech) || voices.find((v) => v.lang.startsWith(pre)) || null;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return true;
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices();

  // Loads a classic script once (data files assign globals, so they work over file://).
  const loaded = {};
  function loadScript(src) {
    if (!loaded[src]) {
      loaded[src] = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => {
          delete loaded[src];
          reject(new Error("Could not load " + src));
        };
        document.head.appendChild(s);
      });
    }
    return loaded[src];
  }

  function loadCss(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  // Klingon romanization -> pIqaD (ConScript code points). Longest match first
  // for tlh, ch, gh, ng; q and Q are different letters, so case matters.
  const PIQAD = {
    a: 0xf8d0, b: 0xf8d1, ch: 0xf8d2, D: 0xf8d3, e: 0xf8d4, gh: 0xf8d5, H: 0xf8d6, I: 0xf8d7,
    j: 0xf8d8, l: 0xf8d9, m: 0xf8da, n: 0xf8db, ng: 0xf8dc, o: 0xf8dd, p: 0xf8de, q: 0xf8df,
    Q: 0xf8e0, r: 0xf8e1, S: 0xf8e2, t: 0xf8e3, tlh: 0xf8e4, u: 0xf8e5, v: 0xf8e6, w: 0xf8e7,
    y: 0xf8e8, "'": 0xf8e9, "’": 0xf8e9, ",": 0xf8fd, ".": 0xf8fe,
  };
  function piqad(text) {
    let out = "";
    for (let i = 0; i < text.length; ) {
      const three = text.substr(i, 3), two = text.substr(i, 2);
      let key = three === "tlh" ? three : ["ch", "gh", "ng"].includes(two) ? two : text[i];
      // "ngh" is n + gh (as in nenghep), not ng + h.
      if (key === "ng" && text[i + 2] === "h") key = "n";
      out += PIQAD[key] ? String.fromCharCode(PIQAD[key]) : key;
      i += key.length;
    }
    return out;
  }

  // Per-language data files, listed under "data" in meta.json (see
  // languages/README.md). Each value is a file name or a list of them,
  // relative to the language's folder.
  function files(meta, kind) {
    const v = meta && meta.data && meta.data[kind];
    return v ? [].concat(v) : [];
  }
  function has(meta, kind) {
    return files(meta, kind).length > 0;
  }
  // Full URLs of a language's files of one kind, for tools that add their own
  // <script> tags.
  function dataUrls(meta, kind) {
    return files(meta, kind).map((f) => new URL(meta.id + "/" + f, BASE).href);
  }

  // reference.json over http://, the generated reference.js otherwise.
  async function loadReference(meta, url) {
    if (location.protocol !== "file:") {
      try {
        const r = await fetch(url, { cache: "no-cache" });
        if (r.ok) return await r.json();
      } catch (e) {}
    }
    if (!window.LSD_REFERENCE) {
      try {
        await loadScript(new URL("reference.js", BASE).href);
      } catch (e) {}
    }
    return (window.LSD_REFERENCE || {})[meta.id] || null;
  }

  // Loads one kind of data for a language and returns it, or null when the
  // language has none:
  //   characters -> { <characterKey>: script, ... } from window.SCRIPTS
  //   grammar    -> window.GRAMMAR[id]
  //   vocab      -> window.LSD_DECKS[id]
  //   reference  -> the parsed reference.json
  async function load(id, kind) {
    const meta = await get(id);
    const urls = dataUrls(meta, kind);
    if (!urls.length) return null;
    if (kind === "reference") return loadReference(meta, urls[0]);
    for (const u of urls) await loadScript(u);
    if (kind === "grammar") return (window.GRAMMAR || {})[meta.id] || null;
    if (kind === "vocab") return (window.LSD_DECKS || {})[meta.id] || null;
    if (kind === "characters") {
      const scripts = window.SCRIPTS || {};
      const out = {};
      (meta.characterKeys || []).forEach((k) => {
        if (scripts[k]) out[k] = scripts[k];
      });
      return Object.keys(out).length ? out : null;
    }
    return null;
  }

  window.LSD = {
    BASE, param, get, all, setParam, toolUrl, picker, store, canSpeak, speak, loadScript, loadCss, piqad,
    files, has, dataUrls, load,
  };
})();
