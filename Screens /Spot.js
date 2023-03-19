import { View, Text, TextInput, Button } from "react-native";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  QuerySnapshot,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase-setup";
import React, { useEffect, useState } from "react";

const Spot = () => {
  // test read spots data from firestore
  const [review, setReview] = useState();
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();

  // submit review
    const submitReview = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "spots", "NoMPkzQyyUI0iEXkfNDW", "reviews"), {
                 comment: comment,
                createdAt: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };


  // get subcollection review in spots  data from firestore
  useEffect(() => {
    const q = query(
      collection(firestore, "spots", "NoMPkzQyyUI0iEXkfNDW", "reviews")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      // fix this , User just has one document
      const review = [];
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshots

        review.push({ id: doc.id, ...doc.data() });
      });
      setReview(review);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("=====review======", review);

  return (
    <View>
      <Text>Spot information : </Text>
      <Text>=======following is review========</Text>
      <Text>Add review</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        value={comment}
        onChangeText={(newText) => {
          setComment(newText);
        }}
      ></TextInput>
      <Text>Rate</Text>
        <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            value={rate}
            onChangeText={(newText) => {
                setRate(newText);
            }}
        ></TextInput>
        
        <Button
            title="Add review"
            onPress={submitReview}
        ></Button>
    </View>
  );
};

export default Spot;
