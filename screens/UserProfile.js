import { View, Text } from 'react-native'
import {collection, doc,  getDocs, getDoc, onSnapshot, QuerySnapshot, query, where} from 'firebase/firestore'
import { firestore } from '../firebase/firebase-setup'
import React, { useEffect, useState } from 'react'


const UserProfile = () => {
    const [user, setUser] = useState(null)
   // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    useEffect(() => {
        // select the user document from the users collection
        // query the user document by email
        const q = query(collection(firestore, 'user'), where('email', '==', 'abc@example.com'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if(querySnapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            // fix this , User just has one document
            const users = [];
            querySnapshot.forEach((doc) => {
                //doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                users.push({id: doc.id, ...doc.data()})
            });
            setUser(users);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    console.log("=====user======" , user);


  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  )
}

export default UserProfile