package com.example.data

import android.content.Context
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject

class RecipeRepository(private val context: Context) {

    private var cachedRecipes: List<Recipe> = emptyList()
    private var cachedSubstitutions: List<IngredientSubstitution> = emptyList()

    suspend fun loadRecipes(): List<Recipe> = withContext(Dispatchers.IO) {
        if (cachedRecipes.isNotEmpty()) return@withContext cachedRecipes

        val recipesList = mutableListOf<Recipe>()
        try {
            val jsonString = context.assets.open("recipes.json").bufferedReader().use { it.readText() }
            val jsonArray = JSONArray(jsonString)

            for (i in 0 until jsonArray.length()) {
                val obj = jsonArray.getJSONObject(i)
                val id = obj.optString("id", "recipe-$i")
                val title = obj.optString("title", "")
                val persianSubtitle = obj.optString("persianSubtitle", null)
                val category = obj.optString("category", "iranian_traditional")
                val categoryNameFa = obj.optString("categoryNameFa", "غذاهای اصیل ایرانی")
                val image = obj.optString("image", "")
                val description = obj.optString("description", "")
                val prepTime = obj.optInt("prepTimeMinutes", 30)
                val cookTime = obj.optInt("cookTimeMinutes", 60)
                val baseServings = obj.optInt("baseServings", 4)
                val difficulty = obj.optString("difficulty", "medium")
                val difficultyFa = obj.optString("difficultyFa", "متوسط")
                val calories = obj.optInt("caloriesPerServing", 450)
                val protein = obj.optDouble("proteinGrams", 25.0)
                val carbs = obj.optDouble("carbsGrams", 40.0)
                val fat = obj.optDouble("fatGrams", 20.0)
                val fiber = obj.optDouble("fiberGrams", 4.0)
                val originRegion = obj.optString("originRegion", "سرتاسر ایران")
                val originProvince = if (obj.has("originProvince")) obj.optString("originProvince") else null

                // Parse ingredients
                val ingredientsList = mutableListOf<IngredientItem>()
                val ingArray = obj.optJSONArray("ingredients")
                if (ingArray != null) {
                    for (j in 0 until ingArray.length()) {
                        val ingObj = ingArray.getJSONObject(j)
                        val ingId = ingObj.optString("id", "$id-ing-$j")
                        val name = ingObj.optString("name", "")
                        val amount = ingObj.optDouble("amount", 1.0)
                        val unit = ingObj.optString("unit", "g")
                        val unitWeight = if (ingObj.has("unitWeightInGrams")) ingObj.optDouble("unitWeightInGrams") else null
                        val cost100 = if (ingObj.has("approxCostPer100g")) ingObj.optDouble("approxCostPer100g") else null
                        val cat = ingObj.optString("category", null)
                        val notes = ingObj.optString("notes", null)

                        ingredientsList.add(
                            IngredientItem(
                                id = ingId,
                                name = name,
                                amount = amount,
                                unit = unit,
                                unitWeightInGrams = unitWeight,
                                approxCostPer100g = cost100,
                                category = cat,
                                notes = notes
                            )
                        )
                    }
                }

                // Parse steps
                val stepsList = mutableListOf<RecipeStep>()
                val stepArray = obj.optJSONArray("steps")
                if (stepArray != null) {
                    for (j in 0 until stepArray.length()) {
                        val sObj = stepArray.getJSONObject(j)
                        val stepNum = sObj.optInt("stepNumber", j + 1)
                        val sTitle = sObj.optString("title", "مرحله ${j + 1}")
                        val instr = sObj.optString("instruction", "")
                        val duration = if (sObj.has("durationMinutes")) sObj.optInt("durationMinutes") else null
                        val hasTimer = sObj.optBoolean("hasTimer", duration != null && duration > 0)
                        val tempC = if (sObj.has("temperatureC")) sObj.optInt("temperatureC") else null
                        val proTip = if (sObj.has("proTip")) sObj.optString("proTip") else null

                        stepsList.add(
                            RecipeStep(
                                stepNumber = stepNum,
                                title = sTitle,
                                instruction = instr,
                                durationMinutes = duration,
                                hasTimer = hasTimer,
                                temperatureC = tempC,
                                proTip = proTip
                            )
                        )
                    }
                }

                // Parse golden tips
                val tipsList = mutableListOf<String>()
                val tipsArray = obj.optJSONArray("goldenTips")
                if (tipsArray != null) {
                    for (j in 0 until tipsArray.length()) {
                        tipsList.add(tipsArray.getString(j))
                    }
                }

                // Parse allergens
                val allergensList = mutableListOf<String>()
                val algArray = obj.optJSONArray("allergens")
                if (algArray != null) {
                    for (j in 0 until algArray.length()) {
                        allergensList.add(algArray.getString(j))
                    }
                }

                // Parse dietary tags
                val tagsList = mutableListOf<String>()
                val tagsArray = obj.optJSONArray("dietaryTags")
                if (tagsArray != null) {
                    for (j in 0 until tagsArray.length()) {
                        tagsList.add(tagsArray.getString(j))
                    }
                }

                recipesList.add(
                    Recipe(
                        id = id,
                        title = title,
                        persianSubtitle = persianSubtitle,
                        category = category,
                        categoryNameFa = categoryNameFa,
                        image = image,
                        description = description,
                        prepTimeMinutes = prepTime,
                        cookTimeMinutes = cookTime,
                        baseServings = baseServings,
                        difficulty = difficulty,
                        difficultyFa = difficultyFa,
                        caloriesPerServing = calories,
                        proteinGrams = protein,
                        carbsGrams = carbs,
                        fatGrams = fat,
                        fiberGrams = fiber,
                        dietaryTags = tagsList,
                        allergens = allergensList,
                        originRegion = originRegion,
                        originProvince = originProvince,
                        ingredients = ingredientsList,
                        steps = stepsList,
                        goldenTips = tipsList
                    )
                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        val result = if (recipesList.isEmpty()) getFallbackRecipes() else recipesList
        cachedRecipes = result
        result
    }

    private fun getFallbackRecipes(): List<Recipe> {
        return listOf(
            Recipe(
                id = "ghormeh-sabzi",
                title = "قورمه‌سبزی جاافتاده مجلسی",
                persianSubtitle = "شاهکار سنتی با سبزی سرخ‌شده اصیل، لیمو عمانی و روغن انداختن طبیعی",
                category = "iranian_traditional",
                categoryNameFa = "غذاهای اصیل ایرانی",
                image = "/recipes/ghormeh-sabzi.jpg",
                description = "خورش قورمه‌سبزی با گوشت گوسفندی مغز ران، سبزی معطر سرخ‌شده با حرارت ملایم، لوبیای قرمز یا چیتی و لیمو عمانی دست‌چین.",
                prepTimeMinutes = 45,
                cookTimeMinutes = 210,
                baseServings = 4,
                caloriesPerServing = 520,
                proteinGrams = 38.0,
                carbsGrams = 28.0,
                fatGrams = 26.0,
                fiberGrams = 5.0,
                originRegion = "سرتاسر ایران",
                ingredients = listOf(
                    IngredientItem(id = "ing-1", name = "گوشت ران یا سردست گوسفندی با استخوان", amount = 500.0, unit = "g", approxCostPer100g = 75000.0, category = "protein"),
                    IngredientItem(id = "ing-2", name = "سبزی قورمه (تره، جعفری، گشنیز، اسفناج، شنبلیله)", amount = 600.0, unit = "g", approxCostPer100g = 12000.0, category = "vegetable"),
                    IngredientItem(id = "ing-3", name = "لوبیا قرمز یا چیتی مرغوب", amount = 150.0, unit = "g", approxCostPer100g = 18000.0, category = "flour_grain"),
                    IngredientItem(id = "ing-4", name = "پیاز متوسط نگینی ریز", amount = 2.0, unit = "pcs", unitWeightInGrams = 100.0, category = "vegetable"),
                    IngredientItem(id = "ing-5", name = "لیمو عمانی سوراخ‌شده و تلخی‌گرفته", amount = 4.0, unit = "pcs", unitWeightInGrams = 8.0, category = "spice_seasoning")
                ),
                steps = listOf(
                    RecipeStep(stepNumber = 1, title = "خیساندن لوبیا", instruction = "لوبیا قرمز را از شب قبل خیسانده و ۲ بار آب آن را عوض کنید.", durationMinutes = 10),
                    RecipeStep(stepNumber = 2, title = "تفت دادن گوشت و پیاز", instruction = "پیاز نگینی را با زردچوبه تفت دهید تا طلایی شود، سپس گوشت را اضافه کرده و خوب تفت دهید.", durationMinutes = 15),
                    RecipeStep(stepNumber = 3, title = "سرخ کردن سبزی قورمه", instruction = "سبزی را با حرارت ملایم و روغن کافی سرخ کنید تا تیره و خوش‌عطر شود.", durationMinutes = 25),
                    RecipeStep(stepNumber = 4, title = "پخت خورش و جا افتادن", instruction = "لوبیا و آب جوش را اضافه کرده، درب قابلمه را بگذارید و با شعله ملایم اجازه دهید خورش جا بیفتد.", durationMinutes = 150)
                ),
                goldenTips = listOf(
                    "افزودن چند تکه یخ در ۱۰ دقیقه پایانی باعث روغن انداختن سریع خورش می‌شود.",
                    "لیمو عمانی‌ها را حتماً نیم ساعت قبل در آب جوش بخیسانید تا تلخی آن گرفته شود."
                )
            ),
            Recipe(
                id = "zereshk-polo-morgh",
                title = "زرشک‌پلو با مرغ مجلسی",
                persianSubtitle = "مرغ زعفرانی طلایی با زرشک پفکی اعلا و عطر هل و گلاب",
                category = "iranian_traditional",
                categoryNameFa = "غذاهای اصیل ایرانی",
                image = "/recipes/zereshk-polo-morgh.jpg",
                description = "زرشک‌پلو با سس غلیظ مرغ، زعفران قائنات دم‌کشیده و برنج طارم دودی دون.",
                prepTimeMinutes = 30,
                cookTimeMinutes = 90,
                baseServings = 4,
                caloriesPerServing = 580,
                proteinGrams = 42.0,
                carbsGrams = 62.0,
                fatGrams = 18.0,
                fiberGrams = 3.0,
                originRegion = "سرتاسر ایران",
                ingredients = listOf(
                    IngredientItem(id = "zp-1", name = "ران یا سینه مرغ تازه", amount = 800.0, unit = "g", category = "protein"),
                    IngredientItem(id = "zp-2", name = "برنج ایرانی طارم", amount = 4.0, unit = "cup", category = "flour_grain"),
                    IngredientItem(id = "zp-3", name = "زرشک اعلای پفکی", amount = 1.0, unit = "cup", category = "vegetable"),
                    IngredientItem(id = "zp-4", name = "زعفران دم‌کرده غلیظ", amount = 3.0, unit = "tbsp", category = "spice_seasoning")
                ),
                steps = listOf(
                    RecipeStep(stepNumber = 1, title = "سرخ کردن مرغ", instruction = "تکه‌های مرغ را با زعفران، فلفل سیاه و زردچوبه در روغن تفت دهید تا طلایی شوند.", durationMinutes = 15),
                    RecipeStep(stepNumber = 2, title = "تهیه سس و پخت مرغ", instruction = "رب گوجه، پیازداغ و ادویه‌ها را تفت داده، آب جوش اضافه کنید و مرغ‌ها را بپزید.", durationMinutes = 60),
                    RecipeStep(stepNumber = 3, title = "تفت دادن زرشک", instruction = "زرشک را با کمی کره، شکر و گلاب ۱ دقیقه تفت دهید تا براق شود.", durationMinutes = 5)
                ),
                goldenTips = listOf(
                    "زرشک را روی حرارت ملایم تفت دهید؛ حرارت بالا باعث سوختن و تلخ شدن شکر می‌شود."
                )
            )
        )
    }

    suspend fun loadSubstitutions(): List<IngredientSubstitution> = withContext(Dispatchers.IO) {
        if (cachedSubstitutions.isNotEmpty()) return@withContext cachedSubstitutions

        val subsList = mutableListOf<IngredientSubstitution>()
        try {
            val jsonString = context.assets.open("substitutions.json").bufferedReader().use { it.readText() }
            val jsonArray = JSONArray(jsonString)

            for (i in 0 until jsonArray.length()) {
                val obj = jsonArray.getJSONObject(i)
                subsList.add(
                    IngredientSubstitution(
                        originalIngredient = obj.optString("originalIngredient", ""),
                        substituteIngredient = obj.optString("substituteIngredient", ""),
                        ratioDescription = obj.optString("ratioDescription", ""),
                        ratioMultiplier = obj.optDouble("ratioMultiplier", 1.0),
                        textureEffectFa = obj.optString("textureEffectFa", ""),
                        flavorEffectFa = obj.optString("flavorEffectFa", ""),
                        bakingEffectFa = obj.optString("bakingEffectFa", ""),
                        limitationsFa = obj.optString("limitationsFa", ""),
                        confidenceRating = obj.optInt("confidenceRating", 5),
                        allergenAlertFa = if (obj.has("allergenAlertFa")) obj.optString("allergenAlertFa") else null
                    )
                )
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }

        cachedSubstitutions = subsList
        subsList
    }
}
