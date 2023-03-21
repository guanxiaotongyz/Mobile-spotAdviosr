import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React,  { useEffect , useState} from 'react';
// test import below
import { firestore } from './firebase/firebase-setup';
import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"
import UserProfile from './screens /UserProfile';
import Home from './screens /Home';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { headerStyle } from './helper/helper';
import AddPic from './screens /AddPic';
import SpotDetails from './screens /SpotDetails';
import EditProfile from './screens /EditProfile';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Picture" component={AddPic}/>
        <Stack.Screen name="SpotDetails" component={SpotDetails} options={{ headerTitle: "Spot Details" }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: "Edit Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
