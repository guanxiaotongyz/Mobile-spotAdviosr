import { View, Text, TextInput, Button } from "react-native";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  QuerySnapshot,
  query,
  where,
  addDoc,
  addFavoriteFunction
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import React, { useEffect, useState } from "react";
import { addReviewFunction } from "../firebase/firestore";
// components
import {SpotList} from '../components/SpotList';


const AllSpots = () => {
  const [spots, setSpots] = useState([]);
  const isFavortite = true;  

  useEffect(() => {
    const q = query(collection(firestore, 'spots'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if(querySnapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const spots = [];
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            spots.push({id: doc.id, ...doc.data()})
        });
        setSpots(spots);
    });

    return () => {
        unsubscribe();
    }
}, [])


   
  console.log("=====spot======", );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SpotList spots={spots}/>
    </View>
  );
};

export default AllSpots;
