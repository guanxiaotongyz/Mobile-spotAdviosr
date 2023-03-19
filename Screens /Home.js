import { View, Text } from 'react-native'
import {collection, doc,  getDocs, getDoc, onSnapshot, QuerySnapshot, query, where} from 'firebase/firestore'
import { firestore } from '../firebase/firebase-setup'
import React, { useEffect, useState } from 'react'


const Home = () => {
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

// // get subcollection review in spots  data from firestore
// useEffect(() => {
//     const q = query(collection(firestore, 'spots', 'NoMPkzQyyUI0iEXkfNDW', 'reviews'));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         if(querySnapshot.empty) {
//             console.log('No matching documents.');
//             return;
//         }
//         // fix this , User just has one document
//         const review = [];
//         querySnapshot.forEach((doc) => {
//             //doc.data() is never undefined for query doc snapshots

//             review.push({id: doc.id, ...doc.data()})
//         });
//         setReview(review);
//     });

//     return () => {
//         unsubscribe();
//     }
// }, [])



console.log("=====spots======" , spots);
// console.log("=====review======" , review);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home