import {
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE
  } from '../actions/trackSearch'
  
  const initialState = {
    loading: false,
    search: [],
    error: ''
  }
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SEARCH_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_SEARCH_SUCCESS:
        return {
          
          loading: false,
          search: action.payload,
          error: '',
          refreshing: false
        }
      case FETCH_SEARCH_FAILURE:
        return {
          ...state,
          loading: false,
          
          error: action.payload
        }
      default: return state
    }
  }
  
  export default searchReducer