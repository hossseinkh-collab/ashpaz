package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.WeightRecord
import com.example.services.HealthService
import com.example.ui.theme.*

@Composable
fun HealthClinicScreen(
    modifier: Modifier = Modifier
) {
    var gender by remember { mutableStateOf("male") }
    var age by remember { mutableStateOf(30) }
    var heightCm by remember { mutableStateOf(175) }
    var weightKg by remember { mutableStateOf(78.5) }
    var activityLevel by remember { mutableStateOf("moderate") }
    var goal by remember { mutableStateOf("weight_loss") }

    var weightLogs by remember {
        mutableStateOf(
            listOf(
                WeightRecord("1", "۱۴۰۳/۰۸/۰۱", 80.0, "شروع رژیم غذایی"),
                WeightRecord("2", "۱۴۰۳/۰۸/۰۷", 79.2, "کاهش ۸۰۰ گرم"),
                WeightRecord("3", "۱۴۰۳/۰۸/۱۴", 78.5, "تداوم روند مثبت")
            )
        )
    }

    val metrics = remember(gender, age, heightCm, weightKg, activityLevel, goal) {
        HealthService.calculateMetrics(
            gender = gender,
            age = age,
            heightCm = heightCm,
            weightKg = weightKg,
            activityLevel = activityLevel,
            goal = goal
        )
    }

    val weeklyDiet = remember(metrics.targetDailyCalories) {
        HealthService.generateWeeklySpoonDiet(metrics.targetDailyCalories)
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(bottom = 90.dp)
    ) {
        // Header
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "کلینیک هوشمند تغذیه و سلامت سرآشپز 🥗",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = HerbalGreen
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "محاسبه دقیق BMI، کالری BMR، انرژی مصرفی روزانه (TDEE) و رژیم غذایی قاشقی ۳ وعده با فرهنگ غذایی اصیل ایرانی.",
                        style = MaterialTheme.typography.bodySmall,
                        color = Slate300,
                        lineHeight = 18.sp
                    )
                }
            }
        }

        // Profile Sliders Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "اطلاعات فردی و بدنی:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    // Gender toggle
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Button(
                            onClick = { gender = "male" },
                            modifier = Modifier.weight(1f).height(40.dp),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (gender == "male") Saffron500 else Slate800,
                                contentColor = if (gender == "male") Slate950 else Slate200
                            )
                        ) {
                            Text("آقا 👨", style = MaterialTheme.typography.bodySmall)
                        }

                        Button(
                            onClick = { gender = "female" },
                            modifier = Modifier.weight(1f).height(40.dp),
                            shape = RoundedCornerShape(10.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (gender == "female") Saffron500 else Slate800,
                                contentColor = if (gender == "female") Slate950 else Slate200
                            )
                        ) {
                            Text("خانم 👩", style = MaterialTheme.typography.bodySmall)
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // Height & Weight Sliders
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "قد شما:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                        Text(text = "$heightCm سانتی‌متر", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                    }
                    Slider(
                        value = heightCm.toFloat(),
                        onValueChange = { heightCm = it.toInt() },
                        valueRange = 140f..210f,
                        steps = 70,
                        colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = "وزن فعلی:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                        Text(text = "$weightKg کیلوگرم", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                    }
                    Slider(
                        value = weightKg.toFloat(),
                        onValueChange = { weightKg = (it * 10).toInt() / 10.0 },
                        valueRange = 40f..140f,
                        steps = 100,
                        colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                    )

                    // Goal selector
                    Text(text = "هدف شما:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                    Spacer(modifier = Modifier.height(4.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        listOf(
                            Pair("weight_loss", "کاهش وزن"),
                            Pair("maintenance", "تثبیت وزن"),
                            Pair("muscle_gain", "افزایش وزن")
                        ).forEach { (g, title) ->
                            val isSel = goal == g
                            Button(
                                onClick = { goal = g },
                                modifier = Modifier.weight(1f).height(36.dp),
                                shape = RoundedCornerShape(8.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (isSel) HerbalGreen else Slate800,
                                    contentColor = if (isSel) Slate950 else Slate200
                                ),
                                contentPadding = PaddingValues(0.dp)
                            ) {
                                Text(text = title, style = MaterialTheme.typography.labelSmall)
                            }
                        }
                    }
                }
            }
        }

        // Metrics Result Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(text = "شاخص توده بدنی (BMI):", style = MaterialTheme.typography.bodySmall, color = Slate400)
                            Text(
                                text = "${metrics.bmi}",
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.Bold,
                                color = Color(metrics.bmiColorHex)
                            )
                        }

                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(metrics.bmiColorHex).copy(alpha = 0.2f)
                        ) {
                            Text(
                                text = metrics.bmiCategoryFa,
                                style = MaterialTheme.typography.labelMedium,
                                fontWeight = FontWeight.Bold,
                                color = Color(metrics.bmiColorHex),
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        HealthStatItem("متابولیسم پایه (BMR)", "${metrics.bmrCalories}", "kcal", Modifier.weight(1f))
                        HealthStatItem("مصرف روزانه (TDEE)", "${metrics.tdeeCalories}", "kcal", Modifier.weight(1f))
                        HealthStatItem("کالری مجاز هدف", "${metrics.targetDailyCalories}", "kcal", Modifier.weight(1f))
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        HealthStatItem("پروتئین هدف", "${metrics.targetProteinGrams}", "گرم", Modifier.weight(1f))
                        HealthStatItem("کربوهیدرات", "${metrics.targetCarbsGrams}", "گرم", Modifier.weight(1f))
                        HealthStatItem("چربی مفید", "${metrics.targetFatGrams}", "گرم", Modifier.weight(1f))
                    }
                }
            }
        }

        // Spoon-based Personalized Diet Plan
        item {
            Text(
                text = "رژیم غذایی ۳ وعده بر حسب قاشق (شنبه تا جمعه):",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }

        items(weeklyDiet) { dayPlan ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = dayPlan.dayTitleFa,
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = Saffron400
                        )
                        Text(
                            text = "مجموع: ${dayPlan.totalCalories} کیلوکالری",
                            style = MaterialTheme.typography.labelSmall,
                            color = HerbalGreen
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    MealPortionRow("صبحانه", dayPlan.breakfast.dishTitle, dayPlan.breakfast.portionSpoonsFa, dayPlan.breakfast.calories)
                    MealPortionRow("ناهار", dayPlan.lunch.dishTitle, dayPlan.lunch.portionSpoonsFa, dayPlan.lunch.calories)
                    MealPortionRow("شام", dayPlan.dinner.dishTitle, dayPlan.dinner.portionSpoonsFa, dayPlan.dinner.calories)
                }
            }
        }
    }
}

@Composable
fun HealthStatItem(title: String, value: String, unit: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(containerColor = Slate800)
    ) {
        Column(
            modifier = Modifier.padding(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = title, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 9.sp)
            Text(text = value, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = Saffron400)
            Text(text = unit, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 8.sp)
        }
    }
}

@Composable
fun MealPortionRow(meal: String, title: String, portion: String, calories: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.Top
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(text = "$meal: $title", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = Color.White)
            Text(text = portion, style = MaterialTheme.typography.labelSmall, color = Slate300)
        }
        Text(text = "$calories kcal", style = MaterialTheme.typography.labelSmall, color = Saffron400)
    }
}
