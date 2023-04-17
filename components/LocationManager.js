import { View, Button, Alert, Image, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
// import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import CityApi from "./CityApi";
import PressableButton from "./PressableButton";
import { colors } from "../helper/helper";
import { mapkey } from "@env";


export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const key = mapkey;

  useEffect(() => {
    async function fetchLocation() {
      try {
        setLocation(data.location);
      } catch (err) {
        console.log("fetch lcoation ", err);
      }
    }
    fetchLocation();
  }, []);
  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  async function verifyPermission() {
    console.log(permissionResponse);
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // // this will be user's choice:
    return permissionResult.granted;
  }
  async function locateUserHandler() {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give location permission");
      return;
    }
    try {
      Alert.alert("Please wait for loading map");
      const result = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log("location handler ", err);
    }
  }

  function locationSelectionHandler() {
    //navigate to Map.js but we have no navigation prop
    // Todo: pass the location state variable if exists to be used as initialregion prop
    if (location) {
      navigation.navigate("Map", { currentLocation: location });
    } else {
      navigation.navigate("Map");
    }
  }


  return (
    <View style={{ marginTop: 10 }}>
      {location && (
        <PressableButton
          style={styles.item}
          pressHandler={locationSelectionHandler}
        >
          <View>
            {location && (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${key}`,
                }}
                style={{ width: "100%", height: 200 }}
                resizeMode="contain"
              />
            )}
          </View>
        </PressableButton>
      )}
      <View>
        <PressableButton pressHandler={locateUserHandler} style={styles.button1}>
          <Text>Locate me</Text>
        </PressableButton>
      </View>
      <View style={{ borderBottomWidth: 2, borderColor: 'black' }} />

      {location ? (
        <>
          <CityApi location={location} />
        </>
      ) : <View></View>}
    </View>
  );
}


const styles = StyleSheet.create({
  button1: {
    height: 50,
    width: 120,
    borderRadius: 10,
    margin: 12,
    backgroundColor: colors.SEAFOAMGREEN,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    height: 55,
    width: 160,
    borderRadius: 10,
    margin: 5,
    backgroundColor: colors.SEAFOAMGREEN,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
