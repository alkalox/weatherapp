const initialState = {
  weather: null,
  loading: true,
  error: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    
    case 'WEATHER_SUCCESS':
      return {
        ...state,
        loading: false,
        weather: {...action.payload},
        error: null,
      }
  
    case 'WEATHER_ERROR':
      return {
          ...state,
          loading: false,
          error: true,
      }

    default:
        return state
  }
}

export default reducer
