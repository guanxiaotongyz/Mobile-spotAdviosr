import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase/firebase-setup";
import { SpotList } from "../components/SpotList";
import { colors } from "../helper/helper";
import { useNavigation } from "@react-navigation/native";

const CitySpots = ({ city }) => {
  const [spots, setSpots] = useState([]);
  console.log('CitySpots:', city);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(firestore, "spots"),
      // where("city", "==", city)
      where("city", "==", city)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        setSpots(null);
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
      console.log("City spots got spots:", spots);
    });

    return () => {
      unsubscribe();
    };
  }, [city]);

  console.log("=====Cityspot finish======");

  return (
    <View style={styles.container}>
      {spots ? (
        <>
          <SpotList spots={spots} />
        </>
      ) :
        <View>
          <Text style={styles.text}>No matched spots</Text>
          <Button title="Add one" onPress={() => {
            navigation.navigate("AddSpot");
          }}/>
        </View>
      }
    </View>
  );
};

export default CitySpots;


const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    marginTop: 20,
    fontSize: 20

  },
  container: {
    alignItems: "center"
  }

});
