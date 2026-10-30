// Turns a date into the Orthodox liturgical day: titles, feasts, saints and
// the readings appointed for it, from the tables in lectionary.js (load that
// first). Slavic (OCA) usage, on the New (Revised Julian) or Old (Julian)
// calendar. A port of Orthocal's calendarium.liturgics (MIT, Brian Glass).
//
//   SGO_LECTIONARY.day(new Date(), {calendar: "new" | "old"})
//
// Every reading's refs are [book, chapter, verse, endChapter, endVerse] in
// KJV numbering; a composite Old Testament reading has refs [] and only a
// display string. `main` lists the indexes of the day's chief Epistle and
// Gospel in `readings`.
(function () {
  var L = window.SGO_LECTIONARY;
  if (!L) return;

  var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function mod(a, n) { return ((a % n) + n) % n; }

  function jdnGregorian(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) -
      Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }

  function jdnJulian(y, m, d) {
    var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - 32083;
  }

  function julianFromJdn(j) {
    var c = j + 32082, d = Math.floor((4 * c + 3) / 1461), e = c - Math.floor(1461 * d / 4),
      m = Math.floor((5 * e + 2) / 153);
    return { y: d - 4800 + Math.floor(m / 10), m: m + 3 - 12 * Math.floor(m / 10),
      d: e - Math.floor((153 * m + 2) / 5) + 1 };
  }

  function gregorianFromJdn(j) {
    var a = j + 32044, b = Math.floor((4 * a + 3) / 146097), c = a - Math.floor(146097 * b / 4),
      d = Math.floor((4 * c + 3) / 1461), e = c - Math.floor(1461 * d / 4),
      m = Math.floor((5 * e + 2) / 153);
    return { y: 100 * b + d - 4800 + Math.floor(m / 10), m: m + 3 - 12 * Math.floor(m / 10),
      d: e - Math.floor((153 * m + 2) / 5) + 1 };
  }

  // Julian day number of Pascha (Meeus' Julian computus).
  function pascha(y) {
    var a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7;
    return jdnJulian(y, Math.floor((d + e + 114) / 31), (d + e + 114) % 31 + 1);
  }

  // Saturday/Sunday before and after a day, as distances from Pascha.
  function weekends(dist) {
    var w = mod(dist, 7);
    return [dist - w - 1, dist - 7 + (7 - w) % 7, dist + 7 - (w + 1) % 7, dist + 7 - w];
  }

  // Floating feasts: their rows in lectionary.js are keyed by these indexes.
  var F = {
    FathersSix: 1001, FathersSeventh: 1002, DemetriusSaturday: 1003, SynaxisUnmercenaries: 1004,
    SatBeforeElevationMoved: 1005, SatBeforeElevation: 1006, SunBeforeElevation: 1007,
    SatAfterElevation: 1008, SunAfterElevation: 1009, SunForefathers: 1010,
    SatBeforeNativity: 1011, SunBeforeNativity: 1012, RoyalHoursNativityFriday: 1013,
    EveNativity: 1014, SatBeforeNativityEve: 1015, SunBeforeNativityEve: 1016,
    SatAfterNativityBeforeTheophany: 1017, SatAfterNativityFriday: 1018, SatAfterNativity: 1019,
    SunAfterNativityMonday: 1020, SunAfterNativity: 1021, SatBeforeTheophany: 1022,
    SatBeforeTheophanyJan: 1023, SunBeforeTheophany: 1024, RoyalHoursTheophanyFriday: 1025,
    TheophanyEve: 1026, SatBeforeTheophanyEve: 1027, SunBeforeTheophanyEve: 1028,
    SatAfterTheophany: 1029, SunAfterTheophany: 1030, NewMartyrsRussia: 1031,
    AnnunciationParemFriday: 1032, AnnunciationSat: 1033, AnnunciationSun: 1034,
    AnnunciationMon: 1035, AnnunciationParemEve: 1036, AnnunciationWeekday: 1037,
    LeavetakingTheophanyWeekday: 1038
  };

  // A liturgical year runs from one Sunday of Zacchaeus (Pascha - 77) to the
  // next. Everything here is a distance in days from this year's Pascha.
  var years = {};
  function Year(year, julian) {
    var key = year + (julian ? "j" : "g");
    if (years[key]) return years[key];
    var Y = years[key] = { year: year, julian: julian, pascha: pascha(year),
      nextPascha: pascha(year + 1), previousPascha: pascha(year - 1) };
    function dp(m, d, y) { return (julian ? jdnJulian(y, m, d) : jdnGregorian(y, m, d)) - Y.pascha; }
    Y.dp = dp;
    var wd = function (p) { return mod(p, 7); };

    Y.elevation = dp(9, 14, year);
    Y.theophany = dp(1, 6, year + 1);
    Y.annunciation = dp(3, 25, year);
    Y.nativity = dp(12, 25, year);
    Y.nativityTheotokos = dp(9, 8, year);
    var e = weekends(Y.elevation), t = weekends(Y.theophany), n = weekends(Y.nativity);
    Y.satBeforeElevation = e[0]; Y.sunBeforeElevation = e[1]; Y.satAfterElevation = e[2]; Y.sunAfterElevation = e[3];
    Y.satBeforeTheophany = t[0]; Y.sunBeforeTheophany = t[1]; Y.satAfterTheophany = t[2]; Y.sunAfterTheophany = t[3];
    Y.satBeforeNativity = n[0]; Y.sunBeforeNativity = n[1]; Y.satAfterNativity = n[2]; Y.sunAfterNativity = n[3];

    var p = dp(7, 16, year);
    Y.fathersSix = wd(p) < 4 ? p - wd(p) : p + 7 - wd(p);
    p = dp(10, 11, year);
    Y.fathersSeven = wd(p) > 0 ? p + 7 - wd(p) : p;
    p = dp(10, 26, year);
    Y.demetriusSaturday = p - wd(p) - 1;
    p = dp(11, 1, year);
    Y.synaxisUnmercenaries = p + 7 - wd(p);
    Y.forefathers = Y.nativity - 14 + (7 - wd(Y.nativity)) % 7;
    p = dp(1, 25, year + 1);
    Y.newMartyrsRussia = wd(p) < 4 ? p - wd(p) : p - wd(p) + 7;

    // The Lukan jump: the Gospel cycle moves on to Luke on the Monday after
    // the Sunday after the Elevation, whatever is left of Matthew.
    Y.lukanJump = 49 + 1 + 7 * 17 - (Y.sunAfterElevation + 1);
    Y.firstSunLuke = Y.sunAfterElevation + 7;
    Y.extraSundays = Math.floor((Y.nextPascha - 84 - (Y.pascha + Y.sunAfterTheophany)) / 7);

    // Sunday Gospels left unread, kept for the Sundays after Theophany.
    Y.reserves = [];
    if (Y.extraSundays) {
      var firstLuke = 49 + 7 * 18, thirteenthLuke = firstLuke + 7 * 13, i;
      for (i = Y.forefathers + Y.lukanJump + 7; i <= thirteenthLuke; i += 7) Y.reserves.push(i);
      var remainder = Y.extraSundays - Y.reserves.length;
      if (remainder) for (i = firstLuke - remainder * 7; i < firstLuke - 6; i += 7) Y.reserves.push(i);
    }

    Y.noDaily = {};
    [Y.sunBeforeTheophany, Y.sunAfterTheophany, Y.theophany - 5, Y.theophany - 1, Y.theophany,
      Y.forefathers, Y.sunBeforeNativity, Y.nativity - 1, Y.nativity, Y.nativity + 1,
      Y.sunAfterNativity].forEach(function (x) { Y.noDaily[x] = true; });
    if (Y.satAfterTheophany === Y.theophany + 1) Y.noDaily[Y.satAfterTheophany] = true;
    if (wd(Y.annunciation) === 6) Y.noDaily[Y.annunciation] = true;

    // Weekday feasts in Lent have their Vespers readings on the eve.
    Y.paremias = {};
    [[2, 24], [2, 27], [3, 9], [3, 31], [4, 7], [4, 23], [4, 25], [4, 30]].forEach(function (md) {
      var q = dp(md[0], md[1], year);
      if (q > -44 && q < -7 && wd(q) > 1) { Y.paremias[q] = false; Y.paremias[q - 1] = true; }
    });

    var f = Y.floats = {};
    f[Y.fathersSix] = F.FathersSix;
    f[Y.fathersSeven] = F.FathersSeventh;
    f[Y.demetriusSaturday] = F.DemetriusSaturday;
    f[Y.synaxisUnmercenaries] = F.SynaxisUnmercenaries;
    f[Y.sunBeforeElevation] = F.SunBeforeElevation;
    f[Y.satAfterElevation] = F.SatAfterElevation;
    f[Y.sunAfterElevation] = F.SunAfterElevation;
    f[Y.forefathers] = F.SunForefathers;
    f[Y.satAfterTheophany] = F.SatAfterTheophany;
    f[Y.sunAfterTheophany] = F.SunAfterTheophany;
    f[Y.newMartyrsRussia] = F.NewMartyrsRussia;
    var leavetaking = Y.theophany + 8;
    if (wd(leavetaking) !== 6 && wd(leavetaking) !== 0) f[leavetaking] = F.LeavetakingTheophanyWeekday;
    if (Y.satBeforeElevation === Y.nativityTheotokos) f[Y.elevation - 1] = F.SatBeforeElevationMoved;
    else f[Y.satBeforeElevation] = F.SatBeforeElevation;

    var eve = Y.nativity - 1;
    if (eve === Y.satBeforeNativity) {
      f[Y.nativity - 2] = F.RoyalHoursNativityFriday;
      f[Y.sunBeforeNativity] = F.SunBeforeNativity;
      f[eve] = F.SatBeforeNativityEve;
    } else if (eve === Y.sunBeforeNativity) {
      f[Y.nativity - 3] = F.RoyalHoursNativityFriday;
      f[Y.satBeforeNativity] = F.SatBeforeNativity;
      f[eve] = F.SunBeforeNativityEve;
    } else {
      f[eve] = F.EveNativity;
      f[Y.satBeforeNativity] = F.SatBeforeNativity;
      f[Y.sunBeforeNativity] = F.SunBeforeNativity;
    }

    switch (wd(Y.nativity)) {
      case 0:
        f[Y.satAfterNativity] = F.SatAfterNativityBeforeTheophany;
        f[Y.nativity + 1] = F.SunAfterNativityMonday;
        f[Y.sunBeforeTheophany] = F.SunBeforeTheophany;
        f[Y.theophany - 1] = F.TheophanyEve;
        break;
      case 1:
        f[Y.satAfterNativity] = F.SatAfterNativityBeforeTheophany;
        f[Y.sunAfterNativity] = F.SunAfterNativity;
        f[Y.theophany - 5] = F.SatBeforeTheophanyJan;
        f[Y.theophany - 1] = F.TheophanyEve;
        break;
      case 2:
        f[Y.satAfterNativity] = F.SatAfterNativity;
        f[Y.sunAfterNativity] = F.SunAfterNativity;
        f[Y.satBeforeTheophany] = F.SatBeforeTheophanyEve;
        f[Y.theophany - 5] = F.SatBeforeTheophanyJan;
        f[Y.theophany - 2] = F.RoyalHoursTheophanyFriday;
        break;
      case 3:
        f[Y.satAfterNativity] = F.SatAfterNativity;
        f[Y.sunAfterNativity] = F.SunAfterNativity;
        f[Y.satBeforeTheophany] = F.SatBeforeTheophany;
        f[Y.sunBeforeTheophany] = F.SunBeforeTheophanyEve;
        f[Y.theophany - 3] = F.RoyalHoursTheophanyFriday;
        break;
      case 4: case 5:
        f[Y.satAfterNativity] = F.SatAfterNativity;
        f[Y.sunAfterNativity] = F.SunAfterNativity;
        f[Y.satBeforeTheophany] = F.SatBeforeTheophany;
        f[Y.sunBeforeTheophany] = F.SunBeforeTheophany;
        f[Y.theophany - 1] = F.TheophanyEve;
        break;
      case 6:
        f[Y.nativity + 6] = F.SatAfterNativityFriday;
        f[Y.sunAfterNativity] = F.SunAfterNativity;
        f[Y.satBeforeTheophany] = F.SatBeforeTheophany;
        f[Y.sunBeforeTheophany] = F.SunBeforeTheophany;
        f[Y.theophany - 1] = F.TheophanyEve;
        break;
    }

    switch (wd(Y.annunciation)) {
      case 6: f[Y.annunciation - 1] = F.AnnunciationParemFriday; f[Y.annunciation] = F.AnnunciationSat; break;
      case 0: f[Y.annunciation] = F.AnnunciationSun; break;
      case 1: f[Y.annunciation] = F.AnnunciationMon; break;
      default: f[Y.annunciation - 1] = F.AnnunciationParemEve; f[Y.annunciation] = F.AnnunciationWeekday;
    }
    return Y;
  }

  function rows(table, key) { return table[String(key)] || []; }

  // The Epistle and Gospel that characterise the day, out of one group.
  function firstPair(list) {
    var e = -1, g = -1, i;
    for (i = 0; i < list.length; i++) if (L.services[list[i].row[1]] === "Epistle") { e = i; break; }
    if (e < 0) return null;
    for (i = e; i < list.length; i++) if (L.services[list[i].row[1]] === "Gospel") { g = i; break; }
    if (g < 0) for (i = 0; i < list.length; i++) if (L.services[list[i].row[1]] === "Gospel") { g = i; break; }
    return g < 0 ? null : [list[e], list[g]];
  }

  function day(date, opts) {
    date = date || new Date();
    var julian = !!(opts && /^(old|julian)$/i.test(opts.calendar || ""));
    var jdn = jdnGregorian(date.getFullYear(), date.getMonth() + 1, date.getDate());
    var civil = gregorianFromJdn(jdn);
    var label = julian ? julianFromJdn(jdn) : civil; // the Menaion date
    var labelOf = function (j) { return julian ? julianFromJdn(j) : gregorianFromJdn(j); };

    var pyear = label.y, pdist = jdn - pascha(pyear);
    if (pdist < -77) { pyear -= 1; pdist = jdn - pascha(pyear); }
    var Y = Year(pyear, julian), weekday = mod(pdist, 7);
    var md = label.m + "-" + label.d, float = Y.floats[pdist];

    // Titles, feasts and rank from the Paschal, floating and fixed cycles.
    var dayRows = rows(L.days, pdist).concat(float ? rows(L.days, float) : [], rows(L.days, md));
    var titles = [], feasts = [], feastLevel = 0, fastException = 0;
    dayRows.forEach(function (r) {
      if (r[1]) titles.push(r[1]);
      if (r[2]) feasts.push(r[2]);
      feastLevel = Math.max(feastLevel, r[3]);
      fastException = Math.max(fastException, r[4]);
    });

    // Saints: those listed under the day first, then the added ones. On the
    // Old Calendar, modern commemorations stay on their civil date.
    var listed = [], added = [];
    [String(pdist), float && String(float), md].forEach(function (key) {
      if (!key) return;
      rows(L.saints, key).forEach(function (s) {
        if (julian && s[3]) return;
        if (s[2] === 0) listed.push(s); else if (s[2] === 1) added.push(s);
      });
    });
    var byDay = function (a, b) { return a[0] - b[0] || a[1] - b[1]; };
    listed.sort(byDay); added.sort(byDay);
    if (julian) {
      added = added.concat(rows(L.saints, civil.m + "-" + civil.d).filter(function (s) { return s[3]; })
        .sort(function (a, b) { return a[1] - b[1]; }));
    }
    var shown = listed.concat(added), saints = shown.map(function (s) { return s[4]; });
    var topSaints = shown.map(function (s, i) { return [s[5], i, s[4]]; })
      .sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; }).slice(0, 3)
      .map(function (s) { return s[2]; });

    // Which day of the Paschal cycle the Epistle and Gospel are taken from.
    var daily = !Y.noDaily[pdist];
    var epistle = null, gospel = null;
    if (daily) {
      if (pdist === 49 + 29 * 7) epistle = Y.forefathers;
      else if (pdist >= 49 + 32 * 7) epistle = jdn - Y.nextPascha;
      else epistle = pdist;

      var reserve;
      if (weekday === 0 && pdist > Y.sunAfterTheophany && Y.extraSundays > 1) {
        var i = (pdist - Y.sunAfterTheophany) / 7;
        if (i - 1 >= 0 && i - 1 < Y.reserves.length) reserve = Y.reserves[i - 1];
      }
      if (pdist === Y.firstSunLuke + 70) gospel = Y.forefathers + Y.lukanJump;
      else if (reserve !== undefined) gospel = reserve;
      else if (pdist > Y.satBeforeTheophany) gospel = jdn - Y.nextPascha;
      else if (pdist > Y.sunAfterElevation) gospel = pdist + Y.lukanJump;
      else gospel = pdist;
    }

    var noMemorial = (pdist === -36 || pdist === -29 || pdist === -22) && label.m === 3 &&
      [9, 24, 25, 26].indexOf(label.d) >= 0;
    var matinsGospel = weekday !== 0 || (!(pdist > -8 && pdist < 50) && feastLevel >= 7);
    var eothinon = null;
    if (weekday === 0 && !(pdist > -8 && pdist < 50) && feastLevel < 7) {
      var preceding = pdist >= 0 ? pdist : jdn - Y.previousPascha;
      eothinon = mod(Math.floor((preceding - 49) / 7) - 1, 11) + 1;
    }
    var tone = 0;
    if (pdist >= 0 && pdist < 7) tone = [1, 2, 3, 4, 5, 6, 8][pdist];
    else if (!(pdist > -9 && pdist < 0)) {
      tone = mod(Math.floor((pdist >= 0 ? pdist : jdn - Y.previousPascha) / 7) - 1, 8) + 1;
    }

    var all = [], brief = [];
    function add(list, row, group) {
      list.push({ row: row, group: group });
    }
    function cycle(list, abbreviated) {
      var src = function (r) { return L.services[r[1]]; };
      rows(L.readings, pdist).forEach(function (r) {
        if (src(r) !== "Gospel" && src(r) !== "Epistle") add(list, r, "ordinary");
      });
      if (gospel !== null) rows(L.readings, gospel).forEach(function (r) {
        if (src(r) === "Gospel" && !(noMemorial && r[2] === "Departed")) add(list, r, "ordinary");
      });
      if (epistle !== null) rows(L.readings, epistle).forEach(function (r) {
        if (src(r) === "Epistle" && !(noMemorial && r[2] === "Departed")) add(list, r, "ordinary");
      });
      if (float) rows(L.readings, float).forEach(function (r) {
        if (!abbreviated || src(r) === "Epistle" || src(r) === "Gospel") add(list, r, "float");
      });
      var noTheotokos = label.m === 3 && label.d === 26 && [1, 2, 4].indexOf(weekday) >= 0;
      if (abbreviated) {
        if (feastLevel >= 2 && fastException !== 10) rows(L.readings, md).forEach(function (r) {
          if ((src(r) === "Epistle" || src(r) === "Gospel") && !(noTheotokos && r[2] === "Theotokos")) {
            add(list, r, "proper");
          }
        });
        return;
      }
      if (eothinon) rows(L.readings, 700 + eothinon).forEach(function (r) { add(list, r, "ordinary"); });
      if (Y.paremias[pdist] === true) {
        var next = labelOf(jdn + 1);
        rows(L.readings, next.m + "-" + next.d).forEach(function (r) {
          if (src(r) === "Vespers") add(list, r, "proper");
        });
      }
      rows(L.readings, md).forEach(function (r) {
        if (!matinsGospel && src(r) === "Matins Gospel") return;
        if (Y.paremias[pdist] === false && src(r) === "Vespers") return;
        if (noTheotokos && r[2] === "Theotokos") return;
        add(list, r, "proper");
      });
    }
    function sorted(list) {
      var seen = {};
      return list.filter(function (x) { return seen[x.row[0]] ? false : (seen[x.row[0]] = true); })
        .sort(function (a, b) { return a.row[4] - b.row[4] || a.row[0] - b.row[0]; });
    }

    cycle(all, false);
    all = sorted(all);
    var ordered = [];
    all.forEach(function (x) {
      if (pdist > -42 && pdist < -7 && feastLevel < 7 && L.services[x.row[1]] === "Matins Gospel") ordered.unshift(x);
      else ordered.push(x);
    });

    cycle(brief, true);
    brief = sorted(brief);
    var groupOf = function (g) { return brief.filter(function (x) { return x.group === g; }); };
    var preferPropers = feastLevel >= 3 && weekday !== 0;
    var groups = [groupOf("float")].concat(preferPropers ? [groupOf("proper"), groupOf("ordinary")]
      : [groupOf("ordinary"), groupOf("proper")]);
    var pair = null;
    for (var gi = 0; gi < groups.length && !pair; gi++) pair = firstPair(groups[gi]);
    if (!pair) pair = firstPair(brief);

    var readings = ordered.map(function (x) {
      var p = L.pericopes[x.row[3]];
      return { service: L.services[x.row[1]], desc: x.row[2], display: p[0], refs: p[1] };
    });
    var main = [];
    if (pair) pair.forEach(function (x) {
      var idx = -1;
      ordered.forEach(function (o, k) { if (idx < 0 && o.row[0] === x.row[0]) idx = k; });
      if (idx < 0) idx = readings.map(function (r) { return r.display; }).indexOf(L.pericopes[x.row[3]][0]);
      if (idx >= 0) main.push(idx);
    });

    var summary = "";
    if ((weekday === 0 || (pdist > -9 && pdist < 7)) && titles.length) summary = titles.join("; ");
    else if (feasts.length) summary = feasts.join("; ");
    else if (saints.length) summary = topSaints.join("; ");
    else summary = titles.join("; ");

    return {
      date: { y: civil.y, m: civil.m, d: civil.d },
      calendar: julian ? "old" : "new",
      menaion: { y: label.y, m: label.m, d: label.d },
      weekday: WEEKDAYS[weekday],
      pdist: pdist,
      pascha: (function () { var g = gregorianFromJdn(Y.pascha); return { y: g.y, m: g.m, d: g.d }; })(),
      tone: tone,
      titles: titles,
      feasts: feasts,
      feastLevel: feastLevel,
      summary: summary,
      saints: saints,
      readings: readings,
      main: main
    };
  }

  // Gregorian date of Pascha for a year, e.g. SGO_LECTIONARY.pascha(2027).
  L.pascha = function (year) {
    var g = gregorianFromJdn(pascha(year));
    return new Date(g.y, g.m - 1, g.d);
  };
  L.day = day;
  L.year = Year; // the liturgical year starting at Zacchaeus Sunday before this Pascha
})();
