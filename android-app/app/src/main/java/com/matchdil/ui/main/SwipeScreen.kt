package com.matchdil.ui.main

import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.matchdil.ui.theme.Red500
import kotlin.math.abs
import kotlin.math.roundToInt

data class Profile(
    val id: Int,
    val name: String,
    val age: Int,
    val bio: String,
    val imageUrl: String
)

@Composable
fun SwipeScreen(navController: NavController) {
    var profiles by remember {
        mutableStateOf(
            listOf(
                Profile(1, "Sarah", 25, "Adventure seeker & coffee lover", "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"),
                Profile(2, "Emily", 28, "Artist, dreamer, and dog mom", "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"),
                Profile(3, "Jessica", 26, "Loves hiking and photography", "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg")
            )
        )
    }

    var currentIndex by remember { mutableStateOf(0) }
    var offsetX by remember { mutableStateOf(0f) }
    var offsetY by remember { mutableStateOf(0f) }
    var rotation by remember { mutableStateOf(0f) }
    var showMatchDialog by remember { mutableStateOf(false) }
    var matchedProfile by remember { mutableStateOf<Profile?>(null) }

    val currentProfile = profiles.getOrNull(currentIndex)

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White),
        contentAlignment = Alignment.Center
    ) {
        if (currentProfile == null) {
            Text("No more profiles", style = MaterialTheme.typography.h5, color = Color.Gray)
        } else {
            Box(
                modifier = Modifier
                    .offset(x = offsetX.dp, y = offsetY.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color.LightGray)
                    .pointerInput(Unit) {
                        detectDragGestures(
                            onDragEnd = {
                                if (abs(offsetX) > 150) {
                                    if (offsetX > 0) {
                                        // Swiped right - like
                                        matchedProfile = currentProfile
                                        showMatchDialog = true
                                    }
                                    currentIndex++
                                    offsetX = 0f
                                    offsetY = 0f
                                    rotation = 0f
                                } else {
                                    offsetX = 0f
                                    offsetY = 0f
                                    rotation = 0f
                                }
                            },
                            onDrag = { change, dragAmount ->
                                change.consume()
                                offsetX += dragAmount.x
                                offsetY += dragAmount.y
                                rotation = (offsetX / 20).coerceIn(-40f, 40f)
                            }
                        )
                    }
                    .size(300.dp, 400.dp)
            ) {
                // Profile image
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    shape = RoundedCornerShape(16.dp),
                    color = Color.Gray
                ) {
                    // In real app, use Coil or Glide for image loading
                    Text(
                        text = "Image",
                        modifier = Modifier.fillMaxSize(),
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.h4,
                        color = Color.White
                    )
                }
                // Profile info overlay
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(16.dp)
                ) {
                    Text("${currentProfile.name}, ${currentProfile.age}", style = MaterialTheme.typography.h5, color = Color.White)
                    Text(currentProfile.bio, style = MaterialTheme.typography.body1, color = Color.White)
                }
            }
        }
    }

    if (showMatchDialog && matchedProfile != null) {
        AlertDialog(
            onDismissRequest = { showMatchDialog = false },
            title = { Text("It's a Match!", color = Red500) },
            text = { Text("You and ${matchedProfile!!.name} liked each other.") },
            confirmButton = {
                TextButton(onClick = {
                    showMatchDialog = false
                    // TODO: Navigate to chat screen with matchedProfile
                }) {
                    Text("Send Message")
                }
            },
            dismissButton = {
                TextButton(onClick = { showMatchDialog = false }) {
                    Text("Keep Swiping")
                }
            }
        )
    }
}
