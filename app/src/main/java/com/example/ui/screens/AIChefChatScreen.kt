package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.Recipe
import com.example.services.AIChefService
import com.example.services.ChatMessageItem
import com.example.ui.theme.*

val QUICK_CULINARY_QUESTIONS = listOf(
    "خورشتم شور شده چیکار کنم؟",
    "چطور برنج مجلسی دون و قد کشیده شود؟",
    "راز روغن انداختن قورمه‌سبزی چیست؟",
    "چرا کیک خانگی پف نمی‌کند؟",
    "چطور تلخی لیمو عمانی را بگیریم؟",
    "راز ته دیگ طلایی زعفرانی چیست؟",
    "جایگزین خامه در پخت‌وپز چیست؟"
)

@Composable
fun AIChefChatScreen(
    activeRecipe: Recipe? = null,
    modifier: Modifier = Modifier
) {
    var messages by remember {
        mutableStateOf(
            listOf(
                ChatMessageItem(
                    id = "init-1",
                    isUser = false,
                    text = "سلام و درود! من دستیار هوشمند سرآشپز ایران هستم 👨‍🍳✨\n" +
                            (if (activeRecipe != null) "در حال مشاهده دستور «${activeRecipe.title}» هستید. " else "") +
                            "هر سوالی درباره فوت‌وفن پخت، زمان‌بندی، جایگزینی مواد، رفع شوری/تندی یا رژیم غذایی دارید، بفرمایید تا راهنماییتان کنم."
                )
            )
        )
    }

    var inputText by remember { mutableStateOf("") }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Slate950)
    ) {
        // Chat messages list
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(messages, key = { it.id }) { msg ->
                ChatBubble(message = msg)
            }
        }

        // Quick suggested question chips
        LazyRow(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 4.dp),
            contentPadding = PaddingValues(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(QUICK_CULINARY_QUESTIONS) { q ->
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Slate900,
                    modifier = Modifier.padding(vertical = 2.dp),
                    tonalElevation = 2.dp
                ) {
                    TextButton(
                        onClick = {
                            val userMsg = ChatMessageItem(id = "user-${System.currentTimeMillis()}", isUser = true, text = q)
                            val answer = AIChefService.getChefResponse(q, activeRecipe)
                            val botMsg = ChatMessageItem(id = "bot-${System.currentTimeMillis() + 1}", isUser = false, text = answer)
                            messages = messages + userMsg + botMsg
                        },
                        contentPadding = PaddingValues(horizontal = 10.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = q,
                            style = MaterialTheme.typography.labelSmall,
                            color = Saffron400
                        )
                    }
                }
            }
        }

        // Input bar
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 80.dp),
            color = Slate900
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    placeholder = {
                        Text(
                            text = "از سرآشپز بپرسید...",
                            style = MaterialTheme.typography.bodySmall,
                            color = Slate400
                        )
                    },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(20.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Saffron500,
                        unfocusedBorderColor = Slate700,
                        focusedContainerColor = Slate800,
                        unfocusedContainerColor = Slate800,
                        focusedTextColor = Color.White,
                        unfocusedTextColor = Color.White
                    ),
                    maxLines = 3
                )

                Spacer(modifier = Modifier.width(8.dp))

                IconButton(
                    onClick = {
                        if (inputText.isNotBlank()) {
                            val textToSend = inputText.trim()
                            inputText = ""
                            val userMsg = ChatMessageItem(id = "user-${System.currentTimeMillis()}", isUser = true, text = textToSend)
                            val answer = AIChefService.getChefResponse(textToSend, activeRecipe)
                            val botMsg = ChatMessageItem(id = "bot-${System.currentTimeMillis() + 1}", isUser = false, text = answer)
                            messages = messages + userMsg + botMsg
                        }
                    },
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(Saffron500)
                ) {
                    Icon(
                        imageVector = Icons.Default.Send,
                        contentDescription = "ارسال",
                        tint = Slate950,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun ChatBubble(message: ChatMessageItem) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (message.isUser) Arrangement.End else Arrangement.Start
    ) {
        if (!message.isUser) {
            Box(
                modifier = Modifier
                    .size(32.dp)
                    .clip(CircleShape)
                    .background(Saffron500.copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.AutoAwesome,
                    contentDescription = null,
                    tint = Saffron400,
                    modifier = Modifier.size(16.dp)
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
        }

        Card(
            modifier = Modifier.widthIn(max = 300.dp),
            shape = RoundedCornerShape(
                topStart = 16.dp,
                topEnd = 16.dp,
                bottomStart = if (message.isUser) 16.dp else 4.dp,
                bottomEnd = if (message.isUser) 4.dp else 16.dp
            ),
            colors = CardDefaults.cardColors(
                containerColor = if (message.isUser) Saffron500 else Slate900
            )
        ) {
            Text(
                text = message.text,
                style = MaterialTheme.typography.bodyMedium,
                color = if (message.isUser) Slate950 else Slate100,
                lineHeight = 22.sp,
                modifier = Modifier.padding(14.dp)
            )
        }
    }
}
