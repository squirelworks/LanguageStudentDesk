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
    "translation-learner": ("Translation Learner",
                            "Sentence translation checked by meaning, a meaning matrix across languages, and top-1,000 word practice.",
                            "Desk tools", True, None),
    "programming-learner": ("Programming Learner",
                            "Syntax, concepts and practice for programming languages, from Python to Malbolge.",
                            "Desk tools", True, None),
    "language-learner": ("Language Learner",
                         "A guided path per language: script, first words, grammar, then practice, with progress ticks.",
                         "Desk tools", True, None),
    "grammar-learner": ("Grammar Learner",
                        "Short grammar lessons with explained drills, from Japanese particles to Klingon verb prefixes.",
                        "Desk tools", True, None),
    "vocabulary-learner": ("Vocabulary Learner",
                           "Flashcards, spaced review and Anki export, with decks drawn from the SquirrelGo apps.",
                           "Desk tools", True, None),
    "squirrelgo-kana": ("SquirrelGo Kana",
                        "Hiragana and katakana: lessons, charts, quizzes, flashcards, writing pad, audio.",
                        "SquirrelGo apps", False, ("squirrelgo-kana-latest", "SquirrelGoKana-debug.apk")),
    "squirrelgo-alphabets": ("SquirrelGo Alphabets",
                             "The world's alphabets, Latin and Greek to Thai and Tibetan: lessons, stroke order, writing pad, sounds.",
                             "SquirrelGo apps", False, ("squirrelgo-alphabets-latest", "SquirrelGoAlphabets-debug.apk")),
    "squirrelgo-kanji": ("SquirrelGo Kanji",
                         "Kanji lessons, JLPT quizzes, dictionary, on-yomi groups and stroke order.",
                         "SquirrelGo apps", False, ("squirrelgo-kanji-latest", "SquirrelGoKanji-debug.apk")),
    "squirrelgo-klingon": ("SquirrelGo Klingon",
                           "The pIqaD script on the phone: letters, stroke order, writing pad and quizzes.",
                           "SquirrelGo apps", False, ("squirrelgo-klingon-latest", "SquirrelGoKlingon-debug.apk")),
    "squirrelgo-dictionary": ("SquirrelGo Japanese-English Dictionary",
                              "Offline JMdict and KANJIDIC2 dictionary with radicals and example sentences.",
                              "SquirrelGo apps", False, ("squirrelgo-dictionary-latest", "SquirrelGoDictionary.apk")),
    "squirrelgo-phrasebook": ("SquirrelGo Phrasebook",
                              "Japanese phrase packs with audio, search, favorites and flashcards.",
                              "SquirrelGo apps", False, ("squirrelgo-phrasebook-latest", "SquirrelGoPhrasebook-debug.apk")),
    "squirrelgo-orthodox-bible": ("SquirrelGo Orthodox Bible",
                                  "Septuagint canon, verses side by side in many languages, patristic commentary.",
                                  "SquirrelGo apps", False, ("squirrelgo-orthodox-bible-latest", "SquirrelGoOrthodoxBible-debug.apk")),
}
GROUPS = ["Desk tools", "SquirrelGo apps", "Other"]

# ?lang= values the scoped tools understand that are not languages in
# languages/registry.js: the Programming Learner's courses.
EXTRA_LANGS = [
    "python", "quickbasic", "brainfood", "delphi", "intercal", "lolcode", "malbolge", "piet", "whitespace",
    "win16", "z80",
]


class Tool:
    def __init__(self, folder, index):
        self.folder = folder
        self.index = index
        title, desc, group, scoped, apk = TOOLS.get(
            folder.name, (folder.name, "Found next to the Desk.", "Other", False, None))
        self.title, self.desc, self.group, self.scoped, self.apk = title, desc, group, scoped, apk

    @property
    def rel(self):
        return self.index.relative_to(BASE).as_posix()

    @property
    def apk_url(self):
        return f"{RELEASES}/download/{self.apk[0]}/{self.apk[1]}" if self.apk else None


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


def load_languages():
    """(id, label) pairs for the ?lang= dropdown: every language in the
    registry, by name, then the Programming Learner's courses by id."""
    metas = sorted(load_registry().values(), key=lambda m: m.get("name", m["id"]).lower())
    langs = [(m["id"], m.get("name", m["id"]) + (f" · {m['nativeName']}" if m.get("nativeName") else ""))
             for m in metas]
    ids = {i for i, _ in langs}
    return langs + [(x, x) for x in EXTRA_LANGS if x not in ids]


def home_page(tools):
    """The Desk home page served at / for --browser mode."""
    rows = []
    for group in GROUPS:
        items = [t for t in tools if t.group == group]
        if not items:
            continue
        rows.append(f"<h2>{html.escape(group)}</h2><ul>")
        for t in items:
            apk = f' · <a href="{t.apk_url}">Android APK</a>' if t.apk else ""
            scoped = ' data-scoped="1"' if t.scoped else ""
            rows.append(f'<li><a href="/{quote(t.rel)}"{scoped}><strong>{html.escape(t.title)}</strong></a>'
                        f'<br><span>{html.escape(t.desc)}{apk}</span></li>')
        rows.append("</ul>")
    options = "".join(f'<option value="{html.escape(i)}">{html.escape(label)}</option>' for i, label in load_languages())
    picker = (f'<p><label>Language <select id="lang"><option value="">Any</option>{options}</select></label>'
              ' <span>Tools that teach one language at a time open in this one.</span></p>')
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>Language Student Desk</title>
<style>body{{font-family:system-ui,sans-serif;background:#0f0f12;color:#e8e8e8;margin:0 auto;max-width:760px;padding:1.5rem}}
h1{{color:#ffd54f}}h2{{color:#aaa;font-size:.9rem;text-transform:uppercase;letter-spacing:.06em}}
ul{{list-style:none;padding:0}}li{{background:#1a1a20;border-radius:8px;padding:.8rem 1rem;margin:.5rem 0}}
a{{color:#ffd54f}}span{{color:#aaa;font-size:.9rem}}
select{{background:#1a1a20;color:#e8e8e8;border:1px solid #333;border-radius:6px;padding:.3rem .5rem;margin-left:.4rem}}</style></head><body>
<h1>Language Student Desk</h1>{picker}{''.join(rows)}
<script>
const pick = document.getElementById("lang");
pick.value = localStorage.getItem("lsd-desk-lang") || "";
function scope() {{
  localStorage.setItem("lsd-desk-lang", pick.value);
  document.querySelectorAll("a[data-scoped]").forEach((a) => {{
    const u = new URL(a.getAttribute("href"), location.href);
    if (pick.value) u.searchParams.set("lang", pick.value); else u.searchParams.delete("lang");
    a.href = u.pathname + u.search;
  }});
}}
pick.onchange = scope;
scope();
</script></body></html>"""


class DeskServer:
    """Serves the repository on 127.0.0.1 from a background thread."""

    def __init__(self, tools):
        tools_ref = tools

        class Handler(SimpleHTTPRequestHandler):
            def do_GET(self):
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
    search_var = tk.StringVar()
    search = ttk.Entry(header, textvariable=search_var, width=28)
    search.pack(side="right")
    ttk.Label(header, text="Search:").pack(side="right", padx=6)

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
    languages = load_languages()
    lang_ids = {label: lang_id for lang_id, label in languages}
    lang_combo = ttk.Combobox(lang_frame, textvariable=lang_var, width=28, state="readonly",
                              values=[""] + [label for _, label in languages])
    lang_combo.pack(side="left", padx=8)
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
            items = [t for t in tools if t.group == group
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
        status.config(text=f"{shown} of {len(tools)} tools shown · {where}")

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
