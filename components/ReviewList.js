import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, pressedStyle } from "../helper/helper";
import PressableButton from "./PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase/firebase-setup";

export function ReviewList({ review, spotItem }) {
  const navigation = useNavigation();

  // check review is empty
  const isReviewEmpty = (review) => {
    if (review === undefined || review.length == 0) {
      return true;
    }
    return false;
  };

  // console.log("=====auth======", auth.currentUser.uid);
  return (
    // create a list of spots and navigate to SpotDetails
    <View>
      {isReviewEmpty(review) ? (
        <View style={styles.item}>
          <Text>Review is empty</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={review}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              // if uid is equal to auth.currentUser.uid, then navigate to EditReview
              // else navigate to SpotDetails
              {
                if (item.uid === auth.currentUser.uid) {
                  return (
                    <PressableButton
                      style={styles.item}
                      pressHandler={() =>
                        navigation.navigate("EditReview", { item, spotItem })
                      }
                    >
                      {/* {console.log("==item==", item)} */}
                      <Text style={styles.text}>Comment: {item.comment}</Text>
                      <View style={styles.rateContainer}>
                        <Text style={styles.text}>Rate: {item.rate}</Text>
                        <AntDesign
                          name="star"
                          color={colors.STARYELLOW}
                          size={16}
                        />
                        <Text style={styles.name}>
                          {" "}
                          - By: {item.reviewname}
                        </Text>
                      </View>
                    </PressableButton>
                  );
                } else {
                  return (
                    <PressableButton
                      style={styles.item}
                      pressHandler={() =>
                        Alert.alert("You can't edit other review")
                      }
                    >
                      <Text style={styles.text}>Comment: {item.comment}</Text>
                      <View style={styles.rateContainer}>
                        <Text style={styles.text}>Rate: {item.rate}</Text>
                        <AntDesign
                          name="star"
                          color={colors.STARYELLOW}
                          size={16}
                        />
                        <Text style={styles.name}>
                          {" "}
                          - By: {item.reviewname}
                        </Text>
                      </View>
                    </PressableButton>
                  );
                }
              }
            }
            nestedScrollEnabled={true}
          />
        </View>
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
    backgroundColor: colors.WHITE,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    height: 63,
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 2.5,
    marginRight: 2.5,
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: "40%",
    fontWeight: "bold",
  },
});
