package com.squirelworks.lsd.core.programming

import com.squirelworks.lsd.core.desk.DeskFeature
import com.squirelworks.lsd.core.desk.DeskLevel
import com.squirelworks.lsd.core.desk.encodeDeskSettings
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ProgrammingDeskTest {
    private val catalog = ProgrammingCatalog(
        groups = listOf(
            ProgrammingGroup("modern", "Modern and popular", "Current languages in wide use today."),
            ProgrammingGroup("older", "Older and legacy", "Earlier versions."),
            ProgrammingGroup("joke", "Joke and esoteric", "Languages made for fun."),
            ProgrammingGroup("tracks", "Cross-language tracks", "Advanced topics."),
        ),
        courses = listOf(
            ProgrammingCourse("python", "Python", "1991", "A friendly language.", "modern", listOf("Scripting")),
            ProgrammingCourse("cobol", "COBOL", "1959", "Records and money.", "older", listOf("Compiled programs")),
            ProgrammingCourse("intercal", "INTERCAL", "1972", "Politeness is mandatory.", "joke"),
            ProgrammingCourse("bash", "Bash", "1989", "The terminal.", "modern", listOf("Scripting")),
        ),
        levels = listOf(DeskLevel("simple", "Simple"), DeskLevel("everything", "Everything")),
        defaultLevel = "simple",
        features = listOf(
            DeskFeature("programming-older", "Older programming languages", level = "simple"),
            DeskFeature("programming-joke", "Joke programming languages", level = "simple"),
        ),
    )
    private val rules = programmingRules(catalog)

    @Test
    fun sectionsStayInGroupOrderAndAzIsOneList() {
        val sections = arrangeProgramming(catalog, ProgrammingLayout(), showOlder = true, showJoke = true)
        assertEquals(listOf("modern", "older", "joke"), sections.map { it.id })
        assertEquals(listOf("Bash", "Python"), sections.first().items.map { it.name })
        val az = arrangeProgramming(catalog, ProgrammingLayout(view = "az"), showOlder = true, showJoke = true)
        assertEquals(listOf("az"), az.map { it.id })
        assertEquals(listOf("Bash", "COBOL", "INTERCAL", "Python"), az.single().items.map { it.name })
    }

    @Test
    fun aTagAndAHiddenGroupDropCourses() {
        val scripting = arrangeProgramming(catalog, ProgrammingLayout(tag = "Scripting"), showOlder = false, showJoke = true)
        assertEquals(listOf("Bash", "Python"), scripting.flatMap { it.items }.map { it.name })
        assertEquals(listOf("Compiled programs", "Scripting"), programmingTags(catalog.courses))
    }

    @Test
    fun aKnownCourseOpensAndAnUnknownIdStaysOnTheMenu() {
        assertEquals("python", programmingCourse(catalog, " Python ")?.id)
        assertNull(programmingCourse(catalog, "nope"))
        assertTrue(isProgrammingMenuUrl("file:///android_asset/www/SquirrelGo-Apps/programming-student-desk/www/index.html"))
        assertFalse(isProgrammingMenuUrl("file:///android_asset/www/programming-learner/index.html"))
    }

    @Test
    fun theOldWebViewStateIsImportedOnceAndAMissingCategoryReturnsToAll() {
        val fresh = rules.fresh()
        val hidden = rules.setSwitch(fresh, PROGRAMMING_JOKE, false)
        val tags = listOf("Scripting")
        val imported = importProgrammingWebView(
            encodeDeskSettings(hidden),
            encodeProgrammingLayout(ProgrammingLayout(view = "az", tag = "Gone")),
            fresh,
            ProgrammingLayout(),
            tags,
        )
        assertTrue(imported.settings.importedWebView)
        assertFalse(rules.isOn(imported.settings, PROGRAMMING_JOKE))
        assertEquals("az", imported.layout.view)
        assertEquals("", imported.layout.tag)
        val again = importProgrammingWebView(
            encodeDeskSettings(fresh),
            encodeProgrammingLayout(ProgrammingLayout(view = "sections", tag = "Scripting")),
            imported.settings,
            imported.layout,
            tags,
        )
        assertEquals("az", again.layout.view)
        assertEquals("", again.layout.tag)
        assertFalse(rules.isOn(again.settings, PROGRAMMING_JOKE))
        val kept = applyProgrammingSync(
            ProgrammingSync(settings = encodeDeskSettings(fresh), view = encodeProgrammingLayout(ProgrammingLayout(tag = "Scripting"))),
            again.settings,
            again.layout,
            tags,
        )
        assertTrue(kept.settings.importedWebView)
        assertEquals("Scripting", kept.layout.tag)
    }

    @Test
    fun aDeskChangeSurvivesAnUnchangedLearnerPost() {
        val opened = rules.fresh()
        val seeded = programmingSeedSnapshot(opened, ProgrammingLayout())
        val desk = rules.setSwitch(opened, PROGRAMMING_JOKE, false)
        val kept = if (programmingSyncChanged(seeded, seeded)) desk.copy(level = "simple") else desk
        assertEquals("custom", kept.level)
        assertFalse(rules.isOn(kept, PROGRAMMING_JOKE))
        val page = programmingSeedDocument(opened, ProgrammingLayout(view = "az", tag = "Scripting"), "http://127.0.0.1/programming-learner/index.html?lang=python")
        assertTrue(page.contains("lsd-programming-view-v1"))
        assertTrue(page.contains("location.replace(\"http://127.0.0.1/programming-learner/index.html?lang=python\")"))
    }
}
