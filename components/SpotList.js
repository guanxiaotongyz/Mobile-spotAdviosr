import { View, Text, FlatList, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, pressedStyle } from "../helper/helper";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";

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
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={require('../assets/LACMA.jpeg')}
                  style={styles.backgroundImage}
                />
              </View>

              <View style={styles.infoContainer}>
                <View>
                <Text style={styles.name}>{item.name}</Text>
                </View>
                
                <View style={styles.cityContainer}>
                  <Ionicons
                    name="location-outline"
                    color={colors.BLACK}
                    size={16} />
                  <Text>{item.city}</Text>
                </View>
              </View>
            </View>




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
    margin: "9%",
    backgroundColor: colors.LIGHT_GREY,
    padding: 5,
    marginVertical: 10,
    marginHorizontal: "3.6%",
    borderRadius: 3,
    maxWidth: 170,
    height: 160,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%"
    
  },
  name: {
    flexWrap: "wrap"
  },
  backgroundImage: {
    width: "100%",
    height: "100%"
  },
  infoContainer: {
    flexBasis: "50%"
  },
  itemContainer: {
    flexDirection: "column",
    flexBasis: "100%"
  },
  imageContainer: {
    flexBasis: "50%"
  }
});

