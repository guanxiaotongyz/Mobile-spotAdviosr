import { View, Text } from "react-native";
import { firestore } from "../firebase/firebase-setup";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { headerStyle, colors } from "../helper/helper";
import AddSpot from "./AddSpot";
import FavoriteSpots from "./FavoriteSpots";
import UserProfile from "./UserProfile";
import AllSpots from "./AllSpots";
import NearbySpots from "./NearbySpots";
import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();

const Main = () => {
  const screenOptions = {
    ...headerStyle,
    tabBarStyle: {
      backgroundColor: colors.WHITE,
    },
    tabBarActiveTintColor: colors.LIME_GREEN,
    tabBarInactiveTintColor: colors.DARK_GREY,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={AllSpots}
        options={{
          headerTitle: "Spot Advisor",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbySpots}
        options={{
          headerTitle: "Nearby Spots",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="location" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="AddSpot"
        component={AddSpot}
        options={{
          headerTitle: "Add Spot",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoriteSpots}
        options={{
          headerTitle: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="heart-outlined" 
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />

    </Tab.Navigator>


  );
};

export default Main;
