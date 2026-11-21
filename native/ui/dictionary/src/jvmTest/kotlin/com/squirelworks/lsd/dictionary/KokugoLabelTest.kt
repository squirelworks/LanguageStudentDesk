package com.squirelworks.lsd.dictionary

import java.io.File
import kotlin.test.Test
import kotlin.test.assertFalse
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class KokugoLabelTest {
    @Test
    fun javascriptLabelsStayInJapanese() {
        val file = File("../../core/src/jvmTest/resources/kana-deinflect-vectors.json")
        val root = Json.parseToJsonElement(file.readText()).jsonObject
        val parts = mutableSetOf<String>()
        for (group in listOf("deinflect", "lookup")) {
            for (row in root.getValue(group).jsonArray) {
                for (hit in row.jsonObject.getValue("out").jsonArray) {
                    hit.jsonObject.getValue("label").jsonPrimitive.content
                        .split(" → ")
                        .forEach { parts += it }
                }
            }
        }
        assertFalse(parts.isEmpty())
        for (part in parts) {
            val japanese = kokugoGrammarLabel(part)
            assertFalse(japanese.any { it in 'A'..'Z' || it in 'a'..'z' }, part)
        }
    }
}
