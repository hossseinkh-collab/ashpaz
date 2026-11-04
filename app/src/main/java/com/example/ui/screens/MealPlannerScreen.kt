package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
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
import com.example.data.MealPlanSlot
import com.example.data.Recipe
import com.example.ui.theme.*

@Composable
fun MealPlannerScreen(
    recipes: List<Recipe>,
    onRecipeClick: (Recipe) -> Unit,
    onAddWeeklyToShoppingList: () -> Unit,
    modifier: Modifier = Modifier
) {
    val daysFa = listOf("شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه")

    var mealSlots by remember(recipes) {
        val count = recipes.size
        mutableStateOf(
            daysFa.mapIndexed { index, day ->
                MealPlanSlot(
                    dayNameFa = day,
                    dayIndex = index,
                    breakfastRecipeId = if (count > 0) recipes.getOrNull(index % count)?.id else null,
                    lunchRecipeId = if (count > 0) recipes.getOrNull((index + 3) % count)?.id else null,
                    dinnerRecipeId = if (count > 0) recipes.getOrNull((index + 6) % count)?.id else null
                )
            }
        )
    }

    var showPosterModal by remember { mutableStateOf(false) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
            .padding(16.dp)
    ) {
        // Banner Actions
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
                            text = "برنامه‌ریز هفتگی هوشمند 🗓",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = Saffron400
                        )
                        Text(
                            text = "توازن پروتئین، حبوبات و سبزیجات برای ۷ روز هفته",
                            style = MaterialTheme.typography.bodySmall,
                            color = Slate400
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = {
                            // Randomize unlocked slots
                            mealSlots = mealSlots.map { slot ->
                                slot.copy(
                                    lunchRecipeId = if (slot.lunchLocked) slot.lunchRecipeId else recipes.randomOrNull()?.id,
                                    dinnerRecipeId = if (slot.dinnerLocked) slot.dinnerRecipeId else recipes.randomOrNull()?.id
                                )
                            }
                        },
                        modifier = Modifier.weight(1f).height(42.dp),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                    ) {
                        Icon(imageVector = Icons.Default.Shuffle, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("پیشنهاد خودکار", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                    }

                    Button(
                        onClick = onAddWeeklyToShoppingList,
                        modifier = Modifier.weight(1f).height(42.dp),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen)
                    ) {
                        Icon(imageVector = Icons.Default.ShoppingCartCheckout, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("خرید هفته", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Days List
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(bottom = 90.dp)
        ) {
            itemsIndexed(mealSlots) { index, slot ->
                val lunchRecipe = recipes.find { it.id == slot.lunchRecipeId }
                val dinnerRecipe = recipes.find { it.id == slot.dinnerRecipeId }

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
                                text = slot.dayNameFa,
                                style = MaterialTheme.typography.titleSmall,
                                fontWeight = FontWeight.Bold,
                                color = Saffron400
                            )

                            Text(
                                text = "تعداد نفرات: ۴ نفر",
                                style = MaterialTheme.typography.labelSmall,
                                color = Slate400
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        // Lunch Slot
                        MealSlotItem(
                            mealName = "ناهار",
                            recipe = lunchRecipe,
                            isLocked = slot.lunchLocked,
                            onToggleLock = {
                                mealSlots = mealSlots.toMutableList().also { list ->
                                    list[index] = slot.copy(lunchLocked = !slot.lunchLocked)
                                }
                            },
                            onClick = { lunchRecipe?.let { onRecipeClick(it) } }
                        )

                        Spacer(modifier = Modifier.height(6.dp))

                        // Dinner Slot
                        MealSlotItem(
                            mealName = "شام",
                            recipe = dinnerRecipe,
                            isLocked = slot.dinnerLocked,
                            onToggleLock = {
                                mealSlots = mealSlots.toMutableList().also { list ->
                                    list[index] = slot.copy(dinnerLocked = !slot.dinnerLocked)
                                }
                            },
                            onClick = { dinnerRecipe?.let { onRecipeClick(it) } }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun MealSlotItem(
    mealName: String,
    recipe: Recipe?,
    isLocked: Boolean,
    onToggleLock: () -> Unit,
    onClick: () -> Unit
) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(10.dp),
        color = Slate800
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 10.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "$mealName: ${recipe?.title ?: "انتخاب دستور پخت"}",
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.Medium,
                    color = Color.White
                )
                if (recipe != null) {
                    Text(
                        text = "${recipe.caloriesPerServing} kcal • زمان پخت: ${recipe.cookTimeMinutes} دقیقه",
                        style = MaterialTheme.typography.labelSmall,
                        color = Slate400
                    )
                }
            }

            IconButton(onClick = onToggleLock, modifier = Modifier.size(32.dp)) {
                Icon(
                    imageVector = if (isLocked) Icons.Default.Lock else Icons.Default.LockOpen,
                    contentDescription = if (isLocked) "قفل شده" else "آزاد",
                    tint = if (isLocked) Saffron400 else Slate400,
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}
