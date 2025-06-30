# Testing Guide for Match Dil Android App

This guide explains how to set up and test the Match Dil Android app in Android Studio.

## Prerequisites

- Android Studio installed (Arctic Fox or later recommended)
- Android SDK and emulator installed
- Optional: Physical Android device connected via USB with USB debugging enabled

## Steps to Test

1. **Download or Clone the Project**

   - Download the `android-app` directory from your project.
   - Alternatively, clone the repository if hosted on GitHub.

2. **Open the Project in Android Studio**

   - Launch Android Studio.
   - Select **Open an existing project**.
   - Navigate to the `android-app` directory and open it.

3. **Sync and Build**

   - Android Studio will sync the Gradle files and download dependencies.
   - Wait for the build to complete successfully.

4. **Run on Emulator or Device**

   - Start an Android emulator via Android Studio's AVD Manager or connect a physical device.
   - Click the **Run** button (green play icon) in Android Studio.
   - Select the target device/emulator.
   - The app will build and launch on the selected device.

5. **Test App Features**

   - Navigate through login, signup, swipe, chat, profile, and settings screens.
   - Verify UI responsiveness and functionality.
   - Test swipe gestures, chat messaging, profile editing, and settings toggles.

6. **Debugging**

   - Use Android Studio's Logcat to monitor logs.
   - Set breakpoints and debug as needed.

## Notes

- The app uses Jetpack Compose for UI.
- The color scheme is red, white, and grey as requested.
- Backend logic is simulated; integrate real backend as needed.

---

If you need assistance with any step or want me to help set up the project files for Android Studio, please let me know.
