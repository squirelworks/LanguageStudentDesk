package com.squirelworks.lsd.bible

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

internal data class BiblePalette(
    val bg: Color,
    val paper: Color,
    val ink: Color,
    val muted: Color,
    val line: Color,
    val accent: Color,
    val accentSoft: Color,
    val gold: Color,
    val highlights: Map<String, Color>,
)

private val bar = Color(0xFF6B1F2E)

internal val lightBiblePalette = BiblePalette(
    bg = Color(0xFFFAF6EE),
    paper = Color.White,
    ink = Color(0xFF1D1A17),
    muted = Color(0xFF625A52),
    line = Color(0xFFDDD3C3),
    accent = Color(0xFF6B1F2E),
    accentSoft = Color(0xFFF4E6E3),
    gold = Color(0xFFA87B16),
    highlights = mapOf(
        "gold" to Color(0xFFF8E7A6),
        "green" to Color(0xFFD3ECD0),
        "blue" to Color(0xFFD4E3F7),
        "rose" to Color(0xFFF6D6DC),
    ),
)

internal val darkBiblePalette = BiblePalette(
    bg = Color(0xFF17130F),
    paper = Color(0xFF221D18),
    ink = Color(0xFFECE4D8),
    muted = Color(0xFFA99F92),
    line = Color(0xFF3B332B),
    accent = Color(0xFFC0596B),
    accentSoft = Color(0xFF3A2328),
    gold = Color(0xFFD4A73A),
    highlights = mapOf(
        "gold" to Color(0xFF4F4214),
        "green" to Color(0xFF22401F),
        "blue" to Color(0xFF1F3350),
        "rose" to Color(0xFF4A2129),
    ),
)

internal val LocalBiblePalette = staticCompositionLocalOf { lightBiblePalette }

internal fun bibleColors(dark: Boolean) = if (dark) {
    darkColorScheme(
        primary = darkBiblePalette.accent,
        onPrimary = Color.White,
        background = darkBiblePalette.bg,
        onBackground = darkBiblePalette.ink,
        surface = darkBiblePalette.paper,
        onSurface = darkBiblePalette.ink,
        surfaceVariant = darkBiblePalette.accentSoft,
    )
} else {
    lightColorScheme(
        primary = lightBiblePalette.accent,
        onPrimary = Color.White,
        background = lightBiblePalette.bg,
        onBackground = lightBiblePalette.ink,
        surface = lightBiblePalette.paper,
        onSurface = lightBiblePalette.ink,
        surfaceVariant = lightBiblePalette.accentSoft,
    )
}

@Composable
internal fun BibleTopBar(
    title: String,
    subtitle: String = "",
    canBack: Boolean,
    titleOpensBooks: Boolean,
    onBack: () -> Unit,
    onTitle: () -> Unit,
    onApps: () -> Unit,
    readerActions: (@Composable RowScope.() -> Unit)? = null,
) {
    Row(
        Modifier.fillMaxWidth().background(bar).padding(horizontal = 2.dp, vertical = 2.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (canBack) {
            TextButton(onClick = onBack) { Text("‹", color = Color.White, fontSize = 22.sp) }
        }
        Column(Modifier.weight(1f).padding(horizontal = 8.dp)) {
            if (titleOpensBooks) {
                TextButton(onClick = onTitle, contentPadding = androidx.compose.foundation.layout.PaddingValues(0.dp)) {
                    Text("$title ▾", color = Color.White, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
            } else {
                Text(title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 16.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
            if (subtitle.isNotBlank() && !titleOpensBooks) {
                Text(subtitle, color = Color.White.copy(alpha = 0.85f), fontSize = 12.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
        }
        readerActions?.invoke(this)
        TextButton(onClick = onApps) { Text("▦", color = Color.White, fontSize = 18.sp) }
    }
}

@Composable
internal fun BibleToast(text: String) {
    if (text.isBlank()) return
    Text(
        text,
        color = Color.White,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFF1D1A17))
            .padding(horizontal = 14.dp, vertical = 10.dp),
    )
}

@Composable
internal fun Muted(text: String, modifier: Modifier = Modifier) {
    Text(text, color = LocalBiblePalette.current.muted, style = MaterialTheme.typography.bodyMedium, modifier = modifier)
}

@Composable
internal fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 8.dp))
}
