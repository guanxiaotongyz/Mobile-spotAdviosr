import { View, Text, Button } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export async function verifyPermissions() {
    const result = await Notifications.getPermissionsAsync();
    if (result.granted) {
      console.log("Permission is granted!");
      return true;
    }
    const premissionresult = await Notifications.requestPermissionsAsync();
    return premissionresult.granted;
  }

export async function scheduleNotificationHandler() {
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
        // render to the spot details screen
        // data: { url: "https://www.google.com"  },
      },
      trigger: {
        hour: 78,
        // seconds: 1,
      },
    });
  }

export async function scheduleNotificationUserHandler() {
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
        body: "Don't forget add your first spot!",

      },
      trigger: {
        hour: 24,
        // seconds: 1,
      },
    });
  }



const NotificationManger = () => {

  return (
    <View>
      <Button title="Show Notification" onPress={scheduleNotificationHandler} />
    </View>
  );
};

export default NotificationManger;
