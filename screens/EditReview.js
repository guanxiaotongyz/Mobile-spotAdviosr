import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const EditReview = (props) => {
  const navigation = useNavigation();

  //const { review } = props.route.params;
  const review = props.route.params.item;
  console.log("==review==", review);

  // useStates for review
  const [comment, setComment] = useState(review.comment);
  const [rate, setRate] = useState(review.rate);

  return (
    <View>
      <Text>EditReview</Text>

      <View>
        <View style={styles.info}>
          <Text>Comment: </Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>

        <View style={styles.info}>
          <Text>Rate: </Text>
          <TextInput
            style={styles.input}
            value={rate}
            onChangeText={(text) => setRate(text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

});

export default EditReview;
