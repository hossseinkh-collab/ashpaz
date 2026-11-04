package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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

val POPULAR_PANTRY_ITEMS = listOf(
    "مرغ", "گوشت", "پیاز", "سیب‌زمینی", "گوجه", "تخم‌مرغ", "برنج",
    "عدس", "لپه", "لوبیا", "بادمجان", "ماست", "قارچ", "اسفناج",
    "سبزی قورمه", "سبزی آش", "کدو سبز", "هویج", "نخود", "رب گوجه"
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FridgeChefScreen(
    recipes: List<Recipe>,
    onRecipeClick: (Recipe) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedIngredients by remember {
        mutableStateOf(setOf("مرغ", "پیاز", "سیب‌زمینی", "گوجه"))
    }
    var customInput by remember { mutableStateOf("") }

    val matchedRecipes = remember(recipes, selectedIngredients) {
        CalculationEngine.matchRecipesWithPantry(recipes, selectedIngredients)
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
                        text = "چی بپزم؟ (سرآشپز یخچال و انبار) 🧊",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Saffron400
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "مواد اولیه‌ای که در خانه، یخچال یا کابینت دارید را انتخاب کنید؛ هوش مصنوعی بهترین غذاهای قابل طبخ با درصد تطابق را پیشنهاد می‌دهد.",
                        style = MaterialTheme.typography.bodySmall,
                        color = Slate300,
                        lineHeight = 18.sp
                    )
                }
            }
        }

        // Quick Selector Chips
        item {
            Text(
                text = "مواد اولیه موجود در منزل را علامت بزنید:",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            Spacer(modifier = Modifier.height(8.dp))

            // Multi-row flow of pantry ingredients
            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                POPULAR_PANTRY_ITEMS.chunked(4).forEach { rowItems ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        rowItems.forEach { item ->
                            val isSelected = selectedIngredients.contains(item)
                            FilterChip(
                                selected = isSelected,
                                onClick = {
                                    selectedIngredients = if (isSelected) {
                                        selectedIngredients - item
                                    } else {
                                        selectedIngredients + item
                                    }
                                },
                                label = { Text(item, style = MaterialTheme.typography.labelSmall) },
                                modifier = Modifier.weight(1f),
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = Saffron500,
                                    selectedLabelColor = Slate950,
                                    containerColor = Slate800,
                                    labelColor = Slate200
                                ),
                                shape = RoundedCornerShape(8.dp)
                            )
                        }
                    }
                }
            }
        }

        // Match count header
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "${matchedRecipes.size} غذای متناسب پیدا شد",
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )

                if (selectedIngredients.isNotEmpty()) {
                    TextButton(onClick = { selectedIngredients = emptySet() }) {
                        Text(text = "پاکسازی همه", color = CrimsonRed, style = MaterialTheme.typography.labelSmall)
                    }
                }
            }
        }

        // Matched recipes list
        items(matchedRecipes) { (recipe, matchPct) ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onRecipeClick(recipe) },
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Slate900)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = recipe.title,
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "${recipe.categoryNameFa} • زمان پخت: ${recipe.cookTimeMinutes} دقیقه",
                            style = MaterialTheme.typography.labelSmall,
                            color = Slate400
                        )
                    }

                    Spacer(modifier = Modifier.width(10.dp))

                    Surface(
                        shape = RoundedCornerShape(10.dp),
                        color = when {
                            matchPct >= 80 -> HerbalGreen.copy(alpha = 0.2f)
                            matchPct >= 50 -> Saffron500.copy(alpha = 0.2f)
                            else -> Slate800
                        }
                    ) {
                        Column(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(
                                text = "$matchPct٪",
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = when {
                                    matchPct >= 80 -> HerbalGreen
                                    matchPct >= 50 -> Saffron400
                                    else -> Slate300
                                }
                            )
                            Text(
                                text = "تطابق مواد",
                                style = MaterialTheme.typography.labelSmall,
                                fontSize = 8.sp,
                                color = Slate400
                            )
                        }
                    }
                }
            }
        }
    }
}
