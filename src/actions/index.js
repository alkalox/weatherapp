import { weatherAPI } from '../apis/weatherAPI'
import { apikey } from '../apis/apikey'

export default (lat, lon) => async dispatch => {
  const { data } = await weatherAPI.get(`/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&exclude=minutely,hourly`)
  dispatch({ type: 'WEATHER_SUCCESS', payload: data})
}




