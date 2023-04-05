import { View, Text, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

const NotificationManger = () => {
  async function verifyPermissions() {
    const result = await Notifications.getPermissionsAsync();

    if (result.granted) {
      console.log("Permission is granted!");
      return true;
    }

    const premissionresult = await Notifications.requestPermissionsAsync();
    return premissionresult.granted;
  }

  async function scheduleNotificationHandler() {
    const premissionresult = await verifyPermissions();
    if (!premissionresult) {
      Alert.alert(
        "No permission to send notification!",
        "You need to grant permission to send notifications.",
        [{ text: "Okay" }]
      );
      return;
    }

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder Notification",
        body: "Don't forget to check your reviews!",
        data: { url: "https://www.google.com" },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  return (
    <View>
      <Button title="Show Notification" onPress={scheduleNotificationHandler} />
    </View>
  );
};

export default NotificationManger;
