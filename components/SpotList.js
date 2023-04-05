import { View, Text, FlatList, StyleSheet, ImageBackground } from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../helper/helper";
import PressableButton from "./PressableButton";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { collection, query, onSnapshot, doc, getDocs, where } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-setup";

export function SpotList({ spots, handlePress }) {
  const navigation = useNavigation();
  const [refId, setRefId] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "user"),
        where("uid", "==", auth.currentUser.uid)
      ),
      
      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("querySnapshot t is empty");
        }
        const ref = [];
        const refs = querySnapshot.docs[0].data().favorite;
        refs.forEach((item) => {
          const id = item._key.path.segments[item._key.path.segments.length - 1];
          ref.push(id);
        })
        setRefId(ref);
      },

      (error) => {
        console.log("snapshot error ", error);
      }
    );
    // this is a cleanup function that will be called automatically when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);




  const isFavorite = (id) => {
    console.log("==", id, "==");
    if (refId.includes(id)) {
      return true;
    }
    else {
      return false;
    }
  }

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

                <View style={styles.bottomContainer}>
                  <View style={styles.cityContainer}>
                    <Ionicons
                      name="location-outline"
                      color={colors.BLACK}
                      size={16} />
                    <Text>{item.city}</Text>
                  </View>
                  <View style={styles.heartContainer}>

                    {
                      isFavorite(item.id) ? (<PressableButton pressHandler={() => { }}>
                        <Entypo name="heart" size={20} color={colors.RED} />
                      </PressableButton>

                      ) : (
                        <PressableButton pressHandler={handlePress}>
                          <Entypo name="heart-outlined" size={20} color={colors.RED} />
                        </PressableButton>

                      )
                    }
                  </View>


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
    flexBasis: "42%",
    margin: "9%",
    backgroundColor: colors.LIGHT_GREY,
    padding: 5,
    marginVertical: 10,
    marginHorizontal: "2.5%",
    borderRadius: 3,
    maxWidth: 170,
    height: 160,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  name: {
    flexWrap: "wrap",
    fontWeight: "bold",
    marginLeft: "2%"
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
    flexBasis: "100%",
  },
  imageContainer: {
    flexBasis: "50%",
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: "3%",
    width: "100%"
  }

});
