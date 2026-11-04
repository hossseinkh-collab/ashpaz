#!/bin/bash
set -e
mkdir -p /opt/android-sdk/cmdline-tools
cd /opt/android-sdk/cmdline-tools
if [ ! -d "latest" ]; then
  wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip
  unzip -q cmdline-tools.zip
  mv cmdline-tools latest
  rm cmdline-tools.zip
fi

export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

echo "Accepting licenses and installing SDK packages..."
yes | sdkmanager --licenses > /dev/null 2>&1 || true
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" > /dev/null 2>&1
echo "Android SDK setup complete!"
