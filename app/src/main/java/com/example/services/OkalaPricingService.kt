package com.example.services

import java.net.URLEncoder

data class OkalaPriceResult(
    val hasPrice: Boolean,
    val priceToman: Long,
    val benchmarkLabel: String,
    val okalaSearchUrl: String
)

object OkalaPricingService {

    private val HOME_FREE_ITEMS = listOf(
        "آب", "آب جوش", "آب ولرم", "آب سرد", "آب یخ", "آب لوله‌کشی", "آب جوشیده",
        "یخ", "قالب یخ", "تکه یخ", "آب مرغ", "آب قلم", "آب گوشت"
    )

    data class Benchmark(
        val keywords: List<String>,
        val excludeKeywords: List<String> = emptyList(),
        val pricePerBaseUnitToman: Long,
        val baseUnit: String, // "g", "pcs", "ml"
        val label: String
    )

    private val BENCHMARKS = listOf(
        Benchmark(
            keywords = listOf("تخم‌مرغ", "تخم مرغ", "زرده تخم‌مرغ", "سفیده تخم‌مرغ", "زرده", "سفیده"),
            pricePerBaseUnitToman = 4500,
            baseUnit = "pcs",
            label = "تخم‌مرغ تازه دانه‌ای (۴,۵۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("سبزی قورمه", "سبزی قورمه‌سبزی", "سبزی قرمه"),
            pricePerBaseUnitToman = 48, // 48 Toman per gram = 48,000 / kg
            baseUnit = "g",
            label = "سبزی قورمه خردشده تازه (کیلویی ۴۸,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("سبزی آش", "سبزی آشی"),
            pricePerBaseUnitToman = 42,
            baseUnit = "g",
            label = "سبزی آش خردشده تازه (کیلویی ۴۲,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("سبزی پلو", "سبزی پلویی"),
            pricePerBaseUnitToman = 45,
            baseUnit = "g",
            label = "سبزی پلو تازه (کیلویی ۴۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("گوشت گوسفند", "گوشت گوسفندی", "ماهیچه گوسفندی", "سردست گوسفندی", "راسته گوسفند", "گوشت قرمز"),
            excludeKeywords = listOf("سبزی", "چرخ"),
            pricePerBaseUnitToman = 680, // 680,000 / kg
            baseUnit = "g",
            label = "گوشت گوسفندی تازه (کیلویی ۶۸۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("چرخ‌کرده", "چرخ کرده", "گوشت چرخ"),
            pricePerBaseUnitToman = 540,
            baseUnit = "g",
            label = "گوشت چرخ‌کرده مخلوط (کیلویی ۵۴۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("گوشت راسته گوساله", "فیله گوساله", "گوشت گوساله"),
            pricePerBaseUnitToman = 580,
            baseUnit = "g",
            label = "گوشت راسته گوساله (کیلویی ۵۸۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("سینه مرغ", "فیله مرغ", "مرغ بدون استخوان"),
            pricePerBaseUnitToman = 175,
            baseUnit = "g",
            label = "سینه مرغ بی‌استخوان تازه (کیلویی ۱۷۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("ران مرغ", "مرغ کامل", "گوشت مرغ", "مرغ"),
            pricePerBaseUnitToman = 98,
            baseUnit = "g",
            label = "گوشت مرغ کامل (کیلویی ۹۸,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("برنج ایرانی", "برنج طارم", "برنج هاشمی", "برنج"),
            pricePerBaseUnitToman = 145,
            baseUnit = "g",
            label = "برنج طارم هاشمی درجه یک (کیلویی ۱۴۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("لوبیا قرمز", "لوبیا چیتی", "لوبیا سفید", "عدس", "نخود", "لپه"),
            pricePerBaseUnitToman = 120,
            baseUnit = "g",
            label = "حبوبات مرغوب بسته‌بندی (کیلویی ۱۲۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("روغن مایع", "روغن سرخ‌کردنی", "روغن پخت"),
            pricePerBaseUnitToman = 85,
            baseUnit = "ml",
            label = "روغن مایع آفتابگردان (لیتری ۸۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("پیاز"),
            pricePerBaseUnitToman = 24,
            baseUnit = "g",
            label = "پیاز زرد تازه (کیلویی ۲۴,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("سیب‌زمینی", "سیب زمینی"),
            pricePerBaseUnitToman = 26,
            baseUnit = "g",
            label = "سیب‌زمینی اعلا (کیلویی ۲۶,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("گوجه‌فرنگی", "گوجه فرنگی", "گوجه"),
            pricePerBaseUnitToman = 32,
            baseUnit = "g",
            label = "گوجه‌فرنگی گلخانه‌ای (کیلویی ۳۲,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("رب گوجه", "رب گوجه‌فرنگی"),
            pricePerBaseUnitToman = 75,
            baseUnit = "g",
            label = "رب گوجه قوطی ۸۰۰ گرمی (کیلویی ۷۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("زعفران"),
            pricePerBaseUnitToman = 160000, // per 1g (مثقال ~ 700k)
            baseUnit = "g",
            label = "زعفران ممتاز سرگل قائنات (گرمی ۱۶۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("شیر", "شیر کم‌چرب", "شیر پرچرب"),
            pricePerBaseUnitToman = 36,
            baseUnit = "ml",
            label = "شیر پاستوریزه بطری (لیتری ۳۶,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("ماست"),
            pricePerBaseUnitToman = 45,
            baseUnit = "g",
            label = "ماست سنتی/دبه‌ای (کیلویی ۴۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("پنیر"),
            pricePerBaseUnitToman = 130,
            baseUnit = "g",
            label = "پنیر سفید صبحانه (کیلویی ۱۳۰,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("آرد", "آرد شیرینی‌پزی", "آرد سفید"),
            pricePerBaseUnitToman = 35,
            baseUnit = "g",
            label = "آرد سفید گندم بسته‌بندی (کیلویی ۳۵,۰۰۰ تومان)"
        ),
        Benchmark(
            keywords = listOf("شکر", "شکر سفید"),
            pricePerBaseUnitToman = 48,
            baseUnit = "g",
            label = "شکر سفید بسته‌بندی (کیلویی ۴۸,۰۰۰ تومان)"
        )
    )

    fun estimatePrice(name: String, amount: Double, unit: String): OkalaPriceResult {
        val trimmed = name.trim()
        val searchUrl = "https://okala.com/search?q=" + URLEncoder.encode(trimmed, "UTF-8")

        if (HOME_FREE_ITEMS.any { trimmed == it || trimmed.startsWith("$it ") }) {
            return OkalaPriceResult(
                hasPrice = true,
                priceToman = 0L,
                benchmarkLabel = "رایگان درون‌خانگی / آب لوله‌کشی",
                okalaSearchUrl = searchUrl
            )
        }

        val norm = CalculationEngine.normalizeToGramsOrMl(amount, unit, null, trimmed)

        for (bm in BENCHMARKS) {
            val hasKeyword = bm.keywords.any { trimmed.contains(it) }
            val hasExclude = bm.excludeKeywords.any { trimmed.contains(it) }

            if (hasKeyword && !hasExclude) {
                val totalPrice = when (bm.baseUnit) {
                    "pcs" -> (amount * bm.pricePerBaseUnitToman).toLong()
                    else -> (norm.first * bm.pricePerBaseUnitToman).toLong()
                }
                return OkalaPriceResult(
                    hasPrice = true,
                    priceToman = totalPrice,
                    benchmarkLabel = bm.label,
                    okalaSearchUrl = searchUrl
                )
            }
        }

        // Generic fallback estimation based on mass
        val fallbackPrice = (norm.first * 45).toLong() // 45k/kg average
        return OkalaPriceResult(
            hasPrice = true,
            priceToman = fallbackPrice,
            benchmarkLabel = "نرخ میانگین خواربار روز اکالا",
            okalaSearchUrl = searchUrl
        )
    }
}
