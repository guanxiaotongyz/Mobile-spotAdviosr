import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, pressedStyle } from "../helper/helper";
import PressableButton from "./PressableButton";
import { Entypo } from "@expo/vector-icons";

export function ReviewList({ review }) {
  // check review is empty
  const isReviewEmpty = (review) => {
    if (review === undefined || review.length == 0) {
      return true;
    }
    return false;
  };

  return (
    // create a list of spots and navigate to SpotDetails
    <View>
      <Text>All ReviewList component test </Text>
      {isReviewEmpty(review) ? (
        <View style={styles.item}>
          <Text>Review is empty</Text>
        </View>
      ) : (
        <FlatList
          data={review}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={styles.item}
              // pressHandler={() => navigation.navigate("SpotDetails", { item })}
            >
              <Text>Review ID : {item.id}</Text>
              <Text>Comment: {item.comment}</Text>
              <Text>Rate: {item.rate}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: colors.LIGHT_BLUE,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
