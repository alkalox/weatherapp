import { create } from 'apisauce'

export const weatherAPI = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})