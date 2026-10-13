#!/usr/bin/env python3
"""
LanguageStudentDesk — Main environment launcher
Scans the current directory for micro-apps (folders with index.html)
and provides a desktop GUI to launch them in the system browser.
The desk GUI stays open while browser apps run separately.
"""

import os
import sys
import webbrowser
import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path

# Preferred order: Klingon flagship, then the core learners (resource first as original intent)
PREFERRED_ORDER = [
    "klingon",
    "resource-learner",
    "language-learner",
    "grammar-learner",
    "vocabulary-learner",
    "character-learner",
]

class LanguageStudentDesk:
    def __init__(self, root):
        self.root = root
        self.root.title("Language Student Desk")
        self.root.geometry("1200x1000")
        self.root.minsize(1000, 800)

        # Style
        style = ttk.Style()
        style.theme_use("clam")
        style.configure("Treeview", rowheight=32, font=("Segoe UI", 11))
        style.configure("Treeview.Heading", font=("Segoe UI", 12, "bold"))
        style.configure("TLabel", font=("Segoe UI", 11))
        style.configure("TButton", font=("Segoe UI", 11), padding=6)

        # Header
        header = ttk.Frame(root)
        header.pack(fill="x", padx=20, pady=20)
        ttk.Label(header, text="Language Student Desk", font=("Segoe UI", 28, "bold")).pack()
        ttk.Label(header, text="Scan and launch language tools", font=("Segoe UI", 14), foreground="gray").pack()

        # Tools list
        list_frame = ttk.LabelFrame(root, text="Available Tools", padding=15)
        list_frame.pack(fill="both", expand=True, padx=20, pady=10)

        self.tree = ttk.Treeview(list_frame, columns=("path",), show="tree headings", height=20)
        self.tree.heading("#0", text="Tool")
        self.tree.heading("path", text="Location")
        self.tree.column("#0", width=400, minwidth=200)
        self.tree.column("path", width=700, minwidth=300)
        self.tree.pack(fill="both", expand=True)

        scrollbar = ttk.Scrollbar(list_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        scrollbar.pack(side="right", fill="y")

        # Language scope (optional)
        lang_frame = ttk.Frame(root)
        lang_frame.pack(fill="x", padx=20, pady=5)
        ttk.Label(lang_frame, text="Scope to language (optional):").pack(side="left")
        self.lang_var = tk.StringVar()
        self.lang_combo = ttk.Combobox(lang_frame, textvariable=self.lang_var, width=20, state="readonly")
        self.lang_combo['values'] = ("", "klingon", "japanese", "arabic", "chinese", "cyrillic", "hangul", "hindi")
        self.lang_combo.pack(side="left", padx=8)
        ttk.Label(lang_frame, text="(adds ?lang= to character-learner)", foreground="gray").pack(side="left")

        # Buttons
        btn_frame = ttk.Frame(root)
        btn_frame.pack(fill="x", padx=20, pady=15)

        ttk.Button(btn_frame, text="Refresh", command=self.scan_tools).pack(side="left", padx=8)
        ttk.Button(btn_frame, text="Open in Browser", command=self.open_selected).pack(side="left", padx=8)
        ttk.Button(btn_frame, text="Open Folder", command=self.open_folder).pack(side="left", padx=8)

        # Status
        self.status = ttk.Label(root, text="Ready", relief="sunken", anchor="w", font=("Segoe UI", 10))
        self.status.pack(fill="x", side="bottom")

        # Initial scan
        self.scan_tools()

        # Double-click to open
        self.tree.bind("<Double-1>", lambda e: self.open_selected())

    def scan_tools(self):
        """Scan the directory for folders containing index.html and order by preference"""
        self.tree.delete(*self.tree.get_children())
        base = Path(__file__).parent if "__file__" in globals() else Path.cwd()
        tools = []

        for item in base.iterdir():
            if item.is_dir() and (item / "index.html").exists():
                tools.append((item.name, str(item / "index.html")))

        if not tools:
            self.tree.insert("", "end", text="(No tools found)", values=("Place folders with index.html nearby",))
            self.status.config(text="No micro-apps detected. Add folders containing index.html.")
            return

        def sort_key(item):
            name = item[0].lower()
            try:
                return PREFERRED_ORDER.index(name)
            except ValueError:
                return len(PREFERRED_ORDER) + 1

        tools.sort(key=sort_key)

        for name, path in tools:
            self.tree.insert("", "end", text=name, values=(path,))
        self.status.config(text=f"Found {len(tools)} tool(s). Double-click or select + Open in Browser.")

    def open_selected(self):
        selection = self.tree.selection()
        if not selection:
            messagebox.showinfo("Select a tool", "Please select a tool from the list.")
            return
        item = selection[0]
        path = self.tree.item(item, "values")[0]
        if path and Path(path).exists():
            url = f"file://{Path(path).resolve()}"
            lang = self.lang_var.get().strip()
            if lang and "character-learner" in path:
                url += f"?lang={lang}"
            webbrowser.open(url)
            scope = f" (lang={lang})" if lang and "character-learner" in path else ""
            self.status.config(text=f"Opened {Path(path).parent.name} in browser{scope}")
        else:
            messagebox.showwarning("Not found", "The selected tool path does not exist.")

    def open_folder(self):
        selection = self.tree.selection()
        if not selection:
            return
        item = selection[0]
        path = self.tree.item(item, "values")[0]
        if path:
            folder = str(Path(path).parent)
            if sys.platform == "win32":
                os.startfile(folder)
            elif sys.platform == "darwin":
                os.system(f'open "{folder}"')
            else:
                os.system(f'xdg-open "{folder}"')

def main():
    if "--browser" in sys.argv:
        print("LanguageStudentDesk: browser launch mode active")

    root = tk.Tk()
    app = LanguageStudentDesk(root)
    root.mainloop()

if __name__ == "__main__":
    main()
