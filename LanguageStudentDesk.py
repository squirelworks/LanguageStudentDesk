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

class LanguageStudentDesk:
    def __init__(self, root):
        self.root = root
        self.root.title("Language Student Desk")
        self.root.geometry("600x500")
        self.root.minsize(500, 400)

        # Style
        style = ttk.Style()
        style.theme_use("clam")

        # Header
        header = ttk.Frame(root)
        header.pack(fill="x", padx=10, pady=10)
        ttk.Label(header, text="Language Student Desk", font=("Segoe UI", 18, "bold")).pack()
        ttk.Label(header, text="Scan and launch language tools", foreground="gray").pack()

        # Tools list
        list_frame = ttk.LabelFrame(root, text="Available Tools", padding=10)
        list_frame.pack(fill="both", expand=True, padx=10, pady=5)

        self.tree = ttk.Treeview(list_frame, columns=("path",), show="tree headings", height=12)
        self.tree.heading("#0", text="Tool")
        self.tree.heading("path", text="Location")
        self.tree.column("#0", width=250)
        self.tree.column("path", width=300)
        self.tree.pack(fill="both", expand=True)

        scrollbar = ttk.Scrollbar(list_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        scrollbar.pack(side="right", fill="y")

        # Buttons
        btn_frame = ttk.Frame(root)
        btn_frame.pack(fill="x", padx=10, pady=10)

        ttk.Button(btn_frame, text="Refresh", command=self.scan_tools).pack(side="left", padx=5)
        ttk.Button(btn_frame, text="Open in Browser", command=self.open_selected).pack(side="left", padx=5)
        ttk.Button(btn_frame, text="Open Folder", command=self.open_folder).pack(side="left", padx=5)

        # Status
        self.status = ttk.Label(root, text="Ready", relief="sunken", anchor="w")
        self.status.pack(fill="x", side="bottom")

        # Initial scan
        self.scan_tools()

        # Double-click to open
        self.tree.bind("<Double-1>", lambda e: self.open_selected())

    def scan_tools(self):
        """Scan the directory for folders containing index.html"""
        self.tree.delete(*self.tree.get_children())
        base = Path(__file__).parent if "__file__" in globals() else Path.cwd()
        tools = []

        for item in base.iterdir():
            if item.is_dir() and (item / "index.html").exists():
                tools.append((item.name, str(item / "index.html")))

        # Also check for the main script itself as a tool? Skip.
        if not tools:
            self.tree.insert("", "end", text="(No tools found)", values=("Place folders with index.html nearby",))
            self.status.config(text="No micro-apps detected. Add folders containing index.html.")
        else:
            for name, path in sorted(tools):
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
            webbrowser.open(f"file://{Path(path).resolve()}")
            self.status.config(text=f"Opened {Path(path).parent.name} in browser")
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
    # Support simple --browser flag (currently just informational; browser is the launch method)
    if "--browser" in sys.argv:
        print("LanguageStudentDesk: browser launch mode active")

    root = tk.Tk()
    app = LanguageStudentDesk(root)
    root.mainloop()

if __name__ == "__main__":
    main()
