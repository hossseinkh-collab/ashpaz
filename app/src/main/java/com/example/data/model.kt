package com.example.data

data class IngredientItem(
    val id: String,
    val name: String,
    val amount: Double,
    val unit: String,
    val unitWeightInGrams: Double? = null,
    val approxCostPer100g: Double? = null,
    val category: String? = null,
    val allergens: List<String> = emptyList(),
    val notes: String? = null
)

data class RecipeStep(
    val stepNumber: Int,
    val title: String,
    val instruction: String,
    val durationMinutes: Int? = null,
    val hasTimer: Boolean = false,
    val temperatureC: Int? = null,
    val proTip: String? = null
)

data class Recipe(
    val id: String,
    val title: String,
    val persianSubtitle: String? = null,
    val category: String,
    val categoryNameFa: String,
    val image: String,
    val description: String,
    val prepTimeMinutes: Int,
    val cookTimeMinutes: Int,
    val baseServings: Int,
    val difficulty: String = "medium",
    val difficultyFa: String = "متوسط",
    val caloriesPerServing: Int = 450,
    val proteinGrams: Double = 25.0,
    val carbsGrams: Double = 40.0,
    val fatGrams: Double = 20.0,
    val fiberGrams: Double = 5.0,
    val dietaryTags: List<String> = emptyList(),
    val allergens: List<String> = emptyList(),
    val originRegion: String = "ایران",
    val originProvince: String? = null,
    val ingredients: List<IngredientItem> = emptyList(),
    val steps: List<RecipeStep> = emptyList(),
    val goldenTips: List<String> = emptyList()
)

data class IngredientSubstitution(
    val originalIngredient: String,
    val substituteIngredient: String,
    val ratioDescription: String,
    val ratioMultiplier: Double = 1.0,
    val textureEffectFa: String = "",
    val flavorEffectFa: String = "",
    val bakingEffectFa: String = "",
    val limitationsFa: String = "",
    val confidenceRating: Int = 5,
    val allergenAlertFa: String? = null
)

data class ShoppingItem(
    val id: String,
    val name: String,
    val neededAmount: Double,
    val unit: String,
    val isPurchased: Boolean = false,
    val category: String = "سایر",
    val recipeTitle: String? = null,
    val estimatedPriceToman: Long = 0L,
    val okalaSearchUrl: String = ""
)

data class InventoryItem(
    val id: String,
    val name: String,
    val amount: Double,
    val unit: String,
    val location: String = "یخچال", // یخچال, فریزر, انبار
    val expirationDays: Int = 7,
    val isLowStock: Boolean = false
)

data class MealPlanSlot(
    val dayNameFa: String, // شنبه تا جمعه
    val dayIndex: Int, // 0 to 6
    val breakfastRecipeId: String? = null,
    val breakfastLocked: Boolean = false,
    val lunchRecipeId: String? = null,
    val lunchLocked: Boolean = false,
    val dinnerRecipeId: String? = null,
    val dinnerLocked: Boolean = false
)

data class WeightRecord(
    val id: String,
    val dateShamsi: String,
    val weightKg: Double,
    val note: String = ""
)

data class CakeCalculationResult(
    val scaleFactor: Double,
    val rawBatterWeightGrams: Int,
    val bakedSpongeWeightGrams: Int,
    val creamFillingWeightGrams: Int,
    val totalFinishedWeightGrams: Int,
    val servingsCount: Int,
    val recommendedPanDiameterCm: Int,
    val recommendedBakeTempC: Int,
    val recommendedBakeTimeMinutes: Int,
    val ingredients: List<CakeIngredientDisplay>,
    val notes: List<String>
)

data class CakeIngredientDisplay(
    val name: String,
    val amountGrams: Double,
    val bakersPercentage: Double
)

data class TestResult(
    val testId: String,
    val title: String,
    val status: String, // PASSED, FAILED
    val executionTimeMs: Long,
    val details: String
)
