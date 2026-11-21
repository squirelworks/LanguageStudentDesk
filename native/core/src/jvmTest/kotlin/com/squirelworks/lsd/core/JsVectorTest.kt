package com.squirelworks.lsd.core

import com.squirelworks.lsd.core.deinflect.Deinflect
import com.squirelworks.lsd.core.deinflect.Deinflection
import com.squirelworks.lsd.core.kana.Kana
import com.squirelworks.lsd.core.languages.lookup
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

class JsVectorTest {
    @Test
    fun kanaAndDeinflectMatchTheJavascript() {
        val vectors = load()
        for (c in vectors.romajiToHiragana) assertEquals(c.out, Kana.romajiToHiragana(c.input), c.input)
        for (c in vectors.kataToHira) assertEquals(c.out, Kana.kataToHira(c.input), c.input)
        for (c in vectors.hiraToKata) assertEquals(c.out, Kana.hiraToKata(c.input), c.input)
        for (c in vectors.toRomaji) assertEquals(c.out, Kana.toRomaji(c.input), c.input)
        for (c in vectors.isKana) assertEquals(c.out, Kana.isKana(c.input), c.input)
        for (c in vectors.hasJapanese) assertEquals(c.out, Kana.hasJapanese(c.input), c.input)
        for (c in vectors.isKanji) assertEquals(c.out, Kana.isKanji(c.input), c.input)
        for (c in vectors.deinflect) assertEquals(c.out, Deinflect.deinflect(c.input), c.input)
        for (c in vectors.lookup) {
            val got = lookup(c.input)
            assertEquals(c.kana, got.kana, c.input)
            assertEquals(c.out, got.deinflections, c.input)
        }
    }
}

@Serializable
private data class Vectors(
    val romajiToHiragana: List<StrCase>,
    val kataToHira: List<StrCase>,
    val hiraToKata: List<StrCase>,
    val toRomaji: List<StrCase>,
    val isKana: List<BoolCase>,
    val hasJapanese: List<BoolCase>,
    val isKanji: List<BoolCase>,
    val deinflect: List<DeinflectCase>,
    val lookup: List<LookupCase>,
)

@Serializable
private data class StrCase(@SerialName("in") val input: String, val out: String)

@Serializable
private data class BoolCase(@SerialName("in") val input: String, val out: Boolean)

@Serializable
private data class DeinflectCase(@SerialName("in") val input: String, val out: List<Deinflection>)

@Serializable
private data class LookupCase(
    @SerialName("in") val input: String,
    val kana: String? = null,
    val out: List<Deinflection>,
)

private val json = Json { ignoreUnknownKeys = true }

private fun load(): Vectors {
    val text = JsVectorTest::class.java.getResource("/kana-deinflect-vectors.json")!!.readText()
    return json.decodeFromString(text)
}
