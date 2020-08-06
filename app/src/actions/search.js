import axios from 'axios'
import {
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_FAILURE
} from './trackSearch'

export const fetchSearch = (link) => {
  return (dispatch) => {
    dispatch(fetchSearchRequest())
    axios
      .get(link)
      
      .then(response => {
        // response.data is the search
        const searchTracks = {data:response.data}
        
        dispatch(fetchSearchSuccess(searchTracks))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchSearchFailure(error.message))
      })
  }
}

export const fetchSearchRequest = () => {
  return {
    type: FETCH_SEARCH_REQUEST
  }
}

export const fetchSearchSuccess = search => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: search
  }
}

export const fetchSearchFailure = error => {
  return {
    type: FETCH_SEARCH_FAILURE,
    payload: error
  }
}