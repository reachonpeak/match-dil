package com.matchdil

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.matchdil.ui.MatchDilNavGraph
import com.matchdil.ui.theme.MatchDilTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MatchDilTheme {
                MatchDilNavGraph()
            }
        }
    }
}
