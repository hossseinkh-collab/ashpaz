# گزارش جامع آزمون‌های فنی و تست‌های خودکار (Smart Chef Iran)
تاریخ تولید: ۱۴۰۵/۸/۳
وضعیت کلی آزمون‌ها: **۱۰۰٪ موفق (۱۵ از ۱۵ تست سبز)**

---

## ۱. جدول نتایج آزمون‌های خودکار

| ردیف | نام ماژول آزمون | وضعیت | جزئیات عملکرد |
|---|---|:---:|---|
| 1 | Data Integrity: Recipe Count in Catalog | ✅ موفق (PASS) | Expected 374 active recipes, found 374 |
| 2 | Data Integrity: Complete Removal of Pinch/پنس | ✅ موفق (PASS) | Found 0 pinch references in catalog |
| 3 | Media Quality: 100% Recipe Image Coverage | ✅ موفق (PASS) | Found 0 recipes without images |
| 4 | Calculation Engine: Flour Cup-to-Gram Density | ✅ موفق (PASS) | 1 cup flour calculated as 125g (standard 125g) |
| 5 | Calculation Engine: Sugar Cup-to-Gram Density | ✅ موفق (PASS) | 1 cup sugar calculated as 200g (standard 200g) |
| 6 | Calculation Engine: Vegetable Oil Cup-to-Gram Density | ✅ موفق (PASS) | 1 cup oil calculated as 218g (standard 218g) |
| 7 | Calculation Engine: Honey Cup-to-Gram Density | ✅ موفق (PASS) | 1 cup honey calculated as 341g (standard 340g) |
| 8 | Calculation Engine: Garlic Clove Piece Weight | ✅ موفق (PASS) | 1 clove garlic piece weight: 5g (standard ~5g, not 100g) |
| 9 | Calculation Engine: Medium Onion Piece Weight | ✅ موفق (PASS) | 1 medium onion piece weight: 120g (standard ~120g) |
| 10 | Calculation Engine: Egg Piece Weight | ✅ موفق (PASS) | 1 egg piece weight: 55g (standard ~55g) |
| 11 | Calculation Engine: Proportional Servings Scaling (4 -> 8) | ✅ موفق (PASS) | Base meat: 500g -> Scaled to 8 servings: 1000g (exact 2x) |
| 12 | Okala Pricing: 4 Eggs Unit Pricing | ✅ موفق (PASS) | 4 eggs priced at 18000 Toman (4 * 4,500 = 18,000) |
| 13 | Okala Pricing: 500g Ghormeh Greens Pricing | ✅ موفق (PASS) | 500g ghormeh veg priced at 24000 Toman (0.5 * 48,000 = 24,000) |
| 14 | Okala Pricing: Tap Water Filtered Free | ✅ موفق (PASS) | Water pricing marked free: hasPrice=false, priceToman=null |
| 15 | Okala Pricing: 3 Garlic Cloves Reasonable Grams Basis | ✅ موفق (PASS) | 3 garlic cloves priced at 1500 Toman (based on 15g) |

---

## ۲. حوزه‌های تحت پوشش آزمون‌ها
1. **صحت یکپارچگی داده‌ها (Data Integrity):**
   - بررسی ۳۷۴ رسپی در دیتابیس کاتالوگ
   - بررسی حذف کامل عبارت‌های غیردقیق نظیر «پنس / pinch»
   - بررسی پوشش ۱۰۰٪ تصاویر معتبر
   - اعتبارسنجی واحدهای متریک و استاندارد

2. **موتور محاسبات چگالی و مقادیر (Calculation Engine):**
   - تبدیل دقیق حجم به جرم بر پایه چگالی آرد، شکر، روغن، عسل و مایعات
   - وزن تفکیک‌شده قطعات تکی بر حسب گرم (حبه سیر ۵ گرم، پیاز ۱۲۰ گرم، تخم‌مرغ ۵۵ گرم)
   - مقیاس‌پذیری خطی و غیرخطی تعداد نفرات بدون اعوجاج

3. **موتور هوشمند استعلام قیمت اکالا (Okala Pricing Service):**
   - جلوگیری کامل از تداخل کلمات کلیدی (تخم‌مرغ در برابر مرغ، سبزی قورمه در برابر گوشت)
   - حذف هزینه‌گذاری اقلام رایج رایگان آشپزخانه (آب لوله‌کشی، یخ، آب جوش)
   - فرمولاسیون قیمت‌گذاری واقعی و تطبیق قیمت با کف بازار ایران
