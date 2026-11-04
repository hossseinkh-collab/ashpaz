#!/usr/bin/env bash
set -e

echo "=== 1. Setting up Android SDK Directory ==="
mkdir -p /opt/android-sdk/cmdline-tools

if [ ! -d "/opt/android-sdk/cmdline-tools/latest" ]; then
    echo "Downloading Android Commandline Tools..."
    curl -sS -o /tmp/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
    unzip -q -o /tmp/cmdline-tools.zip -d /tmp/cmdline-tools
    mv /tmp/cmdline-tools/cmdline-tools /opt/android-sdk/cmdline-tools/latest
    rm -rf /tmp/cmdline-tools.zip /tmp/cmdline-tools
fi

export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "=== 2. Accepting Licenses & Installing Platform 34 ==="
yes | sdkmanager --licenses > /dev/null 2>&1 || true
sdkmanager "platforms;android-34" "build-tools;34.0.0" > /dev/null

echo "=== 3. Writing local.properties ==="
echo "sdk.dir=/opt/android-sdk" > android/local.properties

echo "=== 4. Syncing web build to Capacitor ==="
npm run build
npx cap sync android

echo "=== 5. Running Gradle assembleDebug ==="
cd android
./gradlew assembleDebug --no-daemon

echo "=== 6. Copying APK to public directory ==="
cd ..
mkdir -p public
cp android/app/build/outputs/apk/debug/app-debug.apk public/SmartChef.apk
cp android/app/build/outputs/apk/debug/app-debug.apk SmartChef.apk

echo "=== SUCCESS: SmartChef.apk generated ==="
ls -lh public/SmartChef.apk
