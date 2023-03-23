import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, pressedStyle } from "../helper/helper";
import PressableButton from "./PressableButton";
import { Entypo } from "@expo/vector-icons";

export function SpotList({ spots, isFavortite }) {
  const navigation = useNavigation();

  return (
    // create a list of spots and navigate to SpotDetails
    <View style={styles.container}>
        <FlatList
            data={spots}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <PressableButton
                    style={styles.item}
                    pressHandler={() => navigation.navigate("SpotDetails", { item })}
                >
                    <Text>Name: {item.name}</Text>
                    <Text>{item.reviews}</Text>
                </PressableButton>        
            )}
        />
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      marginTop: 10
    },
    item: {
      flexBasis: "40%",
      margin: "10%",
      backgroundColor: colors.LIGHT_GREY,
      padding: 5,
      marginVertical: 8,
      marginHorizontal: "5%",
      borderRadius: 5,
      maxWidth: "40%"
    },
  });

