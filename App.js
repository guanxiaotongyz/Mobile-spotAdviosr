import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//style
import { headerStyle , colors } from "./helper/helper";
import { Ionicons } from "@expo/vector-icons";
// authentication screens
import Login from "./authenticationcomponents/Login";
import Signup from "./authenticationcomponents/Signup";
// firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase-setup";
// screens
import UserProfile from "./screens/UserProfile";

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
    justifyContent: "center",
  },
});
