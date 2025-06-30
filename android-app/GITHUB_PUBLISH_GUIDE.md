# Publishing Match Dil Android App to GitHub and Running in Android Studio

## Step 1: Initialize Git Repository

1. Open a terminal and navigate to the `android-app` directory.
2. Run the following commands:

```bash
git init
git add .
git commit -m "Initial commit of Match Dil Android app"
```

## Step 2: Create a GitHub Repository

1. Go to https://github.com and log in.
2. Click on **New repository**.
3. Enter repository name (e.g., `match-dil-android`).
4. Choose **Public** or **Private**.
5. Do NOT initialize with README, .gitignore, or license.
6. Click **Create repository**.

## Step 3: Push Local Repository to GitHub

1. Follow the instructions shown after creating the repo, for example:

```bash
git remote add origin https://github.com/yourusername/match-dil-android.git
git branch -M main
git push -u origin main
```

## Step 4: Clone or Download the Repository

- On your local machine or another device, clone the repo:

```bash
git clone https://github.com/yourusername/match-dil-android.git
```

- Or download the ZIP file from GitHub and extract it.

## Step 5: Open Project in Android Studio

1. Launch Android Studio.
2. Click **Open an existing project**.
3. Navigate to the cloned or extracted `android-app` folder.
4. Wait for Gradle sync and build to complete.

## Step 6: Run the App

1. Connect an Android device or start an emulator.
2. Click the **Run** button in Android Studio.
3. Select the target device.
4. The app will build and launch.

---

If you want, I can help you with the Git commands or Android Studio setup interactively.
