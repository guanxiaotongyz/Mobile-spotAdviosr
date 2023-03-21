import { View, Text } from 'react-native'
import {collection, doc,  getDocs, getDoc, onSnapshot, QuerySnapshot, query, where} from 'firebase/firestore'
import { firestore } from '../firebase/firebase-setup'
import React, { useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import { headerStyle } from '../helper/helper';
// navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Home = () => {

  const Tab = createBottomTabNavigator();
// test read spots data from firestore
const [spots, setSpots] = useState()
// const [review, setReview] = useState()

useEffect(() => {
    const q = query(collection(firestore, 'spots'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if(querySnapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        // fix this , User just has one document
        const spots = [];
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            spots.push({id: doc.id, ...doc.data()})
        });
        setSpots(spots);
    });

    return () => {
        unsubscribe();
    }
}, [])




console.log("=====spots======" , spots);
// console.log("=====review======" , review);
  return (
    <View>
      <Text>Home</Text>
    </View>
    // <Tab.Navigator >
    //   <Tab.Screen name="Home" component={Home} />
    //   <Tab.Screen name="UserProfile" component={UserProfile} />
    // </Tab.Navigator>
  )
}

export default Home