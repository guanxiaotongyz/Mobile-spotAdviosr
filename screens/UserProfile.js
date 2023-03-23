import { View, Text } from "react-native";
import React from "react";
import { auth } from "../firebase/firebase-setup";
export default function UserProfile() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  );
}