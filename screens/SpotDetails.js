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
import { addReviewFunction } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";
// components
import { ReviewList } from "../components/ReviewList";

const SpotDetails = (props) => {

  const spotId = props.route.params.item.id;
  console.log("==spotId==", spotId);
  const item = props.route.params.item;
  // read this spot data from firestore

  // console.log("=====spot======", item);


  // test read spots data from firestore
  const [review, setReview] = useState();
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();

  // submit review
    const submitReview = () => {
      const data = {
        comment: comment,
        rate: rate,
      };
      // addReviewFunction(data, "NoMPkzQyyUI0iEXkfNDW"); 
      addReviewFunction(data, spotId);   
    };


  // get subcollection review in spots  data from firestore
  useEffect(() => {
    const q = query(
      collection(firestore, "spots", spotId , "reviews")
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
      <Text>Spot name : {item.name}</Text>
      <Text>Spot description : {item.description}</Text>
      <Text>Spot ID : {item.id}</Text>

      <Text>=======following is add review========</Text>

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

        <Text>=======following is review list========</Text>
        <ReviewList review={review}  />
        
    </View>
  );
};

export default SpotDetails;
