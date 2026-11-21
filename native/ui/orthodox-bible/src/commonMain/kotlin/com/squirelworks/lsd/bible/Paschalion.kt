package com.squirelworks.lsd.bible

import kotlin.math.floor
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject

internal data class Ymd(val y: Int, val m: Int, val d: Int)

internal data class VerseSpan(val book: String, val startChapter: Int, val startVerse: Int, val endChapter: Int, val endVerse: Int)

internal data class AppointedReading(val service: String, val desc: String, val display: String, val refs: List<VerseSpan>)

internal data class LiturgicalDay(
    val date: Ymd,
    val calendar: String,
    val menaion: Ymd,
    val weekday: String,
    val pdist: Int,
    val pascha: Ymd,
    val tone: Int,
    val titles: List<String>,
    val feasts: List<String>,
    val feastLevel: Int,
    val summary: String,
    val saints: List<String>,
    val readings: List<AppointedReading>,
    val main: List<Int>,
)

private val weekdays = listOf("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")

private const val FATHERS_SIX = 1001
private const val FATHERS_SEVENTH = 1002
private const val DEMETRIUS_SATURDAY = 1003
private const val SYNAXIS_UNMERCENARIES = 1004
private const val SAT_BEFORE_ELEVATION_MOVED = 1005
private const val SAT_BEFORE_ELEVATION = 1006
private const val SUN_BEFORE_ELEVATION = 1007
private const val SAT_AFTER_ELEVATION = 1008
private const val SUN_AFTER_ELEVATION = 1009
private const val SUN_FOREFATHERS = 1010
private const val SAT_BEFORE_NATIVITY = 1011
private const val SUN_BEFORE_NATIVITY = 1012
private const val ROYAL_HOURS_NATIVITY_FRIDAY = 1013
private const val EVE_NATIVITY = 1014
private const val SAT_BEFORE_NATIVITY_EVE = 1015
private const val SUN_BEFORE_NATIVITY_EVE = 1016
private const val SAT_AFTER_NATIVITY_BEFORE_THEOPHANY = 1017
private const val SAT_AFTER_NATIVITY_FRIDAY = 1018
private const val SAT_AFTER_NATIVITY = 1019
private const val SUN_AFTER_NATIVITY_MONDAY = 1020
private const val SUN_AFTER_NATIVITY = 1021
private const val SAT_BEFORE_THEOPHANY = 1022
private const val SAT_BEFORE_THEOPHANY_JAN = 1023
private const val SUN_BEFORE_THEOPHANY = 1024
private const val ROYAL_HOURS_THEOPHANY_FRIDAY = 1025
private const val THEOPHANY_EVE = 1026
private const val SAT_BEFORE_THEOPHANY_EVE = 1027
private const val SUN_BEFORE_THEOPHANY_EVE = 1028
private const val SAT_AFTER_THEOPHANY = 1029
private const val SUN_AFTER_THEOPHANY = 1030
private const val NEW_MARTYRS_RUSSIA = 1031
private const val ANNUNCIATION_PAREM_FRIDAY = 1032
private const val ANNUNCIATION_SAT = 1033
private const val ANNUNCIATION_SUN = 1034
private const val ANNUNCIATION_MON = 1035
private const val ANNUNCIATION_PAREM_EVE = 1036
private const val ANNUNCIATION_WEEKDAY = 1037
private const val LEAVETAKING_THEOPHANY_WEEKDAY = 1038

private fun floorDiv(a: Int, b: Int): Int = floor(a.toDouble() / b).toInt()

private fun mod(a: Int, n: Int): Int = ((a % n) + n) % n

internal fun jdnGregorian(y: Int, m: Int, d: Int): Int {
    val a = floorDiv(14 - m, 12)
    val yy = y + 4800 - a
    val mm = m + 12 * a - 3
    return d + floorDiv(153 * mm + 2, 5) + 365 * yy + floorDiv(yy, 4) - floorDiv(yy, 100) + floorDiv(yy, 400) - 32045
}

internal fun jdnJulian(y: Int, m: Int, d: Int): Int {
    val a = floorDiv(14 - m, 12)
    val yy = y + 4800 - a
    val mm = m + 12 * a - 3
    return d + floorDiv(153 * mm + 2, 5) + 365 * yy + floorDiv(yy, 4) - 32083
}

internal fun julianFromJdn(j: Int): Ymd {
    val c = j + 32082
    val d = floorDiv(4 * c + 3, 1461)
    val e = c - floorDiv(1461 * d, 4)
    val m = floorDiv(5 * e + 2, 153)
    return Ymd(d - 4800 + floorDiv(m, 10), m + 3 - 12 * floorDiv(m, 10), e - floorDiv(153 * m + 2, 5) + 1)
}

internal fun gregorianFromJdn(j: Int): Ymd {
    val a = j + 32044
    val b = floorDiv(4 * a + 3, 146097)
    val c = a - floorDiv(146097 * b, 4)
    val d = floorDiv(4 * c + 3, 1461)
    val e = c - floorDiv(1461 * d, 4)
    val m = floorDiv(5 * e + 2, 153)
    return Ymd(100 * b + d - 4800 + floorDiv(m, 10), m + 3 - 12 * floorDiv(m, 10), e - floorDiv(153 * m + 2, 5) + 1)
}

internal fun paschaJdn(year: Int): Int {
    val a = year % 4
    val b = year % 7
    val c = year % 19
    val d = (19 * c + 15) % 30
    val e = (2 * a + 4 * b - d + 34) % 7
    return jdnJulian(year, floorDiv(d + e + 114, 31), (d + e + 114) % 31 + 1)
}

internal fun paschaGregorian(year: Int): Ymd = gregorianFromJdn(paschaJdn(year))

internal fun shiftDate(date: Ymd, days: Int): Ymd = gregorianFromJdn(jdnGregorian(date.y, date.m, date.d) + days)

internal fun Ymd.iso(): String {
    fun pad(n: Int) = if (n < 10) "0$n" else "$n"
    return "$y-${pad(m)}-${pad(d)}"
}

internal fun parseIsoDate(text: String): Ymd? {
    val match = Regex("""^(\d{4})-(\d{2})-(\d{2})$""").matchEntire(text) ?: return null
    return Ymd(match.groupValues[1].toInt(), match.groupValues[2].toInt(), match.groupValues[3].toInt())
}

internal class Lectionary(root: JsonObject) {
    val services: List<String> = root.rows("services").map { it.asString() }
    val pericopes: List<JsonArray> = root.rows("pericopes").map { it.jsonArray }
    private val days = root.obj("days")
    private val readings = root.obj("readings")
    private val saints = root.obj("saints")

    fun dayRows(key: Any?): List<JsonArray> = table(days, key)
    fun readingRows(key: Any?): List<JsonArray> = table(readings, key)
    fun saintRows(key: Any?): List<JsonArray> = table(saints, key)

    private fun table(obj: JsonObject, key: Any?): List<JsonArray> {
        if (key == null) return emptyList()
        val row = obj[key.toString()] as? JsonArray ?: return emptyList()
        return row.map { it.jsonArray }
    }
}

private fun JsonObject.rows(name: String): JsonArray = this[name] as? JsonArray ?: JsonArray(emptyList())

private fun JsonObject.obj(name: String): JsonObject = this[name] as? JsonObject ?: JsonObject(emptyMap())

private fun JsonElement.asInt(): Int = when (this) {
    is JsonPrimitive -> intOrNull ?: doubleOrNull?.toInt() ?: content.toIntOrNull() ?: 0
    else -> 0
}

private fun JsonElement.asString(): String = (this as? JsonPrimitive)?.content ?: ""

private fun JsonArray.at(index: Int): JsonElement? = getOrNull(index)

private class LitYear(val year: Int, val julian: Boolean) {
    val pascha: Int = paschaJdn(year)
    val nextPascha: Int = paschaJdn(year + 1)
    val previousPascha: Int = paschaJdn(year - 1)
    val elevation: Int
    val theophany: Int
    val annunciation: Int
    val nativity: Int
    val nativityTheotokos: Int
    val satBeforeElevation: Int
    val sunBeforeElevation: Int
    val satAfterElevation: Int
    val sunAfterElevation: Int
    val satBeforeTheophany: Int
    val sunBeforeTheophany: Int
    val satAfterTheophany: Int
    val sunAfterTheophany: Int
    val satBeforeNativity: Int
    val sunBeforeNativity: Int
    val satAfterNativity: Int
    val sunAfterNativity: Int
    val fathersSix: Int
    val fathersSeven: Int
    val demetriusSaturday: Int
    val synaxisUnmercenaries: Int
    val forefathers: Int
    val newMartyrsRussia: Int
    val lukanJump: Int
    val firstSunLuke: Int
    val extraSundays: Int
    val reserves: List<Int>
    val noDaily: Set<Int>
    val paremias: Map<Int, Boolean>
    val floats: Map<Int, Int>

    init {
        fun dp(m: Int, d: Int, y: Int): Int = (if (julian) jdnJulian(y, m, d) else jdnGregorian(y, m, d)) - pascha
        fun wd(p: Int) = mod(p, 7)
        elevation = dp(9, 14, year)
        theophany = dp(1, 6, year + 1)
        annunciation = dp(3, 25, year)
        nativity = dp(12, 25, year)
        nativityTheotokos = dp(9, 8, year)
        val e = weekends(elevation)
        val t = weekends(theophany)
        val n = weekends(nativity)
        satBeforeElevation = e[0]
        sunBeforeElevation = e[1]
        satAfterElevation = e[2]
        sunAfterElevation = e[3]
        satBeforeTheophany = t[0]
        sunBeforeTheophany = t[1]
        satAfterTheophany = t[2]
        sunAfterTheophany = t[3]
        satBeforeNativity = n[0]
        sunBeforeNativity = n[1]
        satAfterNativity = n[2]
        sunAfterNativity = n[3]
        var p = dp(7, 16, year)
        fathersSix = if (wd(p) < 4) p - wd(p) else p + 7 - wd(p)
        p = dp(10, 11, year)
        fathersSeven = if (wd(p) > 0) p + 7 - wd(p) else p
        p = dp(10, 26, year)
        demetriusSaturday = p - wd(p) - 1
        p = dp(11, 1, year)
        synaxisUnmercenaries = p + 7 - wd(p)
        forefathers = nativity - 14 + (7 - wd(nativity)) % 7
        p = dp(1, 25, year + 1)
        newMartyrsRussia = if (wd(p) < 4) p - wd(p) else p - wd(p) + 7
        lukanJump = 49 + 1 + 7 * 17 - (sunAfterElevation + 1)
        firstSunLuke = sunAfterElevation + 7
        extraSundays = floorDiv(nextPascha - 84 - (pascha + sunAfterTheophany), 7)
        val built = ArrayList<Int>()
        if (extraSundays != 0) {
            val firstLuke = 49 + 7 * 18
            val thirteenthLuke = firstLuke + 7 * 13
            var i = forefathers + lukanJump + 7
            while (i <= thirteenthLuke) {
                built += i
                i += 7
            }
            val remainder = extraSundays - built.size
            if (remainder != 0) {
                i = firstLuke - remainder * 7
                while (i < firstLuke - 6) {
                    built += i
                    i += 7
                }
            }
        }
        reserves = built
        val silent = mutableSetOf(
            sunBeforeTheophany, sunAfterTheophany, theophany - 5, theophany - 1, theophany,
            forefathers, sunBeforeNativity, nativity - 1, nativity, nativity + 1, sunAfterNativity,
        )
        if (satAfterTheophany == theophany + 1) silent += satAfterTheophany
        if (wd(annunciation) == 6) silent += annunciation
        noDaily = silent
        val vespers = HashMap<Int, Boolean>()
        for (md in listOf(2 to 24, 2 to 27, 3 to 9, 3 to 31, 4 to 7, 4 to 23, 4 to 25, 4 to 30)) {
            val q = dp(md.first, md.second, year)
            if (q > -44 && q < -7 && wd(q) > 1) {
                vespers[q] = false
                vespers[q - 1] = true
            }
        }
        paremias = vespers
        val f = HashMap<Int, Int>()
        f[fathersSix] = FATHERS_SIX
        f[fathersSeven] = FATHERS_SEVENTH
        f[demetriusSaturday] = DEMETRIUS_SATURDAY
        f[synaxisUnmercenaries] = SYNAXIS_UNMERCENARIES
        f[sunBeforeElevation] = SUN_BEFORE_ELEVATION
        f[satAfterElevation] = SAT_AFTER_ELEVATION
        f[sunAfterElevation] = SUN_AFTER_ELEVATION
        f[forefathers] = SUN_FOREFATHERS
        f[satAfterTheophany] = SAT_AFTER_THEOPHANY
        f[sunAfterTheophany] = SUN_AFTER_THEOPHANY
        f[newMartyrsRussia] = NEW_MARTYRS_RUSSIA
        val leavetaking = theophany + 8
        if (wd(leavetaking) != 6 && wd(leavetaking) != 0) f[leavetaking] = LEAVETAKING_THEOPHANY_WEEKDAY
        if (satBeforeElevation == nativityTheotokos) f[elevation - 1] = SAT_BEFORE_ELEVATION_MOVED
        else f[satBeforeElevation] = SAT_BEFORE_ELEVATION
        val eve = nativity - 1
        when {
            eve == satBeforeNativity -> {
                f[nativity - 2] = ROYAL_HOURS_NATIVITY_FRIDAY
                f[sunBeforeNativity] = SUN_BEFORE_NATIVITY
                f[eve] = SAT_BEFORE_NATIVITY_EVE
            }
            eve == sunBeforeNativity -> {
                f[nativity - 3] = ROYAL_HOURS_NATIVITY_FRIDAY
                f[satBeforeNativity] = SAT_BEFORE_NATIVITY
                f[eve] = SUN_BEFORE_NATIVITY_EVE
            }
            else -> {
                f[eve] = EVE_NATIVITY
                f[satBeforeNativity] = SAT_BEFORE_NATIVITY
                f[sunBeforeNativity] = SUN_BEFORE_NATIVITY
            }
        }
        when (wd(nativity)) {
            0 -> {
                f[satAfterNativity] = SAT_AFTER_NATIVITY_BEFORE_THEOPHANY
                f[nativity + 1] = SUN_AFTER_NATIVITY_MONDAY
                f[sunBeforeTheophany] = SUN_BEFORE_THEOPHANY
                f[theophany - 1] = THEOPHANY_EVE
            }
            1 -> {
                f[satAfterNativity] = SAT_AFTER_NATIVITY_BEFORE_THEOPHANY
                f[sunAfterNativity] = SUN_AFTER_NATIVITY
                f[theophany - 5] = SAT_BEFORE_THEOPHANY_JAN
                f[theophany - 1] = THEOPHANY_EVE
            }
            2 -> {
                f[satAfterNativity] = SAT_AFTER_NATIVITY
                f[sunAfterNativity] = SUN_AFTER_NATIVITY
                f[satBeforeTheophany] = SAT_BEFORE_THEOPHANY_EVE
                f[theophany - 5] = SAT_BEFORE_THEOPHANY_JAN
                f[theophany - 2] = ROYAL_HOURS_THEOPHANY_FRIDAY
            }
            3 -> {
                f[satAfterNativity] = SAT_AFTER_NATIVITY
                f[sunAfterNativity] = SUN_AFTER_NATIVITY
                f[satBeforeTheophany] = SAT_BEFORE_THEOPHANY
                f[sunBeforeTheophany] = SUN_BEFORE_THEOPHANY_EVE
                f[theophany - 3] = ROYAL_HOURS_THEOPHANY_FRIDAY
            }
            4, 5 -> {
                f[satAfterNativity] = SAT_AFTER_NATIVITY
                f[sunAfterNativity] = SUN_AFTER_NATIVITY
                f[satBeforeTheophany] = SAT_BEFORE_THEOPHANY
                f[sunBeforeTheophany] = SUN_BEFORE_THEOPHANY
                f[theophany - 1] = THEOPHANY_EVE
            }
            6 -> {
                f[nativity + 6] = SAT_AFTER_NATIVITY_FRIDAY
                f[sunAfterNativity] = SUN_AFTER_NATIVITY
                f[satBeforeTheophany] = SAT_BEFORE_THEOPHANY
                f[sunBeforeTheophany] = SUN_BEFORE_THEOPHANY
                f[theophany - 1] = THEOPHANY_EVE
            }
        }
        when (wd(annunciation)) {
            6 -> {
                f[annunciation - 1] = ANNUNCIATION_PAREM_FRIDAY
                f[annunciation] = ANNUNCIATION_SAT
            }
            0 -> f[annunciation] = ANNUNCIATION_SUN
            1 -> f[annunciation] = ANNUNCIATION_MON
            else -> {
                f[annunciation - 1] = ANNUNCIATION_PAREM_EVE
                f[annunciation] = ANNUNCIATION_WEEKDAY
            }
        }
        floats = f
    }
}

private fun weekends(dist: Int): IntArray {
    val w = mod(dist, 7)
    return intArrayOf(dist - w - 1, dist - 7 + (7 - w) % 7, dist + 7 - (w + 1) % 7, dist + 7 - w)
}

private val years = HashMap<String, LitYear>()

private fun year(year: Int, julian: Boolean): LitYear {
    val key = "$year${if (julian) "j" else "g"}"
    return years.getOrPut(key) { LitYear(year, julian) }
}

private data class Placed(val row: JsonArray, val group: String)

internal fun liturgicalDay(lectionary: Lectionary, date: Ymd, calendar: String): LiturgicalDay {
    val julian = calendar.equals("old", true) || calendar.equals("julian", true)
    val jdn = jdnGregorian(date.y, date.m, date.d)
    val civil = gregorianFromJdn(jdn)
    val label = if (julian) julianFromJdn(jdn) else civil
    fun labelOf(j: Int) = if (julian) julianFromJdn(j) else gregorianFromJdn(j)
    var pyear = label.y
    var pdist = jdn - paschaJdn(pyear)
    if (pdist < -77) {
        pyear -= 1
        pdist = jdn - paschaJdn(pyear)
    }
    val lit = year(pyear, julian)
    val weekday = mod(pdist, 7)
    val md = "${label.m}-${label.d}"
    val float = lit.floats[pdist]
    val dayRows = lectionary.dayRows(pdist) + (if (float != null) lectionary.dayRows(float) else emptyList()) + lectionary.dayRows(md)
    val titles = ArrayList<String>()
    val feasts = ArrayList<String>()
    var feastLevel = 0
    var fastException = 0
    for (row in dayRows) {
        val title = row.at(1)?.asString().orEmpty()
        val feast = row.at(2)?.asString().orEmpty()
        if (title.isNotEmpty()) titles += title
        if (feast.isNotEmpty()) feasts += feast
        feastLevel = maxOf(feastLevel, row.at(3)?.asInt() ?: 0)
        fastException = maxOf(fastException, row.at(4)?.asInt() ?: 0)
    }
    val listed = ArrayList<JsonArray>()
    val added = ArrayList<JsonArray>()
    for (key in listOf(pdist.toString(), float?.toString(), md)) {
        if (key == null) continue
        for (saint in lectionary.saintRows(key)) {
            if (julian && (saint.at(3)?.asInt() ?: 0) != 0) continue
            when (saint.at(2)?.asInt()) {
                0 -> listed += saint
                1 -> added += saint
            }
        }
    }
    val byDay = compareBy<JsonArray>({ it.at(0)?.asInt() ?: 0 }, { it.at(1)?.asInt() ?: 0 })
    listed.sortWith(byDay)
    added.sortWith(byDay)
    if (julian) {
        val modern = lectionary.saintRows("${civil.m}-${civil.d}").filter { (it.at(3)?.asInt() ?: 0) != 0 }
            .sortedWith(compareBy { it.at(1)?.asInt() ?: 0 })
        added += modern
    }
    val shown = listed + added
    val saints = shown.map { it.at(4)?.asString().orEmpty() }
    val topSaints = shown.mapIndexed { index, saint -> Triple(saint.at(5)?.asInt() ?: 0, index, saint.at(4)?.asString().orEmpty()) }
        .sortedWith(compareBy({ it.first }, { it.second }))
        .take(3)
        .map { it.third }
    val daily = pdist !in lit.noDaily
    var epistle: Int? = null
    var gospel: Int? = null
    if (daily) {
        epistle = when {
            pdist == 49 + 29 * 7 -> lit.forefathers
            pdist >= 49 + 32 * 7 -> jdn - lit.nextPascha
            else -> pdist
        }
        var reserve: Int? = null
        if (weekday == 0 && pdist > lit.sunAfterTheophany && lit.extraSundays > 1) {
            val i = (pdist - lit.sunAfterTheophany) / 7
            if (i - 1 >= 0 && i - 1 < lit.reserves.size) reserve = lit.reserves[i - 1]
        }
        gospel = when {
            pdist == lit.firstSunLuke + 70 -> lit.forefathers + lit.lukanJump
            reserve != null -> reserve
            pdist > lit.satBeforeTheophany -> jdn - lit.nextPascha
            pdist > lit.sunAfterElevation -> pdist + lit.lukanJump
            else -> pdist
        }
    }
    val noMemorial = (pdist == -36 || pdist == -29 || pdist == -22) && label.m == 3 && label.d in listOf(9, 24, 25, 26)
    val matinsGospel = weekday != 0 || (!(pdist > -8 && pdist < 50) && feastLevel >= 7)
    val eothinon = if (weekday == 0 && !(pdist > -8 && pdist < 50) && feastLevel < 7) {
        val preceding = if (pdist >= 0) pdist else jdn - lit.previousPascha
        mod(floorDiv(preceding - 49, 7) - 1, 11) + 1
    } else {
        null
    }
    val tone = when {
        pdist in 0..6 -> listOf(1, 2, 3, 4, 5, 6, 8)[pdist]
        pdist > -9 && pdist < 0 -> 0
        else -> {
            val base = if (pdist >= 0) pdist else jdn - lit.previousPascha
            mod(floorDiv(base, 7) - 1, 8) + 1
        }
    }
    fun serviceName(row: JsonArray) = lectionary.services.getOrElse(row.at(1)?.asInt() ?: -1) { "" }
    fun cycle(abbreviated: Boolean): List<Placed> {
        val list = ArrayList<Placed>()
        for (row in lectionary.readingRows(pdist)) {
            val name = serviceName(row)
            if (name != "Gospel" && name != "Epistle") list += Placed(row, "ordinary")
        }
        if (gospel != null) {
            for (row in lectionary.readingRows(gospel)) {
                if (serviceName(row) == "Gospel" && !(noMemorial && row.at(2)?.asString() == "Departed")) list += Placed(row, "ordinary")
            }
        }
        if (epistle != null) {
            for (row in lectionary.readingRows(epistle)) {
                if (serviceName(row) == "Epistle" && !(noMemorial && row.at(2)?.asString() == "Departed")) list += Placed(row, "ordinary")
            }
        }
        if (float != null) {
            for (row in lectionary.readingRows(float)) {
                val name = serviceName(row)
                if (!abbreviated || name == "Epistle" || name == "Gospel") list += Placed(row, "float")
            }
        }
        val noTheotokos = label.m == 3 && label.d == 26 && weekday in listOf(1, 2, 4)
        if (abbreviated) {
            if (feastLevel >= 2 && fastException != 10) {
                for (row in lectionary.readingRows(md)) {
                    val name = serviceName(row)
                    if ((name == "Epistle" || name == "Gospel") && !(noTheotokos && row.at(2)?.asString() == "Theotokos")) {
                        list += Placed(row, "proper")
                    }
                }
            }
            return list
        }
        if (eothinon != null) {
            for (row in lectionary.readingRows(700 + eothinon)) list += Placed(row, "ordinary")
        }
        if (lit.paremias[pdist] == true) {
            val next = labelOf(jdn + 1)
            for (row in lectionary.readingRows("${next.m}-${next.d}")) {
                if (serviceName(row) == "Vespers") list += Placed(row, "proper")
            }
        }
        for (row in lectionary.readingRows(md)) {
            val name = serviceName(row)
            if (!matinsGospel && name == "Matins Gospel") continue
            if (lit.paremias[pdist] == false && name == "Vespers") continue
            if (noTheotokos && row.at(2)?.asString() == "Theotokos") continue
            list += Placed(row, "proper")
        }
        return list
    }
    fun sorted(list: List<Placed>): List<Placed> {
        val seen = HashSet<Int>()
        return list.filter { seen.add(it.row.at(0)?.asInt() ?: 0) }
            .sortedWith(compareBy({ it.row.at(4)?.asInt() ?: 0 }, { it.row.at(0)?.asInt() ?: 0 }))
    }
    val all = sorted(cycle(false)).toMutableList()
    val ordered = ArrayList<Placed>()
    for (item in all) {
        if (pdist > -42 && pdist < -7 && feastLevel < 7 && serviceName(item.row) == "Matins Gospel") ordered.add(0, item)
        else ordered += item
    }
    val brief = sorted(cycle(true))
    fun groupOf(name: String) = brief.filter { it.group == name }
    fun firstPair(list: List<Placed>): List<Placed>? {
        val epistleIndex = list.indexOfFirst { serviceName(it.row) == "Epistle" }
        if (epistleIndex < 0) return null
        var gospelIndex = -1
        for (index in epistleIndex until list.size) {
            if (serviceName(list[index].row) == "Gospel") {
                gospelIndex = index
                break
            }
        }
        if (gospelIndex < 0) gospelIndex = list.indexOfFirst { serviceName(it.row) == "Gospel" }
        if (gospelIndex < 0) return null
        return listOf(list[epistleIndex], list[gospelIndex])
    }
    val preferPropers = feastLevel >= 3 && weekday != 0
    val groups = listOf(groupOf("float")) + if (preferPropers) listOf(groupOf("proper"), groupOf("ordinary")) else listOf(groupOf("ordinary"), groupOf("proper"))
    var pair = groups.firstNotNullOfOrNull { firstPair(it) } ?: firstPair(brief)
    val readings = ordered.map { item ->
        val pericope = lectionary.pericopes.getOrNull(item.row.at(3)?.asInt() ?: -1)
        val display = pericope?.at(0)?.asString().orEmpty()
        val refs = (pericope?.at(1) as? JsonArray)?.map { span ->
            val values = span.jsonArray
            VerseSpan(
                values.at(0)?.asString().orEmpty(),
                values.at(1)?.asInt() ?: 0,
                values.at(2)?.asInt() ?: 0,
                values.at(3)?.asInt() ?: 0,
                values.at(4)?.asInt() ?: 0,
            )
        }.orEmpty()
        AppointedReading(serviceName(item.row), item.row.at(2)?.asString().orEmpty(), display, refs)
    }
    val main = ArrayList<Int>()
    pair?.forEach { chosen ->
        var index = ordered.indexOfFirst { it.row.at(0)?.asInt() == chosen.row.at(0)?.asInt() }
        if (index < 0) {
            val display = lectionary.pericopes.getOrNull(chosen.row.at(3)?.asInt() ?: -1)?.at(0)?.asString().orEmpty()
            index = readings.indexOfFirst { it.display == display }
        }
        if (index >= 0) main += index
    }
    val summary = when {
        (weekday == 0 || (pdist > -9 && pdist < 7)) && titles.isNotEmpty() -> titles.joinToString("; ")
        feasts.isNotEmpty() -> feasts.joinToString("; ")
        saints.isNotEmpty() -> topSaints.joinToString("; ")
        else -> titles.joinToString("; ")
    }
    return LiturgicalDay(
        date = civil,
        calendar = if (julian) "old" else "new",
        menaion = label,
        weekday = weekdays[weekday],
        pdist = pdist,
        pascha = gregorianFromJdn(lit.pascha),
        tone = tone,
        titles = titles,
        feasts = feasts,
        feastLevel = feastLevel,
        summary = summary,
        saints = saints,
        readings = readings,
        main = main,
    )
}

internal expect fun currentDate(): Ymd

internal expect fun nowMillis(): Long

internal val monthNames = listOf(
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
)
