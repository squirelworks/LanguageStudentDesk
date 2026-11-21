package com.squirelworks.lsd.bible

import java.text.Normalizer

internal actual fun foldText(value: String): String {
    val folded = Normalizer.normalize(value, Normalizer.Form.NFD)
    return folded.replace(Regex("\\p{M}+"), "").lowercase()
}

private val bibleLock = Any()

internal actual fun <T> bibleSync(block: () -> T): T = synchronized(bibleLock) { block() }
