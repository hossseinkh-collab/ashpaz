package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.data.IngredientItem
import com.example.data.IngredientSubstitution
import com.example.data.Recipe
import com.example.services.CalculationEngine
import com.example.services.OkalaPricingService
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RecipeDetailScreen(
    recipe: Recipe,
    substitutions: List<IngredientSubstitution>,
    onBack: () -> Unit,
    onStartCookingMode: (Recipe, Int) -> Unit,
    onAddIngredientsToShoppingList: (Recipe, Int) -> Unit,
    modifier: Modifier = Modifier
) {
    BackHandler { onBack() }

    val context = LocalContext.current
    var currentServings by remember { mutableStateOf(recipe.baseServings) }
    var snackbarMessage by remember { mutableStateOf<String?>(null) }

    val (scaledIngredients, scaleFactor) = remember(recipe, currentServings) {
        CalculationEngine.scaleRecipe(recipe, currentServings)
    }

    val totalCost = remember(scaledIngredients) {
        scaledIngredients.sumOf { ing ->
            OkalaPricingService.estimatePrice(ing.name, ing.amount, ing.unit).priceToman
        }
    }

    val imageModel = remember(recipe.image) {
        if (recipe.image.startsWith("/recipes/")) {
            "file:///android_asset${recipe.image}"
        } else if (recipe.image.startsWith("http")) {
            recipe.image
        } else {
            "file:///android_asset/recipes/ghormeh-sabzi.jpg"
        }
    }

    Scaffold(
        modifier = modifier.fillMaxSize(),
        containerColor = Slate950,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = recipe.title,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.Default.ArrowForward,
                            contentDescription = "بازگشت",
                            tint = Color.White
                        )
                    }
                },
                actions = {
                    IconButton(
                        onClick = {
                            onAddIngredientsToShoppingList(recipe, currentServings)
                            snackbarMessage = "مواد اولیه به سبد خرید اضافه شدند!"
                        }
                    ) {
                        Icon(
                            imageVector = Icons.Default.AddShoppingCart,
                            contentDescription = "افزودن به سبد",
                            tint = Saffron400
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Slate900)
            )
        },
        bottomBar = {
            // Cooking Mode Action Bar
            Surface(
                modifier = Modifier.fillMaxWidth(),
                color = Slate900,
                tonalElevation = 8.dp
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Button(
                        onClick = { onStartCookingMode(recipe, currentServings) },
                        modifier = Modifier
                            .weight(1f)
                            .height(50.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PlayArrow,
                            contentDescription = null,
                            tint = Slate950
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "شروع پخت زنده (تایمردار)",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = Slate950
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {
            // Hero Image
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(240.dp)
                ) {
                    AsyncImage(
                        model = imageModel,
                        contentDescription = recipe.title,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )

                    Surface(
                        modifier = Modifier
                            .align(Alignment.BottomStart)
                            .padding(12.dp),
                        shape = RoundedCornerShape(8.dp),
                        color = Slate950.copy(alpha = 0.85f)
                    ) {
                        Text(
                            text = recipe.originProvince ?: recipe.originRegion,
                            style = MaterialTheme.typography.bodySmall,
                            color = Saffron300,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }

            // Title & Description
            item {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = recipe.title,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    if (!recipe.persianSubtitle.isNullOrEmpty()) {
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = recipe.persianSubtitle,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Saffron400
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = recipe.description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = Slate200,
                        lineHeight = 22.sp
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    // Servings Scaler Control
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate900)
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "تنظیم تعداد نفرات (مقیاس هوشمند):",
                                    style = MaterialTheme.typography.bodyMedium,
                                    fontWeight = FontWeight.SemiBold,
                                    color = Color.White
                                )

                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    IconButton(
                                        onClick = { if (currentServings > 1) currentServings-- },
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(CircleShape)
                                            .background(Slate800)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Remove,
                                            contentDescription = "کاهش نفرات",
                                            tint = Saffron400,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }

                                    Text(
                                        text = "$currentServings نفر",
                                        style = MaterialTheme.typography.titleSmall,
                                        fontWeight = FontWeight.Bold,
                                        color = Saffron400,
                                        modifier = Modifier.padding(horizontal = 12.dp)
                                    )

                                    IconButton(
                                        onClick = { if (currentServings < 30) currentServings++ },
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(CircleShape)
                                            .background(Slate800)
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Add,
                                            contentDescription = "افزایش نفرات",
                                            tint = Saffron400,
                                            modifier = Modifier.size(18.dp)
                                        )
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(8.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                listOf(2, 4, 6, 8).forEach { count ->
                                    Button(
                                        onClick = { currentServings = count },
                                        modifier = Modifier.weight(1f).height(36.dp),
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.buttonColors(
                                            containerColor = if (currentServings == count) Saffron500 else Slate800,
                                            contentColor = if (currentServings == count) Slate950 else Slate200
                                        ),
                                        contentPadding = PaddingValues(0.dp)
                                    ) {
                                        Text(text = "$count نفره", style = MaterialTheme.typography.labelSmall)
                                    }
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    // Nutrition Cards
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        NutritionStatBox("کالری هر سهم", "${recipe.caloriesPerServing}", "kcal", Saffron400, Modifier.weight(1f))
                        NutritionStatBox("پروتئین", "${recipe.proteinGrams}", "گرم", HerbalGreen, Modifier.weight(1f))
                        NutritionStatBox("کربوهیدرات", "${recipe.carbsGrams}", "گرم", Color(0xFF60A5FA), Modifier.weight(1f))
                        NutritionStatBox("چربی", "${recipe.fatGrams}", "گرم", CrimsonRed, Modifier.weight(1f))
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    // Okala Price Summary
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp),
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
                                Text(
                                    text = "برآورد هزینه مواد اولیه در اکالا:",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate400
                                )
                                Text(
                                    text = "${String.format("%,d", totalCost)} تومان",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = Saffron400
                                )
                            }

                            Button(
                                onClick = {
                                    onAddIngredientsToShoppingList(recipe, currentServings)
                                    snackbarMessage = "همه مواد به سبد خرید اضافه شدند!"
                                },
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen)
                            ) {
                                Icon(imageVector = Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("خرید اقلام", style = MaterialTheme.typography.labelSmall, color = Slate950)
                            }
                        }
                    }
                }
            }

            // Ingredients Section
            item {
                Text(
                    text = "مواد اولیه دقیق (ممیزی‌شده):",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                )
            }

            items(scaledIngredients) { ing ->
                val priceRes = remember(ing.name, ing.amount, ing.unit) {
                    OkalaPricingService.estimatePrice(ing.name, ing.amount, ing.unit)
                }

                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 4.dp),
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
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = ing.name,
                                style = MaterialTheme.typography.bodyMedium,
                                fontWeight = FontWeight.Medium,
                                color = Color.White
                            )
                            if (!ing.notes.isNullOrEmpty()) {
                                Text(
                                    text = "نکته: ${ing.notes}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate400
                                )
                            }
                        }

                        Column(horizontalAlignment = Alignment.End) {
                            Text(
                                text = CalculationEngine.formatMeasurement(ing.amount, ing.unit),
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = Saffron400
                            )
                            Text(
                                text = if (priceRes.priceToman == 0L) "رایگان درون‌خانگی" else "${String.format("%,d", priceRes.priceToman)} تومان",
                                style = MaterialTheme.typography.labelSmall,
                                color = if (priceRes.priceToman == 0L) HerbalGreen else Slate400
                            )
                        }
                    }
                }
            }

            // Steps Section
            item {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "مراحل گام‌به‌گام پخت:",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                )
            }

            items(recipe.steps) { step ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 6.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate900)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Surface(
                                    shape = CircleShape,
                                    color = Saffron500,
                                    modifier = Modifier.size(24.dp)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Text(
                                            text = "${step.stepNumber}",
                                            style = MaterialTheme.typography.labelSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Slate950
                                        )
                                    }
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = step.title,
                                    style = MaterialTheme.typography.titleSmall,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }

                            if (step.durationMinutes != null && step.durationMinutes > 0) {
                                Surface(
                                    shape = RoundedCornerShape(8.dp),
                                    color = Slate800
                                ) {
                                    Row(
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Timer,
                                            contentDescription = null,
                                            tint = Saffron400,
                                            modifier = Modifier.size(14.dp)
                                        )
                                        Spacer(modifier = Modifier.width(4.dp))
                                        Text(
                                            text = "${step.durationMinutes} دقیقه",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = Saffron300
                                        )
                                    }
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = step.instruction,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Slate200,
                            lineHeight = 22.sp
                        )

                        if (!step.proTip.isNullOrEmpty()) {
                            Spacer(modifier = Modifier.height(8.dp))
                            Surface(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(8.dp),
                                color = SaffronDark.copy(alpha = 0.2f)
                            ) {
                                Text(
                                    text = "💡 نکته سرآشپز: ${step.proTip}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Saffron300,
                                    modifier = Modifier.padding(8.dp)
                                )
                            }
                        }
                    }
                }
            }

            // Golden Tips Section
            if (recipe.goldenTips.isNotEmpty()) {
                item {
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "فوت‌وفن‌های طلایی سرآشپز (Golden Tips):",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                    )
                }

                items(recipe.goldenTips) { tip ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 4.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate900)
                    ) {
                        Row(
                            modifier = Modifier.padding(12.dp),
                            verticalAlignment = Alignment.Top
                        ) {
                            Icon(
                                imageVector = Icons.Default.Stars,
                                contentDescription = null,
                                tint = Saffron400,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = tip,
                                style = MaterialTheme.typography.bodyMedium,
                                color = Slate200,
                                lineHeight = 20.sp
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun NutritionStatBox(
    title: String,
    value: String,
    unit: String,
    tint: Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Slate900)
    ) {
        Column(
            modifier = Modifier.padding(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = title, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 9.sp)
            Text(text = value, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, color = tint)
            Text(text = unit, style = MaterialTheme.typography.labelSmall, color = Slate400, fontSize = 8.sp)
        }
    }
}
