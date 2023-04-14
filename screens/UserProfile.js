import { View, Text, Alert, StyleSheet, Button, Image, Dimensions, ImageBackground } from "react-native";
import React from "react";
import { auth, firestore } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { colors } from "../helper/helper";
import { signOut, getAuth, reauthenticateWithCredential, deleteUser, EmailAuthProvider } from "firebase/auth";


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
        <View style={styles.textContainer}>
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
          <Text style={styles.text}>Gender: {userInfo.gender}</Text>
          <Text style={styles.text}>Age: {userInfo.age}</Text>
        </View>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign out"
          onPress={() => {
            signOut(auth);
          }} />
      </View>
      <View>
        <ImageBackground
          source={require("../assets/logo.png")}
          style={styles.image}
          resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.BLACK,
    marginLeft: 10,
    marginTop: 20
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center"
  },
  textContainer: {
    margin: 5,
  },
  image: {
    width: 200,
    height: 100,
    alignSelf: "center",
  }
});