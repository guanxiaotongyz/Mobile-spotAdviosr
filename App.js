import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking } from "react-native";
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
// notifications
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

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

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification ", notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response ", response.notification);
        try {
          Linking.openURL(response.notification.request.content.data.url);
        } catch (err) {
          console.log("linking error ", err);
        }
      });

    return () => {
      subscription.remove;
      responseListener.remove;
    };
  }, []);


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
