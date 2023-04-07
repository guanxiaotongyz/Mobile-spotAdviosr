import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../helper/helper";
import PressableButton from "./PressableButton";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase-setup";
import { removeFavoriteFunction } from "../firebase/firestore";
import { addFavoriteFunction } from "../firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase-setup";

export function SpotList({ spots }) {
  const navigation = useNavigation();
  const [refId, setRefId] = useState([]);
  const [imageRes, setImageRes] = useState("");


  useEffect(() => {
    // async function getImageURL() {
    //   console.log('start once');
    //   try {
    //     // const reference = ref(storage, spotItem.imageUriRef);
    //     const reference = ref(storage, item.imageUriRef);
    //     const url = await getDownloadURL(reference);
    //     // setImageURL(url);
    //     return url;
    //   } catch (err) {
    //     console.log("download image ", error);
    //   }
    // }
    // getImageURL();
    // setImageURL(getImageURL());
    const task = async () => {
      console.log("spots:" + JSON.stringify(spots));
      const spotRes = await Promise.all(
        spots.map(async (spot) => {
          const result = await read_image_from_storage(spot.imageUriRef);
          // console.log("spot res 1:" + JSON.stringify(result) + JSON.stringify(spot))
          return { ...spot, imageURI: result };
        })
      );
      setImageRes(spotRes);
      console.log("spot res:" + JSON.stringify(spotRes));
    };
    task();
    /*
    spots.map(async (spot) => {
          const result = await read_image_from_storage(spot.imageUriRef);
          // console.log("spot res 1:" + JSON.stringify(result) + JSON.stringify(spot))
          return { spot, imageURI: result };
        })
    setImageRes(spotRes);
     */
  }, [spots]);

  const read_image_from_storage = async (path) => {
    try {
      if (path) {
        const reference = ref(storage, path);
        const downloadURL = await getDownloadURL(reference);
        return downloadURL;
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function getImageRef(item) {
    const reference = ref(storage, item.imageUriRef);
    const url = await getDownloadURL(reference);
    return url;
    //getDownloadURL(ref(storage, item.imageUriRef));
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "user"),
        where("uid", "==", auth.currentUser.uid)
      ),

      (querySnapshot) => {
        if (querySnapshot.docs[0].data().favorite === undefined) {
          console.log("querySnapshot t is empty");
        } else {
          const ref = [];
          const refs = querySnapshot.docs[0].data().favorite;
          console.log("refs", refs);
          if (refs !== null) {
            refs.forEach((item) => {
              const id =
                item._key.path.segments[item._key.path.segments.length - 1];
              ref.push(id);
            });
          }
          setRefId(ref);
        }
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
    if (refId.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    // create a list of spots and navigate to SpotDetails
    <View style={styles.container}>
      <FlatList
        data={imageRes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (


          <PressableButton
            style={styles.item}
            pressHandler={() => navigation.navigate("SpotDetails", { item })}
            android_ripple={{ color: colors.LIGHT_BLUE, foreground: true }}
          >

            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={{ uri: item.imageURI}}
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
                      isFavorite(item.id) ? (<PressableButton pressHandler={() => removeFavoriteFunction(item.id)}>
                        <Entypo name="heart" size={20} color={colors.RED} />
                      </PressableButton>

                      ) : (
                        <PressableButton pressHandler={() => addFavoriteFunction(item.id)}>
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
