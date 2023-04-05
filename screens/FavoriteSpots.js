import { View } from "react-native";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc
} from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-setup";
import React, { useEffect, useState } from "react";
import { SpotList } from '../components/SpotList';

const FavoriteSpots = () => {
  
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "user"),
        where("uid", "==", auth.currentUser.uid)
      ),

      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("querySnapshot t is empty");
        }
        const favSpots = [];
        const refs = querySnapshot.docs[0].data().favorite;
        refs.forEach((item) => {
          const id = item._key.path.segments[item._key.path.segments.length - 1];
          onSnapshot(doc(firestore, "spots", id), (doc) => {
            console.log("Current data: ", doc.data());
            favSpots.push({ id: doc.id, ...doc.data() })
          });
        })
        setSpots(favSpots);
      },

      (error) => {
        console.log("snapshot error ", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);



  console.log("=====favspot======",);

  return (
    <View>
      <Text>FavoriteSpots</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SpotList spots={spots} isFavortite={true} />
      </View>
    </View>
  );
};

export default FavoriteSpots;