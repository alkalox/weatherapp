import { weatherAPI } from '../apis/weatherAPI'
import { apikey } from '../apis/apikey'

export const fetchWeather = (lat, lon) => async dispatch => {
    const { data, ok: onecallRequest} = await weatherAPI.get(`/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&exclude=minutely,hourly`)
    const weatherResponse = await weatherAPI.get(`/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
    const name = weatherResponse?.data?.name
    
    if (!weatherResponse.ok && !onecallRequest) {
      dispatch({type: 'WEATHER_ERROR'})
    }
    if (data != null)
      dispatch({ type: 'WEATHER_SUCCESS', payload: {...data, name }})
}