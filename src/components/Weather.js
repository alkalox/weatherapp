import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Weather = ({current, locationName}) => {
  const description = current.weather[0].main
  const icon = current.weather[0].icon
  
  return (
    <View style = {styles.weatherView}>
      <Text style = {styles.textStyle}>
        {locationName}
      </Text>
      <Image source = {{
        uri: `https://openweathermap.org/img/wn/${icon}@2x.png`
        }} 
        style = {{height: 150, width: 150}} 
      />
      <Text style = {styles.tempStyle}>
        {current.temp}°C
      </Text>
      <Text style = {[styles.textStyle, {marginTop: 20}]}>
        {description}
      </Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({
  weatherView: {
    backgroundColor: '#36d1dc', 
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    color:'white',
  },
  tempStyle: {
    fontSize: 35,
    fontWeight:'bold',
    color:'white',
  }
})
