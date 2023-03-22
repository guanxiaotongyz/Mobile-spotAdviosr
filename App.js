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
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//style
import { headerStyle } from "./helper/helper";
// screen components
import Main from "./screens/Main";
import SpotDetails from "./screens/SpotDetails";
import UserProfile from "./screens/UserProfile";
import EditReview from "./screens/EditReview";

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
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SpotDetails" component={SpotDetails}/>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditReview" component={EditReview} />
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
