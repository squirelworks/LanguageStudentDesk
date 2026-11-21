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
    fun favoritesLeadAndAreNotRepeated() {
        val languages = catalog.languages
        val sorted = sortDeskLanguages(languages, listOf("latin", "missing"))
        assertEquals(listOf("latin", "ancient-greek", "cantonese", "klingon"), sorted.map { it.id })
    }
}
