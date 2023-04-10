import { View, Text, Alert , StyleSheet} from "react-native";
import React from "react";
import { auth, firestore } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { colors } from "../helper/helper";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "user"),
        where("uid", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setUserInfo([]);
          console.log("querySnapshot t is empty");
        } else {
          setUserInfo(querySnapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("snapshot error ", error);
      }
    );
    // this is a cleanup function that will be called automatically when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Card>
        <Text style = {styles.Text}>Email: {userInfo.email}</Text>
        <Text style = {styles.Text}>Name: {userInfo.name}</Text>
        <Text style = {styles.Text}>Gender: {userInfo.gender}</Text>
        <Text style = {styles.Text}>Age: {userInfo.age}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.BLACK,
    marginLeft: 10,
    marginTop: 20
  },
});