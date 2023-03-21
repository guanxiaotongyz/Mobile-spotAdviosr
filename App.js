import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// test import below
import { firestore } from "./firebase/firebase-setup";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import UserProfile from "./screens /UserProfile";
import AddSpot from "./screens /AddSpot";
import Home from "./screens /Home";
import Spot from "./screens /SpotDetails";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//style
import { headerStyle } from "./helper/helper";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Spot />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});
