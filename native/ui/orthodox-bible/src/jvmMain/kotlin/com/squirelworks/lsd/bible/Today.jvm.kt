package com.squirelworks.lsd.bible

import java.util.Calendar

internal actual fun nowMillis(): Long = System.currentTimeMillis()

internal actual fun currentDate(): Ymd {
    val calendar = Calendar.getInstance()
    return Ymd(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, calendar.get(Calendar.DAY_OF_MONTH))
}
