package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.suite.KanaBack
import com.squirelworks.lsd.core.suite.SuiteAction
import com.squirelworks.lsd.core.suite.SuiteApp
import com.squirelworks.lsd.core.suite.suiteAction
import com.squirelworks.lsd.core.suite.kanaBack
import com.squirelworks.lsd.core.suite.SuiteLink
import com.squirelworks.lsd.core.suite.SuiteNote
import com.squirelworks.lsd.core.suite.noteGroups
import com.squirelworks.lsd.core.suite.otherApps
import com.squirelworks.lsd.core.suite.desktopReleasePage
import com.squirelworks.lsd.core.suite.releaseUrl
import com.squirelworks.lsd.core.suite.resourceList
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class SuiteTest {
    private fun app(id: String, vararg langs: String) =
        SuiteApp(id, id, langs = langs.toList(), pkg = "pkg.$id", tag = "latest", apk = "$id.apk")

    @Test
    fun backClosesTheSheetThenTheDialogThenThePreviousScreen() {
        assertEquals(KanaBack.CloseSheet, kanaBack(sheetOpen = true, dialogOpen = true, screenCount = 3))
        assertEquals(KanaBack.CloseDialog, kanaBack(sheetOpen = false, dialogOpen = true, screenCount = 2))
        assertEquals(KanaBack.PreviousScreen, kanaBack(sheetOpen = false, dialogOpen = false, screenCount = 2))
        assertEquals(KanaBack.Exit, kanaBack(sheetOpen = false, dialogOpen = false, screenCount = 1))
    }

    @Test
    fun sisterAppsForTheSameLanguageComeFirst() {
        val apps = listOf(
            app("kana", "japanese"),
            app("bopomofo", "taiwanese"),
            app("kanji", "japanese"),
            app("dictionary", "japanese"),
            app("alphabets", "korean"),
        )
        assertEquals(
            listOf("kanji", "dictionary", "bopomofo", "alphabets"),
            otherApps("kana", apps).map { it.id },
        )
    }

    @Test
    fun aReleaseUrlNeedsBothATagAndAFile() {
        val ready = SuiteApp("kana", "Kana", tag = "latest", apk = "SquirrelGoKana.apk")
        assertEquals(
            "https://github.com/squirelworks/LanguageStudentDesk/releases/latest/download/SquirrelGoKana.apk",
            releaseUrl(ready),
        )
        assertEquals(
            "https://github.com/squirelworks/LanguageStudentDesk/releases/download/v1/App.apk",
            releaseUrl(ready.copy(tag = "v1", apk = "App.apk")),
        )
        assertNull(releaseUrl(ready.copy(tag = "", apk = "")))
        assertEquals(
            "https://github.com/squirelworks/LanguageStudentDesk/releases/latest",
            desktopReleasePage(ready),
        )
        assertEquals(
            "https://github.com/squirelworks/LanguageStudentDesk/releases/tag/squirrelgo-v0.1.5",
            desktopReleasePage(ready.copy(tag = "squirrelgo-v0.1.5")),
        )
        assertNull(desktopReleasePage(ready.copy(tag = "")))
        val bopomofo = SuiteApp("bopomofo", "SquirrelGo Bopomofo", pkg = "com.squirelworks.squirrelgobopomofo")
        assertEquals(SuiteAction.None, suiteAction(bopomofo, emptySet()))
        assertEquals(SuiteAction.None, suiteAction(bopomofo, null))
        assertEquals(SuiteAction.Open, suiteAction(bopomofo, setOf(bopomofo.pkg)))
        assertEquals(SuiteAction.Get, suiteAction(ready, emptySet()))
        assertEquals(SuiteAction.Open, suiteAction(ready, null))
    }

    @Test
    fun notesFollowTheAppLanguagesAndResourcesStartWithTheGeneralList() {
        val names = mapOf("japanese" to "Japanese")
        val notes = mapOf("japanese" to listOf(SuiteNote("Particles", "wa and ga")))
        assertEquals(listOf("Japanese" to notes.getValue("japanese")), noteGroups(listOf("japanese"), names, notes))
        val resources = mapOf(
            "general" to listOf(SuiteLink("Anki", "Cards", "https://apps.ankiweb.net")),
            "japanese" to listOf(SuiteLink("Tanos", "Lists")),
        )
        assertEquals(listOf("Anki", "Tanos"), resourceList(listOf("japanese"), resources).map { it.title })
    }
}
