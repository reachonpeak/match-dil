package com.matchdil.ui.profile

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import coil.compose.rememberImagePainter
import com.matchdil.ui.theme.Red500

@Composable
fun ProfileScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Match Dil", style = MaterialTheme.typography.h4, color = Red500)
        Spacer(modifier = Modifier.height(24.dp))
        Image(
            painter = rememberImagePainter("https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"),
            contentDescription = "Profile Picture",
            modifier = Modifier
                .size(120.dp)
                .clip(CircleShape),
            contentScale = ContentScale.Crop
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text("Jessica, 25", style = MaterialTheme.typography.h5)
        Spacer(modifier = Modifier.height(8.dp))
        Text("New York City", style = MaterialTheme.typography.body2, color = Color.Gray)
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = { /* TODO: Navigate to edit profile */ },
            colors = ButtonDefaults.buttonColors(backgroundColor = Red500)
        ) {
            Text("Edit Profile", color = Color.White)
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = { /* TODO: Navigate to settings */ },
            colors = ButtonDefaults.buttonColors(backgroundColor = Color.LightGray)
        ) {
            Text("Settings", color = Color.Black)
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = { /* TODO: Handle logout */ },
            colors = ButtonDefaults.buttonColors(backgroundColor = Color.Red)
        ) {
            Text("Logout", color = Color.White)
        }
    }
}
