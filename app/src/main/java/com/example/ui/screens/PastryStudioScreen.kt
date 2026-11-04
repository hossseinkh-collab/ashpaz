package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Recipe
import com.example.services.CalculationEngine
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PastryStudioScreen(
    pastryRecipes: List<Recipe>,
    onRecipeClick: (Recipe) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedTab by remember { mutableStateOf(0) } // 0 = Cake Calculator, 1 = Pastry Recipes

    // Cake Calculator State
    var cakeType by remember { mutableStateOf("sponge") }
    var calcMode by remember { mutableStateOf("by_weight") }
    var targetWeightKg by remember { mutableStateOf(1.5) }
    var servingsCount by remember { mutableStateOf(12) }
    var panShape by remember { mutableStateOf("round") }
    var panDiameterCm by remember { mutableStateOf(22) }
    var frostingLevel by remember { mutableStateOf("medium") }

    val cakeResult = remember(cakeType, calcMode, targetWeightKg, servingsCount, panShape, panDiameterCm, frostingLevel) {
        CalculationEngine.calculateCake(
            cakeType = cakeType,
            mode = calcMode,
            targetWeightKg = targetWeightKg,
            servings = servingsCount,
            panShape = panShape,
            panDiameterCm = panDiameterCm,
            frostingLevel = frostingLevel
        )
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
    ) {
        // Tab switcher
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = Slate900,
            contentColor = Saffron400
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text("محاسبه‌گر قالب و وزن کیک", style = MaterialTheme.typography.titleSmall) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("شیرینی‌های اصیل قنادی", style = MaterialTheme.typography.titleSmall) }
            )
        }

        if (selectedTab == 0) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp),
                contentPadding = PaddingValues(bottom = 90.dp)
            ) {
                // Header info
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate900)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(
                                text = "محاسبه‌گر حرفه‌ای کیک و درصد قنادان 🎂",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = Saffron400
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "محاسبه دقیق مقدار آرد، شکر، تخم‌مرغ و فیلینگ خامه بر اساس فرمول‌های استاندارد قنادی و ابعاد قالب فر.",
                                style = MaterialTheme.typography.bodySmall,
                                color = Slate300,
                                lineHeight = 18.sp
                            )
                        }
                    }
                }

                // Mode Selection
                item {
                    Text(
                        text = "مبنای محاسبه:",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf(
                            Triple("by_weight", "بر اساس وزن کیک", Icons.Default.Scale),
                            Triple("by_servings", "بر اساس تعداد مهمان", Icons.Default.People),
                            Triple("by_pan_size", "بر اساس اندازه قالب", Icons.Default.SquareFoot)
                        ).forEach { (mode, title, _) ->
                            val isSel = calcMode == mode
                            Button(
                                onClick = { calcMode = mode },
                                modifier = Modifier.weight(1f).height(44.dp),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (isSel) Saffron500 else Slate800,
                                    contentColor = if (isSel) Slate950 else Slate200
                                ),
                                contentPadding = PaddingValues(horizontal = 4.dp)
                            ) {
                                Text(text = title, style = MaterialTheme.typography.labelSmall, fontSize = 10.sp)
                            }
                        }
                    }
                }

                // Mode parameter adjuster
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate900)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            when (calcMode) {
                                "by_weight" -> {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(text = "وزن نهایی کیک با خامه:", style = MaterialTheme.typography.bodyMedium, color = Color.White)
                                        Text(text = "$targetWeightKg کیلوگرم", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                                    }
                                    Slider(
                                        value = targetWeightKg.toFloat(),
                                        onValueChange = { targetWeightKg = (it * 10).toInt() / 10.0 },
                                        valueRange = 0.5f..5.0f,
                                        steps = 44,
                                        colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                                    )
                                }
                                "by_servings" -> {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(text = "تعداد نفرات مهمان:", style = MaterialTheme.typography.bodyMedium, color = Color.White)
                                        Text(text = "$servingsCount نفر", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                                    }
                                    Slider(
                                        value = servingsCount.toFloat(),
                                        onValueChange = { servingsCount = it.toInt() },
                                        valueRange = 4f..40f,
                                        steps = 35,
                                        colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                                    )
                                }
                                "by_pan_size" -> {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(text = "قطر قالب گرد فر:", style = MaterialTheme.typography.bodyMedium, color = Color.White)
                                        Text(text = "$panDiameterCm سانتی‌متر", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                                    }
                                    Slider(
                                        value = panDiameterCm.toFloat(),
                                        onValueChange = { panDiameterCm = it.toInt() },
                                        valueRange = 15f..35f,
                                        steps = 19,
                                        colors = SliderDefaults.colors(thumbColor = Saffron400, activeTrackColor = Saffron500)
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            // Frosting level
                            Text(text = "میزان خامه و فیلینگ:", style = MaterialTheme.typography.bodySmall, color = Slate400)
                            Spacer(modifier = Modifier.height(4.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                listOf(
                                    Pair("light", "کم‌خامه (عصرانه)"),
                                    Pair("medium", "متوسط (استاندارد)"),
                                    Pair("heavy", "پرخامه (قنادی)")
                                ).forEach { (lvl, title) ->
                                    val isSel = frostingLevel == lvl
                                    Button(
                                        onClick = { frostingLevel = lvl },
                                        modifier = Modifier.weight(1f).height(36.dp),
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = if (isSel) HerbalGreen else Slate800,
                                            contentColor = if (isSel) Slate950 else Slate200
                                        ),
                                        contentPadding = PaddingValues(0.dp)
                                    ) {
                                        Text(text = title, style = MaterialTheme.typography.labelSmall, fontSize = 9.sp)
                                    }
                                }
                            }
                        }
                    }
                }

                // Output Result Card
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate900)
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "فرمولاسیون دقیق مواد اولیه:",
                                    style = MaterialTheme.typography.titleSmall,
                                    fontWeight = FontWeight.Bold,
                                    color = Saffron400
                                )
                                Surface(shape = RoundedCornerShape(8.dp), color = Slate800) {
                                    Text(
                                        text = "قالب پیشنهادی: قطر ${cakeResult.recommendedPanDiameterCm} سانت",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Saffron300,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(12.dp))

                            // Weights breakdown
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                CakeWeightCard("وزن مایه خام", "${cakeResult.rawBatterWeightGrams} گرم", Modifier.weight(1f))
                                CakeWeightCard("وزن نان اسفنجی", "${cakeResult.bakedSpongeWeightGrams} گرم", Modifier.weight(1f))
                                CakeWeightCard("وزن خامه/فیلینگ", "${cakeResult.creamFillingWeightGrams} گرم", Modifier.weight(1f))
                            }

                            Spacer(modifier = Modifier.height(14.dp))

                            // Ingredients with baker's percentage
                            cakeResult.ingredients.forEach { ing ->
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(vertical = 5.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(text = ing.name, style = MaterialTheme.typography.bodyMedium, color = Color.White)
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Surface(shape = RoundedCornerShape(6.dp), color = Slate800) {
                                            Text(
                                                text = "${ing.bakersPercentage.toInt()}%",
                                                style = MaterialTheme.typography.labelSmall,
                                                color = Saffron400,
                                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                            )
                                        }
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Text(
                                            text = if (ing.name.contains("تخم")) "${ing.amountGrams} عدد" else "${ing.amountGrams.toInt()} گرم",
                                            style = MaterialTheme.typography.titleSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Saffron400
                                        )
                                    }
                                }
                                HorizontalDivider(color = Slate800, thickness = 0.5.dp)
                            }

                            Spacer(modifier = Modifier.height(12.dp))

                            // Oven notes
                            Surface(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(10.dp),
                                color = SaffronDark.copy(alpha = 0.2f)
                            ) {
                                Column(modifier = Modifier.padding(10.dp)) {
                                    Text(
                                        text = "🔥 تنظیم فر: ۱۷۵ درجه به مدت ${cakeResult.recommendedBakeTimeMinutes} دقیقه",
                                        style = MaterialTheme.typography.bodySmall,
                                        fontWeight = FontWeight.Bold,
                                        color = Saffron300
                                    )
                                    Text(
                                        text = "در ۲۰ دقیقه ابتدایی پخت به هیچ وجه درب فر باز نشود تا پف کیک حفظ شود.",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = Slate300
                                    )
                                }
                            }
                        }
                    }
                }
            }
        } else {
            // Pastry Recipes List
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                contentPadding = PaddingValues(bottom = 90.dp)
            ) {
                items(pastryRecipes) { recipe ->
                    RecipeCard(recipe = recipe, onClick = { onRecipeClick(recipe) })
                }
            }
        }
    }
}

@Composable
fun CakeWeightCard(title: String, value: String, modifier: Modifier = Modifier) {
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
            Text(text = value, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.Bold, color = Saffron400)
        }
    }
}
