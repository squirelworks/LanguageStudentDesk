#!/usr/bin/env python3
"""
LanguageStudentDesk — Main environment launcher
Scans the repository for micro-apps (folders with index.html) and provides a
desktop GUI to launch them in the system browser.

Apps are served from a small local web server (127.0.0.1 only) rather than
opened as file:// pages: browsers drop ?lang= from file:// links on some
systems and block fonts and data files loaded from file://. The desk GUI stays
open while browser apps run separately, and the server stops when it closes.

    python3 LanguageStudentDesk.py            # desktop GUI
    python3 LanguageStudentDesk.py --browser  # no GUI: open the Desk home page in the browser
    python3 LanguageStudentDesk.py --list     # print the tools found and exit
    python3 LanguageStudentDesk.py --file     # GUI, but open apps as file:// pages
"""

import html
import json
import os
import subprocess
import sys
import threading
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, urlsplit

BASE = Path(__file__).resolve().parent
RELEASES = "https://github.com/squirelworks/LanguageStudentDesk/releases"

# Known tools, in display order. Folders with an index.html that are not listed
# here still show up, under "Other", named after the folder.
#   folder: (title, description, group, takes ?lang=, APK release tag and file)
TOOLS = {
    "klingon": ("Klingon (tlhIngan Hol)",
                "pIqaD alphabet, type in pIqaD, handwriting, numbers, vocabulary, grammar, reader and quizzes.",
                "Desk tools", False, None),
    "character-learner": ("Character Learner",
                          "Every script the Desk teaches, from kana and kanji to pIqaD and the SquirrelGo Alphabets: stroke order and a writing pad.",
                          "Desk tools", True, None),
    "resource-learner": ("Resource Learner",
                         "Curated learning resources, general and per language.",
                         "Desk tools", True, None),
    "reference-learner": ("Reference Learner",
                          "Quick lookup for language facts and notes.",
                          "Desk tools", True, None),
    "translation-learner": ("Translation Learner (alpha)",
                            "Sentence translation checked by meaning, a meaning matrix across languages, and top-1,000 word practice.",
                            "Desk tools", True, None),
    "programming-learner": ("Programming Learner",
                            "Syntax, concepts and practice for programming languages, from Python to Malbolge.",
                            "Desk tools", True, None),
    "programming-student-desk": ("Programming Student Desk",
                                 "The Programming Learner as its own offline Android app. A home menu lists every course and opens one inside the app.",
                                 "Desk tools", True, None),
    "legalese-learner": ("Legalese Learner",
                         "How the heavy words in a contract work: shall, notwithstanding, herein, and the clauses at the back. Reading practice, not legal advice.",
                         "Desk tools", False, None),
    "language-learner": ("Language Learner",
                         "A guided path per language: script, first words, grammar, then practice, with progress ticks.",
                         "Desk tools", True, None),
    "grammar-learner": ("Grammar Learner",
                        "Short grammar lessons with explained drills, from Japanese particles to Klingon verb prefixes.",
                        "Desk tools", True, None),
    "vocabulary-learner": ("Vocabulary Learner",
                           "Flashcards, spaced review and Anki export, with decks drawn from the SquirrelGo apps.",
                           "Desk tools", True, None),
    "lsd-suite": ("Language Student Desk (Android)",
                  "The Desk learners in one offline Android app. A home menu opens each learner inside the app.",
                  "Desk tools", False, None),
    "squirrelgo-kana": ("SquirrelGo Kana",
                        "Hiragana and katakana: lessons, charts, quizzes, flashcards, writing pad, audio.",
                        "SquirrelGo apps", False, ("latest", "SquirrelGoKana.apk")),
    "squirrelgo-bopomofo": ("SquirrelGo Bopomofo",
                            "Taiwan Zhuyin (Bopomofo): initials, medials, finals, tone marks, chart and quizzes.",
                            "SquirrelGo apps", False, None),
    "squirrelgo-alphabets": ("SquirrelGo Alphabets",
                             "The world's alphabets, Latin and Greek to Thai and Tibetan: lessons, stroke order, writing pad, sounds.",
                             "SquirrelGo apps", False, ("latest", "SquirrelGoAlphabets.apk")),
    "squirrelgo-kanji": ("SquirrelGo Kanji",
                         "Kanji lessons, JLPT quizzes, dictionary, on-yomi groups and stroke order.",
                         "SquirrelGo apps", False, ("latest", "SquirrelGoKanji.apk")),
    "squirrelgo-klingon": ("SquirrelGo Klingon",
                           "The pIqaD script on the phone: letters, stroke order, writing pad and quizzes.",
                           "SquirrelGo apps", False, ("latest", "SquirrelGoKlingon.apk")),
    "squirrelgo-dictionary": ("SquirrelGo Japanese-English Dictionary",
                              "Offline JMdict and KANJIDIC2 dictionary with radicals and example sentences.",
                              "SquirrelGo apps", False, ("latest", "SquirrelGoJapaneseDictionary.apk")),
    "squirrelgo-phrasebook": ("SquirrelGo Phrasebook",
                              "Japanese phrase packs with audio, search, favorites and flashcards.",
                              "SquirrelGo apps", False, ("latest", "SquirrelGoPhrasebook.apk")),
    "squirrelgo-orthodox-bible": ("SquirrelGo Orthodox Bible",
                                  "Septuagint canon, verses side by side in many languages, patristic commentary.",
                                  "SquirrelGo apps", False, ("latest", "SquirrelGoOrthodoxBible.apk")),
}
GROUPS = ["Desk tools", "SquirrelGo apps", "Other"]

# Tools that only show when a feature switch is on (see FEATURES below). Only
# obscure content is hidden at the Simple level; being in alpha isn't a reason.
TOOL_REQUIRES = {}

# ?lang= values the scoped tools understand that are not languages in
# languages/registry.js: the Programming Learner's courses.
EXTRA_LANGS = [
    "python", "quickbasic", "brainfood", "delphi", "c", "rust", "go", "slick", "chisel",
    "intercal", "lolcode", "malbolge", "piet", "whitespace",
    "win16", "z80", "cobol", "fortran", "moderndelphi", "numerical",
    "javascript", "turbopascal",
    "java",
]


def load_features():
    """The feature switches and Settings levels: languages/features.js, which
    squirrel-lang-data's tools/gen_features.py generates from its features.json."""
    try:
        text = (BASE / "languages" / "features.js").read_text(encoding="utf-8")
        body = text.split("window.LSD_FEATURES =", 1)[1].strip().rstrip(";")
        return json.loads(body)
    except (OSError, ValueError, IndexError):
        return {"levels": [], "features": [], "featured": [], "text": {}, "defaultLevel": "simple"}


FEATURES = load_features()
LEVEL_IDS = [lv["id"] for lv in FEATURES.get("levels", [])]


def settings_path():
    """Where the Desk remembers Settings between sessions (shared with its browser tabs)."""
    if sys.platform == "win32":
        root = Path(os.environ.get("APPDATA") or Path.home() / "AppData" / "Roaming")
    elif sys.platform == "darwin":
        root = Path.home() / "Library" / "Application Support"
    else:
        root = Path(os.environ.get("XDG_CONFIG_HOME") or Path.home() / ".config")
    return root / "LanguageStudentDesk" / "settings.json"


def clean_settings(raw):
    """The same shape lsd-features.js keeps: level, switches (when Custom),
    and whether the notice and the welcome card were dismissed."""
    out = {"level": FEATURES.get("defaultLevel") or (LEVEL_IDS[0] if LEVEL_IDS else "simple"),
           "switches": {}, "noticeDismissed": False, "welcomeDone": False}
    if isinstance(raw, dict):
        if raw.get("level") == "custom" or raw.get("level") in LEVEL_IDS:
            out["level"] = raw["level"]
        ids = {f["id"] for f in FEATURES.get("features", [])}
        sw = raw.get("switches") if isinstance(raw.get("switches"), dict) else {}
        out["switches"] = {k: v for k, v in sw.items() if k in ids and isinstance(v, bool)}
        out["noticeDismissed"] = bool(raw.get("noticeDismissed"))
        out["welcomeDone"] = bool(raw.get("welcomeDone"))
    return out


def load_settings():
    try:
        return clean_settings(json.loads(settings_path().read_text(encoding="utf-8")))
    except (OSError, ValueError):
        return clean_settings(None)


def save_settings(settings):
    path = settings_path()
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(clean_settings(settings), indent=2), encoding="utf-8")
    except OSError:
        pass


def _rank(level):
    return LEVEL_IDS.index(level) if level in LEVEL_IDS else 0


def feature_on(settings, fid):
    f = next((f for f in FEATURES.get("features", []) if f["id"] == fid), None)
    if not f:
        return False
    if settings["level"] == "custom":
        return settings["switches"].get(fid) is True
    return _rank(f["level"]) <= _rank(settings["level"])


def set_level(settings, level):
    settings["level"], settings["switches"] = level, {}


def set_feature(settings, fid, on):
    """One switch changed: keep the others, and show the level it now matches, or Custom."""
    feats = FEATURES.get("features", [])
    now = {f["id"]: feature_on(settings, f["id"]) for f in feats}
    now[fid] = bool(on)
    match = next((lv for lv in LEVEL_IDS
                  if all(now[f["id"]] == (_rank(f["level"]) <= _rank(lv)) for f in feats)), None)
    if match:
        set_level(settings, match)
    else:
        settings["level"], settings["switches"] = "custom", now


def allows(settings, requires):
    if not requires:
        return True
    return all(feature_on(settings, r) for r in ([requires] if isinstance(requires, str) else requires))


class Tool:
    def __init__(self, folder, index):
        self.folder = folder
        self.index = index
        title, desc, group, scoped, apk = TOOLS.get(
            folder.name, (folder.name, "Found next to the Desk.", "Other", False, None))
        self.title, self.desc, self.group, self.scoped, self.apk = title, desc, group, scoped, apk
        self.requires = TOOL_REQUIRES.get(folder.name)

    @property
    def rel(self):
        return self.index.relative_to(BASE).as_posix()

    @property
    def apk_url(self):
        if not self.apk:
            return None
        tag, name = self.apk
        # "latest" is the newest published platform release; any other tag pins one.
        return f"{RELEASES}/latest/download/{name}" if tag == "latest" else f"{RELEASES}/download/{tag}/{name}"


def scan_tools():
    """Folders containing index.html: top level, SquirrelGo-Apps/, and the
    character trainers under SquirrelGo-Apps/squirrelgo-characters/."""
    dirs = [BASE, BASE / "SquirrelGo-Apps", BASE / "SquirrelGo-Apps" / "squirrelgo-characters"]
    tools = []
    for d in dirs:
        if not d.is_dir():
            continue
        for item in sorted(d.iterdir()):
            if item.is_dir() and not item.name.startswith(".") and (item / "index.html").is_file():
                tools.append(Tool(item, item / "index.html"))
    order = list(TOOLS)
    tools.sort(key=lambda t: (GROUPS.index(t.group),
                              order.index(t.folder.name) if t.folder.name in order else len(order),
                              t.title.lower()))
    return tools


def load_registry():
    """languages/registry.js, which languages/build_registry.py generates from
    every languages/<id>/meta.json, as {id: meta}."""
    try:
        text = (BASE / "languages" / "registry.js").read_text(encoding="utf-8")
        body = text.split("window.LSD_LANGUAGE_REGISTRY =", 1)[1].strip().rstrip(";")
        return json.loads(body)
    except (OSError, ValueError, IndexError):
        return {}


def load_languages(settings=None):
    """(id, label) pairs for the ?lang= dropdown: every language in the
    registry that Settings allows, by name, then the Programming Learner's
    courses by id."""
    metas = sorted((m for m in load_registry().values()
                    if settings is None or allows(settings, m.get("requires"))),
                   key=lambda m: m.get("name", m["id"]).lower())
    langs = [(m["id"], m.get("name", m["id"]) + (f" · {m['nativeName']}" if m.get("nativeName") else ""))
             for m in metas]
    ids = {i for i, _ in langs}
    extras = sorted(((x, x) for x in EXTRA_LANGS if x not in ids), key=lambda pair: pair[1].lower())
    return langs + extras


def home_page(tools):
    """The Desk home page served at / for --browser mode. Settings, the notice
    and the welcome card come from languages/lsd-features.js, the same code the
    phone app's menu uses."""
    rows = []
    for group in GROUPS:
        items = [t for t in tools if t.group == group]
        if not items:
            continue
        rows.append(f"<h2>{html.escape(group)}</h2><ul>")
        for t in items:
            apk = f' · <a href="{t.apk_url}">Android APK</a>' if t.apk else ""
            scoped = ' data-scoped="1"' if t.scoped else ""
            req = f' data-requires="{html.escape(t.requires)}"' if t.requires else ""
            rows.append(f'<li{req}><a href="/{quote(t.rel)}"{scoped}><strong>{html.escape(t.title)}</strong></a>'
                        f'<br><span>{html.escape(t.desc)}{apk}</span></li>')
        rows.append("</ul>")
    registry = load_registry()
    options = []
    for i, label in load_languages():
        req = registry.get(i, {}).get("requires")
        attr = f' data-requires="{html.escape(json.dumps(req))}"' if req else ""
        options.append(f'<option value="{html.escape(i)}"{attr}>{html.escape(label)}</option>')
    picker = (f'<p><label>Language <select id="lang"><option value="">Any</option>{"".join(options)}</select></label>'
              ' <span>Tools that teach one language at a time open in this one.</span>'
              ' <button type="button" id="open-settings">Settings</button></p>')
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Language Student Desk</title>
<link rel="stylesheet" href="/languages/lsd-features.css">
<style>body{{font-family:system-ui,sans-serif;background:#0f0f12;color:#e8e8e8;margin:0 auto;max-width:760px;padding:1.5rem}}
h1{{color:#ffd54f}}h2{{color:#aaa;font-size:.9rem;text-transform:uppercase;letter-spacing:.06em}}
ul{{list-style:none;padding:0}}li{{background:#1a1a20;border-radius:8px;padding:.8rem 1rem;margin:.5rem 0}}
a{{color:#ffd54f}}span{{color:#aaa;font-size:.9rem}}[hidden]{{display:none!important}}
select,#open-settings{{background:#1a1a20;color:#e8e8e8;border:1px solid #333;border-radius:6px;padding:.3rem .5rem;margin-left:.4rem;font:inherit}}
#open-settings{{cursor:pointer}}</style></head><body>
<h1>Language Student Desk</h1><div id="welcome" hidden></div><div id="notice" hidden></div>{picker}
<section id="settings" hidden></section><div id="tools">{''.join(rows)}</div>
<script src="/languages/registry.js"></script>
<script src="/languages/features.js"></script>
<script src="/desk-settings.js"></script>
<script src="/languages/lsd-features.js"></script>
<script>
const pick = document.getElementById("lang");
const settings = document.getElementById("settings");
pick.value = localStorage.getItem("lsd-desk-lang") || "";
function scope() {{
  localStorage.setItem("lsd-desk-lang", pick.value);
  document.querySelectorAll("a[data-scoped]").forEach((a) => {{
    const u = new URL(a.getAttribute("href"), location.href);
    if (pick.value) u.searchParams.set("lang", pick.value); else u.searchParams.delete("lang");
    a.href = u.pathname + u.search;
  }});
}}
function filter() {{
  document.querySelectorAll("[data-requires]").forEach((el) => {{
    let req = el.dataset.requires;
    try {{ req = JSON.parse(req); }} catch (e) {{}}
    el.hidden = !LSDFeatures.allows({{ requires: req }});
  }});
  if (pick.selectedOptions[0] && pick.selectedOptions[0].hidden) {{ pick.value = ""; scope(); }}
}}
function toggleSettings(show) {{
  settings.hidden = show === undefined ? !settings.hidden : !show;
  document.getElementById("open-settings").textContent = settings.hidden ? "Settings" : "Close Settings";
  if (!settings.hidden) settings.scrollIntoView({{ behavior: "smooth" }});
}}
// A featured language opens its guided path, whatever the Settings level.
function openLanguage(id) {{ location.href = "/language-learner/index.html?lang=" + encodeURIComponent(id); }}
pick.onchange = scope;
document.getElementById("open-settings").onclick = () => toggleSettings();
LSDFeatures.renderWelcome(document.getElementById("welcome"), openLanguage);
LSDFeatures.renderNotice(document.getElementById("notice"), () => toggleSettings(true));
LSDFeatures.renderSettings(settings, openLanguage);
LSDFeatures.onChange(filter);
filter();
scope();
</script></body></html>"""


class DeskServer:
    """Serves the repository on 127.0.0.1 from a background thread."""

    def __init__(self, tools):
        tools_ref = tools

        class Handler(SimpleHTTPRequestHandler):
            def send_body(self, body, ctype):
                self.send_response(200)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_POST(self):
                # Settings changed in a browser tab: remember them for the Desk window too.
                if urlsplit(self.path).path != "/desk-settings":
                    self.send_error(404)
                    return
                try:
                    size = int(self.headers.get("Content-Length") or 0)
                    if size > 65536:
                        raise ValueError("too large")
                    save_settings(json.loads(self.rfile.read(size) or b"{}"))
                except ValueError:
                    self.send_error(400)
                    return
                self.send_body(b"{}", "application/json")

            def do_GET(self):
                if urlsplit(self.path).path == "/desk-settings.js":
                    body = ("window.LSD_DESK_SETTINGS = " + json.dumps(load_settings()) + ";\n").encode("utf-8")
                    self.send_body(body, "text/javascript; charset=utf-8")
                    return
                if urlsplit(self.path).path in ("/", "/index.html"):
                    body = home_page(tools_ref).encode("utf-8")
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(len(body)))
                    self.end_headers()
                    self.wfile.write(body)
                    return
                # Keep .git and other dotfiles private.
                if "/." in urlsplit(self.path).path:
                    self.send_error(404)
                    return
                super().do_GET()

            def end_headers(self):
                # Always serve the files on disk, so edits show up on reload.
                self.send_header("Cache-Control", "no-store")
                super().end_headers()

            def log_message(self, *args):
                pass

        self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), partial(Handler, directory=str(BASE)))
        self.port = self.httpd.server_address[1]
        threading.Thread(target=self.httpd.serve_forever, daemon=True).start()

    def url(self, rel=""):
        return f"http://127.0.0.1:{self.port}/{quote(rel)}"

    def stop(self):
        self.httpd.shutdown()


def tool_url(tool, server, lang=""):
    url = server.url(tool.rel) if server else tool.index.as_uri()
    if lang and tool.scoped:
        url += f"?lang={quote(lang)}"
    return url


def open_folder(path):
    if sys.platform == "win32":
        os.startfile(path)
    else:
        subprocess.Popen(["open" if sys.platform == "darwin" else "xdg-open", str(path)])


def _ui_font_family():
    """Pick a UI font that exists on this machine (Segoe UI is Windows-only)."""
    from tkinter import font as tkfont
    available = {name.lower(): name for name in tkfont.families()}
    for want in ("Segoe UI", "Ubuntu", "Noto Sans", "DejaVu Sans", "Cantarell", "Helvetica"):
        if want.lower() in available:
            return available[want.lower()]
    return "TkDefaultFont"


def run_gui(tools, server):
    import tkinter as tk
    from tkinter import font as tkfont
    from tkinter import ttk, messagebox

    root = tk.Tk()
    root.title("Language Student Desk")
    # Open at 88% of the current screen, centered (not a fixed 1100x720 box).
    sw = root.winfo_screenwidth()
    sh = root.winfo_screenheight()
    ww = max(820, int(sw * 0.88))
    wh = max(540, int(sh * 0.88))
    x = max(0, (sw - ww) // 2)
    y = max(0, (sh - wh) // 2)
    root.geometry(f"{ww}x{wh}+{x}+{y}")
    root.minsize(820, 540)

    family = _ui_font_family()
    body_font = tkfont.Font(family=family, size=11)
    # Hard-coded rowheight=28 crushed descenders once Segoe UI fell back to a
    # taller Linux font (Noto Sans / Ubuntu) or HiDPI bumped tk scaling.
    # Size every Treeview row from the live font metrics.
    tree_row_h = max(40, body_font.metrics("linespace") + 16)

    style = ttk.Style()
    if "clam" in style.theme_names():
        style.theme_use("clam")
    style.configure("Treeview", rowheight=tree_row_h, font=(family, 11))
    style.configure("Treeview.Heading", font=(family, 11, "bold"))
    style.configure("TLabel", font=(family, 11))
    style.configure("TButton", font=(family, 11), padding=6)
    style.configure("Title.TLabel", font=(family, 22, "bold"))
    style.configure("Name.TLabel", font=(family, 16, "bold"))
    style.configure("Muted.TLabel", foreground="gray")

    # Header
    header = ttk.Frame(root)
    header.pack(fill="x", padx=16, pady=(14, 6))
    ttk.Label(header, text="Language Student Desk", style="Title.TLabel").pack(side="left")
    settings = load_settings()
    text = FEATURES.get("text", {})
    settings_btn = ttk.Button(header, text="Settings")
    settings_btn.pack(side="right", padx=(12, 0))
    search_var = tk.StringVar()
    search = ttk.Entry(header, textvariable=search_var, width=28)
    search.pack(side="right")
    ttk.Label(header, text="Search:").pack(side="right", padx=6)

    # The "more is available" notice, until it's dismissed.
    notice = ttk.Frame(root)
    if text.get("notice") and not settings["noticeDismissed"]:
        notice.pack(fill="x", padx=16, pady=(0, 4))
        ttk.Label(notice, text=text["notice"], style="Muted.TLabel").pack(side="left")

        def dismiss_notice():
            settings.update(load_settings(), noticeDismissed=True)
            save_settings(settings)
            notice.pack_forget()
        ttk.Button(notice, text="Dismiss", command=dismiss_notice).pack(side="right")
        ttk.Button(notice, text="Open Settings", command=lambda: open_settings()).pack(side="right", padx=6)

    body = ttk.PanedWindow(root, orient="horizontal")
    body.pack(fill="both", expand=True, padx=16, pady=6)

    # Left: grouped tool list
    list_frame = ttk.Frame(body)
    tree = ttk.Treeview(list_frame, show="tree", selectmode="browse")
    tree.column("#0", width=340, minwidth=200)
    scrollbar = ttk.Scrollbar(list_frame, orient="vertical", command=tree.yview)
    tree.configure(yscrollcommand=scrollbar.set)
    scrollbar.pack(side="right", fill="y")
    tree.pack(fill="both", expand=True)
    body.add(list_frame, weight=1)

    # Right: details of the selected tool
    detail = ttk.Frame(body, padding=(16, 4))
    body.add(detail, weight=2)
    name_lbl = ttk.Label(detail, text="", style="Name.TLabel", wraplength=560, justify="left")
    name_lbl.pack(anchor="w")
    desc_lbl = ttk.Label(detail, text="", wraplength=560, justify="left")
    desc_lbl.pack(anchor="w", pady=(6, 2))
    path_lbl = ttk.Label(detail, text="", style="Muted.TLabel", wraplength=560, justify="left")
    path_lbl.pack(anchor="w", pady=(0, 12))

    lang_frame = ttk.Frame(detail)
    lang_frame.pack(anchor="w", pady=4)
    ttk.Label(lang_frame, text="Language:").pack(side="left")
    lang_var = tk.StringVar()
    lang_ids = {}
    lang_combo = ttk.Combobox(lang_frame, textvariable=lang_var, width=28, state="readonly")
    lang_combo.pack(side="left", padx=8)

    def fill_languages():
        languages = load_languages(settings)
        lang_ids.clear()
        lang_ids.update({label: lang_id for lang_id, label in languages})
        lang_combo.config(values=[""] + [label for _, label in languages])
        if lang_var.get() not in lang_ids:
            lang_var.set("")
    fill_languages()
    lang_note = ttk.Label(lang_frame, text="", style="Muted.TLabel")
    lang_note.pack(side="left")

    btns = ttk.Frame(detail)
    btns.pack(anchor="w", pady=12)
    open_btn = ttk.Button(btns, text="Open in Browser")
    folder_btn = ttk.Button(btns, text="Open Folder")
    apk_btn = ttk.Button(btns, text="Android APK")
    copy_btn = ttk.Button(btns, text="Copy Link")
    for b in (open_btn, folder_btn, apk_btn, copy_btn):
        b.pack(side="left", padx=(0, 8))

    status = ttk.Label(root, text="", relief="sunken", anchor="w", font=(family, 10))
    status.pack(fill="x", side="bottom")

    by_iid = {}

    def selected():
        sel = tree.selection()
        return by_iid.get(sel[0]) if sel else None

    def fill(*_):
        query = search_var.get().strip().lower()
        tree.delete(*tree.get_children())
        by_iid.clear()
        shown = 0
        for group in GROUPS:
            items = [t for t in tools if t.group == group and allows(settings, t.requires)
                     and (not query or query in f"{t.title} {t.desc} {t.folder.name}".lower())]
            if not items:
                continue
            gid = tree.insert("", "end", text=group, open=True)
            for t in items:
                by_iid[tree.insert(gid, "end", text=t.title)] = t
                shown += 1
        if not tools:
            tree.insert("", "end", text="(No tools found)")
            status.config(text="No micro-apps detected. Add folders containing index.html.")
            return
        first = next(iter(by_iid), None)
        if first:
            tree.selection_set(first)
            tree.see(first)
        where = f"served at {server.url()}" if server else "opened as local files"
        status.config(text=f"{shown} of {len([t for t in tools if allows(settings, t.requires)])} tools shown · {where}")

    def show(*_):
        t = selected()
        for w in (open_btn, folder_btn, copy_btn):
            w.state(["!disabled"] if t else ["disabled"])
        if not t:
            name_lbl.config(text="")
            desc_lbl.config(text="Select a tool on the left.")
            path_lbl.config(text="")
            apk_btn.state(["disabled"])
            return
        name_lbl.config(text=t.title)
        desc_lbl.config(text=t.desc)
        path_lbl.config(text=t.rel)
        lang_combo.state(["!disabled", "readonly"] if t.scoped else ["disabled"])
        lang_note.config(text="opens scoped to this language" if t.scoped else "not used by this tool")
        apk_btn.state(["!disabled"] if t.apk else ["disabled"])

    def open_selected(*_):
        t = selected()
        if not t:
            return
        if not t.index.exists():
            messagebox.showwarning("Not found", "The selected tool's files are missing. Try searching again.")
            return
        lang = lang_ids.get(lang_var.get(), "")
        webbrowser.open(tool_url(t, server, lang))
        scope = f" (lang={lang})" if lang and t.scoped else ""
        status.config(text=f"Opened {t.title} in browser{scope}")

    def open_apk():
        t = selected()
        if t and t.apk:
            webbrowser.open(t.apk_url)
            status.config(text=f"Opened the {t.title} APK download")

    def copy_link():
        t = selected()
        if t:
            root.clipboard_clear()
            root.clipboard_append(tool_url(t, server, lang_ids.get(lang_var.get(), "")))
            status.config(text="Link copied. It works while the Desk is open.")

    by_folder = {t.folder.name: t for t in tools}

    def open_language(lang_id):
        """A featured language opens its guided path, whatever the Settings level."""
        t = by_folder.get("language-learner")
        if t:
            webbrowser.open(tool_url(t, server, lang_id))
            status.config(text=f"Opened {t.title} in browser (lang={lang_id})")

    def featured():
        reg = load_registry()
        return [reg[i] for i in FEATURES.get("featured", []) if i in reg]

    def lang_label(m):
        return m.get("name", m["id"]) + (f" · {m['nativeName']}" if m.get("nativeName") else "")

    def featured_buttons(parent, after=None):
        row = ttk.Frame(parent)
        for m in featured():
            def go(i=m["id"]):
                if after:
                    after()
                open_language(i)
            ttk.Button(row, text=lang_label(m), command=go).pack(side="left", padx=(0, 8))
        return row

    def settings_changed():
        save_settings(settings)
        fill_languages()
        fill()
        show()

    settings_win = [None]

    def open_settings():
        """Levels, Customize and "What's in the app", the same as the phone's Settings tab."""
        if settings_win[0] is not None and settings_win[0].winfo_exists():
            settings_win[0].lift()
            return
        settings.update(load_settings())  # a browser tab may have changed them
        win = tk.Toplevel(root)
        settings_win[0] = win
        win.title("Settings")
        win.geometry(f"{max(560, int(sw * 0.4))}x{max(520, int(sh * 0.7))}")
        canvas = tk.Canvas(win, highlightthickness=0)
        bar = ttk.Scrollbar(win, orient="vertical", command=canvas.yview)
        inner = ttk.Frame(canvas, padding=16)
        inner.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=inner, anchor="nw")
        canvas.configure(yscrollcommand=bar.set)
        bar.pack(side="right", fill="y")
        canvas.pack(side="left", fill="both", expand=True)
        win.bind("<MouseWheel>", lambda e: canvas.yview_scroll(-1 if e.delta > 0 else 1, "units"))
        win.bind("<Button-4>", lambda e: canvas.yview_scroll(-1, "units"))
        win.bind("<Button-5>", lambda e: canvas.yview_scroll(1, "units"))

        level_var = tk.StringVar(value=settings["level"])
        switch_vars = {}
        whats = ttk.Frame(inner)

        def refresh():
            level_var.set(settings["level"])
            custom_lbl.config(text=text.get("custom", "Custom") if settings["level"] == "custom" else "")
            for fid, var in switch_vars.items():
                var.set(feature_on(settings, fid))
            draw_whats()
            settings_changed()

        def pick_level():
            set_level(settings, level_var.get())
            refresh()

        levels = ttk.LabelFrame(inner, text="Show", padding=10)
        levels.pack(fill="x", pady=(0, 10))
        for lv in FEATURES.get("levels", []):
            ttk.Radiobutton(levels, text=lv["label"], value=lv["id"], variable=level_var,
                            command=pick_level).pack(anchor="w")
            ttk.Label(levels, text=lv["description"], style="Muted.TLabel", wraplength=480).pack(anchor="w", padx=(24, 0))
        custom_lbl = ttk.Label(levels, text="")
        custom_lbl.pack(anchor="w", pady=(4, 0))

        custom = ttk.LabelFrame(inner, text=text.get("customize", "Customize"), padding=10)
        custom.pack(fill="x", pady=(0, 10))
        # Newest first, so a new switch shows up at the top.
        order = sorted(FEATURES.get("features", []), key=lambda f: f["label"])
        order.sort(key=lambda f: f.get("added", ""), reverse=True)
        for f in order:
            var = tk.BooleanVar(value=feature_on(settings, f["id"]))
            switch_vars[f["id"]] = var

            def flip(fid=f["id"], v=var):
                set_feature(settings, fid, v.get())
                refresh()
            ttk.Checkbutton(custom, text=f["label"], variable=var, command=flip).pack(anchor="w")
            ttk.Label(custom, text=f["description"], style="Muted.TLabel", wraplength=480).pack(anchor="w", padx=(24, 0))

        ttk.Label(inner, text=text.get("whatsInApp", "What's in the app"), style="Name.TLabel").pack(anchor="w", pady=(6, 4))
        whats.pack(fill="x")

        def draw_whats():
            for w in whats.winfo_children():
                w.destroy()
            if featured():
                ttk.Label(whats, text=text.get("welcomeBody", "")).pack(anchor="w")
                featured_buttons(whats).pack(anchor="w", pady=(4, 10))
            hidden = [m for m in load_registry().values() if not allows(settings, m.get("requires"))]
            for f in sorted(FEATURES.get("features", []), key=lambda f: f["label"]):
                on = feature_on(settings, f["id"])
                extra = [lang_label(m) for m in hidden
                         if f["id"] in ([m["requires"]] if isinstance(m["requires"], str) else m["requires"])]
                state = "on" if on else f"off: turn on {f['label']} in Customize"
                ttk.Label(whats, text=f"{f['label']} ({state})", font=(family, 11, "bold")).pack(anchor="w")
                desc = f["description"] + (" " + ", ".join(extra) + "." if extra else "")
                ttk.Label(whats, text=desc, style="Muted.TLabel", wraplength=480).pack(anchor="w", pady=(0, 6))
        refresh()

    def welcome():
        """First run: suggest the featured languages that have shipped."""
        if settings["welcomeDone"] or not featured():
            return
        win = tk.Toplevel(root)
        win.title(text.get("welcomeTitle", "Welcome"))
        win.transient(root)
        frame = ttk.Frame(win, padding=20)
        frame.pack(fill="both", expand=True)

        def done():
            settings.update(load_settings(), welcomeDone=True)
            save_settings(settings)
            win.destroy()
        ttk.Label(frame, text=text.get("welcomeTitle", "Welcome"), style="Name.TLabel").pack(anchor="w")
        ttk.Label(frame, text=text.get("welcomeBody", "")).pack(anchor="w", pady=(6, 12))
        featured_buttons(frame, after=done).pack(anchor="w")
        ttk.Button(frame, text="Not now", command=done).pack(anchor="e", pady=(16, 0))
        win.protocol("WM_DELETE_WINDOW", done)

    settings_btn.config(command=open_settings)
    open_btn.config(command=open_selected)
    folder_btn.config(command=lambda: selected() and open_folder(selected().folder))
    apk_btn.config(command=open_apk)
    copy_btn.config(command=copy_link)
    tree.bind("<<TreeviewSelect>>", show)
    tree.bind("<Double-1>", open_selected)
    tree.bind("<Return>", open_selected)
    search_var.trace_add("write", fill)
    root.bind("<Control-f>", lambda e: search.focus_set())

    fill()
    show()
    tree.focus_set()
    root.after(200, welcome)
    root.mainloop()


def main():
    tools = scan_tools()
    if "--list" in sys.argv:
        for t in tools:
            print(f"{t.group:16} {t.title:40} {t.rel}")
        return

    server = None
    if "--file" not in sys.argv:
        try:
            server = DeskServer(tools)
        except OSError as e:
            print(f"LanguageStudentDesk: could not start the local server ({e}); opening apps as files.")

    gui = "--browser" not in sys.argv
    if gui:
        try:
            import tkinter  # noqa: F401
        except ImportError:
            print("LanguageStudentDesk: tkinter is not installed, opening the Desk in your browser instead.")
            gui = False

    if gui:
        run_gui(tools, server)
    elif server:
        print(f"LanguageStudentDesk: serving at {server.url()} — press Ctrl+C to stop.")
        webbrowser.open(server.url())
        try:
            threading.Event().wait()
        except KeyboardInterrupt:
            pass
    else:
        print("LanguageStudentDesk: no GUI and no server; open the tools' index.html files directly.")

    if server:
        server.stop()


if __name__ == "__main__":
    main()
