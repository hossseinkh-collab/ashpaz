package com.example.services

import kotlin.math.max
import kotlin.math.roundToInt

data class HealthMetrics(
    val bmi: Double,
    val bmiCategoryFa: String,
    val bmiColorHex: Long,
    val bmrCalories: Int,
    val tdeeCalories: Int,
    val targetDailyCalories: Int,
    val targetProteinGrams: Int,
    val targetCarbsGrams: Int,
    val targetFatGrams: Int,
    val safeFloorCalories: Int
)

data class DietMealItem(
    val mealTypeFa: String,
    val dishTitle: String,
    val portionSpoonsFa: String,
    val calories: Int,
    val proteinGrams: Int,
    val tipFa: String
)

data class DayDietPlan(
    val dayTitleFa: String,
    val breakfast: DietMealItem,
    val lunch: DietMealItem,
    val dinner: DietMealItem,
    val totalCalories: Int
)

object HealthService {

    fun calculateMetrics(
        gender: String, // "male", "female"
        age: Int,
        heightCm: Int,
        weightKg: Double,
        activityLevel: String, // "sedentary", "light", "moderate", "active", "very_active"
        goal: String // "weight_loss", "maintenance", "muscle_gain"
    ): HealthMetrics {
        val heightM = heightCm / 100.0
        val bmi = (weightKg / (heightM * heightM) * 10.0).roundToInt() / 10.0

        val (bmiCat, bmiColor) = when {
            bmi < 18.5 -> Pair("کمبود وزن (لاغر)", 0xFFF59E0BL)
            bmi in 18.5..24.9 -> Pair("وزن طبیعی و ایده‌آل", 0xFF10B981L)
            bmi in 25.0..29.9 -> Pair("اضافه وزن ملایم", 0xFFF59E0BL)
            else -> Pair("چاقی (نیازمند اصلاح برنامه غذایی)", 0xFFEF4444L)
        }

        // Mifflin-St Jeor
        var bmr = if (gender == "male") {
            (10.0 * weightKg + 6.25 * heightCm - 5.0 * age + 5.0).roundToInt()
        } else {
            (10.0 * weightKg + 6.25 * heightCm - 5.0 * age - 161.0).roundToInt()
        }
        bmr = max(1000, bmr)

        val activityMultiplier = when (activityLevel) {
            "sedentary" -> 1.2
            "light" -> 1.375
            "moderate" -> 1.55
            "active" -> 1.725
            "very_active" -> 1.9
            else -> 1.4
        }

        val tdee = (bmr * activityMultiplier).roundToInt()

        val safeFloor = if (gender == "male") 1500 else 1200
        var targetDaily = when (goal) {
            "weight_loss" -> max(safeFloor, tdee - 500)
            "muscle_gain" -> tdee + 350
            else -> tdee
        }

        val proteinPerKg = if (goal == "muscle_gain") 2.0 else 1.6
        val targetProtein = (weightKg * proteinPerKg).roundToInt()
        val fatCalories = targetDaily * 0.28
        val targetFat = (fatCalories / 9.0).roundToInt()
        val remainingCal = targetDaily - (targetProtein * 4 + targetFat * 9)
        val targetCarbs = max(50, (remainingCal / 4.0).roundToInt())

        return HealthMetrics(
            bmi = bmi,
            bmiCategoryFa = bmiCat,
            bmiColorHex = bmiColor,
            bmrCalories = bmr,
            tdeeCalories = tdee,
            targetDailyCalories = targetDaily,
            targetProteinGrams = targetProtein,
            targetCarbsGrams = targetCarbs,
            targetFatGrams = targetFat,
            safeFloorCalories = safeFloor
        )
    }

    fun generateWeeklySpoonDiet(targetCalories: Int): List<DayDietPlan> {
        val days = listOf("شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه")
        val breakfastOptions = listOf(
            Triple("املت گوجه‌فرنگی و تخم‌مرغ", "۲ کف دست نان سنگک + املت با ۲ عدد تخم‌مرغ و سبزی خوردن", 380),
            Triple("پنیر تبریز و گردو و چای شیرین", "۲ کف دست نان بربری + ۳۰ گرم پنیر + ۲ عدد مغز گردو", 340),
            Triple("اوتمیل جو دوسر با شیر و دارچین", "۵ قاشق غذاخوری جو دوسر پرک + ۱ لیوان شیر کم‌چرب + ۱ قاشق عسل", 360),
            Triple("تخم‌مرغ آب‌پز و زیتون", "۲ عدد تخم‌مرغ آب‌پز + ۱ کف دست نان تافتون + ۵ عدد زیتون", 320),
            Triple("عدسی سنتی خوش‌عطر", "۱ کاسه متوسط عدسی با کمی لیموترش و گلپر + ۱ کف دست نان سنگک", 370)
        )

        val lunchOptions = listOf(
            Triple("زرشک‌پلو با سینه مرغ زعفرانی", "۸ قاشق غذاخوری برنج کته بدون روغن اضافه + ۱۵۰ گرم سینه مرغ + سالاد شیرازی", 550),
            Triple("خورش قورمه‌سبزی کم‌چرب", "۷ قاشق غذاخوری برنج + ۱ کاسه خورش با ۴ تکه گوشت لخم گوسفندی و سبزی فراوان", 580),
            Triple("عدس‌پلو با گوشت قلقلی و کشمش", "۸ قاشق غذاخوری عدس‌پلو + ۱۰۰ گرم گوشت چرخ‌کرده کم‌چرب + ماست و خیار", 590),
            Triple("جوجه‌کباب ماستی با گوجه", "۲۵۰ گرم جوجه‌کباب با ۲ کف دست نان یا ۶ قاشق برنج کته + سبزی خوردن", 520),
            Triple("خورش قیمه بادمجان بدون روغن", "۷ قاشق غذاخوری برنج + ۱ کاسه خورش قیمه با بادمجان کبابی یا هواپز", 540)
        )

        val dinnerOptions = listOf(
            Triple("فیله مرغ گریل با سبزیجات بخارپز", "۱۵۰ گرم فیله مرغ گریل + ۱ بشقاب کلم بروکلی، هویج و قارچ تفت‌داده با روغن زیتون", 380),
            Triple("خوراک لوبیاچیتی و قارچ", "۱ کاسه متوسط خوراک لوبیا قارچ خانگی با آبلیموی تازه + ۱ کف دست نان", 390),
            Triple("سالاد سزار خانگی رژیمی", "کاهو فرانسوی + ۱۲۰ گرم فیله مرغ کبابی + سس ماست و سیر و لیمو (بدون مایونز)", 360),
            Triple("کوکو سبزی در فر (کم‌روغن)", "۲ برش کوکو سبزی پخته در فر با گردو و زرشک + سالاد کاهو", 350),
            Triple("سوپ جو مجلسی با فیله مرغ", "۲ ملاقه سوپ جو پرملات با مرغ ریش‌شده و هویج و جعفری تازه", 330)
        )

        return days.mapIndexed { index, day ->
            val b = breakfastOptions[index % breakfastOptions.size]
            val l = lunchOptions[index % lunchOptions.size]
            val d = dinnerOptions[index % dinnerOptions.size]
            val total = b.third + l.third + d.third

            DayDietPlan(
                dayTitleFa = day,
                breakfast = DietMealItem("صبحانه", b.first, b.second, b.third, 18, "صبحانه را تا ۱ ساعت پس از بیداری میل کنید."),
                lunch = DietMealItem("ناهار", l.first, l.second, l.third, 35, "قبل از ناهار یک لیوان آب همراه با سالاد میل شود."),
                dinner = DietMealItem("شام", d.first, d.second, d.third, 28, "شام حداقل ۳ ساعت قبل از خواب مصرف شود."),
                totalCalories = total
            )
        }
    }
}
