package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.example.data.IngredientSubstitution
import com.example.data.InventoryItem
import com.example.data.Recipe
import com.example.services.CalculationEngine
import com.example.ui.theme.*

val POPULAR_PANTRY_PROTEIN = listOf("مرغ", "گوشت گوسفندی", "گوشت چرخ‌کرده", "ماهی", "تخم‌مرغ", "میگو")
val POPULAR_PANTRY_VEGGIES = listOf("پیاز", "سیب‌زمینی", "گوجه", "بادمجان", "سیر", "قارچ", "اسفناج", "هویج", "کدو سبز", "فلفل دلمه‌ای")
val POPULAR_PANTRY_GRAINS = listOf("برنج ایرانی", "عدس", "لپه", "لوبیا قرمز", "نخود", "جو پرک", "آرد گندم", "رشته سوپی")
val POPULAR_PANTRY_DAIRY_OTHER = listOf("ماست", "کره", "شیر", "پنیر پیتزا", "خامه", "رب گوجه", "آبغوره", "زعفران", "زرشک", "گردو")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FridgeChefScreen(
    recipes: List<Recipe>,
    substitutions: List<IngredientSubstitution> = emptyList(),
    onRecipeClick: (Recipe) -> Unit,
    onAddIngredientToShopping: (String) -> Unit = {},
    modifier: Modifier = Modifier
) {
    var selectedSubTab by remember { mutableStateOf(0) } // 0: چی بپزم, 1: موجودی یخچال و انبار, 2: جایگزینی مواد

    // Pantry State for Tab 0
    var selectedIngredients by remember {
        mutableStateOf(setOf("مرغ", "پیاز", "سیب‌زمینی", "گوجه", "برنج ایرانی"))
    }
    var customIngredientInput by remember { mutableStateOf("") }

    // Inventory State for Tab 1
    var inventoryItems by remember {
        mutableStateOf(
            listOf(
                InventoryItem("inv-1", "گوشت چرخ‌کرده", 1.0, "کیلوگرم", "فریزر", 14, false),
                InventoryItem("inv-2", "سینه مرغ", 800.0, "گرم", "فریزر", 10, false),
                InventoryItem("inv-3", "شیر کم‌چرب", 1.0, "لیتر", "یخچال", 2, true),
                InventoryItem("inv-4", "ماست چکیده", 500.0, "گرم", "یخچال", 4, false),
                InventoryItem("inv-5", "گوجه فرنگی", 1.5, "کیلوگرم", "یخچال", 3, false),
                InventoryItem("inv-6", "پیاز زرد", 3.0, "کیلوگرم", "انبار", 20, false),
                InventoryItem("inv-7", "سیب‌زمینی", 2.0, "کیلوگرم", "انبار", 18, false),
                InventoryItem("inv-8", "برنج طارم هاشمی", 5.0, "کیلوگرم", "انبار", 60, false),
                InventoryItem("inv-9", "رب گوجه فرنگی", 1.0, "قوطی", "انبار", 90, false),
                InventoryItem("inv-10", "خامه صبحانه", 1.0, "بسته", "یخچال", 1, true)
            )
        )
    }
    var inventoryFilterLocation by remember { mutableStateOf("همه") }
    var showAddInventoryDialog by remember { mutableStateOf(false) }

    // Substitutions State for Tab 2
    var substituteSearch by remember { mutableStateOf("") }
    var substitutionBaseAmount by remember { mutableStateOf("100") }

    val matchedRecipes = remember(recipes, selectedIngredients) {
        CalculationEngine.matchRecipesWithPantry(recipes, selectedIngredients)
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
    ) {
        // Sub-tabs Navigation
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = Slate900,
            tonalElevation = 4.dp
        ) {
            TabRow(
                selectedTabIndex = selectedSubTab,
                containerColor = Slate900,
                contentColor = Saffron400,
                indicator = { tabPositions ->
                    TabRowDefaults.SecondaryIndicator(
                        Modifier.tabIndicatorOffset(tabPositions[selectedSubTab]),
                        color = Saffron500,
                        height = 3.dp
                    )
                }
            ) {
                Tab(
                    selected = selectedSubTab == 0,
                    onClick = { selectedSubTab = 0 },
                    text = {
                        Text(
                            "چی بپزم؟ 🍳",
                            fontWeight = if (selectedSubTab == 0) FontWeight.Bold else FontWeight.Normal,
                            style = MaterialTheme.typography.labelMedium
                        )
                    }
                )
                Tab(
                    selected = selectedSubTab == 1,
                    onClick = { selectedSubTab = 1 },
                    text = {
                        Text(
                            "موجودی انبار و یخچال 🧊",
                            fontWeight = if (selectedSubTab == 1) FontWeight.Bold else FontWeight.Normal,
                            style = MaterialTheme.typography.labelMedium
                        )
                    }
                )
                Tab(
                    selected = selectedSubTab == 2,
                    onClick = { selectedSubTab = 2 },
                    text = {
                        Text(
                            "جایگزینی علمی مواد 🔬",
                            fontWeight = if (selectedSubTab == 2) FontWeight.Bold else FontWeight.Normal,
                            style = MaterialTheme.typography.labelMedium
                        )
                    }
                )
            }
        }

        // Content Area
        when (selectedSubTab) {
            0 -> {
                // Tab 0: چی بپزم؟
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
                    // Explanatory Banner
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(16.dp),
                            colors = CardDefaults.cardColors(containerColor = Slate900)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text(
                                    text = "موتور هوشمند تطبیق مواد اولیه با ۳۷۴ دستور پخت",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = Saffron400
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = "مواد اولیه‌ای که اکنون در خانه دارید را انتخاب کنید. سیستم غذاهای قابل پخت را بر حسب درصد تطابق رتبه‌بندی می‌کند.",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate300,
                                    lineHeight = 18.sp
                                )

                                Spacer(modifier = Modifier.height(10.dp))

                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Button(
                                        onClick = {
                                            val invNames = inventoryItems.map { it.name.split(" ").first() }.toSet()
                                            selectedIngredients = selectedIngredients + invNames
                                        },
                                        shape = RoundedCornerShape(8.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                                    ) {
                                        Icon(imageVector = Icons.Default.Sync, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                                        Spacer(modifier = Modifier.width(4.dp))
                                        Text("همگام‌سازی با موجودی ثبت‌شده", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                                    }
                                }
                            }
                        }
                    }

                    // Custom Ingredient Input
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            OutlinedTextField(
                                value = customIngredientInput,
                                onValueChange = { customIngredientInput = it },
                                modifier = Modifier.weight(1f),
                                placeholder = { Text("افزودن دستی ماده اولیه (مثلاً زرشک)...", fontSize = 12.sp, color = Slate500) },
                                shape = RoundedCornerShape(12.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Saffron500,
                                    unfocusedBorderColor = Slate800,
                                    focusedTextColor = Color.White,
                                    unfocusedTextColor = Color.White
                                ),
                                singleLine = true
                            )
                            Button(
                                onClick = {
                                    if (customIngredientInput.isNotBlank()) {
                                        selectedIngredients = selectedIngredients + customIngredientInput.trim()
                                        customIngredientInput = ""
                                    }
                                },
                                shape = RoundedCornerShape(12.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen),
                                modifier = Modifier.height(54.dp)
                            ) {
                                Text("افزودن", color = Slate950, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    // Category Sections of Ingredients
                    item {
                        Text("پروتئین‌ها و گوشت‌ها:", style = MaterialTheme.typography.labelMedium, color = Saffron400, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(6.dp))
                        IngredientChipsFlow(items = POPULAR_PANTRY_PROTEIN, selected = selectedIngredients) { item ->
                            selectedIngredients = if (selectedIngredients.contains(item)) selectedIngredients - item else selectedIngredients + item
                        }
                    }

                    item {
                        Text("سبزیجات و صیفی‌جات:", style = MaterialTheme.typography.labelMedium, color = Saffron400, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(6.dp))
                        IngredientChipsFlow(items = POPULAR_PANTRY_VEGGIES, selected = selectedIngredients) { item ->
                            selectedIngredients = if (selectedIngredients.contains(item)) selectedIngredients - item else selectedIngredients + item
                        }
                    }

                    item {
                        Text("حبوبات، غلات و برنج:", style = MaterialTheme.typography.labelMedium, color = Saffron400, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(6.dp))
                        IngredientChipsFlow(items = POPULAR_PANTRY_GRAINS, selected = selectedIngredients) { item ->
                            selectedIngredients = if (selectedIngredients.contains(item)) selectedIngredients - item else selectedIngredients + item
                        }
                    }

                    item {
                        Text("لبنیات، چاشنی‌ها و سایر:", style = MaterialTheme.typography.labelMedium, color = Saffron400, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(6.dp))
                        IngredientChipsFlow(items = POPULAR_PANTRY_DAIRY_OTHER, selected = selectedIngredients) { item ->
                            selectedIngredients = if (selectedIngredients.contains(item)) selectedIngredients - item else selectedIngredients + item
                        }
                    }

                    // Matching Header
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
                                    Text(text = "پاکسازی انتخاب‌ها", color = CrimsonRed, style = MaterialTheme.typography.labelSmall)
                                }
                            }
                        }
                    }

                    // Matched Recipes
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
                                    Text(
                                        text = recipe.title,
                                        style = MaterialTheme.typography.titleSmall,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White
                                    )
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = "${recipe.categoryNameFa} • پخت: ${recipe.cookTimeMinutes} دقیقه • کالری: ${recipe.caloriesPerServing}",
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
                                            fontSize = 9.sp,
                                            color = Slate400
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
            1 -> {
                // Tab 1: موجودی انبار و یخچال
                val filteredInventory = remember(inventoryItems, inventoryFilterLocation) {
                    if (inventoryFilterLocation == "همه") inventoryItems
                    else inventoryItems.filter { it.location == inventoryFilterLocation }
                }

                val expiringSoonCount = remember(inventoryItems) {
                    inventoryItems.count { it.expirationDays <= 3 }
                }

                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
                    // Summary Banner & Expiry Warnings
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
                                            text = "مدیریت هوشمند موجودی و تاریخ انقضا 🧊",
                                            style = MaterialTheme.typography.titleMedium,
                                            fontWeight = FontWeight.Bold,
                                            color = Saffron400
                                        )
                                        Text(
                                            text = "کاهش اسراف مواد غذایی و برنامه‌ریزی هوشمندانه پخت و خرید",
                                            style = MaterialTheme.typography.bodySmall,
                                            color = Slate400
                                        )
                                    }

                                    Button(
                                        onClick = { showAddInventoryDialog = true },
                                        shape = RoundedCornerShape(10.dp),
                                        colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                                    ) {
                                        Icon(imageVector = Icons.Default.Add, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                                        Spacer(modifier = Modifier.width(4.dp))
                                        Text("ماده جدید", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                                    }
                                }

                                if (expiringSoonCount > 0) {
                                    Spacer(modifier = Modifier.height(10.dp))
                                    Surface(
                                        shape = RoundedCornerShape(10.dp),
                                        color = CrimsonRed.copy(alpha = 0.2f),
                                        modifier = Modifier.fillMaxWidth()
                                    ) {
                                        Row(
                                            modifier = Modifier.padding(10.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Icon(imageVector = Icons.Default.Warning, contentDescription = null, tint = CrimsonRed, modifier = Modifier.size(20.dp))
                                            Spacer(modifier = Modifier.width(8.dp))
                                            Text(
                                                text = "هشدار: $expiringSoonCount قلم کالا تا ۳ روز آینده منقضی می‌شوند. بهتر است سریع‌تر مصرف شوند.",
                                                style = MaterialTheme.typography.labelSmall,
                                                color = CrimsonRed
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Location Filter Tabs
                    item {
                        val locations = listOf("همه", "یخچال", "فریزر", "انبار")
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            locations.forEach { loc ->
                                val isSelected = inventoryFilterLocation == loc
                                FilterChip(
                                    selected = isSelected,
                                    onClick = { inventoryFilterLocation = loc },
                                    label = { Text(loc) },
                                    modifier = Modifier.weight(1f),
                                    colors = FilterChipDefaults.filterChipColors(
                                        selectedContainerColor = Saffron500,
                                        selectedLabelColor = Slate950,
                                        containerColor = Slate800,
                                        labelColor = Slate300
                                    ),
                                    shape = RoundedCornerShape(10.dp)
                                )
                            }
                        }
                    }

                    // Quick Actions
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Button(
                                onClick = {
                                    val expiring = inventoryItems.filter { it.expirationDays <= 3 }
                                    expiring.forEach { onAddIngredientToShopping(it.name) }
                                },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = Slate800)
                            ) {
                                Icon(imageVector = Icons.Default.AddShoppingCart, contentDescription = null, tint = Saffron400, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("خرید مجدد اقلام رو به اتمام", style = MaterialTheme.typography.labelSmall, color = Saffron400)
                            }

                            Button(
                                onClick = {
                                    val availableNames = inventoryItems.map { it.name.split(" ").first() }.toSet()
                                    selectedIngredients = availableNames
                                    selectedSubTab = 0
                                },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = HerbalGreen)
                            ) {
                                Icon(imageVector = Icons.Default.OutdoorGrill, contentDescription = null, tint = Slate950, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("پیشنهاد پخت با این‌ها", style = MaterialTheme.typography.labelSmall, color = Slate950, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    // Inventory Items List
                    items(filteredInventory) { item ->
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
                                Column(modifier = Modifier.weight(1f)) {
                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = item.name,
                                            style = MaterialTheme.typography.titleSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Color.White
                                        )
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Surface(
                                            shape = RoundedCornerShape(6.dp),
                                            color = Slate800
                                        ) {
                                            Text(
                                                text = item.location,
                                                style = MaterialTheme.typography.labelSmall,
                                                color = Slate400,
                                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                            )
                                        }
                                    }

                                    Spacer(modifier = Modifier.height(4.dp))

                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        Text(
                                            text = "موجودی: ${item.amount} ${item.unit}",
                                            style = MaterialTheme.typography.bodySmall,
                                            color = Saffron300
                                        )
                                        Spacer(modifier = Modifier.width(10.dp))
                                        Text(
                                            text = "انقضا: ${item.expirationDays} روز دیگر",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = if (item.expirationDays <= 3) CrimsonRed else HerbalGreen,
                                            fontWeight = if (item.expirationDays <= 3) FontWeight.Bold else FontWeight.Normal
                                        )
                                    }
                                }

                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    IconButton(
                                        onClick = {
                                            inventoryItems = inventoryItems.map {
                                                if (it.id == item.id && it.amount > 0.5) it.copy(amount = it.amount - 0.5) else it
                                            }
                                        },
                                        modifier = Modifier.size(32.dp)
                                    ) {
                                        Icon(imageVector = Icons.Default.Remove, contentDescription = "کاهش", tint = Slate400)
                                    }

                                    IconButton(
                                        onClick = {
                                            inventoryItems = inventoryItems.map {
                                                if (it.id == item.id) it.copy(amount = it.amount + 0.5) else it
                                            }
                                        },
                                        modifier = Modifier.size(32.dp)
                                    ) {
                                        Icon(imageVector = Icons.Default.Add, contentDescription = "افزایش", tint = Saffron400)
                                    }

                                    IconButton(
                                        onClick = {
                                            inventoryItems = inventoryItems.filter { it.id != item.id }
                                        },
                                        modifier = Modifier.size(32.dp)
                                    ) {
                                        Icon(imageVector = Icons.Default.DeleteOutline, contentDescription = "حذف", tint = CrimsonRed.copy(alpha = 0.7f))
                                    }
                                }
                            }
                        }
                    }
                }
            }
            2 -> {
                // Tab 2: جایگزینی علمی مواد غذایی
                val filteredSubs = remember(substitutions, substituteSearch) {
                    if (substituteSearch.isBlank()) substitutions
                    else substitutions.filter {
                        it.originalIngredient.contains(substituteSearch.trim()) ||
                        it.substituteIngredient.contains(substituteSearch.trim()) ||
                        it.textureEffectFa.contains(substituteSearch.trim()) ||
                        it.flavorEffectFa.contains(substituteSearch.trim()) ||
                        it.allergenAlertFa?.contains(substituteSearch.trim()) == true
                    }
                }

                val baseAmountNum = substitutionBaseAmount.toDoubleOrNull() ?: 100.0

                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                    contentPadding = PaddingValues(bottom = 90.dp)
                ) {
                    // Header Card
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(16.dp),
                            colors = CardDefaults.cardColors(containerColor = Slate900)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text(
                                    text = "جدول علمی جایگزینی مواد غذایی 🔬",
                                    style = MaterialTheme.typography.titleMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = Saffron400
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = "جایگزین‌های تاییدشده آزمایشگاهی برای مواد اولیه ناموجود، رژیم‌های بدون گلوتن، عدم تحمل لاکتوز، دیابت و چربی خون.",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate300,
                                    lineHeight = 18.sp
                                )
                            }
                        }
                    }

                    // Search & Ratio Calculator controls
                    item {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            OutlinedTextField(
                                value = substituteSearch,
                                onValueChange = { substituteSearch = it },
                                modifier = Modifier.weight(1f),
                                placeholder = { Text("جستجوی ماده (خامه، کره، تخم‌مرغ، گلوتن...)", fontSize = 12.sp, color = Slate500) },
                                leadingIcon = { Icon(imageVector = Icons.Default.Search, contentDescription = null, tint = Saffron400) },
                                shape = RoundedCornerShape(12.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Saffron500,
                                    unfocusedBorderColor = Slate800,
                                    focusedTextColor = Color.White,
                                    unfocusedTextColor = Color.White
                                ),
                                singleLine = true
                            )

                            OutlinedTextField(
                                value = substitutionBaseAmount,
                                onValueChange = { substitutionBaseAmount = it },
                                modifier = Modifier.width(95.dp),
                                label = { Text("مقدار پایه (گرم)", fontSize = 10.sp, color = Saffron400) },
                                shape = RoundedCornerShape(12.dp),
                                colors = OutlinedTextFieldDefaults.colors(
                                    focusedBorderColor = Saffron500,
                                    unfocusedBorderColor = Slate800,
                                    focusedTextColor = Color.White,
                                    unfocusedTextColor = Color.White
                                ),
                                singleLine = true
                            )
                        }
                    }

                    // Substitutions list
                    items(filteredSubs) { sub ->
                        val calculatedSubstituteAmount = (baseAmountNum * sub.ratioMultiplier).toInt()

                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(16.dp),
                            colors = CardDefaults.cardColors(containerColor = Slate900)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                // Original vs Substitute Title
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = sub.originalIngredient,
                                            style = MaterialTheme.typography.titleSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = CrimsonRed
                                        )
                                        Row(verticalAlignment = Alignment.CenterVertically) {
                                            Icon(imageVector = Icons.Default.ArrowDownward, contentDescription = null, tint = Saffron400, modifier = Modifier.size(16.dp))
                                            Spacer(modifier = Modifier.width(4.dp))
                                            Text(
                                                text = sub.substituteIngredient,
                                                style = MaterialTheme.typography.titleSmall,
                                                fontWeight = FontWeight.Bold,
                                                color = HerbalGreen
                                            )
                                        }
                                    }

                                    // Confidence Stars
                                    Surface(
                                        shape = RoundedCornerShape(8.dp),
                                        color = Saffron500.copy(alpha = 0.15f)
                                    ) {
                                        Row(
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            repeat(sub.confidenceRating) {
                                                Icon(imageVector = Icons.Default.Star, contentDescription = null, tint = Saffron400, modifier = Modifier.size(14.dp))
                                            }
                                        }
                                    }
                                }

                                Spacer(modifier = Modifier.height(10.dp))

                                // Live Calculated Ratio Banner
                                Surface(
                                    shape = RoundedCornerShape(10.dp),
                                    color = Slate800,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(modifier = Modifier.padding(10.dp)) {
                                        Text(
                                            text = "نسبت جایگزینی: ${sub.ratioDescription}",
                                            style = MaterialTheme.typography.labelSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = Saffron300
                                        )
                                        Spacer(modifier = Modifier.height(2.dp))
                                        Text(
                                            text = "برای $baseAmountNum گرم ماده اصلی ⬅ $calculatedSubstituteAmount گرم جایگزین لازم است.",
                                            style = MaterialTheme.typography.labelSmall,
                                            color = HerbalGreen,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.height(10.dp))

                                // Detailed effects
                                Text(
                                    text = "اثر بر بافت: ${sub.textureEffectFa}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate300,
                                    lineHeight = 18.sp
                                )

                                Spacer(modifier = Modifier.height(4.dp))

                                Text(
                                    text = "اثر بر طعم: ${sub.flavorEffectFa}",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Slate300,
                                    lineHeight = 18.sp
                                )

                                if (sub.bakingEffectFa.isNotBlank()) {
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = "تأثیر در پخت و شیرینی‌پزی: ${sub.bakingEffectFa}",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = Slate400,
                                        lineHeight = 18.sp
                                    )
                                }

                                if (sub.limitationsFa.isNotBlank()) {
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = "محدودیت و نکات احتیاطی: ${sub.limitationsFa}",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = SaffronDark,
                                        lineHeight = 16.sp
                                    )
                                }

                                if (sub.allergenAlertFa != null) {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Surface(
                                        shape = RoundedCornerShape(8.dp),
                                        color = HerbalGreen.copy(alpha = 0.15f)
                                    ) {
                                        Row(
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Icon(imageVector = Icons.Default.CheckCircle, contentDescription = null, tint = HerbalGreen, modifier = Modifier.size(14.dp))
                                            Spacer(modifier = Modifier.width(4.dp))
                                            Text(
                                                text = sub.allergenAlertFa,
                                                style = MaterialTheme.typography.labelSmall,
                                                color = HerbalGreen,
                                                fontWeight = FontWeight.Bold
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Dialog for adding new item to inventory
    if (showAddInventoryDialog) {
        var newName by remember { mutableStateOf("") }
        var newAmount by remember { mutableStateOf("1.0") }
        var newUnit by remember { mutableStateOf("کیلوگرم") }
        var newLocation by remember { mutableStateOf("یخچال") }
        var newExpiryDays by remember { mutableStateOf("7") }

        Dialog(onDismissRequest = { showAddInventoryDialog = false }) {
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = Slate900,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Text(
                        text = "افزودن قلم جدید به موجودی",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = Saffron400
                    )

                    OutlinedTextField(
                        value = newName,
                        onValueChange = { newName = it },
                        label = { Text("نام ماده اولیه (مثلاً سینه مرغ)") },
                        modifier = Modifier.fillMaxWidth()
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = newAmount,
                            onValueChange = { newAmount = it },
                            label = { Text("مقدار") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = newUnit,
                            onValueChange = { newUnit = it },
                            label = { Text("واحد") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = newLocation,
                            onValueChange = { newLocation = it },
                            label = { Text("مکان (یخچال/فریزر/انبار)") },
                            modifier = Modifier.weight(1f)
                        )
                        OutlinedTextField(
                            value = newExpiryDays,
                            onValueChange = { newExpiryDays = it },
                            label = { Text("انقضا (روز)") },
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.End
                    ) {
                        TextButton(onClick = { showAddInventoryDialog = false }) {
                            Text("انصراف", color = Slate400)
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Button(
                            onClick = {
                                if (newName.isNotBlank()) {
                                    val amt = newAmount.toDoubleOrNull() ?: 1.0
                                    val exp = newExpiryDays.toIntOrNull() ?: 7
                                    inventoryItems = inventoryItems + InventoryItem(
                                        id = "inv-${System.currentTimeMillis()}",
                                        name = newName.trim(),
                                        amount = amt,
                                        unit = newUnit.trim(),
                                        location = newLocation.trim(),
                                        expirationDays = exp,
                                        isLowStock = false
                                    )
                                    showAddInventoryDialog = false
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                        ) {
                            Text("ثبت در انبار", color = Slate950, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun IngredientChipsFlow(
    items: List<String>,
    selected: Set<String>,
    onToggle: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
        items.chunked(4).forEach { rowItems ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                rowItems.forEach { item ->
                    val isSelected = selected.contains(item)
                    FilterChip(
                        selected = isSelected,
                        onClick = { onToggle(item) },
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
