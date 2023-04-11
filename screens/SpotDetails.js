import { View, Text, TextInput, Button, ScrollView, FlatList, Alert } from "react-native";
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
import { Image, StyleSheet } from "react-native";
import WeatherApi from "../components/WeatherApi";
import Card from "../components/Card";
import { colors } from "../helper/helper";
import PressableButton from "../components/PressableButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase-setup";

const SpotDetails = (props) => {
  
  const spotId = props.route.params.item.id;
  console.log("==spotId== in SpotDetail", spotId);
  const spotItem = props.route.params.item;
  const [imageURL, setImageURL] = useState("");

  // console.log("=====spot======", item);

  // test read spots data from firestore
  const [review, setReview] = useState();
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();

  // submit review
  const submitReview = () => {
    if (!comment || !rate) {
      Alert.alert("Invalid Input", "Please check you input");
      return;
    }
    const data = {
      comment: comment,
      rate: rate,
    };
    // addReviewFunction(data, "NoMPkzQyyUI0iEXkfNDW");
    addReviewFunction(data, spotId);
    setComment();
    setRate();
  };

  useEffect(() => {
    async function getImageURL() {
      try {
        const reference = ref(storage, spotItem.imageUriRef);
        const url = await getDownloadURL(reference);
        setImageURL(url);
      } catch (err) {
        console.log("download image ", error);
      }
    }
    getImageURL();
  }, []);


  // get subcollection review in spots  data from firestore
  useEffect(() => {
    const q = query(collection(firestore, "spots", spotId, "reviews"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        setReview([]);
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

  console.log("=====review in SpotDetail component ======", review);

  return (

    <SafeAreaView>
      <ScrollView>
      {/* <Image source={require("../assets/nanjing.jpg")} style={styles.image} /> */}
      {imageURL && (
        <Image source={{ uri: imageURL }} style={{ width: '100%', height: 300 }} />
      )}
      <Text style={styles.name}>Name : {spotItem.name}</Text>
      <Text style={styles.city}>City : {spotItem.city}</Text>
      <Text style={styles.description}>
        Description : {spotItem.description}
      </Text>

        <Card
          height={55}
          width={300}
          marginHorizontal={10}
          marginTop={10}
          backgroundColor={colors.ORANGE}
        >
          <WeatherApi city={spotItem.city} />
        </Card>

        <Text style={styles.reviewText}>Reviews</Text>

        <TextInput
          style={styles.addreview}
          value={comment}
          placeholder="Add your review"
          onChangeText={(newText) => {
            setComment(newText);
          }}
        ></TextInput>
        <TextInput
          value={rate}
          style={styles.rate}
          placeholder="Add your rate from 1 to 5"
          onChangeText={(newText) => {
            setRate(newText);
          }}
        ></TextInput>

        <PressableButton pressHandler={submitReview} style={styles.addReviewButton}>
          <Text style={styles.text}>Add review</Text>
        </PressableButton>

        <Text></Text>
        <ReviewList review={review} spotItem={spotItem} />
      </ScrollView>
    </SafeAreaView>

  );
};

export default SpotDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  description: {
    marginLeft: 10,
    marginTop: 5,
  },
  city: {
    marginLeft: 10,
    marginTop: 5,
  },
  reviewText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
  addreview: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    paddingLeft: 10,
    maxWidth: "80%",
  },
  rate: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    paddingLeft: 10,
    maxWidth: "50%",
  },
  addReviewButton: {
    padding: 12,
    height: 55,
    width: 120,
    borderRadius: 10,
    margin: 12,
    backgroundColor: colors.LIGHT_BLUE,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
