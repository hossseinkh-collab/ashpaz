package com.example.ui.screens

import android.content.Context
import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Recipe
import com.example.ui.theme.*
import kotlinx.coroutines.delay

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CookingModeScreen(
    recipe: Recipe,
    servings: Int,
    onExit: () -> Unit,
    modifier: Modifier = Modifier
) {
    BackHandler { onExit() }

    val context = LocalContext.current
    var currentStepIndex by remember { mutableStateOf(0) }
    val steps = recipe.steps
    val currentStep = steps.getOrNull(currentStepIndex) ?: steps.firstOrNull()

    // Timer state for current step
    val durationSeconds = remember(currentStepIndex) {
        val mins = currentStep?.durationMinutes ?: 5
        mins * 60
    }
    var remainingSeconds by remember(currentStepIndex) { mutableStateOf(durationSeconds) }
    var isTimerRunning by remember(currentStepIndex) { mutableStateOf(false) }

    LaunchedEffect(isTimerRunning, remainingSeconds) {
        if (isTimerRunning && remainingSeconds > 0) {
            delay(1000L)
            remainingSeconds--
            if (remainingSeconds == 0) {
                isTimerRunning = false
                // Trigger tone and vibration
                try {
                    val toneGen = ToneGenerator(AudioManager.STREAM_ALARM, 100)
                    toneGen.startTone(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 1500)
                    val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        vibrator?.vibrate(VibrationEffect.createOneShot(1000, VibrationEffect.DEFAULT_AMPLITUDE))
                    } else {
                        @Suppress("DEPRECATION")
                        vibrator?.vibrate(1000)
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    val minutes = remainingSeconds / 60
    val seconds = remainingSeconds % 60
    val timeFormatted = String.format("%02d:%02d", minutes, seconds)

    Scaffold(
        modifier = modifier.fillMaxSize(),
        containerColor = Slate950,
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "حالت آشپزی زنده 👨‍🍳",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = Saffron400
                        )
                        Text(
                            text = "${recipe.title} ($servings نفره)",
                            style = MaterialTheme.typography.labelSmall,
                            color = Slate300
                        )
                    }
                },
                navigationIcon = {
                    IconButton(onClick = onExit) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "خروج از حالت پخت",
                            tint = Color.White
                        )
                    }
                },
                actions = {
                    Text(
                        text = "مرحله ${currentStepIndex + 1} از ${steps.size}",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = HerbalGreen,
                        modifier = Modifier.padding(horizontal = 16.dp)
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Slate900)
            )
        },
        bottomBar = {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                color = Slate900,
                tonalElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Previous Step
                    OutlinedButton(
                        onClick = {
                            if (currentStepIndex > 0) currentStepIndex--
                        },
                        enabled = currentStepIndex > 0,
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            contentColor = Color.White,
                            disabledContentColor = Slate600
                        )
                    ) {
                        Icon(imageVector = Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("مرحله قبل")
                    }

                    // Next Step or Finish
                    if (currentStepIndex < steps.size - 1) {
                        Button(
                            onClick = { currentStepIndex++ },
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                        ) {
                            Text("مرحله بعد", color = Slate950, fontWeight = FontWeight.Bold)
                            Spacer(modifier = Modifier.width(6.dp))
                            Icon(imageVector = Icons.AutoMirrored.Filled.ArrowBack, contentDescription = null, tint = Slate950)
                        }
                    } else {
                        Button(
                            onClick = onExit,
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen)
                        ) {
                            Icon(imageVector = Icons.Default.Check, contentDescription = null, tint = Slate950)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text("پایان پخت و نوش جان!", color = Slate950, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Step title and card
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Step Badge
                Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = Saffron500.copy(alpha = 0.15f)
                ) {
                    Text(
                        text = "گام ${currentStep?.stepNumber ?: 1}: ${currentStep?.title ?: ""}",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Saffron400,
                        modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Big instruction text for kitchen viewing
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate900)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Text(
                            text = currentStep?.instruction ?: "",
                            style = MaterialTheme.typography.titleMedium,
                            color = Color.White,
                            lineHeight = 28.sp,
                            textAlign = TextAlign.Start
                        )

                        if (!currentStep?.proTip.isNullOrEmpty()) {
                            Spacer(modifier = Modifier.height(14.dp))
                            Surface(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(12.dp),
                                color = SaffronDark.copy(alpha = 0.25f)
                            ) {
                                Row(
                                    modifier = Modifier.padding(12.dp),
                                    verticalAlignment = Alignment.Top
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Lightbulb,
                                        contentDescription = null,
                                        tint = Saffron400,
                                        modifier = Modifier.size(20.dp)
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = currentStep?.proTip ?: "",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = Saffron300,
                                        lineHeight = 20.sp
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Big Timer Section
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "تایمر صوتی مرحله پخت",
                        style = MaterialTheme.typography.labelMedium,
                        color = Slate400
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = timeFormatted,
                        style = MaterialTheme.typography.displayLarge,
                        fontSize = 54.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (remainingSeconds == 0) HerbalGreen else Saffron400
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        horizontalArrangement = Arrangement.spacedBy(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Button(
                            onClick = { isTimerRunning = !isTimerRunning },
                            shape = CircleShape,
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (isTimerRunning) CrimsonRed else Saffron500
                            ),
                            modifier = Modifier.size(56.dp),
                            contentPadding = PaddingValues(0.dp)
                        ) {
                            Icon(
                                imageVector = if (isTimerRunning) Icons.Default.Pause else Icons.Default.PlayArrow,
                                contentDescription = if (isTimerRunning) "توقف" else "شروع",
                                tint = Slate950,
                                modifier = Modifier.size(28.dp)
                            )
                        }

                        IconButton(
                            onClick = {
                                isTimerRunning = false
                                remainingSeconds = durationSeconds
                            },
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(Slate800)
                        ) {
                            Icon(
                                imageVector = Icons.Default.RestartAlt,
                                contentDescription = "تنظیم مجدد تایمر",
                                tint = Slate300
                            )
                        }
                    }
                }
            }
        }
    }
}
