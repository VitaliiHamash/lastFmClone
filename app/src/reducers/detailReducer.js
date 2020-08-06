import {
    FETCH_DETAIL_REQUEST,
    FETCH_DETAIL_SUCCESS,
    FETCH_DETAIL_FAILURE
  } from '../actions/detailTypes'
  
  const initialState = {
    loading: false,
    users: {},
    error: ''
  }
  
  const detailReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DETAIL_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_DETAIL_SUCCESS:
        return {
          
          loading: false,
          users: action.payload,
          error: '',
          refreshing: false
        }
      case FETCH_DETAIL_FAILURE:
        return {
          ...state,
          loading: false,
          
          error: action.payload
        }
      default: return state
    }
  }
  
  export default detailReducer