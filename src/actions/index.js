import { weatherAPI } from '../apis/weatherAPI'
import { apikey } from '../apis/apikey'

export default (lat, lon) => async dispatch => {
  const { data } = await weatherAPI.get(`/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&exclude=minutely,hourly`)
  const response = await weatherAPI.get(`/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
  const name = response.data.name
  if (data != null)
    dispatch({ type: 'WEATHER_SUCCESS', payload: {...data, name }})
}




