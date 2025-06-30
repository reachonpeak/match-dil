package com.matchdil.ui.chat

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.matchdil.ui.theme.Red500

data class Message(val id: Int, val text: String, val isSentByUser: Boolean)

@Composable
fun ChatScreen(navController: NavController) {
    var messages by remember {
        mutableStateOf(
            listOf(
                Message(1, "Hey! How are you?", false),
                Message(2, "I'm good, thanks! How about you?", true)
            )
        )
    }
    var messageText by remember { mutableStateOf(TextFieldValue("")) }

    Column(modifier = Modifier.fillMaxSize()) {
        TopAppBar(
            title = { Text("Chat", color = Red500) },
            navigationIcon = {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
            },
            backgroundColor = Color.White,
            contentColor = Red500,
            elevation = 4.dp
        )
        LazyColumn(
            modifier = Modifier.weight(1f).padding(8.dp),
            reverseLayout = true
        ) {
            items(messages.reversed()) { message ->
                MessageBubble(message)
            }
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            BasicTextField(
                value = messageText,
                onValueChange = { messageText = it },
                modifier = Modifier
                    .weight(1f)
                    .padding(8.dp)
                    .background(Color.LightGray, shape = MaterialTheme.shapes.small)
                    .padding(8.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(
                onClick = {
                    if (messageText.text.isNotBlank()) {
                        messages = messages + Message(messages.size + 1, messageText.text, true)
                        messageText = TextFieldValue("")
                    }
                },
                colors = ButtonDefaults.buttonColors(backgroundColor = Red500)
            ) {
                Text("Send", color = Color.White)
            }
        }
    }
}

@Composable
fun MessageBubble(message: Message) {
    val backgroundColor = if (message.isSentByUser) Red500 else Color.LightGray
    val alignment = if (message.isSentByUser) Alignment.End else Alignment.Start
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (message.isSentByUser) Arrangement.End else Arrangement.Start
    ) {
        Surface(
            color = backgroundColor,
            shape = MaterialTheme.shapes.medium,
            modifier = Modifier.padding(4.dp)
        ) {
            Text(
                text = message.text,
                modifier = Modifier.padding(8.dp),
                color = if (message.isSentByUser) Color.White else Color.Black
            )
        }
    }
}
