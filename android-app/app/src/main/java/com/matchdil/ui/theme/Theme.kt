package com.matchdil.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable

private val LightColorPalette = lightColors(
    primary = Red500,
    primaryVariant = Red700,
    secondary = Grey700,
    background = White,
    surface = White,
    onPrimary = White,
    onSecondary = White,
    onBackground = Grey700,
    onSurface = Grey700
)

private val DarkColorPalette = darkColors(
    primary = Red500,
    primaryVariant = Red700,
    secondary = Grey300,
    background = Grey700,
    surface = Grey700,
    onPrimary = Grey700,
    onSecondary = Grey700,
    onBackground = White,
    onSurface = White
)

@Composable
fun MatchDilTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        DarkColorPalette
    } else {
        LightColorPalette
    }

    MaterialTheme(
        colors = colors,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}
