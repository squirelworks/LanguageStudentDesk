// Which Bibles and commentaries exist. The app reads this at startup and
// loads bibles/<id>.js or commentary/<id>.js only when they are used.
window.SGO_CATALOG = {
  "bibles": [
    {
      "id": "kjva",
      "name": "King James Version with Apocrypha (1769)",
      "lang": "en",
      "dir": "ltr",
      "versification": "kjv",
      "license": "Public Domain",
      "source": "https://github.com/scrollmapper/bible_databases (formats/json/KJVA.json)",
      "testaments": "OT,NT,DC"
    },
    {
      "id": "rus-synodal",
      "name": "Синодальный перевод (Russian Synodal, 1876)",
      "lang": "ru",
      "dir": "ltr",
      "versification": "rso",
      "license": "Public Domain",
      "source": "https://github.com/scrollmapper/bible_databases (formats/json/RusSynodal.json)",
      "testaments": "OT,NT"
    },
    {
      "id": "csl-elizabeth",
      "name": "Елизаветинская Библия (Church Slavonic, 1757)",
      "lang": "cu",
      "dir": "ltr",
      "versification": "rso",
      "license": "Public Domain",
      "source": "https://github.com/scrollmapper/bible_databases (formats/json/CSlElizabeth.json)",
      "testaments": "OT,NT"
    },
    {
      "id": "grc-byz",
      "name": "Byzantine Textform Greek NT (2013)",
      "lang": "grc",
      "dir": "ltr",
      "versification": "kjv",
      "license": "Public Domain",
      "source": "https://github.com/scrollmapper/bible_databases (formats/json/Byz.json)",
      "testaments": "NT"
    },
    {
      "id": "ell-vamvas",
      "name": "Vamvas Modern Greek Bible (1850)",
      "lang": "el",
      "dir": "ltr",
      "versification": "kjv",
      "license": "Public Domain",
      "source": "https://github.com/scrollmapper/bible_databases (formats/json/GreVamvas.json)",
      "testaments": "OT,NT"
    }
  ],
  "commentary": []
};
