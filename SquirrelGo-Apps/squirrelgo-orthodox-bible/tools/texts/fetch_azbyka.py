#!/usr/bin/env python3
"""Download the public-domain Russian patristic commentaries listed in
AZBYKA_BOOKS (sources_ru.py) from azbyka.ru/otechnik into .cache/azbyka/.

azbyka.ru is not reachable from every build machine, so the
"SquirrelGo Orthodox Bible Russian sources" workflow runs this script and
publishes .cache/azbyka/ to the orthodox-bible-sources-ru branch, which
fetch_sources.sh clones. Pages already downloaded are kept, so a rerun only
fetches what is missing.

    python3 fetch_azbyka.py            every book
    python3 fetch_azbyka.py andrew-ru  only the books of one commentary id
"""
import gzip
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from common import CACHE
from sources_ru import AZBYKA_BOOKS

OUT = os.path.join(CACHE, "azbyka")
SITE = "https://azbyka.ru"
UA = "SquirrelGoOrthodoxBible/1.0 (+https://github.com/squirelworks/LanguageStudentDesk; offline study Bible)"
DELAY = 1.0  # seconds between requests


def get(url):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            err = e
        except Exception as e:  # network hiccup
            err = e
        time.sleep(5 * (attempt + 1))
    print("  failed", url, err)
    return None


def page_path(book_dir, name):
    return os.path.join(book_dir, (name or "index") + ".html.gz")


def fetch(url, path):
    if os.path.exists(path):
        with gzip.open(path, "rt", encoding="utf-8") as f:
            return f.read(), False
    html = get(url)
    time.sleep(DELAY)
    if html is None:
        return None, True
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with gzip.open(path, "wt", encoding="utf-8") as f:
        f.write(html)
    return html, True


def crawl(book):
    root = book["url"].rstrip("/") + "/"
    rel = urllib.parse.urlparse(root).path  # /otechnik/Author/slug/
    book_dir = os.path.join(OUT, rel.strip("/").split("/", 1)[1])
    index, _ = fetch(root, page_path(book_dir, None))
    if index is None:
        print("  no index page", root)
        return 0
    # The table of contents links every part as <root><n>, <root><n>_<m>...
    pages = []
    for href in re.findall(r'href="([^"#?]+)"', index):
        p = urllib.parse.urlparse(urllib.parse.urljoin(root, href)).path
        if p.startswith(rel) and re.fullmatch(r"\d+(?:_\d+)*/?", p[len(rel):]):
            name = p[len(rel):].strip("/")
            if name not in pages:
                pages.append(name)
    new = 0
    for name in pages:
        _, fresh = fetch(root + name, page_path(book_dir, name))
        new += fresh
    print("  %s: %d pages (%d new)" % (rel, len(pages), new))
    return new


def main():
    want = set(sys.argv[1:])
    for cid, books in AZBYKA_BOOKS.items():
        if want and cid not in want:
            continue
        print(cid)
        for book in books:
            crawl(book)


if __name__ == "__main__":
    main()
