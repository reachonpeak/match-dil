package com.matchdil.ui.settings

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.matchdil.ui.theme.Red500

@Composable
fun SettingsScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        TopAppBar(
            title = { Text("Settings", color = Red500) },
            navigationIcon = {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
            },
            backgroundColor = MaterialTheme.colors.surface,
            contentColor = Red500,
            elevation = 4.dp
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text("Account Settings", style = MaterialTheme.typography.h6)
        Divider(modifier = Modifier.padding(vertical = 8.dp))
        // Add settings options here
        Text("Notification Preferences")
        Switch(checked = true, onCheckedChange = {})
        Spacer(modifier = Modifier.height(16.dp))
        Text("Privacy Settings")
        Switch(checked = false, onCheckedChange = {})
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = {
                // TODO: Implement logout
                navController.navigate("login") {
                    popUpTo("login") { inclusive = true }
                }
            },
            colors = ButtonDefaults.buttonColors(backgroundColor = Red500),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Logout", color = MaterialTheme.colors.onPrimary)
        }
    }
}
