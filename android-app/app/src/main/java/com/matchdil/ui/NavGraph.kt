package com.matchdil.ui

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.matchdil.ui.auth.LoginScreen
import com.matchdil.ui.auth.SignupScreen
import com.matchdil.ui.main.SwipeScreen
import com.matchdil.ui.chat.ChatScreen
import com.matchdil.ui.profile.ProfileScreen
import com.matchdil.ui.settings.SettingsScreen

@Composable
fun MatchDilNavGraph(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = "login") {
        composable("login") {
            LoginScreen(navController)
        }
        composable("signup") {
            SignupScreen(navController)
        }
        composable("swipe") {
            SwipeScreen(navController)
        }
        composable("chat") {
            ChatScreen(navController)
        }
        composable("profile") {
            ProfileScreen(navController)
        }
        composable("settings") {
            SettingsScreen(navController)
        }
    }
}
