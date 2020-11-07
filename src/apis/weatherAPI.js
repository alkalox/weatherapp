import { create } from 'apisauce'

export const weatherAPI = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

export const fetchCurrentWeather = async (lat, lon, apikey) => {
  const { data } = await weatherAPI.get(`/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&exclude=minutely,hourly`)
  return data
}