import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// firebase
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase-setup";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//style
import { headerStyle } from "./helper/helper";
import { Ionicons } from "@expo/vector-icons";
// screen components
import Main from "./screens/Main";
import SpotDetails from "./screens/SpotDetails";
import UserProfile from "./screens/UserProfile";
import EditReview from "./screens/EditReview";
// authentication screens
import Login from "./authenticationcomponents/Login";
import Signup from "./authenticationcomponents/Signup";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SpotDetails" component={SpotDetails} />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            headerRight: () => {
              return (
                <Ionicons
                  name="exit"
                  size={24}
                  color={colors.BLUE}
                  onPress={() => {
                    signOut(auth);
                  }}
                />
              );
            },
          }}
        />
        <Stack.Screen name="EditReview" component={EditReview} />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        {isAuthenticated ? AppStack : AuthStack}
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
