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
    <View>
        <Text >All SpotList component test </Text>
        <FlatList
            data={spots}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PressableButton
                    style={styles.item}
                    pressHandler={() => navigation.navigate("SpotDetails", { item })}
                >
                    <Text>ID : {item.id}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Description: {item.description}</Text>
                </PressableButton>        
            )}
        />
    </View>


    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    item: {
      backgroundColor: colors.REBECAPURPLE,
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 5,
    },
  });

