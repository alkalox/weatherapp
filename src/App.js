import React, { useEffect } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux'

import fetchWeather from './actions/index'

const App = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  console.log(state)


  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        dispatch(fetchWeather(lat, lon))
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
      <Text>{JSON.stringify(state)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
