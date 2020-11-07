const initialState = {
  weather: null,
  loading: true,
  error: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    
    case 'WEATHER_SUCCESS':
      console.log('reducer called')
      return {
        ...state,
        loading: false,
        weather: {...action.payload},
      }
  
    case 'FETCH_ERROR':
      return {
          ...state,
          loading: false,
          error: action.error
      }

    default:
        return state
  }
}

export default reducer
