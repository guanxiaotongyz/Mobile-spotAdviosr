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
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.text}>No spot?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add first" onPress={() => {
              navigation.navigate("AddSpot");
            }}
              style={{ justifyContent: "center" }} />
          </View>

        </View>
      }
    </View>
  );
};

export default CitySpots;


const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    fontSize: 19
  },
  container: {
    alignItems: "center"
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  buttonContainer: {
    alignItems:"center",

  }

});
