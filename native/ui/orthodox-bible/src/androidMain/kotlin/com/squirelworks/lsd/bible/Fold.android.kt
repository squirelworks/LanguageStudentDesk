package com.squirelworks.lsd.bible

import java.text.Normalizer

internal actual fun foldText(value: String): String {
    val folded = Normalizer.normalize(value, Normalizer.Form.NFD)
    return folded.replace(Regex("\\p{M}+"), "").lowercase()
}
