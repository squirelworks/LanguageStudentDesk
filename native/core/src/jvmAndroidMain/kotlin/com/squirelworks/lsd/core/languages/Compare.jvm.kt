package com.squirelworks.lsd.core.languages

import java.text.Collator
import java.util.Locale

actual fun compareDisplayNames(a: String, b: String): Int {
    val collator = Collator.getInstance(Locale.ENGLISH).apply { strength = Collator.PRIMARY }
    return collator.compare(a, b)
}
