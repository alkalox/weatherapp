
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { fetchCurrentWeather } from './apis/weatherAPI'
import { apikey } from "./apis/apikey"

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({})

  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const { current, daily } = await fetchCurrentWeather(lat, lon, apikey)
        setCurrentWeather(current)
        console.log(daily)
      });
    } else {
      console.log("Location Permission denied");
    }

  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <View style = {styles.container}>
      <Text>Weather App</Text>
      <Text>{JSON.stringify(currentWeather)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
