import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherApi = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "7e08dc71a8f75170909a68c16407e21b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city]);

  console.log("==weatherData==", weatherData);
  console.log("city", city);

  return (
    <View>
      {weatherData ? (
        <>
          <View style = {styles.container}>
          <Text style={styles.temperature}>
            Temperature: {Math.round(weatherData.main.temp)}°C
          </Text>
          <Text>  </Text>
          <Text style={styles.temperature}>
            Current weather: {weatherData.weather[0].description}
          </Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default WeatherApi;
