import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const Forecast = ({ forecast }) => {
  const fiveDayForecast = forecast.slice(1,6)
  return (
    <View style = {styles.container}>

      {fiveDayForecast.map((day) => {
        const temp = day.temp.day
        const dayNumber = new Date(day.dt * 1000).getDay()

        return (
          <>
          <View style = {styles.forecastView} key={day.dt} >
            <Text style = {styles.textStyle}>
              {dayNames[dayNumber]}
            </Text>
            <Text style = {styles.textStyle}>
              {temp}°C 
            </Text>
          </View>
          <View style ={styles.divider} />
          </>
        )
      })}
    </View>
  )
}

export default Forecast

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor:'navy',
  },
  forecastView: {
    backgroundColor: 'navy',
    flexDirection: 'row', 
    padding: 15,
    justifyContent: 'space-between',
  },
  divider: {
    height: 1, 
    backgroundColor: '#959595', 
  },
  textStyle: {
    color:'white', 
    fontSize: 20
  }
})
