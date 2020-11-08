import React, { useEffect } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid, Button } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux'
import LottieView from 'lottie-react-native';

import { fetchWeather } from './actions/index'
import Weather from './components/Weather'
import Forecast from './components/Forecast'

const App = () => {
  const loading = useSelector((state) => state.loading)
  const currentWeather = useSelector((state) => state?.weather?.current)
  const forecastWeather = useSelector((state) => state?.weather?.daily)
  const locationName = useSelector((state) => state?.weather?.name)
  const error = useSelector((state) => state.error)

  const dispatch = useDispatch()

  useEffect(() => {
    getLocation()
  }, [])

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
        err => dispatch({type: 'WEATHER_ERROR'}),
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    } else {
      dispatch({type: 'WEATHER_ERROR'})
    }
  }

  if(loading) {
    return (
      <View style = {styles.loadingErrorView}>
        <Text style = {styles.textStyle}>
          Loading the current weather!
        </Text>
        <LottieView 
          source={require('./assets/loader.json')} autoPlay loop 
          style = {{height: 200, width: 200}} 
        />
      </View>
    )
  }
  else if (error) {
    return (
      <View style = {styles.loadingErrorView}>
        <Text style = {[styles.textStyle, {marginBottom: 25}]}>
          Something went wrong on our end. Please try again.
        </Text>
        <Button title = "Retry" onPress = {() => getLocation()} />
      </View>
    )
  }
  else {
    return (
      <View style = {styles.container}>
        <Weather current={currentWeather} locationName={locationName} />
        <Forecast forecast={forecastWeather} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 20
  },
  loadingErrorView: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center', 
    margin : 25,
  }
});


export default App;
