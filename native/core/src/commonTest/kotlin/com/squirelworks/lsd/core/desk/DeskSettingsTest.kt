package com.squirelworks.lsd.core.desk

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class DeskSettingsTest {
    private val catalog = DeskCatalog(
        levels = listOf(
            DeskLevel("simple", "Simple"),
            DeskLevel("more", "More"),
            DeskLevel("everything", "Everything"),
        ),
        defaultLevel = "simple",
        features = listOf(
            DeskFeature("alpha", "Alpha features", level = "simple", added = "2026-11-04"),
            DeskFeature("regional", "Regional varieties", level = "more", added = "2026-11-04"),
            DeskFeature("historical", "Historical stages", level = "everything", added = "2026-11-04"),
        ),
        featured = listOf("latin", "klingon"),
        languages = listOf(
            DeskLanguage("klingon", "Klingon", "tlhIngan Hol", shipped = true),
            DeskLanguage("latin", "Latin", shipped = true),
            DeskLanguage("ancient-greek", "Ancient Greek", requires = listOf("historical")),
            DeskLanguage("cantonese", "Cantonese", requires = listOf("regional")),
        ),
        courses = emptyList(),
        learners = emptyList(),
    )
    private val rules = DeskRules(catalog)

    @Test
    fun aSimpleLevelHidesHistoricalAndRegional() {
        val settings = rules.fresh()
        assertTrue(rules.isOn(settings, "alpha"))
        assertFalse(rules.isOn(settings, "regional"))
        assertFalse(rules.isOn(settings, "historical"))
        assertFalse(rules.allows(settings, listOf("historical")))
        assertTrue(rules.allows(settings, emptyList()))
    }

    @Test
    fun moreTurnsRegionalOnAndLeavesHistoryOff() {
        val settings = rules.setLevel(rules.fresh(), "more")
        assertTrue(rules.isOn(settings, "regional"))
        assertFalse(rules.isOn(settings, "historical"))
    }

    @Test
    fun oneSwitchBecomesCustomAndAMatchingSetCollapses() {
        val more = rules.setSwitch(rules.fresh(), "regional", true)
        assertEquals("more", more.level)
        val custom = rules.setSwitch(rules.fresh(), "historical", true)
        assertEquals("custom", custom.level)
        assertTrue(rules.isOn(custom, "historical"))
        assertFalse(rules.isOn(custom, "regional"))
        val back = rules.setSwitch(custom, "historical", false)
        assertEquals("simple", back.level)
        assertTrue(back.switches.isEmpty())
    }

    @Test
    fun webViewSettingsAndStarsAreImportedOnce() {
        val current = rules.fresh()
        val first = importDeskWebView(
            """{"level":"more","noticeDismissed":true,"welcomeDone":true}""",
            """["latin","klingon"]""",
            current,
            emptySet(),
            suiteLang = "latin",
        )
        assertEquals("more", first.settings.level)
        assertEquals("latin", first.settings.suiteLang)
        assertTrue(first.settings.importedWebView)
        assertEquals(listOf("latin", "klingon"), first.favorites.toList())
        val again = importDeskWebView("""{"level":"everything"}""", """["arabic"]""", first.settings, first.favorites, "arabic")
        assertEquals("more", again.settings.level)
        assertEquals("latin", again.settings.suiteLang)
        assertEquals(listOf("latin", "klingon"), again.favorites.toList())
    }

    @Test
    fun aLearnerRoundTripUpdatesSettingsStarsAndLanguage() {
        val current = rules.fresh().copy(importedWebView = true, suiteLang = "latin")
        val read = applyDeskWebSnapshot(
            DeskWebSnapshot(
                settings = """{"level":"everything","noticeDismissed":true,"welcomeDone":true}""",
                favorites = """["klingon","latin"]""",
                lang = "",
            ),
            current,
            setOf("latin"),
        )
        assertEquals("everything", read.settings.level)
        assertTrue(read.settings.importedWebView)
        assertEquals("", read.settings.suiteLang)
        assertEquals(listOf("klingon", "latin"), read.favorites.toList())
        val missing = applyDeskWebSnapshot(DeskWebSnapshot(null, null, null), read.settings, read.favorites)
        assertEquals(read.settings, missing.settings)
        assertEquals(read.favorites, missing.favorites)
    }

    @Test
    fun theSeedPageWritesStorageThenOpensTheLearner() {
        val page = deskSeedDocument(
            rules.fresh().copy(suiteLang = "latin"),
            listOf("latin"),
            "file:///android_asset/www/grammar-learner/index.html?lang=latin",
        )
        assertTrue(page.contains("localStorage.setItem('lsd-settings'"))
        assertTrue(page.contains("localStorage.setItem('lsd-favorite-languages'"))
        assertTrue(page.contains("lsd-suite-lang"))
        assertTrue(page.contains("location.replace(\"file:///android_asset/www/grammar-learner/index.html?lang=latin\")"))
        assertFalse(page.contains("</script><script"))
    }

    @Test
    fun onlyTheSuiteMenuReturnsToTheNativeShell() {
        assertTrue(isDeskMenuUrl("file:///android_asset/www/index.html"))
        assertTrue(isDeskMenuUrl("file:///android_asset/www/index.html?x=1"))
        assertTrue(isDeskMenuUrl("file:///android_asset/www/SquirrelGo-Apps/lsd-suite/www/index.html"))
        assertTrue(isDeskMenuUrl("file:///android_asset/www/SquirrelGo-Apps/lsd-suite/index.html"))
        assertFalse(isDeskMenuUrl("file:///android_asset/www/klingon/index.html"))
        assertFalse(isDeskMenuUrl("file:///android_asset/www/SquirrelGo-Apps/squirrelgo-characters/squirrelgo-kana/www/index.html"))
        assertFalse(isDeskMenuUrl("https://example.com/android_asset/www/index.html"))
        assertTrue(isDeskMenuUrl("http://127.0.0.1:43123/index.html"))
        assertTrue(isDeskMenuUrl("http://127.0.0.1:9/SquirrelGo-Apps/lsd-suite/www/index.html"))
        assertFalse(isDeskMenuUrl("http://127.0.0.1:9/klingon/index.html"))
        assertTrue(injectDeskSync("<head><title>x</title></head>").contains("__lsdDeskSync"))
        assertTrue(injectDeskSync("<head><title>x</title></head>").contains("/desk-sync"))
        val parsed = parseDeskWebSnapshot("""{"settings":"{\"level\":\"simple\"}","favorites":"[\"latin\"]","lang":"latin"}""")
        assertEquals("latin", parsed?.lang)
        assertEquals(null, parseDeskWebSnapshot("null"))
    }

    @Test
    fun favoritesLeadAndAreNotRepeated() {
        val languages = catalog.languages
        val sorted = sortDeskLanguages(languages, listOf("latin", "missing"))
        assertEquals(listOf("latin", "ancient-greek", "cantonese", "klingon"), sorted.map { it.id })
    }
}
