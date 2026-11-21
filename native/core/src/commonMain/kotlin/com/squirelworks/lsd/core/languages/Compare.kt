package com.squirelworks.lsd.core.languages

// English base collation: case and accents do not change the order.
// A–Z by the display name the screen actually shows.
expect fun compareDisplayNames(a: String, b: String): Int
