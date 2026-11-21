package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.languages.CatalogLanguage
import com.squirelworks.lsd.core.languages.FavoriteLanguages
import com.squirelworks.lsd.core.languages.FileFavoriteStore
import com.squirelworks.lsd.core.languages.MemoryFavoriteStore
import com.squirelworks.lsd.core.languages.arrangeLanguages
import com.squirelworks.lsd.core.languages.compareDisplayNames
import com.squirelworks.lsd.core.languages.defaultLanguageId
import com.squirelworks.lsd.core.languages.parseLanguageCatalog
import java.nio.file.Files
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class LanguagesTest {
    private val catalog = listOf(
        CatalogLanguage("japanese", "Japanese", "日本語", "ja-JP"),
        CatalogLanguage("english", "English", "English", "en-US"),
        CatalogLanguage("arabic", "arabic", "العربية", "ar"),
        CatalogLanguage("ewe", "Éwé", "Éwé", ""),
        CatalogLanguage("zulu", "Zulu", "isiZulu", "zu"),
    )

    @Test
    fun fullListIsAzByDisplayNameAndFavoritesSitAboveIt() {
        val sections = arrangeLanguages(catalog, setOf("zulu", "english"), { it.name }, "Favorites", "All")
        assertEquals(listOf("favorites", "all"), sections.map { it.id })
        assertEquals(listOf("English", "Zulu"), sections[0].languages.map { it.name })
        assertEquals(listOf("arabic", "English", "Éwé", "Japanese", "Zulu"), sections[1].languages.map { it.name })
    }

    @Test
    fun starringDoesNotRemoveALanguageFromTheFullList() {
        val plain = arrangeLanguages(catalog, emptySet(), { it.name }, "Favorites", "All")
        val starred = arrangeLanguages(catalog, setOf("japanese"), { it.name }, "Favorites", "All")
        assertEquals(listOf("all"), plain.map { it.id })
        assertEquals(plain[0].languages.map { it.id }, starred.last().languages.map { it.id })
        assertEquals(listOf("Japanese"), starred[0].languages.map { it.name })
    }

    @Test
    fun preselectDoesNotChangeTheOrder() {
        val sorted = arrangeLanguages(catalog, emptySet(), { it.name }, "Favorites", "All").single().languages
        val before = sorted.map { it.id }
        assertEquals("japanese", defaultLanguageId(sorted, "ja-JP", "english"))
        assertEquals("english", defaultLanguageId(sorted, "en-GB", "japanese"))
        assertEquals("english", defaultLanguageId(sorted, "zz", "english"))
        assertNull(defaultLanguageId(sorted, "zz", "missing"))
        assertEquals(before, sorted.map { it.id })
    }

    @Test
    fun nativeNamesSortOnTheirOwnAndDoNotFollowTheEnglishName() {
        val sections = arrangeLanguages(catalog, emptySet(), { it.nativeName }, "お気に入り", "すべて")
        val names = sections.single().languages.map { it.nativeName }
        val again = names.sortedWith { a, b -> compareDisplayNames(a, b) }
        assertEquals(again, names)
    }

    @Test
    fun catalogJsonIgnoresExtraFieldsAndMissingSpeech() {
        val parsed = parseLanguageCatalog(
            """[{"id":"aramaic","name":"Aramaic","nativeName":"ארמית","notes":"x"}]""",
        )
        assertEquals(listOf(CatalogLanguage("aramaic", "Aramaic", "ארמית", "")), parsed)
    }

    @Test
    fun favoritesRoundTripAcrossANewStore() {
        val memory = MemoryFavoriteStore()
        val first = FavoriteLanguages(memory)
        first.toggle("japanese")
        first.toggle("arabic")
        first.toggle("japanese")
        assertEquals(setOf("arabic"), FavoriteLanguages(memory).ids())

        val dir = Files.createTempDirectory("favorites").toFile()
        val file = dir.resolve("favorite-languages.txt")
        val stored = FavoriteLanguages(FileFavoriteStore(file))
        stored.toggle("zulu")
        stored.toggle("english")
        val again = FavoriteLanguages(FileFavoriteStore(file))
        assertEquals(setOf("english", "zulu"), again.ids())
        assertTrue(file.readText().lines().filter { it.isNotEmpty() } == listOf("english", "zulu"))
    }
}
