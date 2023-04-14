import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase/firebase-setup";
import { SpotList } from "../components/SpotList";

const CitySpots = ({city}) => {
  const [spots, setSpots] = useState([]);
  console.log('CitySpots:',city);

  useEffect(() => {
    const q = query(
        collection(firestore, "spots"),
        // where("city", "==", city)
        where("city", "==", city)
      );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      console.log('City matched: ' + querySnapshot);
      const spots = [];
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        spots.push({ id: doc.id, ...doc.data() });
      });
      setSpots(spots);
      console.log("City spots got spots:",spots);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("=====Cityspot finish======");

  return (
    <View>
        {spots ? (
        <>
        <SpotList spots={spots} />
        </>
      ):<Text>No matched city</Text>}
    </View>
  );
};

export default CitySpots;