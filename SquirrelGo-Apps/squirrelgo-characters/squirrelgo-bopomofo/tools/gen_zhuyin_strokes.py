#!/usr/bin/env python3
"""Generate www/data/strokes/zhuyin.js — hand-authored Bopomofo stroke paths (100×100 box)."""

from pathlib import Path

# Each value is a list of SVG path strings (M/L/Q only), stroke order per Taiwan primer guides.
STROKES = {
    # --- initials ---
    "ㄅ": [
        "M22,32 L58,32 Q74,32 74,50 Q74,70 52,78",
        "M34,52 L64,52",
    ],
    "ㄆ": [
        "M24,28 Q30,55 34,78",
        "M70,24 L26,74",
    ],
    "ㄇ": [
        "M26,22 L26,80",
        "M26,22 L74,22 L74,80 L26,80",
    ],
    "ㄈ": [
        "M28,26 L72,26",
        "M72,26 L72,76 L28,76 Q20,76 20,52 L20,32 Q20,26 28,26",
    ],
    "ㄉ": [
        "M22,34 L62,34 Q74,34 72,52 Q68,78 48,82 Q28,74 26,52 Q26,34 22,34",
    ],
    "ㄊ": [
        "M26,30 L70,30",
        "M58,30 Q48,52 38,78 Q54,72 64,52",
    ],
    "ㄋ": [
        "M24,36 L64,36 L46,56 L34,78 Q48,68 58,78",
    ],
    "ㄌ": [
        "M34,26 L58,26",
        "M46,26 L46,78 Q38,84 30,76",
    ],
    "ㄍ": [
        "M32,38 L50,58 L68,38",
    ],
    "ㄎ": [
        "M26,32 L68,32",
        "M68,32 L68,76 Q58,82 52,76 M54,54 L72,54",
    ],
    "ㄏ": [
        "M30,30 L52,38",
        "M22,48 L22,82 L78,82 L78,48",
    ],
    "ㄐ": [
        "M28,22 L28,78",
        "M28,22 Q56,22 66,44 Q72,62 54,78 Q36,72 28,52",
    ],
    "ㄑ": [
        "M26,26 L66,58 L38,80",
    ],
    "ㄒ": [
        "M26,38 L74,38",
        "M50,22 L50,78",
    ],
    "ㄓ": [
        "M26,28 L44,46 L36,56 L54,36",
        "M22,72 L78,72",
    ],
    "ㄔ": [
        "M32,24 L42,76",
        "M48,24 L58,76",
        "M54,24 L54,80",
    ],
    "ㄕ": [
        "M28,24 L28,54 L72,54",
        "M72,54 L72,80",
    ],
    "ㄖ": [
        "M28,50 L72,50",
        "M28,50 L28,22 L72,22",
        "M72,22 L72,78 L28,78",
    ],
    "ㄗ": [
        "M24,36 L68,36 Q76,52 52,72",
    ],
    "ㄘ": [
        "M22,42 L34,56",
        "M40,32 L72,32 Q80,48 58,70",
    ],
    "ㄙ": [
        "M32,58 L52,32 L74,58",
    ],
    # --- medials ---
    "ㄧ": ["M50,18 L50,82"],
    "ㄨ": [
        "M24,24 L76,76",
        "M76,24 L24,76",
    ],
    "ㄩ": [
        "M32,24 L32,76",
        "M32,76 L68,76",
        "M68,76 L68,24",
    ],
    # --- finals ---
    "ㄚ": [
        "M50,20 L50,78",
        "M50,52 L78,78",
    ],
    "ㄛ": [
        "M28,48 Q20,68 36,78",
        "M66,22 L66,78",
    ],
    "ㄜ": [
        "M28,48 Q20,68 36,78",
        "M66,22 L66,78",
    ],
    "ㄝ": [
        "M28,48 Q20,68 36,78",
        "M62,42 L72,42",
    ],
    "ㄞ": [
        "M50,20 L50,78",
        "M28,38 L72,62",
        "M72,38 L28,62",
    ],
    "ㄟ": [
        "M20,38 Q50,58 80,38 Q50,68 20,78",
    ],
    "ㄠ": [
        "M34,28 Q50,44 66,28 Q50,52 34,68",
        "M66,44 Q50,60 34,44 Q50,68 66,84",
    ],
    "ㄡ": [
        "M28,48 L72,48",
        "M50,28 Q72,48 50,78 Q28,48 50,28",
    ],
    "ㄢ": [
        "M50,22 L50,78",
        "M50,52 L78,52",
    ],
    "ㄣ": [
        "M24,32 L72,32 L28,68 Q48,78 68,62",
    ],
    "ㄤ": [
        "M24,28 L76,28",
        "M50,28 Q58,52 50,78",
        "M50,78 L78,78",
    ],
    "ㄥ": [
        "M24,32 L72,48 L28,72 L76,68",
    ],
    "ㄦ": [
        "M32,28 Q48,48 32,72",
        "M68,28 Q52,48 68,72",
    ],
    # --- tone marks (drawn symbols) ---
    "ˊ": ["M34,68 L66,32"],
    "ˇ": ["M24,58 L50,36 L76,58"],
    "ˋ": ["M34,32 L66,68"],
    "˙": ["M46,50 Q50,46 54,50 Q50,54 46,50"],
}


def main() -> None:
    out = Path(__file__).resolve().parents[1] / "www" / "data" / "strokes" / "zhuyin.js"
    lines = [
        "// Zhuyin (Bopomofo) stroke order for SquirrelGo Bopomofo.",
        "// Paths sit in a 100×100 box (M/L/Q only); see www/js/strokes.js.",
        "// Stroke count and order follow standard Taiwan handwriting primers.",
        "window.SG_STROKES = window.SG_STROKES || {};",
        'window.SG_STROKES["zhuyin"] = {',
    ]
    for ch, paths in STROKES.items():
        esc = ch.replace("\\", "\\\\").replace('"', '\\"')
        inner = ", ".join(f'"{p}"' for p in paths)
        lines.append(f'  "{esc}": [{inner}],')
    lines[-1] = lines[-1].rstrip(",")
    lines.append("};")
    lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(STROKES)} symbols to {out}")


if __name__ == "__main__":
    main()
