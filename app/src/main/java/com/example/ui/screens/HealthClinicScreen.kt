package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import androidx.compose.ui.window.Dialog
import com.example.data.FamilyMemberProfile
import com.example.data.WeightRecord
import com.example.services.DayDietPlan
import com.example.services.HealthService
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HealthClinicScreen(
    modifier: Modifier = Modifier
) {
    var selectedSubTab by remember { mutableStateOf(0) } // 0: رژیم ۳ وعده, 1: رهگیری وزن و آب, 2: سنجش BMI و بدن, 3: اعضای خانواده

    var familyMembers by remember {
        mutableStateOf(HealthService.getDefaultFamilyMembers())
    }
    var activeMemberId by remember { mutableStateOf("mem-1") }
    val activeMember = remember(familyMembers, activeMemberId) {
        familyMembers.find { it.id == activeMemberId } ?: familyMembers.first()
    }

    // Weight logs state
    var weightLogs by remember {
        mutableStateOf(
            listOf(
                WeightRecord("1", "۱۴۰۳/۰۸/۰۱", 80.5, "شروع رژیم غذایی"),
                WeightRecord("2", "۱۴۰۳/۰۸/۰۸", 79.8, "ناشتا اول صبح"),
                WeightRecord("3", "۱۴۰۳/۰۸/۱۵", 79.0, "بعد از پیاده‌روی"),
                WeightRecord("4", "۱۴۰۳/۰۸/۲۲", 78.3, "امروز ناشتا")
            )
        )
    }

    // Water tracker state (8 glasses)
    var waterGlasses by remember { mutableStateOf(5) }

    // Dialog state for new weight
    var showAddWeightDialog by remember { mutableStateOf(false) }
    var newWeightInput by remember { mutableStateOf("78.0") }
    var newWeightNote by remember { mutableStateOf("ناشتا اول صبح") }

    // Dialog state for new family member
    var showAddMemberDialog by remember { mutableStateOf(false) }
    var newMemberName by remember { mutableStateOf("") }
    var newMemberRelation by remember { mutableStateOf("دوست") }
    var newMemberWeight by remember { mutableStateOf("70") }
    var newMemberHeight by remember { mutableStateOf("170") }

    // Active member calculations
    val metrics = remember(activeMember) {
        HealthService.calculateMetrics(
            gender = activeMember.gender,
            age = activeMember.age,
            heightCm = activeMember.heightCm,
            weightKg = activeMember.weightKg,
            activityLevel = activeMember.activityLevel,
            goal = activeMember.goal
        )
    }

    var weeklyDiet by remember(metrics.targetDailyCalories) {
        mutableStateOf(HealthService.generateWeeklySpoonDiet(metrics.targetDailyCalories))
    }

    val trajectory = remember(activeMember, weightLogs) {
        val lastWeight = weightLogs.lastOrNull()?.weightKg ?: activeMember.weightKg
        HealthService.calculateTrajectory(
            currentWeight = lastWeight,
            startWeight = 80.5,
            targetWeight = activeMember.targetWeightKg,
            targetWeeks = activeMember.targetWeeks,
            daysPassed = 22
        )
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
    ) {
        // Family Member Quick Switcher Strip
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = Slate900,
            tonalElevation = 4.dp
        ) {
            Column(modifier = Modifier.padding(vertical = 8.dp)) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 2.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "پروفایل سلامت: ${activeMember.name} (${activeMember.relationFa})",
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = Saffron400
                    )
                    Text(
                        text = "وزن هدف: ${activeMember.targetWeightKg} کیلو",
                        style = MaterialTheme.typography.labelSmall,
                        color = HerbalGreen
                    )
                }

                Spacer(modifier = Modifier.height(4.dp))

                LazyRow(
                    modifier = Modifier.fillMaxWidth(),
                    contentPadding = PaddingValues(horizontal = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    items(familyMembers) { member ->
                        val isSelected = member.id == activeMemberId
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = if (isSelected) Saffron500 else Slate800,
                            modifier = Modifier.clickable { activeMemberId = member.id }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(24.dp)
                                        .clip(CircleShape)
                                        .background(if (isSelected) Slate950 else Saffron500.copy(alpha = 0.2f)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = if (member.gender == "female") Icons.Default.Face3 else Icons.Default.Person,
                                        contentDescription = null,
                                        tint = if (isSelected) Saffron400 else Slate200,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.width(6.dp))
                                Text(
                                    text = member.name,
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                                    color = if (isSelected) Slate950 else Slate200
                                )
                            }
                        }
                    }

                    item {
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Slate800,
                            modifier = Modifier.clickable { showAddMemberDialog = true }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(imageVector = Icons.Default.Add, contentDescription = null, tint = HerbalGreen, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "عضو جدید", style = MaterialTheme.typography.labelSmall, color = HerbalGreen)
                            }
                        }
                    }
                }
            }
        }

        // Sub-tabs
        TabRow(
            selectedTabIndex = selectedSubTab,
            containerColor = Slate900,
            contentColor = Saffron400
        ) {
            Tab(
                selected = selectedSubTab == 0,
                onClick = { selectedSubTab = 0 },
                text = { Text("رژیم ۳ وعده", style = MaterialTheme.typography.labelSmall) }
            )
            Tab(
                selected = selectedSubTab == 1,
                onClick = { selectedSubTab = 1 },
                text = { Text("رهگیری وزن و آب", style = MaterialTheme.typography.labelSmall) }
            )
            Tab(
                selected = selectedSubTab == 2,
                onClick = { selectedSubTab = 2 },
                text = { Text("سنجش BMI و بدن", style = MaterialTheme.typography.labelSmall) }
            )
        }

        // Content
        when (selectedSubTab) {
            0 -> {
                // Personalized Spoon Diet View
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
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
                                        Text(
                                            text = "برنامه غذایی ۳ وعده اختصاصی 🥗",
                                            style = MaterialTheme.typography.titleSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Saffron400
                                        )
                                        Text(
                                            text = "کالری مجاز روزانه: ${metrics.targetDailyCalories} کیلوکالری (کف ایمن: ${metrics.safeFloorCalories})",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = HerbalGreen
                                        )
                                    }
                                    IconButton(onClick = {
                                        weeklyDiet = HealthService.generateWeeklySpoonDiet(metrics.targetDailyCalories)
                                    }) {
                                        Icon(imageVector = Icons.Default.Refresh, contentDescription = "بازتولید رژیم", tint = Saffron400)
                                    }
                                }

                                Spacer(modifier = Modifier.height(10.dp))

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
                                        text = "مجموع: ${dayPlan.totalCalories} kcal",
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

            1 -> {
                // Weight Tracker & Water Intake View
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
                    // Trajectory Card
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
                                    Text(
                                        text = "خط سیر پیشرفت وزن 📈",
                                        style = MaterialTheme.typography.titleSmall,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                    Surface(
                                        shape = RoundedCornerShape(8.dp),
                                        color = if (trajectory.status == "ahead") HerbalGreen.copy(alpha = 0.2f) else Saffron500.copy(alpha = 0.2f)
                                    ) {
                                        Text(
                                            text = trajectory.statusFa,
                                            style = MaterialTheme.typography.labelSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = if (trajectory.status == "ahead") HerbalGreen else Saffron400,
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.height(10.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    HealthStatItem("وزن مورد انتظار", "${trajectory.expectedWeightKg}", "کیلو", Modifier.weight(1f))
                                    HealthStatItem("نرخ هفتگی ایمن", "${trajectory.weeklyRateKg}", "کیلو/هفته", Modifier.weight(1f))
                                    HealthStatItem("روزهای کل دوره", "${trajectory.targetDays}", "روز", Modifier.weight(1f))
                                }

                                Spacer(modifier = Modifier.height(12.dp))

                                // Motivation joke card
                                Surface(
                                    modifier = Modifier.fillMaxWidth(),
                                    shape = RoundedCornerShape(12.dp),
                                    color = Slate800
                                ) {
                                    Column(modifier = Modifier.padding(12.dp)) {
                                        Text(
                                            text = "💡 طنز و انگیزه رژیمی سرآشپز:",
                                            style = MaterialTheme.typography.labelSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Saffron400
                                        )
                                        Spacer(modifier = Modifier.height(4.dp))
                                        Text(
                                            text = trajectory.joke,
                                            style = MaterialTheme.typography.bodySmall,
                                            color = Slate200,
                                            lineHeight = 18.sp
                                        )
                                        Spacer(modifier = Modifier.height(4.dp))
                                        Text(
                                            text = "ضرب‌المثل: «${trajectory.proverb}»",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = Saffron300
                                        )
                                    }
                                }
                            }
                        }
                    }

                    // Water Tracker Card (8 glasses)
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
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Icon(imageVector = Icons.Default.WaterDrop, contentDescription = null, tint = Color(0xFF60A5FA), modifier = Modifier.size(22.dp))
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Text(
                                            text = "ردیاب مصرف آب روزانه",
                                            style = MaterialTheme.typography.titleSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Color.White
                                        )
                                    }
                                    Text(
                                        text = "$waterGlasses از ۸ لیوان",
                                        style = MaterialTheme.typography.labelMedium,
                                        fontWeight = FontWeight.Bold,
                                        color = Color(0xFF60A5FA)
                                    )
                                }

                                Spacer(modifier = Modifier.height(12.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    (1..8).forEach { glassIndex ->
                                        val isFilled = glassIndex <= waterGlasses
                                        IconButton(
                                            onClick = { waterGlasses = glassIndex },
                                            modifier = Modifier.size(36.dp)
                                        ) {
                                            Icon(
                                                imageVector = Icons.Default.WaterDrop,
                                                contentDescription = null,
                                                tint = if (isFilled) Color(0xFF60A5FA) else Slate700,
                                                modifier = Modifier.size(24.dp)
                                            )
                                        }
                                    }
                                }

                                Spacer(modifier = Modifier.height(8.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Button(
                                        onClick = { if (waterGlasses < 8) waterGlasses++ },
                                        modifier = Modifier.weight(1f).height(36.dp),
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB))
                                    ) {
                                        Text("+ ۱ لیوان آب", style = MaterialTheme.typography.labelSmall)
                                    }
                                    OutlinedButton(
                                        onClick = { waterGlasses = 0 },
                                        modifier = Modifier.height(36.dp),
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.outlinedButtonColors(contentColor = Slate400)
                                    ) {
                                        Text("تنظیم مجدد", style = MaterialTheme.typography.labelSmall)
                                    }
                                }
                            }
                        }
                    }

                    // Weight Logs Header & Button
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "سوابق ثبت وزن (${weightLogs.size} رکورد):",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Button(
                                onClick = { showAddWeightDialog = true },
                                shape = RoundedCornerShape(8.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = Saffron500),
                                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 4.dp)
                            ) {
                                Icon(imageVector = Icons.Default.Add, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("ثبت وزن جدید", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    items(weightLogs.reversed()) { log ->
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(12.dp),
                            colors = CardDefaults.cardColors(containerColor = Slate900)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(text = log.dateShamsi, style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Bold, color = Color.White)
                                    if (log.note.isNotEmpty()) {
                                        Text(text = log.note, style = MaterialTheme.typography.labelSmall, color = Slate400)
                                    }
                                }
                                Text(
                                    text = "${log.weightKg} کیلوگرم",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = Saffron400
                                )
                            }
                        }
                    }
                }
            }

            2 -> {
                // BMI & Body Metrics Sliders View
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
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
                                    HealthStatItem("کالری هدف", "${metrics.targetDailyCalories}", "kcal", Modifier.weight(1f))
                                }
                            }
                        }
                    }

                    // Sliders
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(16.dp),
                            colors = CardDefaults.cardColors(containerColor = Slate900)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text(
                                    text = "تنظیمات بدنی (${activeMember.name}):",
                                    style = MaterialTheme.typography.titleSmall,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )

                                Spacer(modifier = Modifier.height(10.dp))

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(text = "قد:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                                    Text(text = "${activeMember.heightCm} سانتیمتر", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                                }
                                Slider(
                                    value = activeMember.heightCm.toFloat(),
                                    onValueChange = { newH ->
                                        familyMembers = familyMembers.map {
                                            if (it.id == activeMemberId) it.copy(heightCm = newH.toInt()) else it
                                        }
                                    },
                                    valueRange = 130f..210f,
                                    steps = 80,
                                    colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                                )

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(text = "وزن فعلی:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                                    Text(text = "${activeMember.weightKg} کیلوگرم", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                                }
                                Slider(
                                    value = activeMember.weightKg.toFloat(),
                                    onValueChange = { newW ->
                                        val rounded = (newW * 10).toInt() / 10.0
                                        familyMembers = familyMembers.map {
                                            if (it.id == activeMemberId) it.copy(weightKg = rounded) else it
                                        }
                                    },
                                    valueRange = 30f..140f,
                                    steps = 110,
                                    colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                                )

                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(text = "وزن هدف:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                                    Text(text = "${activeMember.targetWeightKg} کیلوگرم", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = HerbalGreen)
                                }
                                Slider(
                                    value = activeMember.targetWeightKg.toFloat(),
                                    onValueChange = { newTW ->
                                        val rounded = (newTW * 10).toInt() / 10.0
                                        familyMembers = familyMembers.map {
                                            if (it.id == activeMemberId) it.copy(targetWeightKg = rounded) else it
                                        }
                                    },
                                    valueRange = 30f..120f,
                                    steps = 90,
                                    colors = SliderDefaults.colors(thumbColor = HerbalGreen, activeTrackColor = HerbalGreen)
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    // Add Weight Dialog
    if (showAddWeightDialog) {
        Dialog(onDismissRequest = { showAddWeightDialog = false }) {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = Slate900,
                modifier = Modifier.padding(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "ثبت رکورد وزن جدید", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Color.White)
                    Spacer(modifier = Modifier.height(10.dp))
                    OutlinedTextField(
                        value = newWeightInput,
                        onValueChange = { newWeightInput = it },
                        label = { Text("وزن به کیلوگرم (مثلاً ۷۸.۵)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newWeightNote,
                        onValueChange = { newWeightNote = it },
                        label = { Text("یادداشت (مثلاً ناشتا، بعد از تمرین)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End
                    ) {
                        TextButton(onClick = { showAddWeightDialog = false }) {
                            Text("انصراف", color = Slate400)
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(
                            onClick = {
                                val w = newWeightInput.toDoubleOrNull() ?: 78.0
                                val rec = WeightRecord(
                                    id = "log-${System.currentTimeMillis()}",
                                    dateShamsi = "۱۴۰۳/۰۸/۲۸",
                                    weightKg = w,
                                    note = newWeightNote
                                )
                                weightLogs = weightLogs + rec
                                familyMembers = familyMembers.map {
                                    if (it.id == activeMemberId) it.copy(weightKg = w) else it
                                }
                                showAddWeightDialog = false
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                        ) {
                            Text("ثبت", color = Slate950, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }

    // Add Family Member Dialog
    if (showAddMemberDialog) {
        Dialog(onDismissRequest = { showAddMemberDialog = false }) {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = Slate900,
                modifier = Modifier.padding(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "افزودن عضو جدید به خانواده", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Color.White)
                    Spacer(modifier = Modifier.height(10.dp))
                    OutlinedTextField(
                        value = newMemberName,
                        onValueChange = { newMemberName = it },
                        label = { Text("نام یا نسبت (مثلاً علی، خواهر)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newMemberWeight,
                        onValueChange = { newMemberWeight = it },
                        label = { Text("وزن فعلی (کیلوگرم)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newMemberHeight,
                        onValueChange = { newMemberHeight = it },
                        label = { Text("قد (سانتیمتر)") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(14.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End
                    ) {
                        TextButton(onClick = { showAddMemberDialog = false }) {
                            Text("انصراف", color = Slate400)
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(
                            onClick = {
                                if (newMemberName.isNotBlank()) {
                                    val w = newMemberWeight.toDoubleOrNull() ?: 70.0
                                    val h = newMemberHeight.toIntOrNull() ?: 170
                                    val newMem = FamilyMemberProfile(
                                        id = "mem-${System.currentTimeMillis()}",
                                        name = newMemberName.trim(),
                                        relationFa = newMemberRelation,
                                        gender = "male",
                                        age = 30,
                                        heightCm = h,
                                        weightKg = w,
                                        targetWeightKg = w - 4.0,
                                        activityLevel = "moderate",
                                        goal = "weight_loss",
                                        targetWeeks = 8
                                    )
                                    familyMembers = familyMembers + newMem
                                    activeMemberId = newMem.id
                                    showAddMemberDialog = false
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen)
                        ) {
                            Text("افزودن", color = Slate950, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun HealthStatItem(
    title: String,
    value: String,
    unit: String,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        color = Slate800
    ) {
        Column(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = title, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 10.sp)
            Spacer(modifier = Modifier.height(2.dp))
            Row(verticalAlignment = Alignment.Bottom) {
                Text(text = value, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = Saffron400)
                Spacer(modifier = Modifier.width(2.dp))
                Text(text = unit, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 9.sp)
            }
        }
    }
}

@Composable
fun MealPortionRow(
    mealName: String,
    dishTitle: String,
    portion: String,
    calories: Int
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        shape = RoundedCornerShape(8.dp),
        color = Slate800.copy(alpha = 0.6f)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 10.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "$mealName: $dishTitle",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Medium,
                    color = Color.White
                )
                Text(
                    text = "سهم قاشقی: $portion",
                    style = MaterialTheme.typography.labelSmall,
                    color = Saffron300
                )
            }
            Text(
                text = "$calories kcal",
                style = MaterialTheme.typography.labelSmall,
                fontWeight = FontWeight.Bold,
                color = HerbalGreen
            )
        }
    }
}
