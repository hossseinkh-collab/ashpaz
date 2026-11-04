package com.example.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Saffron400,
    onPrimary = Slate950,
    primaryContainer = SaffronDark,
    onPrimaryContainer = Saffron300,
    secondary = HerbalGreen,
    onSecondary = Slate950,
    secondaryContainer = HerbalDark,
    onSecondaryContainer = HerbalLight,
    background = Slate950,
    onBackground = Slate100,
    surface = Slate900,
    onSurface = Slate100,
    surfaceVariant = Slate800,
    onSurfaceVariant = Slate200,
    outline = Slate700,
    error = CrimsonRed,
    onError = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = Saffron600,
    onPrimary = Color.White,
    primaryContainer = Saffron300,
    onPrimaryContainer = Slate950,
    secondary = HerbalDark,
    onSecondary = Color.White,
    secondaryContainer = HerbalLight,
    onSecondaryContainer = Slate950,
    background = Slate100,
    onBackground = Slate900,
    surface = Color.White,
    onSurface = Slate900,
    surfaceVariant = Slate200,
    onSurfaceVariant = Slate800,
    outline = Slate400,
    error = CrimsonRed,
    onError = Color.White
)

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = true, // Default to gorgeous dark Iranian chef aesthetic
    dynamicColor: Boolean = false, // Keep consistent Iranian saffron branding
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
