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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.data.Recipe
import com.example.ui.theme.*

data class RecipeCategoryItem(
    val id: String,
    val title: String
)

val RECIPE_CATEGORIES = listOf(
    RecipeCategoryItem("all", "همه دستورها"),
    RecipeCategoryItem("iranian_traditional", "اصیل ایرانی"),
    RecipeCategoryItem("iranian_local", "محلی و استانی"),
    RecipeCategoryItem("soup_ash", "انواع آش و سوپ"),
    RecipeCategoryItem("fast_food", "فست‌فود"),
    RecipeCategoryItem("international", "غذاهای ملل"),
    RecipeCategoryItem("breakfast", "صبحانه سنتی و مدرن"),
    RecipeCategoryItem("pastry_dry", "شیرینی خشک"),
    RecipeCategoryItem("pastry_wet", "شیرینی تر"),
    RecipeCategoryItem("cake_bakery", "کیک و عصرانه"),
    RecipeCategoryItem("dessert_modern", "دسر و ژله"),
    RecipeCategoryItem("halva_traditional", "حلوا و شله‌زرد"),
    RecipeCategoryItem("icecream", "بستنی و فالوده"),
    RecipeCategoryItem("drinks_beverages", "نوشیدنی و شیک")
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RecipesScreen(
    recipes: List<Recipe>,
    onRecipeClick: (Recipe) -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("all") }

    val filteredRecipes = remember(recipes, searchQuery, selectedCategory) {
        recipes.filter { recipe ->
            val matchesCategory = selectedCategory == "all" || recipe.category == selectedCategory
            val matchesSearch = if (searchQuery.isBlank()) {
                true
            } else {
                val q = searchQuery.trim().lowercase()
                recipe.title.lowercase().contains(q) ||
                        (recipe.persianSubtitle?.lowercase()?.contains(q) ?: false) ||
                        recipe.originRegion.lowercase().contains(q) ||
                        recipe.ingredients.any { it.name.lowercase().contains(q) }
            }
            matchesCategory && matchesSearch
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
    ) {
        // Search Input
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            placeholder = {
                Text(
                    text = "جستجوی غذا، استان، یا مواد اولیه (مثلا قورمه، گیلان، مرغ)...",
                    style = MaterialTheme.typography.bodySmall,
                    color = Slate400
                )
            },
            leadingIcon = {
                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = "جستجو",
                    tint = Saffron400
                )
            },
            trailingIcon = {
                if (searchQuery.isNotEmpty()) {
                    IconButton(onClick = { searchQuery = "" }) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "پاک کردن",
                            tint = Slate400
                        )
                    }
                }
            },
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = Saffron500,
                unfocusedBorderColor = Slate700,
                focusedContainerColor = Slate900,
                unfocusedContainerColor = Slate900,
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White
            ),
            singleLine = true
        )

        // Category Horizontal Chips
        LazyRow(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(RECIPE_CATEGORIES) { cat ->
                val isSelected = selectedCategory == cat.id
                FilterChip(
                    selected = isSelected,
                    onClick = { selectedCategory = cat.id },
                    label = {
                        Text(
                            text = cat.title,
                            style = MaterialTheme.typography.bodySmall,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                        )
                    },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = Saffron500,
                        selectedLabelColor = Slate950,
                        containerColor = Slate800,
                        labelColor = Slate200
                    ),
                    shape = RoundedCornerShape(12.dp)
                )
            }
        }

        // Count Banner
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 4.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "${filteredRecipes.size} دستور پخت استاندارد",
                style = MaterialTheme.typography.labelSmall,
                color = Slate400
            )
            Text(
                text = "۳۷۴ رسپی اعتبارسنجی‌شده",
                style = MaterialTheme.typography.labelSmall,
                color = Saffron400
            )
        }

        // Recipe List
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(bottom = 90.dp, top = 4.dp)
        ) {
            items(filteredRecipes, key = { it.id }) { recipe ->
                RecipeCard(
                    recipe = recipe,
                    onClick = { onRecipeClick(recipe) }
                )
            }
        }
    }
}

@Composable
fun RecipeCard(
    recipe: Recipe,
    onClick: () -> Unit
) {
    val imageModel = remember(recipe.image) {
        if (recipe.image.startsWith("/recipes/")) {
            "file:///android_asset${recipe.image}"
        } else if (recipe.image.startsWith("http")) {
            recipe.image
        } else {
            "file:///android_asset/recipes/ghormeh-sabzi.jpg"
        }
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = Slate900)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Recipe Image
            Box(
                modifier = Modifier
                    .size(105.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(Slate800)
            ) {
                AsyncImage(
                    model = imageModel,
                    contentDescription = recipe.title,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )

                // Region / Province Badge
                Surface(
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(4.dp),
                    shape = RoundedCornerShape(6.dp),
                    color = Slate950.copy(alpha = 0.85f)
                ) {
                    Text(
                        text = recipe.originProvince ?: recipe.originRegion,
                        style = MaterialTheme.typography.labelSmall,
                        fontSize = 9.sp,
                        color = Saffron300,
                        modifier = Modifier.padding(horizontal = 5.dp, vertical = 2.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            // Details
            Column(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight(),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = recipe.title,
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )

                    if (!recipe.persianSubtitle.isNullOrEmpty()) {
                        Text(
                            text = recipe.persianSubtitle,
                            style = MaterialTheme.typography.bodySmall,
                            fontSize = 11.sp,
                            color = Slate400,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Stats badges: time, calories, servings
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Cook time
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = Slate800
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Timer,
                                contentDescription = null,
                                tint = Saffron400,
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(3.dp))
                            Text(
                                text = "${recipe.cookTimeMinutes} دقیقه",
                                style = MaterialTheme.typography.labelSmall,
                                fontSize = 10.sp,
                                color = Slate200
                            )
                        }
                    }

                    // Calories
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = Slate800
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.LocalFireDepartment,
                                contentDescription = null,
                                tint = CrimsonRed,
                                modifier = Modifier.size(12.dp)
                            )
                            Spacer(modifier = Modifier.width(3.dp))
                            Text(
                                text = "${recipe.caloriesPerServing} kcal",
                                style = MaterialTheme.typography.labelSmall,
                                fontSize = 10.sp,
                                color = Slate200
                            )
                        }
                    }

                    // Servings
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = Slate800
                    ) {
                        Text(
                            text = "${recipe.baseServings} نفره",
                            style = MaterialTheme.typography.labelSmall,
                            fontSize = 10.sp,
                            color = Slate300,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                        )
                    }
                }
            }
        }
    }
}
