package com.example.services

import com.example.data.*
import kotlin.math.PI
import kotlin.math.max
import kotlin.math.pow
import kotlin.math.roundToInt

object CalculationEngine {

    fun normalizeToGramsOrMl(
        amount: Double,
        unit: String,
        unitWeightInGrams: Double? = null,
        ingredientName: String = ""
    ): Pair<Double, String> {
        val safeAmount = max(0.0, amount)
        val name = ingredientName.lowercase()

        return when (unit.lowercase()) {
            "kg" -> Pair(safeAmount * 1000.0, "mass")
            "g" -> Pair(safeAmount, "mass")
            "liter", "l" -> Pair(safeAmount * 1000.0, "volume")
            "ml" -> Pair(safeAmount, "volume")
            "cup" -> {
                when {
                    name.contains("آرد") || name.contains("پودر قند") || name.contains("نشاسته") ->
                        Pair(safeAmount * 125.0, "mass")
                    name.contains("شکر") || name.contains("برنج") || name.contains("عدس") || name.contains("لوبیا") || name.contains("نخود") ->
                        Pair(safeAmount * 200.0, "mass")
                    name.contains("سبزی") ->
                        Pair(safeAmount * 70.0, "mass")
                    else ->
                        Pair(safeAmount * 240.0, "volume")
                }
            }
            "tbsp" -> Pair(safeAmount * 15.0, "volume")
            "tsp" -> Pair(safeAmount * 5.0, "volume")
            "pcs" -> {
                if (unitWeightInGrams != null && unitWeightInGrams > 0) {
                    Pair(safeAmount * unitWeightInGrams, "count")
                } else {
                    when {
                        name.contains("سیر") || name.contains("حبه") -> Pair(safeAmount * 6.0, "count")
                        name.contains("تخم") -> Pair(safeAmount * 55.0, "count")
                        name.contains("پیاز") -> Pair(safeAmount * 100.0, "count")
                        name.contains("سیب‌زمینی") || name.contains("سیب زمینی") -> Pair(safeAmount * 120.0, "count")
                        name.contains("گوجه") -> Pair(safeAmount * 100.0, "count")
                        name.contains("بادمجان") -> Pair(safeAmount * 150.0, "count")
                        else -> Pair(safeAmount * 50.0, "count")
                    }
                }
            }
            else -> Pair(safeAmount, "mass")
        }
    }

    fun formatMeasurement(amount: Double, unit: String): String {
        val safeAmount = max(0.0, amount)
        if (unit == "g" && safeAmount >= 1000.0) {
            val inKg = safeAmount / 1000.0
            val formatted = if (inKg % 1.0 == 0.0) inKg.toInt().toString() else String.format("%.2f", inKg)
            return "$formatted کیلوگرم"
        }
        if (unit == "ml" && safeAmount >= 1000.0) {
            val inL = safeAmount / 1000.0
            val formatted = if (inL % 1.0 == 0.0) inL.toInt().toString() else String.format("%.2f", inL)
            return "$formatted لیتر"
        }

        val unitMapFa = mapOf(
            "g" to "گرم",
            "kg" to "کیلوگرم",
            "ml" to "میلی‌لیتر",
            "liter" to "لیتر",
            "cup" to "پیمانه",
            "tbsp" to "قاشق غذاخوری",
            "tsp" to "قاشق چای‌خوری",
            "pcs" to "عدد"
        )

        val formattedNum = if (safeAmount % 1.0 == 0.0) {
            safeAmount.toInt().toString()
        } else if (safeAmount >= 10.0) {
            String.format("%.1f", safeAmount)
        } else {
            String.format("%.2f", safeAmount)
        }

        return "$formattedNum ${unitMapFa[unit] ?: unit}"
    }

    fun scaleRecipe(recipe: Recipe, targetServings: Int): Pair<List<IngredientItem>, Double> {
        val base = max(1, recipe.baseServings)
        val target = max(1, targetServings)
        val scaleFactor = target.toDouble() / base.toDouble()

        val scaled = recipe.ingredients.map { ing ->
            val newAmount = (ing.amount * scaleFactor * 100.0).roundToInt() / 100.0
            ing.copy(amount = newAmount)
        }
        return Pair(scaled, scaleFactor)
    }

    fun calculateCake(
        cakeType: String, // sponge, chiffon, chocolate, carrot
        mode: String, // by_weight, by_servings, by_pan_size
        targetWeightKg: Double = 1.0,
        servings: Int = 10,
        panShape: String = "round",
        panDiameterCm: Int = 20,
        panWidthCm: Int = 20,
        panLengthCm: Int = 30,
        frostingLevel: String = "medium" // light, medium, heavy
    ): CakeCalculationResult {
        val basePanArea = PI * (20.0 / 2.0).pow(2) // 314.16 cm2
        var targetFinishedGrams = 1000

        when (mode) {
            "by_weight" -> targetFinishedGrams = max(300, (targetWeightKg * 1000.0).roundToInt())
            "by_servings" -> targetFinishedGrams = max(300, servings * 130)
            "by_pan_size" -> {
                val targetArea = when (panShape) {
                    "round" -> PI * (panDiameterCm.toDouble() / 2.0).pow(2)
                    "square" -> panDiameterCm.toDouble().pow(2)
                    else -> panWidthCm.toDouble() * panLengthCm.toDouble()
                }
                val areaRatio = targetArea / basePanArea
                targetFinishedGrams = (1200.0 * areaRatio).roundToInt()
            }
        }

        var spongeRatio = 0.50
        var creamRatio = 0.50
        when (frostingLevel) {
            "light" -> { spongeRatio = 0.62; creamRatio = 0.38 }
            "heavy" -> { spongeRatio = 0.40; creamRatio = 0.60 }
            else -> { spongeRatio = 0.50; creamRatio = 0.50 }
        }

        val bakedSpongeGrams = (targetFinishedGrams * spongeRatio).roundToInt()
        val creamGrams = (targetFinishedGrams * creamRatio).roundToInt()
        // 11% moisture loss during baking
        val rawBatterGrams = (bakedSpongeGrams / 0.89).roundToInt()

        val scaleFactor = rawBatterGrams.toDouble() / 580.0

        val flourGrams = (150.0 * scaleFactor).roundToInt().toDouble()
        val sugarGrams = (150.0 * scaleFactor).roundToInt().toDouble()
        val eggCount = max(2.0, (6.0 * scaleFactor * 10.0).roundToInt() / 10.0)
        val oilGrams = if (cakeType == "chiffon" || cakeType == "carrot") (50.0 * scaleFactor).roundToInt().toDouble() else 0.0
        val milkGrams = if (cakeType == "chiffon") (40.0 * scaleFactor).roundToInt().toDouble() else 0.0
        val bpGrams = (6.0 * scaleFactor).roundToInt().toDouble()
        val vanillaGrams = (3.0 * scaleFactor).roundToInt().toDouble()

        val ingredients = mutableListOf(
            CakeIngredientDisplay("آرد شیرینی‌پزی (الک‌شده ۳ بار)", flourGrams, 100.0),
            CakeIngredientDisplay("شکر سفید دانه‌ریز", sugarGrams, 100.0),
            CakeIngredientDisplay("تخم‌مرغ تازه به دمای محیط (دانه)", eggCount, 200.0),
            CakeIngredientDisplay("بکینگ‌پودر مرغوب", bpGrams, 4.0),
            CakeIngredientDisplay("وانیل خالص", vanillaGrams, 2.0)
        )

        if (oilGrams > 0) ingredients.add(CakeIngredientDisplay("روغن مایع پخت‌وپز", oilGrams, 33.0))
        if (milkGrams > 0) ingredients.add(CakeIngredientDisplay("شیر ولرم", milkGrams, 27.0))
        ingredients.add(CakeIngredientDisplay("خامه قنادی فرم‌گرفته / فیلینگ", creamGrams.toDouble(), 100.0))

        val recommendedDiameter = when {
            rawBatterGrams <= 400 -> 16
            rawBatterGrams <= 650 -> 20
            rawBatterGrams <= 950 -> 24
            rawBatterGrams <= 1400 -> 28
            else -> 32
        }

        val bakeTime = when {
            rawBatterGrams <= 400 -> 30
            rawBatterGrams <= 650 -> 40
            rawBatterGrams <= 950 -> 48
            else -> 55
        }

        val notes = listOf(
            "دمای فر روی ۱۷۵ درجه سانتی‌گراد فر برقی یا ۱۸۰ درجه سانتی‌گراد فر گازی تنظیم شود.",
            "کف قالب کاغذ روغنی انداخته شود و دیواره‌ها چرب نشود تا پف کیک نخوابد.",
            "تا ۳۰ دقیقه اول به هیچ عنوان درب فر باز نشود."
        )

        return CakeCalculationResult(
            scaleFactor = scaleFactor,
            rawBatterWeightGrams = rawBatterGrams,
            bakedSpongeWeightGrams = bakedSpongeGrams,
            creamFillingWeightGrams = creamGrams,
            totalFinishedWeightGrams = targetFinishedGrams,
            servingsCount = (targetFinishedGrams / 130.0).roundToInt(),
            recommendedPanDiameterCm = recommendedDiameter,
            recommendedBakeTempC = 175,
            recommendedBakeTimeMinutes = bakeTime,
            ingredients = ingredients,
            notes = notes
        )
    }

    fun matchRecipesWithPantry(
        recipes: List<Recipe>,
        availableIngredientNames: Set<String>
    ): List<Pair<Recipe, Int>> {
        if (availableIngredientNames.isEmpty()) return emptyList()

        val results = mutableListOf<Pair<Recipe, Int>>()

        for (recipe in recipes) {
            if (recipe.ingredients.isEmpty()) continue
            var matchedCount = 0
            for (ing in recipe.ingredients) {
                val ingName = ing.name.lowercase()
                val isMatched = availableIngredientNames.any { available ->
                    val cleanAvail = available.trim().lowercase()
                    ingName.contains(cleanAvail) || cleanAvail.contains(ingName)
                }
                if (isMatched) matchedCount++
            }
            val matchPercentage = ((matchedCount.toDouble() / recipe.ingredients.size.toDouble()) * 100).roundToInt()
            if (matchPercentage > 15) {
                results.add(Pair(recipe, matchPercentage))
            }
        }

        return results.sortedByDescending { it.second }
    }
}
