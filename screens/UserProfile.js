import { View, Text, Alert } from "react-native";
import React from "react";
import { auth, firestore } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect , useState } from "react";

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
          // console.log("querySnapshot", querySnapshot);
          // console.log("querySnapshot", querySnapshot.docs[0].data());
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
      {/* <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>  */}
      <Text>{userInfo.uid}</Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.gender}</Text>
      <Text>{userInfo.age}</Text>
      <Text>User Profile</Text>
    </View>
  );
}
