package com.example.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.*

data class NavTabItem(
    val id: String,
    val title: String,
    val icon: ImageVector
)

val NAV_TABS = listOf(
    NavTabItem("recipes", "رسپی‌ها", Icons.Default.MenuBook),
    NavTabItem("pastry", "قنادی و کیک", Icons.Default.Cake),
    NavTabItem("health", "وزن و سلامت", Icons.Default.MonitorWeight),
    NavTabItem("planner", "برنامه غذایی", Icons.Default.CalendarMonth),
    NavTabItem("fridge", "یخچال و انبار", Icons.Default.Kitchen),
    NavTabItem("assistant", "دستیار هوش", Icons.Default.AutoAwesome)
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppHeader(
    shoppingCount: Int,
    onOpenShopping: () -> Unit,
    onOpenAudit: () -> Unit,
    onOpenDedication: () -> Unit
) {
    var showPrepAlert by remember { mutableStateOf(true) }

    Column(modifier = Modifier.fillMaxWidth().background(Slate950)) {
        TopAppBar(
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(Saffron500.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.RestaurantMenu,
                            contentDescription = null,
                            tint = Saffron400,
                            modifier = Modifier.size(22.dp)
                        )
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "سرآشپز هوشمند",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = "گنجینه اصیل آشپزی و قنادی ایران",
                            style = MaterialTheme.typography.labelSmall,
                            color = Saffron400
                        )
                    }
                }
            },
            actions = {
                // Shopping list with badge
                IconButton(onClick = onOpenShopping) {
                    BadgedBox(
                        badge = {
                            if (shoppingCount > 0) {
                                Badge(
                                    containerColor = Saffron500,
                                    contentColor = Slate950
                                ) {
                                    Text(
                                        text = "$shoppingCount",
                                        fontWeight = FontWeight.Bold,
                                        style = MaterialTheme.typography.labelSmall
                                    )
                                }
                            }
                        }
                    ) {
                        Icon(
                            imageVector = Icons.Default.ShoppingCart,
                            contentDescription = "سبد خرید",
                            tint = if (shoppingCount > 0) Saffron400 else Slate400
                        )
                    }
                }

                // Specification audit
                IconButton(onClick = onOpenAudit) {
                    Icon(
                        imageVector = Icons.Default.FactCheck,
                        contentDescription = "ممیزی مهندسی",
                        tint = HerbalGreen
                    )
                }

                // Dedication / About
                IconButton(onClick = onOpenDedication) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = "درباره و تقدیم‌نامه",
                        tint = Slate400
                    )
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = Slate900.copy(alpha = 0.95f)
            )
        )

        // Advance Prep Alert Banner
        AnimatedVisibility(visible = showPrepAlert) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = SaffronDark.copy(alpha = 0.25f))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        modifier = Modifier.weight(1f),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.NotificationsActive,
                            contentDescription = null,
                            tint = Saffron400,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "یادآوری سرآشپز: برای قورمه‌سبزی و آبگوشت فردا، حبوبات را از امشب در آب ولرم بخیسانید.",
                            style = MaterialTheme.typography.bodySmall,
                            color = Saffron300,
                            lineHeight = 16.sp
                        )
                    }
                    IconButton(
                        onClick = { showPrepAlert = false },
                        modifier = Modifier.size(24.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = "بستن",
                            tint = Saffron400,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun AppBottomNav(
    currentTab: String,
    onTabSelected: (String) -> Unit
) {
    NavigationBar(
        containerColor = Slate900.copy(alpha = 0.98f),
        tonalElevation = 8.dp
    ) {
        NAV_TABS.forEach { tab ->
            val isSelected = currentTab == tab.id
            NavigationBarItem(
                selected = isSelected,
                onClick = { onTabSelected(tab.id) },
                icon = {
                    Icon(
                        imageVector = tab.icon,
                        contentDescription = tab.title,
                        tint = if (isSelected) Saffron400 else Slate400
                    )
                },
                label = {
                    Text(
                        text = tab.title,
                        style = MaterialTheme.typography.labelSmall,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSelected) Saffron400 else Slate400
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    indicatorColor = Saffron500.copy(alpha = 0.15f)
                )
            )
        }
    }
}
