package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import com.example.data.*
import com.example.services.CalculationEngine
import com.example.services.OkalaPricingService
import com.example.ui.components.*
import com.example.ui.screens.*
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.Saffron400
import com.example.ui.theme.Slate950
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyApplicationTheme {
                CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
                    SmartChefApp()
                }
            }
        }
    }
}

@Composable
fun SmartChefApp() {
    val context = androidx.compose.ui.platform.LocalContext.current
    val repository = remember { RecipeRepository(context) }
    val scope = rememberCoroutineScope()

    var recipes by remember { mutableStateOf<List<Recipe>>(emptyList()) }
    var substitutions by remember { mutableStateOf<List<IngredientSubstitution>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }

    // Navigation and screen states
    var currentTab by remember { mutableStateOf("recipes") }
    var activeRecipe by remember { mutableStateOf<Recipe?>(null) }
    var cookingRecipeWithServings by remember { mutableStateOf<Pair<Recipe, Int>?>(null) }

    // Dialogs state
    var showDedicationDialog by remember { mutableStateOf(false) }
    var showShoppingDialog by remember { mutableStateOf(false) }
    var showAuditDialog by remember { mutableStateOf(false) }

    // Shopping List state
    var shoppingItems by remember { mutableStateOf<List<ShoppingItem>>(emptyList()) }

    // Load data from assets
    LaunchedEffect(Unit) {
        val loadedRecipes = repository.loadRecipes()
        val loadedSubs = repository.loadSubstitutions()
        recipes = loadedRecipes
        substitutions = loadedSubs
        isLoading = false
    }

    // Back handling
    BackHandler(enabled = activeRecipe != null || cookingRecipeWithServings != null) {
        if (cookingRecipeWithServings != null) {
            cookingRecipeWithServings = null
        } else if (activeRecipe != null) {
            activeRecipe = null
        }
    }

    fun addRecipeToShopping(recipe: Recipe, servings: Int) {
        val (scaled, _) = CalculationEngine.scaleRecipe(recipe, servings)
        val newItems = scaled.map { ing ->
            val price = OkalaPricingService.estimatePrice(ing.name, ing.amount, ing.unit)
            ShoppingItem(
                id = "${recipe.id}-${ing.id}-${System.currentTimeMillis()}-${(0..999).random()}",
                name = ing.name,
                neededAmount = ing.amount,
                unit = ing.unit,
                category = ing.category ?: "سایر",
                recipeTitle = recipe.title,
                estimatedPriceToman = price.priceToman,
                okalaSearchUrl = price.okalaSearchUrl
            )
        }
        shoppingItems = shoppingItems + newItems
    }

    if (isLoading) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Slate950),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                CircularProgressIndicator(color = Saffron400)
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "در حال بارگذاری گنجینه آشپزی سرآشپز هوشمند...",
                    style = MaterialTheme.typography.bodyMedium,
                    color = Saffron400
                )
            }
        }
        return
    }

    // Cooking Mode Fullscreen
    if (cookingRecipeWithServings != null) {
        val (recipe, servings) = cookingRecipeWithServings!!
        CookingModeScreen(
            recipe = recipe,
            servings = servings,
            onExit = { cookingRecipeWithServings = null }
        )
        return
    }

    // Recipe Detail Screen
    if (activeRecipe != null) {
        RecipeDetailScreen(
            recipe = activeRecipe!!,
            substitutions = substitutions,
            onBack = { activeRecipe = null },
            onStartCookingMode = { r, s -> cookingRecipeWithServings = Pair(r, s) },
            onAddIngredientsToShoppingList = { r, s -> addRecipeToShopping(r, s) }
        )
        return
    }

    // Main App with Tabs
    Scaffold(
        modifier = Modifier.fillMaxSize(),
        containerColor = Slate950,
        topBar = {
            AppHeader(
                shoppingCount = shoppingItems.count { !it.isPurchased },
                onOpenShopping = { showShoppingDialog = true },
                onOpenAudit = { showAuditDialog = true },
                onOpenDedication = { showDedicationDialog = true }
            )
        },
        bottomBar = {
            AppBottomNav(
                currentTab = currentTab,
                onTabSelected = { tabId ->
                    activeRecipe = null
                    currentTab = tabId
                }
            )
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentTab) {
                "recipes" -> {
                    RecipesScreen(
                        recipes = recipes,
                        onRecipeClick = { activeRecipe = it }
                    )
                }
                "pastry" -> {
                    val pastryList = remember(recipes) {
                        recipes.filter {
                            it.category in listOf("pastry_dry", "pastry_wet", "cake_bakery", "dessert_modern", "halva_traditional", "icecream")
                        }
                    }
                    PastryStudioScreen(
                        pastryRecipes = pastryList,
                        onRecipeClick = { activeRecipe = it }
                    )
                }
                "health" -> {
                    HealthClinicScreen()
                }
                "planner" -> {
                    MealPlannerScreen(
                        recipes = recipes,
                        onRecipeClick = { activeRecipe = it },
                        onAddWeeklyToShoppingList = {
                            recipes.take(7).forEach { r -> addRecipeToShopping(r, 4) }
                            showShoppingDialog = true
                        }
                    )
                }
                "fridge" -> {
                    FridgeChefScreen(
                        recipes = recipes,
                        onRecipeClick = { activeRecipe = it }
                    )
                }
                "assistant" -> {
                    AIChefChatScreen()
                }
            }
        }
    }

    // Dialogs
    if (showDedicationDialog) {
        OpeningDedicationDialog(onDismiss = { showDedicationDialog = false })
    }

    if (showShoppingDialog) {
        ShoppingListDialog(
            items = shoppingItems,
            onTogglePurchased = { itemId ->
                shoppingItems = shoppingItems.map {
                    if (it.id == itemId) it.copy(isPurchased = !it.isPurchased) else it
                }
            },
            onRemoveItem = { itemId ->
                shoppingItems = shoppingItems.filter { it.id != itemId }
            },
            onClearAll = { shoppingItems = emptyList() },
            onDismiss = { showShoppingDialog = false }
        )
    }

    if (showAuditDialog) {
        SpecificationAuditDialog(
            recipes = recipes,
            onDismiss = { showAuditDialog = false }
        )
    }
}
