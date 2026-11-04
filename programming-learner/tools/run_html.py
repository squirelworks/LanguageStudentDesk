#!/usr/bin/env python3
"""Checks the HTML and CSS course's pages (../data/html.js) in a real browser.

Each example is a whole HTML page. It is loaded into headless Chromium through
Playwright for Node.js, and the result is the text the page shows: the
browser's innerText of <body>, so CSS that hides, reorders or changes text
(display: none, text-transform, list markers left out) is part of the check.
On the course page the same examples are shown as a live preview instead.
Without node and its playwright package, AVAILABLE is False and
check_packs.py skips this course.
"""
import shutil
import subprocess
import sys

NODE = shutil.which("node")

SCRIPT = r"""
const { chromium } = require('playwright');
let src = '';
process.stdin.on('data', (d) => (src += d));
process.stdin.on('end', async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
    await page.setContent(src, { waitUntil: 'load' });
    process.stdout.write(await page.evaluate(() => document.body.innerText));
  } finally {
    await browser.close();
  }
});
"""


def _has_playwright():
    if not NODE:
        return False
    r = subprocess.run([NODE, "-e", "require.resolve('playwright')"], capture_output=True, timeout=30)
    return r.returncode == 0


AVAILABLE = _has_playwright()


def run(src):
    """Returns (shown text, error text)."""
    if not AVAILABLE:
        return "", "node with the playwright package is not installed"
    r = subprocess.run([NODE, "-e", SCRIPT], input=src, capture_output=True, text=True, timeout=60)
    out = "\n".join(line.rstrip() for line in r.stdout.replace("\r", "").split("\n")).strip("\n")
    err = "" if r.returncode == 0 else f"exit code {r.returncode} {r.stderr.strip()[-300:]}"
    return out, err


if __name__ == "__main__":
    print(run(sys.stdin.read() if not sys.argv[1:] else open(sys.argv[1], encoding="utf-8").read())[0])
