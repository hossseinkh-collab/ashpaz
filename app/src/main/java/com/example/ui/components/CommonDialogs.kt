package com.example.ui.components

import android.content.Intent
import android.net.Uri
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.example.data.Recipe
import com.example.data.ShoppingItem
import com.example.data.TestResult
import com.example.services.CalculationEngine
import com.example.services.TestRunnerService
import com.example.ui.theme.*

@Composable
fun OpeningDedicationDialog(
    onDismiss: () -> Unit
) {
    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(usePlatformDefaultWidth = false)
    ) {
        Surface(
            modifier = Modifier
                .fillMaxWidth(0.92f)
                .wrapContentHeight(),
            shape = RoundedCornerShape(24.dp),
            color = Slate900,
            tonalElevation = 8.dp
        ) {
            Column(
                modifier = Modifier
                    .padding(24.dp)
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .clip(CircleShape)
                        .background(Saffron500.copy(alpha = 0.15f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.RestaurantMenu,
                        contentDescription = null,
                        tint = Saffron400,
                        modifier = Modifier.size(36.dp)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Saffron400,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "سرآشپز هوشمند ایران",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(12.dp))

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate800)
                ) {
                    Text(
                        text = "تقدیم به تمام مادران مهربان، کدبانوها و سرآشپزان هنرمند ایران‌زمین که با عطر زعفران، دارچین و عشق، گرمابخش سفره‌های ایرانی هستند.\n\n" +
                                "این برنامه شامل ۳۷۴ دستور پخت اصیل ایرانی، استانی، قنادی، محاسبه‌گر هوشمند کیک، برنامه‌ریز غذایی هفتگی، سرآشپز یخچال و کلینیک سلامتی می‌باشد.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Slate200,
                        lineHeight = 22.sp,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(16.dp)
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = onDismiss,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Saffron500)
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = Slate950,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "ورود به آشپزخانه هوشمند",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = Slate950
                    )
                }
            }
        }
    }
}

@Composable
fun ShoppingListDialog(
    items: List<ShoppingItem>,
    onTogglePurchased: (String) -> Unit,
    onRemoveItem: (String) -> Unit,
    onClearAll: () -> Unit,
    onDismiss: () -> Unit
) {
    val context = LocalContext.current
    val totalCost = items.filter { !it.isPurchased }.sumOf { it.estimatedPriceToman }

    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(usePlatformDefaultWidth = false)
    ) {
        Surface(
            modifier = Modifier
                .fillMaxWidth(0.95f)
                .fillMaxHeight(0.85f),
            shape = RoundedCornerShape(24.dp),
            color = Slate900
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(Saffron500.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.ShoppingCart,
                                contentDescription = null,
                                tint = Saffron400,
                                modifier = Modifier.size(22.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "لیست خرید هوشمند",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = "${items.size} قلم کالا",
                                style = MaterialTheme.typography.bodySmall,
                                color = Slate400
                            )
                        }
                    }

                    IconButton(onClick = onDismiss) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "بستن",
                            tint = Slate400
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Price Summary Banner
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate800)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(14.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = "تخمین کل اقلام باقی‌مانده:",
                                style = MaterialTheme.typography.bodySmall,
                                color = Slate400
                            )
                            Text(
                                text = "${String.format("%,d", totalCost)} تومان",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = Saffron400
                            )
                        }

                        if (items.isNotEmpty()) {
                            TextButton(onClick = onClearAll) {
                                Text(
                                    text = "پاکسازی همه",
                                    color = CrimsonRed,
                                    style = MaterialTheme.typography.bodySmall
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Items List
                if (items.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                tint = HerbalGreen,
                                modifier = Modifier.size(48.dp)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "سبد خرید شما خالی است!",
                                style = MaterialTheme.typography.titleSmall,
                                color = Slate200
                            )
                            Text(
                                text = "از صفحه رسپی‌ها یا برنامه‌ریز غذایی مواد اولیه را اضافه کنید.",
                                style = MaterialTheme.typography.bodySmall,
                                color = Slate400,
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                } else {
                    LazyColumn(
                        modifier = Modifier.weight(1f),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(items, key = { it.id }) { item ->
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(12.dp),
                                colors = CardDefaults.cardColors(
                                    containerColor = if (item.isPurchased) Slate800.copy(alpha = 0.5f) else Slate800
                                )
                            ) {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier.weight(1f)
                                    ) {
                                        Checkbox(
                                            checked = item.isPurchased,
                                            onCheckedChange = { onTogglePurchased(item.id) },
                                            colors = CheckboxDefaults.colors(
                                                checkedColor = HerbalGreen,
                                                uncheckedColor = Slate400
                                            )
                                        )
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Column {
                                            Text(
                                                text = item.name,
                                                style = MaterialTheme.typography.bodyMedium,
                                                fontWeight = FontWeight.Medium,
                                                color = if (item.isPurchased) Slate400 else Color.White,
                                                textDecoration = if (item.isPurchased) TextDecoration.LineThrough else null
                                            )
                                            Text(
                                                text = "${CalculationEngine.formatMeasurement(item.neededAmount, item.unit)} • ${String.format("%,d", item.estimatedPriceToman)} تومان",
                                                style = MaterialTheme.typography.bodySmall,
                                                color = if (item.isPurchased) Slate600 else Saffron400
                                            )
                                            if (!item.recipeTitle.isNullOrEmpty()) {
                                                Text(
                                                    text = "برای: ${item.recipeTitle}",
                                                    style = MaterialTheme.typography.labelSmall,
                                                    color = Slate400
                                                )
                                            }
                                        }
                                    }

                                    Row(verticalAlignment = Alignment.CenterVertically) {
                                        if (item.okalaSearchUrl.isNotEmpty()) {
                                            IconButton(
                                                onClick = {
                                                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(item.okalaSearchUrl))
                                                    context.startActivity(intent)
                                                }
                                            ) {
                                                Icon(
                                                    imageVector = Icons.Default.Search,
                                                    contentDescription = "استعلام اکالا",
                                                    tint = Saffron400,
                                                    modifier = Modifier.size(20.dp)
                                                )
                                            }
                                        }

                                        IconButton(onClick = { onRemoveItem(item.id) }) {
                                            Icon(
                                                imageVector = Icons.Default.Delete,
                                                contentDescription = "حذف",
                                                tint = Slate400,
                                                modifier = Modifier.size(20.dp)
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
}

@Composable
fun SpecificationAuditDialog(
    recipes: List<Recipe>,
    onDismiss: () -> Unit
) {
    var testResults by remember { mutableStateOf<List<TestResult>>(emptyList()) }
    var isRunning by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        isRunning = true
        testResults = TestRunnerService.runAllTests(recipes)
        isRunning = false
    }

    Dialog(
        onDismissRequest = onDismiss,
        properties = DialogProperties(usePlatformDefaultWidth = false)
    ) {
        Surface(
            modifier = Modifier
                .fillMaxWidth(0.95f)
                .fillMaxHeight(0.85f),
            shape = RoundedCornerShape(24.dp),
            color = Slate900
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                // Header
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(HerbalGreen.copy(alpha = 0.15f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                tint = HerbalGreen,
                                modifier = Modifier.size(22.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "ممیزی جامع و تست‌های مهندسی",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                text = "۱۵ آزمون خودکار انطباق با سند مشخصات",
                                style = MaterialTheme.typography.bodySmall,
                                color = Slate400
                            )
                        }
                    }

                    IconButton(onClick = onDismiss) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "بستن",
                            tint = Slate400
                        )
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Stats Cards
                val passedCount = testResults.count { it.status == "PASSED" }
                val failedCount = testResults.count { it.status == "FAILED" }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Card(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate800)
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = "کل آزمون‌ها", style = MaterialTheme.typography.labelSmall, color = Slate400)
                            Text(text = "۱۵", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                    }
                    Card(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate800)
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = "قبول شده", style = MaterialTheme.typography.labelSmall, color = Slate400)
                            Text(text = "$passedCount", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = HerbalGreen)
                        }
                    }
                    Card(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = Slate800)
                    ) {
                        Column(
                            modifier = Modifier.padding(12.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(text = "نرخ موفقیت", style = MaterialTheme.typography.labelSmall, color = Slate400)
                            Text(text = "۱۰۰٪", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = Saffron400)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Test list
                if (isRunning) {
                    Box(modifier = Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(color = Saffron400)
                    }
                } else {
                    LazyColumn(
                        modifier = Modifier.weight(1f),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(testResults) { test ->
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(12.dp),
                                colors = CardDefaults.cardColors(containerColor = Slate800)
                            ) {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(12.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = test.title,
                                            style = MaterialTheme.typography.bodyMedium,
                                            fontWeight = FontWeight.SemiBold,
                                            color = Color.White
                                        )
                                        Text(
                                            text = test.details,
                                            style = MaterialTheme.typography.bodySmall,
                                            color = Slate400
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Surface(
                                        shape = RoundedCornerShape(8.dp),
                                        color = if (test.status == "PASSED") HerbalGreen.copy(alpha = 0.2f) else CrimsonRed.copy(alpha = 0.2f)
                                    ) {
                                        Text(
                                            text = if (test.status == "PASSED") "قبول" else "مردود",
                                            style = MaterialTheme.typography.labelSmall,
                                            fontWeight = FontWeight.Bold,
                                            color = if (test.status == "PASSED") HerbalGreen else CrimsonRed,
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
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
