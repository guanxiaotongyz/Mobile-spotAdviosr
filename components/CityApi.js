import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CitySpots from "./CitySpots";

const CityApi = ({location}) => {
  const [cityData, setCityData] = useState("");
  console.log('in city api', location);
  const latitude = location.latitude;
  const longitude = location.longitude;

  const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCityData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCityData();
  }, [location]);

  console.log("==CityData==", cityData);

  return (
    <View>
      {cityData ? (
        <>
          <Text style={styles.name}>
            Current City: {cityData.city}
          </Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      {cityData ? (
        <>
          <View>
            <CitySpots city={cityData.city}/>
          </View>
        </>
      ) : (
        <Text>Loading Spots based on city...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default CityApi;