import React, { useEffect } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';

import fetchWeather from './actions/index'
import Weather from './components/Weather'

const App = () => {
  const loading = useSelector((state) => state.loading)
  const state = useSelector((state) => state)
  const currentWeather = useSelector((state) => state?.weather?.current)
  const locationName = useSelector((state) => state?.weather?.name)
  const dispatch = useDispatch()
  //console.log(JSON.stringify(state))


  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          dispatch(fetchWeather(lat, lon))
        }, 
        err => console.log(err),
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    } else {
      console.log("Location Permission denied");
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  if(loading) {
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Loading the current weather!</Text>
        <LottieView 
          source={require('./assets/loader.json')} autoPlay loop 
          style = {{height: 200, width: 200}} 
        />
      </View>
    )
  } 
  else {
    return (
      <View style = {styles.container}>
        <Weather current={currentWeather} locationName={locationName} />
        <View style = {{flex: 1}}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
