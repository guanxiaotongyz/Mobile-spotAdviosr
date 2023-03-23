// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth,getReactNativePersistence } from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9lpNVN22HxNO0xnP33Z8kmKyyqAGuzOg",
  authDomain: "trip-advisor-curd.firebaseapp.com",
  projectId: "trip-advisor-curd",
  storageBucket: "trip-advisor-curd.appspot.com",
  messagingSenderId: "843970286871",
  appId: "1:843970286871:web:6d6a6dc2cfa5e3087d1352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
export const firestore = getFirestore(app);
// export const auth = getAuth(myApp);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });