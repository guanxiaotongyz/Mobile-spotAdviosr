import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import PressableButton from "../components/PressableButton";
// firebase
import { deleteReviewFunction, updateReviewFunction } from "../firebase/firestore";
//color
import { colors } from "../helper/helper";


const EditReview = (props) => {

  const navigation = props.navigation;

  //const { review } = props.route.params;
  const review = props.route.params.item;
  const spotItem = props.route.params.spotItem;
  console.log("==spotItem==", spotItem);
  console.log("==review==", review);

  // useStates for review
  const [comment, setComment] = useState(review.comment);
  const [rate, setRate] = useState(review.rate);

  // pressHandler for Delete
  const pressDeleteHandler = () => {
    deleteReviewFunction(spotItem.id, review.id);
    navigation.navigate("SpotDetails", { item: spotItem });
  }
  // pressHandler for Update
  const pressUpdateHandler = () => {
    const data = {
      comment: comment,
      rate: rate,
    };
    updateReviewFunction(spotItem.id, review.id, data);
    navigation.navigate("SpotDetails", { item: spotItem });
  }


  return (
    <View>

      <View style={styles.container}>
        <View style={styles.info}>
          <Text>Comment: </Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.rate}>Rate: </Text>
          <TextInput
            style={styles.input}
            value={rate}
            onChangeText={(text) => setRate(text)}
          />
        </View>

        <View style={styles.info}>
          {/* add Delete PressableButton */}
          <PressableButton
            style={styles.button}
            pressHandler={pressDeleteHandler}
          >
            <Text>Delete</Text>
          </PressableButton>
          {/* add Update PressableButton */}
          <PressableButton
            style={styles.button}
            pressHandler={pressUpdateHandler}
          >
            <Text>Update</Text>
          </PressableButton>

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  rate: {
    marginRight: 32
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: colors.LIGHT_BLUE,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderRadius: 5
  },

});

export default EditReview;
