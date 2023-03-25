// import { View, Text } from 'react-native'
// import {collection, doc,  getDocs, getDoc, onSnapshot, QuerySnapshot, query, where} from 'firebase/firestore'
// import { firestore } from '../firebase/firebase-setup'
// import React, { useEffect, useState } from 'react'


// const UserProfile = () => {
//     const [user, setUser] = useState(null)
//    // const [loading, setLoading] = useState(true)
//     // const [error, setError] = useState(null)

//     useEffect(() => {
//         // select the user document from the users collection
//         // query the user document by email
//         const q = query(collection(firestore, 'user'), where('email', '==', 'abc@example.com'));
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             if(querySnapshot.empty) {
//                 console.log('No matching documents.');
//                 return;
//             }
//             // fix this , User just has one document
//             const users = [];
//             querySnapshot.forEach((doc) => {
//                 //doc.data() is never undefined for query doc snapshots
//                 //console.log(doc.id, " => ", doc.data());
//                 users.push({id: doc.id, ...doc.data()})
//             });
//             setUser(users);
//         });

//         return () => {
//             unsubscribe();
//         }
//     }, [])

//     console.log("=====user======" , user);


//   return (
//     <View>
//       <Text>UserProfile</Text>
//     </View>
//   )
// }

// export default UserProfile

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
      <Card>
        <Text style = {styles.TextTitle}>User Profile</Text>
        {/* <Text style = {styles.Text}>{userInfo.uid}</Text> */}
        <Text style = {styles.Text}>Email: {userInfo.email}</Text>
        <Text style = {styles.Text}>Nick Name: {userInfo.name}</Text>
        <Text style = {styles.Text}>Gender: {userInfo.gender}</Text>
        <Text style = {styles.Text}>Age: {userInfo.age}</Text>
      </Card>
      <Text>====following is your own create spot========</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.BLACK,
    margin: 10,
    marginLeft: 70,
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.BLACK,
    marginLeft: 10,
  },
});