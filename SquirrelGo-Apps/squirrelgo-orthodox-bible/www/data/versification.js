// Maps verse references from a translation's own numbering to KJV numbering,
// listing only the references that differ. A null value means the verse has
// no KJV equivalent (for example a psalm title numbered as its own verse).
// Schemes: kjv (identity), lxx (Septuagint), rso (Russian Synodal / Slavonic).
// This sample covers Psalm 50 (51) only; the full maps are delivered separately.
window.SGO_VERSIFICATION = {
  kjv: {},
  lxx: {},
  rso: {
    "PSA.50.1": null,
    "PSA.50.2": null,
    "PSA.50.3": "PSA.51.1",
    "PSA.50.4": "PSA.51.2",
    "PSA.50.5": "PSA.51.3",
    "PSA.50.6": "PSA.51.4",
    "PSA.50.7": "PSA.51.5",
    "PSA.50.8": "PSA.51.6",
    "PSA.50.9": "PSA.51.7",
    "PSA.50.10": "PSA.51.8",
    "PSA.50.11": "PSA.51.9",
    "PSA.50.12": "PSA.51.10",
    "PSA.50.13": "PSA.51.11",
    "PSA.50.14": "PSA.51.12",
    "PSA.50.15": "PSA.51.13",
    "PSA.50.16": "PSA.51.14",
    "PSA.50.17": "PSA.51.15",
    "PSA.50.18": "PSA.51.16",
    "PSA.50.19": "PSA.51.17",
    "PSA.50.20": "PSA.51.18",
    "PSA.50.21": "PSA.51.19"
  },
};
