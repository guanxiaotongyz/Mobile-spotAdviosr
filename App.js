import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React,  { useEffect , useState} from 'react';
// test import below
import { firestore } from './firebase/firebase-setup';
import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore"
import UserProfile from './Screens /UserProfile';
import Home from './Screens /Home';




export default function App() {

  // const [testitems , setTestItems] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(firestore, "entries"), (docSnap) => {
  //     if (docSnap.empty) {
  //       console.log('No matching documents.');
  //       return;
  //     }
      
  //     let docs = [];
  //     docSnap.forEach((doc) => {
  //       console.log("====" , doc.id, '=>', doc.data());
  //       docs.push({id: doc.id, ...doc.data()})
  //     });
  //     setTestItems(docs);
  //   });

  //   return () => {
  //     unsubscribe();
  //   }
  // }, []);

  // console.log("testitems" , testitems);


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Home />
      <StatusBar style="auto" />
    </View>
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
