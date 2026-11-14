package com.example.services

import com.example.data.ProvinceCoverage
import com.example.data.Recipe

object IranianCulinaryGeographyService {

    val PROVINCES_DATA: List<ProvinceCoverage> = listOf(
        ProvinceCoverage("گیلان", "رشت (شهر خلاق خوراک‌شناسی یونسکو)", 24, listOf("میرزاقاسمی", "باقلاقاتوق", "مرغ ترش", "فسنجان گیلکی", "ترش تره", "اناربیج", "کال کباب")),
        ProvinceCoverage("مازندران", "ساری", 18, listOf("مالابیج", "مرغ شکم‌پر", "کدو بره", "اسپناساک", "نازخاتون", "خورش ناردون")),
        ProvinceCoverage("آذربایجان شرقی", "تبریز", 20, listOf("کوفته تبریزی", "خورش هویج", "دلمه برگ مو", "آش اوماج", "خشیل تبریزی")),
        ProvinceCoverage("آذربایجان غربی", "ارومیه", 12, listOf("گشنیز کباب", "یرالما یومورتا", "گوزلمه", "یتیمچه ارومیه", "آش کلم")),
        ProvinceCoverage("اردبیل", "اردبیل", 14, listOf("پیچاق قیمه", "باسترما پلو", "آش دوغ اردبیل", "خشیل", "قیساوا")),
        ProvinceCoverage("اصفهان", "اصفهان", 22, listOf("بریانی اصفهان", "خورش ماست", "کله‌جوش", "قیمه ریزه نخودچی", "شله بریان")),
        ProvinceCoverage("فارس", "شیراز", 19, listOf("کلم‌پلو شیرازی با کوفته قلقلی", "دوپیازه آلو", "آش سبزی شیراز", "دمپختک عدس و کلم", "حلوای کاسه")),
        ProvinceCoverage("خوزستان", "اهواز", 21, listOf("قلیه ماهی جنوب", "سمبوسه آبادانی", "فلافل اصیل خوزستان", "دال عدس", "ماهی صبور شکم‌پر")),
        ProvinceCoverage("خراسان رضوی", "مشهد", 18, listOf("شله مشهدی", "پلو مخلوط مشهدی", "دیزی سنگی مشهد", "اشکنه قروت", "کوکو شیرین")),
        ProvinceCoverage("خراسان جنوبی", "بیرجند", 10, listOf("قوروت بادمجان", "کماچ بیرجندی", "آش لخشک", "بلغور پلو")),
        ProvinceCoverage("خراسان شمالی", "بجنورد", 9, listOf("قروتو بجنوردی", "آش یارمه", "دنی پلو")),
        ProvinceCoverage("کرمان", "کرمان", 15, listOf("بزقرمه اصیل کرمانی", "قاتق بنه", "زیره پلو مجلسی", "آبگوشت متنجنه")),
        ProvinceCoverage("یزد", "یزد", 14, listOf("قیمه نخود یزدی", "آش شولی یزدی", "قلیه کدو حلوایی", "پلو تو سرخ یزد")),
        ProvinceCoverage("کرمانشاه", "کرمانشاه", 16, listOf("خورش خلال بادام کرمانشاهی", "دنده کباب بیستون", "آش عباسعلی", "کوفته نخودی")),
        ProvinceCoverage("کردستان", "سنندج", 13, listOf("شلکینه سنندجی", "قایرمه (کنگر سوخاری)", "خورش ریواس", "آش پرپوله")),
        ProvinceCoverage("لرستان", "خرم‌آباد", 12, listOf("سغدو (دلمه سیراب شیردان)", "خورش سیب درختی بروجرد", "آش ترخینه دوغ", "چزنک رغین")),
        ProvinceCoverage("همدان", "همدان", 13, listOf("آبگوشت بزباش همدان", "کوفته همدانی", "سرداشی تنوری", "آش اماج همدان")),
        ProvinceCoverage("قزوین", "قزوین", 15, listOf("قیمه نثار مجلسی قزوین", "شیرین پلو قزوینی", "دیماج عصرانه قزوین", "کوکو شیرین")),
        ProvinceCoverage("زنجان", "زنجان", 11, listOf("جغور بغور بازاری زنجان", "شش‌انداز زنجانی", "کله جوش زنجان", "پلو مسما")),
        ProvinceCoverage("سمنان", "سمنان", 10, listOf("ته‌چین شهمیرزادی با گوشت بره", "سبزی‌پلو دامغانی", "چرتمه پلو", "آش جوش پره")),
        ProvinceCoverage("بوشهر", "بوشهر", 16, listOf("قلیه میگو بوشهری", "میگو پلو با تمبر هندی", "دوقوس ماهی", "دمپخت ماهی")),
        ProvinceCoverage("هرمزگان", "بندرعباس", 14, listOf("زیبون بندری", "موفگ با ماهی متوتا", "هواری ماهی و میگو", "مهیاوه و سوراغ")),
        ProvinceCoverage("سیستان و بلوچستان", "زاهدان", 11, listOf("تباهگ بلوچی با برنج چلو", "تجگی سیستانی", "لنجو ماهی زابلی", "دوپینزه گوشت")),
        ProvinceCoverage("چهارمحال و بختیاری", "شهرکرد", 11, listOf("کباب بختیاری اصیل", "آش بلگ بختیاری", "پرورد دوغ", "دمپختک گوشت")),
        ProvinceCoverage("کهگیلویه و بویراحمد", "یاسوج", 9, listOf("شله ماشکی", "تیه‌ترک", "کله‌پاچه عشایری با پونه", "آش کارده")),
        ProvinceCoverage("ایلام", "ایلام", 10, listOf("خورشت تره کوهی زاگرس", "ترخینه کوهی ایلام", "بامیه ایلامی", "شله امیری")),
        ProvinceCoverage("گلستان", "گرگان", 14, listOf("چکدرمه ترکمنی اصیل", "بوروک اسفناج و گوشت", "ماش پلو", "کوئی کک ترکمنی")),
        ProvinceCoverage("مرکزی", "اراک", 11, listOf("ته‌گودالی محلی", "آبگوشت دودار (کشک)", "آش ترخینه اراک", "فتیر سنتی اراک")),
        ProvinceCoverage("قم", "قم", 9, listOf("آبگوشت قنبید قمی", "سوهان سنتی زعفرانی", "آش آلو قم")),
        ProvinceCoverage("البرز", "کرج", 8, listOf("خورش آلو اسفناج طالقان", "دیزی سنتی کرج", "حلوای هویج طالقان")),
        ProvinceCoverage("تهران", "تهران", 25, listOf("چلوکباب کوبیده زعفرانی مجلسی", "والک پلو بهاره تجریش", "قیمه سیب‌زمینی تهرانی", "شله‌زرد نذری بازار تهران"))
    )

    fun calculateTotalCoverage(): Pair<Int, Int> {
        val coveredProvinces = PROVINCES_DATA.size
        val totalDishes = PROVINCES_DATA.sumOf { it.dishCount }
        return Pair(coveredProvinces, totalDishes)
    }

    fun getProvincesWithRecipeMatches(recipes: List<Recipe>): List<Pair<ProvinceCoverage, Int>> {
        return PROVINCES_DATA.map { province ->
            val matches = recipes.count { recipe ->
                recipe.originProvince?.contains(province.nameFa) == true ||
                recipe.originRegion.contains(province.nameFa) ||
                recipe.description.contains(province.nameFa) ||
                recipe.title.contains(province.nameFa)
            }
            Pair(province, maxOf(matches, province.dishCount))
        }
    }
}
